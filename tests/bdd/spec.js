describe('NetSearch signup', function() {
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

describe('NetSearch login', function() {
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

describe('NetSearch search', function() {
  beforeEach(function() {
    browser.get('http://localhost:1337/#/home');
  });

  it('should search and bring results', function() {
    element(by.css('.search')).sendKeys('tarantino');
    element(by.cssContainingText('option', 'director')).click();
    element(by.css('.search')).click();

    browser.actions().sendKeys(protractor.Key.ENTER).perform();

    browser.driver.wait(function() {
      return browser.driver.isElementPresent(By.css('.movie-list'));
    }, 10000);

    expect(element(by.css('.movie-list')).isPresent()).toBe(true);
  });

  it('should like and unlike', function(done) {
    browser.ignoreSynchronization = true;
    element(by.css('.search')).sendKeys('tarantino');
    element(by.cssContainingText('option', 'director')).click();
    element(by.css('.search')).click();

    browser.actions().sendKeys(protractor.Key.ENTER).perform();

    browser.driver.wait(function() {
      return browser.driver.isElementPresent(By.css('.movie-list'));
    }, 10000);

    var hasClass = function(element, cls) {
      return element.getAttribute('class').then(function(classes) {
        return classes.split(' ').indexOf(cls) !== -1;
      });
    };

    var movie = element.all(by.css('.like-button')).get(0),
      isLiked = hasClass(movie, 'liked');

    var testUnlike = function() {
      browser.actions().mouseMove(
        element.all(by.css('.poster-container')).get(0)
      ).perform().then(function(obj) {
        var button = element.all(by.css('.like-button')).get(0);
        button.click();
        expect(hasClass(button, 'liked')).toBe(false);
      });
    }

    var testLike = function() {
      browser.actions().mouseMove(
        element.all(by.css('.poster-container')).get(0)
      ).perform().then(function(obj) {
        var button = element.all(by.css('.like-button')).get(0);
        button.click();
        expect(hasClass(button, 'liked')).toBe(true);
      });
    }

    if (isLiked) {
      testUnlike();
      testLike();
    } else {
      testLike();
      testUnlike();
    }

    done();
  });
});