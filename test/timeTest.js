// Released under the MIT Licence
load( "jsunit/JsUtil.js" );
load( "jsunit/JsUnit.js" );
load( "../src/time.js" );

function TestInstants(name) {
    TestCase.call(this, name);
}

function TestInstants_testAt() {
    this.assertEquals( 1000000000, Time.at(1000000000).toMillis() );
    this.assertEquals( 1000000000, Time.instant().at(1000000000).toMillis() );
}

TestInstants.prototype = new TestCase();
TestInstants.prototype.testAt = TestInstants_testAt;

// Kick off the test runner
load("runner.js");

