$(document).ready(function () {
  const $p = $("#p");
  const $textarea = $("#textarea");
  let map = {};
  let word = "";
  let currentLayout = "azerty";
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

  const synth = new Tone.Synth().toDestination();

  async function init() {
    try {
      const response = await fetch("./json/mappings.json");
      map = await response.json();
    } catch (error) {
      console.error(error);
    }
    waitForFetch();
  }

  init();

  function waitForFetch() {
    $textarea.focus();
    if (
      typeof Android !== "undefined" &&
      typeof Android.showKeyboard !== "undefined"
    ) {
      Android.showKeyboard();
    }
    Tone.start();

    function nextword() {
      if (fruitsEtLegumes.length === 0) {
        window.location.reload();
        return;
      }

      word = fruitsEtLegumes.pop();
      $p.contents().remove();
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

    $textarea.on("input", (e) => {
      clearTimeout(inputTimeOut);
      inputTimeOut = setTimeout(() => {
        let tone = convertTextInputToTone(e.originalEvent.data, map);
        let inputText = $textarea.val().toLowerCase();

        $spans.each((index, span) => {
          const $span = $(span);
          if (index < inputText.length) {
            $span.removeClass("underline");
            if (inputText[index] !== $span.text()) {
              $span.css("color", "red");
              $span.css("opacity", "1");
            } else {
              $span.css("color", "green");
              $span.css("opacity", "1");
              if (
                inputText[inputText.length - 1] === word[index] &&
                inputText.length === index + 1
              )
                playTone(tone);
            }
          } else if (index === inputText.length) {
            $span.addClass("underline");
            $span.css("color", "");
          } else {
            $span.css("color", "");
            $span.removeClass("underline");
          }
        });
        if (inputText.length >= $spans.length) {
          $spans.css("color", "");
          $textarea.val("");
          nextword();
        }
      }, 50);
    });
  }

  function convertTextInputToTone(e, map) {
    let tone = "";
    for (let i = 0; i < map.length; i++) {
      if (e && e.toLowerCase() === map[i]["text"][currentLayout]) {
        tone = map[i]["note"];
      }
    }
    return tone;
  }

  let lastTriggerTime = 0;
  function playTone(sound) {
    const minGap = 50;
    const now = Tone.now() * 1000; // Convert to milliseconds
    if (now - lastTriggerTime > minGap && sound) {
      synth.triggerAttackRelease(sound, "4n");
      lastTriggerTime = now;
    }
  }

  const currentYear = new Date().getFullYear();
  const $copyRight = $("#date");
  $copyRight.text(currentYear);

  $(document).one("click", function () {
    $("textarea").focus();
  });
  $(document).one("click touchstart", function (event) {
    event.preventDefault(); // Prevent click from also firing
    $("textarea").focus();
  });
});

