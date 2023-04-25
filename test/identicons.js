const {expect} = require("chai");
const {ContractFactory, utils, BigNumber} = require('ethers');
const crypto = require("crypto");

let owner, simp, elizabeth;

describe("Identicons", function () {
    let pb;
    let Identicons, id
    before(async function () {
        /*
        PunkBlocks = await ethers.getContractFactory("PunkBlocks");
        blocks = await PunkBlocks.deploy();
        await blocks.deployed();
    */
        [owner, simp, elizabeth] = await ethers.getSigners();

        pb = await hre.ethers.getContractAt(PB_ABI, PB_ADDRESS);

        Identicons = await ethers.getContractFactory("Identicons");
        id = await Identicons.deploy();
        await id.deployed();

        let Factory = await ethers.getContractFactory("FactoryPunks2");
        await Factory.deploy(PB_ADDRESS);

    });

    describe("TestRender", function () {

        // uncomment if running on mainnet to test svgFromPunkID
        it("Set Config", async function () {


            let getKey = function (s) {
                return ethers.utils.keccak256(ethers.utils.hexlify(ethers.utils.toUtf8Bytes((s))))
            }

            let srare = [
                //
                {"hash": getKey("Alien 3"), "sample": 5, "list" : 0},
                {"hash": getKey("Alienette 3"), "sample": 6, "list" : 0},
                {"hash": getKey("Killer Bot"), "sample": 7, "list" : 0},
                {"hash": getKey("Killer Botina"), "sample": 8, "list" : 0},
                {"hash": getKey("Green Alien"), "sample": 9, "list" : 0},
                {"hash": getKey("Green Alienette"), "sample": 10, "list" : 0},
                {"hash": getKey("Alien 4"), "sample": 11, "list" : 0},
                {"hash": getKey("Alienette 4"), "sample": 12, "list" : 0},
                {"hash": getKey("Alien 5"), "sample": 13, "list" : 0},
                {"hash": getKey("Alienette 5"), "sample": 14, "list" : 0},
                {"hash": getKey("Alien 6"), "sample": 15, "list" : 0},
                {"hash": getKey("Blue Ape"), "sample": 16, "list" : 0},
                {"hash": getKey("Alienette 6"), "sample": 17, "list" : 0}
            ];
            let base = [
                {"hash": getKey("Male 1"), "sample": 50000, "list" : 0},
                {"hash": getKey("Male 2"), "sample": 50000, "list" : 0},
                {"hash": getKey("Male 3"), "sample": 50000, "list" : 0},
                {"hash": getKey("Male 4"), "sample": 50000, "list" : 0},
                {"hash": getKey("Female 1"), "sample": 50000, "list" : 0},
                {"hash": getKey("Female 2"), "sample": 50000, "list" : 0},
                {"hash": getKey("Female 3"), "sample": 50000, "list" : 0},
                {"hash": getKey("Female 4"), "sample": 50000, "list" : 0},
                {"hash": getKey("Zombie"), "sample": 50000, "list" : 0},
                {"hash": getKey("Ape"), "sample": 50000, "list" : 0},
                {"hash": getKey("Alien"), "sample": 50000, "list" : 0},
                {"hash": getKey("Bot"), "sample": 50000, "list" : 0},
                {"hash": getKey("Botina"), "sample": 50000, "list" : 0},
                {"hash": getKey("Alientina"), "sample": 50000, "list" : 0},
                {"hash": getKey("Zombina"), "sample": 50000, "list" : 0},
                {"hash": getKey("Male 5"), "sample": 50000, "list" : 0},
                {"hash": getKey("Male 6"), "sample": 50000, "list" : 0},
                {"hash": getKey("Male 7"), "sample": 50000, "list" : 0},
                {"hash": getKey("Female 5"), "sample": 50000, "list" : 0},
                {"hash": getKey("Female 6"), "sample": 50000, "list" : 0},
                {"hash": getKey("Female 7"), "sample": 50000, "list" : 0},
                {"hash": getKey("Pink Ape"), "sample": 50000, "list" : 0},
                {"hash": getKey("Alien 2"), "sample": 50000, "list" : 0},
                {"hash": getKey("Alienette 2"), "sample": 50000, "list" : 0},
            ];
            let large = [
                {"hash": getKey("Rosy Cheeks"), "sample": 50000, "list" : 0},
                {"hash": getKey("Luxurious Beard"), "sample": 11000, "list" : 0},
                {"hash": getKey("Clown Hair Green"), "sample": 8333, "list" : 0},
                {"hash": getKey("Mohawk Dark"), "sample": 4290, "list" : 9},
                {"hash": getKey("Cowboy Hat"), "sample": 2500, "list" : 9},
                {"hash": getKey("Mustache"), "sample": 2880, "list" : 0},
                {"hash": getKey("Clown Nose"), "sample": 5000, "list" : 0},
                {"hash": getKey("Cigarette"), "sample": 9610, "list" : 0},
                {"hash": getKey("Nerd Glasses"), "sample": 5720, "list" : 0},
                {"hash": getKey("Regular Shades"), "sample": 5270, "list" : 0},
                {"hash": getKey("Knitted Cap"), "sample": 4190, "list" : 9},
                {"hash": getKey("Shadow Beard"), "sample": 8260, "list" : 0},
                {"hash": getKey("Frown"), "sample": 33333, "list" : 0},
                {"hash": getKey("Cap Forward"), "sample": 2540, "list" : 9},
                {"hash": getKey("Goat"), "sample": 15000, "list" : 0},
                {"hash": getKey("Mole"), "sample": 50000, "list" : 0},
                {"hash": getKey("Purple Hair"), "sample": 8333, "list" : 0}, // h
                {"hash": getKey("Small Shades"), "sample": 3780, "list" : 0},
                {"hash": getKey("Shaved Head"), "sample": 8333, "list" : 0}, //h
                {"hash": getKey("Classic Shades"), "sample": 5020, "list" : 0},
                {"hash": getKey("Vape"), "sample": 2720, "list" : 0},
                {"hash": getKey("Silver Chain"), "sample": 50000, "list" : 0},
                {"hash": getKey("Smile"), "sample": 33333, "list" : 0},
                {"hash": getKey("Big Shades"), "sample": 5350, "list" : 0},
                {"hash": getKey("Mohawk Thin"), "sample": 4410, "list" : 9},
                {"hash": getKey("Beanie"), "sample": 4400, "list" : 9},
                {"hash": getKey("Cap"), "sample": 8510, "list" : 9},
                {"hash": getKey("Clown Eyes Green"), "sample": 25000, "list" : 0},
                {"hash": getKey("Normal Beard Black"), "sample": 2890, "list" : 0},
                {"hash": getKey("Medical Mask"), "sample": 1750, "list" : 0},
                {"hash": getKey("Normal Beard"), "sample": 2890, "list" : 0},
                {"hash": getKey("VR"), "sample": 3320, "list" : 0},
                {"hash": getKey("Eye Patch"), "sample": 4610, "list" : 0},
                {"hash": getKey("Wild Hair"), "sample": 8333, "list" : 0}, // h
                {"hash": getKey("Top Hat"), "sample": 1150, "list" : 9},
                {"hash": getKey("Bandana"), "sample": 8333, "list" : 0}, // h
                {"hash": getKey("Handlebars"), "sample": 8888, "list" : 0},
                {"hash": getKey("Frumpy Hair"), "sample": 8333, "list" : 0}, // h
                {"hash": getKey("Crazy Hair"), "sample": 8333, "list" : 0}, // h
                {"hash": getKey("Police Cap"), "sample": 2030, "list" : 9},
                {"hash": getKey("Buck Teeth"), "sample": 33333, "list" : 0},
                {"hash": getKey("Do-rag"), "sample": 8333, "list" : 0},
                {"hash": getKey("Front Beard"), "sample": 2730, "list" : 0},
                {"hash": getKey("Spots"), "sample": 20000, "list" : 0},
                {"hash": getKey("Big Beard"), "sample": 1460, "list" : 0},
                {"hash": getKey("Vampire Hair"), "sample": 8333, "list" : 0}, // h
                {"hash": getKey("Peak Spike"), "sample": 8333, "list" : 0}, // h
                {"hash": getKey("Chinstrap"), "sample": 15000, "list" : 0},
                {"hash": getKey("Fedora"), "sample": 1860, "list" : 9},
                {"hash": getKey("Earring"), "sample": 50000, "list" : 0},
                {"hash": getKey("Horned Rim Glasses"), "sample": 5350, "list" : 0},
                {"hash": getKey("Headband"), "sample": 8333, "list" : 9}, // h
                {"hash": getKey("Pipe"), "sample": 3170, "list" : 0},
                {"hash": getKey("Messy Hair"), "sample": 8333, "list" : 0}, // h
                {"hash": getKey("Front Beard Dark"), "sample": 2600, "list" : 0},
                {"hash": getKey("Hoodie"), "sample": 8333, "list" : 0}, // h
                {"hash": getKey("Gold Chain"), "sample": 50000, "list" : 0},
                {"hash": getKey("Muttonchops"), "sample": 15000, "list" : 0},
                {"hash": getKey("Stringy Hair"), "sample": 8333, "list" : 0}, // h
                {"hash": getKey("Eye Mask"), "sample": 2930, "list" : 0},
                {"hash": getKey("3D Glasses"), "sample": 15000, "list" : 0},
                {"hash": getKey("Clown Eyes Blue"), "sample": 25000, "list" : 0},
                {"hash": getKey("Mohawk"), "sample": 4410, "list" : 9},
                {"hash": getKey("Stogie"), "sample": 50000, "list" : 0},
                {"hash": getKey("Earphone"), "sample": 30000, "list" : 0},
                {"hash": getKey("Employee Cap"), "sample": 30000, "list" : 0},
                {"hash": getKey("Headphones"), "sample": 20000, "list" : 0},
                {"hash": getKey("Headphones Red"), "sample": 15000, "list" : 0},
                {"hash": getKey("Headphones Yellow"), "sample": 12500, "list" : 0},
                {"hash": getKey("Gas Mask"), "sample": 15000, "list" : 0},
                {"hash": getKey("Goggles"), "sample": 33333, "list" : 0},
                {"hash": getKey("Pen"), "sample": 8000, "list" : 0},
                {"hash": getKey("Pencil"), "sample": 25000, "list" : 0},
                {"hash": getKey("Red Hat"), "sample": 25000, "list" : 9},
                {"hash": getKey("Yellow Hat"), "sample": 25000, "list" : 9},
                {"hash": getKey("White Hat"), "sample": 25000, "list" : 9},
                {"hash": getKey("Suit"), "sample": 15000, "list" : 0},
                {"hash": getKey("Suit Black"), "sample": 10000, "list" : 0}

            ];
            let small = [
                {"hash": getKey("Pilot Helmet"), "sample": 5400, "list" : 0},
                {"hash": getKey("Tassle Hat"), "sample": 3780, "list" : 0},
                {"hash": getKey("Hot Lipstick"), "sample": 33333, "list" : 0},
                {"hash": getKey("Blue Eye Shadow"), "sample": 25000, "list" : 0},
                {"hash": getKey("Straight Hair Dark"), "sample": 7123, "list" : 0},
                {"hash": getKey("Choker"), "sample": 50000, "list" : 0},
                {"hash": getKey("Crazy Hair"), "sample": 7123, "list" : 0},
                {"hash": getKey("Regular Shades"), "sample": 15270, "list" : 0},
                {"hash": getKey("Wild Blonde"), "sample": 7123, "list" : 0},
                {"hash": getKey("3D Glasses"), "sample": 15000, "list" : 0},
                {"hash": getKey("Mole"), "sample": 50000, "list" : 0},
                {"hash": getKey("Wild White Hair"), "sample": 7123, "list" : 0},
                {"hash": getKey("Spots"), "sample": 50000, "list" : 0},
                {"hash": getKey("Frumpy Hair"), "sample": 7123, "list" : 0},
                {"hash": getKey("Nerd Glasses"), "sample": 5720, "list" : 0},
                {"hash": getKey("Tiara"), "sample": 5500, "list" : 0},
                {"hash": getKey("Orange Side"), "sample": 7123, "list" : 0},
                {"hash": getKey("Red Mohawk"), "sample": 1470, "list" : 9},
                {"hash": getKey("Messy Hair"), "sample": 7123, "list" : 0},
                {"hash": getKey("Clown Eyes Blue"), "sample": 25000, "list" : 0},
                {"hash": getKey("Pipe"), "sample": 3170, "list" : 0},
                {"hash": getKey("Wild Hair"), "sample": 7123, "list" : 0},
                {"hash": getKey("Purple Eye Shadow"), "sample": 25000, "list" : 0},
                {"hash": getKey("Stringy Hair"), "sample": 7123, "list" : 0},
                {"hash": getKey("Dark Hair"), "sample": 7123, "list" : 0},
                {"hash": getKey("Eye Patch"), "sample": 4610, "list" : 0},
                {"hash": getKey("Blonde Short"), "sample": 7123, "list" : 0},
                {"hash": getKey("Classic Shades"), "sample": 9000, "list" : 0},
                {"hash": getKey("Eye Mask"), "sample": 9000, "list" : 0},
                {"hash": getKey("Clown Hair Green"), "sample": 7123, "list" : 0},
                {"hash": getKey("Cap"), "sample": 3510, "list" : 9},
                {"hash": getKey("Medical Mask"), "sample": 1750, "list" : 0},
                {"hash": getKey("Bandana"), "sample": 4810, "list" : 0},
                {"hash": getKey("Purple Lipstick"), "sample": 33333, "list" : 0},
                {"hash": getKey("Clown Nose"), "sample": 5000, "list" : 0},
                {"hash": getKey("Headband"), "sample": 7123, "list" : 0},
                {"hash": getKey("Pigtails"), "sample": 7123, "list" : 0},
                {"hash": getKey("Straight Hair Blonde"), "sample": 7123, "list" : 0},
                {"hash": getKey("Knitted Cap"), "sample": 4190, "list" : 9},
                {"hash": getKey("Clown Eyes Green"), "sample": 25000, "list" : 0},
                {"hash": getKey("Cigarette"), "sample": 9610, "list" : 0},
                {"hash": getKey("Welding Goggles"), "sample": 7123, "list" : 0},
                {"hash": getKey("Mohawk Thin"), "sample": 4410, "list" : 9},
                {"hash": getKey("Gold Chain"), "sample": 50000, "list" : 0},
                {"hash": getKey("VR"), "sample": 3320, "list" : 0},
                {"hash": getKey("Vape"), "sample": 2720, "list" : 0},
                {"hash": getKey("Pink With Hat"), "sample": 7123, "list" : 0},
                {"hash": getKey("Blonde Bob"), "sample": 7123, "list" : 0},
                {"hash": getKey("Mohawk"), "sample": 4410, "list" : 9},
                {"hash": getKey("Big Shades"), "sample": 5350, "list" : 0},
                {"hash": getKey("Earring"), "sample": 50000, "list" : 0},
                {"hash": getKey("Green Eye Shadow"), "sample": 25000, "list" : 0},
                {"hash": getKey("Straight Hair"), "sample": 7123, "list" : 0}, // h
                {"hash": getKey("Rosy Cheeks"), "sample": 50000, "list" : 0},
                {"hash": getKey("Half Shaved"), "sample": 7123, "list" : 0}, // h
                {"hash": getKey("Mohawk Dark"), "sample": 4290, "list" : 9},
                {"hash": getKey("Black Lipstick"), "sample": 33333, "list" : 0},
                {"hash": getKey("Horned Rim Glasses"), "sample": 5350, "list" : 0},
                {"hash": getKey("Silver Chain"), "sample": 50000, "list" : 0},
                {"hash": getKey("Stogie"), "sample": 50000, "list" : 0},
                {"hash": getKey("Earphone"), "sample": 33333, "list" : 0},
                {"hash": getKey("Employee Cap"), "sample": 33333, "list" : 9},
                {"hash": getKey("Headphones"), "sample": 20000, "list" : 0},
                {"hash": getKey("Headphones Red"), "sample": 15000, "list" : 0},
                {"hash": getKey("Headphones Yellow"), "sample": 12500, "list" : 0},
                {"hash": getKey("Gas Mask"), "sample": 15000, "list" : 0},
                {"hash": getKey("Goggles"), "sample": 33333, "list" : 0},
                {"hash": getKey("Pen"), "sample": 8000, "list" : 0},
                {"hash": getKey("Pencil"), "sample": 25000, "list" : 0},
                {"hash": getKey("Red Hat"), "sample": 25000, "list" : 9},
                {"hash": getKey("Yellow Hat"), "sample": 25000, "list" : 9},
                {"hash": getKey("White Hat"), "sample": 25000, "list" : 9},
                {"hash": getKey("Suit"), "sample": 15000, "list" : 0},
                {"hash": getKey("Suit Black"), "sample": 10000, "list" : 0}


            ];

            await id.setConfig(
                srare,
                base,
                large,
                small,
                100000
            );
            let punk = await id.generate(owner.address, 0, 0, 240, 0);
            console.log(punk);

        });

        const fs = require('fs');
        //0xf39Fd6e51aad88F6F4ce6aB8827279cffFb922661
        it("generate some punks", async function () {

            var crypto = require("crypto");

            let getKey = function (s) {
                return ethers.utils.keccak256(ethers.utils.hexlify(ethers.utils.toUtf8Bytes((s))))
            }

            let all = {};

           // return;
            for (let i =0; i<10000; i++) {
                let key = crypto.randomBytes(20).toString('hex');
                let punk = await id.generate(key, 0, 0, 0, 240);
                //console.log(punk);

                let testing = getKey(punk);

                if (all.hasOwnProperty(testing)) {
                    console.log("DUPLICATE! "+i);
                }

                all[testing] = true;

                fs.writeFile('./punk'+i+'.svg', punk, err => {
                    if (err) {
                        console.error(err);
                    }
                    // file written successfully
                });

                const sleep = time => new Promise(res => setTimeout(res, time, "done sleeping"));

// using native promises
                sleep(100).then(msg => true);

            }
            //console.log(all)

        });


    });


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
