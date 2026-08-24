/* NJ Homes — blog index.
   Posts used to live inside this file and render into blog.html#slug.
   They are real pages now (site/blog/<slug>.html) so search engines can
   index them. This shim only exists to forward the old hash links that
   may still be out in the wild. */
(function () {
  "use strict";

  var LEGACY = {
    "rayner-avenue": 1,
    "waterview-exterior": 1,
    "first-sixty-days": 1,
    "remodels-to-new-construction": 1
  };

  function forward() {
    var slug = location.hash.replace(/^#/, "");
    if (LEGACY[slug]) location.replace("blog/" + slug + ".html");
  }

  window.addEventListener("hashchange", forward);
  forward();
})();
