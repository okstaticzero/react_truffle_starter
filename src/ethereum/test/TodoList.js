const TodoList = artifacts.require('../contracts/TodoList.sol')

contract('TodoList', function () {

    let todo;
    //run beforeEach - creating a new instance of TodoList each time
    beforeEach('setup contract for each test', async function () {
        todo = await TodoList.new()
    })

    it('Increments numberOfItems to 2', async function () {
        await todo.createItem("item 1"); //create first Item
        await todo.createItem("item 2");  //create second Item
        let numItems = await todo.numberOfItems();
        const expected = 2;
        assert.equal(numItems.c[0], expected)
    })

    it('getAllItems returns 3 arrays', async function () {
        let x = await todo.createItem("item 1");
        let arrays = await todo.getAllItems();
        assert.equal(arrays.length, 3)
    })

    it('The first todo in the third array is: false - representing the "complete" value', async function () {
        let x = await todo.createItem("item 1");
        let arrays = await todo.getAllItems();
        const expected = false;
        assert.equal(arrays[2][0], expected)
    })

    it('After calling markComplete(0), The first item, third array equals: true', async function () {
        const itemName = "Item One"
        let x = await todo.createItem(itemName);//create item
        let arrays = await todo.getAllItems();//get Items
        let expected = web3.fromAscii(itemName)//convert string to bytes
        console.log('expected: ', expected)
        const firstItemName = arrays[1][0]; // get name of first item (stored as byte32)
        const actual = firstItemName.substring(0, expected.length)// get name of first item and trim to same length (removes trailing zeros)
        assert.equal(actual, expected)
    })

})
