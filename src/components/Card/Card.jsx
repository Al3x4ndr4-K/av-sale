import cardStyle from './Card.module.scss';
import { calculateArrivalTime, formatDuration, formatTime } from '../../utils/format/dateUtil.js';
import { formatPrice } from '../../utils/format/priceUtil.js';
import { formatStops } from '../../utils/format/formatUtil.js';

export default function Card({ ticket }) {
  const {
    price,
    carrier,
    segments: [forwardSegment, returnSegment],
  } = ticket;

  const logoUrl = `https://pics.avs.io/99/36/${carrier}.png`;
  const noLogo = `https://dummyimage.com/99x36/ffffff/000000.png&text=No+logo`;

  return (
    <div className={cardStyle.card}>
      <div className={cardStyle.priceAndLogo}>
        <span>{formatPrice(price)}</span>
        <img
          src={logoUrl}
          alt={`${carrier} logo`}
          onError={(e) => {
            e.target.src = { noLogo };
          }}
        />
      </div>
      <div className={cardStyle.infoWrapper}>
        <div className={cardStyle.from}>
          <span className={cardStyle.grayLine}>
            {forwardSegment.origin} - {forwardSegment.destination}
          </span>
          <span>
            {formatTime(forwardSegment.date)} – {calculateArrivalTime(forwardSegment.date, forwardSegment.duration)}
          </span>
        </div>
        <div className={cardStyle.time}>
          <span className={cardStyle.grayLine}>В пути</span>
          <span>{formatDuration(forwardSegment.duration)}</span>
        </div>
        <div className={cardStyle.transfer}>
          {(() => {
            const { stopsCount, stopsCodes } = formatStops(forwardSegment.stops);
            return (
              <>
                <span className={cardStyle.grayLine}>{stopsCount}</span>
                {stopsCodes && <span>{stopsCodes}</span>}
              </>
            );
          })()}
        </div>
      </div>
      <div className={cardStyle.infoWrapper}>
        <div className={cardStyle.from}>
          <span className={cardStyle.grayLine}>
            {returnSegment.origin} - {returnSegment.destination}
          </span>
          <span>
            {formatTime(returnSegment.date)} – {calculateArrivalTime(returnSegment.date, returnSegment.duration)}
          </span>
        </div>
        <div className={cardStyle.time}>
          <span className={cardStyle.grayLine}>В пути</span>
          <span>{formatDuration(returnSegment.duration)}</span>
        </div>
        <div className={cardStyle.transfer}>
          {(() => {
            const { stopsCount, stopsCodes } = formatStops(returnSegment.stops);
            return (
              <>
                <span className={cardStyle.grayLine}>{stopsCount}</span>
                {stopsCodes && <span>{stopsCodes}</span>}
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
