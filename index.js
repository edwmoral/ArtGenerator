const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const {
  width,
  height,
  description,
  baseImageUri,
  startEditionFrom,
  endEditionAt,
  races,
  raceWeights,
  uploadFile,
} = require("./input/config.js");

const { uploadToIPFS } = require("./ipfsUpload.js");
const console = require("console");
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");
var metadataList = [];
var attributesList = [];
var dnaList = [];

//saves a completed image file
const saveImage = (_editionCount) => {
  fs.writeFileSync(
    `./Output/${_editionCount}.png`,
    canvas.toBuffer("image/png")
  );

};

// adds image Id to the image
const signImage = (_sig) => {
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 30pt Verdana";
  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  ctx.fillText(_sig, 40, 40);
};

// returns date in mm-dd-yyyy format
function formatedDate() {
  var today = new Date();
  var dd = today.getUTCDate().toString();
  var mm = (today.getUTCMonth() + 1).toString();
  var yyyy = today.getUTCFullYear();

  if (mm.length < 2)
    mm = '0' + mm;
  if (dd.length < 2)
    dd = '0' + dd;

  return [mm, dd, yyyy].join('-');
}

// combines all image details into metadata
const addMetadata = (_dna, _edition, _imageUrl) => {
  let tempMetadata = {
    dna: _dna.join(""),
    name: `#${_edition}`,
    description: description,
    image: _imageUrl,
    edition: _edition,
    dateCreated: formatedDate(),
    attributes: attributesList,
  };
  metadataList.push(tempMetadata);
  attributesList = [];
};

// adds attributes to be used for metadata creation
const addAttributes = (_element) => {
  let selectedElement = _element.layer.selectedElement;
  attributesList.push({
    trait_type: _element.layer.name,
    value: selectedElement.name,
  });
};

//loads image from layer files in input folder 
const loadLayerImg = async (_layer) => {
  return new Promise(async (resolve) => {
    const image = await loadImage(`${_layer.selectedElement.path}`);
    resolve({ layer: _layer, loadedImage: image });
  });
};

// adds individual layers to the ctx image 
const drawElement = (_element) => {
  ctx.drawImage(
    _element.loadedImage,
    _element.layer.position.x,
    _element.layer.position.y,
    _element.layer.size.width,
    _element.layer.size.height
  );
  addAttributes(_element);
};

// takes the DNA created in previous steps to generate the image layers
const constructLayerToDna = (_dna, _races, _race) => {
  let mappedDnaToLayers = _races[_race].layers.map((layer, index) => {
    let selectedElement = layer.elements.find((e) => e.id == _dna[index]);
    return {
      name: layer.name,
      position: layer.position,
      size: layer.size,
      selectedElement: selectedElement,
    };
  });
  return mappedDnaToLayers;
};

// returns race details based on the current NFT being minted
const getRace = (_editionCount) => {
  let race = "No Race";
  raceWeights.forEach((raceWeight) => {
    if (_editionCount >= raceWeight.from && _editionCount <= raceWeight.to) {
      race = raceWeight.value;
    }
  });
  return race;
};

// verifies that each image is unique
const isDnaUnique = (_DnaList = [], _dna = []) => {
  let foundDna = _DnaList.find((i) => i.join("") === _dna.join(""));
  return foundDna == undefined ? true : false;
};

// checks if the current DNA has raised arms
const armUp = (_arms, _selection) => { 
  var selectedArm = _arms.find(e => e.id == _selection)
  return selectedArm.name.includes("up")
}

// chooses a random element based on the ods configured in the layer
const choseRandom = (_arms, _elements, _partialDna) => {
  var randomArray = []
  _elements.forEach(_element => {
    if (_element.name.includes("Weapon")
      && armUp(_arms, _partialDna[1])) {        
      randomArray = [3];
    }
    else {
      randomArray = randomArray.concat(
        Array(_element.weight).fill(_element.id)
      )
    }
  })
  return randomArray[Math.floor(Math.random() * randomArray.length)];
}

// generates randomized DNAs for each image
const createDna = (_races, _race, _editionCount) => {
  let randNum = [];
  _races[_race].layers.forEach((layer) => {
    let num = choseRandom(_races[_race].layers[1].elements,
      layer.elements,
      randNum)
    randNum.push(num);
  });

  return randNum;
};

// calls other functions realted to metadata creation
const createMetadata = (_newDna,_editionCount,_imageUrl) =>{
  addMetadata(_newDna, _editionCount, _imageUrl);
  saveMetaDataSingleFile(_editionCount);
}

// adds new metadata to master _metadata.json
const writeMetaData = (_data) => {
  fs.writeFileSync("./Output/_metadata.json", _data);
};

// creates individual metadata files for each image
const saveMetaDataSingleFile = (_editionCount) => {
  fs.writeFileSync(
    `./Output/${_editionCount}.json`,
    JSON.stringify(metadataList.find((meta) => meta.edition == _editionCount))
  );
};

// returns images URL based on configuration
const getUrl = async (_editionCount) => {
  if (uploadFile) {
    //uploads file to IPFS and returns the IPFS URL
    var imageUrl = await uploadToIPFS(_editionCount);
  }
  else {
    //Uses baseImageUri instead of IPFS 
    var imageUrl = `${baseImageUri}/${_editionCount}.png`;
  }
  return imageUrl
}

//creates and saves the PNG
const createImageFile = (_elementArray, _editionCount) => {
  ctx.clearRect(0, 0, width, height);
  _elementArray.forEach((element) => {
    drawElement(element);
  });
  signImage(`#${_editionCount}`);
  saveImage(_editionCount);
}

// Main loop of the app
// handles calling all of the helper functions required to create the image
const startCreating = async () => {
  writeMetaData("");
  let editionCount = startEditionFrom;
  while (editionCount <= endEditionAt) {
    let race = getRace(editionCount);
    let newDna = createDna(races, race, editionCount);

    if (isDnaUnique(dnaList, newDna)) {
      let results = constructLayerToDna(newDna, races, race);
      let loadedElements = []; //promise array
      results.forEach((layer) => {
        loadedElements.push(loadLayerImg(layer));
      });

      await Promise.all(loadedElements).then((elementArray) => {
        createImageFile(elementArray, editionCount)
        return getUrl(editionCount);
      }).then((imageUrl) => {
        createMetadata(newDna, editionCount, imageUrl)
        console.log(
          `Created edition: ${editionCount}, Race: ${race} with DNA: ${newDna}`
        );
      });
      dnaList.push(newDna);
      editionCount++;
    } else {
      console.log("DNA exists!");
    }
  }
  writeMetaData(JSON.stringify(metadataList));
};

startCreating();
