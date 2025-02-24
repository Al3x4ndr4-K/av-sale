import './App.css';
import { Header } from './components/Header/Header.jsx';
import { useState } from 'react';
import Filters from './components/Filters/Filters.jsx';
import Tabs from './components/Tabs/Tabs.jsx';
import Card from './components/Card/Card.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Filters />
      <Tabs />
      <Card />
    </>
  );
}

export default App;
