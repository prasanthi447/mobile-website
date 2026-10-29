import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";


export default function Checkout() {
  const {
    cart,
    cartTotal,
    placeOrder,
  } = useShop();

  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const deliveryCharge =
    cartTotal >= 1000 ? 0 : 50;

  const grandTotal =
    cartTotal + deliveryCharge;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCustomer((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (
      !customer.name.trim() ||
      !customer.phone.trim() ||
      !customer.address.trim() ||
      !customer.city.trim() ||
      !customer.state.trim() ||
      !customer.pincode.trim()
    ) {
      alert(
        "Please fill all required delivery details."
      );
      return;
    }

    const newOrder = placeOrder({
      customer,
      paymentMethod,
      deliveryCharge,
      total: grandTotal,
    });

    if (newOrder) {
      navigate("/orders");
    }
  };

  // EMPTY CART
  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <div className="container">
          <div className="checkout-empty">
            <div className="checkout-empty-icon">
              <i className="bi bi-bag-x"></i>
            </div>

            <h2>Your Cart Is Empty</h2>

            <p>
              Add some products to your cart before
              proceeding to checkout.
            </p>

            <Link
              to="/products"
              className="primary-btn"
            >
              <i className="bi bi-bag"></i>
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="container">

        {/* PAGE HEADER */}
        <div className="checkout-header">
          <span className="section-label">
            MOBILEHUB
          </span>

          <h1>Checkout</h1>

          <p>
            Complete your details and place your order.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="checkout-layout">

            {/* LEFT SIDE */}
            <div className="checkout-main">

              {/* CUSTOMER DETAILS */}
              <section className="checkout-card">
                <div className="checkout-card-header">
                  <div className="checkout-step">
                    01
                  </div>

                  <div>
                    <h2>Customer Details</h2>
                    <p>
                      Enter your contact information
                    </p>
                  </div>
                </div>

                <div className="checkout-form-grid">

                  <div className="form-group">
                    <label>
                      Full Name{" "}
                      <span>*</span>
                    </label>

                    <div className="input-icon">
                      <i className="bi bi-person"></i>

                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={customer.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      Phone Number{" "}
                      <span>*</span>
                    </label>

                    <div className="input-icon">
                      <i className="bi bi-telephone"></i>

                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter phone number"
                        value={customer.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label>
                      Email Address
                    </label>

                    <div className="input-icon">
                      <i className="bi bi-envelope"></i>

                      <input
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                        value={customer.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                </div>
              </section>

              {/* DELIVERY ADDRESS */}
              <section className="checkout-card">
                <div className="checkout-card-header">
                  <div className="checkout-step">
                    02
                  </div>

                  <div>
                    <h2>Delivery Address</h2>
                    <p>
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                <div className="checkout-form-grid">

                  <div className="form-group full-width">
                    <label>
                      Address{" "}
                      <span>*</span>
                    </label>

                    <div className="input-icon textarea-icon">
                      <i className="bi bi-geo-alt"></i>

                      <textarea
                        name="address"
                        rows="3"
                        placeholder="House number, street, area..."
                        value={customer.address}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      City{" "}
                      <span>*</span>
                    </label>

                    <div className="input-icon">
                      <i className="bi bi-building"></i>

                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={customer.city}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      State{" "}
                      <span>*</span>
                    </label>

                    <div className="input-icon">
                      <i className="bi bi-map"></i>

                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={customer.state}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      Pincode{" "}
                      <span>*</span>
                    </label>

                    <div className="input-icon">
                      <i className="bi bi-mailbox"></i>

                      <input
                        type="text"
                        name="pincode"
                        placeholder="6-digit pincode"
                        value={customer.pincode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                </div>
              </section>

              {/* PAYMENT */}
              <section className="checkout-card">
                <div className="checkout-card-header">
                  <div className="checkout-step">
                    03
                  </div>

                  <div>
                    <h2>Payment Method</h2>
                    <p>
                      Choose how you want to pay
                    </p>
                  </div>
                </div>

                <div className="payment-options">

                  {/* COD */}
                  <label
                    className={`payment-option ${
                      paymentMethod === "cod"
                        ? "selected"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={
                        paymentMethod === "cod"
                      }
                      onChange={(e) =>
                        setPaymentMethod(
                          e.target.value
                        )
                      }
                    />

                    <span className="payment-icon">
                      <i className="bi bi-cash"></i>
                    </span>

                    <span className="payment-info">
                      <strong>
                        Cash on Delivery
                      </strong>
                      <small>
                        Pay when your order arrives
                      </small>
                    </span>

                    <i className="bi bi-check-circle-fill payment-check"></i>
                  </label>

                  {/* UPI */}
                  <label
                    className={`payment-option ${
                      paymentMethod === "upi"
                        ? "selected"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={
                        paymentMethod === "upi"
                      }
                      onChange={(e) =>
                        setPaymentMethod(
                          e.target.value
                        )
                      }
                    />

                    <span className="payment-icon">
                      <i className="bi bi-phone"></i>
                    </span>

                    <span className="payment-info">
                      <strong>UPI</strong>
                      <small>
                        Pay using your UPI app
                      </small>
                    </span>

                    <i className="bi bi-check-circle-fill payment-check"></i>
                  </label>

                  {/* CARD */}
                  <label
                    className={`payment-option ${
                      paymentMethod === "card"
                        ? "selected"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={
                        paymentMethod === "card"
                      }
                      onChange={(e) =>
                        setPaymentMethod(
                          e.target.value
                        )
                      }
                    />

                    <span className="payment-icon">
                      <i className="bi bi-credit-card"></i>
                    </span>

                    <span className="payment-info">
                      <strong>
                        Credit / Debit Card
                      </strong>
                      <small>
                        Secure card payment
                      </small>
                    </span>

                    <i className="bi bi-check-circle-fill payment-check"></i>
                  </label>

                </div>

                <div className="payment-demo-note">
                  <i className="bi bi-info-circle"></i>
                  Payment options shown here are for
                  frontend demonstration.
                </div>
              </section>
            </div>

            {/* RIGHT SIDE — ORDER SUMMARY */}
            <aside className="checkout-summary">

              <div className="summary-header">
                <h2>Order Summary</h2>

                <span>
                  {cart.length}{" "}
                  {cart.length === 1
                    ? "item"
                    : "items"}
                </span>
              </div>

              {/* PRODUCTS */}
              <div className="checkout-products">
                {cart.map((item) => (
                  <div
                    className="checkout-product"
                    key={item.id}
                  >
                    <div className="checkout-product-image">
                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <span>
                        {item.quantity}
                      </span>
                    </div>

                    <div className="checkout-product-info">
                      <small>
                        {item.brand}
                      </small>

                      <h4>{item.name}</h4>

                      <strong>
                        ₹
                        {(
                          item.price *
                          item.quantity
                        ).toLocaleString("en-IN")}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>

              {/* PRICE DETAILS */}
              <div className="summary-prices">

                <div>
                  <span>Subtotal</span>

                  <strong>
                    ₹
                    {cartTotal.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

                <div>
                  <span>Delivery</span>

                  <strong
                    className={
                      deliveryCharge === 0
                        ? "free-text"
                        : ""
                    }
                  >
                    {deliveryCharge === 0
                      ? "FREE"
                      : `₹${deliveryCharge}`}
                  </strong>
                </div>

              </div>

              {/* FREE DELIVERY MESSAGE */}
              {deliveryCharge === 0 && (
                <div className="free-delivery-message">
                  <i className="bi bi-truck"></i>
                  Free delivery applied to your order
                </div>
              )}

              {/* TOTAL */}
              <div className="summary-total">
                <span>Total Amount</span>

                <strong>
                  ₹
                  {grandTotal.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>

              {/* PLACE ORDER */}
              <button
                type="submit"
                className="place-order-btn"
              >
                <i className="bi bi-lock-fill"></i>
                Place Order
                <i className="bi bi-arrow-right"></i>
              </button>

              <div className="checkout-security">
                <i className="bi bi-shield-check"></i>

                <span>
                  Your order information is handled
                  securely.
                </span>
              </div>

            </aside>
          </div>
        </form>
      </div>
    </main>
  );
}