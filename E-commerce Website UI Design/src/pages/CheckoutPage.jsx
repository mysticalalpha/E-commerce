import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, CheckCircle, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrdersContext";
import { useLocation } from "react-router-dom";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address1: "",
    address2: "",
    landmark: "",
    pincode: "",
    city: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [paymentMode, setPaymentMode] = useState("debit");

  const total = getCartTotal();
  const shipping = total >= 100 ? 0 : 10;
  const finalTotal = total + shipping;

  const { isAuthenticated, user } = useAuth();

  function getCityFromPincode(pin) {
    // small local mapping for common Indian pincodes (demo)
    const map = {
      110001: "New Delhi",
      400001: "Mumbai",
      560001: "Bengaluru",
      700001: "Kolkata",
      600001: "Chennai",
    };
    return map[pin] || "Unknown City";
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // basic validation: address1 and pincode required
    if (!formData.address1 || !formData.pincode) {
      alert("Please provide address line 1 and pincode.");
      return;
    }

    const city = getCityFromPincode(formData.pincode);

    // Create order object
    const order = {
      id: `ORD-${Date.now()}`,
      items: cartItems,
      total: finalTotal,
      shipping: shipping,
      address: {
        address1: formData.address1,
        address2: formData.address2,
        landmark: formData.landmark,
        pincode: formData.pincode,
        city,
      },
      paymentMode,
      createdAt: Date.now(),
      user: user?.email || null,
    };

    addOrder(order);
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    clearCart();
    navigate("/orders");
  };

  // Require login for checkout
  const location = useLocation();
  React.useEffect(() => {
    if (!isAuthenticated) {
      // redirect to login and preserve destination
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [isAuthenticated, navigate, location]);

  if (cartItems.length === 0 && !showSuccess) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Cart</span>
        </button>

        <h1 className="text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Information */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="text-gray-900 mb-6">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-700 mb-2">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      name="address1"
                      value={formData.address1}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="House no, Building, Street"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-700 mb-2">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      name="address2"
                      value={formData.address2}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Apartment, Colony, Area (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Landmark
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Near ..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="560001"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      City: {getCityFromPincode(formData.pincode)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="w-5 h-5 text-gray-700" />
                  <h2 className="text-gray-900">Payment Information</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3 flex-wrap">
                    <label
                      className={`px-3 py-2 rounded-lg border ${
                        paymentMode === "debit"
                          ? "bg-blue-50 border-blue-300"
                          : "bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMode"
                        value="debit"
                        checked={paymentMode === "debit"}
                        onChange={(e) => setPaymentMode(e.target.value)}
                        className="mr-2"
                      />{" "}
                      Debit Card
                    </label>
                    <label
                      className={`px-3 py-2 rounded-lg border ${
                        paymentMode === "credit"
                          ? "bg-blue-50 border-blue-300"
                          : "bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMode"
                        value="credit"
                        checked={paymentMode === "credit"}
                        onChange={(e) => setPaymentMode(e.target.value)}
                        className="mr-2"
                      />{" "}
                      Credit Card
                    </label>
                    <label
                      className={`px-3 py-2 rounded-lg border ${
                        paymentMode === "upi"
                          ? "bg-blue-50 border-blue-300"
                          : "bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMode"
                        value="upi"
                        checked={paymentMode === "upi"}
                        onChange={(e) => setPaymentMode(e.target.value)}
                        className="mr-2"
                      />{" "}
                      UPI
                    </label>
                    <label
                      className={`px-3 py-2 rounded-lg border ${
                        paymentMode === "netbanking"
                          ? "bg-blue-50 border-blue-300"
                          : "bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMode"
                        value="netbanking"
                        checked={paymentMode === "netbanking"}
                        onChange={(e) => setPaymentMode(e.target.value)}
                        className="mr-2"
                      />{" "}
                      Netbanking
                    </label>
                    <label
                      className={`px-3 py-2 rounded-lg border ${
                        paymentMode === "cod"
                          ? "bg-blue-50 border-blue-300"
                          : "bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMode"
                        value="cod"
                        checked={paymentMode === "cod"}
                        onChange={(e) => setPaymentMode(e.target.value)}
                        className="mr-2"
                      />{" "}
                      Cash on Delivery
                    </label>
                  </div>

                  {/* Conditional payment inputs */}
                  {(paymentMode === "debit" || paymentMode === "credit") && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className="w-full px-4 py-3 border rounded"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-4 py-3 border rounded"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength={4}
                          className="w-full px-4 py-3 border rounded"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {paymentMode === "upi" && (
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        name="upiId"
                        value={formData.upiId || ""}
                        onChange={handleInputChange}
                        placeholder="yourid@bank"
                        className="w-full px-4 py-3 border rounded"
                        required
                      />
                    </div>
                  )}

                  {paymentMode === "netbanking" && (
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Select Bank
                      </label>
                      <select
                        name="bank"
                        value={formData.bank || ""}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded"
                        required
                      >
                        <option value="">Select</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                      </select>
                    </div>
                  )}

                  {paymentMode === "cod" && (
                    <div className="text-sm text-gray-600">
                      You will pay in cash when the order is delivered.
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Complete Purchase - ${finalTotal.toFixed(2)}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-24">
              <h2 className="text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-2xl">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-gray-900 mb-4">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-8">
              Thank you for your purchase. Your order has been confirmed and
              will be shipped soon.
            </p>
            <button
              onClick={handleSuccessClose}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
