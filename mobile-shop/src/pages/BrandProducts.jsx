import { Link, useParams } from "react-router-dom";

import { brands } from "../data/brands";
import { products } from "../data/Mobiles";

import ProductCard from "../components/ProductCard";

export default function BrandProducts() {
  const { brandId } = useParams();

  const brand = brands.find(
    (item) => item.id.toLowerCase() === brandId?.toLowerCase()
  );

  if (!brand) {
    return (
      <main className="brand-products-page">
        <div className="container">
          <div className="brand-not-found">

            <div className="brand-not-found-icon">
              <i className="bi bi-phone"></i>
            </div>

            <h2>Brand Not Found</h2>

            <p>
              We couldn't find the brand you're looking for.
            </p>

            <Link
              to="/brands"
              className="primary-btn"
            >
              <i className="bi bi-grid"></i>
              View All Brands
            </Link>

          </div>
        </div>
      </main>
    );
  }

  const brandProducts = products.filter(
    (product) =>
      product.brand?.toLowerCase() ===
      brand.name.toLowerCase()
  );

  return (
    <main className="brand-products-page">
      <div className="container">

        {/* BREADCRUMB */}
        <div className="brand-breadcrumb">
          <Link to="/">
            Home
          </Link>

          <i className="bi bi-chevron-right"></i>

          <Link to="/brands">
            Brands
          </Link>

          <i className="bi bi-chevron-right"></i>

          <span>{brand.name}</span>
        </div>

        {/* BRAND HEADER */}
        <section className="brand-products-header">

          <div className="brand-products-logo">
            {brand.logo}
          </div>

          <div className="brand-products-info">

            <span className="section-label">
              MOBILEHUB STORE
            </span>

            <h1>
              {brand.name} Mobiles
            </h1>

            <p>
              Explore the latest and popular {brand.name} models
              available in our store.
            </p>

            <div className="brand-products-meta">

              <span>
                <i className="bi bi-phone"></i>
                {brandProducts.length} Models
              </span>

              <span>
                <i className="bi bi-shield-check"></i>
                Quality Products
              </span>

            </div>

          </div>

        </section>

        {/* PRODUCTS HEADER */}
        <section className="brand-products-title">

          <div>
            <h2>
              {brand.name} Models
            </h2>

            <p>
              Choose your preferred {brand.name} mobile
            </p>
          </div>

          <Link
            to="/brands"
            className="secondary-btn"
          >
            <i className="bi bi-arrow-left"></i>
            All Brands
          </Link>

        </section>

        {/* PRODUCTS */}
        {brandProducts.length > 0 ? (

          <div className="row g-4 products-grid">

            {brandProducts.map((product) => (
              <div
                className="col-6 col-md-4 col-lg-3"
                key={product.id}
              >
                <ProductCard product={product} />
              </div>
            ))}

          </div>

        ) : (

          <div className="brand-products-empty">

            <div className="brand-empty-icon">
              <i className="bi bi-phone"></i>
            </div>

            <h3>No Models Available</h3>

            <p>
              There are currently no {brand.name} models
              available.
            </p>

            <Link
              to="/products"
              className="primary-btn"
            >
              <i className="bi bi-bag"></i>
              Browse All Products
            </Link>

          </div>

        )}

        {/* BOTTOM CTA */}
        <section className="brand-bottom-cta">

          <div>
            <span>EXPLORE MORE</span>

            <h2>
              Looking for another brand?
            </h2>

            <p>
              Discover more smartphones and mobile products
              from popular brands.
            </p>
          </div>

          <Link
            to="/brands"
            className="primary-btn"
          >
            Explore Brands
            <i className="bi bi-arrow-right"></i>
          </Link>

        </section>

      </div>
    </main>
  );
}