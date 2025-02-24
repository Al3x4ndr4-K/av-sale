import './App.css';
import { Header } from './components/Header/Header.jsx';
import Filters from './components/Filters/Filters.jsx';
import Tabs from './components/Tabs/Tabs.jsx';
import Card from './components/Card/Card.jsx';

function App() {
  return (
    <>
      <Header />
      <div className="wrapper">
        <Filters />
        <section className="content">
          <Tabs />
          <Card />
        </section>
      </div>
    </>
  );
}

export default App;
