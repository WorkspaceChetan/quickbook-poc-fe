import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./Navbar/MainMenu";
import Home from "./Pages/Home/Index";
import AccountType from "./Pages/AccountType";
import VendorType from "./Pages/VendorType";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./component/ProtectedRoute";
import UnauthorizedRoute from "./component/UnauthorizedRoute";
import Handletoken from "./Pages/handletoken";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <UnauthorizedRoute>
                <Home />
              </UnauthorizedRoute>
            }
          />
          <Route path="/handletoken" element={<Handletoken />} />

          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountType />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendor"
            element={
              <ProtectedRoute>
                <VendorType />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
