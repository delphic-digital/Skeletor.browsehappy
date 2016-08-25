/**
 * @copyright   2016, The Skeletor Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 */

//http://faisalman.github.io/ua-parser-js/

define(['jquery', 'skeletor.core', 'ua-parser-js'],function ($, Skeletor, UAParser){

	var UA                 = new UAParser().getResult(),
	    BROWSER            = UA.browser.name,
	    BROWSER_VERSION    = UA.browser.version,
	    OS                 = UA.os.name,
	    OS_VERSION         = UA.os.version;

	function BrowseHappy(element, options) {
		BrowseHappy.__super__.call(this, element, options, BrowseHappy.DEFAULTS);
	}

	BrowseHappy.VERSION = '0.3.0';
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
			//console.log(OS_VERSION)

			/*if(!isSupported){
				this._bar.init();
				this._bar.show();
			}*/
		},
		_isSupported: {
			'ie': function(min){
				return VERSION > min.ie
			},
			'chrome': function(min){
				return VERSION > min.chrome
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
							'&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;Your browser ' + BROWSER +' '+VERSION  + ' is out of date. ',
							'It has known security flaws and may not display all features of this and other websites.',
						'</div>'].join(''))
					.css(css)
				)
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
