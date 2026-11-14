import HeroSection from './HeroSection/HeroSection';
import CategorySection from './CategorySection/CategorySection';
import OurProducts from './OurProductsSection/OurProducts';

function HomePage() {
    return (
        <main>
            <HeroSection />
            <CategorySection />
            <OurProducts />
        </main>
    );
}

export default HomePage;