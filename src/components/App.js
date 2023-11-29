import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div className="container w-3/4 p-4">
      <nav className="mb-6">
        <ul className="flex justify-center gap-4 text-sky-700 text-lg font-medium">
          <li>
            <Link to="/list">Exchange rates</Link>
          </li>
          <li>
            <Link to="/converter">Converter</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
