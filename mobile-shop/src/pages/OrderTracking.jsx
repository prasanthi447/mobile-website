import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function OrderTracking() {
  const { orderId } = useParams();

  const {
    orders,
    moveToNextStatus,
  } = useShop();

  // =========================================
  // FIND SELECTED ORDER
  // =========================================

  const order = useMemo(() => {
    return (orders || []).find(
      (item) =>
        String(item.id) === String(orderId) ||
        String(item.orderId) === String(orderId)
    );
  }, [orders, orderId]);

  // =========================================
  // ORDER NOT FOUND
  // =========================================

  if (!order) {
    return (
      <main className="container py-5">
        <div className="text-center">
          <h3>Order Not Found</h3>

          <p className="text-muted">
            We couldn't find the order you are looking for.
          </p>

          <Link
            to="/orders"
            className="btn btn-dark"
          >
            Back to Orders
          </Link>
        </div>
      </main>
    );
  }

  // =========================================
  // CURRENT STATUS
  // =========================================

  const status = order.status || "Order Placed";

  // =========================================
  // TRACKING STEPS
  // =========================================

  const steps = [
    {
      title: "Order Placed",
      icon: "🛒",
    },
    {
      title: "Order Confirmed",
      icon: "✓",
    },
    {
      title: "Shipped",
      icon: "📦",
    },
    {
      title: "Out for Delivery",
      icon: "🚚",
    },
    {
      title: "Delivered",
      icon: "🏠",
    },
  ];

  // =========================================
  // CURRENT STEP INDEX
  // =========================================

  const statusIndex = steps.findIndex(
    (step) =>
      step.title.toLowerCase() ===
      status.toLowerCase()
  );

  const currentStep =
    statusIndex >= 0 ? statusIndex : 0;

  // =========================================
  // NEXT STATUS
  // =========================================

  const hasNextStatus =
    currentStep < steps.length - 1 &&
    status !== "Cancelled";

  const nextStatus = hasNextStatus
    ? steps[currentStep + 1].title
    : null;

  // =========================================
  // NEXT STATUS BUTTON
  // =========================================

  const handleNextStatus = () => {
    if (!hasNextStatus) {
      return;
    }

    moveToNextStatus(order.id);
  };

  return (
    <main className="container py-4">

      {/* =========================================
          PAGE TITLE
      ========================================= */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            Order Tracking
          </h2>

          <p className="text-muted mb-0">
            Track your order status
          </p>
        </div>

        <Link
          to="/orders"
          className="btn btn-outline-dark"
        >
          ← Back to Orders
        </Link>

      </div>

      {/* =========================================
          ORDER INFO
      ========================================= */}

      <div className="card shadow-sm border-0 mb-4">

        <div className="card-body">

          <div className="row g-3">

            {/* ORDER ID */}

            <div className="col-md-4">

              <small className="text-muted">
                Order ID
              </small>

              <h6 className="fw-bold mt-1">
                #
                {order.orderNumber ||
                  order.orderId ||
                  order.id}
              </h6>

            </div>

            {/* ORDER DATE */}

            <div className="col-md-4">

              <small className="text-muted">
                Order Date
              </small>

              <h6 className="fw-bold mt-1">
                {order.createdAt ||
                  order.date ||
                  "Date not available"}
              </h6>

            </div>

            {/* CURRENT STATUS */}

            <div className="col-md-4">

              <small className="text-muted">
                Current Status
              </small>

              <h6
                className={`fw-bold mt-1 ${
                  status === "Cancelled"
                    ? "text-danger"
                    : "text-success"
                }`}
              >
                {status}
              </h6>

            </div>

          </div>

        </div>

      </div>

      {/* =========================================
          CANCELLED ORDER
      ========================================= */}

      {status === "Cancelled" ? (

        <div className="card shadow-sm border-0 mb-4">

          <div className="card-body p-4 text-center">

            <div
              style={{
                fontSize: "50px",
                marginBottom: "15px",
              }}
            >
              ❌
            </div>

            <h4 className="fw-bold text-danger">
              Order Cancelled
            </h4>

            <p className="text-muted mb-0">
              This order has been cancelled.
            </p>

            {order.cancelledAt && (
              <small className="text-muted d-block mt-2">
                Cancelled on:{" "}
                {order.cancelledAt}
              </small>
            )}

          </div>

        </div>

      ) : (

        /* =========================================
           TRACKING CARD
        ========================================= */

        <div className="card shadow-sm border-0 mb-4">

          <div className="card-body p-4">

            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">

              <h5 className="fw-bold mb-0">
                Delivery Status
              </h5>

              {/* NEXT STATUS BUTTON */}

              {hasNextStatus && (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleNextStatus}
                >
                  Next Status →
                </button>
              )}

            </div>

            {/* NEXT STATUS INFO */}

            {hasNextStatus && (
              <div className="alert alert-light border mb-4">
                <strong>Next:</strong>{" "}
                {nextStatus}
              </div>
            )}

            {/* DELIVERED MESSAGE */}

            {!hasNextStatus &&
              status === "Delivered" && (
                <div className="alert alert-success mb-4">
                  ✓ Your order has been delivered.
                </div>
              )}

            {/* =========================================
                TRACKING STEPS
            ========================================= */}

            <div className="tracking-container">

              {steps.map((step, index) => {

                const completed =
                  index <= currentStep;

                const active =
                  index === currentStep;

                return (
                  <div
                    key={step.title}
                    className="tracking-step"
                  >

                    {/* CIRCLE */}

                    <div
                      className={`tracking-circle ${
                        completed
                          ? "completed"
                          : ""
                      } ${
                        active
                          ? "active"
                          : ""
                      }`}
                    >
                      {completed
                        ? "✓"
                        : step.icon}
                    </div>

                    {/* CONTENT */}

                    <div className="tracking-content">

                      <h6
                        className={
                          completed
                            ? "fw-bold mb-1"
                            : "text-muted mb-1"
                        }
                      >
                        {step.title}
                      </h6>

                      {active && (
                        <small className="text-success fw-semibold">
                          Current Status
                        </small>
                      )}

                      {!active &&
                        index < currentStep && (
                          <small className="text-muted">
                            Completed
                          </small>
                        )}

                    </div>

                    {/* LINE */}

                    {index <
                      steps.length - 1 && (
                      <div
                        className={`tracking-line ${
                          index < currentStep
                            ? "completed-line"
                            : ""
                        }`}
                      ></div>
                    )}

                  </div>
                );
              })}

            </div>

          </div>

        </div>
      )}

      {/* =========================================
          ORDER ITEMS
      ========================================= */}

      <div className="card shadow-sm border-0">

        <div className="card-body p-4">

          <h5 className="fw-bold mb-3">
            Order Items
          </h5>

          {(order.items || []).map(
            (item, index) => (

              <div
                key={`${
                  item.id ||
                  item.productId ||
                  "product"
                }-${index}`}
                className="d-flex align-items-center border-bottom py-3"
              >

                {/* IMAGE */}

                <img
                  src={
                    item.image ||
                    item.images?.[0] ||
                    "https://via.placeholder.com/80"
                  }
                  alt={item.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "contain",
                  }}
                  className="me-3"
                />

                {/* PRODUCT INFO */}

                <div className="flex-grow-1">

                  <h6 className="fw-bold mb-1">
                    {item.name}
                  </h6>

                  {item.brand && (
                    <small className="text-muted d-block">
                      Brand: {item.brand}
                    </small>
                  )}

                  <small className="text-muted d-block">
                    Storage:{" "}
                    {item.selectedStorage ||
                      item.storage ||
                      "128GB"}
                  </small>

                  <small className="text-muted d-block">
                    Color:{" "}
                    {item.selectedColor ||
                      "Black"}
                  </small>

                  <small className="text-muted">
                    Quantity:{" "}
                    {item.quantity || 1}
                  </small>

                </div>

                {/* PRICE */}

                <div className="fw-bold">

                  ₹
                  {(
                    Number(item.price || 0) *
                    Number(item.quantity || 1)
                  ).toLocaleString("en-IN")}

                </div>

              </div>
            )
          )}

          {/* =========================================
              TOTAL
          ========================================= */}

          <div className="text-end mt-3">

            <span className="text-muted me-2">
              Total:
            </span>

            <span className="fw-bold fs-5">

              ₹
              {Number(
                order.total ||
                  order.cartTotal ||
                  order.amount ||
                  0
              ).toLocaleString("en-IN")}

            </span>

          </div>

        </div>

      </div>

      {/* =========================================
          CSS
      ========================================= */}

      <style>{`

        .tracking-container {
          display: flex;
          justify-content: space-between;
          position: relative;
          padding: 20px 0;
        }

        .tracking-step {
          position: relative;
          flex: 1;
          text-align: center;
        }

        .tracking-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          margin: 0 auto 10px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #f1f1f1;
          color: #777;

          font-size: 20px;

          position: relative;
          z-index: 2;
        }

        .tracking-circle.completed {
          background: #198754;
          color: white;
        }

        .tracking-circle.active {
          box-shadow:
            0 0 0 5px
            rgba(25, 135, 84, 0.15);
        }

        .tracking-line {
          position: absolute;

          height: 4px;

          background: #e5e5e5;

          top: 22px;
          left: 50%;

          width: 100%;

          z-index: 1;
        }

        .tracking-line.completed-line {
          background: #198754;
        }

        .tracking-content {
          position: relative;
          z-index: 3;
        }

        @media (max-width: 768px) {

          .tracking-container {
            display: block;
          }

          .tracking-step {
            display: flex;
            align-items: center;
            text-align: left;
            min-height: 75px;
          }

          .tracking-circle {
            margin: 0 15px 0 0;
            flex-shrink: 0;
          }

          .tracking-line {
            width: 4px;
            height: 35px;

            top: 48px;
            left: 22px;
          }

        }

        @media (max-width: 576px) {

          .container.py-4 {
            padding-left: 12px;
            padding-right: 12px;
          }

          .tracking-circle {
            width: 42px;
            height: 42px;
            font-size: 17px;
          }

          .tracking-line {
            left: 19px;
          }

        }

      `}</style>

    </main>
  );
}