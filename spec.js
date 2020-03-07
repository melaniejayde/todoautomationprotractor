// spec.js
url = "http://todomvc.com/examples/angularjs/#/"

describe('To Do List App', function () {
  //Open the designated url before each test 
  beforeEach(function () {
    browser.get(url);
  });

  it('should add item to todo list', function () {
    //Add a new item to the list
    element(by.model('newTodo')).sendKeys('Buy Milk').sendKeys(protractor.Key.ENTER);

    //Find item/s in to do list
    let items = element.all(by.className('todo-list')).all(by.className('ng-binding'));

    //Confirm item is added
    expect(items.getText()).toEqual(['Buy Milk']);

  });

  it('should mark an item as complete', function () {
    //Add a new item to the list if required
    element(by.model('newTodo')).sendKeys('Buy Chocolate').sendKeys(protractor.Key.ENTER);

    //Find a specific item in to do list
    let item = element.all(by.repeater('todo in todos')).filter(function (elem, index) {
      return elem.getText().then(function (text) {
        return text === 'Buy Chocolate';
      });
    }).first();

    //Find and click checkbox next to item in to do list
    item.element(by.model('todo.completed')).click(); 
    browser.sleep(3000);

    //Confirm item is marked as complete
    expect(item.getAttribute('class')).toEqual('ng-scope completed');

  });
});