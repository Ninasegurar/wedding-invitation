/* ================================================================
   LIVESTREAM.JS — replay video embed logic
   ================================================================ */

document.addEventListener("DOMContentLoaded", function () {
  var DATA = window.SITE_DATA || {};
  var live = DATA.livestream || {};

  var statusMessage = document.querySelector("[data-livestream-message]");
  var videoFrame = document.querySelector("[data-video-frame]");
  var watchLink = document.querySelector("[data-watch-link]");

  if (watchLink) {
    if (live.watchPageUrl) {
      watchLink.setAttribute("href", live.watchPageUrl);
      watchLink.style.display = "";
    } else {
      watchLink.style.display = "none";
    }
  }

  function renderEmbed() {
    if (!videoFrame) return;
    if (live.embedUrl) {
      // Rely on the embed's own native fullscreen control (allowfullscreen
      // + allow="fullscreen" below) rather than a custom button — third-
      // party players handle their own resize/fullscreen behavior better
      // than we can from outside a cross-origin iframe.
      videoFrame.innerHTML =
        '<iframe src="' + live.embedUrl + '" title="Wedding livestream replay" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen scrolling="no" style="overflow:hidden;"></iframe>';
      if (statusMessage) {
        statusMessage.textContent = "Thank you for celebrating with us!";
      }
    } else {
      videoFrame.innerHTML =
        '<div class="video-placeholder">The replay will be posted here soon &mdash; check back shortly!</div>';
    }
  }

  renderEmbed();
});
