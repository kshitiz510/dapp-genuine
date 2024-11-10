import React, { useContext, useState } from 'react';
import { Web3Context } from '../context/Web3Context';

const RequestOwnershipTransfer = () => {
  const { web3, contract, accounts } = useContext(Web3Context);
  const [productId, setProductId] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const requestOwnershipTransfer = async () => {
    if (contract) {
      try {
        await contract.methods.requestOwnershipTransfer(productId, newOwner, web3.utils.toWei(price, 'ether')).send({ from: accounts[0] });
        setMessage('Ownership transfer requested successfully!');
      } catch (error) {
        console.error('Error requesting ownership transfer:', error);
        setMessage('Error requesting ownership transfer.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Request Ownership Transfer</h2>
      <input
        type="text"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Product ID"
        className="border p-2 mb-4 w-full"
      />
      <input
        type="text"
        value={newOwner}
        onChange={(e) => setNewOwner(e.target.value)}
        placeholder="New Owner Address"
        className="border p-2 mb-4 w-full"
      />
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Transfer Price (in ETH)"
        className="border p-2 mb-4 w-full"
      />
      <button
        onClick={requestOwnershipTransfer}
        className="bg-green-500 text-white py-2 px-4 rounded-lg"
      >
        Request Transfer
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default RequestOwnershipTransfer;