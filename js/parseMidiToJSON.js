const fs = require("fs");
const path = require("path");
const { Midi } = require("@tonejs/midi");

// Function to parse a MIDI file and return a Midi object
function parseMidiFile(filepath) {
  const midiData = fs.readFileSync(filepath);
  const midi = new Midi(midiData);
  return midi;
}

function parseJsonData(midi) {
  function chunkArray(array, size) {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      let chunks = array.slice(i, i + size);
      chunks.push("space");
      chunkedArr.push(chunks);
    }
    return chunkedArr;
  }
  const allNotes = midi.tracks[0].notes.map((note) => note.name);
  const chunkedNotes = chunkArray(allNotes, 8);

  return chunkedNotes;
}

// Function to write data to a JSON file
function writeJsonFile(midiFilePath, data) {
  const baseName = path.basename(midiFilePath, path.extname(midiFilePath));
  const jsonFilePath = `./json/${baseName}.json`;

  fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.log("Error writing file:", err);
    } else {
      console.log("File written successfully");
    }
  });
}

// Main execution
const args = process.argv.slice(2);
const midiFilePath = args[0];

if (!midiFilePath) {
  console.error("Please provide a path to the MIDI file.");
  process.exit(1);
}

// Parse the MIDI file
const midi = parseMidiFile(midiFilePath);

// Extract note names
const parsedJson = parseJsonData(midi);

// Write the extracted data to an output JSON file
writeJsonFile(midiFilePath, parsedJson);
