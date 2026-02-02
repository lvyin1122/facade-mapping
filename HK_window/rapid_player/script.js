// All images from the Image folder
const imageList = [
    '../Image/bieshu_Cheng_02.jpg',
    '../Image/bieshu_Cheng_03.jpg',
    '../Image/bieshu_Huang_326.jpg',
    '../Image/bieshu_Huang_35.jpg',
    '../Image/cunwu_Cheng_01.jpg',
    '../Image/cunwu_Cheng_02.jpg',
    '../Image/cunwu_Cheng_03.jpg',
    '../Image/cunwu_Cheng_04.jpg',
    '../Image/cunwu_Cheng_05.jpg',
    '../Image/cunwu_Cheng_06.jpg',
    '../Image/cunwu_Cheng_07.jpg',
    '../Image/cunwu_Huang_37.jpg',
    '../Image/cunwu_Huang_38.jpg',
    '../Image/cunwu_Huang_39.jpg',
    '../Image/cunwu_Huang_40.jpg',
    '../Image/tangfang_Cheng_01.jpg',
    '../Image/tangfang_Cheng_02.jpg',
    '../Image/tangfang_Cheng_03.jpg',
    '../Image/tangfang_Cheng_04.jpg',
    '../Image/tangfang_Cheng_05.jpg',
    '../Image/tangfang_Cheng_06.jpg',
    '../Image/tangfang_Cheng_06 (1).jpg',
    '../Image/tangfang_Cheng_07.jpg',
    '../Image/tangfang_Cheng_08.jpg',
    '../Image/tangfang_Cheng_09.jpg',
    '../Image/tangfang_Cheng_10.jpg',
    '../Image/tangfang_Cheng_11.jpg',
    '../Image/tangfang_Cheng_12.jpg',
    '../Image/tangfang_Cheng_13.jpg',
    '../Image/tanglou_Huang_02.jpg',
    '../Image/tanglou_Huang_15.jpg',
    '../Image/tanglou_Huang_16.jpg',
    '../Image/tanglou_Huang_17.jpg',
    '../Image/tanglou_Huang_18.jpg',
    '../Image/tanglou_Huang_22.jpg',
    '../Image/tanglou_Huang_23.jpg',
    '../Image/tanglou_Huang_28.jpg',
    '../Image/tanglou_Huang_29.jpg',
    '../Image/tanglou_Huang_30.jpg',
    '../Image/tanglou_Huang_31.jpg',
    '../Image/wuyuan_Cheng_01.jpg',
    '../Image/wuyuan_Cheng_02.jpg',
    '../Image/wuyuan_Cheng_03.jpg',
    '../Image/wuyuan_Cheng_04.jpg',
    '../Image/wuyuan_Cheng_05.jpg',
    '../Image/wuyuan_Cheng_06.jpg',
    '../Image/wuyuan_Cheng_07.jpg',
    '../Image/wuyuan_Cheng_08.jpg',
    '../Image/wuyuan_Huang_01.jpg',
    '../Image/wuyuan_Huang_03.jpg',
    '../Image/wuyuan_Huang_04.jpg',
    '../Image/wuyuan_Huang_08.jpg',
    '../Image/wuyuan_Huang_09.jpg',
    '../Image/wuyuan_Huang_10.jpg',
    '../Image/wuyuan_Huang_11.jpg',
    '../Image/wuyuan_Huang_12.jpg',
    '../Image/wuyuan_Huang_13.jpg',
    '../Image/wuyuan_Huang_14.jpg',
    '../Image/wuyuan_Huang_19.jpg',
    '../Image/wuyuan_Huang_20.jpg',
    '../Image/wuyuan_Huang_21.jpg',
    '../Image/wuyuan_Huang_33.jpg',
    '../Image/wuyuan_Huang_34.jpg',
    '../Image/wuyuan（new）_Huang_24.jpg',
    '../Image/wuyuan（new）_Huang_25.jpg',
    '../Image/wuyuan（new）_Huang_26.jpg',
    '../Image/wuyuan（new）_Huang_27.jpg',
    '../Image/wuyuan（new）_Huang_32.jpg',
    '../Image/yanglou_Cheng_01.jpg',
    '../Image/yanglou_Cheng_02.jpg',
    '../Image/yanglou_Cheng_03.jpg',
    '../Image/yanglou_Cheng_05.jpg',
    '../Image/yanglou_Cheng_06.jpg',
    '../Image/yanglou_Cheng_07.jpg',
    '../Image/yanglou_Cheng_08.jpg',
    '../Image/yanglou_Cheng_09.jpg',
    '../Image/yanglou_Huang_05.jpg',
    '../Image/yanglou_Huang_06.jpg',
    '../Image/yanglou_Huang_07.jpg',
    '../Image/yanglou_Huang_32.jpg',
];

let currentIndex = 0;
let isPaused = false;
let changeInterval = null;
let speedMultiplier = 1.5; // Default speed (1-20, higher = faster)
const baseInterval = 400; // Base interval in ms

const displayImage = document.getElementById('displayImage');
const backgroundMusic = document.getElementById('backgroundMusic');
const fullscreenBtn = document.getElementById('fullscreenBtn');

// Preload all images for smooth transitions
function preloadImages() {
    const imagePromises = imageList.map(src => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load ${src}`));
            img.src = src;
        });
    });
    
    Promise.all(imagePromises)
        .then(() => {
            console.log('All images preloaded');
            startImageRotation();
        })
        .catch(error => {
            console.error('Error preloading images:', error);
            // Start anyway even if some images fail
            startImageRotation();
        });
}

// Change to next random image
function changeImage() {
    if (isPaused) return;
    
    // Fade out current image
    displayImage.classList.add('fade-out');
    
    setTimeout(() => {
        // Randomly select next image (can repeat)
        currentIndex = Math.floor(Math.random() * imageList.length);
        
        // Update image source
        displayImage.src = imageList[currentIndex];
        displayImage.classList.remove('fade-out');
        displayImage.classList.add('loaded');
    }, 20); // Very quick fade transition for rapid playback
}

// Start the image rotation
function startImageRotation() {
    // Load first random image
    if (imageList.length > 0) {
        currentIndex = Math.floor(Math.random() * imageList.length);
        displayImage.src = imageList[currentIndex];
        displayImage.classList.add('loaded');
    }
    
    // Start interval
    updateInterval();
}

// Update the interval based on current speed
function updateInterval() {
    if (changeInterval) {
        clearInterval(changeInterval);
    }
    
    // Calculate interval: baseInterval divided by speed multiplier
    // Higher multiplier = faster changes
    const interval = Math.max(10, baseInterval / speedMultiplier);
    
    changeInterval = setInterval(changeImage, interval);
}

// Fullscreen functionality
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Error attempting to enable fullscreen:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

fullscreenBtn.addEventListener('click', () => {
    toggleFullscreen();
});

// Update fullscreen button icon
function updateFullscreenIcon() {
    if (document.fullscreenElement) {
        fullscreenBtn.innerHTML = '<span class="fullscreen-icon">⛶</span>';
        fullscreenBtn.title = 'Exit Fullscreen';
    } else {
        fullscreenBtn.innerHTML = '<span class="fullscreen-icon">⛶</span>';
        fullscreenBtn.title = 'Enter Fullscreen';
    }
}

document.addEventListener('fullscreenchange', updateFullscreenIcon);

// Try to play background music on load
window.addEventListener('load', () => {
    preloadImages();
    
    // Set up background music
    backgroundMusic.volume = 0.7;
    backgroundMusic.loop = true;
    
    // Check if audio file is loaded
    backgroundMusic.addEventListener('canplaythrough', () => {
        console.log('Background music ready to play');
    });
    
    backgroundMusic.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        console.error('Audio src:', backgroundMusic.src);
    });
    
    // Try to play background music (may require user interaction)
    backgroundMusic.play().catch(err => {
        console.log('Background music autoplay blocked (normal), will start on user interaction');
    });
});

// Start music on any user interaction
let musicStarted = false;
const startMusic = () => {
    if (!musicStarted) {
        backgroundMusic.volume = 0.7;
        backgroundMusic.loop = true;
        const playPromise = backgroundMusic.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log('Background music started');
                    musicStarted = true;
                })
                .catch(err => {
                    console.log('Background music play failed:', err);
                    // Try again on next interaction
                    musicStarted = false;
                });
        }
    }
};

// Listen for various user interactions to start music
document.addEventListener('click', startMusic, { once: true });
document.addEventListener('keydown', startMusic, { once: true });
document.addEventListener('touchstart', startMusic, { once: true });
fullscreenBtn.addEventListener('click', startMusic, { once: true });

// Handle image load errors gracefully
displayImage.addEventListener('error', () => {
    console.error('Failed to load image:', displayImage.src);
    // Skip to next random image if current one fails
    setTimeout(() => {
        currentIndex = Math.floor(Math.random() * imageList.length);
        displayImage.src = imageList[currentIndex];
    }, 50);
});
