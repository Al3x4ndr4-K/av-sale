import cardStyle from './Card.module.scss';

export default function Card() {
  return (
    <>
      <div className={cardStyle.card}>
        <div className={cardStyle.priceAndLogo}>
          <span>13 400 P</span>
          <img src="/assets/S7%20Logo.svg" alt="logo" />
        </div>
        <div className={cardStyle.infoWrapper}>
          <div className={cardStyle.from}>
            <span className={cardStyle.grayLine}>Mow - Hkt</span>
            <span>10:45 - 8:00</span>
          </div>
          <div className={cardStyle.time}>
            <span className={cardStyle.grayLine}>В пути</span>
            <span>21ч 15м</span>
          </div>
          <div className={cardStyle.transfer}>
            <span className={cardStyle.grayLine}>2 пересадки</span>
            <span>HKG, JNB</span>
          </div>
        </div>
        <div className={cardStyle.infoWrapper}>
          <div className={cardStyle.from}>
            <span className={cardStyle.grayLine}>Mow - Hkt</span>
            <span>11:20 - 00:50</span>
          </div>
          <div className={cardStyle.time}>
            <span className={cardStyle.grayLine}>В пути</span>
            <span>13ч 30м</span>
          </div>
          <div className={cardStyle.transfer}>
            <span className={cardStyle.grayLine}>1 пересадка</span>
            <span>HKG</span>
          </div>
        </div>
      </div>
    </>
  );
}
