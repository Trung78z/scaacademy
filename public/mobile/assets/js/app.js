const colorSuccess = "rgb(22 163 74)";
const colorError = "rgb(220 38 38)";
const iconSuccess = '<i class="fa-regular fa-circle-check text-lg"></i>';
const iconError = '<i class="fa-regular fa-circle-xmark text-lg"></i>';
const Toast = Swal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    container: "!w-auto",
    htmlContainer: "!text-sm !text-white !m-0",
    popup: "!p-2",
  },
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
gsap.registerPlugin(ScrollTrigger);
function htmlToast(status, message) {
  if (status == "error") {
    return {
      background: colorError,
      html:
        '<div class="flex items-center gap-2">' +
        iconError +
        "<span>" +
        message +
        "</span></div>",
    };
  } else {
    return {
      background: colorSuccess,
      html:
        '<div class="flex items-center gap-2">' +
        iconSuccess +
        "<span>" +
        message +
        "</span></div>",
    };
  }
}

$(document).ready(function () {
  Splitting();

  $("#js__section-1").on("mousemove", function (e) {
    let o = {
        X: e.clientX,
        Y: e.clientY,
      },
      i = $(window).width() / 2,
      l = $(window).height() / 2;
    DX = o.X - i;
    DY = o.Y - l;
    MoveX = DY / l;
    MoveY = -(DX / i);
    Radius = Math.sqrt(Math.pow(MoveX, 2) + Math.pow(MoveY, 2));
    Degree = 10 * Radius;
    gsap.to("#js__screen", {
      x: 5 * MoveX,
      y: 25 * MoveY,
      z: Degree,
      ease: Power2.easeOut,
    });
    gsap.to("#js__text", {
      x: 40 * MoveX,
      y: 20 * MoveY,
      z: Degree,
      ease: Power2.easeOut,
    });
    gsap.to("#js__people", {
      x: 25 * MoveX,
      y: 5 * MoveY,
      z: Degree,
      ease: Power2.easeOut,
    });
  });

  $(".project-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    dots: true,
    asNavFor: ".project-thumbnail-slider",
  });
  $(".project-thumbnail-slider").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: ".project-slider",
    focusOnSelect: true,
    infinite: true,
  });

  $(".graphic-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    dots: false,
    infinite: false,
  });

  $(".project-slider").on(
    "afterChange",
    function (event, slick, currentSlide, nextSlide) {
      $(".graphic-slider").slick("slickGoTo", currentSlide);
    }
  );

  $(".team-slider").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    infinite: true,
  });

  $(".blog-slider").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    infinite: true,
  });

  $(".service-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    infinite: true,
  });
  var wDot = $(".service-slider .slick-dots").width();
  var wNext = $(".service-slider .slick-next").width();
  $(".service-slider .slick-prev").css("right", wDot + wNext + 111);

  $("#js__toggle-menu").on("click", function () {
    console.log("active");
    $(this).toggleClass("bg-white/20 is-active");
    $("#js__page-right").toggleClass("z-[90]");
    $("#js__logo").toggleClass("z-[90]");
    $("#js__menu").toggleClass("is-active");
    $("#js__menu").toggleClass("translate-y-0");
    $("#js__page-menu").toggleClass("hidden");
    $("#js__page-social").toggleClass("hidden");
  });

  $(".js__page-menu-link").on("click", function () {
    $("#js__toggle-menu").toggleClass("bg-white/20 is-active");
    $("#js__page-right").toggleClass("z-[90]");
    $("#js__logo").toggleClass("z-[90]");
    $("#js__menu").toggleClass("is-active");
    $("#js__menu").toggleClass("translate-y-0");
    $("#js__page-menu").toggleClass("hidden");
    $("#js__page-social").toggleClass("hidden");
  });

  $("#js__open-section-team").on("click", function () {
    gsap.to("#js__section-team", {
      x: 0,
      ease: "sine.inOut",
    });
  });

  $("#js__show-contact-popup").on("click", function () {
    $("#contact-popup").removeClass("invisible opacity-0");
  });

  $("#js__close-contact-popup").on("click", function () {
    $("#contact-popup").addClass("invisible opacity-0");
  });

  $("#js__close-section-team").on("click", function () {
    gsap.to("#js__section-team", {
      x: "100%",
      ease: "sine.inOut",
    });
  });

  $(".service-item1").on("click", function () {
    gsap.to("#content-service-1", {
      x: 0,
      opacity: 100,
      ease: "sine.inOut",
    });
  });
  $(".service-item2").on("click", function () {
    gsap.to("#content-service-2", {
      x: 0,
      opacity: 100,
      ease: "sine.inOut",
    });
  });
  $(".service-item3").on("click", function () {
    gsap.to("#content-service-3", {
      x: 0,
      opacity: 100,
      ease: "sine.inOut",
    });
  });
  $(".service-item4").on("click", function () {
    gsap.to("#content-service-4", {
      x: 0,
      opacity: 100,
      ease: "sine.inOut",
    });
  });
  $(".close-parent").on("click", function () {
    gsap.to($(this).parent(), {
      x: "100%",
      opacity: 0,
      ease: "sine.inOut",
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const words = document.querySelectorAll(".word");

  words.forEach((word) => {
    const wordIndex = parseInt(word.style.getPropertyValue("--word-index"));
    const speed = wordIndex % 2 === 0 ? -0.25 : 0.25;

    // Đặt vị trí ban đầu của các phần tử .word
    gsap.set(word, { y: speed * 100 });
    gsap.set("#js__text-show", { y: 10 });
    gsap.set("#contact-btn", { y: 10 });

    gsap.to(word, {
      scrollTrigger: {
        trigger: word,
        start: "bottom bottom", // Bắt đầu hiệu ứng khi phần tử chạm đáy viewport
        end: "bottom center", // Kết thúc hiệu ứng khi phần tử vào giữa viewport
        scrub: true, // Đồng bộ hiệu ứng với cuộn trang
        scroller: "#scroll-full", // Chỉ định phần tử container để lắng nghe sự kiện cuộn
      },
      y: 0,
      opacity: 0,
      ease: "power1.out",
    });
  });

  gsap.to("#js__text-show", {
    scrollTrigger: {
      trigger: "#js__text-show",
      start: "center center", // Bắt đầu hiệu ứng khi phần tử chạm đáy viewport
      end: "bottom center", // Kết thúc hiệu ứng khi phần tử vào giữa viewport
      scrub: true, // Đồng bộ hiệu ứng với cuộn trang
      scroller: "#scroll-full", // Chỉ định phần tử container để lắng nghe sự kiện cuộn
    },
    opacity: 1,
    y: 0,
    ease: "power1.out",
  });

  gsap.to("#contact-btn", {
    scrollTrigger: {
      trigger: "#contact-btn",
      start: "center center", // Bắt đầu hiệu ứng khi phần tử chạm đáy viewport
      end: "bottom center", // Kết thúc hiệu ứng khi phần tử vào giữa viewport
      scrub: true, // Đồng bộ hiệu ứng với cuộn trang
      scroller: "#scroll-full", // Chỉ định phần tử container để lắng nghe sự kiện cuộn
    },
    opacity: 1,
    y: 0,
    ease: "power1.out",
  });
});
