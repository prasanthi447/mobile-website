import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { products } from "../data/Mobiles";
import UsedProductCard from "../components/UsedProductCard";

export default function UsedMobiles() {
  const [condition, setCondition] = useState("All");
  const [brand, setBrand] = useState("All");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sort, setSort] = useState("default");

  const usedMobiles = useMemo(
    () =>
      products.filter(
        (product) => product.category === "used"
      ),
    []
  );

  const brands = useMemo(() => {
    return [
      "All",
      ...new Set(
        usedMobiles.map((product) => product.brand)
      ),
    ];
  }, [usedMobiles]);

  const filteredProducts = useMemo(() => {
    let result = usedMobiles.filter((product) => {
      const conditionMatch =
        condition === "All" ||
        product.condition === condition;

      const brandMatch =
        brand === "All" ||
        product.brand === brand;

      const priceMatch =
        product.price <= maxPrice;

      return (
        conditionMatch &&
        brandMatch &&
        priceMatch
      );
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "battery") {
      result.sort((a, b) => {
        const batteryA =
          parseInt(a.batteryHealth) || 0;

        const batteryB =
          parseInt(b.batteryHealth) || 0;

        return batteryB - batteryA;
      });
    }

    return result;
  }, [
    usedMobiles,
    condition,
    brand,
    maxPrice,
    sort,
  ]);

  const clearFilters = () => {
    setCondition("All");
    setBrand("All");
    setMaxPrice(100000);
    setSort("default");
  };

  const hasFilters =
    condition !== "All" ||
    brand !== "All" ||
    maxPrice !== 100000 ||
    sort !== "default";

  return (
    <main className="used-mobiles-page">
      <div className="container">

        {/* HEADER */}
        <section className="used-page-header">

          <div>
            <span className="section-label">
              MOBILEHUB • PRE-OWNED
            </span>

            <h1>
              Used & Second-Hand Mobiles
            </h1>

            <p>
              Quality checked pre-owned mobiles at
              affordable prices.
            </p>

            <div className="used-header-points">

              <span>
                <i className="bi bi-patch-check-fill"></i>
                Quality Checked
              </span>

              <span>
                <i className="bi bi-shield-check"></i>
                Reliable Products
              </span>

              <span>
                <i className="bi bi-cash-stack"></i>
                Better Prices
              </span>

            </div>
          </div>

          <div className="used-header-icon">
            <i className="bi bi-phone"></i>
            <span>
              PRE-OWNED
            </span>
          </div>

        </section>

        {/* FILTER BOX */}
        <section className="used-filter-box">

          <div className="used-filter-title">

            <div>
              <i className="bi bi-sliders"></i>

              <div>
                <h3>Find Your Phone</h3>
                <p>
                  Filter used mobiles based on your
                  preferences.
                </p>
              </div>
            </div>

            {hasFilters && (
              <button
                type="button"
                className="clear-filter-btn"
                onClick={clearFilters}
              >
                <i className="bi bi-arrow-counterclockwise"></i>
                Reset Filters
              </button>
            )}

          </div>

          <div className="used-filter-grid">

            {/* CONDITION */}
            <div className="filter-field">

              <label>Condition</label>

              <div className="modern-select">

                <i className="bi bi-patch-check"></i>

                <select
                  value={condition}
                  onChange={(e) =>
                    setCondition(e.target.value)
                  }
                >
                  <option value="All">
                    All Conditions
                  </option>

                  <option value="Excellent">
                    Excellent
                  </option>

                  <option value="Good">
                    Good
                  </option>

                  <option value="Average">
                    Average
                  </option>
                </select>

                <i className="bi bi-chevron-down"></i>

              </div>

            </div>

            {/* BRAND */}
            <div className="filter-field">

              <label>Brand</label>

              <div className="modern-select">

                <i className="bi bi-phone"></i>

                <select
                  value={brand}
                  onChange={(e) =>
                    setBrand(e.target.value)
                  }
                >
                  {brands.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item === "All"
                        ? "All Brands"
                        : item}
                    </option>
                  ))}
                </select>

                <i className="bi bi-chevron-down"></i>

              </div>

            </div>

            {/* PRICE */}
            <div className="filter-field">

              <label>Maximum Price</label>

              <div className="modern-select">

                <i className="bi bi-currency-rupee"></i>

                <select
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(
                      Number(e.target.value)
                    )
                  }
                >
                  <option value="15000">
                    Under ₹15,000
                  </option>

                  <option value="25000">
                    Under ₹25,000
                  </option>

                  <option value="40000">
                    Under ₹40,000
                  </option>

                  <option value="100000">
                    All Prices
                  </option>
                </select>

                <i className="bi bi-chevron-down"></i>

              </div>

            </div>

            {/* SORT */}
            <div className="filter-field">

              <label>Sort By</label>

              <div className="modern-select">

                <i className="bi bi-sort-down"></i>

                <select
                  value={sort}
                  onChange={(e) =>
                    setSort(e.target.value)
                  }
                >
                  <option value="default">
                    Recommended
                  </option>

                  <option value="low">
                    Price: Low to High
                  </option>

                  <option value="high">
                    Price: High to Low
                  </option>

                  <option value="battery">
                    Best Battery Health
                  </option>
                </select>

                <i className="bi bi-chevron-down"></i>

              </div>

            </div>

          </div>
        </section>

        {/* RESULT HEADER */}
        <section className="used-result-header">

          <div>
            <h2>
              Quality Checked Mobiles
            </h2>

            <p>
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "mobile"
                : "mobiles"}{" "}
              available
            </p>
          </div>

          {condition !== "All" && (
            <span className="used-active-filter">
              <i className="bi bi-patch-check"></i>
              {condition}
            </span>
          )}

        </section>

        {/* PRODUCTS */}
        {filteredProducts.length > 0 ? (

          <div className="row g-4 used-products-grid">

            {filteredProducts.map((product) => (
              <div
                className="col-6 col-md-4 col-lg-3"
                key={product.id}
              >
                <UsedProductCard
                  product={product}
                />
              </div>
            ))}

          </div>

        ) : (

          /* EMPTY STATE */
          <div className="used-empty">

            <div className="used-empty-icon">
              <i className="bi bi-phone"></i>
            </div>

            <h3>
              No Used Mobiles Found
            </h3>

            <p>
              Try changing your filters to find
              available mobiles.
            </p>

            <button
              type="button"
              className="primary-btn"
              onClick={clearFilters}
            >
              <i className="bi bi-arrow-counterclockwise"></i>
              Reset Filters
            </button>

          </div>

        )}

        {/* BOTTOM INFORMATION */}
        <section className="used-info-section">

          <div className="used-info-content">

            <span className="section-label">
              SHOP WITH CONFIDENCE
            </span>

            <h2>
              Smart choice. Better value.
            </h2>

            <p>
              Browse our pre-owned mobile collection
              and compare condition, battery health,
              storage and warranty information.
            </p>

          </div>

          <Link
            to="/products"
            className="secondary-btn"
          >
            Browse New Mobiles
            <i className="bi bi-arrow-right"></i>
          </Link>

        </section>

      </div>
    </main>
  );
}