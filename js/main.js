$(document).ready(function () {
  const $p = $("#p");
  const $message = $("#message");
  const $textarea = $("#textarea");
  const $start = $("#start");
  const $select = $("#select");
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
    "pêche",
    "poire",
    "prune",
    "framboise",
    "myrtille",
    "mûre",
    "cassis",
    "kiwi",
    "figue",
    "grenade",
    "abricot",
    "cerise",
    "noix de coco",
    "papaye",
    "fruit de la passion",
    "goyave",
    "nectarine",
    "clémentine",
    "mandarine",
    "pamplemousse",
    "tomate",
    "carotte",
    "pomme de terre",
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
    "haricot vert",
    "petit pois",
    "maïs",
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
    "clou de girofle",
    "noix de muscade",
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
    "pignon de pin",
    "macadamia",
    "pécan",
    "brugnon",
    "cranberry",
    "dattes",
    "figues séchées",
    "pruneaux",
    "raisins secs",
  ];

  const synth = new Tone.Synth().toDestination();
  let isCorrect = true;

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

  function getRandomKeyAndMutate(arr) {
    if (arr.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * arr.length);
    const removedElement = arr.splice(randomIndex, 1);

    return removedElement[0];
  }

  function waitForFetch() {
    $textarea.focus();
    Tone.start();

    function nextword() {
      if (fruitsEtLegumes.length === 0) {
        window.location.reload();
        return;
      }

      word = getRandomKeyAndMutate(fruitsEtLegumes);
      $p.contents().remove();
      for (let i = 0; i < word.length; i++) {
        const $span = $("<span>").text(word[i]);
        $p.append($span);
      }
      $spans = $p.children();
    }

    nextword();

    $textarea.on("input", (e) => {
      let tone = convertTextInputToTone(e.originalEvent.data, map);
      let inputText = $textarea.val();

      $spans.each((index, span) => {
        const $span = $(span);
        if (index < inputText.length) {
          $span.removeClass("underline");
          if (inputText[index] !== $span.text()) {
            $span.css("color", "red");
          } else {
            $span.css("color", "green");
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
    });
  }

  function convertTextInputToTone(e, map) {
    let tone = "";
    for (let i = 0; i < map.length; i++) {
      if (e === map[i]["text"][currentLayout]) {
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
});
