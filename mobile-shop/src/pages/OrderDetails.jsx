import { Link, useParams } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function OrderDetails() {
  const { orderId } = useParams();

  const {
    orders,
    cancelOrder,
  } = useShop();

  // FIND ORDER
  const order = orders.find(
    (item) =>
      String(item.id) === String(orderId)
  );

  // ==============================
  // ORDER NOT FOUND
  // ==============================

  if (!order) {
    return (
      <main className="orders-page">
        <div className="container">
          <div className="orders-empty">

            <div className="orders-empty-icon">
              <i className="bi bi-box-seam"></i>
            </div>

            <h2>Order Not Found</h2>

            <p>
              The order you are looking for
              does not exist.
            </p>

            <Link
              to="/orders"
              className="primary-btn"
            >
              <i className="bi bi-arrow-left"></i>
              Back to Orders
            </Link>

          </div>
        </div>
      </main>
    );
  }

  // ==============================
  // PAYMENT NAME
  // ==============================

  const paymentName =
    order.paymentMethod === "cod"
      ? "Cash on Delivery"
      : order.paymentMethod === "upi"
      ? "UPI"
      : "Credit / Debit Card";

  // ==============================
  // CANCEL ORDER
  // ==============================

  const handleCancelOrder = () => {
  const confirmed = window.confirm(
    "Are you sure you want to cancel this order?"
  );

  if (!confirmed) return;

  cancelOrder(order.id);
};

  // ==============================
  // PAGE
  // ==============================

  return (
    <main className="order-details-page">

      <div className="container">

        {/* ==========================
            HEADER
        ========================== */}

        <div className="order-details-header">

          <div>

            <span className="section-label">
              MOBILEHUB
            </span>

            <h1>
              Order Details
            </h1>

            <p>
              Order ID:{" "}
              <strong>
                {order.orderNumber ||
                  `MH${order.id}`}
              </strong>
            </p>

          </div>

          <Link
            to="/orders"
            className="secondary-btn"
          >
            <i className="bi bi-arrow-left"></i>
            Back to Orders
          </Link>

        </div>

        {/* ==========================
            ORDER STATUS
        ========================== */}

        <section
          className={`order-details-card order-status-card ${
            order.status === "Order Cancelled"
              ? "cancelled-status"
              : ""
          }`}
        >

          <div className="status-icon">

            <i
              className={
                order.status === "Order Cancelled"
                  ? "bi bi-x-lg"
                  : "bi bi-check-lg"
              }
            ></i>

          </div>

          <div>

            <span>
              Order Status
            </span>

            <h2>
              {order.status || "Order Placed"}
            </h2>

            <p>
              Placed on {order.createdAt}
            </p>

            {order.cancelledAt && (
              <p>
                Cancelled on {order.cancelledAt}
              </p>
            )}

          </div>

        </section>
        {/* ORDER TRACKING */}

{order.status !== "Order Cancelled" && (
  <section className="order-details-card tracking-card">
    <div className="details-card-header">
      <div>
        <h2>Order Tracking</h2>
        <p>Track your order status</p>
      </div>
    </div>

    <div className="tracking-steps">

      <div className="tracking-step active">
        <div className="tracking-icon">
          <i className="bi bi-check-lg"></i>
        </div>

        <div className="tracking-info">
          <strong>Order Placed</strong>
          <span>Your order has been placed</span>
        </div>
      </div>

      <div className="tracking-line"></div>

      <div className="tracking-step">
        <div className="tracking-icon">
          <i className="bi bi-box-seam"></i>
        </div>

        <div className="tracking-info">
          <strong>Confirmed</strong>
          <span>Order confirmation pending</span>
        </div>
      </div>

      <div className="tracking-line"></div>

      <div className="tracking-step">
        <div className="tracking-icon">
          <i className="bi bi-truck"></i>
        </div>

        <div className="tracking-info">
          <strong>Shipped</strong>
          <span>Package will be shipped</span>
        </div>
      </div>

      <div className="tracking-line"></div>

      <div className="tracking-step">
        <div className="tracking-icon">
          <i className="bi bi-geo-alt"></i>
        </div>

        <div className="tracking-info">
          <strong>Out for Delivery</strong>
          <span>Package is on the way</span>
        </div>
      </div>

      <div className="tracking-line"></div>

      <div className="tracking-step">
        <div className="tracking-icon">
          <i className="bi bi-house-check"></i>
        </div>

        <div className="tracking-info">
          <strong>Delivered</strong>
          <span>Package delivered successfully</span>
        </div>
      </div>

    </div>
  </section>
)}

        {/* ==========================
            MAIN LAYOUT
        ========================== */}

        <div className="order-details-layout">

          {/* ========================
              LEFT SIDE
          ======================== */}

          <div className="order-details-main">

            {/* ======================
                ORDERED PRODUCTS
            ====================== */}

            <section className="order-details-card">

              <div className="details-card-header">

                <div>

                  <h2>
                    Ordered Products
                  </h2>

                  <p>
                    {order.items.length}{" "}
                    {order.items.length === 1
                      ? "product"
                      : "products"}
                  </p>

                </div>

              </div>

              <div className="details-products">

                {order.items.map(
                  (item, index) => (

                    <div
                      className="details-product"
                      key={`${item.id}-${item.selectedStorage || ""}-${item.selectedColor || ""}-${index}`}
                    >

                      <div className="details-product-image">

                        <img
                          src={item.image}
                          alt={item.name}
                        />

                      </div>

                      <div className="details-product-info">

                        <span>
                          {item.brand}
                        </span>

                        <h3>
                          {item.name}
                        </h3>

                        <div className="details-variants">

                          <p>
                            <strong>
                              Storage:
                            </strong>{" "}
                            {item.selectedStorage ||
                              item.storage ||
                              "128GB"}
                          </p>

                          <p>
                            <strong>
                              Color:
                            </strong>{" "}
                            {item.selectedColor ||
                              "Black"}
                          </p>

                          <p>
                            <strong>
                              Quantity:
                            </strong>{" "}
                            {item.quantity}
                          </p>

                        </div>

                      </div>

                      <strong className="details-product-price">

                        ₹
                        {(
                          item.price *
                          item.quantity
                        ).toLocaleString(
                          "en-IN"
                        )}

                      </strong>

                    </div>
                  )
                )}

              </div>

            </section>

            {/* ======================
                DELIVERY ADDRESS
            ====================== */}

            <section className="order-details-card">

              <div className="details-card-header">

                <div>

                  <h2>
                    Delivery Address
                  </h2>

                  <p>
                    Shipping information
                  </p>

                </div>

              </div>

              <div className="details-address">

                <div className="details-address-icon">

                  <i className="bi bi-geo-alt"></i>

                </div>

                <div>

                  <strong>
                    {order.customer?.name}
                  </strong>

                  <p>

                    {order.customer?.address}

                    <br />

                    {order.customer?.city},{" "}
                    {order.customer?.state} -{" "}
                    {order.customer?.pincode}

                  </p>

                  {order.customer?.phone && (
                    <div className="details-contact">

                      <i className="bi bi-telephone"></i>

                      {order.customer.phone}

                    </div>
                  )}

                  {order.customer?.email && (
                    <div className="details-contact">

                      <i className="bi bi-envelope"></i>

                      {order.customer.email}

                    </div>
                  )}

                </div>

              </div>

            </section>

          </div>

          {/* ========================
              RIGHT SIDE
          ======================== */}

          <aside className="order-details-sidebar">

            {/* ======================
                ORDER SUMMARY
            ====================== */}

            <section className="order-details-card">

              <div className="details-card-header">

                <div>

                  <h2>
                    Order Summary
                  </h2>

                  <p>
                    Payment and price details
                  </p>

                </div>

              </div>

              <div className="details-summary">

                <div>

                  <span>
                    Subtotal
                  </span>

                  <strong>

                    ₹
                    {(
                      order.total -
                      (order.deliveryCharge || 0)
                    ).toLocaleString(
                      "en-IN"
                    )}

                  </strong>

                </div>

                <div>

                  <span>
                    Delivery
                  </span>

                  <strong
                    className={
                      order.deliveryCharge === 0
                        ? "free-text"
                        : ""
                    }
                  >

                    {order.deliveryCharge === 0
                      ? "FREE"
                      : `₹${order.deliveryCharge}`}

                  </strong>

                </div>

                <div className="details-total">

                  <span>
                    Total Amount
                  </span>

                  <strong>

                    ₹
                    {order.total.toLocaleString(
                      "en-IN"
                    )}

                  </strong>

                </div>

              </div>

            </section>

            {/* ======================
                PAYMENT METHOD
            ====================== */}

            <section className="order-details-card">

              <div className="details-card-header">

                <div>

                  <h2>
                    Payment Method
                  </h2>

                  <p>
                    Selected payment option
                  </p>

                </div>

              </div>

              <div className="details-payment">

                <div className="details-payment-icon">

                  <i
                    className={
                      order.paymentMethod === "cod"
                        ? "bi bi-cash"
                        : order.paymentMethod === "upi"
                        ? "bi bi-phone"
                        : "bi bi-credit-card"
                    }
                  ></i>

                </div>

                <div>

                  <strong>
                    {paymentName}
                  </strong>

                  <span>
                    Payment method selected
                    at checkout
                  </span>

                </div>

              </div>

            </section>

            {/* ==============================
                CANCEL ORDER BUTTON
            ============================== */}

            {order.status !== "Order Cancelled" && (
              <button
                type="button"
                className="cancel-order-btn"
                onClick={handleCancelOrder}
              >

                <i className="bi bi-x-circle"></i>

                Cancel Order

              </button>
            )}

            {/* ==============================
                CANCELLED MESSAGE
            ============================== */}

            {order.status === "Order Cancelled" && (
              <div className="cancelled-message">

                <i className="bi bi-x-circle-fill"></i>

                <span>
                  This order has been cancelled.
                </span>

              </div>
            )}

            {/* ======================
                CONTINUE SHOPPING
            ====================== */}

            <Link
              to="/products"
              className="details-shop-btn"
            >

              <i className="bi bi-bag"></i>

              Continue Shopping

            </Link>

          </aside>

        </div>

      </div>

    </main>
  );
}