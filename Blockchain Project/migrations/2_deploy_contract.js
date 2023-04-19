const Certificatestorage = artifacts.require("Certificatestorage");

module.exports = function (deployer) {
  deployer.deploy(Certificatestorage);
};
