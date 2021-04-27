// cursor effect 
$(function() {
  var prefix = function() {
      var a = window.getComputedStyle(document.documentElement, ""),
          b = (Array.prototype.slice.call(a).join("").match(/-(moz|webkit|ms)-/) || "" === a.OLink && ["", "o"])[1];
      return "WebKit|Moz|MS|O".match(new RegExp("(" + b + ")", "i"))[1], "-" + b + "-"
  }();
  $(document).mousemove(function(e) {
      mouseX = e.pageX + 15;
      mouseY = e.pageY - $(window).scrollTop() + 15;
      $('.theBall-outer').attr('style', prefix + 'transform:translate(' + mouseX + 'px,' + mouseY + 'px)');
  });

  $(document).on('mouseenter', 'a', function() {
      $('.theBall').addClass('zooming');
  }).on('mouseleave', 'a', function() {
      $(".theBall").removeClass("zooming")
  });
})


// smooth scroll on arrow effect 

$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 2800);
    return false;
});

$("a").click(function(){
	$("#down").fadeOut();
  });

/*

This effect changes background on scroll, 
should be smooth animation - *not* fast, harsh 

maybe limited color transitions? 

*/

// $(document).ready(function(){       
// 	var scroll_pos = 0;
// 	$(document).scroll(function() { 
// 		scroll_pos = $(this).scrollTop();
// 		if(scroll_pos > 210) {
// 			$("body").css('background-color', 'blue');
// 		} else {
// 			$("body").css('background-color', 'red');
// 		}
// 	});
// });

// $(document).ready(function(){
//     $(document).scroll(function() {
//         var alpha = Math.min(0.8 + 0.1 * $(this).scrollTop() / 102, 0.9);
//         var channel = Math.round(alpha * 255);
//         $("body").css('background-color', 'rgb(' + channel + ',' + channel + ',' + channel + ')');
//     });
// });




/* 
 * HOVER ALPHA EFFECT
 * Move your mouse or drag your finger to change the alpha opacity color of the text, and to see 3 colorful text-shadow effects.
 *
 * Headline is editable, so place your cursor in the text and type anything else you'd like.
 *
 * #028 - #100DaysOfCode
 * By ilithya | 2019
 */

function getTwoDecimal(num) {
	// The +0.5 smoothens the transition change
	return parseFloat(num.toFixed(2) + 0.5);
}

const mouse = {
	decimal(coord) {
		return getTwoDecimal(coord / 1000);
	},
	x(e) {
		return Math.abs(e.clientX - (window.innerWidth / 2));
	},
	y(e) {
		return Math.abs(e.clientY - (window.innerHeight / 2));
	}
};

const changeTextAlphaVal = (txt, e) => {
	const root = document.querySelector(":root");
	const cssVar = "--alpha";
	const currentAlpha = getComputedStyle(root)
	.getPropertyValue(cssVar)
	.trim();

	const max = parseFloat(currentAlpha);
	const dx = mouse.decimal(mouse.x(e));
	const dy = mouse.decimal(mouse.y(e));

	let alphaVal;
	if (dx <= 0) {
		alphaVal = dy >= max ? dy : getTwoDecimal(max - dy);
	} else {
		alphaVal = dx >= max ? dx : getTwoDecimal(max - dx);
	}

	txt.style.setProperty(cssVar, alphaVal);	
};

function createShadow(e, currTarget) {
	// Walk effect based on Wes Bos' Mouse Move Shadow Exercise
	// https://tinyurl.com/touabxe
	const walk = Math.round(Math.max(window.innerWidth, window.innerHeight)/6); // Or use 150?
	const coordWalk = (coord, side) => Math.round((coord / side * walk) - (walk / 2));
	const xWalk = coordWalk(e.clientX, currTarget.offsetWidth);
	const yWalk = coordWalk(e.clientY, currTarget.offsetHeight);

	const pink = [255,47,47];
	const blue = [255,201,262];
	const yellow = [155,177,58];
	const typoAlpha = 0.0;

	const typo = currTarget.querySelector(".typo");
	changeTextAlphaVal(typo, e); // Comment this if you don't want the text alpha opacity to change on interaction

	typo.style.textShadow = `
	  ${xWalk}px ${yWalk}px 0 rgba(${pink}, ${typoAlpha}),
	  ${xWalk * -1}px ${yWalk * 2}px 0 rgba(${blue}, ${typoAlpha}),
	  ${xWalk * -2}px ${yWalk * -1}px 0 rgba(${yellow}, ${typoAlpha})
	`;
}

function onMouseMove(e) {
	createShadow(e, e.currentTarget);
}

function onTouchMove(e) {
	createShadow(e.changedTouches[0], e.currentTarget);
}

const heading = document.querySelector(".heading");
heading.addEventListener("mousemove", onMouseMove);
heading.addEventListener("touchmove", onTouchMove);

// const projects = document.querySelector(".projects");
// projects.addEventListener("mousemove", onMouseMove);
// heading.addEventListener("touchmove", onTouchMove);



/* 
fade in content effect 
when scrolled to certain point, content appears in 
 */
$(document).ready(function() {
    
    /* Every time the window is scrolled ... */
    $(window).scroll( function(){
    
        /* Check the location of each desired element */
        $('.hideme').each( function(i){
            
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            /* If the object is completely visible in the window, fade in */
            if( bottom_of_window > bottom_of_object ){
                
                $(this).animate({'opacity':'1'},1700);
                    
            }
            
        }); 
    
    });
    
});


