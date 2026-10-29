import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function UsedProductCard({ product }) {
  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
  } = useShop();

  const wishlisted = isWishlisted(product.id);

  return (
    <article className="used-product-card">

      {/* IMAGE */}
      <div className="used-product-image">

        <img
          src={product.image}
          alt={product.name}
        />

        {/* CONDITION */}
        <span className="used-condition-badge">
          <i className="bi bi-patch-check-fill"></i>
          {product.condition || "Quality Checked"}
        </span>

        {/* WISHLIST */}
        <button
          type="button"
          className={`product-wishlist-btn ${
            wishlisted ? "wishlisted" : ""
          }`}
          onClick={() =>
            toggleWishlist(product)
          }
          aria-label={
            wishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
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

      </div>

      {/* CONTENT */}
      <div className="used-product-content">

        {/* BRAND */}
        <span className="used-product-brand">
          {product.brand}
        </span>

        {/* NAME */}
        <h3>{product.name}</h3>

        {/* RATING */}
        <div className="used-product-rating">
          <span className="rating-box">
            <i className="bi bi-star-fill"></i>
            {product.rating}
          </span>

          <span>Verified rating</span>
        </div>

        {/* PRICE */}
        <div className="used-product-price">
          ₹
          {product.price.toLocaleString(
            "en-IN"
          )}
        </div>

        {/* DETAILS */}
        <div className="used-product-info">

          <div className="used-detail">
            <span className="used-detail-icon">
              <i className="bi bi-battery-half"></i>
            </span>

            <div>
              <small>Battery</small>
              <strong>
                {product.batteryHealth ||
                  "Not specified"}
              </strong>
            </div>
          </div>

          <div className="used-detail">
            <span className="used-detail-icon">
              <i className="bi bi-shield-check"></i>
            </span>

            <div>
              <small>Warranty</small>
              <strong>
                {product.warranty ||
                  "Not specified"}
              </strong>
            </div>
          </div>

          <div className="used-detail">
            <span className="used-detail-icon">
              <i className="bi bi-device-ssd"></i>
            </span>

            <div>
              <small>Storage</small>
              <strong>
                {product.storage ||
                  "Not specified"}
              </strong>
            </div>
          </div>

        </div>

        {/* ACTIONS */}
        <div className="used-product-actions">

          <Link
            to={`/products/${product.id}`}
            className="product-details-btn"
          >
            View Details
          </Link>

          <button
            type="button"
            className="product-cart-btn"
            onClick={() =>
              addToCart(product)
            }
            aria-label="Add to cart"
          >
            <i className="bi bi-cart-plus"></i>
          </button>

        </div>

      </div>
    </article>
  );
}