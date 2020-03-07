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
    let item = findItem('Buy chocolate');
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

});

//protractor conf.js --grep='should see completed to do list'