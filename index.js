/**
 * @copyright   2010-2015, The Skeletor Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 */


require.config({
	paths: {
		'jquery': '//code.jquery.com/jquery-3.0.0.min',
		'skeletor.core': '../Skeletor.core/skeletor.core',
	}
})

define(['jquery', 'skeletor.core'],function ($, Skeletor){

	// first we set up our constructor function
	var BrowserUpdate = function(options){
		this._init();
	};

	// now we define the prototype
	BrowserUpdate.prototype = {
		name: 'BrowserUpdate',
		version: '1.0.0',
		constructor: BrowserUpdate,
		_init: function(){
			console.log('init browserupdate')
		}
	}

	BrowserUpdate.defaults = {}

	Skeletor.registerPlugin(BrowserUpdate, 'BrowserUpdate');

});

