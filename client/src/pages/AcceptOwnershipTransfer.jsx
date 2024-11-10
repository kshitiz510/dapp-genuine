import React, { useContext, useState } from 'react';
import { Web3Context } from '../context/Web3Context';

const AcceptOwnershipTransfer = () => {
  const { web3, contract, accounts } = useContext(Web3Context);
  const [productId, setProductId] = useState('');
  const [message, setMessage] = useState('');

  const acceptOwnershipTransfer = async () => {
    if (contract) {
      try {
        const transferPrice = await contract.methods.pendingTransfers(productId, accounts[0]).call();
        await contract.methods.acceptOwnershipTransfer(productId).send({ from: accounts[0], value: transferPrice });
        setMessage('Ownership transfer accepted successfully!');
      } catch (error) {
        console.error('Error accepting ownership transfer:', error);
        setMessage('Error accepting ownership transfer.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Accept Ownership Transfer</h2>
      <input
        type="text"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Product ID"
        className="border p-2 mb-4 w-full"
      />
      <button
        onClick={acceptOwnershipTransfer}
        className="bg-green-500 text-white py-2 px-4 rounded-lg"
      >
        Accept Transfer
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default AcceptOwnershipTransfer;