import React from "react";
import { useOrders } from "../context/OrdersContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function OrdersPage() {
  const { orders } = useOrders();

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium">No orders yet</h2>
          <p className="text-sm text-gray-500 mt-2">
            Your completed orders will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-6">My Orders</h1>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg p-4 border">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm text-gray-500">Order ID</div>
                  <div className="font-medium">{order.id}</div>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-2">
                  {order.items.map((it) => (
                    <div key={it.id} className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded overflow-hidden bg-gray-100">
                        <ImageWithFallback
                          src={it.image}
                          alt={it.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{it.name}</div>
                        <div className="text-xs text-gray-500">
                          Qty: {it.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="text-sm text-gray-500">Total</div>
                  <div className="font-medium">${order.total.toFixed(2)}</div>
                  <div className="text-sm text-gray-500 mt-2">
                    Payment: {order.paymentMode}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    Delivery: {order.address.address1}, {order.address.city} -{" "}
                    {order.address.pincode}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
