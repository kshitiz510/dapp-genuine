import React, { useContext, useState } from 'react';
import { Web3Context } from '../context/Web3Context';

const VerifyAuthenticity = () => {
  const { web3, contract, accounts } = useContext(Web3Context);
  const [productKey, setProductKey] = useState('');
  const [authResult, setAuthResult] = useState(null);

  const authenticateProduct = async () => {
    if (contract) {
      try {
        const result = await contract.methods.authenticateProduct(productKey).call();
        setAuthResult(result);
      } catch (error) {
        console.error('Error authenticating product:', error);
        setAuthResult('Error authenticating product.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Authenticate Product Key</h2>
      <input
        type="text"
        value={productKey}
        onChange={(e) => setProductKey(e.target.value)}
        placeholder="Product Key"
        className="border p-2 mb-4 w-full"
      />
      <button
        className="bg-[#ace5d7] text-black mt-4 py-2 px-6 rounded-lg font-bold uppercase transform transition-transform duration-200 hover:translate-y-1"
        style={{
          boxShadow: "0 4px #1c3d5a",
        }}
      >
        Authenticate
      </button>
      {authResult !== null && (
        <p className="mt-4">
          Authentication Result: {authResult.toString()}
        </p>
      )}
    </div>
  );
};

export default VerifyAuthenticity;