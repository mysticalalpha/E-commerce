import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";
import { OrdersProvider } from "./context/OrdersContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { PromoBanner } from "./components/home/PromoBanner";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { WishlistPage } from "./pages/WishlistPage";
import { ProfilePage } from "./pages/ProfilePage";
import { OrdersPage } from "./pages/OrdersPage";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <WishlistProvider>
          <OrdersProvider>
            <CartProvider>
              <div className="flex flex-col min-h-screen">
                <PromoBanner />
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                      path="/product/:id"
                      element={<ProductDetailsPage />}
                    />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                  </Routes>
                </main>
                <Footer />
                <Toaster position="top-right" richColors />
              </div>
            </CartProvider>
          </OrdersProvider>
        </WishlistProvider>
      </AuthProvider>
    </Router>
  );
}
