/**
 * @copyright   2016, The Skeletor Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 */

//https://github.com/ded/bowser/blob/master/src/bowser.js
//https://github.com/sub2home/browser-detection/blob/master/src/browser-detection.js

define(['jquery', 'skeletor.core'],function ($, Skeletor){

	var UA            = navigator.userAgent,
	    BROWSER_PARTS = UA.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [],
	   	//BROWSER_PARTS = /(opera|chrome|safari|firefox|msie|trident)(?:.*version)?(?:[ \/])?([\w]+)/.exec(UA),
	    OS_PARTS      = /(mac|win|linux|freebsd|mobile|iphone|ipod|ipad|android|blackberry|j2me|webtv)/.exec(UA),
	    BROWSER       = '',
	    VERSION       = '',
	    OS            = '';

	function BrowseHappy(element, options) {
		BrowseHappy.__super__.call(this, element, options, BrowseHappy.DEFAULTS);
	}

	BrowseHappy.VERSION = '0.3.0';
	BrowseHappy.DEFAULTS =  {
		min: {
			ie:9, // Do you need to know why?
			firefox: 5, // v5 was beginning of rapid release cycle
			opera: 15, // went webkit at 15
			safari: 6,
			chrome: 40
		}
	}

	Skeletor.Plugin.create(BrowseHappy, {
		_init: function(element) {
			//console.log(BROWSER_PARTS)
			this._getUserAgent();
			console.log('BROWSER: '+BROWSER);
			console.log('VERSION: '+VERSION);
			//console.log(this._isSupported[BROWSER]());

		},
		_getUserAgent: function(){

			//Check for ie 11 (trident UA)
			if(/trident/i.test(BROWSER_PARTS[1])){
				var tem =  /\brv[ :]+(\d+)/g.exec(UA) || [];
				BROWSER = 'IE';
				VERSION = tem[1] || '';
			}else if (BROWSER_PARTS[1] === 'Chrome'){
				var tem= UA.match(/\b(OPR|Edge)\/(\d+)/);
				if(tem!= null){
					BROWSER = tem[1].replace('OPR', 'Opera');
					VERSION = tem[2];
				}else{
					BROWSER = BROWSER_PARTS[1];
        	VERSION = BROWSER_PARTS[2];
				}
			}else {
				BROWSER = BROWSER_PARTS[1];
        VERSION = BROWSER_PARTS[2];
			}
		},
		_isSupported: {
			'ie': function(){
				return VERSION > 9
			},
			'chrome': function(){
				return VERSION > 40
			}
		},
		test: function(){
			console.log('test browse happy')
		}
	});

});
