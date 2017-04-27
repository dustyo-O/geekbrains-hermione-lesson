var assert = require('chai').assert;

describe('Окно логина', function() {
    it('открывается', function() {
        return this.browser
            .url('http://test.dusty/login.html')
            .getText('.form-signin-heading')
            .then(function(text) {
                assert.equal(text, 'Не входить')
            });
    });

    it('выводит ошибку при некорректном логине-пароле', function() {
        return this.browser
            .url('http://test.dusty/login.html')
            .waitForVisible('.page-container')
            .setValue('.login', 'qqqqqqqqqqqqqqqqqqqqqqqqq')
            .setValue('.password', 'aaaaaaaaaaaaaaaaaaa')
            .click('.login-button')
            .isVisible('.form-signin.has-error')
            .then(function(isVisible) {
                assert(isVisible);
            })
            .waitForVisible('.jq-toast-single')
            .getText('.jq-toast-single')
            .then(function(text) {
                assert(text.indexOf('Логин или пароль неверные') !== -1);
            });
    });

    it('переадресовывает на главную при корректных данных', function() {
        var browser = this.browser;

        return this.browser
            .url('http://test.dusty/login.html')
            .waitForVisible('.page-container')
            .setValue('.login', 'admin')
            .setValue('.password', 'megapassword')
            .click('.login-button')
            .waitUntil(function () {
                return browser.getUrl().then(function(url) {
                    return url === 'http://test.dusty/index.html';
                });
            }, 5000);
    });
});
