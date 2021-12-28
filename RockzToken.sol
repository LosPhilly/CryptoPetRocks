// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract RockzToken is ERC721, Ownable {
  constructor(string memory _name, string memory _symbol)
    ERC721(_name, _symbol)
  {}

  uint256 COUNTER;

  uint256 fee = 0.01 ether;

  struct Rock {
    string name;
    uint256 id;
    uint256 dna;
    uint8 level;
    uint8 rarity;
    uint256 age;
  }

  Rock[] public rocks;

  event NewRock(address indexed owner, uint256 id, uint256 dna);
  event Transfer(address from, address to, uint256 tokenId)

  // Helpers
  function _createRandomNum(uint256 _mod) internal view returns (uint256) {
    uint256 randomNum = uint256(
      keccak256(abi.encodePacked(block.timestamp, msg.sender))
    );
    return randomNum % _mod;
  }

  function updateFee(uint256 _fee) external onlyOwner {
    fee = _fee;
  }

  function withdraw() external payable onlyOwner {
    address payable _owner = payable(owner());
    _owner.transfer(address(this).balance);
  }

  // Creation
  function _createRock(string memory _name) internal {
    uint8 randRarity = uint8(_createRandomNum(100));
    uint256 randAge = uint256(_createRandomNum(9999));
    uint256 randDna = _createRandomNum(10**16);
    Rock memory newRock = Rock(_name, COUNTER, randDna, 1, randRarity, randAge);
    rocks.push(newRock);
    _safeMint(msg.sender, COUNTER);
    emit NewRock(msg.sender, COUNTER, randDna);
    COUNTER++;
  }

  function createRandomRock(string memory _name) public payable {
    require(msg.value >= fee);
    _createRock(_name);
  }

  // Getters
  function getRock() public view returns (Rock[] memory) {
    return rocks;
  }

  function getOwnerRocks(address _owner) public view returns (Rock[] memory) {
    Rock[] memory result = new Rock[](balanceOf(_owner));
    uint256 counter = 0;
    for (uint256 i = 0; i < rocks.length; i++) {
      if (ownerOf(i) == _owner) {
        result[counter] = rocks[i];
        counter++;
      }
    }
    return result;
  }

  // Actions
  function levelUp(uint256 _rockId) public {
    require(ownerOf(_rockId) == msg.sender);
    Rock storage rock = rocks[_rockId];
    rock.level++;
  }
}       

    burn(uint256 _rockId) public {
    require(ownerOf(_rockId) == msg.sender);
    emit Transfer(msg.sender, address(0), uint256 _rockId)
    }