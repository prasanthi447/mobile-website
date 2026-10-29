import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function Navbar() {
  const { cartCount, wishlist, orders } = useShop();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (value) {
      navigate(`/products?search=${encodeURIComponent(value)}`);
    } else {
      navigate("/products");
    }

    setMenuOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <nav className="navbar-main">
        <div className="container navbar-container">

          {/* LOGO */}
          <NavLink to="/" className="brand-logo" onClick={closeMenu}>
            <span className="brand-icon">
              <i className="bi bi-phone"></i>
            </span>

            <span className="brand-name">
              Naga Sai<span>  Mobiles</span>
            </span>
          </NavLink>

          {/* DESKTOP SEARCH */}
          <form
            className="navbar-search desktop-search"
            onSubmit={handleSearch}
          >
            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search mobiles, brands & accessories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button type="submit">Search</button>
          </form>

          {/* RIGHT ACTIONS */}
          <div className="navbar-actions">

            <NavLink to="/wishlist" className="nav-action">
              <span className="nav-action-icon">
                <i className="bi bi-heart"></i>

                {wishlist.length > 0 && (
                  <span className="action-badge">
                    {wishlist.length}
                  </span>
                )}
              </span>

              <span className="action-label">
                Wishlist
              </span>
            </NavLink>

            <NavLink to="/cart" className="nav-action">
              <span className="nav-action-icon">
                <i className="bi bi-bag"></i>

                {cartCount > 0 && (
                  <span className="action-badge">
                    {cartCount}
                  </span>
                )}
              </span>

              <span className="action-label">
                Cart
              </span>
            </NavLink>

            {/* ORDERS */}
            <NavLink to="/orders" className="nav-action">
              <span className="nav-action-icon">
                <i className="bi bi-box-seam"></i>

                {orders.length > 0 && (
                  <span className="action-badge">
                    {orders.length}
                  </span>
                )}
              </span>

              <span className="action-label">
                Orders
              </span>
            </NavLink>

            {/* MOBILE MENU BUTTON */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <i
                className={
                  menuOpen
                    ? "bi bi-x-lg"
                    : "bi bi-list"
                }
              ></i>
            </button>
          </div>
        </div>

        {/* NAVIGATION */}
        <div
          className={`navigation-bar ${
            menuOpen ? "menu-open" : ""
          }`}
        >
          <div className="container navigation-container">

            {/* MOBILE SEARCH */}
            <form
              className="navbar-search mobile-search"
              onSubmit={handleSearch}
            >
              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button type="submit">
                <i className="bi bi-arrow-right"></i>
              </button>
            </form>

            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                `main-nav-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              <i className="bi bi-house"></i>
              Home
            </NavLink>

            <NavLink
              to="/products?category=smart"
              onClick={closeMenu}
              className="main-nav-link"
            >
              <i className="bi bi-phone"></i>
              Smartphones
            </NavLink>

            <NavLink
              to="/products?category=feature"
              onClick={closeMenu}
              className="main-nav-link"
            >
              <i className="bi bi-telephone"></i>
              Feature Phones
            </NavLink>

            <NavLink
              to="/used-mobiles"
              onClick={closeMenu}
              className="main-nav-link"
            >
              <i className="bi bi-arrow-repeat"></i>
              Used Mobiles
            </NavLink>

            <NavLink
              to="/products?category=accessories"
              onClick={closeMenu}
              className="main-nav-link"
            >
              <i className="bi bi-headphones"></i>
              Accessories
            </NavLink>

            <NavLink
              to="/products?category=speakers"
              onClick={closeMenu}
              className="main-nav-link"
            >
              <i className="bi bi-speaker"></i>
              Speakers
            </NavLink>

            <NavLink
              to="/brands"
              onClick={closeMenu}
              className="main-nav-link"
            >
              <i className="bi bi-grid"></i>
              Brands
            </NavLink>

            {/* MOBILE ACTION LINKS */}
            <div className="mobile-nav-actions">

              <NavLink
                to="/wishlist"
                onClick={closeMenu}
              >
                <i className="bi bi-heart"></i>
                Wishlist

                {wishlist.length > 0 && (
                  <span>{wishlist.length}</span>
                )}
              </NavLink>

              <NavLink
                to="/cart"
                onClick={closeMenu}
              >
                <i className="bi bi-bag"></i>
                Cart

                {cartCount > 0 && (
                  <span>{cartCount}</span>
                )}
              </NavLink>

              {/* MOBILE ORDERS */}
              <NavLink
                to="/orders"
                onClick={closeMenu}
              >
                <i className="bi bi-box-seam"></i>
                My Orders

                {orders.length > 0 && (
                  <span>{orders.length}</span>
                )}
              </NavLink>

            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}