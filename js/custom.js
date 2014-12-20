/*
Theme Name: Basecamp
Description: Custom theme for Basecamp
Version: 1.0
Author: Weltimedia
Author URI: http://www.welti.media
*/
var $ = jQuery.noConflict();

$(document).ready(function(){


    var aChildren = $("#sub_menu1 li").children(); // find the a children of the list items
    var aArray = []; // create the empty aArray
    for (var i=0; i < aChildren.length; i++) {    
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
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
            if (!$("#sub_menu1 li:last-child a").hasClass("nav-active")) {
                var navActiveCurrent = $(".nav-active").attr("href");
                $("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
                $("#sub_menu1 li:last-child a").addClass("nav-active");
            }
        }
    });
});

