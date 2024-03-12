await WebMidi.enable();

// Global Variables
let selectIn = document.getElementById("select-in");
let selectOut = document.getElementById("select-out");
let userInput = WebMidi.inputs[0];
let userOutput = WebMidi.outputs[0].channels[1];
let selectTranspose = document.getElementById("transpose-slider");
let quality = "Major";
let chordSelect = document.getElementById("chord-select");

// Input initialization
WebMidi.inputs.forEach(function (input, num) {
  selectIn.innerHTML += `<option value=${num}>${input.name}</option>`;
});

// Output initialization
WebMidi.outputs.forEach(function (output, num) {
  selectOut.innerHTML += `<option value=${num}>${output.name}</option>`;
});

// Updating the chord selection
chordSelect.addEventListener("change", function (quality) {
  quality = chordSelect.value;
  console.log(chordSelect.value);
});

// Chord Type Selection
const chordFunc = function (midiRoot, quality) {
  let chord = [];
  let chordRoot = parseInt(midiRoot);
  // let quality = document.getElementById("chord-select");
  if (quality == "Major") {
    chord.push(chordRoot + 4);
    chord.push(chordRoot + 7);
  }
  if (quality == "Minor") {
    chord.push(chordRoot + 3);
    chord.push(chordRoot + 7);
  }
  if (quality == "Augmented") {
    chord.push(chordRoot + 4);
    chord.push(chordRoot + 8);
  }
  if (quality == "Diminished") {
    chord.push(chordRoot + 3);
    chord.push(chordRoot + 6);
  }
  if (quality == "Major 7") {
    chord.push(chordRoot + 4);
    chord.push(chordRoot + 7);
    chord.push(chordRoot + 11);
  }
  if (quality == "Minor 7") {
    chord.push(chordRoot + 3);
    chord.push(chordRoot + 7);
    chord.push(chordRoot + 10);
  }
  if (quality == "Major Add 6") {
    chord.push(chordRoot + 4);
    chord.push(chordRoot + 7);
    chord.push(chordRoot + 9);
  }
  if (quality == "Major Sus 4") {
    chord.push(chordRoot + 5);
    chord.push(chordRoot + 7);
  }
  return chord;
};

// Transposition Amount Shown
selectTranspose.addEventListener("change", function () {
  document.getElementById(
    "transpose-display"
  ).innerText = `Transposed by ${selectTranspose.value} semitones`;
});

// Transposition Function
const midiFunc = function (midiIn, transpose) {
  let pitch = midiIn.note.number;
  pitch += transpose;
  let transposedNote = new Note(pitch);
  return transposedNote;
};

// MIDI input/output
// Need to do if statements using if "chord selection = "x", do this, else if this, else if this, else if this, else this
// ^^ This goes on each and every noteon/noteoff instance - need to add note values or something
// Could create a function? for the chord selection addition thing
selectIn.addEventListener("change", function () {
  userInput.removeListener("noteon");
  userInput.removeListener("noteoff");
  userInput = WebMidi.inputs[selectIn.value];
  userOutput = WebMidi.outputs[0].channels[1];
  userInput.addListener("noteon", function (someMIDI) {
    userOutput.sendNoteOn(
      midiFunc(someMIDI.note, parseInt(selectTranspose.value))
    );
  });
  userInput.addListener("noteoff", function (someMIDI) {
    userOutput.sendNoteOff(
      midiFunc(someMIDI.note, parseInt(selectTranspose.value))
    );
  });
});
