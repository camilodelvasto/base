/*
Theme Name: Basecamp
Description: Custom theme for Basecamp
Version: 1.0
Author: Weltimedia
Author URI: http://www.welti.media
*/
var $ = jQuery.noConflict();

$(document).ready(function(){


	var aChildren = $(".av-submenu-container").find('li').children(); // find the a children of the list items
	var aArray = []; // create the empty aArray
	for (var i=0; i < aChildren.length; i++) {    
		var aChild = aChildren[i];
		var ahref = $(aChild).attr('href');
		if(ahref.indexOf('http') !== 0) aArray.push(ahref);
	} // this for loop fills the aArray with attribute href values

	$(window).scroll(function(){
		var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
		var windowHeight = $(window).height(); // get the height of the window
		var docHeight = $(document).height();

		for (var i=0; i < aArray.length; i++) {
			var theID = aArray[i];
			if ($(theID).length) var divPos = $(theID).offset().top-70; // get the offset of the div from the top of page
			var divHeight = $(theID).height(); // get the height of the div in question
			if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
				$("a[href='" + theID + "']").addClass("nav-active");
			} else {
				$("a[href='" + theID + "']").removeClass("nav-active");
			}
		}

		if(windowPos + windowHeight == docHeight) {
			if (!$(".av-submenu-container li:last-child a").hasClass("nav-active")) {
				var navActiveCurrent = $(".nav-active").attr("href");
				$("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
				$(".av-submenu-container li:last-child a").addClass("nav-active");
			}
		}
	});

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

		}
	}
	//base_colored_menu('#sub_menu2','#550053','#a5889b');
	$('.av-submenu-container > div').each(function(){
		console.log($(this).data('color_start')+','+$(this).data('color_end'));
		var color_start = $(this).data('color_start');
		var color_end = $(this).data('color_end');
		var color_selection = $(this).data('color_selection');
		console.log(color_selection);
		if (color_selection == 'custom-color-menu' && !(color_end || color_start)){
			color_start =  '#550053';
			color_end =  '#dd22aa';
		}
		base_colored_menu($(this),color_start,color_end);
	})

	// attach a copy of the first menu to the fotter
	if('.av-submenu-container'){
		var newMenu = $('.av-submenu-container').first().clone();
		$(newMenu).attr('id','footer-menu-bw');
		$(newMenu).removeClass('av-sticky-submenu');
		$(newMenu).prependTo('#footer');
	}
});

