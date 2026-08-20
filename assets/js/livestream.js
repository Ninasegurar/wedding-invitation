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

  var expandIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"></path><path d="M21 8V5a2 2 0 0 0-2-2h-3"></path><path d="M3 16v3a2 2 0 0 0 2 2h3"></path><path d="M16 21h3a2 2 0 0 0 2-2v-3"></path></svg>';
  var shrinkIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3"></path><path d="M21 8h-3a2 2 0 0 1-2-2V3"></path><path d="M3 16h3a2 2 0 0 1 2 2v3"></path><path d="M16 21v-3a2 2 0 0 1 2-2h3"></path></svg>';

  function isFullscreen() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement);
  }

  function toggleFullscreen() {
    if (!videoFrame) return;
    if (isFullscreen()) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    } else {
      if (videoFrame.requestFullscreen) videoFrame.requestFullscreen();
      else if (videoFrame.webkitRequestFullscreen) videoFrame.webkitRequestFullscreen();
    }
  }

  function renderEmbed() {
    if (!videoFrame) return;
    if (live.embedUrl) {
      videoFrame.innerHTML =
        '<iframe src="' + live.embedUrl + '" title="Wedding livestream" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen scrolling="no" style="overflow:hidden;"></iframe>' +
        '<button type="button" class="fullscreen-btn" aria-label="View fullscreen">' + expandIcon + '</button>';

      var fsBtn = videoFrame.querySelector(".fullscreen-btn");
      if (fsBtn) {
        fsBtn.addEventListener("click", toggleFullscreen);
      }
      ["fullscreenchange", "webkitfullscreenchange"].forEach(function (evt) {
        document.addEventListener(evt, function () {
          if (!fsBtn) return;
          fsBtn.innerHTML = isFullscreen() ? shrinkIcon : expandIcon;
          fsBtn.setAttribute("aria-label", isFullscreen() ? "Exit fullscreen" : "View fullscreen");
        });
      });
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
