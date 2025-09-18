import { useEffect, useState } from "react";
import API from "../../api/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("orders/").then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.map((o) => (
        <div key={o.id} className="border-b py-3">
          <p>Order #{o.id} - {o.status}</p>
          <p>Total: ₹{o.total_price}</p>
        </div>
      ))}
    </div>
  );
}
