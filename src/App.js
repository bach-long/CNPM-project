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
import Cart from "./component/Content/Cart";
import PageUser from "./component/Content/PageUser";
import Chat from "./component/Content/Chat";
import PageSearch from "./component/Content/PageSearch";
import Success from "./component/Content/Success";
import GoodBuys from "./component/Content/GoodBuys";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          <Route path="/cart" element={<Cart />} />
          <Route path="/userInfor" element={<PageUser />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/search" element={<PageSearch />} />
          <Route path="/success" element={<Success />} />
          <Route path="/goodBuys" element={<GoodBuys />} />
        </Routes>
        <Contact />
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
