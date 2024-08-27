$(document).ready(function () {
  const $p = $("#p");
  const $textarea = $("#textarea");
  const $start = $("#start");
  const notes = "qdjaejae␣qdjaejae↵".split("");
  let input = "";

  // Create spans for each note and append to the paragraph
  notes.forEach((note) => {
    const $span = $("<span>").text(note);
    $p.append($span);
  });
  const $spans = $p.children();

  $start.on("click", () => {
    $textarea.focus();
  });

  let lastKeyCode = null;

  $textarea.on("keydown", function (event) {
    lastKeyCode = event.which;
  });

  $textarea.on("input", (e) => {
    let specialChar = "";
    if (lastKeyCode === 8) {
      // Backspace key pressed
      input = input.slice(0, -1); // Remove last character from input
      $spans.eq(input.length).css("color", ""); // Reset color of the span
      lastKeyCode = null; // Reset lastKeyCode
      return; // Exit the function early, no need to process further
    }

    switch (lastKeyCode) {
      case 32:
        // Space key pressed
        specialChar = "␣";
        break;
      case 13:
        // Enter key pressed
        specialChar = "↵";
        break;
      default:
        specialChar = "";
        break;
    }

    // Add the new character to input string
    const char = specialChar === "" ? e.target.value.slice(-1) : specialChar;
    input += char;

    // Clear textarea value to prevent duplication
    $textarea.val("");

    // Update span colors based on current input
    $spans.each((index, span) => {
      const $span = $(span);
      if (index < input.length) {
        if (input[index] !== $span.text()) {
          $span.css("color", "red"); // Mark wrong characters
        } else {
          $span.css("color", "green"); // Mark correct characters
        }
      } else {
        $span.css("color", ""); // Reset the color for future inputs
      }
    });

    // Clear lastKeyCode to avoid incorrect behavior
    lastKeyCode = null;
  });
});
