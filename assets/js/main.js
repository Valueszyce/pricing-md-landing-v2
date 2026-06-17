/* =========================================================================
   pricing.md landing - interactions
   1) Scroll-reveal for .reveal elements (respects reduced-motion)
   2) Iframe auto-height: posts document height to the parent (Webflow)
      so the embed can resize with no inner scrollbar / clipped content.
   ========================================================================= */
(function () {
  "use strict";

  /* ---------- 1. Scroll reveal ---------- */
  var prefersReduced = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 2. Iframe auto-height ----------
     The Valueships Webflow parent listens for a postMessage whose data has a
     `height` property and sizes the iframe to match. Matches the standard
     Valueships artifact convention. Debounced via requestAnimationFrame. */
  function measureHeight() {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight
    );
  }

  function postHeight() {
    var height = measureHeight();
    try {
      window.parent.postMessage({ height: height }, "*");
    } catch (e) { /* cross-origin parent: ignore */ }
  }

  // Only bother if we're actually embedded.
  if (window.parent !== window) {
    var raf;
    var schedule = function () {
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(postHeight);
    };

    window.addEventListener("load", postHeight);
    window.addEventListener("resize", schedule);

    // Re-measure when reveal animations or fonts change layout.
    if ("ResizeObserver" in window) {
      new ResizeObserver(schedule).observe(document.body);
    }
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(postHeight);
    }
    // A couple of delayed measurements catch late layout shifts.
    setTimeout(postHeight, 400);
    setTimeout(postHeight, 1200);
  }
})();
