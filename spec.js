// spec.js
url = "http://todomvc.com/examples/angularjs/#/"

describe('To Do List App', function() {
  it('should add item to todo list', function() {
    //Open the designated url
    browser.get(url);

    //Add a new item to the list
    element(by.model('newTodo')).sendKeys('Buy Milk').sendKeys(protractor.Key.ENTER);

    //Returns items in to do list
    let items = element.all(by.className('todo-list')).all(by.className('ng-binding'));
    expect(items.getText()).toEqual(['Buy Milk']);

  });
});

/*  it('should mark an item as complete', function () {
    //Find an item and mark as complete 
    element(by.cssContainingText('.ng-binding', 'Buy Milk')).click();
  });
}); */