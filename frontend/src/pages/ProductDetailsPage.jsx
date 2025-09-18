
import Navbar from "../components/home/Navbar";
import ProductDetail from "../components/productlist/ProductDetail";




const ProductDetailsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
  <Navbar/>
      <main className="flex-grow">
     
<ProductDetail/>

      </main>
    
    </div>
  );
};

export default ProductDetailsPage;
