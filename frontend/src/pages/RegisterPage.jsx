import Home from "../components/home/Home";
import Navbar from "../components/home/Navbar";
import Login from "../components/login/Login";
import Register from "../components/login/Register";




const RegisterPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
  <Navbar/>
      <main className="flex-grow">
     
 
   <Register/>

      </main>
    
    </div>
  );
};

export default RegisterPage;
