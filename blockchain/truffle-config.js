const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");

const privateKey = "45f031951a64e8f63658a7a2eb0f95c43bf1fce6f9f1d78bd93d84f690eba85e";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8551,
      network_id: "*", // Match any network id
    },
    klaytn: {
      provider: () => {
        const pks = JSON.parse(
          fs.readFileSync(path.resolve(__dirname) + "/privateKeys.js")
        );

        return new HDWalletProvider(
          pks,
          "https://public-en-baobab.klaytn.net",
          0,
          pks.length
        );
      },
      network_id: "1001", //Klaytn baobab testnet's network id
      gas: "8500000",
      gasPrice: null,
    },
    kasBaobab: {
      provider: () => {
        const option = {
          headers: [
            {
              name: "Authorization",
              value:
                "Basic " +
                Buffer.from(accessKeyId + ":" + secretAccessKey).toString(
                  "base64"
                ),
            },
            { name: "x-chain-id", value: "1001" },
          ],
          keepAlive: false,
        };
        return new HDWalletProvider(
          privateKey,
          new Caver.providers.HttpProvider(
            "https://node-api.klaytnapi.com/v1/klaytn",
            option
          )
        );
      },
      network_id: "1001", //Klaytn baobab testnet's network id
      gas: "8500000",
      gasPrice: "25000000000",
    },
    kasCypress: {
      provider: () => {
        const option = {
          headers: [
            {
              name: "Authorization",
              value:
                "Basic " +
                Buffer.from(accessKeyId + ":" + secretAccessKey).toString(
                  "base64"
                ),
            },
            { name: "x-chain-id", value: "8217" },
          ],
          keepAlive: false,
        };
        return new HDWalletProvider(
          cypressPrivateKey,
          new Caver.providers.HttpProvider(
            "https://node-api.klaytnapi.com/v1/klaytn",
            option
          )
        );
      },
      network_id: "8217", //Klaytn baobab testnet's network id
      gas: "8500000",
      gasPrice: "25000000000",
    },
    baobab: {
      provider: () => {
        return new HDWalletProvider(privateKey, "http://api.baobab.klaytn.net:8651");
      },
      network_id: "1001", //Klaytn baobab testnet's network id
      gas: "8500000",
      networkCheckTimeout: 1000000,
      timeoutBlocks: 200,
      gasPrice: null,
    },
    cypress: {
      provider: () => {
        return new HDWalletProvider(privateKey, "https://public-en-cypress.klaytn.net");
      },
      network_id: "8217", //Klaytn mainnet's network id
      gas: "8500000",
      gasPrice: null,
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abiss/',
  compilers: {
    solc: {
      version: '0.8.0+commit.c7dfd78e',
      optimizer: {
        enabled: true,
        runs: 1
      }
    }
  },

};

// // const HDWalletProvider = require('@truffle/hdwallet-provider');
// const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");
// require('dotenv').config();
// const PRIVATE_KEY = process.env.PRIVATE_KEY
// const Url = process.env.RPC_URL

// module.exports = {
//   networks: {
//     cldev: {
//       host: '127.0.0.1',
//       port: 8545,
//       network_id: '*',
//     },
//     ganache: {
//       host: '127.0.0.1',
//       port: 7545,
//       network_id: '*',
//     },
//     testnet: {
//       provider: () => new HDWalletProvider(PRIVATE_KEY, "https://your.baobab.en.url:8651"),
//       network_id: '1001', //Klaytn baobab testnet's network id
//       gas: '8500000',
//       gasPrice: null,
//     },
//   },
//   contracts_directory: './src/contracts/',
//   contracts_build_directory: './src/abiss/',
//   compilers: {
//     solc: {
//       version: '0.8.0+commit.c7dfd78e',
//       optimizer: {
//         enabled: true,
//         runs: 1
//       }
//     }
//   },
//   api_keys: {
//     etherscan: process.env.ETHERSCAN_API_KEY,
//   },
//   plugins: [
//     'truffle-plugin-verify'
//   ]
// }
