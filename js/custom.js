/*
Theme Name: Basecamp
Description: Custom theme for Basecamp
Version: 1.0
Author: Weltimedia
Author URI: http://www.welti.media
*/
var $ = jQuery.noConflict();

$(document).ready(function(){


	// this method adds the class nav-active to the current menu item, based on the scrollTop value
	var aChildren = $(".av-submenu-container").find('li').children(); // find the children of the list items
	var aArray = []; // create the empty aArray
	if (aChildren !== null) for (var i=0; i < aChildren.length; i++) {    
		var aChild = aChildren[i];
		var ahref = $(aChild).attr('href');
		if(ahref.indexOf('http') !== 0) aArray.push(ahref);
	} // this for loop fills the aArray with attribute href values
	$(window).scroll(function(){
		var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
		var windowHeight = $(window).height(); // get the height of the window
		var docHeight = $(document).height();

		if (aArray !== null) for (var i=0; i < aArray.length; i++) {
			var theID = aArray[i];
			if ($(theID).length) var divPos = $(theID).offset().top-70; // get the offset of the div from the top of page
			var divHeight = $(theID).height(); // get the height of the div in question
			if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
				if ($(theID).css('position') == 'static') $("a[href='" + theID + "']").addClass("nav-active");
			} else {
				$("a[href='" + theID + "']").removeClass("nav-active");
			}
		}

		if(windowPos + windowHeight == docHeight) {
			if (!$(".av-submenu-container").find("li:last-child a").hasClass("nav-active")) {
				var navActiveCurrent = $(".nav-active").attr("href");
				$("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
				$(".av-submenu-container li:last-child a").addClass("nav-active");
			}
		}
	});


	// attach a copy of the first menu to the fotter (function disabled at the moment)
	var base_clone_main_menu_footer = function(){
		if('.av-submenu-container'){
			var newMenu = $('.av-submenu-container').first().clone();
			$(newMenu).attr('id','footer-menu-bw');
			$(newMenu).removeClass('av-sticky-submenu');
			$(newMenu).prependTo('#footer');
		}
	};

	var base_color_menu_cards = function(){
		var base_colored_menu = function(menuID,hexStart,hexEnd){
			if($(menuID)){
				var rgb = [hexToRgb(hexStart).r,hexToRgb(hexStart).g,hexToRgb(hexStart).b];
				var totalItems = $(menuID).find('li').length-1;
				var diff = [(hexToRgb(hexEnd).r - hexToRgb(hexStart).r)/totalItems, (hexToRgb(hexEnd).g - hexToRgb(hexStart).g)/totalItems,(hexToRgb(hexEnd).b - hexToRgb(hexStart).b)/totalItems];
				$(menuID).css({'background': hexStart});
				$(menuID).parents('.av-submenu-container').css({'background': hexStart});
				$('<span class="menu_supplement" style="background: '+hexEnd+'"></span>').insertAfter($(menuID).find('.av-subnav-menu'));
				$(menuID).find('li').each(function(){
					$(this).css({'background': rgbToHex(rgb[0],rgb[1],rgb[2])});
					$(this).find('a').css({'background': rgbToHex(rgb[0],rgb[1],rgb[2])});
					rgb[0] += Math.round(diff[0]);
					rgb[1] += Math.round(diff[1]);
					rgb[2] += Math.round(diff[2]);
				})
				
			}
		}

		function componentToHex(c) {
		    var hex = c.toString(16);
		    return hex.length == 1 ? "0" + hex : hex;
		}

		function rgbToHex(r, g, b) {
		    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
		}
		function hexToRgb(hex) {
		    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		    return result ? {
		        r: parseInt(result[1], 16),
		        g: parseInt(result[2], 16),
		        b: parseInt(result[3], 16)
		    	} : null;
		}

		$('.av-submenu-container').not('#footer-menu-bw').find(' > div').each(function(){
			var color_start = $(this).data('color_start');
			var color_end = $(this).data('color_end');
			var color_selection = $(this).data('color_selection');
			if (color_selection == 'custom-color-menu' && !(color_end || color_start)){
				color_start =  '#550053';
				color_end =  '#dd22aa';
			}
			base_colored_menu($(this),color_start,color_end);
		});
	}();

	var base_color_picture_captions = function(){
		$('.avia-caption-title,.wp-caption-text,input.button').each(function(){
			var parentSection = $(this).closest('.avia-section').prevAll('.av-submenu-container').first();
			$(this).css({'background': $(parentSection).find('.container').data('color_start')});
			return;
		});
	}();

	var base_remove_current_language = function(){
		$('.menu-mini-menu-container li,.menu-mini-menu-german0-container li').each(function(){
			var href =$(this).find('a').attr('href'); 
			if(href == '#') $(this).hide();
			return;
		});
	}();

	var base_display_full_menu = function(){
		if ($('#base-full-menu')){
			$('<div class="base-full-menu-trigger">&#9776;</div>').insertBefore('#base-full-menu');
		}
		$('.base-full-menu-trigger').click(function(){
			$('.overlay-menu').toggle();
			if($('.overlay-menu').is(':visible')){
				$('.base-full-menu-trigger').html('&#10005;');
			} else {
				$('.base-full-menu-trigger').html('&#9776;');
			}
		});
		$(document).keyup(function(e){
			if (e.keyCode == 27 && $('.overlay-menu').is(':visible')) {
				$('.overlay-menu').hide();
				$('.base-full-menu-trigger').html('&#9776;');
			}
		});
	}();

	var base_fancy_tabmenu_toggle_items = function(){
		// open first child on ready
		$('.base-fancy-tabmenu').each(function(){
			hide_items($(this).not('#footer-menu-bw'));
			if($(this).find('li:first-child a').attr('href').indexOf('http') !== 0){
				show_item($(this).find('li:first-child a'));
			}
		});

		// toggle the positioning of the current element on the url (when page is loaded)
		function scroll_hash() {
			var urlHash = window.location.hash;
			if (urlHash) {
				$("a[href$='"+urlHash+"']").trigger('click');
			}
		}
		setTimeout(scroll_hash,100);

		// toggle the positioning of a clicked item
		$('.base-fancy-tabmenu').find('a').click(function(event) {
			show_item(this);
		});

		function show_item(thisObj){
			hide_items($(thisObj).parents('.base-fancy-tabmenu'));
			$(thisObj).parents('.base-fancy-tabmenu').find('a').removeClass('nav-active');
			var targetID = $(thisObj).attr('href');
			$(targetID).css({'position':'static','z-index':'10000'});
			$(thisObj).addClass('nav-active');
		}

		function hide_items(thisObj){
			if($(thisObj)){
				var aChildren = $(thisObj).find('li').children(); // find the children of the list items
				var aArray = []; // create the empty aArray
				if (aChildren !== null) for (var i=0; i < aChildren.length; i++) {    
					var aChild = aChildren[i];
					var ahref = $(aChild).attr('href');
					if(ahref.indexOf('http') !== 0) aArray.push(ahref);
				} // this for loop fills the aArray with attribute href values
				if (aArray !== null) for (var i=0; i < aArray.length; i++) {
					$(aArray[i]).css({'position':'absolute','z-index':'-10000'}); // hide the content items
				}
			}
		}
		var base_tweak_menu_mobile = function(){
			if($('html').hasClass('avia-iphone')){
				var aChildren = $(".av-submenu-container").not('#footer-menu-bw').find('li').children(); // find the children of the list items
				var aArray = []; // create the empty aArray
				if (aChildren !== null) for (var i=0; i < aChildren.length; i++) {    
					var aChild = aChildren[i];
					var ahref = $(aChild).attr('href');
					if(ahref.indexOf('http') !== 0) aArray.push(ahref);
				} // this for loop fills the aArray with attribute href values

				// do it for each menu
				// explore the menu and build an array with hashes and labels
				// find the hash and prepend the label as h2
				// remove the position:absolute / hide option for mobile phones
				// create a mobile menu for each section
				// ensure the section is reachable via url
			}
		}();
	}();

	// new lines for solving issues with non-responsive menu
	if ($(window).width() < 780 ){
	  $(".av-subnav-menu").each(function(){
	    var temp = 0;
	    $(this).children('li').each(function(){
	      temp += $(this).width()+9;
	    });
	    $(this).css("width",temp);
	    $(this).parent().css({"overflow":"scroll", "background": "transparent"});
	    $(this).parents(".av-menu-mobile-disabled").css({"width":"100%", "max-width":"100%"});
	  })
	  $(".menu_supplement").remove();
	}


});

