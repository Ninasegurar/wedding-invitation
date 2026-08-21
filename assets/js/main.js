/* ================================================================
   MAIN.JS — shared behavior across every page.
   Reads content from window.SITE_DATA (site-data.js).
   ================================================================ */

document.addEventListener("DOMContentLoaded", function () {
  var DATA = window.SITE_DATA || {};

  /* ---------- Trimmed couple names (avoids stray spaces from site-data.js) ---------- */
  var coupleP1 = (DATA.couple && DATA.couple.partnerOne) ? DATA.couple.partnerOne.trim() : "";
  var coupleP2 = (DATA.couple && DATA.couple.partnerTwo) ? DATA.couple.partnerTwo.trim() : "";

  /* ---------- Browser tab title (dynamic, from site-data.js) ---------- */
  if (coupleP1 || coupleP2) {
    var names = coupleP1 && coupleP2 ? coupleP1 + " & " + coupleP2 : (coupleP1 || coupleP2);
    var baseTitle = document.title;
    document.title = (baseTitle === "Home")
      ? names + " — Wedding"
      : baseTitle + " · " + names;
  }

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }

  /* ---------- Highlight active nav link ---------- */
  var path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  /* ---------- Footer brand (full names) ---------- */
  document.querySelectorAll("[data-couple-brand]").forEach(function (el) {
    el.textContent = (coupleP1 && coupleP2) ? coupleP1 + " & " + coupleP2 : "";
  });

  /* ---------- Nav header brand (initials, so it never overflows) ---------- */
  document.querySelectorAll("[data-couple-initials]").forEach(function (el) {
    if (coupleP1 && coupleP2) {
      el.textContent = coupleP1.charAt(0) + " & " + coupleP2.charAt(0);
    }
  });
  document.querySelectorAll("[data-wedding-date-footer]").forEach(function (el) {
    el.textContent = DATA.wedding ? DATA.wedding.dateDisplay : "";
  });

  /* ---------- Fade-in on scroll ---------- */
  var faders = document.querySelectorAll(".fade-in");
  if ("IntersectionObserver" in window && faders.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    faders.forEach(function (el) { observer.observe(el); });
  } else {
    faders.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- HERO (index.html) ---------- */
  var heroNames = document.querySelector("[data-hero-names]");
  if (heroNames && (coupleP1 || coupleP2)) {
    heroNames.innerHTML =
      coupleP1 +
      ' <span class="hero-ampersand">&amp;</span> ' +
      coupleP2;
  }
  var heroDate = document.querySelector("[data-hero-date]");
  if (heroDate && DATA.wedding) {
    heroDate.textContent = DATA.wedding.dateDisplay;
  }
  var hashtagEl = document.querySelector("[data-hashtag]");
  if (hashtagEl) {
    if (DATA.couple && DATA.couple.hashtag) {
      hashtagEl.textContent = DATA.couple.hashtag;
      hashtagEl.style.display = "";
    } else {
      hashtagEl.style.display = "none";
    }
  }

  /* ---------- DETAILS page ---------- */
  function fillEvent(prefix, obj) {
    if (!obj) return;
    var map = {
      venue: obj.venueName,
      address: obj.addressLine,
      time: obj.startTime + (obj.endTime ? " – " + obj.endTime : "")
    };
    Object.keys(map).forEach(function (key) {
      document.querySelectorAll("[data-" + prefix + "-" + key + "]").forEach(function (el) {
        el.textContent = map[key];
      });
    });
    document.querySelectorAll("[data-" + prefix + "-maps]").forEach(function (el) {
      el.setAttribute("href", obj.mapsUrl || "#");
    });
    document.querySelectorAll("[data-" + prefix + "-date]").forEach(function (el) {
      el.textContent = DATA.wedding ? DATA.wedding.dateDisplay : "";
    });
  }
  fillEvent("ceremony", DATA.ceremony);
  fillEvent("reception", DATA.reception);

  /* ---------- Attire note (details.html), editable in site-data.js ---------- */
  document.querySelectorAll("[data-attire-note]").forEach(function (el) {
    el.textContent = DATA.attireNote || "";
  });

  /* ---------- OUR STORY page ---------- */
  var timelineEl = document.querySelector("[data-timeline]");
  if (timelineEl && Array.isArray(DATA.story)) {
    timelineEl.innerHTML = DATA.story.map(function (item) {
      return (
        '<div class="timeline-item fade-in">' +
          '<div class="timeline-date">' + escapeHtml(item.date) + '</div>' +
          '<h3 class="timeline-heading">' + escapeHtml(item.heading) + '</h3>' +
          '<p class="timeline-text">' + escapeHtml(item.text) + '</p>' +
        '</div>'
      );
    }).join("");
    // Re-run fade-in observer on newly injected items
    var newFaders = timelineEl.querySelectorAll(".fade-in");
    if ("IntersectionObserver" in window) {
      var obs2 = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs2.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      newFaders.forEach(function (el) { obs2.observe(el); });
    } else {
      newFaders.forEach(function (el) { el.classList.add("visible"); });
    }
  }

  /* ---------- PHOTOS page ---------- */
  var galleryEl = document.querySelector("[data-gallery]");
  if (galleryEl) {
    var files = Array.isArray(DATA.gallery) ? DATA.gallery : [];
    if (files.length === 0) {
      galleryEl.innerHTML =
        '<div class="gallery-placeholder" style="padding: 60px 20px; border: 1px dashed var(--line); border-radius:6px;">' +
        "Photos will appear here once added to assets/img/gallery/ and listed in site-data.js." +
        "</div>";
    } else {
      // Each photo keeps its own natural aspect ratio via CSS masonry
      // columns (see .gallery-grid / .gallery-item in style.css) — no
      // JS sizing needed, so photos can never overlap.
      galleryEl.innerHTML = files.map(function (file) {
        var src = "assets/img/gallery/" + file;
        return (
          '<div class="gallery-item fade-in" data-full="' + src + '">' +
            '<img src="' + src + '" alt="Wedding photo" loading="lazy">' +
          "</div>"
        );
      }).join("");

      // Re-run fade-in observer on newly injected gallery items
      // (the earlier observer only saw elements present at page load)
      var newGalleryFaders = galleryEl.querySelectorAll(".fade-in");
      if ("IntersectionObserver" in window) {
        var obs3 = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              obs3.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });
        newGalleryFaders.forEach(function (el) { obs3.observe(el); });
      } else {
        newGalleryFaders.forEach(function (el) { el.classList.add("visible"); });
      }

      var lightbox = document.querySelector(".lightbox");
      var lightboxImg = lightbox ? lightbox.querySelector("img") : null;
      galleryEl.querySelectorAll(".gallery-item").forEach(function (item) {
        item.addEventListener("click", function () {
          if (lightbox && lightboxImg) {
            lightboxImg.src = item.getAttribute("data-full");
            lightbox.classList.add("open");
          }
        });
      });
      if (lightbox) {
        lightbox.addEventListener("click", function (e) {
          if (e.target === lightbox || e.target.classList.contains("lightbox-close")) {
            lightbox.classList.remove("open");
          }
        });
      }
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
});
