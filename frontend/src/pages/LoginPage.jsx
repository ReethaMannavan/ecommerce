import Home from "../components/home/Home";
import Navbar from "../components/home/Navbar";
import Login from "../components/login/Login";




const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
  <Navbar/>
      <main className="flex-grow">
     
 
   <Login/>

      </main>
    
    </div>
  );
};

export default LoginPage;
