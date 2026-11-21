import { useEffect, useState } from "react";
import "./ourProducts.scss";
import ProductCard from "../../components/product-card/ProductCard";
import ShowMoreBtn from "../../components/button/ShowMoreBtn";
import bannerImage from "../../assets/images/Images.png";

const DB_URL =
  "https://raw.githubusercontent.com/Ommadure/Furniture-ecommerce/main/data/db.json";

function OurProducts() {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch(DB_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load products");
        }
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        const list = Array.isArray(data) ? data : data.products || [];
        console.log("DB sample product:", list[0]);
        setProducts(list);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <>
      <div className="ourproducts-main">
        <h1 className="ourproducts-heading">Our Products</h1>

        {loading && <p>Loading products...</p>}
        {error && <p>Error: {error}</p>}

        {!loading && !error && (
          <div className="ourproducts-productCard-block">
            {visibleProducts.map((item, index) => (
              <ProductCard key={item.id ?? index} product={item} />
            ))}
          </div>
        )}

        {visibleCount < products.length && (
          <ShowMoreBtn onClick={() => setVisibleCount((prev) => prev + 8)} />
        )}

        <div
          className="banner-container"
          style={{ width: "100%", margin: "20px 0" }}
        >
          <img
            src={bannerImage}
            alt="Funiro Furniture"
            style={{ width: "100%", display: "block" }}
          />
        </div>
      </div>
    </>
  );
}

export default OurProducts;