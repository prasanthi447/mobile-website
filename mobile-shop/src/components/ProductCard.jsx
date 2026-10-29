import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function ProductCard({ product }) {
  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
  } = useShop();

  const wishlisted = isWishlisted(product.id);

  return (
    <article className="shop-product-card">

      {/* PRODUCT IMAGE */}
      <div className="shop-product-image">

        <img
          src={product.image}
          alt={product.name}
        />

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

        {/* QUICK BADGE */}
        {product.category === "used" && (
          <span className="product-condition-badge">
            Used
          </span>
        )}

        {product.category === "smart" && (
          <span className="product-category-badge">
            Smartphone
          </span>
        )}

      </div>

      {/* PRODUCT CONTENT */}
      <div className="shop-product-content">

        {/* BRAND */}
        <span className="shop-product-brand">
          {product.brand}
        </span>

        {/* NAME */}
        <h3 className="shop-product-title">
          {product.name}
        </h3>

        {/* SPECS */}
        <p className="shop-product-specs">
          {product.specs ||
            "Quality checked product"}
        </p>

        {/* RATING */}
        <div className="shop-product-rating">

          <span className="rating-box">
            <i className="bi bi-star-fill"></i>
            {product.rating}
          </span>

          <span className="rating-text">
            Customer rating
          </span>

        </div>

        {/* PRICE */}
        <div className="shop-product-price">
          ₹
          {product.price.toLocaleString(
            "en-IN"
          )}
        </div>

        {/* ACTIONS */}
        <div className="shop-product-actions">

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