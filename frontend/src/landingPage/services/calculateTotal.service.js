


export const calculateTotal = (price, quantity, discount, shippingPrice) =>
{
	const subtotal = price * quantity;
	const discountAmount = (subtotal * discount) / 100;
	return subtotal - discountAmount + shippingPrice;
}