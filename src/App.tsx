import './App.css'

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  NavLink
} from "react-router-dom";

const Other = () => (
  <Layout>
    <NavLink to="/">Home</NavLink>
    <h1>AnotherPage!</h1>
  </Layout>
);

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

const Home = () => (
  <Layout>
    <ul>
      <li><NavLink to = "/other" className={"header-link"}>Other</NavLink></li>
    </ul>
    <main>
      <h1>Vahin's Website</h1>
      <p>Hi, I'm Vahin, a 17 year old software developer with delusions of grandeur</p>
    </main>
  </Layout>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/other" element={<Other />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
