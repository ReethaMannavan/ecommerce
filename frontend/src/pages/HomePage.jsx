import Home from "../components/home/Home";
import Navbar from "../components/home/Navbar";




const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
  <Navbar/>
      <main className="flex-grow">
     
 
    <Home/>

      </main>
    
    </div>
  );
};

export default HomePage;
