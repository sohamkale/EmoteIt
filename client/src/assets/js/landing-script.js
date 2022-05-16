// slick slider
$(".slider-area").slick({
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay : true,
    speed: 300,
    centerMode : true,
    centerPadding: '60px',
    centerPadding: '150px',

    responsive: [
        {
          breakpoint: 1199,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '80px',
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '70px',
            slidesToShow: 1,
            dots: false,
          }
        }
      ]
  });

  /*----------------------
 Screen slider
 -------------------------*/
var swiper = new Swiper('.swiper-container', {
  slidesPerView: 2,
  spaceBetween: -500,
  slidesPerGroup: 1,
  loop: true,
  loopFillGroupWithBlank: true,
  autoplay: {
      delay: 150000,
      disableOnInteraction: false,
  },
  breakpoints: {
    1199: {
      slidesPerView: 2,
      spaceBetween: -250,
    },
    767: {
      slidesPerView: 1,
      spaceBetween: -200,
    },
  }
});