import style from './Header.module.scss';

export function Header() {
  return (
    <header className={style.header}>
      <img src="/assets/Logo.svg" alt="logo" />
    </header>
  );
}
