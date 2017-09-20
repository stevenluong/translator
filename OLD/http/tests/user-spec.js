var email = "ste.luong@gmail.com42";
var password = "test";
var url = "http://127.0.0.1:8080/#";

describe('init user signup', function() {
	it('should create a user', function() {
		browser.get(url+"/signup");
		element(by.model('email')).sendKeys(email);
		element(by.model('password')).sendKeys(password);
		element(by.css('.btn')).click().then(function(){
			expect(browser.getCurrentUrl()).toEqual(url+"/login");
		});
	});
	it('shouldnt create an existing user', function() {
		browser.get(url+"/signup");
		element(by.model('email')).sendKeys(email);
		element(by.model('password')).sendKeys(password);
		element(by.css('.btn')).click().then(function(){
			expect(browser.getCurrentUrl()).toEqual(url+"/signup");
		});
	});

});
var userId = 0;
describe('init user login', function() {
	it('should log in a user', function() {
		browser.get(url+"/login");
		element(by.model('email')).sendKeys(email);
		element(by.model('password')).sendKeys(password);
		element(by.css('.btn')).click().then(function(){
			expect(browser.getCurrentUrl()).toEqual(url+"/");
			console.log(userId);
		});
	});
});
describe('init user logout', function() {
	it('should log out a user', function() {
		browser.get(url+"/logout");
		expect(browser.getCurrentUrl()).toEqual(url+"/");
	});
	it('should not log out an unlogged user', function() {
		browser.get(url+"/logout");
		expect(browser.getCurrentUrl()).toEqual(url+"/logout");
	});

});
describe('init user delete', function() {
	it('should delete a user', function() {
		browser.get(url+"/delete");
		element(by.model('email')).sendKeys(email);
		element(by.model('password')).sendKeys(password);
		element(by.css('.btn')).click().then(function(){
			expect(browser.getCurrentUrl()).toEqual(url+"/");
		});
	});
	it('should not delete a user already deleted', function() {
		browser.get(url+"/delete");
		element(by.model('email')).sendKeys(email);
		element(by.model('password')).sendKeys(password);
		element(by.css('.btn')).click().then(function(){
			expect(browser.getCurrentUrl()).toEqual(url+"/delete");
		});
	});

});
