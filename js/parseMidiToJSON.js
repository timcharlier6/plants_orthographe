const fs = require("fs");
const { Midi } = require("@tonejs/midi");

// Function to parse a MIDI file and return a Midi object
function parseMidiFile(filepath) {
  const midiData = fs.readFileSync(filepath);
  const midi = new Midi(midiData);
  return midi;
}

function chunkArray(array, size) {
  const chunkedArr = [];
  for (let i = 0; i < array.length; i += size) {
    let arr = array.slice(i, i + size);
    chunkedArr.push(arr);
  }
  return chunkedArr;
}

function parseJsonData(midi) {
  const allNotes = midi.tracks[0].notes.map((note) => note.name);
  const chunkedNotes = chunkArray(allNotes, 4);

  return chunkedNotes;
}

// Function to write data to a JSON file
function writeJsonFile(filePath, data) {
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
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
const inventions = parseJsonData(midi);

// Write the extracted data to an output JSON file
writeJsonFile("./json/inventions2.json", inventions);
