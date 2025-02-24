import style from './Filters.module.scss';

export default function Filters() {
  return (
    <aside className={style.filters}>
      <h5>Количество пересадок</h5>
      <ul className={style.checkboxContainer}>
        <li>
          <label className={style.customCheckbox}>
            <input type="checkbox" />
            <span className={style.checkmark}></span>
            Все
          </label>
        </li>
        <li>
          <label className={style.customCheckbox}>
            <input type="checkbox" />
            <span className={style.checkmark}></span>
            Без пересадок
          </label>
        </li>
        <li>
          <label className={style.customCheckbox}>
            <input type="checkbox" />
            <span className={style.checkmark}></span>1 пересадка
          </label>
        </li>
        <li>
          <label className={style.customCheckbox}>
            <input type="checkbox" />
            <span className={style.checkmark}></span>2 пересадки
          </label>
        </li>
        <li>
          <label className={style.customCheckbox}>
            <input type="checkbox" />
            <span className={style.checkmark}></span>3 пересадки
          </label>
        </li>
      </ul>
    </aside>
  );
}
