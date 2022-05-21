import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./component/Content/Home";
import Navbar from "./component/Heading/Navbar";
import Search from "./component/Heading/Search";
import Product from "./component/Content/Product";
import Contact from "./component/Contact/Contact";
import Modal from "./component/Heading/Modal";
import Login from "./component/Heading/Login";
import Blog from "./component/Content/Blog";
import Cart from "./component/Content/Cart"
import PageUser from "./component/Content/PageUser"
import Chat from "./component/Content/Chat";


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
          <Route path="/blog" element={<Blog />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/userInfor" element={<PageUser/>} />
          <Route path="/chat" element={<Chat/>}/>
        </Routes>
        <Contact />
      </div>
      

    </>
  );
}

export default App;
