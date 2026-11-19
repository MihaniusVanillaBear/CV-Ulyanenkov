// Подсветка текущего раздела в навигации.
// Ничего не анимирует и не блокирует прокрутку.

(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  if (!links.length) return;

  var targets = links
    .map(function (link) {
      return { link: link, section: document.querySelector(link.getAttribute('href')) };
    })
    .filter(function (item) {
      return item.section;
    });

  if (!targets.length) return;

  var ticking = false;

  function update() {
    var threshold = 140;
    var current = null;

    targets.forEach(function (item) {
      if (item.section.getBoundingClientRect().top <= threshold) {
        current = item;
      }
    });

    targets.forEach(function (item) {
      item.link.classList.toggle('is-current', item === current);
    });

    ticking = false;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
