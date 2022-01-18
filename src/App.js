import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

const Home = () => {
  return <div></div>;
};

const Layout = () => {
  return (
    <div class="layout">
      <header></header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
