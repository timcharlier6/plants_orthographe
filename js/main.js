$(document).ready(function () {
  const $p = $("#p");
  const $message = $("#message");
  const $textarea = $("#textarea");
  const $start = $("#start");
  let map = {};
  let prel = {};
  let notes;
  let $spans;
  let currentLayout = "dvorak";
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
    function nextNotes() {
      if (prel.length === 0) {
        $p.text("Finish");
        return;
      }
      notes = prel.shift();
      notes = convertNotesToCharacters(notes, [...notes], map);
      $p.contents().remove();
      notes.forEach((note) => {
        const $span = $("<span>").text(note);
        $p.append($span);
      });
      $spans = $p.children();
    }
    nextNotes();

    $start.on("click", async () => {
      $textarea.focus();
      await Tone.start();
      console.log("audio is ready");
      $message.text("Start typing");
      setTimeout(() => {
        $message.text("");
      }, 3000);
    });

    $textarea.on("input", (e) => {
      let tone = convertTextInputToTone(e.originalEvent.data, map);
      let inputText = $textarea.val();

      inputText = inputText.replace(/ /g, "␣");

      $spans.each((index, span) => {
        const $span = $(span);
        if (index < inputText.length) {
          $span.removeClass("underline");
          if (inputText[index] !== $span.text()) {
            $span.css("color", "red");
            playTone(null);
          } else {
            $span.css("color", "green");
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
  function playTone(tone) {
    const minGap = 50;
    const now = Tone.now() * 1000; // Convert to milliseconds
    if (now - lastTriggerTime > minGap && tone) {
      synth.triggerAttackRelease(tone, "4n");
      lastTriggerTime = now;
    }
  }

  function copyrights() {
    const currentYear = new Date().getFullYear();
    const copyRight = document.getElementById("copyright");
    copyRight.textContent = `© ${currentYear} Tim Charlier`;
  }
});
