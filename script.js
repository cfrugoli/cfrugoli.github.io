await WebMidi.enable();

let selectIn = document.getElementById("select-in");
let selectOut = document.getElementById("select-out");
let userInput = WebMidi.inputs[0];
let userOutput = WebMidi.outputs[0].channels[1];

WebMidi.inputs.forEach(function (input, num) {
  selectIn.innerHTML += `<option value=${num}>${input.name}</option>`;
  console.log("hello");
});

WebMidi.outputs.forEach(function (output, num) {
  selectOut.innerHTML += `<option value=${num}>${output.name}</option>`;
});

selectIn.addEventListener("change", function () {
  userInput.removeListener("noteon");
  userInput.removeListener("noteoff");
  userInput = WebMidi.inputs[selectIn.value];
  userOutput = WebMidi.outputs[0].channels[1];
  userInput.addListener("noteon", function (someMIDI) {
    myOutput.sendNoteOn(someMIDI.note);
  });
  userInput.addListener("noteoff", function (someMIDI) {
    myOutput.sendNoteOff(someMIDI.note);
  });
});
