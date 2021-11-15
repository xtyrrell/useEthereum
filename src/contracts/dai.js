import { Contract } from "@ethersproject/contracts";
import { AlchemyProvider } from "@ethersproject/providers";

// A Human-Readable ABI; for interacting with the contract, we
// must include any fragment we wish to use
const abi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"

  // Authenticated Functions
  // "function transfer(address to, uint amount) returns (bool)",

  // Events
  // "event Transfer(address indexed from, address indexed to, uint amount)"
];

// This can be an address or an ENS name
const address = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984";

// Read-Only; By connecting to a Provider, allows:
// - Any constant function
// - Querying Filters
// - Populating Unsigned Transactions for non-constant methods
// - Estimating Gas for non-constant (as an anonymous sender)
// - Static Calling non-constant methods (as anonymous sender)
const DaiMainnetContract = new Contract(address, abi);

const alchemyProvider = new AlchemyProvider(
  "rinkeby",
  "vfHbicUOX3rLMzspRTN1mC1aYduZOYuK"
);

const connected = DaiMainnetContract.connect(alchemyProvider);

(async () => {
  console.log(
    "DaiMainnetContract.balanceOf('0x0000000000000000000000000000000000000000')",
    await connected.balanceOf("0x0000000000000000000000000000000000000000")
  );
})();

export default DaiMainnetContract;
