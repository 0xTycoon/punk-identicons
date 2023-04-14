// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// Uncomment this line to use console.log
import "hardhat/console.sol";

/**


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

*/

contract Identicons {
    IPunkBlocks pb = IPunkBlocks(0xe91Eb909203c8C8cAd61f86fc44EDeE9023bdA4D);
    struct Trait {
        bytes32 hash;
        uint128 sample;
        uint128 list;
    }
    struct Config {
        Trait[18] superRare;     // Rare base traits. Like a mapping, leadingZeros => Trait.
        Trait[] baseTraits;      // Base traits, male & female
        Trait[][13] largeTraits; // the "male" traits
        Trait[][13] smallTraits; // the "female" traits
        uint256 population;
    }
    uint64 nextConfigId;
    mapping (uint64 => Config) private cfg;
    constructor() {
    }

    function config(uint64 c) public returns (Config memory) {
        return cfg[c];
    }

    function setConfig(
        Trait[] calldata _superRare,
        Trait[] calldata _baseTraits,
        Trait[] calldata _largeTraits,
        Trait[] calldata _smallTraits,
        uint256 _population) external {
        uint256 info;
        Config storage c = cfg[nextConfigId];
        for (uint256 i = 0; i < _superRare.length; i++) {
            info = pb.blocksInfo(_superRare[i].hash);
            require(info > 0, "superare block not found");
            c.superRare[_superRare[i].sample] = _superRare[i]; // key by sample (leading zeros)
        }
        for (uint256 i = 0; i < _baseTraits.length; i++) {
            info = pb.blocksInfo(_baseTraits[i].hash);
            require(info > 0, "base block not found");
            c.baseTraits.push(_baseTraits[i]);
        }
        for (uint256 i = 0; i < _largeTraits.length; i++) {
            info = pb.blocksInfo(_largeTraits[i].hash);
            require(info > 0, "large block not found");
            if (_largeTraits[i].list > 0) {
                info = _largeTraits[i].list;                   // overwrite with a custom layer value
            }
            c.largeTraits[uint8(info)].push(_largeTraits[i]);
        }
        for (uint256 i = 0; i < _smallTraits.length; i++) {
            info = pb.blocksInfo(_smallTraits[i].hash);
            require(info > 0, "small block not found");
            if (_smallTraits[i].list > 0) {
                info = _smallTraits[i].list;                   // overwrite with a custom layer value
            }
            c.smallTraits[uint8(info)].push(_smallTraits[i]);
        }
        c.population = _population;
        nextConfigId++;
    }

    /**
    * Pick a base layer (male, female, zombie, ape, etc)
    * @param _entropy random value
    * @param _cid config id
    */
    function _pickBase(
        uint256 _entropy,
        uint64 _cid
    ) internal view returns (uint256 baseIndex) {
        uint256 size = cfg[_cid].baseTraits.length;
        uint16 i =  uint16(_uniform(_entropy, size));
        uint n;
        while (true) {
            n = _uniform(_entropy, cfg[_cid].population);
            if (cfg[_cid].baseTraits[i].sample >= n) {
                baseIndex = i;
                break;
            }
            i++;
            if (i == size) {
                i = 0; // wrap around, keep picking
            }
            _entropy = uint256(keccak256(abi.encodePacked(_entropy)));
        }
        return baseIndex;
    }

    function _pickLeadingZeros(
        uint160 _a,
        uint64 _cid) internal view returns (bytes32) {
        uint16 leadingZeros;
        uint offset = 4; // each hex char is 4 bytes
        while (_a >> 160 - offset == 0) { // count leading 0's
            leadingZeros++;
            offset+=4;
        }
        return cfg[_cid].superRare[leadingZeros].hash;
    }

    function generate(
        address _a,
        uint64 _cid) view external returns (string memory) {
        uint160 a = uint160(_a)+45; // headhones on hat

        bytes32[13] memory picks;
        picks[0] = _pickLeadingZeros(a, _cid);
        if (picks[0] == 0x0) {
            // pick a standard base, randomly
            picks[0] = cfg[_cid].baseTraits[_pickBase(a, _cid)].hash;
        }
        (, uint256 n, ) = pb.info(picks[0]);
        uint256 i = _uniform(a, 13);
        uint256 rolls;
        Trait[][13] storage pool;

        if (n > 0) {
            pool = cfg[_cid].largeTraits;
        } else {
            pool = cfg[_cid].smallTraits;
        }
        uint256 j;
        while (true) {
            console.log("i:", i, "len:",  pool[i].length);
            // if layer has traits to pick and no trait been picked yet
            // then pick a trait and roll it.
            if (pool[i].length > 0 && picks[i] == 0x0) {
                j = _uniform(a, pool[i].length); // roll a dice to choose starting pos
                uint256 count = 0;
                while (true) {
                    if (count==pool[i].length) {
                        break;
                    }
                    Trait memory rolled = pool[i][j];
                    a =  uint160(uint256(keccak256(abi.encodePacked(a))));
                    n = _uniform(a, cfg[_cid].population); // roll a dice to choose trait
                    if (rolled.sample >= n) {
                        picks[i] = rolled.hash;
                        break;
                    }
                    j++;
                    count++;
                    if (j ==  pool[i].length) {
                        j = 0;
                    }
                }
            }
            rolls++;
            if (rolls > 13) {
                break;
            }
            i++;
            if (i >= pool.length) {
                i=0;
            }
        }
        console.log("done");
        bytes32[] memory traits;
        j=0;
        for (i = 0; i < picks.length; i++) {
            if (picks[i] != 0x0) {
                assembly {
                    mstore (traits, add(mload(traits), 1)) // length++
                    mstore (0x40, add(mload(0x40), 0x20))  // move free memory ptr
                }
                traits[j] = picks[i];
                j++;
            }
        }
        console.log("leb:", traits.length);
        string memory ret = pb.svgFromKeys(traits, 0,0, 240, 0);
        return ret;
    }

    /**
* Generate a uniform random number between 0 - _upperBound
* See https://medium.com/hownetworks/dont-waste-cycles-with-modulo-bias-35b6fdafcf94
*/
    function _uniform(uint256 _entropy, uint256 _upperBound) internal pure returns (uint256) {
        uint256 negate = type(uint256).max - _upperBound + 1; // negate 2's compliment
        uint256 min = negate % _upperBound;
        while (true) {
            if (_entropy >= min) {
                break;
            }
            _entropy = uint256(keccak256(abi.encodePacked(_entropy)));
        }
        return _entropy % _upperBound;
    }
}

interface IPunkBlocks {
    enum Layer {
        Base,      //0 Base is the face. Determines if m or f version will be used to render the remaining layers
        Mouth,     //1 (Hot Lipstick, Smile, Buck Teeth, ...)
        Cheeks,    //2 (Rosy Cheeks)
        Blemish,   //3 (Mole, Spots)
        Eyes,      //4 (Clown Eyes Green, Green Eye Shadow, ...)
        Neck,      //5 (Choker, Silver Chain, Gold Chain)
        Beard,     //6 (Big Beard, Front Beard, Goat, ...)
        Ears,      //7 (Earring)
        HeadTop1,  //8 (Purple Hair, Shaved Head, Beanie, Fedora,Hoodie)
        HeadTop2,  //9 eg. sometimes an additional hat over hair
        Eyewear,   //10 (VR, 3D Glass, Eye Mask, Regular Shades, Welding Glasses, ...)
        MouthProp, //11 (Medical Mask, Cigarette, ...)
        Nose       //12 (Clown Nose)
    }

    function blocksInfo(bytes32) view external returns(uint256);

    function info(bytes32 _id) view external returns(Layer, uint16, uint16);

    function svgFromKeys(
        bytes32[] memory _attributeKeys,
        uint16 _x,
        uint16 _y,
        uint16 _size,
        uint32 _orderID) external view returns (string memory);
}