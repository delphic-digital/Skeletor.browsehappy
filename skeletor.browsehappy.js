/**
 * @copyright   2016, The Skeletor Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 */

//http://faisalman.github.io/ua-parser-js/
//https://support.microsoft.com/en-us/help/17454/lifecycle-support-policy-faq-internet-explorer

define(['jquery', 'skeletor.core', 'ua-parser-js'],function ($, Skeletor, UAParser){

	var UA                 = new UAParser();

	//Internet Explorer 8 on Windows Vista
//	UA.setUA('Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; Trident/4.0; SLCC1; .NET CLR 2.0.50727; InfoPath.2; Tablet PC 2.0; .NET CLR 3.5.21022; .NET CLR 3.5.30729; .NET CLR 3.0.30729)');
//Internet Explorer 8 on Windows 7
	//UA.setUA('Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; HPNTDF; .NET4.0C)');
	UA = UA.getResult()

	var BROWSER            = UA.browser.name.toLowerCase(),
	    BROWSER_VERSION    = UA.browser.major,
	    OS                 = UA.os.name.toLowerCase(),
	    OS_VERSION         = UA.os.version.toLowerCase();

	function BrowseHappy(element, options) {
		BrowseHappy.__super__.call(this, element, options, BrowseHappy.DEFAULTS);
	}

	BrowseHappy.VERSION = '0.4.0';
	BrowseHappy.DEFAULTS =  {
		min: {
			ie: 9, // Do you need to know why?
			firefox: 5, // v5 was beginning of rapid release cycle
			opera: 15, // went webkit at 15
			safari: 6,
			chrome: 40
		}
	}

	Skeletor.Plugin.create(BrowseHappy, {
		_init: function(element) {
			console.log(UA)

			try{
				var isSupported = this._isSupported[BROWSER](this.options.min);
			}catch(e){
				console.error("Your browser isn't supported by this site")
			}

			console.log(isSupported);

			if(!isSupported){
				this._bar.init();
			}
		},
		_isSupported: {
			'ie': function(min){

				//Check for old OS first, latest releases of IE can't be installed on old windows
				if(/(98|2000|vista|xp)/.exec(OS_VERSION)){
					console.error("You're on an old Operating System.");
					//show a different message?
					return true;
				}

				return BROWSER_VERSION  > min.ie
			},

			'edge': function(min){
				return BROWSER_VERSION  > min.ie
			},

			'chrome': function(min){
				return BROWSER_VERSION  > min.chrome
			},

			'safari': function(min){
				return BROWSER_VERSION  > min.safari
			},

			'opera': function(min){
				return BROWSER_VERSION  > min.opera
			}
		},

		_bar: {
			init: function(){
				var css = {
					//display: "none",
					position: "absolute",
					height: "19px",
					fontSize: "14px",
					lineHeight: "1em",
					fontFamily: "Arial, sans-serif",
					color: "black",
					padding: "10px 0",
					top: "-40px",
					left: "0",
					right: "0",
					backgroundColor: "#FDF2AB",
					borderBottom: "1px solid #A29330",
					width: "100%",
					textAlign: "left",
					cursor: "pointer",
					zoom: "1",
					zIndex: 9999,
					"-webkit-box-sizing": "content-box",
					"-moz-box-sizing": "content-box",
					"box-sizing": "content-box",
					overflow: "hidden"
				}

				$('body').append(
					$('<div>')
					.html([
						'<div style="position: relative; line-height: 1.5em">',
							'<span style=" position: absolute; font-family: Verdana; color:red; font-size: 1.5em; font-weight: bold">',
								'&nbsp;&nbsp;!',
							'</span>',
							'&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;Your browser ' + BROWSER +' '+BROWSER_VERSION  + ' is out of date. ',
							'It has known security flaws and may not display all features of this and other websites.',
						'</div>'].join(''))
					.css(css)
				)

				this.show();
			},
			show: function(){
				console.log('show bar')
				$('body').css({
					position: 'relative',
					top: '40px'
				})
			},
		},
		displayBar: function(){
			this._bar.show();
		},
		test: function(){
			console.log('test browse happy')
		}
	});

});
