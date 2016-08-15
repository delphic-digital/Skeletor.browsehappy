/**
 * @copyright   2016, The Skeletor Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 */

//https://github.com/ded/bowser/blob/master/src/bowser.js
//https://github.com/sub2home/browser-detection/blob/master/src/browser-detection.js
//http://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser#answer-38080051

define(['jquery', 'skeletor.core'],function ($, Skeletor){

	var UA            = navigator.userAgent,
	    BROWSER_PARTS = UA.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [],
	   	//BROWSER_PARTS = /(opera|chrome|safari|firefox|msie|trident)(?:.*version)?(?:[ \/])?([\w]+)/.exec(UA),
	    //OS_PARTS      = /(mac|win|linux|freebsd|mobile|iphone|ipod|ipad|android|blackberry|j2me|webtv)/.exec(UA),
	    BROWSER       = '',
	    VERSION       = '',
	    OS            = '';

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
			//console.log(BROWSER_PARTS)
			this._getUserAgent();
			var isSupported = this._isSupported[BROWSER.toLowerCase()](this.options.min);
			console.log(BROWSER, VERSION, isSupported);

			if(!isSupported){
				this._bar.init();
				this._bar.show();
			}
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
