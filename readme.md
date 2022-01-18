# Random Art Generator


## INTRODUCTION

This is a Sample random image generator app designed for NFTs. It is designed to take the layers from the input folder and generate random images based on the weights configured. The main app in *index.js* will automatically adjust to new races added in the config file as long as they meet the required structure. The application will also generate metadata based on the chosen layers for each image

Since this is intended for NFTs we have also included the option to upload the image files to ipfs as soon as they are generated. This is a slow process  

Note: I am not a digital artist. Images used are simple and only to demostrate functionality

## INSTALLATION

Run `yarn install` to add all dependencies 

## CONFIGURATION


-Weights 
Weights for the different layers can be configured in the *config.js* file

- IPFS upload 
IPFS upload is enabled by setting  `uploadFile = true;` in *config.js*


