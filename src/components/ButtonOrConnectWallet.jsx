import { useWeb3React } from "@web3-react/core";

import { useConnectInjectedWallet } from "../providers/EthereumProvider";

function ButtonOrConnectWallet({ onClick, children }) {
  const { active, account } = useWeb3React();

  const [connectInjectedWallet, busyConnecting] = useConnectInjectedWallet();

  if (!active) {
    return (
      <button onClick={connectInjectedWallet}>
        Connect Wallet to {children}
        {busyConnecting && " (loading"}
      </button>
    );
  }

  return (
    <div>
      <button onClick={onClick}>{children}</button>
      <div>
        <small>
          using account <code>{account.slice(0, 6)}...</code>
        </small>
      </div>
    </div>
  );
}

export default ButtonOrConnectWallet;
