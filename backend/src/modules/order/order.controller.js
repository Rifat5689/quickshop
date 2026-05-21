// FIX: removed unused syncIndexes import
import { asyncHandler } from "../../utils/asyncHandler.js";
import Product from "../product/product.model.js";
import ApiError from "../../utils/ApiError.js";
import User from "../user/user.model.js";
import Order from "./order.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";


const createOrder = asyncHandler(async (req, res) => {
    const { productId, quantity: qn, shippingDetails } = req.body;

    if (!shippingDetails || !productId || !qn)
        throw new ApiError(400, "Missing fields");

    const product = await Product.findById(productId);
    if (!product) throw new ApiError(404, "Product not found");

    const orderItem = {
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: qn,
    };

    const { fullName, phone, shippingPrice } = shippingDetails;
    const totalPrice = product.price * qn + shippingPrice;

    const username = fullName.trim().toLowerCase();
    const phoneNumber = phone.trim();

    // FIX: was using const then reassigning. Use let instead.
    let user = await User.findOne({ phone: phoneNumber });

    if (!user) {
        user = await User.create({
            username,
            phone: phoneNumber,
        });
    }

    const createdOrder = await Order.create({
        userId: user._id,
        orderItem,
        shippingDetails,
        totalPrice,
    });

    if (!createdOrder) throw new ApiError(500, "Internal server error");

    // Use 201 Created for a newly created resource.
    return res.status(201).json(
        new ApiResponse(201, createdOrder, "Order created successfully")
    );
});


const getAllOrders = asyncHandler(async (req, res) => {
    // FIX: was missing await, and res.status.json instead of res.status(200).json
    const orders = await Order.find().populate("orderItem.productId", "name images");

    res.status(200).json(
        new ApiResponse(200, orders, "Orders sent successfully")
    );
});


const getOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // FIX: was missing await
    const order = await Order.findById(id).populate("orderItem.productId", "name images");

    if (!order) throw new ApiError(404, "Order not found");

    res.status(200).json(
        new ApiResponse(200, order, "Order sent successfully")
    );
});


// NEW: Confirm order (Pending to Processing)
const confirmOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) throw new ApiError(404, "Order not found");

    if (order.orderStatus !== "Pending")
        throw new ApiError(400, "Only pending orders can be confirmed");

    order.orderStatus = "Processing";
    const updatedOrder = await order.save();

    res.status(200).json(
        new ApiResponse(200, updatedOrder, "Order confirmed successfully")
    );
});


// NEW: Ship order (Processing to Shipped)
const shipOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) throw new ApiError(404, "Order not found");

    if (order.orderStatus !== "Processing")
        throw new ApiError(400, "Only processing orders can be shipped");

    order.orderStatus = "Shipped";
    const updatedOrder = await order.save();

    res.status(200).json(
        new ApiResponse(200, updatedOrder, "Order marked as shipped")
    );
});


// NEW: Deliver order (Shipped to Delivered)
const deliverOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) throw new ApiError(404, "Order not found");

    if (order.orderStatus !== "Shipped")
        throw new ApiError(400, "Only shipped orders can be marked delivered");

    order.orderStatus = "Delivered";
    const updatedOrder = await order.save();

    res.status(200).json(
        new ApiResponse(200, updatedOrder, "Order marked as delivered")
    );
});


// NEW: Cancel order
const cancelOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) throw new ApiError(404, "Order not found");

    if (order.orderStatus === "Delivered" || order.orderStatus === "Shipped")
        throw new ApiError(400, "Cannot cancel a shipped or delivered order");

    order.orderStatus = "Cancelled";
    const updatedOrder = await order.save();

    res.status(200).json(
        new ApiResponse(200, updatedOrder, "Order cancelled successfully")
    );
});


// Update payment status (Pending → Paid, or Paid → Refunded on cancelled orders)
const updatePaymentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    const allowed = ["Paid", "Refunded"];
    if (!allowed.includes(paymentStatus))
        throw new ApiError(400, "Invalid payment status. Allowed: Paid, Refunded");

    const order = await Order.findById(id);
    if (!order) throw new ApiError(404, "Order not found");

    if (paymentStatus === "Refunded") {
        if (order.orderStatus !== "Cancelled")
            throw new ApiError(400, "Refund is only allowed on cancelled orders");
        if (order.paymentStatus !== "Paid")
            throw new ApiError(400, "Only paid orders can be refunded");
    }

    if (paymentStatus === "Paid" && order.paymentStatus === "Paid")
        throw new ApiError(400, "Order is already marked as paid");

    order.paymentStatus = paymentStatus;
    const updatedOrder = await order.save();

    res.status(200).json(
        new ApiResponse(200, updatedOrder, `Payment marked as ${paymentStatus}`)
    );
});


// NEW: Dashboard stats for admin panel overview screen
const getDashboardStats = asyncHandler(async (req, res) => {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ orderStatus: "Pending" });
    const processingOrders = await Order.countDocuments({ orderStatus: "Processing" });
    const shippedOrders = await Order.countDocuments({ orderStatus: "Shipped" });
    const deliveredOrders = await Order.countDocuments({ orderStatus: "Delivered" });
    const cancelledOrders = await Order.countDocuments({ orderStatus: "Cancelled" });
    const unpaidOrders = await Order.countDocuments({ paymentStatus: "Pending" });
    const paidOrders = await Order.countDocuments({ paymentStatus: "Paid" });

    // Sum up total revenue from delivered orders
    const revenueResult = await Order.aggregate([
        { $match: { orderStatus: "Delivered" } },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    const avgOrderValue = totalOrders ? totalRevenue / totalOrders : 0;

    const viewsSummaryResult = await Product.aggregate([
        {
            $group: {
                _id: null,
                viewsTotal: { $sum: "$viewsTotal" },
                viewsToday: { $sum: "$viewsToday" },
            },
        },
    ]);
    const viewsSummary = viewsSummaryResult.length
        ? viewsSummaryResult[0]
        : { viewsTotal: 0, viewsToday: 0 };

    const conversionRate = viewsSummary.viewsTotal
        ? (totalOrders / viewsSummary.viewsTotal) * 100
        : 0;

    const topProductResult = await Order.aggregate([
        { $group: { _id: "$orderItem.name", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 },
    ]);
    const topProduct = topProductResult[0]?._id || "";

    const topCityResult = await Order.aggregate([
        { $match: { "shippingDetails.city": { $ne: "" } } },
        { $group: { _id: "$shippingDetails.city", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 },
    ]);
    const topCity = topCityResult[0]?._id || "";

    const deliveredRate = totalOrders
        ? (deliveredOrders / totalOrders) * 100
        : 0;

    // Last 7 days orders count per day for chart
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const dailyOrders = await Order.aggregate([
        { $match: { createdAt: { $gte: sevenDaysAgo } } },
        {
            $group: {
                _id: {
                    date: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                    },
                    dayOfWeek: { $dayOfWeek: "$createdAt" },
                },
                count: { $sum: 1 },
                revenue: { $sum: "$totalPrice" },
            },
        },
        { $sort: { "_id.date": 1 } },
    ]);

    const stats = {
        totalOrders,
        pendingOrders,
        processingOrders,
        shippedOrders,
        deliveredOrders,
        cancelledOrders,
        unpaidOrders,
        paidOrders,
        totalRevenue,
        avgOrderValue,
        conversionRate,
        topProduct,
        topCity,
        deliveredRate,
        activeViewers: viewsSummary.viewsToday,
        dailyOrders,
    };

    res.status(200).json(
        new ApiResponse(200, stats, "Dashboard stats fetched successfully")
    );
});


export {
    createOrder,
    getAllOrders,
    getOrderById,
    confirmOrder,
    shipOrder,
    deliverOrder,
    cancelOrder,
    updatePaymentStatus,
    getDashboardStats,
};