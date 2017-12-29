pragma solidity ^0.4.17;


contract TodoList {
     struct Todo {
        uint id;
        bytes32 name;
        bool completed;
    }
    
    struct User {
        string name;
        uint id;
        uint todoCount;
        mapping(uint => Todo) todoMap;
    }

    mapping (address => User) users;
    address[] public userAccts;
    uint count = 1;
    
    //note: setUser must be called before adding todos
    function createAccount(string _name) public {
        if(users[msg.sender].id != 0){
            return; //if already set, don't set store again
        }
        var user = users[msg.sender];
        user.name = _name;
        user.todoCount = 0; //keep track of todos for each user
        user.id = count;
        count ++;
        userAccts.push(msg.sender);
    }
    
    function getAllUsers() view public returns (address[]) {
        return userAccts;
    }
    
    //returns user name/id and all todos associated with you account
    function getMyData(address _account) view public returns (uint[], bytes32[], bool[]) {
        var user = users[_account];
        var todoCount = user.todoCount;
        uint[] memory ids = new uint[](todoCount);
        bool[] memory complete = new bool[](todoCount);
        bytes32[] memory titles = new bytes32[](todoCount);
        
        for (uint i = 0; i < user.todoCount; i++) {
            Todo memory currentTodo = user.todoMap[i];
            ids[i] = currentTodo.id;
            titles[i] = currentTodo.name;
            complete[i] = currentTodo.completed;
        }
        
        return (ids, titles, complete);
    }
    
    function addTodo(bytes32 _todo) public {
        var user = users[msg.sender];
        Todo memory todo = Todo(user.todoCount, _todo, false);
        user.todoMap[user.todoCount] = todo;
        todo.name = _todo;
        user.todoCount ++;
    }
    
    function toggleComplete(address _account, uint _id) public payable {
         var user = users[_account];
         
        if (user.todoMap[_id].completed) {
                user.todoMap[_id].completed = false;
            } else {
                user.todoMap[_id].completed = true;
            }
        }

}