import { useMemo, useState } from "react";
import bannerImg from "../shop-banner.jpg";
import "./CheckoutPage.scss";
import furniroLogo from "../furniro_Logos-05.svg"

const DEFAULT_CHECKOUT_ITEMS = [
  {
    id: "asgaard-sofa",
    name: "Asgaard sofa",
    price: 250000,
    quantity: 1,
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

function FurniroLogoMark() {
  return (
    <svg
      width="42"
      height="28"
      viewBox="0 0 50 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M4 28L19 4L34 28H26.5L19 15.5L11.5 28H4Z" fill="#B88E2F" />
      <path d="M23 28L33 11L43 28H36.8L33 21.4L29.2 28H23Z" fill="#B88E2F" />
    </svg>
  );
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

function CheckoutPage({
  items,
  onNavigateHome,
  onOrderComplete,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "Sri Lanka",
    streetAddress: "",
    townCity: "",
    province: "Western Province",
    zipCode: "",
    phone: "",
    email: "",
    additionalInfo: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const checkoutList = useMemo(() => {
    if (Array.isArray(items) && items.length > 0) {
      return items;
    }
    return DEFAULT_CHECKOUT_ITEMS;
  }, [items]);

  const totalAmount = useMemo(() => {
    return checkoutList.reduce(
      (sum, item) =>
        sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
      0
    );
  }, [checkoutList]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (paymentSuccess) return;

    setPaymentSuccess(true);

    setTimeout(() => {
      if (typeof onOrderComplete === "function") {
        onOrderComplete();
      } else if (typeof onNavigateHome === "function") {
        onNavigateHome();
      }
    }, 1800);
  };

  return (
    <main className="checkout-page">
      {/* დაბლარული ბანერი */}
      <section
        className="checkout-banner"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="checkout-banner__overlay">
          <div className="checkout-banner__logo">
            <img src={furniroLogo} />
          </div>
          <h1>Checkout</h1>
          <p className="breadcrumb">
            <button
              type="button"
              className="breadcrumb__link"
              onClick={onNavigateHome}
            >
              Home
            </button>
            <span>&gt;</span>
            <span className="breadcrumb__current">Checkout</span>
          </p>
        </div>
      </section>

      {/* ძირითადი Checkout სექცია */}
      <section className="checkout-section">
        <form className="checkout-grid" onSubmit={handlePlaceOrder}>
          {/* მარცხენა მხარე — Billing details */}
          <div className="billing-column">
            <h2>Billing details</h2>

            <div className="billing-row billing-row--two">
              <div className="field-group">
                <label htmlFor="firstName">
                  First Name <span className="required-star">*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleFieldChange}
                />
              </div>

              <div className="field-group">
                <label htmlFor="lastName">
                  Last Name <span className="required-star">*</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleFieldChange}
                />
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="companyName">Company Name (Optional)</label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                value={formData.companyName}
                onChange={handleFieldChange}
              />
            </div>

            <div className="field-group">
              <label htmlFor="country">
                Country / Region <span className="required-star">*</span>
              </label>
              <select
                id="country"
                name="country"
                required
                value={formData.country}
                onChange={handleFieldChange}
              >
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Georgia">Georgia</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="streetAddress">
                Street address <span className="required-star">*</span>
              </label>
              <input
                id="streetAddress"
                name="streetAddress"
                type="text"
                required
                value={formData.streetAddress}
                onChange={handleFieldChange}
              />
            </div>

            <div className="field-group">
              <label htmlFor="townCity">
                Town / City <span className="required-star">*</span>
              </label>
              <input
                id="townCity"
                name="townCity"
                type="text"
                required
                value={formData.townCity}
                onChange={handleFieldChange}
              />
            </div>

            <div className="field-group">
              <label htmlFor="province">
                Province <span className="required-star">*</span>
              </label>
              <select
                id="province"
                name="province"
                required
                value={formData.province}
                onChange={handleFieldChange}
              >
                <option value="Western Province">Western Province</option>
                <option value="Central Province">Central Province</option>
                <option value="Southern Province">Southern Province</option>
                <option value="Tbilisi">Tbilisi</option>
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="zipCode">
                ZIP code <span className="required-star">*</span>
              </label>
              <input
                id="zipCode"
                name="zipCode"
                type="text"
                required
                value={formData.zipCode}
                onChange={handleFieldChange}
              />
            </div>

            <div className="field-group">
              <label htmlFor="phone">
                Phone <span className="required-star">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleFieldChange}
              />
            </div>

            <div className="field-group">
              <label htmlFor="email">
                Email address <span className="required-star">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleFieldChange}
              />
            </div>

            <div className="field-group">
              <input
                id="additionalInfo"
                name="additionalInfo"
                type="text"
                placeholder="Additional information"
                value={formData.additionalInfo}
                onChange={handleFieldChange}
              />
            </div>
          </div>

          {/* მარჯვენა მხარე — Order Summary & Payment */}
          <aside className="order-summary-column">
            <div className="order-summary__head">
              <span>Product</span>
              <span>Subtotal</span>
            </div>

            <div className="order-summary__items">
              {checkoutList.map((item, idx) => {
                const qty = Number(item.quantity) || 1;
                const price = Number(item.price) || 0;
                const displayName = item.name || item.title || "Product";

                return (
                  <div
                    key={`${item.id ?? displayName}-${idx}`}
                    className="order-summary__item"
                  >
                    <span className="item-name">
                      {displayName} <strong className="item-qty">× {qty}</strong>
                    </span>
                    <span className="item-subtotal">
                      {formatPrice(price * qty)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="order-summary__row">
              <span>Subtotal</span>
              <span>{formatPrice(totalAmount)}</span>
            </div>

            <div className="order-summary__row order-summary__row--total">
              <span>Total</span>
              <span className="total-gold">{formatPrice(totalAmount)}</span>
            </div>

            <hr className="order-summary__divider" />

            <div className="payment-methods">
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                />
                <span className="payment-option__title">
                  Direct Bank Transfer
                </span>
              </label>

              {paymentMethod === "bank" && (
                <p className="payment-option__desc">
                  Make your payment directly into our bank account. Please use
                  your Order ID as the payment reference. Your order will not be
                  shipped until the funds have cleared in our account.
                </p>
              )}

              <label className="payment-option payment-option--muted">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank-alt"
                  checked={paymentMethod === "bank-alt"}
                  onChange={() => setPaymentMethod("bank-alt")}
                />
                <span className="payment-option__title">
                  Direct Bank Transfer
                </span>
              </label>

              <label className="payment-option payment-option--muted">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <span className="payment-option__title">Cash On Delivery</span>
              </label>
            </div>

            <p className="privacy-note">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our <strong>privacy policy</strong>.
            </p>

            <div className="place-order-wrapper">
              <button
                type="submit"
                className="place-order-btn"
                disabled={paymentSuccess}
              >
                Place order
              </button>
            </div>

            {paymentSuccess && (
              <p className="payment-success-msg" role="status">
                გადახდა შესრულდა წარმატებით
              </p>
            )}
          </aside>
        </form>
      </section>

      {/* უპირატესობების ზოლი */}
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

export default CheckoutPage;