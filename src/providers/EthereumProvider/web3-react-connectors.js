import { InjectedConnector } from "@web3-react/injected-connector";
// import { PortisConnector } from '@web3-react/portis-connector'

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 3]
});

// export const portis = new PortisConnector({
//   dAppId: "YOUR_DAPP_ID",
//   network: [5]
// });
