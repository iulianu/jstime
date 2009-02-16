
function TimeTestSuite()
{
    TestSuite.call( this, "TimeTestSuite" );
    this.addTestSuite( TestInstants );
}
TimeTestSuite.prototype = new TestSuite();
TimeTestSuite.prototype.suite = function () { return new TimeTestSuite(); }

function AllTests()
{
    TestSuite.call( this, "AllTests" );
}
function AllTests_suite()
{
    var suite = new AllTests();
    suite.addTest( TimeTestSuite.prototype.suite());
    return suite;
}
AllTests.prototype = new TestSuite();
AllTests.prototype.suite = AllTests_suite;

	

///// Test runner

var writer = JsUtil.prototype.getSystemWriter();
var printer = new ClassicResultPrinter( writer );
var runner = new EmbeddedTextTestRunner( printer );
var collector = new TestCaseCollector( this );
runner.run( collector.collectTests());
