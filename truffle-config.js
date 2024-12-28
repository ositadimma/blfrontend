// truffle-config.js

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Ganache's default host
      port: 7545,         // Ganache's default port (for the GUI version)
      network_id: "*",    // Match any network id
    },
  },
  compilers: {
    solc: {
      version: "0.8.0", // Ensure the version matches your contract
    },
  },
};
