// PROMJENA JEZIKA (bosanski / engleski)
// Bosanski tekst je napisan u HTML-u, a engleski stoji u atributu data-en.

// 1. Pronađi dugme i sve elemente koji imaju prevod
const dugme = document.querySelector("#jezik");
const elementi = document.querySelectorAll("[data-en]");

// 2. Zapamti bosanski tekst, da se možemo vratiti na njega
elementi.forEach(function (element) {
  element.dataset.bs = element.textContent;
});

// 3. Funkcija koja prikaže stranicu na traženom jeziku ("bs" ili "en")
function postaviJezik(jezik) {
  document.documentElement.lang = jezik;

  elementi.forEach(function (element) {
    element.textContent = element.dataset[jezik];
  });

  localStorage.setItem("jezik", jezik);
}

// 4. Klik na dugme mijenja jezik
dugme.addEventListener("click", function () {
  if (document.documentElement.lang === "bs") {
    postaviJezik("en");
  } else {
    postaviJezik("bs");
  }
});

// 5. Kad se stranica otvori, koristi zadnji odabrani jezik (ili bosanski)
postaviJezik(localStorage.getItem("jezik") || "bs");
