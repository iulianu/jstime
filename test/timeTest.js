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

TestInstants.prototype.testDateWrapper = function() {
    var date = new Date(1234567890000);
    this.assertEquals( 1234567890000, Time(date).toMillis() );
}

TestInstants.prototype.testStringWrapper = function() {
    var isoStr = "2009-02-13T23:31:30Z";
    this.assertChronologyEquals( 
        {year: 2009, month: 2, day: 13, hour: 23, minute: 31, second: 30, millisecond: 0, offset: 0},
	Time(isoStr) );

    var isoStrOtherZone = "2009-02-14T01:31:30+0200";
    this.assertChronologyEquals( 
        {year: 2009, month: 2, day: 14, hour: 1, minute: 31, second: 30, millisecond: 0, offset: 7200},
	Time(isoStrOtherZone) );

    var jsStr = "Friday, February 13 23:31:30 UTC 2009";
    this.assertChronologyEquals( 
        {year: 2009, month: 2, day: 13, hour: 23, minute: 31, second: 30, millisecond: 0, offset: 0},
	Time(jsStr) );


    var jsStrOtherZone = "Saturday, February 14 01:31:30 +0200 2009";
    this.assertChronologyEquals( 
        {year: 2009, month: 2, day: 14, hour: 1, minute: 31, second: 30, millisecond: 0, offset: 7200},
	Time(jsStrOtherZone) );

}

TestCase.prototype.assertChronologyEquals = function( expected, actual ) {
    for( var key in expected ) {
        this.assertEquals(expected[key], actual[key]);
    }
}

// Kick off the test runner
load("runner.js");

