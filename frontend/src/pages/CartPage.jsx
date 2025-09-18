
import Navbar from "../components/home/Navbar";
import Cart from "../components/productlist/Cart";





const CartPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
  <Navbar/>
      <main className="flex-grow">
     
<Cart/>

      </main>
    
    </div>
  );
};

export default CartPage;
