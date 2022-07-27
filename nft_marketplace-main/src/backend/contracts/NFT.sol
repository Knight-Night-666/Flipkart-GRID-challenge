// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";
contract NFT is ERC721URIStorage {
    uint public tokenCount;
    constructor() ERC721("DApp NFT", "DAPP"){}
    function mint(string memory _tokenURI) external returns(uint) {
        tokenCount ++;
        _mint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
        return(tokenCount);
    }
    
    event trans(address indexed _buyer);
    event Bought(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        uint date,
        string sno,
        uint warranty,
        address indexed seller,
        address indexed buyer
    );
    function buy(uint256 _tokenId, uint _itemId, address _buyer) external {
        console.log(ownerOf(_tokenId), msg.sender);
        require(ownerOf(_tokenId) == msg.sender, "Not owner of NFT");
        address seller = ownerOf(_tokenId);
        console.log(ownerOf(_tokenId));
        _transfer(seller, _buyer, _tokenId);
        console.log(ownerOf(_tokenId));
        // emit trans();
        emit Bought(_itemId,address(this),_tokenId,1,0,'',0,seller,_buyer);
    }
    
    function destroyItem(uint256 _tokenId) external {
        console.log(ownerOf(_tokenId), msg.sender);
        require(ownerOf(_tokenId) == msg.sender, "Not owner of NFT");
        _transfer(ownerOf(_tokenId), address(this), _tokenId);
    }

}