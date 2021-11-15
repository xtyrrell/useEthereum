import "./styles.css";

import EthereumProvider, {
  useConnectInjectedWallet,
  useEagerConnect,
  useEthereum
} from "./providers/EthereumProvider";
import { useWeb3React } from "@web3-react/core";

import ButtonOrConnectWallet from "./components/ButtonOrConnectWallet";

import DaiMainnetContract from "./contracts/dai";

const ExampleConnectedWalletConsumer = () => {
  const {
    active,
    deactivate,
    account,
    library,
    activate,
    error,
    chainId
  } = useEthereum();

  console.log("library", library);
  console.log("account", account);

  useEagerConnect();
  const [
    connectInjectedWallet,
    busyConnectingInjectedWallet
  ] = useConnectInjectedWallet();

  return (
    <div>
      <p>{account ? "CONNECTED TO: " + account : "INACTIVE"}</p>
      <p>on chain: {chainId || "(not connected)"}</p>

      {!active && (
        <button onClick={connectInjectedWallet}>
          {busyConnectingInjectedWallet
            ? "..."
            : "Connect MetaMask / Brave / Injected Wallet"}
        </button>
      )}

      {active && <button onClick={deactivate}>Disconnect Wallet</button>}

      <hr />
      <p style={{ color: "red" }}>{JSON.stringify(error)}</p>
    </div>
  );
};

const ExampleReadableContractConsumer = () => {
  const { readableContracts } = useEthereum();

  console.log("readableContracts", readableContracts);

  return (
    <div>
      {/* Dai balance of 0x0: {readableContracts.DaiMannetContract.balanceOf()} */}
    </div>
  );
};

export default function App() {
  return (
    <EthereumProvider
      readableContracts={DaiMainnetContract}
      writableContracts={{}}
    >
      <div className="App">
        <h1>WIP useEthereum example</h1>
        <p>
          A (WIP, soon to be) complete little example of using web3-react and
          ethers to set up an ergonomic React Context API Provider with
          associated hooks that lets you easily access:
        </p>
        <ul>
          <li>
            connected wallet functionality (comprehensive functionality to
            connect and disconnect, see the connected address, display errors
            such as when the user is on the wrong chain etc) - anywhere in your
            app.
          </li>

          <li>
            contracts on the blockchain. You are given two ways to interact with
            contracts: read-only and read-and-write. The benefit of having a
            read-only option is that you can allow your users to browse through
            your dApp showing actual data from the blockchain to allow them to
            evaluate your app before deciding to connect their wallet.
          </li>
        </ul>

        <hr />

        <ExampleConnectedWalletConsumer />

        <hr />

        <ButtonOrConnectWallet onClick={() => console.log("hi!")}>
          Greet
        </ButtonOrConnectWallet>
      </div>
    </EthereumProvider>
  );
}
