const links = document.querySelectorAll(".glossary-top__letters a");
const currentUrl = new URL(window.location.href);
const currentLetter = currentUrl.searchParams.get("active-letter");

links.forEach((link) => {
  const linkUrl = new URL(link.href, window.location.origin);
  const letter = linkUrl.searchParams.get("active-letter");

  if (letter === currentLetter || (!letter && !currentLetter)) {
    link.classList.add("active-letter");
  } else {
    link.classList.remove("active-letter");
  }
});
