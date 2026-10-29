import { Link } from "react-router-dom";
import { brands } from "../data/brands";

export default function Brands() {
  return (
    <main className="brands-page">
      <div className="container">

        {/* HEADER */}
        <section className="brands-header">
          <div>
            <span className="section-label">
              MOBILEHUB STORE
            </span>

            <h1>Shop by Brand</h1>

            <p>
              Explore your favourite mobile brands and
              discover their latest models.
            </p>
          </div>

          <div className="brands-header-icon">
            <i className="bi bi-grid"></i>
          </div>
        </section>

        {/* BRAND SECTION */}
        <section className="brands-section">

          <div className="brands-section-title">
            <div>
              <h2>Popular Brands</h2>

              <p>
                Choose a brand to explore available models
              </p>
            </div>

            <span>
              {brands.length} Brands
            </span>
          </div>

          {/* BRAND CARDS */}
          <div className="row g-4">

            {brands.map((brand) => (
              <div
                className="col-6 col-md-4 col-lg-3"
                key={brand.id}
              >

                <Link
                  to={`/brand/${brand.id}`}
                  className="professional-brand-card"
                >

                  <div className="brand-card-top">

                    <div className="professional-brand-logo">
                      {brand.logo}
                    </div>

                    <i className="bi bi-arrow-up-right"></i>

                  </div>

                  <div className="brand-card-content">

                    <h3>{brand.name}</h3>

                    <span>
                      View Models
                      <i className="bi bi-arrow-right"></i>
                    </span>

                  </div>

                </Link>

              </div>
            ))}

          </div>
        </section>

        {/* BENEFITS */}
        <section className="brand-benefits">

          <div className="brand-benefit">

            <div className="brand-benefit-icon">
              <i className="bi bi-phone"></i>
            </div>

            <div>
              <h4>Latest Models</h4>

              <p>
                Explore different models from popular brands.
              </p>
            </div>

          </div>

          <div className="brand-benefit">

            <div className="brand-benefit-icon">
              <i className="bi bi-shield-check"></i>
            </div>

            <div>
              <h4>Quality Products</h4>

              <p>
                Browse products with detailed information.
              </p>
            </div>

          </div>

          <div className="brand-benefit">

            <div className="brand-benefit-icon">
              <i className="bi bi-bag-check"></i>
            </div>

            <div>
              <h4>Easy Shopping</h4>

              <p>
                Select a brand and find your preferred model.
              </p>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}