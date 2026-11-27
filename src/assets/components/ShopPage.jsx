import { useEffect, useMemo, useRef, useState } from "react";
import bannerImg from "../shop-banner.jpg";
import "./ShopPage.scss";

const DB_URL =
  "https://raw.githubusercontent.com/Ommadure/Furniture-ecommerce/main/data/db.json";

function parseNumericPrice(raw) {
  if (typeof raw === "number" && !Number.isNaN(raw)) return raw;
  if (typeof raw === "string") {
    const cleaned = raw.replace(/[^0-9.]/g, "");
    const parsed = parseFloat(cleaned);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return 0;
}

function resolveApiImage(item) {
  const raw =
    item.thumbnails?.[0]?.[5] ||
    item.thumbnails?.[0]?.[4] ||
    item.thumbnails?.[0]?.[3] ||
    item.thumbnails?.[0]?.[0] ||
    item.image ||
    item.img ||
    item.imageUrl ||
    item.imgUrl ||
    item.thumbnail ||
    item.photo ||
    (Array.isArray(item.images) ? item.images[0] : "") ||
    "";

  if (!raw || typeof raw !== "string") return "";

  const trimmed = raw.trim();

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  const clean = trimmed.replace(/^\.?\//, "").replace(/^public\//, "");

  return `https://raw.githubusercontent.com/Ommadure/Furniture-ecommerce/main/public/${clean}`;
}

function normalizeProducts(data) {
  const list = Array.isArray(data)
    ? data
    : data?.products || data?.furniture || data?.items || data?.data || [];

  return list.map((item, index) => {
    const discount = item.discount || item.sale;
    const badge =
      item.badge ||
      item.tag ||
      (item.isNew
        ? "New"
        : discount
          ? `-${String(discount).replace(/^-/, "")}`
          : null);

    const numericPrice = parseNumericPrice(
      item.price ?? item.salePrice ?? item.newPrice
    );
    const numericOldPrice = parseNumericPrice(
      item.oldPrice ?? item.originalPrice ?? item.comparePrice
    );

    return {
      ...item,
      id: item.id ?? item.product_id ?? index + 1,
      name: item.name || item.title || `Product ${index + 1}`,
      title: item.title || item.name || `Product ${index + 1}`,
      subtitle: item.subtitle || item.description || item.category || "",
      category: item.category || "General",
      price: numericPrice,
      oldPrice: numericOldPrice > 0 ? numericOldPrice : null,
      badge,
      image: resolveApiImage(item),
    };
  });
}

function formatPrice(value) {
  if (value === undefined || value === null || value === "") return "";
  return `Rp ${Number(value).toLocaleString("id-ID")}`;
}

const FEATURES = [
  {
    id: "quality",
    title: "High Quality",
    subtitle: "crafted from top materials",
    icon: "trophy",
  },
  {
    id: "warranty",
    title: "Warranty Protection",
    subtitle: "Over 2 years",
    icon: "warranty",
  },
  {
    id: "shipping",
    title: "Free Shipping",
    subtitle: "Order over 150 $",
    icon: "shipping",
  },
  {
    id: "support",
    title: "24 / 7 Support",
    subtitle: "Dedicated support",
    icon: "support",
  },
];

function FeatureIcon({ type }) {
  if (type === "trophy") {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#242424"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    );
  }

  if (type === "warranty") {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#242424"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2l2.4 2.1 3.2-.4.8 3.1 2.8 1.6-1.2 3 1.2 3-2.8 1.6-.8 3.1-3.2-.4L12 22l-2.4-2.1-3.2.4-.8-3.1-2.8-1.6 1.2-3-1.2-3 2.8-1.6.8-3.1 3.2.4L12 2z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    );
  }

  if (type === "shipping") {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#242424"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    );
  }

  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#242424"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  );
}

function ShopPage({ onNavigateHome, onSelectProduct, onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedFeedback, setAddedFeedback] = useState(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(20000000);
  const [viewMode, setViewMode] = useState("grid");
  const [showCount, setShowCount] = useState(16);
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const productsTopRef = useRef(null);

  useEffect(() => {
    let ignore = false;

    async function loadProducts() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(DB_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!ignore) {
          const normalized = normalizeProducts(data);
          setProducts(normalized);
          const highest = normalized.reduce(
            (max, p) => (p.price > max ? p.price : max),
            0
          );
          if (highest > 0) {
            setMaxPrice(Math.ceil(highest));
          }
        }
      } catch (err) {
        if (!ignore) {
          setError("მონაცემების ჩატვირთვა ვერ მოხერხდა");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadProducts();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, maxPrice, sortBy, showCount]);

  const priceBounds = useMemo(() => {
    const prices = products.map((p) => p.price).filter((p) => p > 0);
    if (prices.length === 0) {
      return { min: 0, max: 20000000, step: 100 };
    }
    const min = Math.floor(Math.min(...prices));
    const max = Math.ceil(Math.max(...prices));
    const step = Math.max(1, Math.round((max - min) / 100));
    return { min: 0, max, step };
  }, [products]);

  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category).filter(Boolean));
    return ["All", ...Array.from(unique)];
  }, [products]);

  const filteredAndSorted = useMemo(() => {
    const filtered = products.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesPrice = item.price <= Number(maxPrice);
      return matchesCategory && matchesPrice;
    });

    const sorted = [...filtered];
    if (sortBy === "price-asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    return sorted;
  }, [products, selectedCategory, maxPrice, sortBy]);

  const pageSize = Math.max(1, Number(showCount) || 16);
  const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const paginatedProducts = filteredAndSorted.slice(
    startIndex,
    startIndex + pageSize
  );

  const pageNumbers = useMemo(() => {
    return Array.from({ length: totalPages }, (_, idx) => idx + 1);
  }, [totalPages]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (productsTopRef.current) {
      productsTopRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAddClick = (e, product) => {
    e.stopPropagation();
    if (typeof onAddToCart === "function") {
      onAddToCart({ ...product, quantity: 1 });
    }
    setAddedFeedback(product.id);
    setTimeout(() => {
      setAddedFeedback((current) => (current === product.id ? null : current));
    }, 1500);
  };

  const handleCardClick = (product) => {
    if (typeof onSelectProduct === "function") {
      onSelectProduct(product);
    }
  };

  const showingStart =
    filteredAndSorted.length === 0 ? 0 : startIndex + 1;
  const showingEnd = Math.min(
    startIndex + paginatedProducts.length,
    filteredAndSorted.length
  );

  return (
    <main className="shop-page">
      {/* დაბლარული ბანერი */}
      <section
        className="shop-banner"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="shop-banner__overlay">
          <h1>Shop</h1>
          <p className="breadcrumb">
            <button
              type="button"
              className="breadcrumb__link"
              onClick={onNavigateHome}
            >
              Home
            </button>
            <span>&gt;</span>
            <span className="breadcrumb__current">Shop</span>
          </p>
        </div>
      </section>

      {/* ფილტრაციის და სორტირების ზოლი */}
      <section ref={productsTopRef} className="filter-bar-wrapper">
        <div className="filter-bar">
          <div className="filter-bar__left">
            <button
              type="button"
              className="filter-btn"
              onClick={() => setIsFilterOpen((prev) => !prev)}
            >
              <span className="filter-icon">☰</span>
              <span>Filter</span>
            </button>

            <div className="view-modes">
              <button
                type="button"
                aria-label="Grid view"
                className={viewMode === "grid" ? "active" : ""}
                onClick={() => setViewMode("grid")}
              >
                ▦
              </button>
              <button
                type="button"
                aria-label="List view"
                className={viewMode === "list" ? "active" : ""}
                onClick={() => setViewMode("list")}
              >
                ▤
              </button>
            </div>

            <span className="results-count">
              Showing {showingStart}–{showingEnd} of {filteredAndSorted.length}{" "}
              results
            </span>
          </div>

          <div className="filter-bar__right">
            <label className="control-group">
              <span>Show</span>
              <input
                type="number"
                min="1"
                max="32"
                value={showCount}
                onChange={(e) => setShowCount(e.target.value)}
              />
            </label>

            <label className="control-group">
              <span>Short by</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </label>
          </div>
        </div>

        {isFilterOpen && (
          <div className="filter-drawer">
            <div className="filter-drawer__group">
              <strong>Category:</strong>
              <div className="category-buttons">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={selectedCategory === cat ? "selected" : ""}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-drawer__group">
              <label htmlFor="maxPriceRange">
                <strong>Max Price:</strong> {formatPrice(maxPrice)}
              </label>
              <input
                id="maxPriceRange"
                type="range"
                min={priceBounds.min}
                max={priceBounds.max}
                step={priceBounds.step}
                value={Math.min(maxPrice, priceBounds.max)}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
          </div>
        )}
      </section>

      {/* პროდუქციის ბარათები და პაგინაცია */}
      <section className="products-section">
        {loading && <p className="status-message">Loading products...</p>}
        {!loading && error && <p className="status-message error">{error}</p>}

        <div className={`products-list products-list--${viewMode}`}>
          {paginatedProducts.map((product) => {
            const isNewBadge =
              typeof product.badge === "string" &&
              product.badge.toLowerCase() === "new";

            return (
              <article
                key={product.id}
                className="product-card"
                onClick={() => handleCardClick(product)}
                style={{ cursor: "pointer" }}
              >
                <div className="product-card__media">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                    />
                  )}

                  {product.badge && (
                    <span
                      className={`product-badge ${
                        isNewBadge
                          ? "product-badge--new"
                          : "product-badge--sale"
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}

                  <div className="product-card__hover-overlay">
                    <button
                      type="button"
                      className="add-to-cart-btn"
                      onClick={(e) => handleAddClick(e, product)}
                    >
                      {addedFeedback === product.id ? "Added!" : "Add to cart"}
                    </button>
                    <div className="hover-actions">
                      <button type="button" onClick={(e) => e.stopPropagation()}>
                        Share
                      </button>
                      <button type="button" onClick={(e) => e.stopPropagation()}>
                        Compare
                      </button>
                      <button type="button" onClick={(e) => e.stopPropagation()}>
                        Like
                      </button>
                    </div>
                  </div>
                </div>

                <div className="product-card__body">
                  <h3>{product.name}</h3>
                  {product.subtitle && (
                    <p className="product-card__subtitle">{product.subtitle}</p>
                  )}
                  <div className="product-card__prices">
                    <span className="product-price">
                      {formatPrice(product.price)}
                    </span>
                    {product.oldPrice && (
                      <span className="product-old-price">
                        {formatPrice(product.oldPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {!loading && filteredAndSorted.length > 0 && (
          <nav className="pagination" aria-label="Shop pagination">
            {pageNumbers.map((page) => (
              <button
                key={page}
                type="button"
                className={`pagination__btn ${
                  safePage === page ? "pagination__btn--active" : ""
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}

            {safePage < totalPages && (
              <button
                type="button"
                className="pagination__btn pagination__btn--next"
                onClick={() => handlePageChange(safePage + 1)}
              >
                Next
              </button>
            )}
          </nav>
        )}
      </section>

      {/* უპირატესობების ზოლი (High Quality / Warranty / Free Shipping / 24/7 Support) */}
      <section className="shop-features" aria-label="Store features">
        <div className="shop-features__inner">
          {FEATURES.map((item) => (
            <div key={item.id} className="feature-item">
              <div className="feature-item__icon">
                <FeatureIcon type={item.icon} />
              </div>
              <div className="feature-item__text">
                <h4>{item.title}</h4>
                <p>{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ShopPage;