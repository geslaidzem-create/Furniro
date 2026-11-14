import logo from "../assets/Furniro_Logos-05.svg";
import profile from "../assets/profile.svg";
import cart from "../assets/shopping-cart.svg";
import search from "../assets/search.svg";
import heart from "../assets/heart.svg";
import "./Header.scss"
function Header() {
     const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (!isMenuOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
            }
        };

        const handleResize = () => {
            if (window.innerWidth > 900) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener("keydown", handleEscape);
        window.addEventListener("resize", handleResize);
        
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleEscape);
            window.removeEventListener("resize", handleResize);
        };
    }, [isMenuOpen]);

    return (
        <>
    return(
        <>
        <header className="header">
            <div className="logo">
                <img src={logo}/>
                <h1>Furniro</h1>
            </div>
            <nav className="menu">
                <ul>
                    <li>Home</li>
                    <li>Shop</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </nav>
            <div className="header-action-block">
                <img src={profile} alt="Profile" />
                    <img src={search} alt="Search" />
                    <img src={heart} alt="Wishlist" />
                    <img src={cart} alt="Cart" />
                     <button
                        type="button"
                        className="burger-toggle"
                        onClick={() => setIsMenuOpen(true)}
                        aria-label="Open menu"
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        <img src={burger} alt="" />
                    </button>
            </div>
        </header>
         {/* MOBILE MENU */}

            {isMenuOpen && (
                <div
                    id="mobile-menu"
                    className="mobile-menu-overlay"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Mobile menu"
                >
                    <div className="mobile-menu-header">
                        <div className="logo">
                            <img src={logo} alt="Furniro Logo" />
                            <h1>Furniro</h1>
                        </div>

                        <button
                            type="button"
                            className="mobile-menu-close"
                            onClick={() => setIsMenuOpen(false)}
                            aria-label="Close menu"
                            autoFocus
                        >
                            &times;
                        </button>
                    </div>

                    <div className="mobile-menu-body">
                        <nav className="mobile-menu-nav">
                            <ul>
                                <li>
                                    <a href="/">HOME</a>
                                </li>
                                <li>
                                    <a href="/shop">SHOP</a>
                                </li>
                                <li>
                                    <a href="/about">ABOUT</a>
                                </li>
                                <li>
                                    <a href="/contact">CONTACT</a>
                                </li>
                            </ul>
                        </nav>

                        <div className="mobile-menu-actions">
                            <a href="/profile">
                                <img src={profile} alt="" />
                                <span>PROFILE</span>
                            </a>

                            <a href="/search">
                                <img src={search} alt="" />
                                <span>SEARCH</span>
                            </a>

                            <a href="/wishlist">
                                <img src={heart} alt="" />
                                <span>WISHLIST</span>
                            </a>

                            <a href="/cart">
                                <img src={cart} alt="" />
                                <span>CART</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default Header;