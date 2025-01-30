import "./style.css";
import $ from "jquery";
window.$ = $;

$(function () {
  const $p = $("#p");
  const $textarea = $("#textarea");
  let word = "";
  let DEBOUNCE = 50;
  let $spans;

  const fruitsEtLegumes = [
    "pomme",
    "banane",
    "orange",
    "fraise",
    "raisin",
    "mangue",
    "ananas",
    "avocat",
    "citron",
    "melon",
    "pastèque",
    "poire",
    "prune",
    "framboise",
    "myrtille",
    "cassis",
    "kiwi",
    "figue",
    "grenade",
    "abricot",
    "cerise",
    "papaye",
    "goyave",
    "nectarine",
    "clémentine",
    "mandarine",
    "pamplemousse",
    "tomate",
    "carotte",
    "patate",
    "oignon",
    "ail",
    "brocoli",
    "chou-fleur",
    "concombre",
    "laitue",
    "épinard",
    "poivron",
    "courgette",
    "aubergine",
    "artichaut",
    "asperge",
    "haricot",
    "pois",
    "riz",
    "blé",
    "quinoa",
    "avoine",
    "orge",
    "seigle",
    "kamut",
    "épeautre",
    "millet",
    "sorgho",
    "amarante",
    "sarrasin",
    "chia",
    "lin",
    "tournesol",
    "citrouille",
    "courge",
    "potimarron",
    "topinambour",
    "panais",
    "betterave",
    "radis",
    "navet",
    "céleri",
    "persil",
    "coriandre",
    "menthe",
    "basilic",
    "thym",
    "romarin",
    "laurier",
    "origan",
    "sauge",
    "estragon",
    "ciboulette",
    "aneth",
    "cardamome",
    "gingembre",
    "curcuma",
    "cannelle",
    "noix",
    "poivre",
    "piment",
    "vanille",
    "cacao",
    "café",
    "thé",
    "olive",
    "noisette",
    "amande",
    "cacahuète",
    "pistache",
    "noix",
    "châtaigne",
    "macadamia",
    "pécan",
    "brugnon",
    "cranberry",
    "dattes",
    "figues",
    "pruneaux",
    "raisins",
  ];
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  shuffleArray(fruitsEtLegumes);

  $textarea.trigger("focus");
  setTimeout(() => {
    $textarea.trigger("focus");
  }, 100);

  function nextword() {
    if (fruitsEtLegumes.length === 0) {
      window.location.reload();
      return;
    }

    word = fruitsEtLegumes.pop();
    $p.empty();
    for (let i = 0; i < word.length; i++) {
      const $span = $("<span>").text(word[i]);
      if (i === 0) {
        $span.addClass("underline");
      }
      $p.append($span);
    }
    $spans = $p.children();
  }

  nextword();
  let inputTimeOut;
  let index = 0;

  $textarea.on("input", (e) => {
    clearTimeout(inputTimeOut);
    inputTimeOut = setTimeout(() => {
      let inputText = $textarea.val().toLowerCase().trim();
      if (index < $spans.length) {
        const $currentSpan = $spans.eq(index);
        if (index > 0) $spans.eq(0).removeClass("underline");
        const letter = $currentSpan.text();
        if (letter == inputText[index]) {
          $currentSpan.addClass("correct");
        }
        $currentSpan.removeClass("underline");
        index = inputText.length;
        if (index < $spans.length) {
          $spans.eq(index).addClass("underline");
        } else {
          $textarea.val("");
          index = 0;
          nextword();
        }
      }
    }, DEBOUNCE);
  });

  const currentYear = new Date().getFullYear();
  const $copyRight = $("#date");
  $copyRight.text(currentYear);

  $(document).one("click", function () {
    $("textarea").trigger("focus");
  });
  $(document).one("touchstart", function (event) {
    event.preventDefault();
    $("textarea").trigger("focus");
  });
  /*
   */
});
