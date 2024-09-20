const hPage = document.getElementById("h-page"),
  hSection = hPage.querySelectorAll(".h-section"),
  hSectionLength = hSection.length,
  hNavigation = document.querySelector(".h-navigation"),
  hNavigationItem = hNavigation.querySelectorAll(".h-navigation li"),
  hNavigationItemFirst = hNavigation.querySelector(
    ".h-navigation li:nth-child(1)"
  ),
  hMenuItem = hPage.querySelectorAll(".js__page-menu-link"),
  hMenuItemFirst = hPage.querySelector(".js__page-menu-link:nth-child(1)"),
  hScrollDown = document.querySelector(".h-scroll-down");
let startAnimation = !1,
  hSectionIndex = Array.prototype.indexOf(hSection) + 1,
  direction = "down";

Array.from(hSection).forEach(function (e) {
  gsap.set(e, {
    y: "100%",
    zIndex: "",
  }),
    gsap.set(hSection[hSectionIndex], {
      y: "0%",
      zIndex: 2,
    });
});

function modify() {
  setTimeout(function () {
    Array.from(hSection).forEach(function (e) {
      gsap.set(e, {
        y: "100%",
        zIndex: "",
      }),
        gsap.set(hSection[hSectionIndex], {
          y: "0%",
          zIndex: 2,
        });
    }),
      (startAnimation = !1);
  }, 1e3);
}

function applySlide() {
  if (
    (RemoveClass(hNavigationItem),
    RemoveClass(hSection),
    hSection[hSectionIndex].classList.add("show-text"),
    hNavigationItem[hSectionIndex].classList.add("current"),
    hSection[hSectionIndex].classList.contains("show-text"))
  ) {
  }

  if (hSection[hSectionIndex].getAttribute("id") == "scroll-full") {
    $(".show-2").removeClass("invisible");
  } else {
    $(".show-2").addClass("invisible");
  }
}

function resetSlide() {
  (startAnimation = !0),
    Array.from(hSection).forEach(function (e) {
      gsap.set(e, {
        zIndex: "",
      });
      var t = e.querySelector(".layout-move");
      t && t.classList.remove("enable");
    });
}

function pageUp() {
  resetSlide(),
    gsap.fromTo(
      hSection[hSectionIndex],
      0.8,
      {
        zIndex: 2,
      },
      {
        y: "0%",
        ease: "sine.inOut",
        onComplete: function () {
          applySlide(), modify();
        },
      }
    );
}

function pageDown() {
  resetSlide(),
    gsap.fromTo(
      hSection[hSectionIndex],
      0.8,
      {
        y: "-100%",
        zIndex: 2,
      },
      {
        y: "0%",
        ease: "sine.inOut",
        onComplete: function () {
          applySlide(), modify();
        },
      }
    );
}
function start() {
  hPage.addEventListener(
    "wheel",
    function (e) {
      var t;
      // Kiểm tra xem animation có đang chạy không
      if (!startAnimation) {
        t = Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY || -e.detail));

        // Lấy phần tử hiện tại
        var currentElement = hSection[hSectionIndex];
        // Kiểm tra xem đã cuộn hết nội dung bên trong phần tử hiện tại hay chưa
        if (currentElement !== null) {
          if (hSection[hSectionIndex].getAttribute("id") == "scroll-full") {
            var isAtEnd =
              (e.deltaY > 0 &&
                currentElement.scrollTop + currentElement.clientHeight >=
                  currentElement.scrollHeight) ||
              (e.deltaY < 0 && currentElement.scrollTop === 0);
          } else {
            var isAtEnd = true;
          }

          // Chỉ chuyển trang khi đã cuộn hết nội dung
          if (isAtEnd) {
            if (t === -1) {
              // Scroll down
              if (hSectionIndex >= hSectionLength - 1) {
                hSectionIndex = 0;
              } else {
                hSectionIndex++;
              }
              pageUp();
            } else if (t === 1) {
              // Scroll up
              if (hSectionIndex <= 0) {
                hSectionIndex = hSectionLength - 1;
              } else {
                hSectionIndex--;
              }
              pageDown();
            }
          }
        }
      }
    },
    {
      passive: !0,
    }
  );
}

hNavigationItem.forEach(function (e, t) {
  e.addEventListener("click", function (e) {
    startAnimation ||
      (!startAnimation && t > hSectionIndex
        ? ((hSectionIndex = t), pageUp())
        : !startAnimation &&
          t < hSectionIndex &&
          ((hSectionIndex = t), pageDown()));
  });
});

hMenuItem.forEach(function (item) {
  item.addEventListener("click", function (e) {
    t = item.getAttribute("data-page");
    startAnimation ||
      (!startAnimation && t > hSectionIndex
        ? ((hSectionIndex = t), pageUp())
        : !startAnimation &&
          t < hSectionIndex &&
          ((hSectionIndex = t), pageDown()));
  });
});

hScrollDown.addEventListener("click", function (e) {
  return (
    hNavigation
      .querySelector(".h-navigation li.current")
      .nextElementSibling.click(),
    !1
  );
}),
  setTimeout(function () {
    hPage.classList.contains("single") || start();
  }, 300);

function ready() {
  setTimeout(function () {
    hMaskInner && hMaskInner.classList.add("hide"),
      Loadx && Loadx.classList.remove("display-block", "white");
  }, 1e3),
    setTimeout(function () {
      WindBody.classList.add("showed"),
        hMask && hMask.classList.add("hide"),
        hSection[0].classList.add("show-text"),
        hNavigationItem[0].classList.add("current");
    }, 1e3),
    setTimeout(function () {
      hMask && hMask.remove(), hMaskInner && hMaskInner.remove();
    }, 3500);
}

window.addEventListener("DOMContentLoaded", function () {
  "home-page" == IDPage
    ? setTimeout(function () {
        document.querySelector(".wrap-logo") &&
          document.querySelector(".wrap-logo").classList.add("showed"),
          ready();
      }, 1500)
    : (Loadx.classList.add("display-block", "white"),
      setTimeout(function () {
        ready();
      }, 1e3));
});
