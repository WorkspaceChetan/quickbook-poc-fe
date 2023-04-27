import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./Navbar/MainMenu";
import Home from "./Pages/Home/Index";
import AccountType from "./Pages/AccountType";
import VendorType from "./Pages/VendorType";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { SimpleData } from "./simpleData";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<AccountType />} />
          <Route path="/vendor" element={<VendorType />} />
        </Routes>
      </Router>
      {/* <SimpleData /> */}
    </div>
  );
}

export default App;
