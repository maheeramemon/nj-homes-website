/* NJ Homes — blog: index/article switching with hash routing so
   posts are linkable and the back button works.
   NOTE: post bodies below are placeholder copy from the design
   handoff — replace with real copy before launch. */
(function () {
  "use strict";

  var POSTS = {
    "rayner-avenue": {
      tag: "Rayner Avenue",
      date: "August 2026",
      title: "Four houses, one block, on Rayner Avenue",
      img: "img/rayner-concept.png",
      body: [
        "429, 433, 437 and 441 Rayner are going up together in Fort Worth's 76111. Four attached three-story homes, stucco and brick, black steel windows.",
        "Building four at once on the same street changes the math. One crew stays put instead of moving between sites, one material order covers all four elevations, and the same superintendent walks every house every morning. Nothing gets a different standard because nothing is far enough away to drift.",
        "It also means the block finishes as a block. Streetscape, grading and landscaping get planned once, together, instead of four separate houses trying to agree with each other after the fact."
      ]
    },
    "waterview-exterior": {
      tag: "Waterview Drive",
      date: "July 2026",
      title: "Picking the exterior for 6000 Waterview",
      img: "img/waterview.png",
      body: [
        "Natural limestone veneer, warm cream brick, cedar-stained siding on the upper balcony, and dark bronze windows throughout.",
        "The elevation went through a few rounds. The question on a house this size is always where to stop: too many materials and the front reads busy from the street, too few and it flattens out. Limestone carries the entry, brick carries the mass, and the cedar shows up in exactly one place — the balcony — so it lands as an accent instead of a fifth idea.",
        "Bronze windows tie it together. They read almost black at a distance and warm up close, which is the same thing the house is trying to do."
      ]
    },
    "first-sixty-days": {
      tag: "How we build",
      date: "June 2026",
      title: "What the first sixty days look like",
      img: "img/jones2705-e.jpeg",
      body: [
        "From lot walk to permit to slab, the first stretch of a build is mostly paperwork and decisions.",
        "It doesn't look like progress. There's no framing to photograph and no crew on site. But this is where the house is actually decided — the plan set, the allowances, the finish direction, the survey and the permit. Every change made here is a conversation. Every change made after the slab is money.",
        "So we walk every buyer through it before the first truck shows up. You should know what's fixed, what's still open, and roughly when each decision comes due."
      ]
    },
    "remodels-to-new-construction": {
      tag: "Our story",
      date: "May 2026",
      title: "From remodels to new construction",
      img: "img/allen1442-main.jpeg",
      body: [
        "We started in 2017 taking on remodels around Fort Worth.",
        "Remodeling teaches you what fails. You open up a wall and see what the last builder did in a hurry, and you carry that into every house you put up afterward. By the time we moved to new construction we already knew which shortcuts come back.",
        "Nine finished homes later we're building from the dirt up, and the way we treat a house hasn't changed. It's a family company. Every home gets a piece of our family's values built into it, because we're the ones standing in it at the end."
      ]
    }
  };

  var indexView = document.getElementById("index-view");
  var articleView = document.getElementById("article-view");

  function render() {
    var slug = location.hash.replace(/^#/, "");
    var post = POSTS[slug];

    if (post) {
      document.getElementById("article-tag").textContent = post.tag;
      document.getElementById("article-date").textContent = post.date;
      document.getElementById("article-title").textContent = post.title;
      var cover = document.getElementById("article-cover");
      cover.src = post.img;
      cover.alt = post.title;
      var body = document.getElementById("article-body");
      body.innerHTML = "";
      post.body.forEach(function (para) {
        var p = document.createElement("p");
        p.textContent = para;
        body.appendChild(p);
      });
      document.title = post.title + " — NJ Homes";
      indexView.classList.add("hidden");
      articleView.classList.remove("hidden");
    } else {
      document.title = "Blog — NJ Homes";
      articleView.classList.add("hidden");
      indexView.classList.remove("hidden");
    }
    window.scrollTo(0, 0);
  }

  document.querySelectorAll("[data-close-article]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (location.hash) {
        history.pushState("", document.title, location.pathname + location.search);
      }
      render();
    });
  });

  window.addEventListener("hashchange", render);
  render();
})();
