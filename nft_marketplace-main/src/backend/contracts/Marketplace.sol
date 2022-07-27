// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

contract Marketplace is ReentrancyGuard {

    // Variables
    address payable public immutable feeAccount; // the account that receives fees
    uint public immutable feePercent; // the fee percentage on sales 
    uint public itemCount;
    bool public isValid = true;
    struct Item {
        uint itemId;
        IERC721 nft;
        uint tokenId;
        uint price;
        uint date;
        string sno;
        uint warranty;
        address payable seller;
        bool sold;
    }

    // itemId -> Item
    mapping(uint => Item) public items;

    event Offered(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        uint date,
        string sno,
        uint warranty,
        address indexed seller
    );

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
    event Transfer(
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
    event Verify(
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
    constructor(uint _feePercent) {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    // Make item to offer on the marketplace
    function makeItem(IERC721 _nft, uint _tokenId, uint _price, string memory _sno, uint _warranty) external nonReentrant {
        // require(_price > 0, "Price must be greater than zero");
        // increment itemCount
        itemCount ++;
        uint date = 0;
        // transfer nft
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        // add new item to items mapping
        console.log(_warranty, _sno);
        items[itemCount] = Item (
            itemCount,
            _nft,
            _tokenId,
            _price,
            date,
            _sno,
            _warranty,
            payable(msg.sender),
            false
        );
        // emit Offered event
        emit Offered(
            itemCount,
            address(_nft),
            _tokenId,
            _price,
            date,
            _sno,
            _warranty,
            msg.sender
        );
    }

    function verifyItem(uint _itemId, uint _currentDate, uint _genesis) external nonReentrant {
        console.log("Heyoo",items[_itemId].warranty);
        // console.log(_genesis+items[_itemId].warranty - _currentDate);
        //TODO CONVERT TO YEARS
        isValid = isBefore(_currentDate, _genesis+items[_itemId].warranty);
        // *365*24*60
    }

    function purchaseItem(uint _itemId, address _buyer) external payable nonReentrant {
        uint _totalPrice = getTotalPrice(_itemId);
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
        require(msg.value >= _totalPrice, "not enough ether to cover item price and market fee");
        require(!item.sold, "item already sold");
        // pay seller and feeAccount
        item.seller.transfer(item.price);
        feeAccount.transfer(_totalPrice - item.price);
        // update item to sold
        item.sold = true;
        console.log(msg.sender);
        // transfer nft to buyer
        // item.nft.setApprovalForAll(_buyer, true);
        item.nft.transferFrom(address(this), _buyer, item.tokenId);
        console.log(item.nft.ownerOf(item.tokenId));
        // emit Bought event
        emit Bought(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.date,
            item.sno,
            item.warranty,
            item.seller,
            _buyer
        );
    }
    
    function getTotalPrice(uint _itemId) view public returns(uint){
        return((items[_itemId].price*(100 + feePercent))/100);
    }
    function isBefore(uint _date1, uint _date2) public pure returns (bool){
        if(_date1 < _date2) return true;
        return false;
    }
    
   
    
}
