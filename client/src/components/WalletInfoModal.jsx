import React, { useState, useEffect } from "react";

const WalletInfoModal = ({ address, pubKey, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Match this duration with the Tailwind transition duration
  };

  return (
    <div
      className={`fixed mt-10 inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-black p-6 rounded-lg shadow-lg transform transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-90"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Wallet Information</h2>
        <p>
          <b>Address:</b> {address}
        </p>
        <p>
          <b>Public Key:</b> {pubKey}
        </p>
        <button
          onClick={handleClose}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WalletInfoModal;
