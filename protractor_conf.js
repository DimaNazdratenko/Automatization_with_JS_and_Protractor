var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var consoleRreport = new SpecReporter({
    spec: {
        displayStacktrace: true
    }
});

var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var screenshotReport = new HtmlScreenshotReporter({
    dest: 'C:/Windows/Temp/selenium-screenshot/protractor',
    filename: 'Report.html',
    captureOnlyFailedSpecs: true,
    reportFailedUrl: true,
    pathBuilder: function(currentSpec) {
        return currentSpec.fullName;
    }
});

exports.config = {
    capabilities: {
        'browserName': 'chrome'
    },

    onPrepare: function () {
        browser.ignoreSynchronization = true;
        browser.driver.manage().window().setSize(1920, 1080);
        jasmine.getEnv().addReporter(screenshotReport);
        jasmine.getEnv().addReporter(consoleRreport);
    },

    framework: 'jasmine',
    frameworkPath: require.resolve('jasmine'),

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 99990000,
        print: function () {}
    },

    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['tests/e2e/spec/*_spec.js'],

    baseUrl: 'http://playback.php01.dev.pls.life'
};