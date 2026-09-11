const fs = require('fs');
let code = fs.readFileSync('js/app.js', 'utf8');

const jsCode = `
    const speedSlider = document.getElementById('piper-speed-slider');
    const speedVal = document.getElementById('piper-speed-val');
    if (speedSlider) {
      window.piperSpeed = parseFloat(speedSlider.value);
      speedSlider.addEventListener('input', (e) => {
        window.piperSpeed = parseFloat(e.target.value);
        if (speedVal) speedVal.textContent = window.piperSpeed.toFixed(1) + 'x';
      });
    }
`;

code = code.replace(/init\(\) \{/, 'init() {\n' + jsCode);
fs.writeFileSync('js/app.js', code);
