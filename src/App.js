import { Outlet, Link } from "react-router-dom";
import CurrencyList from "./CurrencyList";
import Converter from "./Converter";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/list'>List</Link>
          </li>
          <li>
            <Link to='/converter'>Converter</Link>
          </li>
        </ul>
      </nav>
      <Outlet/>
    </>
  );
}

export default App;
