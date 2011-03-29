// JVM and util libraries.
importPackage(java.lang);
importClass( java.io.File );

// Apache CLI
importPackage(org.apache.commons.cli);

// Selenium2 - WebDriver packages.
importPackage(org.openqa.selenium.chrome);
importPackage(org.openqa.selenium.firefox);
importPackage(org.openqa.selenium.ie);
importPackage(org.openqa.selenium.htmlunit);
importPackage(com.gargoylesoftware.htmlunit);

load( 'lib/env.js' );

var args = arguments;
( function()
{
	var os = System.getProperty("os.name").toLowerCase();
	if ( os.indexOf( 'win' ) == -1 )
		console.log( 'No support for non-windows environment.');

	var DRIVERS = { 'hu': HtmlUnitDriver,'ie': InternetExplorerDriver,'ff': FirefoxDriver, 'cr' : ChromeDriver };

	// Build the CLI.
	var options = new Options();
	options.addOption( OptionBuilder.withArgName( "target pad page" )
			                   .isRequired()
			                   .hasArg()
			                   .withDescription( "specify the url of target pad page" )
			                   .create( "t" ) );
	options.addOption( OptionBuilder.withArgName( "concurrency level" )
			                   .hasArg()
			                   .withDescription( "specify the number of browser bots to be launched" )
			                   .create( "n" ) );

	options.addOption( OptionBuilder.withArgName( "use which browser" )
			                   .hasArg()
			                   .withDescription( "specify what browser to be used for test, be one of ie,ff,cr, " +
			                                                     "note if -n is specified you can only use ff, as right now it's the only " +
			                                                     "one that supports multiple instances." )
			                   .create( "b" ) );

	var parser = new PosixParser(),
		runs,
		url,
		browser;

	try
	{
		var cmd = parser.parse( options, args );
		runs = cmd.getOptionValue( 'n', 1 );
		url = cmd.getOptionValue( 't' );
		browser = cmd.getOptionValue( 'b', 'ff' );
	}
	catch( e )
	{
		var formatter = new HelpFormatter();
		formatter.printHelp( 'run',options )
		return;
	}

	if ( runs > 1 )

	// Spawn new process to have browsers launched quickly.
	for ( var i = 0; i < runs; i++ )
		Runtime.getRuntime().exec( "run.bat " + args.join( ' ' ).replace( /-n \d+/, '' ), null, new File("."));
	else
	{
		var driver = new DRIVERS[ browser ]();
		driver.get( url );
		System.exit( 0 );
	}
} )();
