import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/Home";
import RegisterProduct from "./pages/RegisterProduct";
import RegisterManufacturer from "./pages/RegisterManufacturer";
import VerifyAuthenticity from "./pages/VerifyAuthenticity";
import RequestOwnershipTransfer from "./pages/RequestOwnershipTransfer";
import AcceptOwnershipTransfer from "./pages/AcceptOwnershipTransfer";
import { Web3Provider } from "./context/Web3Context";

function App() {
  return (
    <Web3Provider>
      <Router>
        <Header />
        <div className="pt-36 p-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterManufacturer />} />
            <Route path="/authenticate" element={<VerifyAuthenticity />} />
            <Route
              path="/request-transfer"
              element={<RequestOwnershipTransfer />}
            />
            <Route
              path="/accept-transfer"
              element={<AcceptOwnershipTransfer />}
            />
          </Routes>
        </div>
      </Router>
    </Web3Provider>
  );
}

export default App;
