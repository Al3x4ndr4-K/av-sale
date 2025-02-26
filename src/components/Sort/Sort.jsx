import style from './Sort.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../../store/sort/sort.slice.js';

export default function Sort() {
  const sort = useSelector((state) => state.sort.sort);
  const dispatch = useDispatch();

  const handleSortChange = (type) => {
    dispatch(setSort(type));
  };

  return (
    <div className={style.tabsRow}>
      <button
        className={`${style.tab} ${sort === 'cheapest' ? style.active : ''}`}
        onClick={() => handleSortChange('cheapest')}
      >
        Самый дешёвый
      </button>
      <button
        className={`${style.tab} ${sort === 'fastest' ? style.active : ''}`}
        onClick={() => handleSortChange('fastest')}
      >
        Самый быстрый
      </button>
      <button
        className={`${style.tab} ${sort === 'optimal' ? style.active : ''}`}
        onClick={() => handleSortChange('optimal')}
      >
        Оптимальный
      </button>
    </div>
  );
}
