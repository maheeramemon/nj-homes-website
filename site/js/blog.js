/* NJ Homes — blog index.
   Posts used to live inside this file and render into blog.html#slug.
   They are real pages now (site/blog/<slug>.html) so search engines can
   index them. The four original hash posts have since been retired, so
   this shim just clears their old fragments and leaves the reader on the
   index rather than sending them to a page that no longer exists. */
(function () {
  "use strict";

  var RETIRED = {
    "rayner-avenue": 1,
    "waterview-exterior": 1,
    "first-sixty-days": 1,
    "remodels-to-new-construction": 1
  };

  function clearRetiredHash() {
    var slug = location.hash.replace(/^#/, "");
    if (RETIRED[slug]) {
      history.replaceState("", document.title, location.pathname + location.search);
    }
  }

  window.addEventListener("hashchange", clearRetiredHash);
  clearRetiredHash();
})();
