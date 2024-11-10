import React, { useContext, useState } from "react";
import { Web3Context } from "../context/Web3Context";

const RegisterManufacturer = () => {
  const { web3, contract, accounts } = useContext(Web3Context);
  const [manufacturerAddress, setManufacturerAddress] = useState("");
  const [manufacturerName, setManufacturerName] = useState("");
  const [message, setMessage] = useState("");

  const registerManufacturer = async () => {
    if (contract) {
      try {
        await contract.methods
          .registerManufacturer(manufacturerAddress, manufacturerName)
          .send({ from: accounts[0] });
        setMessage("Manufacturer registered successfully!");
      } catch (error) {
        console.error("Error registering manufacturer:", error);
        setMessage("Error registering manufacturer.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Register as Manufacturer</h2>
      <input
        type="text"
        value={manufacturerAddress}
        onChange={(e) => setManufacturerAddress(e.target.value)}
        placeholder="Manufacturer Address"
        className="border p-2 mb-4 w-full"
      />
      <input
        type="text"
        value={manufacturerName}
        onChange={(e) => setManufacturerName(e.target.value)}
        placeholder="Manufacturer Name"
        className="border p-2 mb-4 w-full"
      />
      {/* <button
        onClick={registerManufacturer}
        className="bg-[] text-white py-2 px-4 rounded-lg mb-4"
      >
        Register
      </button> */}
      <button
        className="bg-[#ace5d7] text-black mt-4 py-2 px-6 rounded-lg font-bold uppercase transform transition-transform duration-200 hover:translate-y-1"
        style={{
          boxShadow: "0 4px #1c3d5a",
        }}
      >
        Register
      </button>

      <p>{message}</p>
    </div>
  );
};

export default RegisterManufacturer;
