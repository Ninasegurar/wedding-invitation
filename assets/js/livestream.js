/* ================================================================
   LIVESTREAM.JS — countdown + video embed logic
   ================================================================ */

document.addEventListener("DOMContentLoaded", function () {
  var DATA = window.SITE_DATA || {};
  var wedding = DATA.wedding || {};
  var live = DATA.livestream || {};

  var countdownEl = document.querySelector("[data-countdown]");
  var countdownWrap = document.querySelector("[data-countdown-wrap]");
  var statusMessage = document.querySelector("[data-livestream-message]");
  var videoFrame = document.querySelector("[data-video-frame]");
  var watchLink = document.querySelector("[data-watch-link]");
  var timezoneNote = document.querySelector("[data-timezone-note]");

  if (timezoneNote) {
    timezoneNote.textContent = live.timezoneNote || "";
  }

  if (watchLink) {
    if (live.watchPageUrl) {
      watchLink.setAttribute("href", live.watchPageUrl);
      watchLink.style.display = "";
    } else {
      watchLink.style.display = "none";
    }
  }

  var target = wedding.isoDateTime ? new Date(wedding.isoDateTime) : null;

  function renderEmbed() {
    if (!videoFrame) return;
    if (live.embedUrl) {
      // Rely on the embed's own native fullscreen control (allowfullscreen
      // + allow="fullscreen" below) rather than a custom button — third-
      // party players handle their own resize/fullscreen behavior better
      // than we can from outside a cross-origin iframe.
      videoFrame.innerHTML =
        '<iframe src="' + live.embedUrl + '" title="Wedding livestream" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen scrolling="no" style="overflow:hidden;"></iframe>';
    } else {
      videoFrame.innerHTML =
        '<div class="video-placeholder">The livestream will appear here once we go live.<br>Check back at the ceremony start time!</div>';
    }
  }

  function tick() {
    if (!target || !countdownEl) return;
    var now = new Date();
    var diff = target - now;

    if (diff <= 0) {
      if (countdownWrap) countdownWrap.style.display = "none";
      if (statusMessage) {
        statusMessage.textContent = live.embedUrl
          ? "We're live! Thank you for celebrating with us."
          : "The ceremony has begun — thank you for being here with us in spirit.";
      }
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    var minutes = Math.floor((diff / (1000 * 60)) % 60);
    var seconds = Math.floor((diff / 1000) % 60);

    countdownEl.innerHTML =
      unit(days, "Days") + unit(hours, "Hours") + unit(minutes, "Minutes") + unit(seconds, "Seconds");

    window.requestAnimationFrame ? setTimeout(tick, 250) : setTimeout(tick, 1000);
  }

  function unit(value, label) {
    return (
      '<div class="countdown-unit">' +
        '<div class="countdown-number">' + String(value).padStart(2, "0") + '</div>' +
        '<div class="countdown-label">' + label + '</div>' +
      '</div>'
    );
  }

  renderEmbed();
  tick();
});
