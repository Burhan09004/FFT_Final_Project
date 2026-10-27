import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import "./Home.css";

const fallbackProducts = [
  { name: "Studio Wireless Headphones", brand: "Soundcore", price: 4999, category: "Audio", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85", description: "Immersive sound for everyday listening" },
  { name: "Everyday Sneakers", brand: "Street Form", price: 3299, category: "Fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85", description: "Comfort meets a clean, modern look" },
  { name: "Minimal Smart Watch", brand: "Northstar", price: 5999, category: "Electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85", description: "A smarter way to organise your day" },
  { name: "Daily Carry Backpack", brand: "Fieldwork", price: 2199, category: "Fashion", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85", description: "Room for the essentials, wherever you go" },
  { name: "Modern Table Lamp", brand: "Form Living", price: 1799, category: "Home & Kitchen", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85", description: "Warm light for your favourite corner" },
  { name: "Compact Camera", brand: "Focus Co.", price: 18999, category: "Electronics", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85", description: "Capture the moments worth keeping" },
  { name: "Wireless Game Controller", brand: "Playstate", price: 4499, category: "Gaming", image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=900&q=85", description: "Comfortable control for long sessions" },
  { name: "Ceramic Coffee Set", brand: "Sunday Studio", price: 1299, category: "Home & Kitchen", image: "https://images.unsplash.com/photo-1514228742587-6b1558f9e6b8?auto=format&fit=crop&w=900&q=85", description: "Make the everyday ritual feel special" }
];

const showcaseTiles = [
  {
    name: "Sneakers",
    eyebrow: "TRENDING",
    detail: "Fresh picks for every day",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=90",
    className: "home-tile-sneakers"
  },
  {
    name: "PlayStation",
    eyebrow: "GAMING",
    detail: "Level up your setup",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=85",
    className: "home-tile-console"
  },
  {
    name: "Watch",
    eyebrow: "EVERYDAY TECH",
    detail: "Smart style from ₹4,999",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85",
    className: "home-tile-watch"
  },
  {
    name: "Headphones",
    eyebrow: "YOUR SOUNDTRACK",
    detail: "Find your focus",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=85",
    className: "home-tile-headphones"
  }
];

const money = price => `₹${Number(price || 0).toLocaleString("en-IN")}`;

function ProductCard({ product, index, onAdd }) {
  const productPath = `/products/${product._id || encodeURIComponent(product.name)}`;
  return (
    <article className="home-product-card">
      <Link className="home-product-image" to={productPath} state={{ product }} aria-label={`View ${product.name}`}>
        <img
          src={product.image || fallbackProducts[index % fallbackProducts.length].image}
          alt={product.name}
          loading="lazy"
          onError={event => { event.currentTarget.src = fallbackProducts[0].image; }}
        />
        <span className="home-product-badge">{product.stock === 0 ? "SOLD OUT" : "POPULAR"}</span>
      </Link>
      <div className="home-product-info">
        <span className="home-product-brand">{product.brand || product.category || "GO CART EDIT"}</span>
        <h3><Link to={productPath} state={{ product }}>{product.name}</Link></h3>
        <span className="home-product-rating"><span aria-hidden="true">★</span> A GoCart favourite</span>
        <div className="home-product-bottom">
          <strong>{money(product.price)}</strong>
          <button
            type="button"
            className="home-add-button"
            aria-label={`Add ${product.name} to bag`}
            disabled={!product._id || product.stock === 0}
            onClick={() => onAdd(product)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 1.9-1.4L22 8H6M10 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" /></svg>
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [products, setProducts] = useState(fallbackProducts);
  const [search, setSearch] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    axios.get(`${API_BASE_URL}/products`, { timeout: 7000 }).then(response => {
      const list = Array.isArray(response.data) ? response.data : (response.data?.products || []);
      if (active && list.length) setProducts(list);
    }).catch(() => {
      if (active) setProducts(fallbackProducts);
    });
    return () => { active = false; };
  }, []);

  const addToBag = async product => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/cart/add`, { products: [product._id] }, { headers: { token } });
      navigate("/cart");
    } catch (error) {
      setCartMessage(error.response?.data?.message || "Couldn't add that item. Please try again.");
    }
  };

  const submitSearch = event => {
    event.preventDefault();
    const query = search.trim();
    navigate(query ? `/products?q=${encodeURIComponent(query)}` : "/products");
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="home-header-inner">
          <Link to="/" className="home-brand" aria-label="GoCart home">
            <span className="home-brand-mark">G</span>
            <span>GoCart</span>
          </Link>
          <nav className="home-nav" aria-label="Main navigation">
            <Link to="/" className="home-nav-active" aria-current="page">Home</Link>
            <Link to="/products">Shop</Link>
            <Link to="/products">Electronics</Link>
            <Link to="/products">Fashion</Link>
            <Link to="/products">Gaming</Link>
          </nav>
          <form className="home-search" onSubmit={submitSearch} role="search">
            <button type="submit" aria-label="Search products">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>
            </button>
            <input
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="Search for products, brands..."
              aria-label="Search for products or brands"
            />
          </form>
          <div className="home-header-actions">
            <Link to="/login" className="home-account-link">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></svg>
              <span>Account</span>
            </Link>
            <Link to="/cart" className="home-bag-link" aria-label="Shopping bag">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>
              <span className="home-bag-count">0</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="home-main">
        <section className="home-hero" aria-labelledby="home-title">
          <div className="home-hero-copy">
            <span className="home-season-badge"><span aria-hidden="true">✧</span> New season · Up to 40% off</span>
            <h1 id="home-title">Discover your<br /><span>next favourite</span><br />thing.</h1>
            <p>A hand-picked marketplace of premium electronics, fashion, home essentials and gaming gear — delivered fast, priced right.</p>
            <div className="home-hero-actions">
              <Link to="/products" className="home-shop-button">Shop now <span aria-hidden="true">→</span></Link>
              <a href="#home-categories" className="home-category-button">Explore categories</a>
            </div>
            <div className="home-benefits">
              <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h11v11H3zM14 11h4l3 3v4h-7z" /><circle cx="7.5" cy="19" r="1.5" /><circle cx="17.5" cy="19" r="1.5" /></svg>Free over ₹500</span>
              <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 8 3v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z" /><path d="m9 12 2 2 4-4" /></svg>Secure checkout</span>
              <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 7v5h-5M4 17v-5h5" /><path d="M5.5 9a7 7 0 0 1 12-2L20 12M4 12l2.5 5a7 7 0 0 0 12-2" /></svg>7-day returns</span>
            </div>
          </div>

          <div className="home-showcase" id="home-categories">
            {showcaseTiles.map(tile => (
              <Link to="/products" className={`home-showcase-tile ${tile.className}`} key={tile.name}>
                <img src={tile.image} alt="" />
                <span className="home-tile-copy">
                  <span className="home-tile-eyebrow">{tile.eyebrow}</span>
                  <strong>{tile.name}</strong>
                  <small>{tile.detail}</small>
                </span>
                <span className="home-tile-arrow" aria-hidden="true">›</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="home-featured" aria-labelledby="home-featured-title">
          <div className="home-featured-heading">
            <h2 id="home-featured-title">Featured products</h2>
            <Link to="/products">View all <span aria-hidden="true">→</span></Link>
          </div>
          {cartMessage && <p className="home-cart-message" role="alert">{cartMessage}</p>}
          <div className="home-featured-grid">
            {products.slice(0, 4).map((product, index) => (
              <ProductCard key={product._id || product.name || index} product={product} index={index} onAdd={addToBag} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
