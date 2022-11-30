(function (window, $) {
  var Main = {};

  Main.init = function () {
    Main.brands();
    Main.financialServices();
    Main.slickHome();
    Main.pauseVideoSlide();
    Main.slideYoutube();
  };

  Main.brands = function () {
    $(".brands .btn").hover(function () {
      var _this = $(this);
      _this.parent().find(".over, .image-container, p").toggleClass("hover");
    });
  };

  Main.financialServices = function () {
    $(".financial-services .btn").hover(function () {
      _this = $(this);
      _this.parent().find(".over").toggleClass("active");
    });
  };

  Main.slickHome = function () {
    $(".highlight-slide").slick({
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      responsive: [
        {
          breakpoint: 980,
          settings: {
            arrows: false,
          },
        },
      ],
    });
    $('.energy-slider').slick({ 
      dots: true,
      fade:true,
      infinite:true,
      autoplay: true,
      autoplaySpeed: 6000,
      pauseOnHover:true,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            arrows: false,
          },
        },
      ],
    });
  };

  Main.pauseVideoSlide = function () {
    function autoPlay() {
      if ($(".highlight-slide-item.slick-current.autoplay").length !== 0) {
        $(this).find(".slick-dots").addClass("remove");
        $(".highlight-slide-item.slick-current")
          .find(".cover")
          .addClass("inactive")
          .fadeOut(800);
        $(".highlight-slide .slick-current video")[0].play();
      } else {
        $("video").each(function () {
          $(this).get(0).pause();
        });
      }
    }

    $(function () {
      autoPlay();
    });

    $(".slide .cover").on("click", function () {
      $(".highlight-slide").find(".slick-dots").addClass("remove");
      $(".highlight-slide-item.slick-current")
        .find(".cover")
        .addClass("inactive")
        .fadeOut(800);
      $(".highlight-slide-item.slick-current").addClass("playing");
      $(".highlight-slide .slick-current video")[0].play();
    });

    $(".highlight-slide").on("beforeChange", function () {
      $(this).find(".slick-dots").removeClass("remove");

      autoPlay();

      if ($(".highlight-slide-item.slick-current.playing").length !== 0) {
        $("video").each(function () {
          $(this).get(0).pause();
        });
      }
    });

    $(".highlight-slide").on("afterChange", function () {
      autoPlay();

      if (
        $(".highlight-slide-item.slick-current.playing").find("video")
          .length !== 0
      ) {
        $(this).find(".slick-dots").addClass("remove");
        $(".highlight-slide .slick-current video")[0].play();
      }
    });
  };

  Main.slideYoutube = function () {
    var videoId = $("#highlight-slide-video").data("video-id");

    function loadScript() {
      if (typeof YT == "undefined" || typeof YT.Player == "undefined") {
        var tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }

    function loadPlayer() {
      window.onYouTubePlayerAPIReady = function () {
        onYouTubePlayerAPIReady();
      };
    }

    var player;
    function onYouTubePlayerAPIReady() {
      player = new YT.Player("highlight-slide-video", {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          fs: 0,
          cc_load_policy: 0,
          iv_load_policy: 3,
          autohide: 0,
          disablekb: 1,
          rel: 0,
          playsinline: 1,
          mute: 1,
          loop: 1,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    }

    function onPlayerReady(event) {
      event.target.playVideo();
    }

    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.ENDED) {
        player.seekTo(0);
        player.playVideo();
      }
    }

    $(function () {
      loadScript();
      loadPlayer();
    });
  };

  Main.init();
})(window, jQuery);
