import logo from "../assets/Furniro_Logos-05.svg";
import profile from "../assets/profile.svg";
import cart from "../assets/shopping-cart.svg";
import search from "../assets/search.svg";
import heart from "../assets/heart.svg";
import "./Header.scss"
function Header() {
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

            </div>
        </header>
        </>
    )
}
export default Header;