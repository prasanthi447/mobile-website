import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function Wishlist() {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
  } = useShop();

  if (wishlist.length === 0) {
    return (
      <main className="wishlist-page">
        <div className="container">

          <div className="wishlist-empty">

            <div className="wishlist-empty-icon">
              <i className="bi bi-heart"></i>
            </div>

            <span className="section-label">
              MOBILEHUB STORE
            </span>

            <h1>Your Wishlist is Empty</h1>

            <p>
              Save your favourite mobiles and products here
              so you can easily find them later.
            </p>

            <Link
              to="/products"
              className="primary-btn"
            >
              <i className="bi bi-bag"></i>
              Explore Products
            </Link>

          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="wishlist-page">
      <div className="container">

        {/* HEADER */}
        <section className="wishlist-header">

          <div>
            <span className="section-label">
              MOBILEHUB STORE
            </span>

            <h1>My Wishlist</h1>

            <p>
              Your saved products are waiting for you.
            </p>
          </div>

          <div className="wishlist-count">

            <i className="bi bi-heart-fill"></i>

            <div>
              <strong>{wishlist.length}</strong>
              <span>
                {wishlist.length === 1
                  ? "Saved Product"
                  : "Saved Products"}
              </span>
            </div>

          </div>

        </section>

        {/* PRODUCTS */}
        <section className="wishlist-products-section">

          <div className="wishlist-section-heading">
            <div>
              <h2>Saved Products</h2>

              <p>
                Products you've added to your wishlist
              </p>
            </div>

            <Link
              to="/products"
              className="secondary-btn"
            >
              <i className="bi bi-plus-lg"></i>
              Add More
            </Link>
          </div>

          <div className="row g-4">

            {wishlist.map((product) => (
              <div
                className="col-6 col-md-4 col-lg-3"
                key={product.id}
              >

                <article className="wishlist-product-card">

                  {/* IMAGE */}
                  <div className="wishlist-product-image">

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    <button
                      type="button"
                      className="wishlist-remove-btn"
                      onClick={() =>
                        toggleWishlist(product)
                      }
                      aria-label="Remove from wishlist"
                    >
                      <i className="bi bi-heart-fill"></i>
                    </button>

                    {product.category === "used" && (
                      <span className="wishlist-condition">
                        <i className="bi bi-patch-check-fill"></i>
                        Used
                      </span>
                    )}

                  </div>

                  {/* CONTENT */}
                  <div className="wishlist-product-content">

                    <span className="wishlist-brand">
                      {product.brand}
                    </span>

                    <h3>
                      {product.name}
                    </h3>

                    <p>
                      {product.specs ||
                        "Quality checked product"}
                    </p>

                    {/* RATING */}
                    <div className="wishlist-rating">

                      <span>
                        <i className="bi bi-star-fill"></i>
                        {product.rating}
                      </span>

                      <small>
                        Customer rating
                      </small>

                    </div>

                    {/* PRICE */}
                    <div className="wishlist-price">
                      ₹{product.price.toLocaleString("en-IN")}
                    </div>

                    {/* ACTIONS */}
                    <div className="wishlist-actions">

                      <button
                        type="button"
                        className="wishlist-cart-btn"
                        onClick={() =>
                          addToCart(product)
                        }
                      >
                        <i className="bi bi-cart-plus"></i>
                        Add to Cart
                      </button>

                      <Link
                        to={`/products/${product.id}`}
                        className="wishlist-view-btn"
                        aria-label="View product"
                      >
                        <i className="bi bi-eye"></i>
                      </Link>

                    </div>

                  </div>

                </article>

              </div>
            ))}

          </div>

        </section>

        {/* BOTTOM CTA */}
        <section className="wishlist-bottom-cta">

          <div>

            <span>
              KEEP SHOPPING
            </span>

            <h2>
              Find something you'll love
            </h2>

            <p>
              Explore more smartphones, accessories and
              other products from MobileHub.
            </p>

          </div>

          <Link
            to="/products"
            className="primary-btn"
          >
            Browse Products
            <i className="bi bi-arrow-right"></i>
          </Link>

        </section>

      </div>
    </main>
  );
}