var WindBody = document.body,
  hContainer = document.querySelector(".h-container"),
  hMask = document.querySelector(".h-mask"),
  hMaskInner = document.querySelector(".h-mask-inner"),
  IDPage = hContainer.getAttribute("id"),
  wrapload = "";
E = document.createElement("div");
E.className = "loadx";
var Loadx = document.querySelector(".loadx");

if (IDPage == "home-page") {
  var videoLoad = document.getElementById("loadingVideo");

  if (videoLoad) {
    videoLoad.playbackRate = 2.0;
    setTimeout(function () {
      videoLoad.classList.add("hidden");
      console.log("Class 'hidden' đã được thêm vào video.");
      var hMaskInner = document.createElement("div"),
        span = document.createElement("span");

      hMaskInner.className = "mask-inner";
      hMaskInner.append(span);
      document.body.appendChild(hMaskInner);
    }, 3500);
  } else {
    console.error("Không tìm thấy phần tử video.");
  }
} else {
  var hMaskInner = document.createElement("div"),
    span = document.createElement("span");

  hMaskInner.className = "mask-inner";
  hMaskInner.append(span);
  document.body.appendChild(hMaskInner);
}

function RemoveClass(e) {
  for (var t = 0; t < e.length; t++)
    e[t].classList.remove("active"),
      e[t].classList.remove("current"),
      e[t].classList.remove("show"),
      e[t].classList.remove("move"),
      e[t].classList.remove("show-text"),
      e[t].classList.remove("showbox");
}
