import './productCard.scss';
import productimg from '../../assets/images/productcardimg.png';

function ProductCard() {
    return (
        <>
            <div className="productCard" tabIndex={0}>

                <img
                    src={productimg}
                    className="productCard-img"
                    alt="Syltherine"
                />

                <div className="productCard-info-block">
                    <h2 className="product-title">Syltherine</h2>
                    <p className="productCard-description">
                        Stylish cafe chair
                    </p>
                    <p className="productCard-price">
                        55₾ <span>75₾</span>
                    </p>
                </div>

                {/* PRODUCT CARD OVERLAY */}

                <div className="productCard-overlay">

                    <button
                        type="button"
                        className="productCard-overlay-button"
                    >
                        Add to cart
                    </button>

                    <div className="productCard-overlay-actions">

                        {/* SHARE */}

                        <button type="button" className="overlay-action">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <circle cx="18" cy="5" r="3" />
                                <circle cx="6" cy="12" r="3" />
                                <circle cx="18" cy="19" r="3" />
                                <path d="m8.7 13.5 6.6 4" />
                                <path d="m15.3 6.5-6.6 4" />
                            </svg>
                            <span>Share</span>
                        </button>

                        {/* COMPARE */}

                        <button type="button" className="overlay-action">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M16 3l4 4-4 4" />
                                <path d="M20 7H4" />
                                <path d="M8 21l-4-4 4-4" />
                                <path d="M4 17h16" />
                            </svg>
                            <span>Compare</span>
                        </button>

                        {/* LIKE */}

                        <button type="button" className="overlay-action">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
                            </svg>
                            <span>Like</span>
                        </button>

                    </div>

                </div>

            </div>
        </>
    );
}

export default ProductCard;