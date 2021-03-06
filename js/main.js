
particlesJS.load('particles-js', 'assets/particles.json');

;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};



	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#FF9000',
			trackColor:	"#f5f5f5",
			size: 160,
			animate: 1000
		});
	};

	var skillsWayPoint = function() {
		if ($('#fh5co-skills').length > 0 ) {
			$('#fh5co-skills').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( pieChart , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}

	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	
	$(function(){
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		// pieChart();
		skillsWayPoint();
	});
	
	$(window).scroll(function() {
		if ($(this).scrollTop() > 100) {
			$('#header').addClass('header-scrolled');
		} else {
			$('#header').removeClass('header-scrolled');
		}
	});
	
	  var nav_sections = $('section');
	  var main_nav = $('.nav-menu, .mobile-nav');

	  $(window).on('scroll', function() {
	    var cur_pos = $(this).scrollTop() + 200;

	    nav_sections.each(function() {
	      var top = $(this).offset().top,
	        bottom = top + $(this).outerHeight();

	      if (cur_pos >= top && cur_pos <= bottom) {
	        if (cur_pos <= bottom) {
	          main_nav.find('li').removeClass('active');
	        }
	        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
	      }
	      if (cur_pos < 300) {
	        $(".nav-menu ul:first li:first").addClass('active');
	      }
	    });
	  });
	  
	  var scrolltoOffset = $('#header').outerHeight() - 21;
	  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
	    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      if (target.length) {
	        e.preventDefault();

	        var scrollto = target.offset().top - scrolltoOffset;

	        $('html, body').animate({
	          scrollTop: scrollto
	        }, 1500, 'easeInOutExpo');

	        if ($(this).parents('.nav-menu, .mobile-nav').length) {
	          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
	          $(this).closest('li').addClass('active');
	        }

	        if ($('body').hasClass('mobile-nav-active')) {
	          $('body').removeClass('mobile-nav-active');
	          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
	          $('.mobile-nav-overly').fadeOut();
	        }
	        return false;
	      }
	    }
	  });
	  
	  if ($('.nav-menu').length) {
		    var $mobile_nav = $('.nav-menu').clone().prop({
		      class: 'mobile-nav d-lg-none'
		    });
		    $('body').append($mobile_nav);
		    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
		    $('body').append('<div class="mobile-nav-overly"></div>');

		    $(document).on('click', '.mobile-nav-toggle', function(e) {
		      $('body').toggleClass('mobile-nav-active');
		      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
		      $('.mobile-nav-overly').toggle();
		    });

		    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
		      e.preventDefault();
		      $(this).next().slideToggle(300);
		      $(this).parent().toggleClass('active');
		    });

		    $(document).click(function(e) {
		      var container = $(".mobile-nav, .mobile-nav-toggle");
		      if (!container.is(e.target) && container.has(e.target).length === 0) {
		        if ($('body').hasClass('mobile-nav-active')) {
		          $('body').removeClass('mobile-nav-active');
		          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
		          $('.mobile-nav-overly').fadeOut();
		        }
		      }
		    });
		  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
		    $(".mobile-nav, .mobile-nav-toggle").hide();
		  }	  

}());


