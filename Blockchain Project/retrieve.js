const Web3 = require('web3');
const certificateStorageABI = require('./build/contracts/CertificateStorage.json').abi;
const certificateStorageAddress = '0xC714e819cc044ED54F1CbE109A8b3B90603DB5B1'; 

function ret()  {

  const web3 = new Web3('http://localhost:7545');
  const certificateStorageContract = new web3.eth.Contract(certificateStorageABI, certificateStorageAddress);
  
  const accountAddress = '0x25543BB9d378285944FE7C21b385057c29ECb8bE'; 
  certificateStorageContract.methods.getCID().call().then((cid) => {
      console.log('CID retrieved from the blockchain:', cid);
    });
}

ret()