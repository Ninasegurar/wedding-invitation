/* ================================================================
   GUESTBOOK.JS
   Handles: submitting a note (emails you both via Formspree AND
   stores it publicly via Supabase) and loading the public wall.
   See SETUP.md for how to connect Formspree + Supabase.
   ================================================================ */

document.addEventListener("DOMContentLoaded", function () {
  var DATA = window.SITE_DATA || {};
  var gb = DATA.guestbook || {};

  var form = document.getElementById("guest-form");
  var statusEl = document.getElementById("form-status");
  var wallEl = document.getElementById("guest-wall");
  var submitBtn = form ? form.querySelector("button[type=submit]") : null;

  var formspreeReady = gb.formspreeEndpoint && gb.formspreeEndpoint.indexOf("YOUR_FORM_ID") === -1;
  var supabaseReady =
    gb.supabaseUrl && gb.supabaseUrl.indexOf("YOUR_PROJECT_REF") === -1 &&
    gb.supabaseAnonKey && gb.supabaseAnonKey.indexOf("YOUR_SUPABASE_ANON_KEY") === -1 &&
    window.supabase;

  var supabaseClient = null;
  if (supabaseReady) {
    supabaseClient = window.supabase.createClient(gb.supabaseUrl, gb.supabaseAnonKey);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatDate(iso) {
    try {
      var d = new Date(iso);
      return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
    } catch (e) {
      return "";
    }
  }

  function renderNotes(notes) {
    if (!wallEl) return;
    if (!notes || notes.length === 0) {
      wallEl.innerHTML = '<div class="wall-empty">Be the first to sign the guestbook.</div>';
      return;
    }
    wallEl.innerHTML = notes.map(function (n) {
      return (
        '<div class="guest-note fade-in visible">' +
          '<div class="guest-note-name">' + escapeHtml(n.name) + '</div>' +
          '<div class="guest-note-date">' + formatDate(n.created_at) + '</div>' +
          '<div class="guest-note-message">&ldquo;' + escapeHtml(n.message) + '&rdquo;</div>' +
        '</div>'
      );
    }).join("");
  }

  function prependNote(note) {
    if (!wallEl) return;
    var emptyEl = wallEl.querySelector(".wall-empty");
    if (emptyEl) emptyEl.remove();
    var div = document.createElement("div");
    div.className = "guest-note fade-in visible";
    div.innerHTML =
      '<div class="guest-note-name">' + escapeHtml(note.name) + '</div>' +
      '<div class="guest-note-date">' + formatDate(note.created_at) + '</div>' +
      '<div class="guest-note-message">&ldquo;' + escapeHtml(note.message) + '&rdquo;</div>';
    wallEl.insertBefore(div, wallEl.firstChild);
  }

  async function loadWall() {
    if (!wallEl) return;
    if (!supabaseReady) {
      wallEl.innerHTML =
        '<div class="wall-empty">The public guestbook wall will appear here once connected &mdash; see SETUP.md.</div>';
      return;
    }
    try {
      var res = await supabaseClient
        .from(gb.supabaseTable || "guestbook")
        .select("name,message,created_at")
        .order("created_at", { ascending: false })
        .limit(100);
      if (res.error) throw res.error;
      renderNotes(res.data);
    } catch (err) {
      wallEl.innerHTML = '<div class="wall-empty">Could not load messages right now.</div>';
      console.error("Guestbook load error:", err);
    }
  }

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      var name = document.getElementById("guest-name").value.trim();
      var message = document.getElementById("guest-message").value.trim();
      if (!name || !message) return;

      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending..."; }
      if (statusEl) statusEl.textContent = "";

      var emailOk = true;
      var storeOk = true;

      // 1) Email notification via Formspree
      if (formspreeReady) {
        try {
          var res = await fetch(gb.formspreeEndpoint, {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, message: message })
          });
          emailOk = res.ok;
        } catch (err) {
          emailOk = false;
          console.error("Formspree error:", err);
        }
      }

      // 2) Public wall storage via Supabase
      var newNote = { name: name, message: message, created_at: new Date().toISOString() };
      if (supabaseReady) {
        try {
          var insertRes = await supabaseClient
            .from(gb.supabaseTable || "guestbook")
            .insert([{ name: name, message: message }]);
          storeOk = !insertRes.error;
          if (insertRes.error) console.error("Supabase insert error:", insertRes.error);
        } catch (err) {
          storeOk = false;
          console.error("Supabase error:", err);
        }
      }

      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Sign the Guestbook"; }

      if (emailOk || storeOk) {
        form.reset();
        if (storeOk) prependNote(newNote);
        if (statusEl) {
          statusEl.textContent = "Thank you for signing our guestbook!";
        }
      } else if (statusEl) {
        statusEl.textContent = "Something went wrong — please try again in a moment.";
      }
    });
  }

  loadWall();
});
