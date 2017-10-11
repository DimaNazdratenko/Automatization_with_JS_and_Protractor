describe('Protractor Demo App', function () {
    beforeAll(function () {
        browser.get('/app_test.php/login');
        element(by.css('#username')).sendKeys('admin');
        element(by.css('#password')).sendKeys('adminpass');
        element(by.css('#_submit')).click();
        browser.wait(waitAjax(), 15000);
    });

    it('Check on games page', function () {
        browser.get('/app_test.php/module/module_adm_game_list');
        browser.wait(waitAjax(), 15000);
        element(by.css('button[type="submit"]')).click();
        browser.wait(waitAjax(), 15000);

        var xpath_table_values = '//table//tr[1]/td';
        element.all(by.xpath(xpath_table_values)).getText().then(function (value) {
            console.log(value);
        });

        var expected_array = ['1206', 'alice_c', '', '', '56365', '', '', 'xml'];
        expect(element.all(by.xpath(xpath_table_values)).getText()).toEqual(expected_array);
    });
});

function waitAjax () {
    var script = 'return (typeof jQuery == "undefined" || 0 === jQuery.active) && (typeof Controller == "undefined" || Controller.isReady)';
    return browser.executeScript(script).then(function (value) {
        console.log('injected script result:', value);
        return value;
    });
}