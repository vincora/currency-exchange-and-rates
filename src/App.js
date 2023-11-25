import {Routes, Route, Link} from 'react-router-dom';
import CurrencyList from "./CurrencyList";
import Converter from './Converter';

function App() {
  return (
    <>
    <nav>
      <ul>
        <li><Link to='/'>List</Link></li>
        <li><Link to='/converter'>Converter</Link></li>
      </ul>
    </nav>
    <Routes>
      <Route path="/" element={<CurrencyList />}/>
      <Route path="/converter" element={<Converter/>}/>
    </Routes>
    </>
    
  );
}

export default App;
