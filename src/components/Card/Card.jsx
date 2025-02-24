import cardStyle from './Card.module.scss';

export default function Card() {
  return (
    <>
      <div className={cardStyle.card}>
        <div className={cardStyle.priceAndLogo}>
          <span>13 400 P</span>
          <img src="/assets/S7%20Logo.svg" alt="logo" />
        </div>
        <div className={cardStyle.description}>
          <span>Mow-Hkt</span>
          <span>В пути</span>
          <span>2 пересадки</span>
        </div>
        <div className={cardStyle.time}>
          <span>10:45-8:00</span>
          <span>21ч 15м</span>
          <span>HKG,JNB</span>
        </div>
        <div className={cardStyle.description}>
          <span>Mow-Hkt</span>
          <span>В пути</span>
          <span>1 пересадка</span>
        </div>
        <div className={cardStyle.time}>
          <span>11:20-00:50</span>
          <span>13ч 30м</span>
          <span>HKG</span>
        </div>
      </div>
    </>
  );
}
