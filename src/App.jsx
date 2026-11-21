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
import SingleProductPage from "./assets/components/SingleProductPage";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setActivePage("single-product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = (product) => {
    if (!product) return;

    const addedQty = Math.max(1, Number(product.quantity) || 1);
    const normalizedId =
      product.id ?? product.product_id ?? product.name ?? product.title;
    const normalizedName = product.name || product.title || "Product";

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => {
        const prevId = item.id ?? item.product_id ?? item.name ?? item.title;
        return (
          prevId === normalizedId &&
          (item.size || "") === (product.size || "") &&
          (item.color || "") === (product.color || "")
        );
      });

      if (existingIndex > -1) {
        return prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: (item.quantity || 1) + addedQty }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          id: normalizedId,
          name: normalizedName,
          price: Number(product.price) || 0,
          quantity: addedQty,
        },
      ];
    });
  };

  return (
    <>
      <Header onNavigate={setActivePage} />

      {activePage === "home" && (
        <HomePage
          onSelectProduct={handleSelectProduct}
          onAddToCart={handleAddToCart}
        />
      )}

      {activePage === "shop" && (
        <ShopPage
          onNavigateHome={() => setActivePage("home")}
          onSelectProduct={handleSelectProduct}
          onAddToCart={handleAddToCart}
        />
      )}

      {activePage === "single-product" && (
        <SingleProductPage
          product={selectedProduct}
          onNavigateHome={() => setActivePage("home")}
          onNavigateShop={() => setActivePage("shop")}
          onAddToCart={handleAddToCart}
        />
      )}

      {activePage === "cart" && (
        <CartPage
          items={cartItems}
          setItems={setCartItems}
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