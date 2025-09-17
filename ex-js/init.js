(function($) {
  $(function() {

    $('.button-collapse').sideNav();
    $('.parallax').parallax('100%');
    $('.materialboxed').materialbox();

    $('.carousel.carousel-slider').carousel({
      fullWidth: true
    });
    $('.slider').slider();
    $('.modal').modal();


    $('iframe').each(function(idx, el) {
      var obj = $(el);
      if (!obj.attr('src').match(/www\.google\.com\/maps/)) return;
      obj.css('pointer-events', 'none');
      obj.parent().on('click', function() {
        obj.css('pointer-events', 'auto');
      });
      obj.on('mouseout', function() {
        obj.css('pointer-events', 'none');
      });
    });

  });
})(jQuery);