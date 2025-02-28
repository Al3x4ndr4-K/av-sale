import style from './Filters.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFilter } from '../../store/filters/filters.slice.js';
import { memo } from 'react';

const Filters = memo(function Filters() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters.filters);

  const handleToggle = (filterName) => {
    dispatch(toggleFilter(filterName));
  };

  const handleKeyPress = (event, filterId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle(filterId);
    }
  };

  return (
    <div className={style.filters} role="group" aria-label="Фильтры по количеству пересадок">
      <h5>Количество пересадок</h5>
      <ul className={style.checkboxContainer}>
        <li>
          <label
            className={style.customCheckbox}
            tabIndex="0"
            onKeyDown={(e) => handleKeyPress(e, 'all')}
            role="checkbox"
            aria-checked={filters.all}
          >
            <input type="checkbox" checked={filters.all} onChange={() => handleToggle('all')} />
            <span className={style.checkmark}></span>
            Все
          </label>
        </li>
        <li>
          <label
            className={style.customCheckbox}
            tabIndex="0"
            onKeyDown={(e) => handleKeyPress(e, 'noTransfers')}
            role="checkbox"
            aria-checked={filters.noTransfers}
          >
            <input type="checkbox" checked={filters.noTransfers} onChange={() => handleToggle('noTransfers')} />
            <span className={style.checkmark}></span>
            Без пересадок
          </label>
        </li>
        <li>
          <label
            className={style.customCheckbox}
            tabIndex="0"
            onKeyDown={(e) => handleKeyPress(e, 'oneTransfer')}
            role="checkbox"
            aria-checked={filters.oneTransfer}
          >
            <input type="checkbox" checked={filters.oneTransfer} onChange={() => handleToggle('oneTransfer')} />
            <span className={style.checkmark}></span>1 пересадка
          </label>
        </li>
        <li>
          <label
            className={style.customCheckbox}
            tabIndex="0"
            onKeyDown={(e) => handleKeyPress(e, 'twoTransfers')}
            role="checkbox"
            aria-checked={filters.twoTransfers}
          >
            <input type="checkbox" checked={filters.twoTransfers} onChange={() => handleToggle('twoTransfers')} />
            <span className={style.checkmark}></span>2 пересадки
          </label>
        </li>
        <li>
          <label
            className={style.customCheckbox}
            tabIndex="0"
            onKeyDown={(e) => handleKeyPress(e, 'threeTransfers')}
            role="checkbox"
            aria-checked={filters.threeTransfers}
          >
            <input type="checkbox" checked={filters.threeTransfers} onChange={() => handleToggle('threeTransfers')} />
            <span className={style.checkmark}></span>3 пересадки
          </label>
        </li>
      </ul>
    </div>
  );
});

export default Filters;
