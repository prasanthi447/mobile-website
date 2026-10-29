import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../data/Mobiles";
import ProductCard from "../components/ProductCard";

const categoryNames = {
  feature: "Feature Phones",
  smart: "Smartphones",
  used: "Used / Second-Hand Mobiles",
  accessories: "Accessories",
  speakers: "Bluetooth Speakers",
};

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ==============================
  // URL VALUES
  // ==============================

  const categoryFromURL =
    searchParams.get("category") || "all";

  const searchFromURL =
    searchParams.get("search") || "";

  const brandFromURL =
    searchParams.get("brand") || "All";

  const sortFromURL =
    searchParams.get("sort") || "default";

  const priceFromURL =
    searchParams.get("price") || "all";

  // ==============================
  // STATE
  // ==============================

  const [search, setSearch] =
    useState(searchFromURL);

  const [brand, setBrand] =
    useState(brandFromURL);

  const [sort, setSort] =
    useState(sortFromURL);

  const [priceRange, setPriceRange] =
    useState(priceFromURL);

  // ==============================
  // SYNC URL WITH STATE
  // ==============================

  useEffect(() => {
    setSearch(searchFromURL);
  }, [searchFromURL]);

  useEffect(() => {
    setBrand(brandFromURL);
  }, [brandFromURL]);

  useEffect(() => {
    setSort(sortFromURL);
  }, [sortFromURL]);

  useEffect(() => {
    setPriceRange(priceFromURL);
  }, [priceFromURL]);

  // ==============================
  // CATEGORY PRODUCTS
  // ==============================

  const categoryProducts = useMemo(() => {
    if (categoryFromURL === "all") {
      return products;
    }

    return products.filter(
      (product) =>
        product.category === categoryFromURL
    );
  }, [categoryFromURL]);

  // ==============================
  // AVAILABLE BRANDS
  // ==============================

  const brands = useMemo(() => {
    const uniqueBrands = [
      ...new Set(
        categoryProducts
          .map((product) => product.brand)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueBrands];
  }, [categoryProducts]);

  // ==============================
  // CHECK BRAND
  // ==============================

  useEffect(() => {
    if (
      brand !== "All" &&
      !brands.some(
        (item) =>
          item.toLowerCase() ===
          brand.toLowerCase()
      )
    ) {
      setBrand("All");

      const params =
        new URLSearchParams(searchParams);

      params.delete("brand");

      setSearchParams(params, {
        replace: true,
      });
    }
  }, [
    brands,
    brand,
    searchParams,
    setSearchParams,
  ]);

  // ==============================
  // FILTER PRODUCTS
  // ==============================

  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];

    // ==============================
    // SEARCH
    // ==============================

    if (search.trim()) {
      const searchText =
        search.toLowerCase().trim();

      result = result.filter((product) => {
        const productName =
          product.name?.toLowerCase() || "";

        const productBrand =
          product.brand?.toLowerCase() || "";

        const productSpecs =
          typeof product.specs === "string"
            ? product.specs.toLowerCase()
            : "";

        const productCondition =
          product.condition?.toLowerCase() || "";

        return (
          productName.includes(searchText) ||
          productBrand.includes(searchText) ||
          productSpecs.includes(searchText) ||
          productCondition.includes(searchText)
        );
      });
    }

    // ==============================
    // BRAND
    // ==============================

    if (brand !== "All") {
      result = result.filter(
        (product) =>
          product.brand?.toLowerCase() ===
          brand.toLowerCase()
      );
    }

    // ==============================
    // PRICE RANGE
    // ==============================

    if (priceRange !== "all") {
      result = result.filter((product) => {
        const price =
          Number(product.price) || 0;

        switch (priceRange) {
          case "0-10000":
            return price <= 10000;

          case "10000-20000":
            return (
              price > 10000 &&
              price <= 20000
            );

          case "20000-40000":
            return (
              price > 20000 &&
              price <= 40000
            );

          case "40000-70000":
            return (
              price > 40000 &&
              price <= 70000
            );

          case "70000-plus":
            return price > 70000;

          default:
            return true;
        }
      });
    }

    // ==============================
    // SORT
    // ==============================

    switch (sort) {
      case "low":
        result.sort(
          (a, b) =>
            Number(a.price) -
            Number(b.price)
        );
        break;

      case "high":
        result.sort(
          (a, b) =>
            Number(b.price) -
            Number(a.price)
        );
        break;

      case "rating":
        result.sort(
          (a, b) =>
            Number(b.rating || 0) -
            Number(a.rating || 0)
        );
        break;

      default:
        break;
    }

    return result;
  }, [
    categoryProducts,
    search,
    brand,
    priceRange,
    sort,
  ]);

  // ==============================
  // PAGE TITLE
  // ==============================

  const pageTitle =
    categoryNames[categoryFromURL] ||
    "All Products";

  // ==============================
  // SEARCH
  // ==============================

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    const params =
      new URLSearchParams(searchParams);

    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    setSearchParams(params);
  };

  // ==============================
  // BRAND
  // ==============================

  const handleBrandChange = (e) => {
    const value = e.target.value;

    setBrand(value);

    const params =
      new URLSearchParams(searchParams);

    // BRAND SELECTED
    if (value === "All") {
      params.delete("brand");
    } else {
      params.set("brand", value);
    }

    // CLEAR SEARCH WHEN BRAND CHANGES
    setSearch("");

    params.delete("search");

    setSearchParams(params);
  };

  // ==============================
  // PRICE RANGE
  // ==============================

  const handlePriceChange = (e) => {
    const value = e.target.value;

    setPriceRange(value);

    const params =
      new URLSearchParams(searchParams);

    if (value === "all") {
      params.delete("price");
    } else {
      params.set("price", value);
    }

    setSearchParams(params);
  };

  // ==============================
  // SORT
  // ==============================

  const handleSortChange = (e) => {
    const value = e.target.value;

    setSort(value);

    const params =
      new URLSearchParams(searchParams);

    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    setSearchParams(params);
  };

  // ==============================
  // CLEAR FILTERS
  // ==============================

  const clearFilters = () => {
    setSearch("");
    setBrand("All");
    setPriceRange("all");
    setSort("default");

    if (categoryFromURL === "all") {
      setSearchParams({});
    } else {
      setSearchParams({
        category: categoryFromURL,
      });
    }
  };

  // ==============================
  // FILTER CHECK
  // ==============================

  const hasFilters =
    search.trim() ||
    brand !== "All" ||
    priceRange !== "all" ||
    sort !== "default";

  // ==============================
  // UI
  // ==============================

  return (
    <main className="products-page">
      <div className="container">

        {/* =========================
            PAGE HEADER
        ========================== */}

        <section className="products-header">

          <div>
            <span className="section-label">
              MOBILEHUB STORE
            </span>

            <h1>{pageTitle}</h1>

            <p>
              Discover smartphones, feature phones,
              accessories and more.
            </p>
          </div>

          <div className="products-header-icon">
            <i className="bi bi-grid-3x3-gap"></i>
          </div>

        </section>

        {/* =========================
            FILTER BOX
        ========================== */}

        <section className="products-filter">

          <div className="filter-title">

            <div>
              <i className="bi bi-sliders"></i>

              <strong>
                Find Your Product
              </strong>
            </div>

            {hasFilters && (
              <button
                type="button"
                className="clear-filter-btn"
                onClick={clearFilters}
              >
                <i className="bi bi-arrow-counterclockwise"></i>
                Clear Filters
              </button>
            )}

          </div>

          <div className="filter-grid">

            {/* =====================
                SEARCH
            ====================== */}

            <div className="filter-field search-field">

              <label>
                Search
              </label>

              <div className="modern-input">

                <i className="bi bi-search"></i>

                <input
                  type="text"
                  placeholder="Search mobile, brand or specs..."
                  value={search}
                  onChange={handleSearch}
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => {

                      setSearch("");

                      const params =
                        new URLSearchParams(
                          searchParams
                        );

                      params.delete("search");

                      setSearchParams(params);
                    }}
                  >
                    <i className="bi bi-x-circle"></i>
                  </button>
                )}

              </div>

            </div>

            {/* =====================
                BRAND
            ====================== */}

            <div className="filter-field">

              <label>
                Brand
              </label>

              <div className="modern-select">

                <i className="bi bi-phone"></i>

                <select
                  value={brand}
                  onChange={handleBrandChange}
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

            {/* =====================
                PRICE RANGE
            ====================== */}

            <div className="filter-field">

              <label>
                Price Range
              </label>

              <div className="modern-select">

                <i className="bi bi-currency-rupee"></i>

                <select
                  value={priceRange}
                  onChange={handlePriceChange}
                >

                  <option value="all">
                    All Prices
                  </option>

                  <option value="0-10000">
                    Under ₹10,000
                  </option>

                  <option value="10000-20000">
                    ₹10,000 - ₹20,000
                  </option>

                  <option value="20000-40000">
                    ₹20,000 - ₹40,000
                  </option>

                  <option value="40000-70000">
                    ₹40,000 - ₹70,000
                  </option>

                  <option value="70000-plus">
                    ₹70,000+
                  </option>

                </select>

                <i className="bi bi-chevron-down"></i>

              </div>

            </div>

            {/* =====================
                SORT
            ====================== */}

            <div className="filter-field">

              <label>
                Sort By
              </label>

              <div className="modern-select">

                <i className="bi bi-sort-down"></i>

                <select
                  value={sort}
                  onChange={handleSortChange}
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

                  <option value="rating">
                    Highest Rated
                  </option>

                </select>

                <i className="bi bi-chevron-down"></i>

              </div>

            </div>

          </div>

        </section>

        {/* =========================
            RESULTS HEADER
        ========================== */}

        <section className="products-result-header">

          <div>

            <h2>
              {brand !== "All"
                ? `${brand} Mobiles`
                : pageTitle}
            </h2>

            <span>
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "product"
                : "products"}{" "}
              found
            </span>

          </div>

          {(brand !== "All" ||
            priceRange !== "all") && (
            <div className="active-filter">

              <i className="bi bi-funnel"></i>

              {brand !== "All" &&
                priceRange !== "all"
                ? `${brand} • ${getPriceLabel(priceRange)}`
                : brand !== "All"
                ? brand
                : getPriceLabel(priceRange)}

            </div>
          )}

        </section>

        {/* =========================
            PRODUCTS
        ========================== */}

        {filteredProducts.length > 0 ? (

          <div className="row g-4 products-grid">

            {filteredProducts.map(
              (product) => (

                <div
                  className="col-6 col-md-4 col-lg-3"
                  key={product.id}
                >
                  <ProductCard
                    product={product}
                  />
                </div>

              )
            )}

          </div>

        ) : (

          /* =======================
             EMPTY
          ======================== */

          <div className="products-empty">

            <div className="products-empty-icon">
              <i className="bi bi-search"></i>
            </div>

            <h3>
              No Products Found
            </h3>

            <p>
              We couldn't find products matching
              your search or filters.
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

      </div>
    </main>
  );
}

// =========================================
// PRICE LABEL
// =========================================

function getPriceLabel(priceRange) {
  switch (priceRange) {
    case "0-10000":
      return "Under ₹10,000";

    case "10000-20000":
      return "₹10,000 - ₹20,000";

    case "20000-40000":
      return "₹20,000 - ₹40,000";

    case "40000-70000":
      return "₹40,000 - ₹70,000";

    case "70000-plus":
      return "₹70,000+";

    default:
      return "All Prices";
  }
}