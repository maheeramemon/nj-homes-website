/* NJ Homes — shared behavior: sticky header, mobile drawer,
   portfolio hover carousel, interest form submit. */
(function () {
  "use strict";

  /* ---------- Header: hide on scroll down, show on scroll up ---------- */

  var header = document.getElementById("site-header");
  var drawer = document.getElementById("drawer");
  var menuBtn = document.getElementById("menu-btn");
  var menuOpen = false;

  var last = window.scrollY;
  window.addEventListener("scroll", function () {
    if (!header) return;
    var y = window.scrollY;
    var down = y > last && y > 140;
    if (!menuOpen) header.classList.toggle("is-hidden", down);
    header.classList.toggle("has-shadow", y > 40 && !down);
    last = y;
  }, { passive: true });

  /* ---------- Mobile drawer ---------- */

  function setMenu(open) {
    menuOpen = open;
    if (drawer) drawer.classList.toggle("is-open", open);
    if (menuBtn) {
      menuBtn.textContent = open ? "Close" : "Menu";
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    }
    if (open && header) header.classList.remove("is-hidden");
  }

  if (menuBtn) menuBtn.addEventListener("click", function () { setMenu(!menuOpen); });
  document.querySelectorAll("[data-drawer-link]").forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });

  /* ---------- Portfolio hover carousel ---------- */

  var timer = null;

  document.querySelectorAll("[data-home]").forEach(function (home) {
    var heroImg = home.querySelector("[data-hero-img]");
    var counter = home.querySelector("[data-counter]");
    var thumbs = Array.prototype.slice.call(home.querySelectorAll("[data-thumbs] img"));
    var media = home.querySelector("[data-carousel]");
    if (!heroImg || !media || thumbs.length === 0) return;

    var index = 0;

    function show(i) {
      index = (i + thumbs.length) % thumbs.length;
      heroImg.src = thumbs[index].src;
      if (counter) counter.textContent = (index + 1) + " / " + thumbs.length;
      thumbs.forEach(function (t, j) { t.classList.toggle("is-active", j === index); });
    }

    function start() {
      clearInterval(timer);
      timer = setInterval(function () { show(index + 1); }, 1100);
    }

    function stop() { clearInterval(timer); }

    media.addEventListener("mouseenter", start);
    media.addEventListener("mouseleave", stop);
    media.addEventListener("touchstart", start, { passive: true });
    media.addEventListener("touchend", stop);

    thumbs.forEach(function (t, j) {
      t.addEventListener("click", function () { show(j); });
    });
  });

  /* ---------- Interest form (Netlify Forms, AJAX submit) ---------- */

  var form = document.getElementById("interest-form");
  var successPanel = document.getElementById("success-panel");
  var errorMsg = document.getElementById("form-error");
  var submitBtn = document.getElementById("submit-btn");
  var sendAnother = document.getElementById("send-another");

  if (form && successPanel) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (errorMsg) errorMsg.classList.add("hidden");
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending…"; }

      var body = new URLSearchParams(new FormData(form)).toString();

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body
      }).then(function (res) {
        if (!res.ok) throw new Error("Form submit failed: " + res.status);
        form.classList.add("hidden");
        successPanel.classList.remove("hidden");
        form.reset();
      }).catch(function () {
        if (errorMsg) errorMsg.classList.remove("hidden");
      }).finally(function () {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Send my details"; }
      });
    });

    if (sendAnother) {
      sendAnother.addEventListener("click", function () {
        successPanel.classList.add("hidden");
        form.classList.remove("hidden");
      });
    }
  }
})();
