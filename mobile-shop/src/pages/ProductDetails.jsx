
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { products } from "../data/Mobiles";
import { useShop } from "../context/ShopContext";

export default function ProductDetails() {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
  } = useShop();

  const [selectedStorage, setSelectedStorage] =
    useState(product?.storage || "128GB");

  const [selectedColor, setSelectedColor] =
    useState("Black");

  const [quantity, setQuantity] =
    useState(1);

  const [addedToCart, setAddedToCart] =
    useState(false);

  if (!product) {
    return (
      <main className="product-details-page">
        <div className="container">
          <div className="product-not-found">

            <div className="not-found-icon">
              <i className="bi bi-phone"></i>
            </div>

            <h2>Product Not Found</h2>

            <p>
              Sorry, the product you're looking
              for is not available.
            </p>

            <Link
              to="/products"
              className="primary-btn"
            >
              <i className="bi bi-arrow-left"></i>
              Back to Products
            </Link>

          </div>
        </div>
      </main>
    );
  }

  // ==============================
  // ADD PRODUCT TO CART
  // ==============================

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(
        product,
        selectedStorage,
        selectedColor
      );
    }

    setAddedToCart(true);
  };

  // ==============================
  // STORAGE CHANGE
  // ==============================

  const handleStorageChange = (storage) => {
    setSelectedStorage(storage);
    setAddedToCart(false);
  };

  // ==============================
  // COLOR CHANGE
  // ==============================

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setAddedToCart(false);
  };

  const wishlisted =
    isWishlisted(product.id);

  return (
    <main className="product-details-page">
      <div className="container">

        {/* BREADCRUMB */}

        <div className="product-breadcrumb">

          <Link to="/">
            Home
          </Link>

          <i className="bi bi-chevron-right"></i>

          <Link to="/products">
            Products
          </Link>

          <i className="bi bi-chevron-right"></i>

          <span>
            {product.name}
          </span>

        </div>

        {/* PRODUCT DETAILS */}

        <section className="product-details-layout">

          {/* IMAGE */}

          <div className="product-image-section">

            <div className="product-main-image">

              <button
                type="button"
                className={`detail-wishlist-btn ${
                  wishlisted
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  toggleWishlist(product)
                }
              >
                <i
                  className={
                    wishlisted
                      ? "bi bi-heart-fill"
                      : "bi bi-heart"
                  }
                ></i>
              </button>

              {product.category ===
                "used" && (
                <span className="detail-condition-badge">
                  <i className="bi bi-patch-check-fill"></i>
                  Quality Checked
                </span>
              )}

              <img
                src={product.image}
                alt={product.name}
              />

            </div>

            <div className="image-trust-row">

              <div>
                <i className="bi bi-shield-check"></i>
                <span>
                  Quality Checked
                </span>
              </div>

              <div>
                <i className="bi bi-truck"></i>
                <span>
                  Fast Delivery
                </span>
              </div>

              <div>
                <i className="bi bi-arrow-repeat"></i>
                <span>
                  Easy Returns
                </span>
              </div>

            </div>

          </div>

          {/* PRODUCT INFORMATION */}

          <div className="product-info-section">

            <span className="detail-brand">
              {product.brand}
            </span>

            <h1>
              {product.name}
            </h1>

            <div className="detail-rating">

              <span className="rating-box">
                <i className="bi bi-star-fill"></i>
                {product.rating}
              </span>

              <span>
                Customer Rating
              </span>

            </div>

            <div className="detail-price">
              ₹
              {product.price.toLocaleString(
                "en-IN"
              )}
            </div>

            <p className="tax-note">
              <i className="bi bi-check-circle-fill"></i>
              Inclusive of all applicable taxes
            </p>

            <div className="detail-divider"></div>

            {/* SPECIFICATIONS */}

            <div className="detail-specification">

              <h3>
                Specifications
              </h3>

              <div className="spec-grid">

                <div className="spec-item">

                  <span>
                    <i className="bi bi-device-ssd"></i>
                    Specifications
                  </span>

                  <strong>
                    {product.specs ||
                      "Not specified"}
                  </strong>

                </div>

                <div className="spec-item">

                  <span>
                    <i className="bi bi-phone"></i>
                    Category
                  </span>

                  <strong>
                    {product.category ===
                    "used"
                      ? "Used Mobile"
                      : "New Product"}
                  </strong>

                </div>

              </div>

            </div>

            {/* STORAGE */}

            <div className="product-option-section">

              <div className="option-heading">

                <strong>
                  Storage
                </strong>

                <span>
                  {selectedStorage}
                </span>

              </div>

              <div className="product-options">

                {[
                  "128GB",
                  "256GB",
                  "512GB",
                ].map(
                  (storage) => (
                    <button
                      type="button"
                      key={storage}
                      className={
                        selectedStorage ===
                        storage
                          ? "product-option active"
                          : "product-option"
                      }
                      onClick={() =>
                        handleStorageChange(
                          storage
                        )
                      }
                    >
                      {storage}
                    </button>
                  )
                )}

              </div>

            </div>

            {/* COLOR */}

            <div className="product-option-section">

              <div className="option-heading">

                <strong>
                  Color
                </strong>

                <span>
                  {selectedColor}
                </span>

              </div>

              <div className="product-options">

                {[
                  "Black",
                  "Blue",
                  "White",
                ].map(
                  (color) => (
                    <button
                      type="button"
                      key={color}
                      className={
                        selectedColor ===
                        color
                          ? "product-option active"
                          : "product-option"
                      }
                      onClick={() =>
                        handleColorChange(
                          color
                        )
                      }
                    >

                      <span
                        className={`color-dot ${color.toLowerCase()}`}
                      ></span>

                      {color}

                    </button>
                  )
                )}

              </div>

            </div>

            {/* QUANTITY */}

            <div className="quantity-section">

              <strong>
                Quantity
              </strong>

              <div className="detail-quantity-box">

                <button
                  type="button"
                  onClick={() =>
                    setQuantity(
                      Math.max(
                        1,
                        quantity - 1
                      )
                    )
                  }
                >
                  −
                </button>

                <span>
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity(
                      quantity + 1
                    )
                  }
                >
                  +
                </button>

              </div>

            </div>

            {/* ACTIONS */}

            <div className="detail-actions">

              <button
                type="button"
                className={`detail-cart-btn ${
                  addedToCart
                    ? "added"
                    : ""
                }`}
                onClick={
                  handleAddToCart
                }
              >
                <i
                  className={
                    addedToCart
                      ? "bi bi-check-circle-fill"
                      : "bi bi-cart-plus"
                  }
                ></i>

                {addedToCart
                  ? "Added ✓"
                  : "Add to Cart"}
              </button>

              <button
                type="button"
                className={`detail-wishlist-action ${
                  wishlisted
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  toggleWishlist(product)
                }
              >

                <i
                  className={
                    wishlisted
                      ? "bi bi-heart-fill"
                      : "bi bi-heart"
                  }
                ></i>

                {wishlisted
                  ? "Wishlisted"
                  : "Wishlist"}

              </button>

            </div>

            {/* DELIVERY */}

            <div className="delivery-info">

              <div>

                <i className="bi bi-truck"></i>

                <div>
                  <strong>
                    Fast Delivery
                  </strong>

                  <span>
                    Quick &amp; secure shipping
                  </span>
                </div>

              </div>

              <div>

                <i className="bi bi-shield-check"></i>

                <div>
                  <strong>
                    Secure Shopping
                  </strong>

                  <span>
                    Safe checkout experience
                  </span>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* PRODUCT INFORMATION */}

        <section className="product-information-card">

          <div className="information-header">

            <span className="section-label">
              PRODUCT DETAILS
            </span>

            <h2>
              Product Information
            </h2>

            <p>
              Everything you need to know
              about this product.
            </p>

          </div>

          <div className="product-description-content">

            <p>
              {product.name} is available
              at MobileHub with quality
              checking and reliable customer
              support. Product specifications,
              pricing and available options are
              shown above.
            </p>

            <div className="information-grid">

              <div>
                <span>
                  Brand
                </span>

                <strong>
                  {product.brand}
                </strong>
              </div>

              <div>
                <span>
                  Product
                </span>

                <strong>
                  {product.name}
                </strong>
              </div>

              <div>
                <span>
                  Rating
                </span>

                <strong>
                  {product.rating} / 5
                </strong>
              </div>

              <div>
                <span>
                  Specifications
                </span>

                <strong>
                  {product.specs ||
                    "Not specified"}
                </strong>
              </div>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
