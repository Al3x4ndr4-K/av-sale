import './App.css';
import { Header } from './components/Header/Header.jsx';
import Filters from './components/Filters/Filters.jsx';
import Sort from './components/Sort/Sort.jsx';
import CardList from './components/CardList/CardList.jsx';

function App() {
  return (
    <>
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
