import { Link } from "react-router-dom";
import { products } from "../data/Mobiles";

const categories = [
  {
    name: "Smartphones",
    icon: "bi-phone",
    description: "Latest smartphones",
    link: "/products?category=smart",
  },
  {
    name: "Feature Phones",
    icon: "bi-telephone",
    description: "Simple & reliable",
    link: "/products?category=feature",
  },
  {
    name: "Used Mobiles",
    icon: "bi-arrow-repeat",
    description: "Quality checked",
    link: "/used-mobiles",
  },
  {
    name: "Accessories",
    icon: "bi-headphones",
    description: "Cases, chargers & more",
    link: "/products?category=accessories",
  },
  {
    name: "Speakers",
    icon: "bi-speaker",
    description: "Wireless sound",
    link: "/products?category=speakers",
  },
];

const brands = [
  "Apple",
  "Samsung",
  "OnePlus",
  "Xiaomi",
  "Vivo",
  "OPPO",
  "realme",
  "Motorola",
  "Nokia",
];

export default function Home() {
  // Take first 4 products from mobile.js
  const featuredProducts = products.slice(0, 4);

  return (
    <main>

      {/* HERO SECTION */}
      <section className="home-hero">
        <div className="container">
          <div className="home-hero-grid">

            <div className="hero-content">
              <span className="hero-small-label">
                <i className="bi bi-stars"></i>
                NEW COLLECTION 2026
              </span>

              <h1>
                Upgrade Your
                <span> Mobile Experience</span>
              </h1>

              <p>
                Discover smartphones, feature phones,
                quality-checked used mobiles and
                accessories — all in one place.
              </p>

              <div className="hero-buttons">
                <Link
                  to="/products"
                  className="hero-primary-btn"
                >
                  Shop Smartphones
                  <i className="bi bi-arrow-right"></i>
                </Link>

                <Link
                  to="/used-mobiles"
                  className="hero-secondary-btn"
                >
                  Explore Used Mobiles
                </Link>
              </div>

              <div className="hero-trust">
                <div>
                  <i className="bi bi-shield-check"></i>
                  <span>Quality Checked</span>
                </div>

                <div>
                  <i className="bi bi-truck"></i>
                  <span>Fast Delivery</span>
                </div>

                <div>
                  <i className="bi bi-headset"></i>
                  <span>Support</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-circle"></div>

              <div className="floating-card floating-card-one">
                <i className="bi bi-star-fill"></i>

                <div>
                  <strong>4.8/5</strong>
                  <span>Customer Rating</span>
                </div>
              </div>

              <div className="floating-card floating-card-two">
                <i className="bi bi-truck"></i>

                <div>
                  <strong>Fast Delivery</strong>
                  <span>Across India</span>
                </div>
              </div>

              <div className="hero-phone-display">
                <div className="phone-speaker"></div>

                <div className="phone-screen">
                  <i className="bi bi-phone-fill"></i>
                </div>

                <div className="phone-button"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="home-section categories-section">
        <div className="container">

          <div className="section-heading">
            <div>
              <span className="section-label">
                EXPLORE OUR STORE
              </span>

              <h2>Shop by Category</h2>

              <p>
                Find exactly what you're looking for.
              </p>
            </div>

            <Link
              to="/products"
              className="section-view-link"
            >
              View All
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <Link
                to={category.link}
                className="home-category-card"
                key={category.name}
              >
                <div className="category-icon">
                  <i className={`bi ${category.icon}`}></i>
                </div>

                <div className="category-content">
                  <h3>{category.name}</h3>

                  <p>{category.description}</p>

                  <span>
                    Explore
                    <i className="bi bi-arrow-right"></i>
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="home-section featured-section">
        <div className="container">

          <div className="section-heading">
            <div>
              <span className="section-label">
                TRENDING NOW
              </span>

              <h2>Featured Mobiles</h2>

              <p>
                Popular choices from our collection.
              </p>
            </div>

            <Link
              to="/products"
              className="section-view-link"
            >
              View All
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          <div className="featured-grid">

            {featuredProducts.map((product) => (
              <div
                className="home-product-card"
                key={product.id}
              >

                <Link
                  to={`/products/${product.id}`}
                  className="home-product-image"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  <span className="home-product-tag">
                    Featured
                  </span>
                </Link>

                <div className="home-product-content">

                  <span className="home-product-brand">
                    {product.brand}
                  </span>

                  <h3>{product.name}</h3>

                  <div className="home-product-rating">
                    <span>
                      <i className="bi bi-star-fill"></i>
                      {product.rating}
                    </span>

                    <small>
                      Customer rating
                    </small>
                  </div>

                  <div className="home-product-bottom">

                    <strong>
                      ₹{product.price.toLocaleString("en-IN")}
                    </strong>

                    <Link
                      to={`/products/${product.id}`}
                      aria-label={`View ${product.name}`}
                    >
                      <i className="bi bi-arrow-up-right"></i>
                    </Link>

                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* USED MOBILE PROMO */}
      <section className="container home-promo-wrapper">
        <div className="used-promo">

          <div className="used-promo-content">

            <span>
              <i className="bi bi-patch-check-fill"></i>
              QUALITY CHECKED
            </span>

            <h2>
              Get More Value
              <br />
              with Used Mobiles
            </h2>

            <p>
              Explore carefully checked second-hand
              mobiles at accessible prices.
            </p>

            <Link
              to="/used-mobiles"
              className="promo-btn"
            >
              Explore Used Mobiles
              <i className="bi bi-arrow-right"></i>
            </Link>

          </div>

          <div className="used-promo-visual">

            <div className="promo-phone promo-phone-back">
              <i className="bi bi-phone"></i>
            </div>

            <div className="promo-phone promo-phone-front">
              <i className="bi bi-phone-fill"></i>
            </div>

            <div className="promo-circle"></div>

          </div>

        </div>
      </section>

      {/* SHOP BY BRAND */}
      <section className="home-section brands-section">
        <div className="container">

          <div className="text-center home-section-title">

            <span className="section-label">
              POPULAR BRANDS
            </span>

            <h2>Shop by Brand</h2>

            <p>
              Choose from popular mobile brands.
            </p>

          </div>

          <div className="home-brands-grid">

            {brands.map((brand) => (
              <Link
                to={`/brand/${brand.toLowerCase()}`}
                className="home-brand-item"
                key={brand}
              >

                <div className="brand-letter">
                  {brand.charAt(0)}
                </div>

                <span>{brand}</span>

                <i className="bi bi-arrow-up-right"></i>

              </Link>
            ))}

          </div>
        </div>
      </section>

      {/* WHY MOBILEHUB */}
      <section className="why-mobilehub">
        <div className="container">

          <div className="text-center home-section-title">

            <span className="section-label">
              WHY MOBILEHUB
            </span>

            <h2>Shopping Made Simple</h2>

            <p>
              Everything you need for a smooth
              mobile shopping experience.
            </p>

          </div>

          <div className="why-grid">

            <div className="why-card">
              <div className="why-icon">
                <i className="bi bi-shield-check"></i>
              </div>

              <h3>Quality Checked</h3>

              <p>
                Products are presented with clear
                details so you can shop confidently.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <i className="bi bi-tags"></i>
              </div>

              <h3>Great Prices</h3>

              <p>
                Explore products across different
                price ranges for your needs.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <i className="bi bi-truck"></i>
              </div>

              <h3>Fast Delivery</h3>

              <p>
                Convenient delivery information
                is available throughout your order.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <i className="bi bi-headset"></i>
              </div>

              <h3>Customer Support</h3>

              <p>
                Get help whenever you need assistance
                with your shopping experience.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="home-final-cta">
        <div className="container">

          <div className="final-cta-content">

            <div>
              <span className="section-label">
                READY TO SHOP?
              </span>

              <h2>
                Find Your Next Mobile Today.
              </h2>

              <p>
                Browse our collection and discover
                a phone that fits your needs.
              </p>
            </div>

            <Link
              to="/products"
              className="final-cta-btn"
            >
              Start Shopping
              <i className="bi bi-arrow-right"></i>
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}