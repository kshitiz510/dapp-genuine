import React, { useContext, useState } from 'react';
import { Web3Context } from '../context/Web3Context';

const RegisterProduct = () => {
  const { web3, contract, accounts } = useContext(Web3Context);
  const [productName, setProductName] = useState('');
  const [message, setMessage] = useState('');

  const registerProduct = async () => {
    if (contract) {
      try {
        await contract.methods.registerProduct(productName).send({ from: accounts[0] });
        setMessage('Product registered successfully!');
      } catch (error) {
        console.error('Error registering product:', error);
        setMessage('Error registering product.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Register Product</h2>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Product Name"
        className="border p-2 mb-4 w-full"
      />
      <button
        onClick={registerProduct}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg"
      >
        Register
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default RegisterProduct;