require("@nomiclabs/hardhat-waffle");
import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

import { HardhatUserConfig } from "hardhat/types";

import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-etherscan";
import "solidity-coverage";

const INFURA_API_KEY = process.env.INFURA_API_KEY;
const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY!;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.6.6",
      }
    ]
  },
  networks: {
    hardhat: {},
    localhost: {},
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [RINKEBY_PRIVATE_KEY],
      gas: 2000000,
    },
    coverage: {
      url: "http://127.0.0.1:8555", // Coverage launches its own ganache-cli client
    },
  },
};

export default config;

// require("@nomiclabs/hardhat-waffle");
// // const infura_url = "https://ropsten.infura.io/v3/1b4fbf039df942c899b730cfa18023b6";
// const infura_key = "1b4fbf039df942c899b730cfa18023b6";
// const alchemy_ropsten = "https://eth-ropsten.alchemyapi.io/v2/TbQrqwfhITlqOFREAD6RECPEnFjVfOry";
// const alchemy_rinkeby = "https://eth-rinkeby.alchemyapi.io/v2/CmP9bSs_P5tA1zuNDfnz0bSnDNz5NAnD";
// const pk_4 = "0xbfee869871299da61cf527c7afb6a73887aa370808f1f3942c14c8e61c864ed6"
// const pk_5 = "0x29298d40bdfdc2c0195e9e209993bce91c6ebd04f3a159af8ad4d3624be99e8f"
// const pk_6 = "0x2f802c229c1e2c07c9289d9ed547152a4e608b75b33d16b680d17eb76c59787d";
// // This is a sample Hardhat task. To learn how to create your own go to
// // https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async () => {
//   const accounts = await ethers.getSigners();
//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });
// // You need to export an object to set up your config
// // Go to https://hardhat.org/config/ to learn more
// /**
//  * @type import('hardhat/config').HardhatUserConfig
//  */
// module.exports = {
//   solidity: {
//     compilers: [
//       {
//         version: "0.8.0",
//       },
//     ]
//   },
//   networks: {
//     mainnet: {
//       url: `https://mainnet.infura.io/v3/${infura_key}`,
//       accounts: [pk_4, pk_5, pk_6]
//     },
//     ropsten: {
//       url: `https://ropsten.infura.io/v3/${infura_key}`,
//       accounts: [pk_4, pk_5, pk_6]
//     },
//     rinkeby: {
//       url: `https://rinkeby.infura.io/v3/${infura_key}`,
//       // url: alchemy_rinkeby,
//       accounts: [pk_4, pk_5, pk_6]
//     },
//     testnet: {
//       url: "https://data-seed-prebsc-1-s1.binance.org:8545",
//       chainId: 97,
//       gasPrice: 20000000000,
//       accounts: [pk_4, pk_5, pk_6]
//     },
//   }
// };
// // hardhat: {
// //   forking: {
// //     url: "https://eth-mainnet.alchemyapi.io/v2/rNkPnf8CqKqg0yVJK-dWEml2P92xN_Ms",
// //   }
// // },