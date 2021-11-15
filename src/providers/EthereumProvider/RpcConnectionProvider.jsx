import React, { useEffect, useState, createContext, useContext } from "react";

import { AlchemyProvider } from "@ethersproject/providers";

const RpcConnectionContext = createContext();

function RpcConnectionProvider({ children }) {
  const [rpcConnection, setRpcConnection] = useState();

  useEffect(() => {
    // Setup and connect to the Rpc Ethereum provider here,
    // TODO: make these generic (pull the specifics from props)
    const alchemyProvider = new AlchemyProvider(
      "rinkeby",
      "vfHbicUOX3rLMzspRTN1mC1aYduZOYuK"
    );
    setRpcConnection(alchemyProvider);
  }, []);

  return (
    <RpcConnectionContext.Provider
      value={{
        rpcConnection
      }}
    >
      {children}
    </RpcConnectionContext.Provider>
  );
}

export function useRpcConnection() {
  const context = useContext(RpcConnectionContext);

  if (context === undefined) {
    throw new Error(
      "useRpcConnection must be used within a RpcConnectionProvider"
    );
  }

  return context;
}

export default RpcConnectionProvider;
