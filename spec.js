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

  //Defines functino to add a new item to the list
  function addItem(name) {
    element(by.model('newTodo')).sendKeys(name).sendKeys(protractor.Key.ENTER);
  };

  //Defines function to complete item in list






  

  it('should add item to todo list', function () {
    addItem('Buy Milk');

    //Find item/s in to do list
    let items = element.all(by.className('todo-list')).all(by.className('ng-binding'));

    //Confirm item is added
    expect(items.getText()).toEqual(['Buy Milk']);

  });

  it('should mark an item as complete', function () {
    addItem('Buy Chocolate'); 

    //Find a specific item in to do list
    let item = element.all(by.repeater('todo in todos')).filter(function (elem, index) {
      return elem.getText().then(function (text) {
        return text === 'Buy Chocolate';
      });
    }).first();

    //Find and click checkbox next to item in to do list
    item.element(by.model('todo.completed')).click();

    //Confirm item is marked as complete
    expect(item.getAttribute('class')).toEqual('ng-scope completed');

  });

  it('should see completed to do list', function () {
    addItem('Go to hairdressers');

    //Opens completed list 
    let completed = element(by.linkText('Completed'))
    completed.click();

    //Verifies 

  });

});

//protractor conf.js --grep='should see completed to do list'