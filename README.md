How to find a useful classical music midi file?

    Find classical music midi file on International Music Score Library Project (IMSLP).
    Reduce the music to a strict monophony on a single staff with the musical notation software MuseScore.

How to parse midi to JSON?

    Install node package @tonejs/midi.
    Write a nodeJS script to parse all notes into a formatted JSON.

How to bind computer keys to musical notes?

    Write a JSON file to store key mappings in different layouts for each distinct musical note:
        Octave 2 (C2): Uses the number row.
        Octave 3 (C3): Uses the bottom row (Z, X, C, etc.).
        Octave 4 (C4): Uses the home row (A, S, D, etc.).
        Octave 5 (C5): Uses the top row (Q, W, E, etc.).

    Sharp Pitches: The sharp pitches (like C#2, D#3, etc.) are mapped to the capitalized version of the natural pitch.

How to play notes on user input?

    Write a html document linked to the ToneJS librairy.
    Write a javascript let the user make sound with the keyboard :
        Create a textarea element with an event listener.
        Fetch the json mappings to translate the input to a note.
        Pass this note as argument to a ToneJS object.

Overview

The Alphabetical Piano is an interactive typing practice tool that combines musical melodies with typing challenges. Users can practice typing while listening to melodies and seeing their performance in real-time. The game supports both AZERTY and QWERTY keyboard layouts, which can be toggled using a button.
Features

    Dynamic Layout Switching: Switch between AZERTY and QWERTY layouts.
    Random Melodies: Load and display random melodies from a JSON file.
    Real-Time Feedback: Highlight correct and incorrect characters as you type.
    Audio Feedback: Hear notes played when typing characters.
    Game Over and Restart: Alerts and allows for restarting the game if the typing is incorrect.

Demo

Visit the site
Files

    index.html: Main HTML file.
    script.js: JavaScript file containing the game logic.
    styles.css: CSS file for styling the game (not included in the code provided, but referenced).
    ./json/melodies.json: JSON file with melody data.
    ./json/mappings.json: JSON file mapping notes to characters.

Usage

    Toggle Layout: Click the "Switch to QWERTY" or "Switch to AZERTY" button to change the keyboard layout.
    Play the Game: Start typing the melody shown on the screen. Correctly typed characters will be highlighted in green, and incorrect characters in red.
    Audio Feedback: Hear the note corresponding to each character as you type.
    Game Over: If the typing is incorrect, you'll receive a "GAME OVER" alert and can restart the game.

Configuration

    The current layout is stored in the browser's localStorage.
    You can modify the melody and mappings by updating melodies.json and mappings.json.
