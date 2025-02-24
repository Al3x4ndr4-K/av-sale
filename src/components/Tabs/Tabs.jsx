import style from './Tabs.module.scss';

export default function Tabs() {
  return (
    <>
      <div className={style.tabsRow}>
        <button className={style.tab}>Самый дешёвый</button>
        <button className={style.tab}>Самый быстрый</button>
        <button className={style.tab}>Оптимальный</button>
      </div>
    </>
  );
}
