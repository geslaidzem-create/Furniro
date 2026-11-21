import { useState } from "react";
import bannerImg from "../shop-banner.jpg";
import "./ContactPage.scss";

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

function ContactPage({ onNavigateHome }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitted) setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="contact-page">
      <section
        className="contact-banner"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="contact-banner__overlay">
          <h1>Contact</h1>
          <p className="breadcrumb">
            <button
              type="button"
              className="breadcrumb__link"
              onClick={onNavigateHome}
            >
              Home
            </button>
            <span>&gt;</span>
            <span className="breadcrumb__current">Contact</span>
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-header">
          <h2>Get In Touch With Us</h2>
          <p>
            For More Information About Our Product &amp; Services. Please Feel
            Free To Drop Us An Email. Our Staff Always Be There To Help You Out.
            Do Not Hesitate!
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-item">
              <span className="info-item__icon" aria-hidden="true">
                📍
              </span>
              <div>
                <h3>Address</h3>
                <p>236 5th SE Avenue, New York NY10000, United States</p>
              </div>
            </div>

            <div className="info-item">
              <span className="info-item__icon" aria-hidden="true">
                📞
              </span>
              <div>
                <h3>Phone</h3>
                <p>Mobile: +(84) 546-6789</p>
                <p>Hotline: +(84) 456-6789</p>
              </div>
            </div>

            <div className="info-item">
              <span className="info-item__icon" aria-hidden="true">
                🕒
              </span>
              <div>
                <h3>Working Time</h3>
                <p>Monday–Friday: 9:00 - 22:00</p>
                <p>Saturday–Sunday: 9:00 - 21:00</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="contact-name">Your name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Abc"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-email">Email address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="Abc@def.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="This is an optional"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows="4"
                placeholder="Hi! i'd like to ask about"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="contact-submit-btn">
              Submit
            </button>

            {submitted && (
              <p className="contact-success" role="status">
                Thank you! Your message has been sent.
              </p>
            )}
          </form>
        </div>
      </section>

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

export default ContactPage;