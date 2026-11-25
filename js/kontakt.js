// PROVJERA (VALIDACIJA) KONTAKT FORME

// 1. Pronađi formu, polja i poruku o uspjehu
const forma = document.querySelector("#forma");
const polja = forma.querySelectorAll("input, textarea");
const uspjeh = document.querySelector("#uspjeh");
const mailLink = document.querySelector("#posalji-mail");

// 2. Isključi ugrađene poruke preglednika, jer prikazujemo svoje
forma.noValidate = true;

// 3. Funkcija koja provjeri jedno polje i vrati true ili false
function provjeriPolje(polje) {
  const nijePrazno = polje.value.trim() !== "";
  const ispravno = nijePrazno && polje.checkValidity();

  // Pokaži ili sakrij poruku ispod polja
  const greska = document.querySelector("#greska-" + polje.id);
  greska.hidden = ispravno;
  polje.classList.toggle("neispravno", !ispravno);

  return ispravno;
}

// 4. Klik na "Pošalji poruku"
forma.addEventListener("submit", function (dogadjaj) {
  dogadjaj.preventDefault();
  let sveIspravno = true;

  polja.forEach(function (polje) {
    if (provjeriPolje(polje) === false) {
      sveIspravno = false;
    }
  });

  uspjeh.hidden = !sveIspravno;

  if (sveIspravno) {
    const predmet = encodeURIComponent(forma.predmet.value);
    const tekst = encodeURIComponent(forma.poruka.value + "\n\n" + forma.ime.value + ", " + forma.email.value);
    mailLink.href = "mailto:adnan.ba.fetic@gmail.com?subject=" + predmet + "&body=" + tekst;
    forma.reset();
  } else {
    forma.querySelector(".neispravno").focus();
  }
});

// 5. Dok korisnik popravlja grešku, provjeravaj polje odmah
polja.forEach(function (polje) {
  polje.addEventListener("input", function () {
    if (polje.classList.contains("neispravno")) {
      provjeriPolje(polje);
    }
  });
});
