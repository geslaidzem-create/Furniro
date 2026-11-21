import { useState } from "react";
import Header from "./layout components/Header";
import "./App.css";
import Footer from "./layout components/Footer";
import "./layout components/Footer.scss";
import HomePage from "./layout components/pages/homepage/HomePage";
import ShopPage from "./assets/components/ShopPage";
import CartPage from "./assets/components/CartPage";
import AboutPage from "./assets/components/AboutPage";
import ContactPage from "./assets/components/ContactPage";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [cartItems, setCartItems] = useState([]);

  return (
    <>
      <Header onNavigate={setActivePage} />

      {activePage === "home" && <HomePage />}

      {activePage === "shop" && (
        <ShopPage onNavigateHome={() => setActivePage("home")} />
      )}

      {activePage === "cart" && (
        <CartPage
          onNavigateHome={() => setActivePage("home")}
          onNavigateShop={() => setActivePage("shop")}
        />
      )}

      {activePage === "about" && (
        <AboutPage
          onNavigateHome={() => setActivePage("home")}
          onNavigateShop={() => setActivePage("shop")}
        />
      )}

      {activePage === "contact" && (
        <ContactPage onNavigateHome={() => setActivePage("home")} />
      )}

      <Footer />
    </>
  );
}

export default App;