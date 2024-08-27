$(document).ready(function () {
  const $p = $("#p");
  const $textarea = $("#textarea");
  const $start = $("#start");
  const notes1 = "qdjaejaeqdjaejae␣".split("");
  const notes2 = "aejaeqdjaejaeqdj␣".split("");
  const allNotes = [notes1, notes2];
  let notes;
  let $spans;
  console.log(notes);
  console.log(allNotes);

  function nextNotes() {
    if (allNotes.length === 0) {
      $p.text("Finish");
      return;
    }
    notes = allNotes.shift();
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
});
