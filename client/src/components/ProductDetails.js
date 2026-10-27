import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";
import "./ProductDetails.css";

const fallbackImage = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85";
const money = price => `₹${Number(price || 0).toLocaleString("en-IN")}`;

export default function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!location.state?.product);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (!id || !/^[a-f\d]{24}$/i.test(id)) {
      if (!location.state?.product) {
        setError("This product preview is only available from the shop page.");
        setLoading(false);
      }
      return undefined;
    }

    let active = true;
    setLoading(true);
    setError("");
    axios.get(`${API_BASE_URL}/products/${id}`, { timeout: 8000 })
      .then(response => {
        if (active) setProduct(response.data);
      })
      .catch(requestError => {
        if (active) {
          setError(requestError.response?.data?.message || "We couldn't load this product. Please try again.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [id, location.state]);

  const addToCart = async () => {
    if (!product?._id) {
      setError("Sample previews cannot be added to the cart.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setAdding(true);
    setError("");
    try {
      await axios.post(`${API_BASE_URL}/cart/add`, { products: [product._id] }, { headers: { token } });
      navigate("/cart");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Couldn't add this item. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="product-details-page">
      <header className="product-details-header">
        <Link to="/" className="product-details-brand"><span>G</span> GoCart</Link>
        <nav aria-label="Product navigation">
          <Link to="/">Home</Link>
          <Link to="/products">Shop</Link>
        </nav>
        <Link to="/cart" className="product-details-cart">Bag ↗</Link>
      </header>

      <main className="product-details-main">
        <Link to="/products" className="product-details-back">← Back to shop</Link>
        {loading ? (
          <p className="product-details-status" role="status">Loading product…</p>
        ) : error && !product ? (
          <section className="product-details-error" role="alert">
            <h1>Product unavailable</h1>
            <p>{error}</p>
            <Link to="/products">Return to shop</Link>
          </section>
        ) : product ? (
          <section className="product-details-content">
            <div className="product-details-image">
              <img
                src={product.image || fallbackImage}
                alt={product.name}
                onError={event => { event.currentTarget.src = fallbackImage; }}
              />
              {product.category && <span>{product.category}</span>}
            </div>
            <div className="product-details-info">
              <p className="product-details-brand">{product.brand || "GO CART EDIT"}</p>
              <h1>{product.name}</h1>
              <p className="product-details-description">{product.description || "A thoughtful find for everyday life."}</p>
              <strong className="product-details-price">{money(product.price)}</strong>
              <p className={`product-details-stock ${Number(product.stock) > 0 ? "in-stock" : "out-of-stock"}`}>
                {Number(product.stock) > 0 ? `${product.stock} available` : "Out of stock"}
              </p>
              {error && <p className="product-details-message" role="alert">{error}</p>}
              <button
                type="button"
                className="product-details-add"
                onClick={addToCart}
                disabled={adding || Number(product.stock) <= 0 || !product._id}
              >
                {adding ? "Adding…" : "Add"}
              </button>
              <p className="product-details-promise">Secure checkout · Free delivery over ₹500 · 7-day returns</p>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
