import React, { createContext, useState, useEffect } from "react";
import Web3 from "web3";
import LuxuryProductRegistry from "../contracts/LuxuryProductRegistry.json";

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(false);
  const [address, setAddress] = useState(null);
  const [pubKey, setPubKey] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.dapp) {
        setProvider(true);
        const web3 = new Web3(window.dapp);
        try {
          const accounts = await window.dapp.request("aptos", {
            method: "dapp:accounts",
          });
          setWeb3(web3);

          if (accounts.length > 0) {
            setAccounts(accounts);
            setAccount(accounts[0]);

            const networkId = await web3.eth.net.getId();
            const deployedNetwork = LuxuryProductRegistry.networks[networkId];
            if (deployedNetwork) {
              const contractInstance = new web3.eth.Contract(
                LuxuryProductRegistry.abi,
                deployedNetwork.address
              );
              setContract(contractInstance);
            }
          }
        } catch (error) {
          console.error("User denied account access or needs onboarding", error);
          // alert("Please connect your wallet to use this application.");
        }
      } else {
        console.error("No WellDone Wallet provider found. Install WellDone Wallet.");
        // alert("No WellDone Wallet provider found. Please install WellDone Wallet.");
      }
    };

    initWeb3();
  }, []);

  const connectWallet = async () => {
    if (!window.dapp) {
      // alert('Please install WELLDONE Wallet extension');
    } else {
      try {
        const accounts = await window.dapp.request("aptos", {
          method: "dapp:accounts",
        });
        if (Object.keys(accounts).length !== 0) {
          setAddress(accounts.aptos.address);
          setPubKey(accounts.aptos.pubKey);
          setAccounts([accounts.aptos.address]);
          setAccount(accounts.aptos.address);
        }
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    }
  };

  return (
    <Web3Context.Provider
      value={{ web3, contract, accounts, account, provider, connectWallet, address, pubKey }}
    >
      {children}
    </Web3Context.Provider>
  );
};