
import Navbar from "../components/home/Navbar";
import Checkout from "../components/productlist/Checkout";





const CheckoutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
  <Navbar/>
      <main className="flex-grow">
     
<Checkout/>

      </main>
    
    </div>
  );
};

export default CheckoutPage;
