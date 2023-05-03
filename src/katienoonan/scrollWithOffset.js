function scrollWithOffset(id, headerOffset) {
  let el = document.getElementById(id)
  let elementPosition = el.getBoundingClientRect().top;
  let offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
}

window.scrollWithOffset = scrollWithOffset