let particles = [];
let time = 0;
let blurIntensity = 5;
let colorIntensity = 100;
let motionSpeed = 1;
let rayCount = 50;

// Color palette based on the image description
const colors = [
    { r: 255, g: 192, b: 203 }, // Light pink (center)
    { r: 255, g: 0, b: 255 },   // Fuchsia
    { r: 255, g: 20, b: 147 },  // Deep pink
    { r: 255, g: 0, b: 0 },     // Red
    { r: 255, g: 69, b: 0 },    // Red-orange
    { r: 255, g: 140, b: 0 },   // Dark orange
    { r: 0, g: 191, b: 255 },   // Deep sky blue
    { r: 30, g: 144, b: 255 },  // Dodger blue
    { r: 255, g: 215, b: 0 },   // Gold
];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
    
    // Initialize particles for radial rays
    for (let i = 0; i < rayCount; i++) {
        particles.push(new Particle(i));
    }
    
    // Setup control sliders
    setupControls();
}

function setupControls() {
    const blurSlider = document.getElementById('blur-slider');
    const colorSlider = document.getElementById('color-slider');
    const speedSlider = document.getElementById('speed-slider');
    const raysSlider = document.getElementById('rays-slider');
    
    blurSlider.addEventListener('input', (e) => {
        blurIntensity = parseFloat(e.target.value);
        document.getElementById('blur-value').textContent = blurIntensity;
    });
    
    colorSlider.addEventListener('input', (e) => {
        colorIntensity = parseFloat(e.target.value);
        document.getElementById('color-value').textContent = colorIntensity;
    });
    
    speedSlider.addEventListener('input', (e) => {
        motionSpeed = parseFloat(e.target.value);
        document.getElementById('speed-value').textContent = motionSpeed;
    });
    
    raysSlider.addEventListener('input', (e) => {
        rayCount = parseInt(e.target.value);
        document.getElementById('rays-value').textContent = rayCount;
        // Reinitialize particles
        particles = [];
        for (let i = 0; i < rayCount; i++) {
            particles.push(new Particle(i));
        }
    });
}

function draw() {
    // Create blur effect by drawing semi-transparent background
    fill(0, blurIntensity * 2);
    rect(0, 0, width, height);
    
    time += 0.01 * motionSpeed;
    
    // Draw particles
    for (let particle of particles) {
        particle.update();
        particle.display();
    }
    
    // Draw central bright glow
    drawCentralGlow();
}

function drawCentralGlow() {
    push();
    translate(width / 2, height / 2);
    
    // Multiple layers for intense glow effect
    for (let i = 0; i < 5; i++) {
        let size = 50 + i * 20;
        let alpha = (255 - i * 40) * (colorIntensity / 100);
        
        fill(255, 192, 203, alpha * 0.3);
        noStroke();
        
        // Create radial gradient effect
        for (let j = 0; j < 360; j += 5) {
            let angle = radians(j);
            let x = cos(angle) * size * 0.3;
            let y = sin(angle) * size * 0.3;
            ellipse(x, y, size, size);
        }
    }
    
    // Brightest center
    fill(255, 255, 255, 200 * (colorIntensity / 100));
    ellipse(0, 0, 30, 30);
    
    pop();
}

class Particle {
    constructor(index) {
        this.index = index;
        this.angle = (TWO_PI / rayCount) * index;
        this.baseRadius = random(100, 200);
        this.radiusVariation = random(50, 150);
        this.speed = random(0.005, 0.015);
        this.colorIndex = floor(random(colors.length));
        this.pulsePhase = random(TWO_PI);
    }
    
    update() {
        // Animate radius with pulsing motion
        this.currentRadius = this.baseRadius + 
            sin(time * 2 + this.pulsePhase) * this.radiusVariation;
        
        // Slight rotation for dynamic motion
        this.angle += this.speed * 0.1;
        
        // Color variation over time
        this.colorIndex = (this.colorIndex + 0.01) % colors.length;
    }
    
    display() {
        push();
        translate(width / 2, height / 2);
        rotate(this.angle);
        
        // Draw multiple layers for blur effect
        for (let layer = 0; layer < blurIntensity; layer++) {
            let layerRadius = this.currentRadius + layer * 10;
            let layerAlpha = (255 / blurIntensity) * (colorIntensity / 100) * 
                           (1 - layer / blurIntensity);
            
            // Blend colors for smooth transitions
            let color1 = colors[floor(this.colorIndex) % colors.length];
            let color2 = colors[(floor(this.colorIndex) + 1) % colors.length];
            let blend = this.colorIndex % 1;
            
            let r = lerp(color1.r, color2.r, blend);
            let g = lerp(color1.g, color2.g, blend);
            let b = lerp(color1.b, color2.b, blend);
            
            fill(r, g, b, layerAlpha);
            noStroke();
            
            // Draw elongated ray shape
            let rayLength = layerRadius * 0.8;
            let rayWidth = 20 - layer * 2;
            
            // Create soft, blurred ray
            for (let i = 0; i < rayLength; i += 5) {
                let progress = i / rayLength;
                let size = rayWidth * (1 - progress * 0.5);
                let alpha = layerAlpha * (1 - progress);
                
                fill(r, g, b, alpha);
                ellipse(i, 0, size, size);
            }
        }
        
        pop();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function resetAnimation() {
    time = 0;
    particles = [];
    for (let i = 0; i < rayCount; i++) {
        particles.push(new Particle(i));
    }
}

