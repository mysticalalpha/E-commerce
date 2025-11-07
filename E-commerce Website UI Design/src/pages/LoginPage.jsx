import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";

export function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  React.useEffect(() => {
    if (isAuthenticated) {
      const dest = location.state?.from || "/";
      navigate(dest);
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }
      // For demo, create account and log in
      login({ name, email, gender, age });
      toast.success("Account created and logged in!");
      setIsSignup(false);
      // Reset form
      setName("");
      setGender("");
      setAge("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      const state = location.state || {};
      if (state?.buyNow && state.productId) {
        const prod = products.find((p) => p.id === state.productId);
        if (prod) addToCart(prod);
        navigate(state.from || "/checkout");
      } else {
        navigate(state.from || "/");
      }
      return;
    }

    // Login flow
    login({ name: name || email.split("@")[0], email });
    toast.success("Logged in successfully!");
    const state = location.state || {};
    if (state?.buyNow && state.productId) {
      const prod = products.find((p) => p.id === state.productId);
      if (prod) addToCart(prod);
      navigate(state.from || "/checkout");
    } else {
      navigate(state.from || "/");
    }
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-gray-900 mb-2">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-gray-600">
              {isSignup ? "Sign up to get started" : "Log in to your account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Doe"
                      required={isSignup}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="26"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {isSignup ? (
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                    required={true}
                  />
                </div>
              </div>
            ) : null}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isSignup ? "Sign Up" : "Log In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
              }}
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              {isSignup
                ? "Already have an account? Log In"
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
