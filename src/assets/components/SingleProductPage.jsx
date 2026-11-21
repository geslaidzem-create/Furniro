import { useEffect, useState } from "react";
import productimg from "../images/productcardimg.png";
import "./SingleProductPage.scss";

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
  onNavigateHome,
  onNavigateShop,
  onAddToCart,
}) {
  const gallery = getGalleryImages(product);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("L");
  const [selectedColor, setSelectedColor] = useState("#816DFA");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [addedMessage, setAddedMessage] = useState(false);

  useEffect(() => {
    setSelectedImgIndex(0);
    setQuantity(1);
    setAddedMessage(false);
  }, [product]);

  const title = product?.title || product?.name || "Asgaard sofa";
  const priceValue = product?.price ?? product?.salePrice ?? 250000;
  const formattedPrice = formatPriceValue(priceValue);

  const shortDesc =
    product?.description ||
    product?.subtitle ||
    "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.";

  const mainImage = gallery[selectedImgIndex] || gallery[0] || productimg;

  const colors = [
    { name: "Purple", hex: "#816DFA" },
    { name: "Black", hex: "#000000" },
    { name: "Gold", hex: "#B88E2F" },
  ];

  const sizes = ["L", "XL", "XS"];

  const handleAddToCart = () => {
    if (typeof onAddToCart === "function") {
      onAddToCart({
        ...product,
        title,
        image: mainImage,
        size: selectedSize,
        color: selectedColor,
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

          <div className="single-option-group">
            <span className="single-option-label">Size</span>
            <div className="size-options">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`size-btn ${
                    selectedSize === size ? "is-selected" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="single-option-group">
            <span className="single-option-label">Color</span>
            <div className="color-options">
              {colors.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  className={`color-swatch ${
                    selectedColor === c.hex ? "is-selected" : ""
                  }`}
                  style={{ backgroundColor: c.hex }}
                  onClick={() => setSelectedColor(c.hex)}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>

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

            <button type="button" className="compare-btn">
              + Compare
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

      {/* TABS SECTION */}
      <section className="single-product-tabs">
        <div className="tabs-header">
          <button
            type="button"
            className={`tab-btn ${activeTab === "description" ? "is-active" : ""}`}
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
              Selected size: <strong>{selectedSize}</strong> · Selected color:{" "}
              <strong>{selectedColor}</strong> · Crafted for everyday home and
              interior comfort.
            </p>
          )}

          {activeTab === "reviews" && (
            <p>5 verified customer reviews for {title}.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default SingleProductPage;