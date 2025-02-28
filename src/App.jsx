import './App.css';
import { Header } from './components/Header/Header.jsx';
import Filters from './components/Filters/Filters.jsx';
import Sort from './components/Sort/Sort.jsx';
import CardList from './components/CardList/CardList.jsx';
import LoadingProgress from './components/LoadingProgress/LoadingProgress.jsx';
import LoadingNotification from './components/LoadingNotification/LoadingNotification.jsx';

function App() {
  return (
    <>
      <LoadingProgress />
      <LoadingNotification />
      <Header />
      <div className="wrapper">
        <Filters />
        <section className="content">
          <Sort />
          <CardList />
        </section>
      </div>
    </>
  );
}

export default App;
