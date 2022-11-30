(function (window, $) {
  $(document).on('click touchstart', '.slide .cover', function() {
    if ($('.slide video').length > 0) {
      var $this = $(this);
      var $parent = $(this).parent();
      $this.addClass('inactive').fadeOut(800);
      $parent.find('.slide-video').get(0).play();
    } else {
      return;
    }
  });
  $('.slide video').on('ended', function() {
    var $this = $(this);
    var $parent = $(this).parent();
    $parent.find('.cover.inactive').fadeIn(800).removeClass('inactive');
  });
}(window, jQuery));