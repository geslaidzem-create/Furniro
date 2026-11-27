import { useEffect, useState } from "react";
import productimg from "../images/productcardimg.png";
import "./SingleProductPage.scss";

const DB_URL =
  "https://raw.githubusercontent.com/Ommadure/Furniture-ecommerce/main/data/db.json";

const REPO_RAW_BASE =
  "https://raw.githubusercontent.com/Ommadure/Furniture-ecommerce/main/";

function resolveImg(rawSrc) {
  if (!rawSrc) return "";
  if (typeof rawSrc !== "string" || !rawSrc.trim()) return "";
  const trimmed = rawSrc.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  const clean = trimmed.replace(/^\.?\//, "").replace(/^public\//, "");
  return `${REPO_RAW_BASE}public/${clean}`;
}

function getGalleryImages(product) {
  if (!product) return [productimg];

  const candidates = [];

  if (Array.isArray(product.thumbnails) && product.thumbnails.length > 0) {
    product.thumbnails.forEach((entry) => {
      if (Array.isArray(entry)) {
        const best = entry[5] || entry[4] || entry[3] || entry[0];
        if (best) candidates.push(best);
      } else if (typeof entry === "string") {
        candidates.push(entry);
      }
    });
  }

  if (Array.isArray(product.images) && product.images.length > 0) {
    product.images.forEach((img) => {
      if (typeof img === "string") candidates.push(img);
    });
  }

  const singleFields = [
    product.image,
    product.img,
    product.imageUrl,
    product.imgUrl,
    product.thumbnail,
    product.photo,
  ];

  singleFields.forEach((field) => {
    if (typeof field === "string" && field.trim()) {
      candidates.push(field);
    }
  });

  const resolved = candidates
    .map((src) => resolveImg(src))
    .filter((url, idx, arr) => Boolean(url) && arr.indexOf(url) === idx);

  return resolved.length > 0 ? resolved : [productimg];
}

function getCardImage(item) {
  if (!item) return productimg;
  if (item.image) return item.image;
  const raw =
    item.thumbnails?.[0]?.[5] ||
    item.thumbnails?.[0]?.[4] ||
    item.thumbnails?.[0]?.[3] ||
    item.thumbnails?.[0]?.[0] ||
    item.img ||
    item.imageUrl ||
    item.thumbnail ||
    (Array.isArray(item.images) ? item.images[0] : "") ||
    "";
  return resolveImg(raw) || productimg;
}

function formatPriceValue(value) {
  if (value === undefined || value === null || value === "") {
    return "Rp 250.000";
  }
  if (typeof value === "number") {
    return `Rp ${value.toLocaleString("id-ID")}`;
  }
  const numeric = Number(String(value).replace(/[^0-9.-]+/g, ""));
  if (!Number.isNaN(numeric) && String(value).trim() !== "") {
    return `Rp ${numeric.toLocaleString("id-ID")}`;
  }
  return String(value);
}

function SingleProductPage({
  product,
  allProducts = [],
  onSelectProduct,
  onNavigateHome,
  onNavigateShop,
  onAddToCart,
}) {
  const gallery = getGalleryImages(product);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [addedMessage, setAddedMessage] = useState(false);
  const [relatedSource, setRelatedSource] = useState(allProducts);
  const [showAllRelated, setShowAllRelated] = useState(false);

  useEffect(() => {
    setSelectedImgIndex(0);
    setQuantity(1);
    setAddedMessage(false);
    setShowAllRelated(false);
  }, [product]);

  useEffect(() => {
    if (Array.isArray(allProducts) && allProducts.length > 0) {
      setRelatedSource(allProducts);
      return;
    }

    let ignore = false;
    fetch(DB_URL)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (ignore) return;
        const list = Array.isArray(data)
          ? data
          : data?.products || data?.furniture || data?.items || data?.data || [];
        setRelatedSource(list);
      })
      .catch(() => {});

    return () => {
      ignore = true;
    };
  }, [allProducts]);

  const title = product?.title || product?.name || "Asgaard sofa";
  const priceValue = product?.price ?? product?.salePrice ?? 250000;
  const formattedPrice = formatPriceValue(priceValue);

  const shortDesc =
    product?.description ||
    product?.subtitle ||
    "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.";

  const mainImage = gallery[selectedImgIndex] || gallery[0] || productimg;

  const currentKey = String(
    product?.id ?? product?.product_id ?? product?.title ?? product?.name ?? ""
  );

  const filteredRelated = relatedSource.filter((item) => {
    const itemKey = String(
      item?.id ?? item?.product_id ?? item?.title ?? item?.name ?? ""
    );
    return itemKey && itemKey !== currentKey;
  });

  const visibleRelated = showAllRelated
    ? filteredRelated.slice(0, 8)
    : filteredRelated.slice(0, 4);

  const handleAddToCart = () => {
    if (typeof onAddToCart === "function") {
      onAddToCart({
        ...product,
        title,
        name: title,
        price: Number(String(priceValue).replace(/[^0-9.-]+/g, "")) || 250000,
        image: mainImage,
        quantity,
      });
    }
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  return (
    <main className="single-product-page">
      {/* BREADCRUMB BAR */}
      <div className="single-breadcrumb-bar">
        <div className="single-breadcrumb-bar__inner">
          <button
            type="button"
            className="single-breadcrumb__link"
            onClick={onNavigateHome}
          >
            Home
          </button>
          <span className="single-breadcrumb__arrow">&gt;</span>
          <button
            type="button"
            className="single-breadcrumb__link"
            onClick={onNavigateShop}
          >
            Shop
          </button>
          <span className="single-breadcrumb__arrow">&gt;</span>
          <span className="single-breadcrumb__divider">|</span>
          <span className="single-breadcrumb__current">{title}</span>
        </div>
      </div>

      {/* MAIN PRODUCT DETAILS */}
      <section className="single-product-main">
        <div className="single-product-gallery">
          <div className="single-product-thumbnails">
            {gallery.map((imgSrc, idx) => (
              <button
                key={`${imgSrc}-${idx}`}
                type="button"
                className={`single-thumb-btn ${
                  selectedImgIndex === idx ? "is-active" : ""
                }`}
                onClick={() => setSelectedImgIndex(idx)}
                aria-label={`View image ${idx + 1}`}
              >
                <img
                  src={imgSrc}
                  alt={`${title} view ${idx + 1}`}
                  onError={(e) => {
                    if (e.currentTarget.src !== productimg) {
                      e.currentTarget.src = productimg;
                    }
                  }}
                />
              </button>
            ))}
          </div>

          <div className="single-product-main-img-box">
            <img
              src={mainImage}
              alt={title}
              className="single-product-main-img"
              onError={(e) => {
                if (e.currentTarget.src !== productimg) {
                  e.currentTarget.src = productimg;
                }
              }}
            />
          </div>
        </div>

        <div className="single-product-info">
          <h1 className="single-product-title">{title}</h1>
          <p className="single-product-price">{formattedPrice}</p>

          <div className="single-product-rating">
            <span className="stars" aria-label="4.5 out of 5 stars">
              ★★★★★
            </span>
            <span className="rating-divider">|</span>
            <span className="review-count">5 Customer Review</span>
          </div>

          <p className="single-product-desc">{shortDesc}</p>

          <div className="single-actions-row">
            <div className="quantity-box">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>

          {addedMessage && (
            <p className="added-notice" role="status">
              Added to cart!
            </p>
          )}

          <div className="single-product-meta">
            <div className="meta-row">
              <span className="meta-label">SKU</span>
              <span className="meta-colon">:</span>
              <span className="meta-value">
                {product?.product_id || product?.id || "SS001"}
              </span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Category</span>
              <span className="meta-colon">:</span>
              <span className="meta-value">
                {product?.category || "Sofas"}
              </span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Tags</span>
              <span className="meta-colon">:</span>
              <span className="meta-value">Sofa, Chair, Home, Shop</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Share</span>
              <span className="meta-colon">:</span>
              <span className="meta-value share-icons">
                <a href="#facebook" onClick={(e) => e.preventDefault()}>
                  f
                </a>
                <a href="#linkedin" onClick={(e) => e.preventDefault()}>
                  in
                </a>
                <a href="#twitter" onClick={(e) => e.preventDefault()}>
                  𝕏
                </a>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* TABS & GALLERY PREVIEW SECTION */}
      <section className="single-product-tabs">
        <div className="tabs-header">
          <button
            type="button"
            className={`tab-btn ${
              activeTab === "description" ? "is-active" : ""
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            type="button"
            className={`tab-btn ${
              activeTab === "additional" ? "is-active" : ""
            }`}
            onClick={() => setActiveTab("additional")}
          >
            Additional Information
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "reviews" ? "is-active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews [5]
          </button>
        </div>

        <div className="tabs-body">
          {activeTab === "description" && (
            <>
              <p>
                Embodying the raw, wayward spirit of rock &apos;n&apos; roll,
                the Kilburn portable active stereo speaker takes the
                unmistakable look and sound of Marshall, unplugs the chords,
                and takes the show on the road.
              </p>
              <p>
                Weighing in under 7 pounds, the Kilburn is a lightweight piece
                of vintage styled engineering. Setting the bar as one of the
                loudest speakers in its class, the Kilburn is a compact,
                stout-hearted hero with a well-balanced audio which boasts a
                clear midrange and extended highs for a sound that is both
                articulate and pronounced.
              </p>
            </>
          )}

          {activeTab === "additional" && (
            <p>
              Crafted for everyday home and interior comfort with durable
              materials and clean detailing.
            </p>
          )}

          {activeTab === "reviews" && (
            <p>5 verified customer reviews for {title}.</p>
          )}
        </div>

        <div className="single-showcase-pair">
          {gallery.slice(0, 2).map((imgSrc, idx) => (
            <div key={`${imgSrc}-pair-${idx}`} className="showcase-pair__card">
              <img
                src={imgSrc}
                alt={`${title} detail ${idx + 1}`}
                onError={(e) => {
                  if (e.currentTarget.src !== productimg) {
                    e.currentTarget.src = productimg;
                  }
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* RELATED PRODUCTS SECTION */}
      <section className="related-products-section">
        <h2 className="related-products-title">Related Products</h2>

        <div className="related-products-grid">
          {visibleRelated.map((item, idx) => {
            const itemTitle = item.title || item.name || `Product ${idx + 1}`;
            const itemSubtitle =
              item.subtitle || item.description || item.category || "";
            const itemPrice = formatPriceValue(item.price ?? item.salePrice ?? 0);
            const itemOldPrice = item.oldPrice
              ? formatPriceValue(item.oldPrice)
              : null;
            const itemImg = getCardImage(item);

            return (
              <article
                key={item.id ?? item.product_id ?? idx}
                className="related-card"
                onClick={() => {
                  if (typeof onSelectProduct === "function") {
                    onSelectProduct(item);
                  }
                }}
              >
                <div className="related-card__img-box">
                  <img
                    src={itemImg}
                    alt={itemTitle}
                    loading="lazy"
                    onError={(e) => {
                      if (e.currentTarget.src !== productimg) {
                        e.currentTarget.src = productimg;
                      }
                    }}
                  />
                  {item.badge && (
                    <span
                      className={`related-badge ${
                        String(item.badge).toLowerCase() === "new"
                          ? "related-badge--new"
                          : "related-badge--sale"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="related-card__body">
                  <h3>{itemTitle}</h3>
                  {itemSubtitle && <p className="related-subtitle">{itemSubtitle}</p>}
                  <div className="related-prices">
                    <span className="related-price">{itemPrice}</span>
                    {itemOldPrice && (
                      <span className="related-old-price">{itemOldPrice}</span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredRelated.length > 4 && (
          <div className="related-more-wrapper">
            <button
              type="button"
              className="related-more-btn"
              onClick={() => setShowAllRelated((prev) => !prev)}
            >
              {showAllRelated ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default SingleProductPage;