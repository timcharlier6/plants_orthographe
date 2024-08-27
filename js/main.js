$(document).ready(function () {
  const $p = $("#p");
  const $textarea = $("#textarea");
  const $start = $("#start");
  const notes1 = "qdjaejaeqdjaejae␣".split("");
  const notes2 = "aejaeqdjaejaeqdj␣".split("");
  const allNotes = [notes1, notes2];
  let map = {};
  let prel = {};
  let notes;
  let $spans;
  let currentLayout = "azerty";
  let originalSubArr = [];
  let copySubArr = [];
  const synth = new Tone.Synth().toDestination();
  let isCorrect = true;
  async function init() {
    try {
      [map, prel] = await Promise.all([
        fetch("./json/mappings.json").then((response) => response.json()),
        fetch("./json/prelude.json").then((response) => response.json()),
      ]);
    } catch (error) {
      console.error(error);
    }
    waitForFetch();
  }
  init();

  function waitForFetch() {
    originalSubArr = prel.shift();
    notes = convertNotesToCharacters(originalSubArr, [...originalSubArr], map);
    console.log(notes);

    function nextNotes() {
      if (prel.length === 0) {
        $p.text("Finish");
        return;
      }
      $p.contents().remove();
      notes.forEach((note) => {
        const $span = $("<span>").text(note);
        $p.append($span);
      });
      $spans = $p.children();
    }
    nextNotes();

    $start.on("click", () => {
      $textarea.focus();
    });

    $textarea.on("input", (e) => {
      let inputText = $textarea.val();

      inputText = inputText.replace(/ /g, "␣");

      $spans.each((index, span) => {
        const $span = $(span);
        if (index < inputText.length) {
          $span.removeClass("underline");
          if (inputText[index] !== $span.text()) {
            $span.css("color", "red");
          } else {
            $span.css("color", "green");
          }
        } else if (index === inputText.length) {
          $span.addClass("underline");
          $span.css("color", "");
        } else {
          $span.css("color", "");
          $span.removeClass("underline");
        }
      });
      if (
        inputText.length >= $spans.length &&
        inputText[inputText.length - 1] === "␣"
      ) {
        $spans.css("color", "");
        $textarea.val("");
        nextNotes();
      }
    });
  }

  function convertNotesToCharacters(originalSubArr, copySubArr, map) {
    for (let i = 0; i < originalSubArr.length; i++) {
      for (let j = 0; j < map.length; j++) {
        if (map[j]["note"] === originalSubArr[i]) {
          copySubArr[i] = map[j]["text"][currentLayout];
        }
      }
    }
    return copySubArr;
  }

  function convertTextInputToTone(e) {
    for (let i = 0; i < map.length; i++) {
      if (e === map[i]["text"][currentLayout]) {
        tone = map[i]["note"];
      }
    }
  }

  function copyrights() {
    const currentYear = new Date().getFullYear();
    const copyRight = document.getElementById("copyright");
    copyRight.textContent = `© ${currentYear} Tim Charlier`;
  }
});
