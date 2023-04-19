const Web3 = require('web3');
const CertificateStorage = require('./build/contracts/CertificateStorage.json');

const web3 = new Web3('http://localhost:7545');
const privateKey = '0x191ac84202afd168e8325491de8eb43c4a093152963c22dd273b976798d330a3'; 

const certificateStorageContract = new web3.eth.Contract(
  CertificateStorage.abi,
  CertificateStorage.networks['5777'].address
);

const cid = 'QmWZmwrQZx8NiXKreeuqYv2gW3iZY9t4eL6k3vpCgVEZ5Z'; 
const gasLimit = 3000000; 

const storeCid = async () => {
  const options = {
    to: certificateStorageContract.options.address,
    data: certificateStorageContract.methods.storeCID(cid).encodeABI(),
    gas: gasLimit,
  };

  const signedTransaction = await web3.eth.accounts.signTransaction(options, privateKey);
  const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
  console.log('CID stored on the blockchain:', cid);
}

storeCid();
