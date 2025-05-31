const statusEl = document.getElementById('status');
const vcbDot = document.getElementById('vcbDot');
const panto1 = document.getElementById('panto1');
const panto2 = document.getElementById('panto2');

let pantoSelectorValue = 2;
let pantoModeValue = 'AUTO';

const pantoSelectorKnob = document.getElementById('pantoSelectorKnob');
const pantoModeKnob = document.getElementById('pantoModeKnob');

function setVCB(action) {
  if (action === 'close') {
    vcbDot.style.background = 'lime';
    statusEl.innerText = "Status: VCB CLOSED";
  } else {
    vcbDot.style.background = 'red';
    statusEl.innerText = `Status: VCB ${action.toUpperCase()}`;
  }
}

function rotatePantoSelector() {
  pantoSelectorValue = (pantoSelectorValue === 1) ? 2 : 1;
  document.getElementById('pantoSelectorLabel').innerText = `PANTO.${pantoSelectorValue}`;

  // Rotate knob: state 1 = -45deg, state 2 = +45deg
  const angle = (pantoSelectorValue === 1) ? -45 : 45;
  pantoSelectorKnob.style.transform = `rotate(${angle}deg)`;
}

function rotatePantoMode() {
  pantoModeValue = (pantoModeValue === 'AUTO') ? 'MANUAL' : 'AUTO';
  document.getElementById('pantoModeLabel').innerText = pantoModeValue;

  // Rotate knob: AUTO = -45deg, MANUAL = +45deg
  const angle = (pantoModeValue === 'AUTO') ? -45 : 45;
  pantoModeKnob.style.transform = `rotate(${angle}deg)`;

  applyMode();
}

function raisePantograph() {
  const mode = pantoModeValue;
  const selector = pantoSelectorValue.toString();

  if (mode === 'AUTO') {
    if (selector === '1') {
      alert("⚠️ Raising Pantograph 1 is disabled in AUTO mode.");
      return;
    }
    if (selector === '2') {
      panto2.classList.remove('down');
      panto1.classList.add('down');
      statusEl.innerText = "Status: Pantograph 2 is Raised (AUTO mode)";
      return;
    }
  }

  if (mode === 'MANUAL') {
    if (selector === '1' && !panto2.classList.contains('down')) {
      alert("⚠️ Already one pantograph raised!");
      return;
    }
    if (selector === '2' && !panto1.classList.contains('down')) {
      alert("⚠️ Already one pantograph raised!");
      return;
    }
  }

  if (selector === '1') {
    panto1.classList.remove('down');
    panto2.classList.add('down');
  } else {
    panto2.classList.remove('down');
    panto1.classList.add('down');
  }

  statusEl.innerText = `Status: Pantograph ${selector} Raised (${mode} mode)`;
}

function lowerPantograph() {
  const mode = pantoModeValue;
  const selector = pantoSelectorValue.toString();

  if (mode === 'AUTO') {
    if (selector === '1') {
      alert("⚠️ Lowering Pantograph 1 is disabled in AUTO mode.");
      return;
    }
    if (selector === '2') {
      panto2.classList.add('down');
      statusEl.innerText = "Status: Pantograph 2 Lowered (AUTO mode)";
      return;
    }
  }

  if (mode === 'MANUAL') {
    if (selector === '1') {
      panto1.classList.add('down');
      statusEl.innerText = "Status: Pantograph 1 Lowered (MANUAL mode)";
    } else {
      panto2.classList.add('down');
      statusEl.innerText = "Status: Pantograph 2 Lowered (MANUAL mode)";
    }
  }
}

function applyMode() {
  const mode = pantoModeValue;
  if (mode === 'AUTO') {
    panto1.classList.add('down');
    panto2.classList.remove('down');
    statusEl.innerText = "AUTO MODE: Pantograph 2 Raised, Buttons Enabled";
  } else {
    statusEl.innerText = "MANUAL MODE: Use buttons to control Pantograph";
  }
}

window.onload = function () {
  pantoSelectorValue = 2;
  pantoModeValue = 'AUTO';
  document.getElementById('pantoSelectorLabel').innerText = `PANTO.${pantoSelectorValue}`;
  document.getElementById('pantoModeLabel').innerText = pantoModeValue;

  // Set initial knob rotations
  pantoSelectorKnob.style.transform = `rotate(45deg)`;
  pantoModeKnob.style.transform = `rotate(-45deg)`;

  applyMode();
};
