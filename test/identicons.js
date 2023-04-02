const {expect} = require("chai");
const {ContractFactory, utils, BigNumber} = require('ethers');




describe("Identicons", function () {
  let  pb;
  let Identicons, id
  before(async function () {
    /*
    PunkBlocks = await ethers.getContractFactory("PunkBlocks");
    blocks = await PunkBlocks.deploy();
    await blocks.deployed();
*/
    pb = await hre.ethers.getContractAt(PB_ABI,  PB_ADDRESS);

    Identicons = await ethers.getContractFactory("Identicons");
    id = await Identicons.deploy();
    await id.deployed();

  });

  describe("TestRender", function () {

    // uncomment if running on mainnet to test svgFromPunkID
    it("Set Config", async function () {


      let getKey = function(s) {
        return ethers.utils.keccak256(ethers.utils.hexlify(ethers.utils.toUtf8Bytes((s))))
      }

      let srare = [
        {"hash":getKey("Bot"), "probability":900},
        {"hash":getKey("Botina"), "probability":900},
        {"hash":getKey("Killer Bot"), "probability":900},
        {"hash":getKey("Killer Botina"), "probability":900},
        {"hash":getKey("Green Alien"), "probability":900},
        {"hash":getKey("Green Alienette"), "probability":900},
        {"hash":getKey("Blue Ape"), "probability":900},
        {"hash":getKey("Alien 2"), "probability":900},
        {"hash":getKey("Alien 3"), "probability":900},
        {"hash":getKey("Alien 4"), "probability":900},
        {"hash":getKey("Alien 5"), "probability":900},
        {"hash":getKey("Alien 6"), "probability":900}
      ];
      let base = [
          {"hash":getKey("Male 1"), "probability":900},
          {"hash":getKey("Male 2"), "probability":900},
        {"hash":getKey("Male 3"), "probability":900},
        {"hash":getKey("Male 4"), "probability":900},
        {"hash":getKey("Female 1"), "probability":900},
        {"hash":getKey("Female 2"), "probability":900},
        {"hash":getKey("Female 3"), "probability":900},
        {"hash":getKey("Female 4"), "probability":900},
        {"hash":getKey("Zombie"), "probability":900},
        {"hash":getKey("Ape"), "probability":900},
        {"hash":getKey("Alien"), "probability":900}
      ];
      let large = [{"hash":getKey("Rosy Cheeks"), "probability":900},
        {"hash":getKey("Rosy Cheeks"), "probability":900},
        {"hash":getKey("Luxurious Beard"), "probability":900},
        {"hash":getKey("Clown Hair Green"), "probability":900},
        {"hash":getKey("Mohawk Dark"), "probability":900},
        {"hash":getKey("Cowboy Hat"), "probability":900},
        {"hash":getKey("Mustache"), "probability":900},
        {"hash":getKey("Clown Nose"), "probability":900},
        {"hash":getKey("Cigarette"), "probability":900},
        {"hash":getKey("Nerd Glasses"), "probability":900},
        {"hash":getKey("Regular Shades"), "probability":900},
        {"hash":getKey("Knitted Cap"), "probability":900},
        {"hash":getKey("Shadow Beard"), "probability":900},
        {"hash":getKey("Frown"), "probability":900},
        {"hash":getKey("Cap Forward"), "probability":900},
        {"hash":getKey("Goat"), "probability":900},
        {"hash":getKey("Mole"), "probability":900},
        {"hash":getKey("Purple Hair"), "probability":900},
        {"hash":getKey("Small Shades"), "probability":900},
        {"hash":getKey("Shaved Head"), "probability":900},
        {"hash":getKey("Classic Shades"), "probability":900},
        {"hash":getKey("Vape"), "probability":900},
        {"hash":getKey("Silver Chain"), "probability":900},
        {"hash":getKey("Smile"), "probability":900},
        {"hash":getKey("Big Shades"), "probability":900},
        {"hash":getKey("Mohawk Thin"), "probability":900},
        {"hash":getKey("Beanie"), "probability":900},
        {"hash":getKey("Cap"), "probability":900},
        {"hash":getKey("Clown Eyes Green"), "probability":900},
        {"hash":getKey("Normal Beard Black"), "probability":900},
        {"hash":getKey("Medical Mask"), "probability":900},
        {"hash":getKey("Normal Beard"), "probability":900},
        {"hash":getKey("VR"), "probability":900},
        {"hash":getKey("Eye Patch"), "probability":900},
        {"hash":getKey("Wild Hair"), "probability":900},
        {"hash":getKey("Top Hat"), "probability":900},
        {"hash":getKey("Bandana"), "probability":900},
        {"hash":getKey("Handlebars"), "probability":900},
        {"hash":getKey("Frumpy Hair"), "probability":900},
        {"hash":getKey("Crazy Hair"), "probability":900},
        {"hash":getKey("Police Cap"), "probability":900},
        {"hash":getKey("Buck Teeth"), "probability":900},
        {"hash":getKey("Do-rag"), "probability":900},
        {"hash":getKey("Front Beard"), "probability":900},
        {"hash":getKey("Spots"), "probability":900},
        {"hash":getKey("Big Beard"), "probability":900},
        {"hash":getKey("Vampire Hair"), "probability":900},
        {"hash":getKey("Peak Spike"), "probability":900},
        {"hash":getKey("Chinstrap"), "probability":900},
        {"hash":getKey("Fedora"), "probability":900},
        {"hash":getKey("Earring"), "probability":900},
        {"hash":getKey("Horned Rim Glasses"), "probability":900},
        {"hash":getKey("Headband"), "probability":900},
        {"hash":getKey("Pipe"), "probability":900},
        {"hash":getKey("Messy Hair"), "probability":900},
        {"hash":getKey("Front Beard Dark"), "probability":900},
        {"hash":getKey("Hoodie"), "probability":900},
        {"hash":getKey("Gold Chain"), "probability":900},
        {"hash":getKey("Muttonchops"), "probability":900},
        {"hash":getKey("Stringy Hair"), "probability":900},
        {"hash":getKey("Eye Mask"), "probability":900},
        {"hash":getKey("3D Glasses"), "probability":900},
        {"hash":getKey("Clown Eyes Blue"), "probability":900},
        {"hash":getKey("Mohawk"), "probability":900},
        {"hash":getKey("Stogie"), "probability":900},
        {"hash":getKey("Earphone"), "probability":900},
        {"hash":getKey("Employee Cap"), "probability":900},
        {"hash":getKey("Headphones"), "probability":900},
        {"hash":getKey("Headphones Red"), "probability":900},
        {"hash":getKey("Headphones Yellow"), "probability":900},
        {"hash":getKey("Gas Mask"), "probability":900},
        {"hash":getKey("Goggles"), "probability":900},
        {"hash":getKey("Pen"), "probability":900},
        {"hash":getKey("Pencil"), "probability":900},
        {"hash":getKey("Red Hat"), "probability":900},
        {"hash":getKey("Yellow Hat"), "probability":900},
        {"hash":getKey("White Hat"), "probability":900},
        {"hash":getKey("Suit"), "probability":900},
        {"hash":getKey("Suit Black"), "probability":900}

      ];
      let small = [{"hash":getKey("Pilot Helmet"), "probability":900},
        {"hash":getKey("Pilot Helmet"), "probability":900},
        {"hash":getKey("Tassle Hat"), "probability":900},
        {"hash":getKey("Hot Lipstick"), "probability":900},
        {"hash":getKey("Blue Eye Shadow"), "probability":900},
        {"hash":getKey("Straight Hair Dark"), "probability":900},
        {"hash":getKey("Choker"), "probability":900},
        {"hash":getKey("Crazy Hair"), "probability":900},
        {"hash":getKey("Regular Shades"), "probability":900},
        {"hash":getKey("Wild Blonde"), "probability":900},
        {"hash":getKey("3D Glasses"), "probability":900},
        {"hash":getKey("Mole"), "probability":900},
        {"hash":getKey("Wild White Hair"), "probability":900},
        {"hash":getKey("Spots"), "probability":900},
        {"hash":getKey("Frumpy Hair"), "probability":900},
        {"hash":getKey("Nerd Glasses"), "probability":900},
        {"hash":getKey("Tiara"), "probability":900},
        {"hash":getKey("Orange Side"), "probability":900},
        {"hash":getKey("Red Mohawk"), "probability":900},
        {"hash":getKey("Messy Hair"), "probability":900},
        {"hash":getKey("Clown Eyes Blue"), "probability":900},
        {"hash":getKey("Pipe"), "probability":900},
        {"hash":getKey("Wild Hair"), "probability":900},
        {"hash":getKey("Purple Eye Shadow"), "probability":900},
        {"hash":getKey("Stringy Hair"), "probability":900},
        {"hash":getKey("Dark Hair"), "probability":900},
        {"hash":getKey("Eye Patch"), "probability":900},
        {"hash":getKey("Blonde Short"), "probability":900},
        {"hash":getKey("Classic Shades"), "probability":900},
        {"hash":getKey("Eye Mask"), "probability":900},
        {"hash":getKey("Clown Hair Green"), "probability":900},
        {"hash":getKey("Cap"), "probability":900},
        {"hash":getKey("Medical Mask"), "probability":900},
        {"hash":getKey("Bandana"), "probability":900},
        {"hash":getKey("Purple Lipstick"), "probability":900},
        {"hash":getKey("Clown Nose"), "probability":900},
        {"hash":getKey("Headband"), "probability":900},
        {"hash":getKey("Pigtails"), "probability":900},
        {"hash":getKey("Straight Hair Blonde"), "probability":900},
        {"hash":getKey("Knitted Cap"), "probability":900},
        {"hash":getKey("Clown Eyes Green"), "probability":900},
        {"hash":getKey("Cigarette"), "probability":900},
        {"hash":getKey("Welding Goggles"), "probability":900},
        {"hash":getKey("Mohawk Thin"), "probability":900},
        {"hash":getKey("Gold Chain"), "probability":900},
        {"hash":getKey("VR"), "probability":900},
        {"hash":getKey("Vape"), "probability":900},
        {"hash":getKey("Pink With Hat"), "probability":900},
        {"hash":getKey("Blonde Bob"), "probability":900},
        {"hash":getKey("Mohawk"), "probability":900},
        {"hash":getKey("Big Shades"), "probability":900},
        {"hash":getKey("Earring"), "probability":900},
        {"hash":getKey("Green Eye Shadow"), "probability":900},
        {"hash":getKey("Straight Hair"), "probability":900},
        {"hash":getKey("Rosy Cheeks"), "probability":900},
        {"hash":getKey("Half Shaved"), "probability":900},
        {"hash":getKey("Mohawk Dark"), "probability":900},
        {"hash":getKey("Black Lipstick"), "probability":900},
        {"hash":getKey("Horned Rim Glasses"), "probability":900},
        {"hash":getKey("Silver Chain"), "probability":900},
        {"hash":getKey("Stogie"), "probability":900},
        {"hash":getKey("Earphone"), "probability":900},
        {"hash":getKey("Employee Cap"), "probability":900},
        {"hash":getKey("Headphones"), "probability":900},
        {"hash":getKey("Headphones Red"), "probability":900},
        {"hash":getKey("Headphones Yellow"), "probability":900},
        {"hash":getKey("Gas Mask"), "probability":900},
        {"hash":getKey("Goggles"), "probability":900},
        {"hash":getKey("Pen"), "probability":900},
        {"hash":getKey("Pencil"), "probability":900},
        {"hash":getKey("Red Hat"), "probability":900},
        {"hash":getKey("Yellow Hat"), "probability":900},
        {"hash":getKey("White Hat"), "probability":900},
        {"hash":getKey("Suit"), "probability":900},
        {"hash":getKey("Suit Black"), "probability":900}


      ];

      await id.setConfig(
        srare,
          base,
          large,
          small,
          100000
      );

      /*


       */




    });


  })


});

const PB_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"},{"indexed":false,"internalType":"uint32","name":"","type":"uint32"},{"indexed":false,"internalType":"string","name":"","type":"string"}],"name":"NewBlock","type":"event"},{"inputs":[],"name":"abort","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"blockL","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"blockS","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"blockToLayer","outputs":[{"internalType":"enum PunkBlocks.Layer","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"blocksInfo","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fromID","type":"uint256"},{"internalType":"uint256","name":"_count","type":"uint256"}],"name":"getBlocks","outputs":[{"components":[{"internalType":"enum PunkBlocks.Layer","name":"layer","type":"uint8"},{"internalType":"bytes","name":"blockL","type":"bytes"},{"internalType":"bytes","name":"blockS","type":"bytes"}],"internalType":"struct PunkBlocks.Block[]","name":"","type":"tuple[]"},{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"","type":"uint32"}],"name":"index","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_id","type":"bytes32"}],"name":"info","outputs":[{"internalType":"enum PunkBlocks.Layer","name":"","type":"uint8"},{"internalType":"uint16","name":"","type":"uint16"},{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextConfigId","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextId","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"","type":"uint32"},{"internalType":"enum PunkBlocks.Layer","name":"","type":"uint8"}],"name":"orderConfig","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"_dataL","type":"bytes"},{"internalType":"bytes","name":"_dataS","type":"bytes"},{"internalType":"uint8","name":"_layer","type":"uint8"},{"internalType":"string","name":"_name","type":"string"}],"name":"registerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"enum PunkBlocks.Layer[]","name":"_order","type":"uint8[]"}],"name":"registerOrderConfig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"seal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32[]","name":"_ids","type":"uint32[]"},{"internalType":"uint16","name":"_x","type":"uint16"},{"internalType":"uint16","name":"_y","type":"uint16"},{"internalType":"uint16","name":"_size","type":"uint16"},{"internalType":"uint32","name":"_orderID","type":"uint32"}],"name":"svgFromIDs","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32[]","name":"_attributeKeys","type":"bytes32[]"},{"internalType":"uint16","name":"_x","type":"uint16"},{"internalType":"uint16","name":"_y","type":"uint16"},{"internalType":"uint16","name":"_size","type":"uint16"},{"internalType":"uint32","name":"_orderID","type":"uint32"}],"name":"svgFromKeys","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string[]","name":"_attributeNames","type":"string[]"},{"internalType":"uint16","name":"_x","type":"uint16"},{"internalType":"uint16","name":"_y","type":"uint16"},{"internalType":"uint16","name":"_size","type":"uint16"},{"internalType":"uint32","name":"_orderID","type":"uint32"}],"name":"svgFromNames","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenID","type":"uint256"},{"internalType":"uint16","name":"_x","type":"uint16"},{"internalType":"uint16","name":"_y","type":"uint16"},{"internalType":"uint16","name":"_size","type":"uint16"},{"internalType":"uint32","name":"_orderID","type":"uint32"}],"name":"svgFromPunkID","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"toString","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"}];
const PB_ADDRESS = "0xe91Eb909203c8C8cAd61f86fc44EDeE9023bdA4D";
