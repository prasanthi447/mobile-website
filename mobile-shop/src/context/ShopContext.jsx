
import { createContext, useContext, useState } from "react";

const ShopContext = createContext();

// =========================================
// GET DATA FROM LOCAL STORAGE
// =========================================

const getStoredData = (key, defaultValue) => {
  try {
    const storedData = localStorage.getItem(key);

    return storedData
      ? JSON.parse(storedData)
      : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return defaultValue;
  }
};

// =========================================
// SHOP PROVIDER
// =========================================

export function ShopProvider({ children }) {

  // =========================================
  // CART
  // =========================================

  const [cart, setCart] = useState(() =>
    getStoredData("mobilehub_cart", [])
  );

  // =========================================
  // WISHLIST
  // =========================================

  const [wishlist, setWishlist] = useState(() =>
    getStoredData("mobilehub_wishlist", [])
  );

  // =========================================
  // ORDERS
  // =========================================

  const [orders, setOrders] = useState(() =>
    getStoredData("mobilehub_orders", [])
  );

  // =========================================
  // SAVE CART
  // =========================================

  const saveCart = (updatedCart) => {
    setCart(updatedCart);

    localStorage.setItem(
      "mobilehub_cart",
      JSON.stringify(updatedCart)
    );
  };

  // =========================================
  // SAVE WISHLIST
  // =========================================

  const saveWishlist = (updatedWishlist) => {
    setWishlist(updatedWishlist);

    localStorage.setItem(
      "mobilehub_wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  // =========================================
  // SAVE ORDERS
  // =========================================

  const saveOrders = (updatedOrders) => {
    setOrders(updatedOrders);

    localStorage.setItem(
      "mobilehub_orders",
      JSON.stringify(updatedOrders)
    );
  };

  // =========================================
  // ADD TO CART
  // =========================================

  const addToCart = (
    product,
    selectedStorage,
    selectedColor
  ) => {

    const existingProduct = cart.find(
      (item) =>
        item.id === product.id &&
        item.selectedStorage === selectedStorage &&
        item.selectedColor === selectedColor
    );

    let updatedCart;

    if (existingProduct) {

      updatedCart = cart.map((item) =>
        item.id === product.id &&
        item.selectedStorage === selectedStorage &&
        item.selectedColor === selectedColor
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

    } else {

      updatedCart = [
        ...cart,
        {
          ...product,
          selectedStorage,
          selectedColor,
          quantity: 1,
        },
      ];

    }

    saveCart(updatedCart);
  };

  // =========================================
  // REMOVE FROM CART
  // =========================================

  const removeFromCart = (
    productId,
    selectedStorage,
    selectedColor
  ) => {

    const updatedCart = cart.filter(
      (item) =>
        !(
          item.id === productId &&
          item.selectedStorage === selectedStorage &&
          item.selectedColor === selectedColor
        )
    );

    saveCart(updatedCart);
  };

  // =========================================
  // CHANGE CART QUANTITY
  // =========================================

  const changeQuantity = (
    productId,
    change,
    selectedStorage,
    selectedColor
  ) => {

    const updatedCart = cart
      .map((item) => {

        if (
          item.id === productId &&
          item.selectedStorage === selectedStorage &&
          item.selectedColor === selectedColor
        ) {
          return {
            ...item,
            quantity: item.quantity + change,
          };
        }

        return item;
      })
      .filter(
        (item) => item.quantity > 0
      );

    saveCart(updatedCart);
  };

  // =========================================
  // TOGGLE WISHLIST
  // =========================================

  const toggleWishlist = (product) => {

    const exists = wishlist.some(
      (item) => item.id === product.id
    );

    let updatedWishlist;

    if (exists) {

      updatedWishlist = wishlist.filter(
        (item) => item.id !== product.id
      );

    } else {

      updatedWishlist = [
        ...wishlist,
        product,
      ];

    }

    saveWishlist(updatedWishlist);
  };

  // =========================================
  // CHECK WISHLIST
  // =========================================

  const isWishlisted = (productId) => {
    return wishlist.some(
      (item) => item.id === productId
    );
  };

  // =========================================
  // CART COUNT
  // =========================================

  const cartCount = cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  // =========================================
  // CART TOTAL
  // =========================================

  const cartTotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  // =========================================
  // PLACE ORDER
  // =========================================

  const placeOrder = (orderDetails) => {

    if (cart.length === 0) {
      return null;
    }

    const newOrder = {
      id: Date.now(),

      orderNumber: `MH${Date.now()}`,

      items: [...cart],

      customer:
        orderDetails.customer,

      paymentMethod:
        orderDetails.paymentMethod,

      deliveryCharge:
        orderDetails.deliveryCharge,

      total:
        orderDetails.total,

      status: "Order Placed",

      createdAt:
        new Date().toLocaleString("en-IN"),
    };

    const updatedOrders = [
      newOrder,
      ...orders,
    ];

    saveOrders(updatedOrders);

    saveCart([]);

    return newOrder;
  };

  // =========================================
  // UPDATE ORDER STATUS
  // =========================================

  const updateOrderStatus = (
    orderId,
    newStatus
  ) => {

    setOrders((currentOrders) => {

      const updatedOrders =
        currentOrders.map((order) => {

          if (
            String(order.id) !==
            String(orderId)
          ) {
            return order;
          }

          return {
            ...order,
            status: newStatus,
            statusUpdatedAt:
              new Date().toLocaleString(
                "en-IN"
              ),
          };
        });

      localStorage.setItem(
        "mobilehub_orders",
        JSON.stringify(updatedOrders)
      );

      return updatedOrders;
    });
  };

  // =========================================
  // MOVE TO NEXT STATUS
  // =========================================

  const moveToNextStatus = (orderId) => {

    const trackingSteps = [
      "Order Placed",
      "Order Confirmed",
      "Shipped",
      "Out for Delivery",
      "Delivered",
    ];

    setOrders((currentOrders) => {

      const updatedOrders =
        currentOrders.map((order) => {

          // Find selected order
          if (
            String(order.id) !==
            String(orderId)
          ) {
            return order;
          }

          // Don't update cancelled order
          if (
            order.status === "Cancelled"
          ) {
            return order;
          }

          const currentStatus =
            order.status ||
            "Order Placed";

          const currentIndex =
            trackingSteps.findIndex(
              (step) =>
                step.toLowerCase() ===
                currentStatus.toLowerCase()
            );

          // Invalid status
          if (currentIndex === -1) {
            return order;
          }

          // Already delivered
          if (
            currentIndex >=
            trackingSteps.length - 1
          ) {
            return order;
          }

          const nextStatus =
            trackingSteps[
              currentIndex + 1
            ];

          return {
            ...order,

            status: nextStatus,

            statusUpdatedAt:
              new Date().toLocaleString(
                "en-IN"
              ),
          };
        });

      // Save updated orders
      localStorage.setItem(
        "mobilehub_orders",
        JSON.stringify(updatedOrders)
      );

      return updatedOrders;
    });
  };

  // =========================================
  // CANCEL ORDER
  // =========================================

  const cancelOrder = (orderId) => {

    setOrders((currentOrders) => {

      const updatedOrders =
        currentOrders.map((order) => {

          if (
            String(order.id) !==
            String(orderId)
          ) {
            return order;
          }

          // Delivered order cannot be cancelled
          if (
            order.status === "Delivered"
          ) {
            return order;
          }

          return {
            ...order,

            status: "Cancelled",

            cancelledAt:
              new Date().toLocaleString(
                "en-IN"
              ),
          };
        });

      localStorage.setItem(
        "mobilehub_orders",
        JSON.stringify(updatedOrders)
      );

      return updatedOrders;
    });
  };

  // =========================================
  // PROVIDER
  // =========================================

  return (
    <ShopContext.Provider
      value={{

        // CART
        cart,
        addToCart,
        removeFromCart,
        changeQuantity,
        cartCount,
        cartTotal,

        // WISHLIST
        wishlist,
        toggleWishlist,
        isWishlisted,

        // ORDERS
        orders,
        placeOrder,
        cancelOrder,

        // TRACKING
        updateOrderStatus,
        moveToNextStatus,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

// =========================================
// USE SHOP HOOK
// =========================================

export function useShop() {
  return useContext(ShopContext);
}
