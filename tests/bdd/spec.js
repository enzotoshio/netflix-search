describe('NetSearch signup page', function() {
  beforeEach(function() {
    browser.get('http://localhost:1337/signup');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('NetSearch');
  });

  it('should create default test user', function() {
    element(by.css('input[type=email]')).sendKeys('test@test.com');
    element(by.css('input[type=password]')).sendKeys('123456');

    element(by.css('input[type=submit]')).click();
  });

  it('should signup', function(done) {
    var name = 'test' + new Date().getTime();
    element(by.css('input[type=email]')).sendKeys(name + '@test.com');
    element(by.css('input[type=password]')).sendKeys('123456');

    element(by.css('input[type=submit]')).click();
    browser.driver.wait(function() {
      return browser.driver.isElementPresent(By.tagName('h1'));
    }, 10000);

    expect(browser.getCurrentUrl()).toBe('http://localhost:1337/login#/');

    done();
  });
});

describe('NetSearch login page', function() {
  beforeEach(function() {
    browser.get('http://localhost:1337/');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('NetSearch');
  });

  it('should redirect to login', function() {
    expect(browser.getCurrentUrl()).toBe('http://localhost:1337/login#/');
  });

  it('should have a login and have a initial message in the search result area', function() {
    element(by.css('input[type=email]')).sendKeys('test@test.com');
    element(by.css('input[type=password]')).sendKeys('123456');

    element(by.css('input[type=submit]')).click();

    browser.driver.wait(function() {
      return browser.driver.isElementPresent(By.css('.page-message'));
    }, 10000);

    expect(element(by.cssContainingText('.page-message', 'Search any movie or director.')));
  });
});