# Punk identicons

Punk identicons allow you to generate punks based on a random number.

Built on Punk-blocks, this contract implements a punk-picking function.

The generator contract (v0.0.2) is deployed to: [0xb7f596579cd5d9ade583c90477ef1b5e2d47359e](https://etherscan.io/address/0xb7f596579cd5d9ade583c90477ef1b5e2d47359e#code)


Punk Identicons are built on top of [Punk Blocks](https://github.com/0xTycoon/punk-blocks/) and are returned as SVG images.

Bonus feature: rare faces depending on the amount of leading zeros in the 160-bit random number.

## Why?



Use randomly generated punks from your wallet address to automatically identify each account. The screenshot is a mockup to show what I mean... Which one is better?

Before:

![Before](mm-example.png)

After:

![After](mm-example-new.png)

### Demo UI

[A demo UI has been deployed here](https://0xtycoon.github.io/punk-identicons/). View the source of the page to see how it's done (Using vanilla JS)

### Limitations

The generator does not check for duplicates. To reduce the possibility
of duplicates, add more traits and spread the probabilities of the traits
evenly. The function that calls the generator can also check for duplicates.

## Configuration

Use the `setConfig` to set a new configuration.

Example using ethers js.

The following example adds two super-rare faces, needing 7 or 8 leading zeros, 2 regular bases to choose from, 4 large traits to choose from, and 4 small trairs to chose from.

```javascript

let getKey = function (s) {
    return ethers.utils.keccak256(ethers.utils.hexlify(ethers.utils.toUtf8Bytes((s))));
}

let srare = [
    //
    {"hash": getKey("Killer Bot"), "sample": 7, "list" : 0},
    {"hash": getKey("Killer Botina"), "sample": 8, "list" : 0}
];


let base = [
    {"hash": getKey("Male 1"), "sample": 8000, "list" : 0},
    {"hash": getKey("Male 2"), "sample": 8000, "list" : 0}
];

let large = [
    {"hash": getKey("Rosy Cheeks"), "sample": 50000, "list" : 0},
    {"hash": getKey("Luxurious Beard"), "sample": 2860, "list" : 0},
    {"hash": getKey("Clown Hair Green"), "sample": 1480, "list" : 0},
    {"hash": getKey("Mohawk Dark"), "sample": 4290, "list" : 9}
];

let small = [
    {"hash": getKey("Pilot Helmet"), "sample": 540, "list" : 0},
    {"hash": getKey("Tassle Hat"), "sample": 1780, "list" : 0},
    {"hash": getKey("Hot Lipstick"), "sample": 33333, "list" : 0},
    {"hash": getKey("Blue Eye Shadow"), "sample": 2660, "list" : 0}];

await id.setConfig(
    srare,
    base,
    large,
    small,
    100000
);

```

See the web UI demo source code for a better example with more traits.

### Adding new traits

You can add new traits by using [Punk Blocks](https://github.com/0xTycoon/punk-blocks)

### Generate




#### Solidity Interface

```solidity
    /**
    * @dev generates a punk, picking traits using a random seed
    * @param _a the random seed
    * @param _cid the config id
    * @param _x the horizontal position of the SVG
    * @param _y the vertical position of the SVG
    * @param _size the width and height of the SVG
    * @return string of the punk svg generated
    */
    function generate(
        address _a,
        uint64 _cid,
        uint16 _x,
        uint16 _y,
        uint16 _size
    ) view external returns (string memory);

    /**
    * @dev picks a punk, picking traits using a random seed, returning the
    *   hashes of the seeds. Each hash represent a key for for a punk-block
    * @param _a the random seed
    * @param _cid the config id
    * @return bytes32[] representing the punk-block hashes.
    */
    function pick(
        address _a,
        uint64 _cid) view external returns (bytes32[] memory);
```

#### ethers js

```javascript
let punk = await id.generate(owner.address, 0, 0, 0, 240);
            console.log(punk);
```

### Address mining estimations


The super-rare faces are decided by the amount of leading zeros in front of
the random number given. If these were Ethereum addresses, here's how long
it would take to mine these:

(for a GPU based miner)

2^(4*N) hashes, where n is number of 0
(2^(4*14) / 350000000) seconds to years

N = number of leading zeros
350000000 = 350 Megahashes (MH)

17 = 26,722 years
16 = 1,670 years
15 = 104 years
14 = 6.5 years
13 = 0.4 years
12 = 1.3 weeks
11 = 14 hours
10 = 0.9 hours

The above is for 1 GPU. Someone with 1000 GPUs may
take significantly faster.