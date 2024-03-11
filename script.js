await WebMidi.enable();

// Global Variables
let selectIn = document.getElementById("select-in");
let selectOut = document.getElementById("select-out");
let userInput = WebMidi.inputs[0];
let userOutput = WebMidi.outputs[0].channels[1];
let selectChord = document.getElementById("chord-select");
let selectTranspose = document.getElementById("transpose-slider");

// Input initialization
WebMidi.inputs.forEach(function (input, num) {
  selectIn.innerHTML += `<option value=${num}>${input.name}</option>`;
});

// Output initialization
WebMidi.outputs.forEach(function (output, num) {
  selectOut.innerHTML += `<option value=${num}>${output.name}</option>`;
});

// MIDI input/output
selectIn.addEventListener("change", function () {
  userInput.removeListener("noteon");
  userInput.removeListener("noteoff");
  userInput = WebMidi.inputs[selectIn.value];
  userOutput = WebMidi.outputs[0].channels[1];
  userInput.addListener("noteon", function (someMIDI) {
    myOutput.sendNoteOn(someMIDI.note, parseInt(selectTranspose.value));
  });
  userInput.addListener("noteoff", function (someMIDI) {
    myOutput.sendNoteOff(someMIDI.note, paresInt(selectTranspose.value));
  });
});

// Chord Type Selection
// selectChord(function() {
// selectChord
// })
// selectChord.addEventListener("change", function () {});

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
