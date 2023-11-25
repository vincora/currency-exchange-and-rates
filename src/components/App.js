import { Outlet, Link } from "react-router-dom";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.container}>
      <nav>
        <ul className={styles.nav}>
          <li>
            <Link to="/converter">Converter</Link>
          </li>
          <li>
            <Link to="/list">Exchange rates</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
