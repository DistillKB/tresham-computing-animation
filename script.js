const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
const logo = document.getElementById('tresham-logo');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) {
  drops[x] = 1;
}

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#33BA47'; // Green Matrix
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = String.fromCharCode(Math.random() * 128);
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 33); // Adjust for speed


const textElements = [
    document.getElementById('text1'),
    document.getElementById('text2'),
    document.getElementById('text3'),
    document.getElementById('text4'),
    document.getElementById('text5'),
    document.getElementById('text6'),
    document.getElementById('text7')
];

const phrases = [
  "Welcome to the Tresham College\nComputing Department",
  "Where innovation meets opportunity!",
  "From foundational courses to specialized programs...\n...in App Development and Cyber Security...",
  "...we offer pathways for every aspiring tech professional.",
  "Our cutting-edge facilities ensure you gain\npractical experience with the latest technology.",
  "Your future starts here.\nApply now!",
  "Bohdan Silakov"
];

let animationStep = 0;
let underscoreVisible = true;

// --- Animation Functions ---

function fadeInLogo(callback) {
    logo.style.opacity = 1;
    let brightness = 0.1;
    const fadeInInterval = setInterval(() => {
        brightness += 0.05;
        logo.style.filter = `brightness(${brightness})`;
        if (brightness >= 1) {
            clearInterval(fadeInInterval);
            setTimeout(callback, 300); // Pause after fade-in
        }
    }, 30);
}


function glitchLogo() {
    const glitchChars = '!@#$%^&*()_+=-`~[]\{}|;\':",./<>?';
    let glitchInterval; 

    function startGlitching() {
        glitchInterval = setInterval(() => {
            // Randomly offset the logo
            logo.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;

            // Random color filter generation
            const hue = Math.random() * 360;
            const saturate = Math.random() * 2 + 0.5;
            const brightness = Math.random() * 0.8 + 0.4;
            const contrast = Math.random() * 0.5 + 0.75;
            const grayscale = Math.random() < 0.1 ? Math.random() : 0;
            const sepia = Math.random() < 0.1 ? Math.random() : 0;
            const invert = Math.random() < 0.05 ? Math.random() : 0;

            logo.style.filter = `brightness(${brightness}) hue-rotate(${hue}deg) saturate(${saturate}) contrast(${contrast}) grayscale(${grayscale}) sepia(${sepia}) invert(${invert})`;

            // Add a "scanline" effect
            const scanline = document.createElement('div');
            scanline.style.position = 'absolute';
            scanline.style.top = `${Math.random() * 100}%`;
            scanline.style.left = '0';
            scanline.style.width = '100%';
            scanline.style.height = `${Math.random() * 3 + 1}px`;
            scanline.style.backgroundColor = 'rgba(255,255,255,0.1)';
            scanline.style.zIndex = '2';
            logo.parentNode.appendChild(scanline);
            setTimeout(() => {
                if (logo.parentNode) {
                    logo.parentNode.removeChild(scanline);
                }
            }, 50);

            // Text-like glitching
            if (Math.random() < 0.3) {
                const glitchChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                logo.style.setProperty('--glitch-char', `'${glitchChar}'`);
                logo.classList.add('glitching');
            } else {
                logo.classList.remove('glitching');
            }
        }, 50);

        setTimeout(stopGlitching, 1000);
    }

    function stopGlitching() {
        clearInterval(glitchInterval);
        logo.style.filter = 'none'; 
        logo.style.transform = 'none'; 
        logo.classList.remove('glitching'); 

        // Pause for a random amount of time
        const pauseDuration = Math.random() * 5000 + 500;
        setTimeout(startGlitching, pauseDuration);
    }

    startGlitching();
}

function typeText(element, text, callback) {
  element.style.opacity = 1; 
  let i = 0;
  const typingInterval = setInterval(() => {
    element.textContent = text.substring(0, i + 1) + (underscoreVisible ? "_" : "");
    i++;
    underscoreVisible = !underscoreVisible;
    if (i >= text.length) {
      clearInterval(typingInterval);
      element.textContent = text;  // Remove underscore
      setTimeout(callback, 500); // Pause after typing
    }
  }, 50); // Faster typing speed
}

function backspaceText(element, callback) {
  let i = element.textContent.length;
  const backspaceInterval = setInterval(() => {
    element.textContent = element.textContent.substring(0, i - 1);
    i--;
    if (i <= 0) {
      clearInterval(backspaceInterval);
      element.style.opacity = 0;
      setTimeout(callback, 200); 
    }
  }, 40); // Faster backspacing
}

function glitchText(element, callback) {
    const originalText = element.textContent;
    const originalColor = element.style.color || '#33BA47';
    const glitchChars = '!@#$%^&*()_+=-`~[]\{}|;\':",./<>?';
    let glitchCount = 0;
    const maxGlitches = 10; // Number of glitch iterations

    const glitchInterval = setInterval(() => {
        let glitchedText = '';
        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() < 0.2) { // 20% chance to glitch a character
                glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
                glitchedText += originalText[i];
            }
        }

        element.textContent = glitchedText;
        element.style.color = (Math.random() < 0.5) ? '#f00' : '#0f0'; // Flash colors
        element.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`; // Offset

        // Duplication/Flicker 
        if (Math.random() < 0.3) {
             const clone = element.cloneNode(true);
             clone.style.position = 'absolute';
             clone.style.left = `${Math.random() * 6 - 3}px`;
             clone.style.top = `${Math.random() * 6 - 3}px`;
             clone.style.opacity = 0.5;
             clone.style.color = (Math.random() < 0.5) ? '#935FB2' : originalColor;
             element.parentNode.appendChild(clone);
             setTimeout(() => {
                 if (element.parentNode) { 
                    element.parentNode.removeChild(clone);
                 }
             }, 50); // Remove the clone quickly
         }


        glitchCount++;
        if (glitchCount >= maxGlitches) {
            clearInterval(glitchInterval);
            element.textContent = originalText; 
            element.style.color = originalColor; 
            element.style.transform = 'none';    
            setTimeout(callback, 300); 
        }
    }, 75); // Glitch length
}

function animate() {
    switch (animationStep) {
        case 0:
            fadeInLogo(() => { animationStep++; animate(); });
            break;
        case 1:
            glitchLogo();
            animationStep++;
            animate(); 
            break;
        case 2: 
            typeText(textElements[0], phrases[0], () => { animationStep++; animate(); });
            break;
        case 3: 
            typeText(textElements[1], phrases[1], () => { animationStep++; animate(); });
            break;
        case 4: 
            glitchText(textElements[0], () => { animationStep++; animate(); });
            break;
        case 5: 
            glitchText(textElements[1], () => { animationStep++; animate(); });
            break;
        case 6: 
            backspaceText(textElements[0], () => { animationStep++; animate(); });
            break;
        case 7: 
            backspaceText(textElements[1], () => { animationStep++; animate(); });
            break;
        case 8: 
            typeText(textElements[2], phrases[2], () => { animationStep++; animate(); });
            break;
        case 9: 
            typeText(textElements[3], phrases[3], () => { animationStep++; animate(); });
            break;
        case 10: 
            glitchText(textElements[2], () => {animationStep++; animate();});
            break;
        case 11: 
            glitchText(textElements[3], () => {animationStep++; animate();});
            break;
        case 12: 
            backspaceText(textElements[2], () => { animationStep++; animate(); });
            break;
        case 13:
            backspaceText(textElements[3], () => { animationStep++; animate(); });
            break;
        case 14: 
            typeText(textElements[4], phrases[4], () => { animationStep++; animate(); });
            break;
        case 15: 
            glitchText(textElements[4], () => { animationStep++; animate(); });
            break;
        case 16: 
            backspaceText(textElements[4], () => { animationStep++; animate(); });
            break;
        case 17: 
            typeText(textElements[5], phrases[5], () => { animationStep++; animate(); });
            break;
        case 18: 
            glitchText(textElements[5], () => { animationStep++; animate(); });
            break;
        case 19: 
	    backspaceText(textElements[5], () => { animationStep++; animate(); });
            break;
        case 20: 
            typeText(textElements[6], phrases[6], () => { animationStep++; animate(); });
            break;
	case 21:
	    glitchText(textElements[6], () => { animationStep++; animate(); });
            break;
	case 22:
	    backspaceText(textElements[6], () => { animationStep++; animate(); });
            break;
        case 23: 
            glitchText(textElements[6], () => {
                clearInterval(logo.glitchInterval);
                logo.style.filter = 'none'; 
                logo.style.transform = 'none'; 
                logo.classList.remove('glitching'); 
                animationStep = 2; 
                animate();
            });
            break;

    }
}


animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops.length = 0; // Clear drops
    const columns = canvas.width / fontSize;
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
});
