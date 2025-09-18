// import { useState, useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";

// export default function Login() {
//   const { loginUser } = useContext(AuthContext);
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     loginUser(formData.email, formData.password);
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-xl w-96">
//         <h2 className="text-2xl font-bold mb-4">Login</h2>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           className="w-full mb-3 p-2 border rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           className="w-full mb-4 p-2 border rounded"
//         />
//         <button type="submit" className="w-full bg-darkslate text-white py-2 rounded">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }


import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    const res = await loginUser(formData.email, formData.password);

    if (res.success) {
      toast.success("Login successful!");
      setTimeout(() => navigate("/"), 1500);
    } else {
      toast.error(res.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-darkslate text-white py-2 rounded"
        >
          Login
        </button>

        <p className="text-sm mt-4 text-center">
          New user?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
