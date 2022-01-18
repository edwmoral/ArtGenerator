//import {create} from 'ipfs-http-client';

const { create } = require("ipfs-http-client");


const fs = require("fs");
//import {promises as fs} from 'fs';
//const fs = require("fs"); //interacts with file system 

const ipfsClient = create('https://ipfs.infura.io:5001/api/v0');
// Connects to the IPFS infura gateway.
// This can be changed to a different gateway if desired 

const ipfsBaseUrl = 'https://ipfs.infura.io/ipfs/'
// for OpenSeas this can be modified to:
// const ipfsBaseUrl = ipfs://


// loads an image from output folder
const getImage = async (_element) => {

    let data = await fs.promises.readFile(`./Output/${_element}.png`)
    let buffer = Buffer.from(data);
    return (buffer);
}

// uploads image to IPFS
const uploadToIPFS = async (_imageId) => {
    let _imgBuffer =  await getImage(_imageId);
    let _addedImage = await ipfsClient.add(_imgBuffer); 

    return ipfsBaseUrl+ _addedImage.path;    

}



module.exports = {
    uploadToIPFS
  };
  