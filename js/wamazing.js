$(function() {
	"use strict";

    //VARIABLES
    var tabFinish = 0, enableScroll = 0, swipers = [],winW, winH, xsPoint = 767, smPoint = 991, mdPoint = 1199, initIterator = 0, is_visible = $('.menu-button').is(':visible');
    winW = $(window).width();
    winH  =  $(window).height();


    //WINDOW LOAD
		$(window).load(function(){
			$('body').addClass('loaded');
			$('#loader-wrapper').fadeOut();


			});

    //SCROLL MENU
    function scrollCall(){
        var winScroll = $(window).scrollTop();
        if($('.scroll-to-block').length && enableScroll){
            $('.scroll-to-block').each(function( index, element ) {
                if($(element).offset().top<=(winScroll + 2) && ($(element).offset().top+$(element).height()) > (winScroll) ){
                    $('.scroll-to-link').parent().removeClass('active');
                    $('.scroll-to-link').eq(index).parent().addClass('active');
                    if(window.location.hash!=$('.scroll-to-link').eq(index).attr('href')) window.location.hash = $('.scroll-to-link').eq(index).attr('href');
                }
            });
        }
    }

    $('.scroll-to-link').on('click',function(){
        var index = $(this).parent().parent().find('.scroll-to-link').index(this);

        $('body, html').animate({'scrollTop':$('.scroll-to-block').eq(index).offset().top}, 800);
        return false;
    });


    //Swiper
    function initSwiper(){
        var initIterator = 0;
        $('.swiper-container').each(function(){
            var $t = $(this);

            var index = 'unique-id-'+initIterator;
            var slideMode = $(this).attr('data-mode');
            $t.attr('data-init', index).addClass('initialized');
            $t.find('.pagination').addClass('pagination-'+index);

            var loopVar = parseInt($t.attr('data-loop')),
                slidesPerViewVar = $t.attr('data-slides-per-view'),
                xsValue, smValue, mdValue, lgValue;
            var centeredSlidesVar = ($t.closest('.history, .testimonials-container').length)?1:0;
            if(slidesPerViewVar == 'responsive'){
                slidesPerViewVar = 1;
                xsValue = $t.attr('data-xs-slides');
                smValue = $t.attr('data-sm-slides');
                mdValue = $t.attr('data-md-slides');
                lgValue = $t.attr('data-lg-slides');
            }

            swipers[index] = new Swiper(this,{
                pagination: '.pagination-'+index,
                loop: loopVar,
                paginationClickable: true,
                calculateHeight: true,
                slidesPerView: slidesPerViewVar,
                roundLengths: true,
                mode:slideMode,
                centeredSlides: centeredSlidesVar,
                onInit: function(swiper){
                    if($t.attr('data-slides-per-view')=='responsive') updateSlidesPerView(xsValue, smValue, mdValue, lgValue, swiper);
                },
                onSlideChangeEnd:function(swiper){

                    var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
                    if($t.next().find('.slider-index').length) {
                        $t.next().find(".start_index").html(activeIndex+1);
                    }
                    if($t.find('.slider-index').length) {
                        $t.find(".start_index").html(activeIndex+1);
                    }
                    if($t.hasClass('swiper-project')) {
                        var activeSlide = $t.find('.swiper-slide-active'),
                            activePrev =  activeSlide.prev().data('name'),
                            activeNext =  activeSlide.next().data('name');

                        $('.v-project-prev span').text(activePrev);
                        $('.v-project-next span').text(activeNext);

                        if(!activeSlide.next().hasClass('swiper-slide')) {
                            $('.v-project-next').fadeOut();
                        }
                        else{
                            $('.v-project-next').fadeIn();
                        }

                        if(!activeSlide.prev().hasClass('swiper-slide')) {
                            $('.v-project-prev').fadeOut();
                        }
                        else{
                            $('.v-project-prev').fadeIn();
                        }
                    }
                    if($t.hasClass('testimonials-slider')) {
                        $('.testimonials-item').parent().find('.testimonials-item').css('display', 'none').removeClass('active');
                        $('.testimonials-item').eq(activeIndex).css({
                            'display' : 'block',
                            'opacity' : 0
                        }).animate({'opacity' : 1},50,
                        function() {
                            $(this).addClass('active');
                        }
                        );
                    }

                },
                onSlideChangeStart: function(swiper){

                    if($t.closest('.w-banner').length){
                        $('.banner-navigation').removeClass('active-nav');
                        $('.banner-navigation').eq(activeIndex).addClass('active-nav');
                    }
                }
            });
            swipers[index].reInit();
            if($t.find('.default-active').length) swipers[index].swipeTo($t.find('.swiper-slide').index($t.find('.default-active')), 0);
            initIterator++;
        });
    };


    // BACKGROUND IMG
    $('.center-image').each(function(){
        var bgSrc = $(this).attr('src');
        $(this).parent().css({'background-image':'url('+bgSrc+')'});
        $(this).remove();
    });

		isotopFn();
		var $container = $('.isotope');
		$container.isotope({
				itemSelector: '.news-box',
				masonry: '.news-box'
		});

		//FILTER FUNCTIONS
		function isotopFn(){
				var $container = $('.isotope');
				$container.isotope({
						itemSelector: '.news-box',
						masonry: '.news-box'
				});


				$('.view').on( 'click', function(e) {
						e.preventDefault();
						$(this).fadeOut(300);
						// create new item elements
						var $elems = getItemElement();
						// append elements to container
						$container.append( $elems )
								// add and lay out newly appended elements
								.isotope( 'appended', $elems );

				});


		// make <div class="item width# height#" />
				function getItemElement() {
						var $item = $('.news-box').clone();
						// add width and height class
						return $item;
				}

				$('#filters').on( 'click', 'button', function() {
						$('#filters button').removeClass('actual');
						$(this).addClass('actual');
						var filterValue = $(this).attr('data-filter');
						$container.isotope({filter: filterValue});
				});

				$('#filters').on('click','button', function() {
						$('#filters button').removeClass('actual');
						$(this).addClass('actual');
						var selector = $(this).data('filter');
						if ( selector !== '*' ) {
								selector = selector + ', .corner-stamp'
						}
						$container.isotope({ filter: selector });
				});

		}


    //HEADER FIXED ON SCROLL
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 10) {
            $('.b-header').addClass("b-header-active");
            $('.w-header').addClass("w-header-active");
            $('.r-header').addClass("r-header-active");
            $('.m-header ').addClass("m-header-bg");

        } else {
            $('.b-header').removeClass("b-header-active");
            $('.w-header').removeClass("w-header-active");
            $('.m-header ').removeClass("m-header-bg");
        }
    });



    //MENU RESPONSIVE SHOW
    $('.menu-button').on('click', function () {
        var menu = $('.nav').slideToggle(400);
        $(this).toggleClass('active');

        $(window).resize(function(){
            var w = $(window).width();
            if(w > 320 && menu.is(':hidden')) {
                menu.removeAttr('style');
            }
        });
    });

    //MENU RESPONSIVE SHOW TYPE2
    $('.m-menu-button').on('click', function () {
        $(this).toggleClass('active');
        $('.m-header').toggleClass('m-header-active');
        $('.m-nav').toggleClass('m-nav-active');

    });

    if(is_visible){
        $('.nav a').on('click', function () {
            $('.nav').slideUp(300);
            $('.menu-button').removeClass('active');
        });
    }

    $('.m-nav a').on('click', function () {
        if(winW < 992 ) {
            $('.m-nav').removeClass('m-nav-active');
        }
    });


});

//Google MAP
function initMap() {
	var uluru = {lat: 35.6630945, lng: 139.75708199999997};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 18,
		center: uluru
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
}

/*
* This is the plugin
*/
(function(a){a.createModal=function(b){defaults={title:"",message:"Your Message Goes Here!",closeButton:true,scrollable:false};var b=a.extend({},defaults,b);var c=(b.scrollable===true)?'style="max-height: 600px;overflow-y: auto;"':"";html='<div class="modal fade" id="myModal">';html+='<div class="modal-dialog modal-lg">';html+='<div class="modal-content">';html+='<div class="modal-header">';html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>';if(b.title.length>0){html+='<h4 class="modal-title">'+b.title+"</h4>"}html+="</div>";html+='<div class="modal-body" '+c+">";html+=b.message;html+="</div>";html+='<div class="modal-footer">';if(b.closeButton===true){html+='<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>'}html+="</div>";html+="</div>";html+="</div>";html+="</div>";a("body").prepend(html);a("#myModal").modal().on("hidden.bs.modal",function(){a(this).remove()})}})(jQuery);

/*
* Here is how you use it
*/
$(function(){
    $('.view-pdf').on('click',function(){
        var pdf_link = $(this).attr('href');
        var iframe = '<div class="iframe-container"><iframe src="'+pdf_link+'"></iframe></div>'
        $.createModal({
        title:'WAmazing',
        message: iframe,
        closeButton:true,
        scrollable:false
        });
        return false;
    });
})
