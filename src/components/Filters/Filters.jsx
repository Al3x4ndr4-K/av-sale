import style from './Filters.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFilter } from '../../store/filters/filters.slice.js';

export default function Filters() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters.filters);

  const handleToggle = (filterName) => {
    dispatch(toggleFilter(filterName));
  };

  return (
    <aside className={style.filters}>
      <h5>Количество пересадок</h5>
      <ul className={style.checkboxContainer}>
        <li>
          <label className={style.customCheckbox}>
            <input type="checkbox" checked={filters.all} onChange={() => handleToggle('all')} />
            <span className={style.checkmark}></span>
            Все
          </label>
        </li>
        <li>
          <label className={style.customCheckbox}>
            <input type="checkbox" checked={filters.noTransfers} onChange={() => handleToggle('noTransfers')} />
            <span className={style.checkmark}></span>
            Без пересадок
          </label>
        </li>
        <li>
          <label className={style.customCheckbox}>
            <input type="checkbox" checked={filters.oneTransfer} onChange={() => handleToggle('oneTransfer')} />
            <span className={style.checkmark}></span>1 пересадка
          </label>
        </li>
        <li>
          <label className={style.customCheckbox}>
            <input type="checkbox" checked={filters.twoTransfers} onChange={() => handleToggle('twoTransfers')} />
            <span className={style.checkmark}></span>2 пересадки
          </label>
        </li>
        <li>
          <label className={style.customCheckbox}>
            <input type="checkbox" checked={filters.threeTransfers} onChange={() => handleToggle('threeTransfers')} />
            <span className={style.checkmark}></span>3 пересадки
          </label>
        </li>
      </ul>
    </aside>
  );
}
