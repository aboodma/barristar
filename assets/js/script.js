(function($) {

	"use strict";


    // Parallax background
    function bgParallax() {
        if ($(".parallax").length) {
            $(".parallax").each(function() {
                var height = $(this).position().top;
                var resize     = height - $(window).scrollTop();
                var doParallax = -(resize/5);
                var positionValue   = doParallax + "px";
                var img = $(this).data("bg-image");

                $(this).css({
                    backgroundImage: "url(" + img + ")",
                    backgroundPosition: "50%" + positionValue,
                    backgroundSize: "cover"
                });
            });
        }
    }


    // Hero slider background setting
    function sliderBgSetting() {
        if ($(".hero-slider .slide").length) {
            $(".hero-slider .slide").each(function() {
                var $this = $(this);
                var img = $this.find(".slider-bg").attr("src");

                $this.css({
                    backgroundImage: "url("+ img +")",
                    backgroundSize: "cover",
                    backgroundPosition: "center center"
                })
            });
        }
    }


    //Setting hero slider
    function heroSlider() {
        if ($(".hero-slider").length) {
            $(".hero-slider").slick({
                autoplay: true,
                autoplaySpeed: 6000,
                pauseOnHover: true,
                arrows: true,
                prevArrow: '<button type="button" class="slick-prev">Previous</button>',
                nextArrow: '<button type="button" class="slick-next">Next</button>',
                dots: true,
                fade: true,
                cssEase: 'linear'
            });
        }
    }


    /*================================
    3. Variable Initialize
    ==================================*/
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
    var preloader = $('#preloader');

    /*================================
    4. Preloader
    ==================================*/
    function prealoaderSetup() {
        if (!isMobile) {
            setTimeout(function() {
                preloader.addClass('preloaded');
            }, 800);
            setTimeout(function() {
                preloader.remove();
            }, 2000);

        } else {
            preloader.remove();
        }
        
        //Active heor slider
                heroSlider();
    }


    /*================================
    slicknav
    ==================================*/
    $('.main-menu .nav_mobile_menu').slicknav({
        prependTo: ".mobile_menu"
    });

    /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
    var wow = new WOW({
        boxClass:     'wow',      // default
        animateClass: 'animated', // default
        offset:       0,          // default
        mobile:       true,       // default
        live:         true        // default
    });

    /*------------------------------------------
        = CONTACT FORM SUBMISSION
    -------------------------------------------*/
    if ($("#contact-form").length) {
        $("#contact-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },

                email: "required",

                phone: "required",

                address: "required",
            },

            messages: {
                name: "Please enter your name",
                email: "Please enter your email address",
                phone: "Please enter your phone number",
                address: "Please enter your address",
            },

            submitHandler: function (form) {
                $.ajax({
                    type: "POST",
                    url: "mail.php",
                    data: $(form).serialize(),
                    success: function () {
                        $( "#loader").hide();
                        $( "#success").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#success").slideUp( "slow" );
                        }, 3000);
                        form.reset();
                    },
                    error: function() {
                        $( "#loader").hide();
                        $( "#error").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#error").slideUp( "slow" );
                        }, 3000);
                    }
                });
                return false; // required to block normal submit since you used ajax
            }

        });
    }
    // // stickey menu
    $(window).on('scroll',function() {    
        var scroll = $(window).scrollTop(),
            mainHeader = $('#sticky-header'),
            mainHeaderHeight = mainHeader.innerHeight();
        
        // console.log(mainHeader.innerHeight());
        if (scroll > 1) {
            $("#sticky-header").addClass("sticky");
        }else{
            $("#sticky-header").removeClass("sticky");
        }
    });
    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).on("scroll", function() {
        toggleBackToTopBtn();

    });


    /*==========================================================================
        WHEN DOCUMENT LOADING
    ==========================================================================*/
        $(window).on('load', function() {

            prealoaderSetup();

            sliderBgSetting();

        });
        
    /*------------------------------------------
        = POPUP VIDEO
    -------------------------------------------*/
    if ($(".video-btn").length) {
        $(".video-btn").on("click", function(){
            $.fancybox({
                href: this.href,
                type: $(this).data("type"),
                'title'         : this.title,
                helpers     : {
                    title : { type : 'inside' },
                    media : {}
                },

                beforeShow : function(){
                    $(".fancybox-wrap").addClass("gallery-fancybox");
                }
            });
            return false
        });
    }


    /*================================
      Isotope Portfolio
     ==================================*/
    $('.grid').imagesLoaded(function() {

        // filter items on button click
        $('.studies-menu').on('click', 'button', function() {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({
                filter: filterValue
            });
        });

        // init Isotope
        var $grid = $('.grid').isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            masonry: {
                // use outer width of grid-sizer for columnWidth
                columnWidth: '.grid-item',
            }
        });



    });

    $('.studies-menu button').on('click', function() {
        $('.studies-menu button').removeClass('active');
        $(this).addClass('active');
    });

    /*================================
     Gift-carousel
     ==================================*/
    function gift_carousel() {
        var owl = $(".testimonial-slide");
        owl.owlCarousel({
            loop: true,
            margin: 0,
            navText: false,
            nav: false,
            items: 5,
            smartSpeed: 1000,
            dots: true,
            autoplay: true,
            autoplayTimeout: 3000,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                760: {
                    items: 1
                },
                1080: {
                    items: 1
                }
            }
        });
    }
    gift_carousel();

    $(document).ready(function() {

    $('.expert-active ').owlCarousel({
        loop: true,
        margin:30,
        autoplay: false,
        smartSpeed: 1500,
        mouseDrag: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        nav: true,
        responsive: {
            0: {
                items:1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
});

/*------------------------------------------
    = FUNFACE
-------------------------------------------*/
if ($(".odometer").length) {
    $('.odometer').appear();
    $(document.body).on('appear', '.odometer', function(e) {
        var odo = $(".odometer");
        odo.each(function() {
            var countNumber = $(this).attr("data-count");
            $(this).html(countNumber);
        });
    });
}
    /*------------------------------------------
        = BACK TO TOP BTN SETTING
    -------------------------------------------*/
    $("body").append("<a href='#' class='back-to-top'><i class='fa fa-angle-up'></i></a>");

    function toggleBackToTopBtn() {
        var amountScrolled = 1000;
        if ($(window).scrollTop() > amountScrolled) {
            $("a.back-to-top").fadeIn("slow");
        } else {
            $("a.back-to-top").fadeOut("slow");
        }
    }

    $(".back-to-top").on("click", function() {
        $("html,body").animate({
            scrollTop: 0
        }, 700);
        return false;
    })





})(window.jQuery);
