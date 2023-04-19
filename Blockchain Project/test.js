// import * as IPFS from 'ipfs-core';
// import { create } from 'ipfs-http-client';
/* <script src="./node_modules/ipfs-core/dist/index.min.js"></script>
<script src="./node_modules/ipfs-http-client/dist/index.min.js"></script> */

// import * as IPFS from './node_modules/ipfs-core/dist/index.min.js';
// import { create } from './node_modules/ipfs-http-client/dist/index.min.js';

// import fs from './node_modules/fs';


// async function main(path) {
//   const node = await IPFS.create();
//   const client = create();
//   const gateway = 'https://gateway.pinata.cloud/ipfs/';

//   const imagePath = path;
//   const imageBuffer = fs.readFileSync(imagePath);
//   const imageBase64 = imageBuffer.toString('base64');

//   // add image to node
//   const file = await node.add({
//     path: 'cut.jpg',
//     content: Buffer.from(imageBase64, 'base64')
//   });
//   console.log("File Added: ", file.path, file.cid.toString());

//   // retrieve file from node
//   const cid = file.cid.toString();
//   const data = [];
//   for await (const chunk of node.cat(cid)) {
//     data.push(chunk);
//   }
//   const imageBuffer2 = Buffer.concat(data);

//   fs.writeFileSync('retrieved.jpg', imageBuffer2);

//   console.log("File Retrieved and saved as retrieved.jpg");
// }

// function uploadImage() {
//     const imagePath = document.getElementById('image-url').value;
//     main(imagePath);
// }


import * as IPFS from './node_modules/ipfs-core/dist/index.min.js';
//import { create } from './node_modules/ipfs-http-client/dist/index.min.js';
import ipfsHttpClient from './node_modules/ipfs-http-client/dist/index.min.js';

async function main(file) {
  const node = await IPFS.create();
//   const client = new HTTPClient({ host: 'localhost', port: '5001', protocol: 'http' }); 
  const gateway = 'https://gateway.pinata.cloud/ipfs/';
  const client = ipfsHttpClient();
  const reader = new FileReader();

  reader.onload = async () => {
    const imageBuffer = reader.result;
    const file = await node.add({
      path: 'cut.jpg',
      content: Buffer.from(imageBuffer)
    });
    console.log("File Added: ", file.path, file.cid.toString());

    const cid = file.cid.toString();
    const data = [];
    for await (const chunk of node.cat(cid)) {
      data.push(chunk);
    }
    const imageBuffer2 = Buffer.concat(data);

    const blob = new Blob([imageBuffer2], { type: 'image/jpeg' });
    const url = URL.createObjectURL(blob);

    const img = document.createElement("img");
    img.src = url;
    document.body.appendChild(img);
  };

  reader.readAsArrayBuffer(file);
}

function uploadImage() {
    const fileInput = document.getElementById('image-url');
    const file = fileInput.files[0];
    main(file);
}
