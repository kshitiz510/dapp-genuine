const LuxuryProductRegistry = artifacts.require("LuxuryProductRegistry");

module.exports = function (deployer) {
  deployer.deploy(LuxuryProductRegistry);
};