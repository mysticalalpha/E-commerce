import React, { createContext, useContext, useEffect, useState } from "react";

const OrdersContext = createContext(undefined);

const ORDERS_STORAGE_KEY = "app_orders";

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (raw) setOrders(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  const persist = (next) => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.error("Failed to persist orders", e);
    }
  };

  const addOrder = (order) => {
    setOrders((prev) => {
      const next = [order, ...(prev || [])];
      persist(next);
      return next;
    });
  };

  const clearOrders = () => {
    setOrders([]);
    try {
      localStorage.removeItem(ORDERS_STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear orders", e);
    }
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, clearOrders }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
}

export default OrdersProvider;
