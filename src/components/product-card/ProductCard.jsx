import { useState } from 'react';
import './productCard.scss';
import productimg from '../../assets/images/productcardimg.png';

const REPO_RAW_BASE =
  'https://raw.githubusercontent.com/Ommadure/Furniture-ecommerce/main/';

function resolveImageUrl(rawSrc) {
  if (!rawSrc) return productimg;

  if (Array.isArray(rawSrc)) {
    rawSrc = rawSrc[0];
  }

  if (typeof rawSrc !== 'string' || !rawSrc.trim()) {
    return productimg;
  }

  const trimmed = rawSrc.trim();

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  const cleaned = trimmed.replace(/^(\.\/|\.\.\/)+/, '');
  return `${REPO_RAW_BASE}${cleaned}`;
}

function formatPrice(val) {
  if (val === undefined || val === null || val === '') return '';
  if (typeof val === 'number') {
    return `Rp ${val.toLocaleString('id-ID')}`;
  }
  const numeric = Number(String(val).replace(/[^0-9.-]+/g, ''));
  if (!Number.isNaN(numeric) && String(val).trim() !== '') {
    return `Rp ${numeric.toLocaleString('id-ID')}`;
  }
  return String(val);
}

function ProductCard({ product, onSelectProduct, onAddToCart }) {
  const [added, setAdded] = useState(false);

  const title = product?.title || product?.name || 'Syltherine';
  const description =
    product?.description ||
    product?.subtitle ||
    product?.category ||
    'Stylish cafe chair';

  const rawImage =
    product?.thumbnails ||
    product?.thumbnail ||
    product?.image ||
    product?.img ||
    product?.imageUrl ||
    product?.images;

  const imageSrc = resolveImageUrl(rawImage);
  const resolvedCardImg =
    product?.thumbnails?.[0]?.[5] || product?.thumbnails?.[0]?.[0] || imageSrc;

  const currentPrice =
    product?.price ?? product?.salePrice ?? product?.newPrice ?? 55000;
  const oldPrice =
    product?.oldPrice ?? product?.originalPrice ?? product?.comparePrice ?? 75000;

  const handleCardClick = () => {
    if (typeof onSelectProduct === 'function') {
      onSelectProduct(product);
    }
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    if (typeof onAddToCart === 'function') {
      onAddToCart({
        ...product,
        title,
        name: title,
        price: currentPrice,
        image: resolvedCardImg,
        quantity: 1,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      <div
        className="productCard"
        tabIndex={0}
        onClick={handleCardClick}
        style={{ cursor: 'pointer' }}
      >
        <img
          src={resolvedCardImg}
          className="productCard-img"
          alt={title}
          onError={(e) => {
            if (e.currentTarget.src !== productimg) {
              e.currentTarget.src = productimg;
            }
          }}
        />

        <div className="productCard-info-block">
          <h2 className="product-title">{title}</h2>
          <p className="productCard-description">{description}</p>
          <p className="productCard-price">
            {formatPrice(currentPrice)}{' '}
            {oldPrice && <span>{formatPrice(oldPrice)}</span>}
          </p>
        </div>

        {/* PRODUCT CARD OVERLAY */}

        <div className="productCard-overlay">
          <button
            type="button"
            className="productCard-overlay-button"
            onClick={handleAddClick}
          >
            {added ? 'Added!' : 'Add to cart'}
          </button>

          <div className="productCard-overlay-actions">
            {/* SHARE */}

            <button
              type="button"
              className="overlay-action"
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <path d="m8.7 13.5 6.6 4" />
                <path d="m15.3 6.5-6.6 4" />
              </svg>
              <span>Share</span>
            </button>

            {/* COMPARE */}

            <button
              type="button"
              className="overlay-action"
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M16 3l4 4-4 4" />
                <path d="M20 7H4" />
                <path d="M8 21l-4-4 4-4" />
                <path d="M4 17h16" />
              </svg>
              <span>Compare</span>
            </button>

            {/* LIKE */}

            <button
              type="button"
              className="overlay-action"
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
              </svg>
              <span>Like</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;