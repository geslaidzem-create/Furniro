import { useMemo, useState } from "react";
import bannerImg from "../shop-banner.jpg";
import "./CartPage.scss";

const DEFAULT_CART_ITEMS = [
  {
    id: "asgaard-sofa",
    name: "Asgaard sofa",
    price: 250000,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80",
  },
];

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

function formatPrice(value) {
  const num = Number(value) || 0;
  return `Rs. ${num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

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

function TrashIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9 3h6a1 1 0 0 1 1 1v1h4v2h-1v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7H4V5h4V4a1 1 0 0 1 1-1zm1 2v0h4V5h-4zm-3 2v13h10V7H7zm2 3h2v7H9v-7zm4 0h2v7h-2v-7z" />
    </svg>
  );
}

function CartPage({
  onNavigateHome,
  onNavigateShop,
  onNavigateCheckout,
  items,
  setItems,
}) {
  const [localItems, setLocalItems] = useState(DEFAULT_CART_ITEMS);
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const cartList = Array.isArray(items) ? items : localItems;
  const updateCartList =
    typeof setItems === "function" ? setItems : setLocalItems;

  const handleQuantityChange = (id, rawValue) => {
    const parsed = Math.max(1, Number.parseInt(rawValue, 10) || 1);
    updateCartList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: parsed } : item))
    );
  };

  const handleRemoveItem = (id) => {
    updateCartList((prev) => prev.filter((item) => item.id !== id));
  };

  const totalAmount = useMemo(() => {
    return cartList.reduce(
      (sum, item) =>
        sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
      0
    );
  }, [cartList]);

  const handleCheckout = () => {
    if (cartList.length === 0) {
      setCheckoutMessage("Your cart is empty.");
      return;
    }
    if (typeof onNavigateCheckout === "function") {
      onNavigateCheckout();
    } else {
      setCheckoutMessage("Proceeding to checkout...");
    }
  };

  return (
    <main className="cart-page">
      {/* დაბლარული ბანერი */}
      <section
        className="cart-banner"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="cart-banner__overlay">
          <h1>Cart</h1>
          <p className="breadcrumb">
            <button
              type="button"
              className="breadcrumb__link"
              onClick={onNavigateHome}
            >
              Home
            </button>
            <span>&gt;</span>
            <span className="breadcrumb__current">Cart</span>
          </p>
        </div>
      </section>

      {/* კალათის ძირითადი სექცია */}
      <section className="cart-section">
        <div className="cart-layout">
          <div className="cart-table-wrapper">
            <div className="cart-table-head">
              <span />
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Subtotal</span>
              <span />
            </div>

            {cartList.length === 0 ? (
              <div className="cart-empty">
                <p>Your cart is currently empty.</p>
                {typeof onNavigateShop === "function" && (
                  <button
                    type="button"
                    className="cart-empty__btn"
                    onClick={onNavigateShop}
                  >
                    Go to Shop
                  </button>
                )}
              </div>
            ) : (
              <div className="cart-rows">
                {cartList.map((item, idx) => {
                  const qty = Number(item.quantity) || 1;
                  const price = Number(item.price) || 0;
                  const subtotal = price * qty;
                  const displayName = item.name || item.title || "Product";

                  return (
                    <div
                      key={`${item.id ?? displayName}-${idx}`}
                      className="cart-row"
                    >
                      <div className="cart-row__thumb">
                        {item.image && <img src={item.image} alt={displayName} />}
                      </div>

                      <div className="cart-row__product">{displayName}</div>

                      <div className="cart-row__price">{formatPrice(price)}</div>

                      <div className="cart-row__qty">
                        <input
                          type="number"
                          min="1"
                          max="99"
                          aria-label={`${displayName} quantity`}
                          value={qty}
                          onChange={(e) =>
                            handleQuantityChange(item.id, e.target.value)
                          }
                        />
                      </div>

                      <div className="cart-row__subtotal">
                        {formatPrice(subtotal)}
                      </div>

                      <div className="cart-row__remove">
                        <button
                          type="button"
                          aria-label={`Remove ${displayName}`}
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <aside className="cart-totals">
            <h2>Cart Totals</h2>

            <div className="cart-totals__row">
              <span className="label">Subtotal</span>
              <span className="value value--muted">
                {formatPrice(totalAmount)}
              </span>
            </div>

            <div className="cart-totals__row cart-totals__row--total">
              <span className="label">Total</span>
              <span className="value value--accent">
                {formatPrice(totalAmount)}
              </span>
            </div>

            <button
              type="button"
              className="cart-totals__checkout-btn"
              onClick={handleCheckout}
            >
              Check Out
            </button>

            {checkoutMessage && (
              <p className="cart-totals__message">{checkoutMessage}</p>
            )}
          </aside>
        </div>
      </section>

      {/* უპირატესობების ზოლი (იგივე რაც Shop გვერდზე) */}
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

export default CartPage;