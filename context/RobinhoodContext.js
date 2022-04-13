import { createContext, useEffect, useState } from "react";
import { useMoralis, Moralis } from "react-moralis";

import {
  dogeAbi,
  bitcoinAbi,
  solanaAbi,
  usdcAbi,
  dogeAddress,
  btcAddress,
  solAddress,
  usdcAddress,
} from "../lib/constants.js";

export const RobinhoodContext = createContext();

export const RobinhoodProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [formattedAccount, setFormattedAccount] = useState();

  const [coinSelect, setCoinSelect] = useState("DOGE");
  const [toCoin, setToCoin] = useState("");
  const [balance, setBalance] = useState("");
  const [amount, setAmount] = useState("");

  const { isAuthenticated, authenticate, user, logout, Moralis, enableWeb3 } =
    useMoralis();


  useEffect(async () => {
    if (isAuthenticated) {
      const account = user.get("ethAddress");
      let formatAccount = account.slice(0, 4) + "..." + account.slice(-4);
      setFormattedAccount(formatAccount);
      setCurrentAccount(account);

      const currentBalance = await Moralis.Web3API.account.getNativeBalance({
        chain: "rinkeby",
        address: currentAccount,
      });

      const balanceEth = Moralis.Units.FromWei(currentBalance.balance);
      const formattedBalance = parseFloat(balanceEth).toFixed(3);
      setBalance(formattedBalance);
    }
  }, [isAuthenticated, enableWeb3]);

  useEffect(() => {
    if (!currentAccount) return;
    async () => {
      const response = await fetch("/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletAddress: currentAccount }),
      });
      const data = await response.json();
    };
  }, [currentAccount]);

  
  const getContractAddress = () => {
    if (coinSelect === "BTC") return btcAddress;
    if (coinSelect === "DOGE") return dogeAddress;
    if (coinSelect === "SOL") return solAddress;
    if (coinSelect === "USDC") return usdcAddress;
  };

  const getToAddress = () => {
    if (toCoin === "BTC") return btcAddress;
    if (toCoin === "DOGE") return dogeAddress;
    if (toCoin === "SOL") return solAddress;
    if (toCoin === "USDC") return usdcAddress;
  };

  const getToAbi = () => {
    if (toCoin === "BTC") return bitcoinAbi;
    if (toCoin === "DOGE") return dogeAbi;
    if (toCoin === "SOL") return solanaAbi;
    if (toCoin === "USDC") return usdcAbi;
  };


  const mint = async () => {
    try {
      if (coinSelect === "ETH") {
        if (!isAuthenticated) return;

        await Moralis.enableWeb3();

        const contractAddress = getToAddress();
        const abi = getToAbi();

        let options = {
          contractAddress: contractAddress,
          functionName: "mint",
          abi: abi,
          params: {
            to: currentAccount,
            amount: Moralis.Units.Token("50", "18"),
          },
        };
        sendEth();

        const transaction = await Moralis.executeFunction(options);
        const receipt = await transaction.wait(4);
        saveTransaction(receipt.transactionHash, amount, receipt.to);
      } else {
        swapTokens();
        saveTransaction(receipt.transactionHash, amount, receipt.to);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const swapTokens = async () => {
    try {
      if (!isAuthenticated) return;
      if (coinSelect === toCoin) return;

      await Moralis.enableWeb3();

      const fromOptions = {
        type: "erc20",
        amount: Moralis.Units.Token(amount, "18"),
        receiver: getContractAddress(),
      };

      const toMintOptions = {
        contractAddress: getToAddress(),
        functionName: "mint",
        abi: getToAbi(),
        params: {
          to: currentAccount,
          amount: Moralis.Units.Token(amount, "18"),
        },
      };

      let fromTransaction = await Moralis.transfer(fromOptions);
      let toMinTransaction = await Moralis.executeFunction(toMintOptions);
      let fromReceipt = await fromTransaction.wait();
      let toReceipt = await toMinTransaction.wait();

      console.log(fromReceipt);
      console.log(toReceipt);
    } catch (err) {
      console.error(err);
    }
  };

  const sendEth = async () => {
    if (!isAuthenticated) return;

    const contractAddress = getToAddress();

    let options = {
      type: "native",
      amount: Moralis.Units.ETH("0.01"),
      receiver: contractAddress,
    };

    const transaction = await Moralis.transfer(options);
    const receipt = await transaction.wait();
    saveTransaction(receipt.transactionHash, "0.01", receipt.to);

    console.log(receipt);
  };


  const saveTransaction = async (txHash, amount, toAddress) => {
    await fetch("/api/swapTokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        txHash: txHash,
        from: currentAccount,
        to: getToAddress,
        amount: parseFloat(amount),
      }),
    });
  };

  const connectWallet = () => {
    authenticate();
  };

  const signout = () => {
    logout();
  };

  return (
    <RobinhoodContext.Provider
      value={{
        connectWallet,
        signout,
        currentAccount,
        isAuthenticated,
        formattedAccount,
        setAmount,
        mint,
        setCoinSelect,
        coinSelect,
        balance,
        swapTokens,
        amount,
        toCoin,
        setToCoin,
      }}
    >
      {children}
    </RobinhoodContext.Provider>
  );
};
