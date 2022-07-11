(function( global, $ ){
    var $body = $("body");
    var screen_width = window.screen.width;
    var current_url = window.location.href.split("?")[0];

    $(".nav_sub").each(function(index, object){
        var $this = $(this);
        var nav_url = $this.attr("href");

        $this.removeClass("active");

        if( current_url === nav_url ){
            $this.addClass("active");
        }

        if( (current_url.indexOf("notice") !== -1 || current_url.indexOf("presentation") !== -1) && current_url.indexOf( nav_url ) !== -1 ){
            $this.addClass("active");
        }
    });

    $(".nav_title").each(function(index, object){
        var $this = $(this);
        var current_page = $this.siblings(".nav_sub_lists").find(".active")[0];

        $this.removeClass("active");

        if( current_page ){
            $this.addClass("active");
        }
    });

    if( window.matchMedia("(min-width: 992px)").matches ){
        headerPc();
    }else{
        headerMobile();
    }

    $(window).resize(function(){
        var scroll_top = $(window).scrollTop();

        if( scroll_top === 0 ){
            $("header").removeClass("indicator");
        }

        if( window.matchMedia("(min-width: 992px)").matches ){
            headerPc();
        }else{
            headerMobile();
        }
    });

    $(window).scroll(function(){
        var $header = $("header");
        var $sub_nav_bg = $(".bg_sub_nav");
        var scroll_top = $(window).scrollTop();

        $header.addClass("indicator");

        if( $(".nav_sub_lists").hasClass("show") ){
            $sub_nav_bg.css("display", "block");
        }

        if( scroll_top === 0 ){
            $header.removeClass("indicator");
            $sub_nav_bg.css("display", "none");
        }
    });

    function headerPc(){
        var $navigation_body = $(".navigation_wrapper");

        $navigation_body.css("display", "block");
        $body.off().on("mouseover", function( event ){
            var $target = $(event.target);
            var $parents = $target.parents("header");
            var scroll_top = $(window).scrollTop() === 0;

            if( !$parents[0] ){
                $(".nav_sub_lists").stop().slideUp("fast").removeClass("show");
                $(".bg_sub_nav").stop().slideUp("fast", function(){
                    if( scroll_top ){
                        $("header").removeClass("indicator");
                    }
                });

                return;
            }

            if( $target.hasClass("nav_title") ){
                $(".nav_sub_lists").stop().slideDown("fast").addClass("show");
                $("header").addClass("indicator");

                if( $("header").hasClass("indicator") ){
                    $(".bg_sub_nav").stop().slideDown("fast");
                }

                return;
            }
        });
    }

    function headerMobile(){
        var $navigation_body = $(".navigation_wrapper");

        $navigation_body.css("display", "none");
        $(".btn_hamburger").removeClass("is-active");
        $("body").removeClass("hidden");
        $body.off().on("click", function( event ){
            var $target = $(event.target);
            var scroll_top = $(window).scrollTop();

            if( ($target.hasClass("btn_hamburger") || $target.parents(".btn_hamburger")[0]) && !($target.hasClass("is-active") || $target.parents(".is-active")[0]) ){
                $navigation_body.fadeIn(200);
                $body.addClass("hidden");
                $("header").addClass("indicator");
                $(".btn_hamburger").addClass("is-active");
                return;
            }

            if( $target.hasClass("is-active") || $target.parents(".is-active")[0] ){
                $navigation_body.fadeOut(200);
                $navigation_body.find(".up").removeClass("up");
                $(".nav_sub_lists").slideUp();
                $body.removeClass("hidden");
                $(".btn_hamburger").removeClass("is-active");

                if( scroll_top === 0 ){
                    $("header").removeClass("indicator");
                }

                return;
            }

            if( $target.hasClass("nav_title") ){
                event.preventDefault();

                var $nav_list = $target.parents(".nav_list");

                $nav_list.find(".nav_sub_lists").stop().slideToggle("fast");
                $target.toggleClass("up");
                return;
            }
        });
    }
})(window, jQuery)
