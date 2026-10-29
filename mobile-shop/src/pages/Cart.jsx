import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function Cart() {
  const {
    cart,
    cartCount,
    cartTotal,
    removeFromCart,
    changeQuantity,
  } = useShop();

  // DELIVERY CHARGE
  const deliveryCharge = cartTotal >= 1000 ? 0 : 50;

  const grandTotal = cartTotal + deliveryCharge;

  // EMPTY CART
  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <div className="container">
          <div className="empty-box cart-empty">
            <div className="empty-icon">
              <i className="bi bi-cart-x"></i>
            </div>

            <h2>Your Cart is Empty</h2>

            <p>
              Looks like you haven't added anything
              to your cart yet.
            </p>

            <Link
              to="/products"
              className="primary-btn"
            >
              <i className="bi bi-bag"></i>
              Start Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="container">

        {/* HEADER */}
        <div className="cart-page-header">
          <div>
            <span className="section-label">
              MOBILEHUB
            </span>

            <h1>Shopping Cart</h1>

            <p>
              Review your products before checkout.
            </p>
          </div>

          <div className="cart-count-box">
            <i className="bi bi-bag"></i>

            <span>
              {cartCount}{" "}
              {cartCount === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        <div className="cart-layout">

          {/* CART ITEMS */}
          <div className="cart-products">

            {cart.map((item) => (
              <div
                className="cart-product"
                key={`${item.id}-${item.selectedStorage}-${item.selectedColor}`}
              >

                {/* IMAGE */}
                <div className="cart-product-image">
                  <img
                    src={item.image}
                    alt={item.name}
                  />
                </div>

                {/* PRODUCT DETAILS */}
                <div className="cart-product-details">

                  <span className="cart-brand">
                    {item.brand}
                  </span>

                  <h3>{item.name}</h3>

                  {/* SELECTED VARIANTS */}
                  <div className="cart-variant-info">

                    <span>
                      <strong>Storage:</strong>{" "}
                      {item.selectedStorage ||
                        item.storage ||
                        "128GB"}
                    </span>

                    <span>
                      <strong>Color:</strong>{" "}
                      {item.selectedColor ||
                        "Black"}
                    </span>

                  </div>

                  <p className="cart-specs">
                    {item.specs ||
                      "Quality checked product"}
                  </p>

                  <div className="cart-product-price">
                    ₹
                    {item.price.toLocaleString(
                      "en-IN"
                    )}
                  </div>
                </div>

                {/* QUANTITY */}
                <div className="cart-product-actions">

                  <span className="quantity-label">
                    Quantity
                  </span>

                  <div className="quantity-box">

                    <button
                      type="button"
                      onClick={() =>
                        changeQuantity(
                          item.id,
                          -1,
                          item.selectedStorage,
                          item.selectedColor
                        )
                      }
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        changeQuantity(
                          item.id,
                          1,
                          item.selectedStorage,
                          item.selectedColor
                        )
                      }
                      aria-label="Increase quantity"
                    >
                      +
                    </button>

                  </div>

                </div>

                {/* TOTAL + REMOVE */}
                <div className="cart-product-total">

                  <strong>
                    ₹
                    {(
                      item.price *
                      item.quantity
                    ).toLocaleString("en-IN")}
                  </strong>

                  <button
                    type="button"
                    className="remove-cart-btn"
                    onClick={() =>
                      removeFromCart(
                        item.id,
                        item.selectedStorage,
                        item.selectedColor
                      )
                    }
                  >
                    <i className="bi bi-trash3"></i>
                    Remove
                  </button>

                </div>

              </div>
            ))}

            {/* CONTINUE SHOPPING */}
            <Link
              to="/products"
              className="continue-shopping"
            >
              <i className="bi bi-arrow-left"></i>
              Continue Shopping
            </Link>

          </div>

          {/* ORDER SUMMARY */}
          <aside className="cart-summary">

            <div className="summary-header">
              <h2>Order Summary</h2>
              <i className="bi bi-receipt"></i>
            </div>

            {/* SUBTOTAL */}
            <div className="summary-row">
              <span>Subtotal</span>

              <strong>
                ₹
                {cartTotal.toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>

            {/* DELIVERY */}
            <div className="summary-row">
              <span>Delivery</span>

              {deliveryCharge === 0 ? (
                <strong className="free-text">
                  FREE
                </strong>
              ) : (
                <strong>
                  ₹
                  {deliveryCharge.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              )}
            </div>

            {/* FREE DELIVERY MESSAGE */}
            {deliveryCharge === 0 ? (
              <div className="free-delivery-message">
                <i className="bi bi-check-circle-fill"></i>{" "}
                You are eligible for free delivery.
              </div>
            ) : (
              <div className="free-delivery-message">
                <i className="bi bi-info-circle"></i>{" "}
                Add products worth ₹
                {(1000 - cartTotal).toLocaleString(
                  "en-IN"
                )}{" "}
                more for free delivery.
              </div>
            )}

            <div className="summary-divider"></div>

            {/* GRAND TOTAL */}
            <div className="summary-total">
              <span>Total</span>

              <strong>
                ₹
                {grandTotal.toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>

            {/* CHECKOUT */}
            <Link
              to="/checkout"
              className="checkout-btn"
            >
              Proceed to Checkout
              <i className="bi bi-arrow-right"></i>
            </Link>

            {/* SECURITY */}
            <div className="cart-security">
              <i className="bi bi-shield-check"></i>

              <div>
                <strong>Safe &amp; Secure</strong>

                <span>
                  Secure checkout experience
                </span>
              </div>
            </div>

            {/* BENEFITS */}
            <div className="cart-benefits">

              <div>
                <i className="bi bi-truck"></i>
                <span>Free Delivery</span>
              </div>

              <div>
                <i className="bi bi-arrow-counterclockwise"></i>
                <span>Easy Returns</span>
              </div>

              <div>
                <i className="bi bi-headset"></i>
                <span>Customer Support</span>
              </div>

            </div>

          </aside>

        </div>
      </div>
    </main>
  );
}