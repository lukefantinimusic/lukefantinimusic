const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

let nyquist = audioCtx.sampleRate / 2;
let oscilBank = [] //Two Dimensional Array

let oscNum = 5

function IgnoreAlpha(e) {
    if (!e) {
      e = window.event;
    }
    if (e.keyCode >= 65 && e.keyCode <= 90) // A to Z
    {
      e.returnValue = false;
      e.cancel = true;
    }
}

// function createSineOscillator(incomingFrequency) {
//         let freq = incomingFrequency;
//         let partial = 1
//             let amp = 1 * 1;
//             amp /= partial;

//             let oscilBankLen = oscilBank.length;
            
//             oscilBank[oscilBankLen] = [] 
//             oscilBank[oscilBankLen][0] = incomingFrequency;
            
//             for (i = 0; i < 1; i++) { 
//                 oscilBank[oscilBankLen][i + 1] = new Oscil(audioCtx, freq, amp).play();   
//             }
        
//             partial++;
//             freq = incomingFrequency;
// };

function createSineOscillator(incomingFrequency) {
    let freq = incomingFrequency;
    let amp = 1 * 1;
    // let sineOsc;

    sineOsc = new Oscil(audioCtx, freq, amp);
    sineOsc.play();

    // console.log(sineOsc);
};


function createSquareOscillator(incomingFrequency) {
    let freq = incomingFrequency;
    let partial = 1

    while (freq <= nyquist) {
        let amp = 0.1 * 1;
        amp /= partial;

        let oscilBankLen = oscilBank.length;
        
        oscilBank[oscilBankLen] = [] 
        oscilBank[oscilBankLen][0] = incomingFrequency;
        
        for (i = 0; i < oscNum; i++) { 
            oscilBank[oscilBankLen][i + 1] = new Oscil(audioCtx, freq, amp).play();   
        }
        
        partial++;
        partial++;
        freq = incomingFrequency * partial;
    }
};

function createSawtoothOscillator(incomingFrequency) {
    let freq = incomingFrequency;
    let partial = 1

    while (freq <= nyquist) {
        let amp = 0.1 * 1;
        amp /= partial;

        let oscilBankLen = oscilBank.length;
        
        oscilBank[oscilBankLen] = []
        oscilBank[oscilBankLen][0] = incomingFrequency;
        
        for (i = 0; i < oscNum; i++) { 
            oscilBank[oscilBankLen][i + 1] = new Oscil(audioCtx, freq, amp).play();   
        }
        
        partial++;
        freq = incomingFrequency * partial;
    }
};

function createTriangleOscillator(incomingFrequency) { 
    let freq = incomingFrequency;
    let partial = 1

    while (freq <= nyquist) { 
        let amp = 0.1 * 1;
        amp /= partial*partial;

        let oscilBankLen = oscilBank.length;
        
        oscilBank[oscilBankLen] = []
        oscilBank[oscilBankLen][0] = incomingFrequency;
        
        for (i = 0; i < oscNum; i++) { 
            oscilBank[oscilBankLen][i + 1] = new Oscil(audioCtx, freq, amp).play();   
        }
        
        partial++; //combine
        partial++;
        freq = incomingFrequency * partial;
    }
};

function stopOscillator(e) {
    sineOsc.stop();

    let freqVal;

    if (e.type === "mouseup") {
        let clickedKey = e.target.id;
        clickedKey = clickedKey.slice(3);
        clickedKey = parseInt(clickedKey);
        freqVal = Object.values(keyFreqMap)[clickedKey];
    } else {
        if (e.repeat === false) {
            let typedKey = e.key;
            freqVal = keyFreqMap[typedKey];
        }
    }

    console.log ("hello");

    const oscilsOff = oscilBank.filter( 
        (origOscilBank) => {
        if (origOscilBank[0] === freqVal) {
            return true;
        }
    });

    for (i=0; i < oscilsOff.length; i++) {
        for (j = 0; j < oscNum; j++) {
        oscilsOff[i][j + 1].stop();
        }
    }
};

function getFrequency(e){
    if (e.repeat === false) {
    let typedKey = e.key;
    let freqVal = (keyFreqMap[typedKey]);
    
    // console.log(freqVal);

    selectWaveType();

        if (waveType === "none") {
            window.alert("Please Select a Waveform for Funky Synth Fun!")
            console.log(waveType);
        } else if (waveType === "sine") {
            createSineOscillator(freqVal);
            console.log ("Playing Sine Wave");
        } else if (waveType === "square") {
            createSquareOscillator(freqVal);
            console.log ("Playing Square Wave")
        } else if (waveType === "sawtooth") {
            createSawtoothOscillator(freqVal);
            console.log ("Playing Sawtooth Wave")
        } else if (waveType === "triangle") {
            createTriangleOscillator(freqVal);
            console.log ("Playing Triangle Wave");
        }
    }
}

function getClickedFrequency(e) {
    let clickedKey = e.target.id;
    clickedKey = clickedKey.slice(3);   // the .slice Array method chops off the characters in an item starting from the beginning and going to the X number of places in the string.
    clickedKey = parseInt(clickedKey);  // turn the string number into a number number
    let freqVal = Object.values(keyFreqMap)[clickedKey];
    
    selectWaveType();

        if (waveType === "none") {
            window.alert("Please Select a Waveform for Funky Synth Fun!")
            console.log(waveType);
        } else if (waveType === "sine") {
            createSineOscillator(freqVal);
            console.log ("Playing Sine Wave");
        } else if (waveType === "square") {
            createSquareOscillator(freqVal);
            console.log ("Playing Square Wave")
        } else if (waveType === "sawtooth") {
            createSawtoothOscillator(freqVal);
            console.log ("Playing Sawtooth Wave")
        } else if (waveType === "triangle") {
            createTriangleOscillator(freqVal);
            console.log ("Playing Triangle Wave");
        }
    }
//'e' as an argument to the function in an event listener accesses the 'event' object


/* ============KEYBOARD SYNTHESIZER========== */
const keyFreqMap = {
    // "keys": "values"
    "a":261.63,
    "w":277.18,
    "s":293.66,
    "e":311.13,
    "d":329.63,
    "f":349.23,
    "t":369.99,
    "g":392,
    "y":415.3,
    "h":440,
    "u":466.16,
    "j":493.88,
    "k":523.25,
    "o":554.37,
    "l":587.33,
    "p":622.25,
    ";":659.25,
}
window.addEventListener('keydown', getFrequency);
window.addEventListener('keyup', stopOscillator);

// ===== CLICK ON KEYS TO PLAY SYNTH ===== //
const keys = document.querySelectorAll(".key"); // this creates a 'nodeList' --> an array-like collection of data

const keysArray = Array.from(keys);

keysArray.forEach(key => key.addEventListener('mousedown', getClickedFrequency) ) //'key' is a local variable (local to this .forEach method) that is a stand-in name for the key being clicked)

keysArray.forEach(key => key.addEventListener('mouseup', stopOscillator));


// ======= SELECT WAVE ======= //
let waveOptions=["none", "sine", "square", "sawtooth", "triangle"]
const waveList = document.querySelector("#waveList");

let waveChoice;

function selectWaveType(e) {
    waveChoice = waveList.selectedIndex;
    waveType = waveOptions[waveChoice];
}










// // ======= CREATE A FILTER ========== //
// letFilterOptions=["none", "lowpass", "highpass", "bandpass", "notch"]

// const filter = audioCtx.createBiquadFilter();
// const filterList = document.querySelector("#filterList");
// const filterBtn = document.querySelector("#filterBtn");
// const freqSlider = document.querySelector("#cutoff");
// const qSlider = document.querySelector("#qValue");
// const freqSpan = document.querySelector("#freqValue")
// const qSpan = document.querySelector("#qualValue")

// let filterChoice;

// function selectFilterType(e) {
//     filterChoice = filterList.selectedIndex; // .selectedIndex will show which option is selected
//     filter.type = filterOptions[filterChoice]
// }

// function setCutoffFrequency() {
//     let cutoff = freqSlider.value
//     filter.frequency.value = cutoff;
//     freqSpan.innerHTML = cutoff;
// }

// /* filter.frequency.value = 750;
// freqSpan.innerHTML = filter.frequency.value */

// function setQValue() {
//     let qValue = qSlider.value
//     filter.Q.value = qValue;
//     qSpan.innerHTML = qValue;
// }

// filter.frequency.value = 200;
// filter.Q.value = 35; // resonance factor at cutoff

// dateHeader.addEventListener("click", () => {
//     noise.start();
// })


// filterBtn.addEventListener("click", selectFilterType)

// freqSlider.addEventListener("input", setCutoffFrequency);

// qSlider.addEventListener("input", setQValue);

// noiseGain.connect(filter);
// filter.connect(audioCtx.destination);