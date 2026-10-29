
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function Orders() {
  const {
    orders,
    cancelOrder,
    moveToNextStatus,
  } = useShop();

  if (orders.length === 0) {
    return (
      <main className="orders-page">
        <div className="container">

          <div className="orders-empty">

            <div className="orders-empty-icon">
              <i className="bi bi-box-seam"></i>
            </div>

            <h2>No Orders Yet</h2>

            <p>
              You haven't placed any orders yet.
              Start shopping and your orders will appear here.
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
    <main className="orders-page">

      <div className="container">

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="orders-header">

          <div>

            <span className="section-label">
              MOBILEHUB
            </span>

            <h1>My Orders</h1>

            <p>
              Track and manage your recent orders.
            </p>

          </div>

          <Link
            to="/products"
            className="secondary-btn"
          >
            <i className="bi bi-arrow-left"></i>
            Continue Shopping
          </Link>

        </div>

        {/* =========================================
            ORDERS LIST
        ========================================= */}

        <div className="orders-list">

          {orders.map((order) => {

            const status =
              order.status || "Order Placed";

            const isCancelled =
              status === "Cancelled";

            const isDelivered =
              status === "Delivered";

            return (

              <div
                className="order-card"
                key={order.id}
              >

                {/* =====================================
                    ORDER TOP
                ===================================== */}

                <div className="order-top">

                  <div>

                    <span className="order-label">
                      ORDER ID
                    </span>

                    <h3>
                      {order.orderNumber ||
                        `MH${order.id}`}
                    </h3>

                    <p>
                      Placed on{" "}
                      {order.createdAt ||
                        "Date not available"}
                    </p>

                  </div>

                  <div
                    className={`order-status ${
                      isCancelled
                        ? "order-status-cancelled"
                        : isDelivered
                        ? "order-status-delivered"
                        : ""
                    }`}
                  >

                    <i
                      className={
                        isCancelled
                          ? "bi bi-x-circle-fill"
                          : isDelivered
                          ? "bi bi-house-check-fill"
                          : "bi bi-check-circle-fill"
                      }
                    ></i>

                    {status}

                  </div>

                </div>

                {/* =====================================
                    ORDER ITEMS
                ===================================== */}

                <div className="order-items">

                  {order.items.map(
                    (item, index) => (

                      <div
                        className="order-item"
                        key={`${
                          item.id
                        }-${
                          item.selectedStorage ||
                          ""
                        }-${
                          item.selectedColor ||
                          ""
                        }-${index}`}
                      >

                        <img
                          src={item.image}
                          alt={item.name}
                        />

                        <div className="order-item-info">

                          <span>
                            {item.brand}
                          </span>

                          <h4>
                            {item.name}
                          </h4>

                          <div className="order-variant-info">

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

                        <strong>
                          ₹
                          {(
                            Number(
                              item.price || 0
                            ) *
                            Number(
                              item.quantity || 1
                            )
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                      </div>

                    )
                  )}

                </div>

                {/* =====================================
                    ORDER BOTTOM
                ===================================== */}

                <div className="order-bottom">

                  <div className="order-detail">

                    <span>
                      Payment
                    </span>

                    <strong>
                      {order.paymentMethod ===
                      "cod"
                        ? "Cash on Delivery"
                        : order.paymentMethod ===
                          "upi"
                        ? "UPI"
                        : "Credit / Debit Card"}
                    </strong>

                  </div>

                  <div className="order-detail">

                    <span>
                      Delivery
                    </span>

                    <strong>
                      {order.deliveryCharge === 0
                        ? "FREE"
                        : `₹${order.deliveryCharge}`}
                    </strong>

                  </div>

                  <div className="order-total">

                    <span>
                      Total Amount
                    </span>

                    <strong>
                      ₹
                      {Number(
                        order.total || 0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                  </div>

                </div>

                {/* =====================================
                    ADDRESS
                ===================================== */}

                <div className="order-address">

                  <div className="address-icon">

                    <i className="bi bi-geo-alt"></i>

                  </div>

                  <div>

                    <span>
                      Delivery Address
                    </span>

                    <p>
                      {order.customer?.name}
                      <br />

                      {order.customer?.address}
                      <br />

                      {order.customer?.city},{" "}
                      {order.customer?.state} -{" "}
                      {order.customer?.pincode}
                    </p>

                  </div>

                </div>

                {/* =====================================
                    CONTACT
                ===================================== */}

                <div className="order-contact">

                  {order.customer?.phone && (

                    <div>
                      <i className="bi bi-telephone"></i>
                      <span>
                        {order.customer.phone}
                      </span>
                    </div>

                  )}

                  {order.customer?.email && (

                    <div>
                      <i className="bi bi-envelope"></i>
                      <span>
                        {order.customer.email}
                      </span>
                    </div>

                  )}

                </div>

                {/* =====================================
                    ACTIONS
                ===================================== */}

                <div className="order-actions">

                  {/* VIEW ORDER */}

                  <Link
                    to={`/orders/${order.id}`}
                    className="order-view-btn"
                  >
                    <i className="bi bi-eye"></i>
                    View Order
                  </Link>

                  {/* TRACK ORDER */}

                  {!isCancelled && (

                    <Link
                      to={`/orders/${order.id}/track`}
                      className="order-track-btn"
                    >
                      <i className="bi bi-truck"></i>
                      Track Order
                    </Link>

                  )}

                  {/* NEXT STATUS */}

                  {!isCancelled &&
                    !isDelivered && (

                      <button
                        type="button"
                        className="order-next-btn"
                        onClick={() =>
                          moveToNextStatus(
                            order.id
                          )
                        }
                      >

                        <i className="bi bi-arrow-right-circle"></i>

                        Next Status

                      </button>

                  )}

                  {/* CANCEL ORDER */}

                  {!isCancelled &&
                    !isDelivered && (

                      <button
                        type="button"
                        className="order-cancel-btn"
                        onClick={() => {

                          const confirmCancel =
                            window.confirm(
                              "Are you sure you want to cancel this order?"
                            );

                          if (
                            confirmCancel
                          ) {
                            cancelOrder(
                              order.id
                            );
                          }

                        }}
                      >

                        <i className="bi bi-x-circle"></i>

                        Cancel Order

                      </button>

                  )}

                </div>

              </div>

            );
          })}

        </div>

      </div>

      {/* =========================================
          EXTRA BUTTON STYLE
      ========================================= */}

      <style>{`

        .order-next-btn {
          border: 1px solid #198754;
          background: #198754;
          color: white;
          padding: 10px 16px;
          border-radius: 8px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .order-next-btn:hover {
          background: #157347;
          border-color: #157347;
        }

        .order-status-cancelled {
          color: #dc3545 !important;
          background: #fff1f2 !important;
        }

        .order-status-delivered {
          color: #198754 !important;
          background: #eaf7ef !important;
        }

        @media (max-width: 768px) {

          .order-next-btn {
            width: 100%;
            justify-content: center;
          }

        }

      `}</style>

    </main>
  );
}
