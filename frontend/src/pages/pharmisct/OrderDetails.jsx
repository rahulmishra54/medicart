import { Link, useParams } from "react-router-dom";
import PharmacistLayout from "./PharmacistLayout.jsx";

const OrderDetails = () => {
  const { orderId } = useParams();
  const lineItems = [
    { name: "Paracetamol 500 mg", quantity: 2, price: "₹64" },
    { name: "Vitamin C 500 mg", quantity: 1, price: "₹220" },
    { name: "Digital thermometer", quantity: 1, price: "₹558" },
  ];

  return (
    <PharmacistLayout>
      <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
        <header className="flex flex-wrap items-end justify-between gap-4"><div><Link to="/pharmacist/orders" className="text-sm font-medium text-[#15966F] hover:underline">← Orders</Link><h1 className="mt-2 text-2xl font-bold text-[#17324D]">Order {orderId}</h1><p className="mt-1 text-sm text-[#718096]">Placed 05 Oct 2026 at 10:42 AM</p></div><span className="rounded-full bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700">Processing</span></header>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="overflow-hidden rounded-xl border border-[#E2EDF1] bg-white">
            <div className="border-b border-[#EEF3F5] px-5 py-4"><h2 className="font-semibold text-[#17324D]">Items ordered</h2></div>
            <div className="divide-y divide-[#EEF3F5]">{lineItems.map((item) => <div key={item.name} className="flex items-center justify-between gap-4 px-5 py-4"><div><p className="font-medium text-[#17324D]">{item.name}</p><p className="mt-1 text-sm text-[#718096]">Quantity: {item.quantity}</p></div><span className="font-semibold text-[#17324D]">{item.price}</span></div>)}</div>
            <div className="space-y-2 border-t border-[#EEF3F5] bg-[#F8FBFC] px-5 py-4 text-sm"><div className="flex justify-between text-[#64748B]"><span>Subtotal</span><span>₹842</span></div><div className="flex justify-between text-[#64748B]"><span>Delivery</span><span>Free</span></div><div className="flex justify-between pt-2 text-base font-bold text-[#17324D]"><span>Total</span><span>₹842</span></div></div>
          </section>
          <div className="space-y-6">
            <section className="rounded-xl border border-[#E2EDF1] bg-white p-5"><h2 className="font-semibold text-[#17324D]">Customer</h2><p className="mt-4 font-medium text-[#17324D]">Aarav Sharma</p><p className="mt-1 text-sm text-[#64748B]">+91 98765 43210</p><p className="mt-3 text-sm leading-6 text-[#64748B]">14 Green Park Extension<br />New Delhi, Delhi 110016</p></section>
            <section className="rounded-xl border border-[#E2EDF1] bg-white p-5"><h2 className="font-semibold text-[#17324D]">Fulfillment</h2><label className="mt-4 block text-sm text-[#64748B]">Order status<select defaultValue="Processing" className="mt-2 h-11 w-full rounded-lg border border-[#DCE7EC] bg-white px-3 text-sm text-[#17324D]"><option>Processing</option><option>Ready to ship</option><option>Delivered</option><option>Cancelled</option></select></label><button type="button" className="mt-4 w-full rounded-lg bg-[#15966F] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#117F5E]">Update order</button></section>
          </div>
        </div>
      </div>
    </PharmacistLayout>
  );
};

export default OrderDetails;