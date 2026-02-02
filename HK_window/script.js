// Building facade details - doors and windows close-ups
const imageSets = {
    set1: [
        'Image/bieshu_Cheng_02.jpg',
        'Image/bieshu_Cheng_03.jpg',
        'Image/bieshu_Huang_326.jpg',
        'Image/bieshu_Huang_35.jpg',
        'Image/cunwu_Cheng_01.jpg',
    ],
    set2: [
        'Image/cunwu_Cheng_02.jpg',
        'Image/cunwu_Cheng_03.jpg',
        'Image/cunwu_Cheng_04.jpg',
        'Image/cunwu_Cheng_05.jpg',
        'Image/cunwu_Cheng_06.jpg',
    ],
    set3: [
        'Image/cunwu_Cheng_07.jpg',
        'Image/cunwu_Huang_37.jpg',
        'Image/cunwu_Huang_38.jpg',
        'Image/cunwu_Huang_39.jpg',
        'Image/cunwu_Huang_40.jpg',
    ],
    set4: [
        'Image/tangfang_Cheng_01.jpg',
        'Image/tangfang_Cheng_02.jpg',
        'Image/tangfang_Cheng_03.jpg',
        'Image/tangfang_Cheng_04.jpg',
        'Image/tangfang_Cheng_05.jpg',
    ],
    set5: [
        'Image/tangfang_Cheng_06.jpg',
        'Image/tangfang_Cheng_06 (1).jpg',
        'Image/tangfang_Cheng_07.jpg',
        'Image/tangfang_Cheng_08.jpg',
        'Image/tangfang_Cheng_09.jpg',
    ],
    set6: [
        'Image/tangfang_Cheng_10.jpg',
        'Image/tangfang_Cheng_11.jpg',
        'Image/tangfang_Cheng_12.jpg',
        'Image/tangfang_Cheng_13.jpg',
        'Image/tanglou_Huang_02.jpg',
    ],
    set7: [
        'Image/tanglou_Huang_15.jpg',
        'Image/tanglou_Huang_16.jpg',
        'Image/tanglou_Huang_17.jpg',
        'Image/tanglou_Huang_18.jpg',
        'Image/tanglou_Huang_22.jpg',
    ],
    set8: [
        'Image/tanglou_Huang_23.jpg',
        'Image/tanglou_Huang_28.jpg',
        'Image/tanglou_Huang_29.jpg',
        'Image/tanglou_Huang_30.jpg',
        'Image/tanglou_Huang_31.jpg',
    ],
    set9: [
        'Image/wuyuan_Cheng_01.jpg',
        'Image/wuyuan_Cheng_02.jpg',
        'Image/wuyuan_Cheng_03.jpg',
        'Image/wuyuan_Cheng_04.jpg',
        'Image/wuyuan_Cheng_05.jpg',
    ],
    set10: [
        'Image/wuyuan_Cheng_06.jpg',
        'Image/wuyuan_Cheng_07.jpg',
        'Image/wuyuan_Cheng_08.jpg',
        'Image/wuyuan_Huang_01.jpg',
        'Image/wuyuan_Huang_03.jpg',
    ],
    set11: [
        'Image/wuyuan_Huang_04.jpg',
        'Image/wuyuan_Huang_08.jpg',
        'Image/wuyuan_Huang_09.jpg',
        'Image/wuyuan_Huang_10.jpg',
        'Image/wuyuan_Huang_11.jpg',
    ],
    set12: [
        'Image/wuyuan_Huang_12.jpg',
        'Image/wuyuan_Huang_13.jpg',
        'Image/wuyuan_Huang_14.jpg',
        'Image/wuyuan_Huang_19.jpg',
        'Image/wuyuan_Huang_20.jpg',
    ],
    set13: [
        'Image/wuyuan_Huang_21.jpg',
        'Image/wuyuan_Huang_33.jpg',
        'Image/wuyuan_Huang_34.jpg',
        'Image/wuyuan（new）_Huang_24.jpg',
        'Image/wuyuan（new）_Huang_25.jpg',
    ],
    set14: [
        'Image/wuyuan（new）_Huang_26.jpg',
        'Image/wuyuan（new）_Huang_27.jpg',
        'Image/wuyuan（new）_Huang_32.jpg',
        'Image/yanglou_Cheng_01.jpg',
        'Image/yanglou_Cheng_02.jpg',
    ],
    set15: [
        'Image/yanglou_Cheng_03.jpg',
        'Image/yanglou_Cheng_05.jpg',
        'Image/yanglou_Cheng_06.jpg',
        'Image/yanglou_Cheng_07.jpg',
        'Image/yanglou_Cheng_08.jpg',
    ],
    set16: [
        'Image/yanglou_Cheng_09.jpg',
        'Image/yanglou_Huang_05.jpg',
        'Image/yanglou_Huang_06.jpg',
        'Image/yanglou_Huang_07.jpg',
        'Image/yanglou_Huang_32.jpg',
    ],
};

// Flatten all images into a single array
const allImages = Object.values(imageSets).flat();

// Generate enough images to fill the page (with repetition)
function generateImageArray(targetCount = 50) {
    const repeatedImages = [];
    while (repeatedImages.length < targetCount) {
        // Randomly select from allImages and add to array
        const randomIndex = Math.floor(Math.random() * allImages.length);
        repeatedImages.push(allImages[randomIndex]);
    }
    return repeatedImages;
}

// Function to add drag functionality to an image item
function addDragFunctionality(galleryItem, imageUrl) {
    let longPressTimer = null;
    let isDragging = false;
    let hasDragged = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;
    const LONG_PRESS_DURATION = 300; // 300ms for long press
    
    // Mouse move handler (on document for better drag experience)
    const handleMouseMove = (e) => {
        if (isDragging) {
            e.preventDefault();
            hasDragged = true;
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            // Only allow horizontal dragging (left and right)
            const newLeft = initialLeft + deltaX;
            galleryItem.style.left = newLeft + 'px';
        } else if (longPressTimer) {
            // Check if moved too much before long press completes
            const deltaX = Math.abs(e.clientX - startX);
            const deltaY = Math.abs(e.clientY - startY);
            if (deltaX > 5 || deltaY > 5) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
            }
        }
    };
    
    // Mouse up handler (on document)
    const handleMouseUp = (e) => {
        const wasDragging = isDragging;
        
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            longPressTimer = null;
        }
        
        if (isDragging) {
            isDragging = false;
            galleryItem.classList.remove('dragging');
            hasDragged = true;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        } else if (!hasDragged && !wasDragging) {
            // Regular click (not drag) - trigger after a short delay to ensure it's a click
            setTimeout(() => {
                if (!hasDragged && !isDragging) {
                    playClickSound();
                    showImageViewer(imageUrl);
                }
            }, 50);
        }
        hasDragged = false;
    };
    
    // Also add explicit click handler for better reliability
    galleryItem.addEventListener('click', (e) => {
        // Only trigger if it wasn't a drag operation
        if (!hasDragged && !isDragging) {
            e.preventDefault();
            e.stopPropagation();
            playClickSound();
            showImageViewer(imageUrl);
        }
    }, true); // Use capture phase for better reliability
    
    // Handle mouse events (desktop)
    galleryItem.addEventListener('mousedown', (e) => {
        // Don't prevent default immediately to allow click to work
        startX = e.clientX;
        startY = e.clientY;
        initialLeft = parseFloat(galleryItem.style.left) || 0;
        initialTop = parseFloat(galleryItem.style.top) || 0;
        hasDragged = false;
        
        longPressTimer = setTimeout(() => {
            e.preventDefault(); // Only prevent default when long press starts
            isDragging = true;
            galleryItem.classList.add('dragging');
            playClickSound();
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }, LONG_PRESS_DURATION);
    });
    
    galleryItem.addEventListener('mouseleave', (e) => {
        // Don't cancel if already dragging
        if (!isDragging && longPressTimer) {
            clearTimeout(longPressTimer);
            longPressTimer = null;
        }
    });
    
    // Handle touch events (mobile)
    galleryItem.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        initialLeft = parseFloat(galleryItem.style.left) || 0;
        initialTop = parseFloat(galleryItem.style.top) || 0;
        hasDragged = false;
        
        longPressTimer = setTimeout(() => {
            e.preventDefault(); // Only prevent default when long press starts
            isDragging = true;
            galleryItem.classList.add('dragging');
            playClickSound();
        }, LONG_PRESS_DURATION);
    }, { passive: true }); // Use passive listener for better performance
    
    galleryItem.addEventListener('touchmove', (e) => {
        if (isDragging) {
            e.preventDefault();
            hasDragged = true;
            const touch = e.touches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;
            
            // Only allow horizontal dragging (left and right)
            const newLeft = initialLeft + deltaX;
            galleryItem.style.left = newLeft + 'px';
        } else if (longPressTimer) {
            // Check if moved too much before long press completes
            const touch = e.touches[0];
            const deltaX = Math.abs(touch.clientX - startX);
            const deltaY = Math.abs(touch.clientY - startY);
            if (deltaX > 10 || deltaY > 10) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
            }
        }
    });
    
    galleryItem.addEventListener('touchend', (e) => {
        const wasDragging = isDragging;
        
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            longPressTimer = null;
        }
        
        if (isDragging) {
            isDragging = false;
            galleryItem.classList.remove('dragging');
            hasDragged = true;
        } else if (!hasDragged && !wasDragging) {
            // Regular tap (not drag) - trigger after a short delay
            setTimeout(() => {
                if (!hasDragged && !isDragging) {
                    playClickSound();
                    showImageViewer(imageUrl);
                }
            }, 50);
        }
        hasDragged = false;
    });
    
    galleryItem.addEventListener('touchcancel', (e) => {
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            longPressTimer = null;
        }
        if (isDragging) {
            isDragging = false;
            galleryItem.classList.remove('dragging');
        }
    });
    
    // Handle hover effect (no rotation) - only when not dragging
    galleryItem.addEventListener('mouseenter', () => {
        if (!isDragging) {
            galleryItem.style.transform = 'scale(1.1)';
        }
    });
    
    galleryItem.addEventListener('mouseleave', () => {
        if (!isDragging) {
            galleryItem.style.transform = 'none';
        }
    });
}

// Random collage layout configuration - slightly larger to reduce gaps
const SIZE_SCALE = 1.22;
let gridWidth = 0;
let gridHeight = 0;
let totalWidth = 0;
let images = []; // Store images array for fullscreen handler
let layoutImagesRef = null; // Store layoutImages reference

// Global updateLayout function for fullscreen handler
let updateLayoutFn = null;

// Initialize gallery with masonry layout
function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = ''; // Clear existing content
    
    // Initialize layout dimensions
    const updateLayout = () => {
        // Force recalculation - use window dimensions in fullscreen
        const isFullscreen = document.fullscreenElement || 
                           document.webkitFullscreenElement || 
                           document.mozFullScreenElement || 
                           document.msFullscreenElement;
        
        if (isFullscreen) {
            // In fullscreen, use window dimensions directly
            gridWidth = window.innerWidth;
            gridHeight = window.innerHeight;
        } else {
            // Reset grid style to allow natural width calculation
            if (galleryGrid.style.width && galleryGrid.style.width.includes('px')) {
                galleryGrid.style.width = '';
            }
            // Force reflow
            galleryGrid.offsetWidth;
            gridWidth = galleryGrid.offsetWidth || window.innerWidth;
            gridHeight = window.innerHeight;
        }
        
        // Ensure grid has proper width
        if (galleryGrid.offsetWidth === 0) {
            galleryGrid.style.width = gridWidth + 'px';
        }
    };
    
    // Store reference for fullscreen handler
    updateLayoutFn = updateLayout;
    
    updateLayout();
    
    let loadedCount = 0;
    let layoutDone = false; // Prevent multiple layouts
    images = []; // Use global images array
    
    // More images to fill gaps - denser coverage
    const averageImageArea = 200 * 240;
    const scrollWidth = Math.max(gridWidth * 4, 4000);
    const viewportArea = scrollWidth * gridHeight;
    const targetImageCount = Math.max(220, Math.ceil(viewportArea / averageImageArea * 3.2));
    const imageArray = generateImageArray(targetImageCount);
    
    window.addEventListener('resize', () => {
        if (!layoutDone) return; // Don't relayout during initial load
        updateLayout();
        layoutImages();
    });
    
    imageArray.forEach((imageUrl, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item loading';
        galleryItem.dataset.index = index;
        
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Photography ${index + 1}`;
        img.loading = 'lazy';
        
        // Store image data
        const imageData = {
            item: galleryItem,
            img: img,
            index: index,
            width: 0,
            height: 0,
            aspectRatio: 0,
            positioned: false // Track if already positioned
        };
        images.push(imageData);
        
        // Remove loading class and get dimensions when image loads
        img.onload = () => {
            galleryItem.classList.remove('loading');
            imageData.width = img.naturalWidth;
            imageData.height = img.naturalHeight;
            imageData.aspectRatio = imageData.width / imageData.height;
            
            loadedCount++;
            // Only layout once when all images are loaded
            if (loadedCount === imageArray.length && !layoutDone) {
                layoutDone = true;
                layoutImages();
            }
        };
        
        // Handle image load errors
        img.onerror = () => {
            console.warn('Failed to load image:', imageUrl);
            loadedCount++;
            if (loadedCount === imageArray.length && !layoutDone) {
                layoutDone = true;
                layoutImages();
            }
        };
        
        // Add drag functionality
        addDragFunctionality(galleryItem, imageUrl);
        
        galleryItem.appendChild(img);
        galleryGrid.appendChild(galleryItem);
    });
    
    // Random collage layout function - fill page randomly with images
    function layoutImages() {
        // Store reference for fullscreen handler
        layoutImagesRef = layoutImages;
        updateLayout();
        
        // Slightly larger base size to cover more area and reduce gaps
        const baseSize = Math.min(gridWidth * 0.32, 420);
        
        // Track placed images for overlap detection
        const placedImages = [];
        
        // Layout all images randomly to fill the page
        images.forEach((imageData) => {
            if (imageData.aspectRatio === 0) return; // Skip if not loaded
            if (imageData.positioned) return; // Skip if already positioned
            
            // Use a seeded random based on index for consistent positioning
            const seed = imageData.index;
            let seedValue = seed;
            const seededRandom = () => {
                seedValue = (seedValue * 9301 + 49297) % 233280;
                return seedValue / 233280;
            };
            
            // Randomly decide orientation (portrait or landscape)
            const isPortrait = seededRandom() > 0.5;
            let itemWidth, itemHeight;
            
            if (isPortrait) {
                // Portrait orientation
                itemWidth = baseSize * SIZE_SCALE;
                itemHeight = itemWidth / imageData.aspectRatio;
            } else {
                // Landscape orientation
                itemHeight = baseSize * SIZE_SCALE;
                itemWidth = itemHeight * imageData.aspectRatio;
            }
            
            // Add size variation (80% to 140% of base size) for better coverage
            const sizeVariation = 0.8 + seededRandom() * 0.6;
            itemWidth *= sizeVariation;
            itemHeight *= sizeVariation;
            
            // Random position across full screen - X along scroll width, Y full height so screen is almost covered
            const scrollWidth = Math.max(gridWidth * 4, 4000);
            const maxX = scrollWidth;
            const maxY = Math.max(0, gridHeight - itemHeight);
            let randomX, randomY;
            let attempts = 0;
            const maxAttempts = 80;
            
            do {
                randomX = seededRandom() * maxX;
                randomY = seededRandom() * maxY;
                attempts++;
                
                const overlapCount = countOverlaps(randomX, randomY, itemWidth, itemHeight, placedImages);
                
                // Allow moderate overlap to fill gaps without being too dense
                if (overlapCount < 5 || attempts >= maxAttempts) {
                    break;
                }
            } while (attempts < maxAttempts);
            
            // Random z-index for layering (seeded for consistency)
            const zIndex = Math.floor(seededRandom() * 100) + 1;
            
            // Position the item (no rotation)
            imageData.item.style.width = itemWidth + 'px';
            imageData.item.style.height = itemHeight + 'px';
            imageData.item.style.left = randomX + 'px';
            imageData.item.style.top = randomY + 'px';
            imageData.item.style.transform = 'none';
            imageData.item.style.zIndex = zIndex;
            
            // Mark as positioned
            imageData.positioned = true;
            
            // Store this image's position for future overlap checks
            placedImages.push({
                x: randomX,
                y: randomY,
                width: itemWidth,
                height: itemHeight
            });
        });
        
        // Helper function to count overlaps
        function countOverlaps(x, y, width, height, placedImages) {
            let overlapCount = 0;
            const newRect = { x, y, width, height };
            
            for (const placed of placedImages) {
                if (rectanglesOverlap(newRect, placed)) {
                    overlapCount++;
                }
            }
            
            return overlapCount;
        }
        
        // Helper function to check if two rectangles overlap
        function rectanglesOverlap(rect1, rect2) {
            return !(rect1.x + rect1.width < rect2.x ||
                     rect2.x + rect2.width < rect1.x ||
                     rect1.y + rect1.height < rect2.y ||
                     rect2.y + rect2.height < rect1.y);
        }
        
        // Total width = actual content width (rightmost image edge), so duplicate starts right after - no gap
        let maxX = 0;
        images.forEach((imageData) => {
            if (imageData.aspectRatio === 0) return;
            const left = parseFloat(imageData.item.style.left) || 0;
            const width = parseFloat(imageData.item.style.width) || 0;
            maxX = Math.max(maxX, left + width);
        });
        totalWidth = Math.ceil(maxX / 100) * 100; // Use actual content width so loop is seamless
        
        // Create duplicate set for seamless infinite scroll (cycling)
        if (totalWidth > 0) {
            const oldDuplicate = document.getElementById('galleryGridDuplicate');
            if (oldDuplicate) oldDuplicate.remove();
            
            const duplicateSet = galleryGrid.cloneNode(true);
            duplicateSet.id = 'galleryGridDuplicate';
            duplicateSet.style.position = 'absolute';
            duplicateSet.style.top = '0';
            duplicateSet.style.left = totalWidth + 'px';
            duplicateSet.style.width = totalWidth + 'px';
            duplicateSet.style.height = '100%';
            duplicateSet.style.animation = 'none';
            
            // Duplicate items: same layout as original (block is already offset by totalWidth)
            const duplicateItems = duplicateSet.querySelectorAll('.gallery-item');
            duplicateItems.forEach((item, idx) => {
                const originalItem = images[idx]?.item;
                if (originalItem) {
                    item.style.width = originalItem.style.width;
                    item.style.height = originalItem.style.height;
                    item.style.left = originalItem.style.left;
                    item.style.top = originalItem.style.top;
                    item.style.transform = 'none';
                    item.style.zIndex = originalItem.style.zIndex;
                    
                    const duplicateImg = item.querySelector('img');
                    if (duplicateImg && duplicateImg.src) {
                        addDragFunctionality(item, duplicateImg.src);
                    }
                }
            });
            
            // Append duplicate INSIDE the grid so it scrolls with the grid - no empty strip, no flash
            galleryGrid.appendChild(duplicateSet);
            
            // Set grid width for horizontal scrolling - ensure it's visible
            const gridTotalWidth = totalWidth * 2;
            galleryGrid.style.width = gridTotalWidth + 'px';
            galleryGrid.style.height = '100vh';
            galleryGrid.style.minWidth = gridTotalWidth + 'px';
            galleryGrid.style.display = 'block';
            galleryGrid.style.visibility = 'visible';
        }
    }
    
    // Don't call layoutImages here - wait for all images to load
}

// Available sound files from sound folder
const soundFiles = [
    '../sound/colorful.mp3',
    '../sound/dense block.mp3',
    '../sound/historical building .mp3',
    '../sound/office .mp3'
];

// Play random sound from sound folder
function playClickSound() {
    // Randomly select a sound file
    const randomIndex = Math.floor(Math.random() * soundFiles.length);
    const soundFile = soundFiles[randomIndex];
    
    // Create or get audio element
    let audio = document.getElementById('clickSound');
    
    if (!audio) {
        // Create audio element if it doesn't exist
        audio = document.createElement('audio');
        audio.id = 'clickSound';
        audio.preload = 'auto';
        document.body.appendChild(audio);
    }
    
    // Update source to the randomly selected file
    audio.src = soundFile;
    
    // Try to play the audio file
    audio.currentTime = 0;
    audio.play().catch(err => {
        console.log('Audio play failed:', err);
        // Fallback to synthetic sound if file doesn't exist
        generateClickSound();
    });
}

// Generate a synthetic click sound using Web Audio API
function generateClickSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Create a short, pleasant click sound
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
        console.log('Web Audio API not supported:', error);
    }
}


// Image viewer functionality
function showImageViewer(imageUrl) {
    const viewer = document.getElementById('imageViewer');
    const viewerImage = document.getElementById('viewerImage');
    const galleryGrid = document.getElementById('galleryGrid');
    const galleryGridDuplicate = document.getElementById('galleryGridDuplicate');
    
    // Set the image source
    viewerImage.src = imageUrl;
    
    // Show viewer and blur background
    viewer.classList.add('active');
    galleryGrid.classList.add('blurred');
    if (galleryGridDuplicate) {
        galleryGridDuplicate.classList.add('blurred');
    }
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeImageViewer() {
    const viewer = document.getElementById('imageViewer');
    const galleryGrid = document.getElementById('galleryGrid');
    const galleryGridDuplicate = document.getElementById('galleryGridDuplicate');
    
    // Hide viewer and remove blur
    viewer.classList.remove('active');
    galleryGrid.classList.remove('blurred');
    if (galleryGridDuplicate) {
        galleryGridDuplicate.classList.remove('blurred');
    }
    
    // Restore body scroll
    document.body.style.overflow = 'hidden';
}

// Initialize image viewer close button
function initImageViewer() {
    const closeBtn = document.getElementById('closeViewer');
    const viewer = document.getElementById('imageViewer');
    
    closeBtn.addEventListener('click', closeImageViewer);
    
    // Close on background click
    viewer.addEventListener('click', (e) => {
        if (e.target === viewer) {
            closeImageViewer();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && viewer.classList.contains('active')) {
            closeImageViewer();
        }
    });
}

// Fullscreen functionality
function initFullscreen() {
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const fullscreenIcon = fullscreenBtn.querySelector('.fullscreen-icon');
    
    // Check if fullscreen is supported
    const isFullscreenSupported = 
        document.fullscreenEnabled || 
        document.webkitFullscreenEnabled || 
        document.mozFullScreenEnabled || 
        document.msFullscreenEnabled;
    
    if (!isFullscreenSupported) {
        fullscreenBtn.style.display = 'none';
        return;
    }
    
    // Toggle fullscreen
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement && 
            !document.webkitFullscreenElement && 
            !document.mozFullScreenElement && 
            !document.msFullscreenElement) {
            // Enter fullscreen
            const element = document.documentElement;
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        } else {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    });
    
    // Update icon based on fullscreen state
    function updateFullscreenIcon() {
        const isFullscreen = 
            document.fullscreenElement || 
            document.webkitFullscreenElement || 
            document.mozFullScreenElement || 
            document.msFullscreenElement;
        
        fullscreenIcon.textContent = isFullscreen ? '⛶' : '⛶';
        fullscreenBtn.title = isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen';
        
        // Recalculate layout when entering/exiting fullscreen - use new viewport height so no bottom gap
        setTimeout(() => {
            const galleryGrid = document.getElementById('galleryGrid');
            if (galleryGrid && updateLayoutFn && images.length > 0) {
                updateLayoutFn();
                // Re-layout all images for current viewport (fullscreen has different height - was causing bottom gap)
                if (layoutImagesRef) {
                    images.forEach((imageData) => { imageData.positioned = false; });
                    layoutImagesRef();
                }
                galleryGrid.offsetHeight; // Force repaint
            }
        }, 400);
    }
    
    // Listen for fullscreen changes
    document.addEventListener('fullscreenchange', updateFullscreenIcon);
    document.addEventListener('webkitfullscreenchange', updateFullscreenIcon);
    document.addEventListener('mozfullscreenchange', updateFullscreenIcon);
    document.addEventListener('MSFullscreenChange', updateFullscreenIcon);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initGallery();
        initFullscreen();
        initImageViewer();
    });
} else {
    initGallery();
    initFullscreen();
    initImageViewer();
}

