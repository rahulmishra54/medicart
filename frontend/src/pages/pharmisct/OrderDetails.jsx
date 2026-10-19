import { Link, useParams } from "react-router-dom";
import PharmacistLayout from "./PharmacistLayout.jsx";
import { useState, useEffect } from "react";
import api from "../../api/api.js";
const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [lineItems, setLineItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchOrderDetails = async () => {
    try{
      const response = await api.get(`/orders/${orderId}`);
      if (!response.data.success || !response.data.order || !Array.isArray(response.data.orderItems)) {
        throw new Error(response.data.message || "Order details are not available.");
      }
      if (isMounted) {
        setLineItems(response.data.orderItems);
        setOrder(response.data.order);
      }
    }catch(error){
      if (isMounted) setError(error.response?.data?.message || error.message || "Unable to load order.");
    } finally {
      if (isMounted) setLoading(false);
    }
    };
    fetchOrderDetails();
    return () => {
      isMounted = false;
    };
  }, [orderId]);

  const currency = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });

  return (
    <PharmacistLayout>
      <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
        <header className="flex flex-wrap items-end justify-between gap-4"><div><Link to="/pharmacist/orders" className="text-sm font-medium text-[#15966F] hover:underline">← Orders</Link><h1 className="mt-2 text-2xl font-bold text-[#17324D]">Order {order?._id || orderId}</h1><p className="mt-1 text-sm text-[#718096]">Placed {order?.orderDate ? new Date(order.orderDate).toLocaleString("en-IN") : "—"}</p></div>{order && <span className="rounded-full bg-amber-50 px-3 py-1.5 text-sm font-medium capitalize text-amber-700">{order.status}</span>}</header>
        {loading && <p className="text-sm text-slate-500">Loading order...</p>}
        {error && <p role="alert" className="text-sm text-red-700">Unable to load order: {error}</p>}
        {order && <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="overflow-hidden rounded-xl border border-[#E2EDF1] bg-white">
            <div className="border-b border-[#EEF3F5] px-5 py-4"><h2 className="font-semibold text-[#17324D]">Items ordered</h2></div>
            <div className="divide-y divide-[#EEF3F5]">{lineItems.map((item) => <div key={item._id} className="flex items-center justify-between gap-4 px-5 py-4"><div><p className="font-medium text-[#17324D]">{item.medicine?.name || "Medicine"}</p><p className="mt-1 text-sm text-[#718096]">Quantity: {item.quantity}</p></div><span className="font-semibold text-[#17324D]">{currency.format(item.totalPrice ?? item.unitPrice * item.quantity)}</span></div>)}</div>
            <div className="flex justify-between border-t border-[#EEF3F5] bg-[#F8FBFC] px-5 py-4 text-base font-bold text-[#17324D]"><span>Total</span><span>{currency.format(order.totalAmount || 0)}</span></div>
          </section>
          <div className="space-y-6">
            <section className="rounded-xl border border-[#E2EDF1] bg-white p-5"><h2 className="font-semibold text-[#17324D]">Customer</h2><p className="mt-4 font-medium text-[#17324D]">{order.user?.name || "Customer"}</p><p className="mt-1 text-sm text-[#64748B]">{order.user?.phone || "—"}</p><p className="mt-3 text-sm leading-6 text-[#64748B]">{order.deliveryAddress || "—"}</p></section>
            <section className="rounded-xl border border-[#E2EDF1] bg-white p-5"><h2 className="font-semibold text-[#17324D]">Payment</h2><p className="mt-2 text-sm capitalize text-[#64748B]">{order.paymentStatus || "pending"}</p></section>
          </div>
        </div>}
      </div>
    </PharmacistLayout>
  );
};

export default OrderDetails;