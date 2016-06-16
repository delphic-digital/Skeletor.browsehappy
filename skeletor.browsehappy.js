/**
 * @copyright   2016, The Skeletor Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 */

//If you open your website with #test-bu appended to the url, the bar will always show up. Example: http://browser-update.org/#test-bu. Make sure the page is properly reloaded by opening the url in an new browser tab.

define(['jquery', 'skeletor.core'],function ($, Skeletor){

	function BrowseHappy(element, options) {
		BrowseHappy.__super__.call(this, element, options, BrowseHappy.DEFAULTS);
	}

	BrowseHappy.VERSION = '0.0.1';
	BrowseHappy.DEFAULTS =  {
		vs: {i:9,f:25,o:12.1,s:2,c:10}, // browser versions to notify
		reminder: 24,                   // after how many hours should the message reappear
		                                // 0 = show all the time
		reminderClosed: 150,            // if the user closes message it reappears after x hours
		onshow: function(infos){},      // callback function after the bar has appeared
		onclick: function(infos){},     // callback function if bar was clicked
		onclose: function(infos){},     // callback function after the bar is closed
		l: false,                       // set a language for the message, e.g. "en"
		                                // overrides the default detection
		test: false,                    // true = always show the bar (for testing)
		text: "",                       // custom notification html text
		                                // Optionally include up to two placeholders "%s" which will be replaced with the browser version and contents of the link tag. Example: "Your browser (%s) is old.  Please <a%s>update</a>"
		text_xx: "",                    // custom notification text for language "xx"
		                                // e.g. text_de for german and text_it for italian
		newwindow: true,                // open link in new window/tab
		url: "http://browsehappy.com/"
	}

	Skeletor.Plugin.create(BrowseHappy, {
		_init: function(element) {
			window.$buoop = this.options;
			require(['//browser-update.org/update.min.js'])
		}
	});

	new BrowseHappy()
});
