const fs = require("fs");
const width = 1000;
const height = 1000;
const dir = __dirname;
const description = "This is an NFT made by the coolest generative code.";
const baseImageUri = "https://domain/nft";
const uploadFile = false;
const startEditionFrom = 1;
const endEditionAt = 10;
const raceWeights = [
  {
    value: "eliteStickFigure",
    from: 1,
    to: 3,
  },
  {
    value: "commonStickFigure",
    from: 4,
    to: endEditionAt,
  },
];

const races = {
  eliteStickFigure: {
    name: "eliteStickFigure",
    layers: [
      {
        name: "Background",
        elements: [
          {
            id: 0,
            name: "Light blue",
            path: `${dir}/1-background/LightBlue.png`,
            weight: 100,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Arms",
        elements: [
          {
            id: 3,
            name: "Arms_down4",
            path: `${dir}/4-Arms/Arms_down4.png`,
            weight: 50,
          },
          {
            id: 4,
            name: "Arms_down5",
            path: `${dir}/4-Arms/Arms_down5.png`,
            weight: 50,
          }
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
       },
      {
        name: "Body",
        elements: [

          {
            id: 3,
            name: "body4",
            path: `${dir}/2-Body/body4.png`,
            weight: 50,
          },
          {
            id: 4,
            name: "body5",
            path: `${dir}/2-Body/body5.png`,
            weight: 50,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Head",
        elements: [

          {
            id: 3,
            name: "head4",
            path: `${dir}/3-Head/head4.png`,
            weight: 50,
          },
          {
            id: 4,
            name: "head5",
            path: `${dir}/3-Head/head5.png`,
            weight: 50,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },

      {
        name: "Weapons",
        elements: [
          {
            id: 0,
            name: "Weapon1",
            path: `${dir}/5-Weapons/Weapon1.png`,
            weight: 50,
          },
          {
            id: 1,
            name: "Weapon2",
            path: `${dir}/5-Weapons/Weapon2.png`,
            weight: 30,
          },
          {
            id: 2,
            name: "Weapon3",
            path: `${dir}/5-Weapons/Weapon3.png`,
            weight: 20,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },

    ],
  },
  commonStickFigure: {
    name: "commonStickFigure",
    layers: [
      {
        name: "Background",
        elements: [
          {
            id: 0,
            name: "Light blue",
            path: `${dir}/1-background/LightBlue.png`,
            weight: 100,
          },
          {
            id: 1,
            name: "Orange",
            path: `${dir}/1-background/Orange.png`,
            weight: 80,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Arms",
        elements: [
          {
            id: 0,
            name: "Arms_down1",
            path: `${dir}/4-Arms/Arms_down1.png`,
            weight: 20,
          },
          {
            id: 1,
            name: "Arms_down2",
            path: `${dir}/4-Arms/Arms_down2.png`,
            weight: 10,
          }, {
            id: 2,
            name: "Arms_down3",
            path: `${dir}/4-Arms/Arms_down3.png`,
            weight: 10,
          },
          {
            id: 3,
            name: "Arms_down4",
            path: `${dir}/4-Arms/Arms_down4.png`,
            weight: 5,
          },
          {
            id: 4,
            name: "Arms_down5",
            path: `${dir}/4-Arms/Arms_down5.png`,
            weight: 5,
          }, {
            id: 5,
            name: "Arms_up1",
            path: `${dir}/4-Arms/Arms_up1.png`,
            weight: 20,
          },
          {
            id: 6,
            name: "Arms_up2",
            path: `${dir}/4-Arms/Arms_up2.png`,
            weight: 10,
          }, {
            id: 7,
            name: "Arms_up3",
            path: `${dir}/4-Arms/Arms_up3.png`,
            weight: 10,
          },
          {
            id: 8,
            name: "Arms_up4",
            path: `${dir}/4-Arms/Arms_up4.png`,
            weight: 5,
          },
          {
            id: 9,
            name: "Arms_up5",
            path: `${dir}/4-Arms/Arms_up5.png`,
            weight: 5,

          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Body",
        elements: [
          {
            id: 0,
            name: "body1",
            path: `${dir}/2-Body/body1.png`,
            weight: 40,
          },
          {
            id: 1,
            name: "body2",
            path: `${dir}/2-Body/body2.png`,
            weight: 20,
          },
          {
            id: 2,
            name: "body3",
            path: `${dir}/2-Body/body3.png`,
            weight: 20,
          },
          {
            id: 3,
            name: "body4",
            path: `${dir}/2-Body/body4.png`,
            weight: 10,
          },
          {
            id: 4,
            name: "body5",
            path: `${dir}/2-Body/body5.png`,
            weight: 10,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Head",
        elements: [
          {
            id: 0,
            name: "head1",
            path: `${dir}/3-Head/head1.png`,
            weight: 40,
          },
          {
            id: 1,
            name: "head2",
            path: `${dir}/3-Head/head2.png`,
            weight: 20,
          }, {
            id: 2,
            name: "head3",
            path: `${dir}/3-Head/head3.png`,
            weight: 20,
          },
          {
            id: 3,
            name: "head4",
            path: `${dir}/3-Head/head4.png`,
            weight: 10,
          },
          {
            id: 4,
            name: "head5",
            path: `${dir}/3-Head/head5.png`,
            weight: 10,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },

      {
        name: "Weapons",
        elements: [
          {
            id: 0,
            name: "Weapon1",
            path: `${dir}/5-Weapons/Weapon1.png`,
            weight: 50,
          },
          {
            id: 1,
            name: "Weapon2",
            path: `${dir}/5-Weapons/Weapon2.png`,
            weight: 30,
          },
          {
            id: 2,
            name: "Weapon3",
            path: `${dir}/5-Weapons/Weapon3.png`,
            weight: 20,
          },
          {
            id: 3,
            name: "Unarmed",
            path: `${dir}/5-Weapons/Unarmed.png`,
            weight: 0, // Unarmed should never be automatically selected
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },

    ],
  },
};

module.exports = {
  width,
  height,
  description,
  baseImageUri,  
  startEditionFrom,
  endEditionAt,
  races,
  raceWeights,
  uploadFile,
};
