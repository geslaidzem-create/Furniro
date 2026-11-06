import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* მარცხენა მხარე: ლოგო და მისამართი */}
        <div className="footer-col-info">
          <h2>Funiro.</h2>
          <p>
            400 University Drive Suite 200 Coral Gables, <br />
            FL 33134 USA
          </p>
        </div>

        {/* Links სვეტი */}
        <div className="footer-col">
          <h3>Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

       
        <div className="footer-col">
          <h3>Help</h3>
          <ul>
            <li><a href="#">Payment Options</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Privacy Policies</a></li>
          </ul>
        </div>

        {/* Newsletter სვეტი */}
        <div className="footer-col newsletter">
          <h3>Newsletter</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter Your Email Address" />
            <button type="submit">SUBSCRIBE</button>
          </form>
        </div>
      </div>

      {/* ქვედა ზოლი (Copyright) */}
      <div className="footer-bottom">
        <p>2023 furino. All rights reverved</p>
      </div>
    </footer>
  );
}

export default Footer;