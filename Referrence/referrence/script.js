$(document).ready(function(){
  $('#pendingTasksCarousel').carousel({
    interval: 40000
  });

  $('.alert-section .carousel .item').each(function(){
    var next = $(this).next();
    if (!next.length) {
      next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    if (next.next().length>0) {
   
        next.next().children(':first-child').clone().appendTo($(this)).addClass('rightest');
        
    }
    else {
        $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
       
    }
  });
  /*******************************
* ACCORDION WITH TOGGLE ICONS
*******************************/
  function toggleIcon(e) {
        $(e.target)
            .prev('.panel-heading')
            .find(".more-less")
            .toggleClass('glyphicon-plus glyphicon-minus');
    }
    $('.panel-group').on('hidden.bs.collapse', toggleIcon);
    $('.panel-group').on('shown.bs.collapse', toggleIcon);
});