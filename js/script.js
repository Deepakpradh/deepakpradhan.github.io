// script.js - Complete fixed version
// ===== GLOBAL VIDEO PLAY FUNCTION =====
function playVideo(videoId) {
    console.log('playVideo called with:', videoId);
    
    // Try VideoJS player first
    if (typeof videojs !== 'undefined') {
        console.log('VideoJS available');
        const player = videojs.getPlayer(videoId);
        if (player) {
            console.log('VideoJS player found:', player);
            player.play().catch(error => {
                console.error('VideoJS play failed:', error);
            });
            return;
        }
    }
    
    // Fallback to native video
    const video = document.getElementById(videoId);
    console.log('Native video element:', video);
    
    if (video && typeof video.play === 'function') {
        video.play().catch(error => {
            console.error('Native video play failed:', error);
        });
        
        // Hide overlay
        const overlay = video.parentElement.querySelector('.video-overlay');
        if (overlay) overlay.style.display = 'none';
    } else {
        console.error('Video element not found or not valid:', videoId);
        console.error('video element:', video);
        console.error('has play method:', video && typeof video.play);
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // ===== NAVBAR SCROLL EFFECT =====
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
    
    // ===== SCROLL REVEAL ANIMATION =====
    const scrollElements = document.querySelectorAll('[data-scroll]');
    const elementInView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        return elementTop <= (window.innerHeight * 0.8);
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el)) {
                displayScrollElement(el);
            }
        });
    };
    
    // Initial check on page load
    handleScrollAnimation();
    window.addEventListener('scroll', handleScrollAnimation);
    
    // ===== VIDEO CHAPTER NAVIGATION =====
    function setupVideoChapters() {
        console.log('Setting up video chapters');
        const chapterMarkers = document.querySelectorAll('.chapter-marker');
        
        chapterMarkers.forEach(marker => {
            marker.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const timeStr = this.getAttribute('data-time');
                if (!timeStr) return;
                
                // Convert mm:ss to seconds
                const parts = timeStr.split(':');
                let seconds = 0;
                
                if (parts.length === 2) {
                    seconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);
                } else if (parts.length === 3) {
                    seconds = parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
                } else {
                    seconds = parseInt(timeStr);
                }
                
                // Find the video
                const videoCard = this.closest('.video-card');
                if (!videoCard) return;
                
                const videoElement = videoCard.querySelector('video');
                if (!videoElement) return;
                
                const videoId = videoElement.id;
                console.log('Chapter navigation to video:', videoId, 'time:', seconds);
                
                // Try VideoJS player first
                if (typeof videojs !== 'undefined') {
                    const player = videojs.getPlayer(videoId);
                    if (player) {
                        player.currentTime(seconds);
                        player.play().catch(e => console.error('VideoJS play error:', e));
                        return;
                    }
                }
                
                // Fallback to native video element
                videoElement.currentTime = seconds;
                videoElement.play().catch(e => console.error('Native video play error:', e));
            });
        });
    }
    
    // ===== VIDEO.JS ENHANCEMENTS =====
    document.addEventListener('DOMContentLoaded', function() {
        const players = document.querySelectorAll('.video-js');
        players.forEach(player => {
            // Add custom controls behavior
            player.addEventListener('play', function() {
                const overlay = this.parentElement.querySelector('.video-overlay');
                if (overlay) overlay.style.display = 'none';
            });
            
            player.addEventListener('pause', function() {
                const overlay = this.parentElement.querySelector('.video-overlay');
                if (overlay) overlay.style.display = 'flex';
            });
        });
    });
    
    // ===== ACTIVE NAV LINK =====
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else if (currentPage === '' && link.getAttribute('href') === 'index.html') {
            link.classList.add('active');
        }
    });
    
    // Initialize everything
    setupVideoChapters();
    console.log('Physics Animations initialized successfully!');
});