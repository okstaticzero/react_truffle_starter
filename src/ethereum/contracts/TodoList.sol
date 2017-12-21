pragma solidity ^0.4.17;

contract TodoList {
    
    struct Item {
        uint id;
        bytes32 name;
        bool completed;
    }
    
    uint public numberOfItems = 0;
    mapping(uint => Item) itemContainer;
    
    function createItem(bytes32 _itemName) public payable {
        Item memory newItem = Item(numberOfItems, _itemName, false);
        itemContainer[numberOfItems] = newItem;
        numberOfItems = numberOfItems + 1;
        return;
    }
    
    function getAllItems() public view returns(uint[], bytes32[], bool[]) {
        uint[] memory ids = new uint[](numberOfItems);
        bytes32[] memory titles = new bytes32[](numberOfItems);
        bool[] memory complete = new bool[](numberOfItems);
        
        for (uint i = 0; i < numberOfItems; i++) {
            Item memory currentItem = itemContainer[i];
            ids[i] = currentItem.id;
            titles[i] = currentItem.name;
            complete[i] = currentItem.completed;
            
        }
        return (ids, titles, complete);
    }
       
       function markComplete(uint id) public payable {
            if (itemContainer[id].completed) {
                itemContainer[id].completed = false;
            } else {
                itemContainer[id].completed = true;
            }
        }
    
}