import { useEffect, useState } from "react";

import { useWeb3React } from "@web3-react/core";

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { injectedConnector } from "./web3-react-connectors";

function getLibrary(provider, connector) {
  return new Web3Provider(provider);
}

function WalletConnectionProvider({ children }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
  );
}

export const useConnectInjectedWallet = () => {
  const { activate } = useWeb3React();
  const [loading, setLoading] = useState(false);

  const callback = async () => {
    try {
      setLoading(true);
      await activate(injectedConnector);
    } catch (error) {
      // TODO: Show a notification like eth-scaffold
      alert("ohno couldnt connect wallet");
      console.error("Error activating injectedConnector", error);
    } finally {
      setLoading(false);
    }
  };

  return [callback, loading];
};

export default WalletConnectionProvider;
