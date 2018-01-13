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
        uint[] todoListIds;
    }

    mapping (address => User) public users;
    address[] public userAccts;
    uint count = 1;
    
    //note: createAccount must be called before adding todos
    function createAccount() public returns (address) {
        if (users[msg.sender].id != 0) {
            return; //if already set, don't set store again
        }
        var user = users[msg.sender];
        user.todoCount = 0; //keep track of todos for each user
        user.id = count;
        count ++;
        userAccts.push(msg.sender);
        return msg.sender;
    }
    
    function getTodoListLength(address _account) view public returns(uint) {
        return users[_account].todoListIds.length;
    }

    function getAllUsers() view public returns (address[]) {
        return userAccts;
    }
    
    //returns user name/id and all todos associated with you account
    function getMyData(address _account) view public returns (uint[], bytes32[], bool[]) {
        var user = users[_account];
        var lengthOfTodoList = user.todoListIds.length;
        uint[] memory ids = new uint[](lengthOfTodoList);
        bool[] memory complete = new bool[](lengthOfTodoList);
        bytes32[] memory titles = new bytes32[](lengthOfTodoList);
        
        for (uint i = 0; i < user.todoListIds.length; i++) {
            var current = user.todoListIds[i];
            Todo memory currentTodo = user.todoMap[current];
            ids[i] = currentTodo.id;
            titles[i] = currentTodo.name;
            complete[i] = currentTodo.completed;
        }
        
        return (ids, titles, complete);
    }
    
    function addTodo(bytes32 _todo, address _account) public {
        var user = users[_account];
        Todo memory todo = Todo(user.todoCount, _todo, false);
        user.todoMap[user.todoCount] = todo;
        user.todoListIds.push(user.todoCount);
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
            
    function deleteTodo(address _account, uint _id) public payable {
        var user = users[_account];
        user.todoListIds[_id] = user.todoListIds[user.todoListIds.length-1];
        user.todoListIds.length--;
    }

}
