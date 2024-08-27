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
    let lastInputLength = 0;

    inputText = inputText.replace(/ /g, "␣");

    $spans.each((index, span) => {
      const $span = $(span);
      if (lastInputLength > inputText.length) {
        $spans.eq(lastInputLength).removeClass("underline");
        $span.eq(lastInputLength).css("color", "");
      }
      if (index < inputText.length) {
        $spans.eq(index + 1).addClass("underline");
        $span.removeClass("underline");

        if (inputText[index] !== $span.text()) {
          $span.css("color", "red");
        } else {
          $span.css("color", "green");
        }
        lastInputLength = inputText.length;
        console.log(lastInputLength, inputText.length, $span.text());
      }
    });
    if (inputText.length >= $spans.length) {
      $spans.css("color", "");
      $textarea.val("");
    }
  });
});
