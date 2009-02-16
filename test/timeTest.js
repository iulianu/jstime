// Released under the MIT Licence
load( "jsunit/JsUtil.js" );
load( "jsunit/JsUnit.js" );
load( "../src/time.js" );

function TestInstants(name) {
    TestCase.call(this, name);
}

TestInstants.prototype = new TestCase();

TestInstants.prototype.testTimestamps = function() {
    this.assertEquals( 1000000000, Time.millis(1000000000).toMillis() );
    this.assertEquals( 1000000000, Time.instant().millis(1000000000).toMillis() );
    this.assertEquals( 1000000000, Time.unix(1000000).toMillis() );
    this.assertEquals( 1000000000, Time.instant().unix(1000000).toMillis() );
}

// Kick off the test runner
load("runner.js");

