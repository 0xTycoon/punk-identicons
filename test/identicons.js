const {expect} = require("chai");
const {ContractFactory, utils, BigNumber} = require('ethers');


describe("Identicons", function () {
    let pb;
    let Identicons, id
    before(async function () {
        /*
        PunkBlocks = await ethers.getContractFactory("PunkBlocks");
        blocks = await PunkBlocks.deploy();
        await blocks.deployed();
    */
        pb = await hre.ethers.getContractAt(PB_ABI, PB_ADDRESS);

        Identicons = await ethers.getContractFactory("Identicons");
        id = await Identicons.deploy();
        await id.deployed();

    });

    describe("TestRender", function () {

        // uncomment if running on mainnet to test svgFromPunkID
        it("Set Config", async function () {


            let getKey = function (s) {
                return ethers.utils.keccak256(ethers.utils.hexlify(ethers.utils.toUtf8Bytes((s))))
            }

            let srare = [
                {"hash": getKey("Bot"), "sample": 900},
                {"hash": getKey("Botina"), "sample": 900},
                {"hash": getKey("Killer Bot"), "sample": 900},
                {"hash": getKey("Killer Botina"), "sample": 900},
                {"hash": getKey("Green Alien"), "sample": 900},
                {"hash": getKey("Green Alienette"), "sample": 900},
                {"hash": getKey("Blue Ape"), "sample": 900},
                {"hash": getKey("Alien 2"), "sample": 900},
                {"hash": getKey("Alien 3"), "sample": 900},
                {"hash": getKey("Alien 4"), "sample": 900},
                {"hash": getKey("Alien 5"), "sample": 900},
                {"hash": getKey("Alien 6"), "sample": 900}
            ];
            let base = [
                {"hash": getKey("Male 1"), "sample": 50000},
                {"hash": getKey("Male 2"), "sample": 50000},
                {"hash": getKey("Male 3"), "sample": 50000},
                {"hash": getKey("Male 4"), "sample": 50000},
                {"hash": getKey("Female 1"), "sample": 50000},
                {"hash": getKey("Female 2"), "sample": 50000},
                {"hash": getKey("Female 3"), "sample": 50000},
                {"hash": getKey("Female 4"), "sample": 50000},
                {"hash": getKey("Zombie"), "sample": 50000},
                {"hash": getKey("Ape"), "sample": 50000},
                {"hash": getKey("Alien"), "sample": 50000}
            ];
            let large = [{"hash": getKey("Rosy Cheeks"), "sample": 900},
                {"hash": getKey("Rosy Cheeks"), "sample": 900},
                {"hash": getKey("Luxurious Beard"), "sample": 900},
                {"hash": getKey("Clown Hair Green"), "sample": 900},
                {"hash": getKey("Mohawk Dark"), "sample": 900},
                {"hash": getKey("Cowboy Hat"), "sample": 900},
                {"hash": getKey("Mustache"), "sample": 900},
                {"hash": getKey("Clown Nose"), "sample": 900},
                {"hash": getKey("Cigarette"), "sample": 900},
                {"hash": getKey("Nerd Glasses"), "sample": 900},
                {"hash": getKey("Regular Shades"), "sample": 900},
                {"hash": getKey("Knitted Cap"), "sample": 900},
                {"hash": getKey("Shadow Beard"), "sample": 900},
                {"hash": getKey("Frown"), "sample": 900},
                {"hash": getKey("Cap Forward"), "sample": 900},
                {"hash": getKey("Goat"), "sample": 900},
                {"hash": getKey("Mole"), "sample": 900},
                {"hash": getKey("Purple Hair"), "sample": 900},
                {"hash": getKey("Small Shades"), "sample": 900},
                {"hash": getKey("Shaved Head"), "sample": 900},
                {"hash": getKey("Classic Shades"), "sample": 900},
                {"hash": getKey("Vape"), "sample": 900},
                {"hash": getKey("Silver Chain"), "sample": 900},
                {"hash": getKey("Smile"), "sample": 900},
                {"hash": getKey("Big Shades"), "sample": 900},
                {"hash": getKey("Mohawk Thin"), "sample": 900},
                {"hash": getKey("Beanie"), "sample": 900},
                {"hash": getKey("Cap"), "sample": 900},
                {"hash": getKey("Clown Eyes Green"), "sample": 900},
                {"hash": getKey("Normal Beard Black"), "sample": 900},
                {"hash": getKey("Medical Mask"), "sample": 900},
                {"hash": getKey("Normal Beard"), "sample": 900},
                {"hash": getKey("VR"), "sample": 900},
                {"hash": getKey("Eye Patch"), "sample": 900},
                {"hash": getKey("Wild Hair"), "sample": 900},
                {"hash": getKey("Top Hat"), "sample": 900},
                {"hash": getKey("Bandana"), "sample": 900},
                {"hash": getKey("Handlebars"), "sample": 900},
                {"hash": getKey("Frumpy Hair"), "sample": 900},
                {"hash": getKey("Crazy Hair"), "sample": 900},
                {"hash": getKey("Police Cap"), "sample": 900},
                {"hash": getKey("Buck Teeth"), "sample": 900},
                {"hash": getKey("Do-rag"), "sample": 900},
                {"hash": getKey("Front Beard"), "sample": 900},
                {"hash": getKey("Spots"), "sample": 900},
                {"hash": getKey("Big Beard"), "sample": 900},
                {"hash": getKey("Vampire Hair"), "sample": 900},
                {"hash": getKey("Peak Spike"), "sample": 900},
                {"hash": getKey("Chinstrap"), "sample": 900},
                {"hash": getKey("Fedora"), "sample": 900},
                {"hash": getKey("Earring"), "sample": 900},
                {"hash": getKey("Horned Rim Glasses"), "sample": 900},
                {"hash": getKey("Headband"), "sample": 900},
                {"hash": getKey("Pipe"), "sample": 900},
                {"hash": getKey("Messy Hair"), "sample": 900},
                {"hash": getKey("Front Beard Dark"), "sample": 900},
                {"hash": getKey("Hoodie"), "sample": 900},
                {"hash": getKey("Gold Chain"), "sample": 900},
                {"hash": getKey("Muttonchops"), "sample": 900},
                {"hash": getKey("Stringy Hair"), "sample": 900},
                {"hash": getKey("Eye Mask"), "sample": 900},
                {"hash": getKey("3D Glasses"), "sample": 900},
                {"hash": getKey("Clown Eyes Blue"), "sample": 900},
                {"hash": getKey("Mohawk"), "sample": 900},
                {"hash": getKey("Stogie"), "sample": 900},
                {"hash": getKey("Earphone"), "sample": 900},
                {"hash": getKey("Employee Cap"), "sample": 900},
                {"hash": getKey("Headphones"), "sample": 900},
                {"hash": getKey("Headphones Red"), "sample": 900},
                {"hash": getKey("Headphones Yellow"), "sample": 900},
                {"hash": getKey("Gas Mask"), "sample": 900},
                {"hash": getKey("Goggles"), "sample": 900},
                {"hash": getKey("Pen"), "sample": 900},
                {"hash": getKey("Pencil"), "sample": 900},
                {"hash": getKey("Red Hat"), "sample": 900},
                {"hash": getKey("Yellow Hat"), "sample": 900},
                {"hash": getKey("White Hat"), "sample": 900},
                {"hash": getKey("Suit"), "sample": 900},
                {"hash": getKey("Suit Black"), "sample": 900}

            ];
            let small = [{"hash": getKey("Pilot Helmet"), "sample": 900},
                {"hash": getKey("Pilot Helmet"), "sample": 900},
                {"hash": getKey("Tassle Hat"), "sample": 900},
                {"hash": getKey("Hot Lipstick"), "sample": 900},
                {"hash": getKey("Blue Eye Shadow"), "sample": 900},
                {"hash": getKey("Straight Hair Dark"), "sample": 900},
                {"hash": getKey("Choker"), "sample": 900},
                {"hash": getKey("Crazy Hair"), "sample": 900},
                {"hash": getKey("Regular Shades"), "sample": 900},
                {"hash": getKey("Wild Blonde"), "sample": 900},
                {"hash": getKey("3D Glasses"), "sample": 900},
                {"hash": getKey("Mole"), "sample": 900},
                {"hash": getKey("Wild White Hair"), "sample": 900},
                {"hash": getKey("Spots"), "sample": 900},
                {"hash": getKey("Frumpy Hair"), "sample": 900},
                {"hash": getKey("Nerd Glasses"), "sample": 900},
                {"hash": getKey("Tiara"), "sample": 900},
                {"hash": getKey("Orange Side"), "sample": 900},
                {"hash": getKey("Red Mohawk"), "sample": 900},
                {"hash": getKey("Messy Hair"), "sample": 900},
                {"hash": getKey("Clown Eyes Blue"), "sample": 900},
                {"hash": getKey("Pipe"), "sample": 900},
                {"hash": getKey("Wild Hair"), "sample": 900},
                {"hash": getKey("Purple Eye Shadow"), "sample": 900},
                {"hash": getKey("Stringy Hair"), "sample": 900},
                {"hash": getKey("Dark Hair"), "sample": 900},
                {"hash": getKey("Eye Patch"), "sample": 900},
                {"hash": getKey("Blonde Short"), "sample": 900},
                {"hash": getKey("Classic Shades"), "sample": 900},
                {"hash": getKey("Eye Mask"), "sample": 900},
                {"hash": getKey("Clown Hair Green"), "sample": 900},
                {"hash": getKey("Cap"), "sample": 900},
                {"hash": getKey("Medical Mask"), "sample": 900},
                {"hash": getKey("Bandana"), "sample": 900},
                {"hash": getKey("Purple Lipstick"), "sample": 900},
                {"hash": getKey("Clown Nose"), "sample": 900},
                {"hash": getKey("Headband"), "sample": 900},
                {"hash": getKey("Pigtails"), "sample": 900},
                {"hash": getKey("Straight Hair Blonde"), "sample": 900},
                {"hash": getKey("Knitted Cap"), "sample": 900},
                {"hash": getKey("Clown Eyes Green"), "sample": 900},
                {"hash": getKey("Cigarette"), "sample": 900},
                {"hash": getKey("Welding Goggles"), "sample": 900},
                {"hash": getKey("Mohawk Thin"), "sample": 900},
                {"hash": getKey("Gold Chain"), "sample": 900},
                {"hash": getKey("VR"), "sample": 900},
                {"hash": getKey("Vape"), "sample": 900},
                {"hash": getKey("Pink With Hat"), "sample": 900},
                {"hash": getKey("Blonde Bob"), "sample": 900},
                {"hash": getKey("Mohawk"), "sample": 900},
                {"hash": getKey("Big Shades"), "sample": 900},
                {"hash": getKey("Earring"), "sample": 900},
                {"hash": getKey("Green Eye Shadow"), "sample": 900},
                {"hash": getKey("Straight Hair"), "sample": 900},
                {"hash": getKey("Rosy Cheeks"), "sample": 900},
                {"hash": getKey("Half Shaved"), "sample": 900},
                {"hash": getKey("Mohawk Dark"), "sample": 900},
                {"hash": getKey("Black Lipstick"), "sample": 900},
                {"hash": getKey("Horned Rim Glasses"), "sample": 900},
                {"hash": getKey("Silver Chain"), "sample": 900},
                {"hash": getKey("Stogie"), "sample": 900},
                {"hash": getKey("Earphone"), "sample": 900},
                {"hash": getKey("Employee Cap"), "sample": 900},
                {"hash": getKey("Headphones"), "sample": 900},
                {"hash": getKey("Headphones Red"), "sample": 900},
                {"hash": getKey("Headphones Yellow"), "sample": 900},
                {"hash": getKey("Gas Mask"), "sample": 900},
                {"hash": getKey("Goggles"), "sample": 900},
                {"hash": getKey("Pen"), "sample": 900},
                {"hash": getKey("Pencil"), "sample": 900},
                {"hash": getKey("Red Hat"), "sample": 900},
                {"hash": getKey("Yellow Hat"), "sample": 900},
                {"hash": getKey("White Hat"), "sample": 900},
                {"hash": getKey("Suit"), "sample": 900},
                {"hash": getKey("Suit Black"), "sample": 900}


            ];

            await id.setConfig(
                srare,
                base,
                large,
                small,
                100000
            );

        });


    })


});

const PB_ABI = [{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
    }, {
        "indexed": false,
        "internalType": "string",
        "name": "",
        "type": "string"
    }],
    "name": "NewBlock",
    "type": "event"
}, {
    "inputs": [],
    "name": "abort",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
    "name": "blockL",
    "outputs": [{"internalType": "bytes", "name": "", "type": "bytes"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
    "name": "blockS",
    "outputs": [{"internalType": "bytes", "name": "", "type": "bytes"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "blockToLayer",
    "outputs": [{
        "internalType": "enum PunkBlocks.Layer",
        "name": "",
        "type": "uint8"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
    "name": "blocksInfo",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_fromID",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "_count", "type": "uint256"}],
    "name": "getBlocks",
    "outputs": [{
        "components": [{
            "internalType": "enum PunkBlocks.Layer",
            "name": "layer",
            "type": "uint8"
        }, {
            "internalType": "bytes",
            "name": "blockL",
            "type": "bytes"
        }, {"internalType": "bytes", "name": "blockS", "type": "bytes"}],
        "internalType": "struct PunkBlocks.Block[]",
        "name": "",
        "type": "tuple[]"
    }, {"internalType": "uint32", "name": "", "type": "uint32"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint32", "name": "", "type": "uint32"}],
    "name": "index",
    "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes32", "name": "_id", "type": "bytes32"}],
    "name": "info",
    "outputs": [{
        "internalType": "enum PunkBlocks.Layer",
        "name": "",
        "type": "uint8"
    }, {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
    }, {"internalType": "uint16", "name": "", "type": "uint16"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "nextConfigId",
    "outputs": [{"internalType": "uint32", "name": "", "type": "uint32"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "nextId",
    "outputs": [{"internalType": "uint32", "name": "", "type": "uint32"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
    }, {"internalType": "enum PunkBlocks.Layer", "name": "", "type": "uint8"}],
    "name": "orderConfig",
    "outputs": [{"internalType": "uint16", "name": "", "type": "uint16"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "bytes",
        "name": "_dataL",
        "type": "bytes"
    }, {
        "internalType": "bytes",
        "name": "_dataS",
        "type": "bytes"
    }, {
        "internalType": "uint8",
        "name": "_layer",
        "type": "uint8"
    }, {"internalType": "string", "name": "_name", "type": "string"}],
    "name": "registerBlock",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "enum PunkBlocks.Layer[]",
        "name": "_order",
        "type": "uint8[]"
    }],
    "name": "registerOrderConfig",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "seal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint32[]",
        "name": "_ids",
        "type": "uint32[]"
    }, {
        "internalType": "uint16",
        "name": "_x",
        "type": "uint16"
    }, {
        "internalType": "uint16",
        "name": "_y",
        "type": "uint16"
    }, {
        "internalType": "uint16",
        "name": "_size",
        "type": "uint16"
    }, {"internalType": "uint32", "name": "_orderID", "type": "uint32"}],
    "name": "svgFromIDs",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "bytes32[]",
        "name": "_attributeKeys",
        "type": "bytes32[]"
    }, {
        "internalType": "uint16",
        "name": "_x",
        "type": "uint16"
    }, {
        "internalType": "uint16",
        "name": "_y",
        "type": "uint16"
    }, {
        "internalType": "uint16",
        "name": "_size",
        "type": "uint16"
    }, {"internalType": "uint32", "name": "_orderID", "type": "uint32"}],
    "name": "svgFromKeys",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "string[]",
        "name": "_attributeNames",
        "type": "string[]"
    }, {
        "internalType": "uint16",
        "name": "_x",
        "type": "uint16"
    }, {
        "internalType": "uint16",
        "name": "_y",
        "type": "uint16"
    }, {
        "internalType": "uint16",
        "name": "_size",
        "type": "uint16"
    }, {"internalType": "uint32", "name": "_orderID", "type": "uint32"}],
    "name": "svgFromNames",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_tokenID",
        "type": "uint256"
    }, {
        "internalType": "uint16",
        "name": "_x",
        "type": "uint16"
    }, {
        "internalType": "uint16",
        "name": "_y",
        "type": "uint16"
    }, {
        "internalType": "uint16",
        "name": "_size",
        "type": "uint16"
    }, {"internalType": "uint32", "name": "_orderID", "type": "uint32"}],
    "name": "svgFromPunkID",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "value", "type": "uint256"}],
    "name": "toString",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "pure",
    "type": "function"
}];
const PB_ADDRESS = "0xe91Eb909203c8C8cAd61f86fc44EDeE9023bdA4D";
