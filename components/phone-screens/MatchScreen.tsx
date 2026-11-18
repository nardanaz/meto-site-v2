import Image from "next/image";
import Isotype from "../Isotype";

type Props = {
  product: {
    photo: string;
    photoAlt: string;
    name: string;
    distance: string; // "4 cuadras"
  };
};

export default function MatchScreen({ product }: Props) {
  return (
    <div className="phone-ui phone-ui--match">
      <div className="phone-status phone-status--light">
        <span>9:41</span>
        <span className="phone-status-right">
          <span className="sig">●●●●</span>
          <span className="wifi">●</span>
          <span className="battery">100%</span>
        </span>
      </div>

      <div className="match-inner">
        <div className="match-isotype">
          <Isotype size={82} />
        </div>

        <h3 className="match-title">Match.</h3>
        <p className="match-sub">
          Está a {product.distance} tuyas.<br />Coordiná y cerrá hoy.
        </p>

        <div className="match-thumb">
          <Image
            src={product.photo}
            alt={product.photoAlt}
            fill
            sizes="200px"
            className="object-cover"
          />
          <span className="match-thumb-name">{product.name}</span>
        </div>

        <button className="match-cta">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          Mandar mensaje
        </button>

        <a className="match-link" href="#">Seguir mirando</a>
      </div>
    </div>
  );
}
