import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./component/Content/Home";
import Navbar from "./component/Heading/Navbar";
import Search from "./component/Heading/Search";
import Product from "./component/Content/Product";
import Contact from "./component/Contact/Contact";
import Modal from "./component/Heading/Modal";
import Login from "./component/Heading/Login";

function App() {
  return (
    <>
      <div className="app">
        <div className="wrapHeading">
          <Navbar></Navbar>
          <Search></Search>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/login" element={<Modal />} />
          <Route path="/sigin" element={<Login />} />
        </Routes>
        <Contact />
      </div>
      

    </>
  );
}

export default App;
