// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Identicons {

    IPunkBlocks pb = IPunkBlocks(0xe91Eb909203c8C8cAd61f86fc44EDeE9023bdA4D);


    struct Trait {
        bytes32 hash;
        uint256 sample;
    }

    struct Config {
        Trait[] superRare;
        Trait[] baseTraits;
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
            c.superRare.push(_superRare[i]);
        }
        for (uint256 i = 0; i < _baseTraits.length; i++) {
            info = pb.blocksInfo(_baseTraits[i].hash);
            require(info > 0, "base block not found");
            c.baseTraits.push(_baseTraits[i]);
        }
        for (uint256 i = 0; i < _largeTraits.length; i++) {
            info = pb.blocksInfo(_largeTraits[i].hash);
            require(info > 0, "large block not found");
            c.largeTraits[uint8(info)].push(_largeTraits[i]);
        }

        for (uint256 i = 0; i < _smallTraits.length; i++) {
            info = pb.blocksInfo(_smallTraits[i].hash);
            require(info > 0, "small block not found");
            c.smallTraits[uint8(info)].push(_smallTraits[i]);
        }
        c.population = _population;
        nextConfigId++;
    }

    /**
    * Pick a base layer (male, female, zombie, ape, etc)
    */
    function _pickBase(
        uint256 _entropy,
        uint64 _cid
    ) internal view returns (uint256 baseIndex) {

        uint16 i =  uint16(_uniform(_entropy, cfg[_cid].baseTraits.length));
        //Trait pick;
        uint n;
        while (true) {
            n = _uniform(_entropy, cfg[_cid].population);
            _entropy++;
            //pick = cfg[_cid].baseTraits[i];
            if (cfg[_cid].baseTraits[i].sample >= n) {
                baseIndex = i;
                console.log("PICKED A BLOCK", uint(baseIndex));
                break;
            }
        }
        return baseIndex;
    }

    function generate(address _a) view external returns (string memory) {
        // eth address has 20 bytes, so 10 16-bit
        return "";
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

    function svgFromIDs(uint32[] calldata _ids,
        uint16 _x,
        uint16 _y,
        uint16 _size,
        uint32 _orderId) external view returns (string memory);
}