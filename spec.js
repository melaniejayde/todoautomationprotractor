// spec.js
url = "http://todomvc.com/examples/angularjs/#/"

describe('To Do List App', function () {
  //Open the designated url before each test 
  beforeEach(function () {
    browser.get(url);
  });

  //Reset browser between test cases
  afterEach(function() {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
});

  //Defines function to add a new item to the list
  function addItem(name) {
    element(by.model('newTodo')).sendKeys(name).sendKeys(protractor.Key.ENTER);
     
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

    //Find item/s in to do list
    let items = element.all(by.className('todo-list')).all(by.className('ng-binding'));

    //Confirm item is added
    expect(items.getText()).toEqual(['Buy Milk']);

  });

  it('should mark an item as complete', function () {
    addItem('Buy Chocolate'); 
    completeItem('Buy Chocolate');
    let item = findItem('Buy Chocolate');
    expect(item.getAttribute('class')).toEqual('ng-scope completed');

  });

  it('should see completed to do list', function () {
    addItem('Go to hairdressers');
    completeItem('Go to hairdressers');

    //Opens completed list 
    let completed = element(by.linkText('Completed'))
    completed.click();

    //Verifies item is in completed to do list
    let items = element.all(by.repeater('todo in todos'));
    expect(items.getText()).toEqual(['Go to hairdressers']);

  });

  it('should remove item in to do list', function() {
    addItem('Buy Coffee');
    deleteItem('Buy Coffee');
    let items = element.all(by.repeater('todo in todos'));

    //Verify item was deleted 
    expect(items.getText()).not.toContain('Buy Coffee');

  });

  it('should see count of remaining to do items', function() {
    addItem('Mow Lawn');
    addItem('Do Groceries');

    //Opens link to active items in to do list
    let active = element(by.linkText('Active'))
    active.click();

    //Check the count shows x items
    let count = element.all(by.className('todo-count')).all(by.className('ng-binding'));
    expect(count.getText()).toEqual(['2']);
  
  });

  it('should see all to dos', function() {
    addItem('Buy T-Shirt');

    //Opens link to active items in to do list
    let all = element(by.linkText('All'));
    all.click();
    item = findItem('Buy T-Shirt');
    expect(item.getText()).toEqual('Buy T-Shirt');

  });

});

//protractor conf.js --grep='should see all to dos'