import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Web3Context } from "../context/Web3Context";
import WalletInfoModal from "./WalletInfoModal";

const NavLinks = () => (
  <nav className="flex space-x-4">
    <Link to="/register" className="no-underline">
      Register
    </Link>
    <Link to="/authenticate" className="no-underline">
      Authenticate
    </Link>
  </nav>
);

const Header = () => {
  const { account, provider, connectWallet, address, pubKey } = useContext(Web3Context);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConnectWallet = async () => {
    await connectWallet();
    if (account) {
      setIsModalOpen(true);
    }
  };

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-1/3 bg-[#4b4c4e] text-white p-4 shadow-lg z-50 rounded-lg">
      <div className="flex justify-between items-center font-bold">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2 no-underline">
            <img src="/logo.png" alt="Luxury Auth Logo" className="h-8" />
            <span className="text-xl">Genuine</span>
          </Link>
        </div>
        <div className="h-8 border-l-2 border-black mx-4"></div>
        <nav>
          <NavLinks />
        </nav>
        <button
            onClick={handleConnectWallet}
            className={`py-2 px-4 rounded-lg ${
              account ? 'bg-[#ff3979]' : 'bg-[#ff3979]'
            } text-white`}
          >
            {account ? 'Connected' : 'Connect'}
          </button>
        {/* {provider && !account && (
          <div style={{ background: '#3B48DF', padding: '5px', borderRadius: '5px', marginLeft: '10px' }}>
            <b>Provider Detected</b>
          </div>
        )} */}
        {isModalOpen && (
          <WalletInfoModal
            address={address}
            pubKey={pubKey}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;