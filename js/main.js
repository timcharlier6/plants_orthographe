$(document).ready(function () {
  const $p = $("#p");
  const $textarea = $("#textarea");
  const $start = $("#start");
  const notes = "qdjaejaeqdjaejae␣".split("");

  notes.forEach((note) => {
    const $span = $("<span>").text(note);
    $p.append($span);
  });
  const $spans = $p.children();

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
    if (inputText.length >= $spans.length) {
      $spans.css("color", "");
      $textarea.val("");
    }
  });
});
