import Image from "next/image";
import Isotype from "../Isotype";

type Props = {
  product: {
    photo: string;      // absolute path (e.g. /products/campera.jpg)
    photoAlt: string;
    price: string;
    name: string;
    distance: string;   // e.g. "4 cuadras"
    agoLabel: string;   // e.g. "hace 2 h"
    seller: {
      initial: string;
      name: string;
      rating: string;   // "★ 4.8 (43)"
    };
  };
};

export default function FeedScreen({ product }: Props) {
  return (
    <div className="phone-ui phone-ui--feed">
      {/* iOS status bar */}
      <div className="phone-status">
        <span>9:41</span>
        <span className="phone-status-right">
          <span className="sig">●●●●</span>
          <span className="wifi">●</span>
          <span className="battery">100%</span>
        </span>
      </div>

      {/* Header */}
      <div className="phone-feed-header">
        <div className="brand-mark">
          <Isotype size={32} />
          <span className="brand-name">MeTo</span>
        </div>
        <p className="greeting">Hola Nico. Esto está a la vuelta tuya.</p>
        <div className="search-row">
          <span className="search-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Radio de búsqueda
          </span>
          <span className="radius-chip">10 cuadras</span>
        </div>
        <div className="slider">
          <div className="slider-track" />
          <div className="slider-fill" />
          <div className="slider-thumb" />
        </div>
      </div>

      {/* Product card */}
      <article className="feed-card">
        <header className="feed-card-top">
          <span className="seller">
            <span className="seller-avatar">{product.seller.initial}</span>
            <span className="seller-info">
              <span className="seller-name">{product.seller.name}</span>
              <span className="seller-rating">{product.seller.rating}</span>
            </span>
          </span>
          <span className="now-chip">
            <span className="now-dot" />
            AHORA
          </span>
        </header>

        <div className="feed-photo">
          <Image
            src={product.photo}
            alt={product.photoAlt}
            fill
            sizes="300px"
            className="object-cover"
          />
        </div>

        <footer className="feed-card-bottom">
          <p className="price">{product.price}</p>
          <p className="product-name">{product.name}</p>
          <div className="pills">
            <span className="pill">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {product.distance}
            </span>
            <span className="pill">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              {product.agoLabel}
            </span>
          </div>
        </footer>
      </article>

      {/* Action buttons */}
      <div className="feed-actions">
        <button className="action action--pass" aria-label="Pasar">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        <button className="action action--like" aria-label="Me gusta">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Bottom nav */}
      <nav className="feed-tabbar" aria-hidden>
        <span className="tab">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#7038FF" stroke="#7038FF" strokeWidth="1.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z" />
          </svg>
        </span>
        <span className="tab">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B8B5C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </span>
        <span className="tab tab--main">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        </span>
        <span className="tab">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B8B5C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </span>
        <span className="tab">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B8B5C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </span>
      </nav>
    </div>
  );
}
