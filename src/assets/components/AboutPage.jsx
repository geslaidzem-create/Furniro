import bannerImg from "../shop-banner.jpg";
import "./AboutPage.scss";

const STATS = [
  { value: "10+", label: "Years of Craftsmanship" },
  { value: "25k+", label: "Happy Homes Furnished" },
  { value: "100%", label: "Selected Solid Materials" },
  { value: "24/7", label: "Customer Care Support" },
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

function AboutPage({ onNavigateHome, onNavigateShop }) {
  return (
    <main className="about-page">
      <section
        className="about-banner"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="about-banner__overlay">
          <h1>About</h1>
          <p className="breadcrumb">
            <button
              type="button"
              className="breadcrumb__link"
              onClick={onNavigateHome}
            >
              Home
            </button>
            <span>&gt;</span>
            <span className="breadcrumb__current">About</span>
          </p>
        </div>
      </section>

      <section className="about-story">
        <div className="about-story__content">
          <span className="about-kicker">Our Story</span>
          <h2>Timeless Furniture Crafted For Modern Living</h2>
          <p>
            Furniro creates refined, functional furniture designed to bring
            warmth and balance into everyday spaces. From dining tables and
            sofas to bedroom essentials, every piece combines clean silhouettes
            with durable materials.
          </p>
          <p>
            We partner with skilled makers and focus on thoughtful proportions,
            comfortable finishes, and reliable service from selection to
            delivery.
          </p>
          {typeof onNavigateShop === "function" && (
            <button
              type="button"
              className="about-cta-btn"
              onClick={onNavigateShop}
            >
              Explore Shop
            </button>
          )}
        </div>

        <div className="about-stats">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-card">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
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

export default AboutPage;