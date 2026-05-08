import BillingFrom from "../components/BillingFrom";
import DeliveryOptions from "../components/DeliveryOptions";
import OrderSummary from "../components/OrderSummary";
import PaymentSystem from "../components/PaymentSystem";
import PlaceOrder from "../components/PlaceOrder";
import PriceBreakdown from "../components/PriceBreakdown";
import ProductDetails from "../components/ProductDetails";
import QuantitySelector from "../components/QuantitySelector";
import useCheckout from "../hooks/useCheckout";
import useProduct from "../hooks/useProduct";

const LandingPage = () => {
  const {isLoading,data} = useProduct() ; 
  const product = data?.data ; 
  console.log(product) ; 
        const {
    quantity, 
    DeliveryPlace,
    payload,
    shippingPrice,
    total ,
    handleQuantity, 
    handleDeliveryPlace,
    handleOrderSummary,
    handleConfirmOrder,
    addressRef,
    nameRef,
    phoneRef,
    isLoading:isSubmitting

} = useCheckout({product});

if (isLoading || !product)
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin" />
    </div>
  );
  return (
                <div>
                      <ProductDetails product ={product}></ProductDetails>  
                      <QuantitySelector handleQuantity={handleQuantity} quantity={quantity}></QuantitySelector>
                      <DeliveryOptions DeliveryPlace={DeliveryPlace} handleDeliveryPlace={handleDeliveryPlace} ></DeliveryOptions>
                      <PriceBreakdown quantity={quantity} shippingPrice ={shippingPrice} total={total} product={product}></PriceBreakdown>
                      <BillingFrom addressRef={addressRef} nameRef={nameRef}  phoneRef={phoneRef}></BillingFrom>
                      <PaymentSystem ></PaymentSystem>
                      <PlaceOrder isSubmitting={isSubmitting} handleOrderSummary={handleOrderSummary}></PlaceOrder>
                   {payload &&  <OrderSummary handleConfirmOrder={handleConfirmOrder}></OrderSummary> }  
                </div>
        );
};

export default LandingPage;