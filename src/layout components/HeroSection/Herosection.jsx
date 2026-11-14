import heroBanner from '../../../assets/images/hero-banner.jpg';
import './HeroSection.scss';

function HeroSection() {
    return (
        <section className="hero-section">

            <img
                src={heroBanner}
                alt=""
                className="hero-section__background"
                fetchPriority="high"
            />

            <div className="hero-section__content">

                <span className="hero-section__subtitle">
                    New Arrival
                </span>

                <h2 className="hero-section__title">
                    Discover Our <br />
                    New Collection
                </h2>

                <p className="hero-section__description">
                    Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Ut elit tellus, luctus
                    nec ullamcorper mattis.
                </p>

                <a href="/shop" className="hero-section__button">
                    BUY NOW
                </a>

            </div>

        </section>
    );
}

export default HeroSection;