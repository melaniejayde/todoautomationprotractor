// spec.js
describe('To Do List App', function () {

  //Defines URL to open angular web app
  url = "http://todomvc.com/examples/angularjs/#/"

  //Open the designated url before each test 
  beforeEach(function () {
    browser.get(url);
  });

  //Reset browser between test cases
  afterEach(function () {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });

  //Defines function to add a new item to the list
  function addItem(name) {
    element(by.model('newTodo')).sendKeys(name).sendKeys(protractor.Key.ENTER);
  };

  //Defines function to retrieve all items in todolist
  function getAllItems() {
    return element.all(by.repeater('todo in todos'));
  };

  //Defines function to follow a link
  function followLink(name) {
    element(by.linkText(name)).click();
  };

  // Defines function to find item in list
  function findItem(name) {
    return element.all(by.repeater('todo in todos')).filter(function (elem, index) {
      return elem.getText().then(function (text) {
        return text === name;
      });
    }).first();

  };
  //Defines function to complete item in list
  function completeItem(name) {
    let item = findItem(name);
    item.element(by.model('todo.completed')).click();
  };

  //Defines function to delete item in list
  function deleteItem(name) {
    let item = findItem(name);
    browser.actions().mouseMove(item).perform(); // Mouseover item because the delete button isn't visible yet
    item.element(by.css('[ng-click="removeTodo(todo)"]')).click();
  };

  it('should add item to todo list', function () {
    addItem('Buy Milk');
    let item = findItem('Buy Milk')

    //Confirm item is added
    expect(item.getText()).toEqual('Buy Milk');
  });

  it('should mark an item as complete', function () {
    addItem('Buy Chocolate');
    completeItem('Buy Chocolate');
    let item = findItem('Buy Chocolate');

    //Confirm item is in completed list
    //If item is incomplete - class is "ng-scope"
    //if item is complete - class is "ng-scope completed"
    expect(item.getAttribute('class')).toEqual('ng-scope completed');
  });

  it('should see completed to do list', function () {
    addItem('Go to hairdressers');
    completeItem('Go to hairdressers');

    //Opens completed list 
    followLink('Completed');

    //Verifies item is in completed to do list
    let items = getAllItems();
    expect(items.getText()).toEqual(['Go to hairdressers']);
  });

  it('should remove item in to do list', function () {
    addItem('Buy Coffee');
    deleteItem('Buy Coffee');
    let items = getAllItems();

    //Verify item was deleted 
    expect(items.getText()).not.toContain('Buy Coffee');
  });

  it('should see count of remaining to do items', function () {
    addItem('Mow Lawn');
    addItem('Do Groceries');

    //Opens link to active items in to do list
    followLink('Active');

    //Check the count shows x items
    let count = element.all(by.className('todo-count')).all(by.className('ng-binding'));
    expect(count.getText()).toEqual(['2']);
  });

  it('should see all to dos', function () {
    addItem('Buy T-Shirt');

    //Opens link to all items in to do list
    followLink('All');

    //Verify item is in list of all items
    item = findItem('Buy T-Shirt');
    expect(item.getText()).toEqual('Buy T-Shirt');
  });
});