import { useEffect } from "react";

import { useWeb3React } from "@web3-react/core";

import { injectedConnector } from "./web3-react-connectors";

import WalletConnectionProvider from "./WalletConnectionProvider";
import RpcConnectionProvider, {
  useRpcConnection
} from "./RpcConnectionProvider";

/**
 * The React Context API Provider that allows you to `useEthereum()` anywhere in your app.
 *
 * Using the `useEthereum()` hook allows easy
 * 1. management of your connection to the blockchain (through a read+write wallet and a read-only RPC provider like Alchemy)
 * 2. read and write access to the blockchain and any deployed contracts
 *
 * I am considering naming this whole scheme `useEtheremMagic()` but sadly there is already a company
 * called "Magic" which operates in this space.
 *
 * This takes in an rpcConnectionProvider (not actually used at all yet but can be). refers to the ethers notion of "provider" rather than the React
 * Context API. This is how the user of this library can choose which Ethereum Provider they want to use.
 *
 * It could also take in a list of wallets to enable or something like that.
 */
function EthereumProvider({
  readableContracts,
  writableContracts,
  rpcConnectionProvider,
  wallets,
  children
}) {
  // EthereumProvider is a wrapper around two Providers here:
  // - RpcConnectionProvider: read-only - for allowing all users to read from the blockchain without having to first connect an account by providing a connection to a hosted read-only provider like Alchemy
  // - WalletConnectionProvider: read+write - wraps web3-react and for easily allowing a user to connect their wallet so they can interact with the blockchain

  // We have two providers so that we can populate our app with data from the blockchain through the readonly provider first
  // without having to ask users to connect their wallet (unneeded UX friction). Then, once they've got an idea of what the app is
  // about, they can decide if they want to connect their wallet to interact with it properly.

  // EthereumProvider will wrap both these providers and combine their usefulness into one hook:
  // useEthereum().

  // a user should be able to use it like this
  // const { account, chainId, error, activate, deactivate, readContracts, writeContracts } = useEthereum()

  // Once we have both a signer provider and a non-signing provider we will be
  // able to expose readContracts and writeContracts through hooks which
  // should be normal ethersjs contracts instances connceted to the non-signer and signer
  // providers respectively (obbviously writeContracts will only be available once there is a connected signer)

  // Once we have that we shold have all we need to write a full web3 ethereum frontend.

  // we'll want to make a wallet choice modal for when people click Connect Wallet

  return (
    <RpcConnectionProvider>
      <WalletConnectionProvider>{children}</WalletConnectionProvider>
    </RpcConnectionProvider>
  );
}

export const useEthereum = () => {
  // would be cleaner to abstract away web3React and instead
  // invoke useWalletConnection() from WalletConnectionProvider
  const walletConnection = useWeb3React();
  const rpcConnection = useRpcConnection();

  // TODO: Also expose `readContracts` and `writeContracts`
  // which are read-only contracts connected to the RpcConnectionProvider
  // and read-and-write contracts connected to the wallet, respectively
  // The user must pass in both of these as props to <EthereumProvider>

  return { ...walletConnection, ...rpcConnection };
};

// TODO: useReadContract
// TODO: useWriteContract
// Which to choose? useReadContract uses an RPC Connection, not a wallet connection.
// If you want to get data from the blockchain to show users before they've connected their wallets,
// you should use useReadContract. If you know your users have connected their wallet already, use useWriteContracts
// export const useContract = () => {
//   const { library } = useWeb3React();
// };

export { useConnectInjectedWallet } from "./WalletConnectionProvider";
export { useEagerConnect } from "./hooks";

export default EthereumProvider;
