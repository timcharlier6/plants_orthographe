# Simple Metronome

This is a simple web-based metronome built using HTML, CSS, JavaScript, jQuery, and the Tone.js library. The application allows users to select a musical note, octave, and tempo to generate a metronome sound. The metronome also includes a stopwatch to track elapsed time while it is running.
[Click here to visit the website](https://simple-metronome-app.netlify.app/)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Credits](#credits)

## Features

- **Play Musical Notes:** Choose a musical note (A-G) with an optional sharp (#) and an octave (1-7) to play the note at the selected tempo.
- **Adjustable Tempo:** Set the tempo in beats per minute (BPM) between 20 and 250 BPM.
- **Stopwatch:** Tracks the elapsed time while the metronome is playing.
- **Responsive Design:** Uses Tailwind CSS for styling to ensure the application works well on different screen sizes.

## Technologies Used

- **HTML5:** Markup language for structuring the content.
- **CSS3:** Used for basic styling, with Tailwind CSS for utility-first styling.
- **JavaScript:** Handles logic, event listeners, and DOM manipulation.
- **jQuery:** Simplifies JavaScript operations, like DOM manipulation and event handling.
- **Tone.js:** A Web Audio framework that facilitates the creation of interactive music applications.
- **Font Awesome:** Provides the icons used in the UI.

## Getting Started

To run the Simple Metronome locally, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/simple-metronome.git
   cd simple-metronome
   ```

2. **Open the `index.html` File:**
   You can open the `index.html` file in any modern web browser to start the application.

3. **Ensure Internet Connection:**
   Since the project uses CDN links for external libraries like Tailwind CSS, Font Awesome, jQuery, and Tone.js, make sure you have an active internet connection.

## Usage

1. **Select Note and Octave:**

   - Enter a note (A-G) in the input field. You can optionally add a `#` for sharp notes (e.g., C#).
   - Enter an octave between 1 and 7.

2. **Set Tempo:**

   - Enter the desired tempo in beats per minute (BPM) between 20 and 250.

3. **Start the Metronome:**

   - Click the "Play" button to start the metronome. The selected note will play at the specified tempo, and the stopwatch will begin tracking the elapsed time.

4. **Stop the Metronome:**
   - Click the "Stop" button to stop the metronome and reset the stopwatch.

## File Structure

- `index.html`: The main HTML file containing the structure of the web page.
- `favicon.ico`: The favicon for the application.
- `README.md`: This readme file.
- **External Libraries:**
  - [Tone.js](https://tonejs.github.io/): Used to generate and control sound.
  - [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework.
  - [jQuery](https://jquery.com/): A fast, small, and feature-rich JavaScript library.
  - [Font Awesome](https://fontawesome.com/): A popular icon toolkit.

## Credits

- **Font Awesome**: For the icons used in the application.
- **Tailwind CSS**: For the utility-first CSS framework.
- **Tone.js**: For providing an easy-to-use Web Audio framework.
- **jQuery**: For simplifying JavaScript tasks.
- **Netlify**: For hosting services.

---
