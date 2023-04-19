const web3 = require('web3');
const contract = require('./build/contracts/Certificatestorage.json');

const provider = new web3.providers.HttpProvider('http://localhost:7545');
const web3Instance = new web3(provider);

const deploy = async () => {
  const accounts = await web3Instance.eth.getAccounts();
  const networkId = await web3Instance.eth.net.getId();
  const deployedNetwork = contract.networks[networkId];

  const instance = new web3Instance.eth.Contract(
    contract.abi,
    deployedNetwork && deployedNetwork.address,
  );

  console.log('Contract deployed at:', instance.options.address);
};

deploy();
