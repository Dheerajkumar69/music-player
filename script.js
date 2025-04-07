// Ensure waves are always animating
document.addEventListener('DOMContentLoaded', () => {
    const waves = document.querySelectorAll('.wave1');
    waves.forEach(wave => {
        wave.style.animationPlayState = 'running';
    });
});

// Music Player App - Full Implementation

// Sample track data - in a real app this would come from an API
const tracks = [
    {
        id: 1, 
        title: "Saware",
        artist: "Arijit Singh",
        album: "Phantom",
        duration: 290, // in seconds
        cover: "images/saware.jpg", 
        audio: "audio/saware.mp3"
    },
    {
        id: 2,
        title: "Sanam Teri Kasam",
        artist: "Ankit Tiwari",
        album: "Sanam Teri Kasam",
        duration: 315,
        cover: "images/sanam.jpg",
        audio: "audio/sanam-teri-kasam.mp3"
    },
    {
        id: 3,
        title: "Tere Sang Yaara",
        artist: "Atif Aslam",
        album: "Rustom",
        duration: 278,
        cover: "images/tere-sang.jpg",
        audio: "audio/tere-sang-yaara.mp3"
    },
    {
        id: 4,
        title: "Khairiyat",
        artist: "Arijit Singh",
        album: "Chhichhore",
        duration: 264,
        cover: "images/khairiyat.jpg",
        audio: "audio/khairiyat.mp3"
    },
    {
        id: 5,
        title: "Raabta",
        artist: "Arijit Singh",
        album: "Agent Vinod",
        duration: 230,
        cover: "images/raabta.jpg",
        audio: "audio/raabta.mp3"
    }
];

// Trending and new release albums
const trendingAlbums = [
    { id: 1, title: "After Hours", artist: "The Weeknd", cover: "images/trending1.jpg" },
    { id: 2, title: "Future Nostalgia", artist: "Dua Lipa", cover: "images/trending2.jpg" },
    { id: 3, title: "Chromatica", artist: "Lady Gaga", cover: "images/trending3.jpg" },
    { id: 4, title: "SOUR", artist: "Olivia Rodrigo", cover: "images/trending4.jpg" },
    { id: 5, title: "Planet Her", artist: "Doja Cat", cover: "images/trending5.jpg" }
];

const newReleases = [
    { id: 1, title: "Positions", artist: "Ariana Grande", cover: "images/new1.jpg" },
    { id: 2, title: "Butter", artist: "BTS", cover: "images/new2.jpg" },
    { id: 3, title: "Justice", artist: "Justin Bieber", cover: "images/new3.jpg" },
    { id: 4, title: "Happier Than Ever", artist: "Billie Eilish", cover: "images/new4.jpg" },
    { id: 5, title: "30", artist: "Adele", cover: "images/new5.jpg" }
];

// Main player functionality
document.addEventListener('DOMContentLoaded', () => {
    // Player state
    const playerState = {
        currentTrack: null,
        audioElement: new Audio(),
        isPlaying: false,
        currentTime: 0,
        volume: 0.7,
        isShuffle: false,
        isRepeat: false,
        queue: [...tracks], // Clone the tracks array
        currentTrackIndex: 0,
        // New state properties
        uploadedTracks: [],
        customPlaylists: [],
        likedSongs: [], // Store liked songs
    };

    // Cache DOM elements
    const elements = {
        // Player controls
        playBtn: document.querySelector('.player-controls .play-btn'),
        prevBtn: document.querySelector('.player-controls .bi-skip-start-fill'),
        nextBtn: document.querySelector('.player-controls .bi-skip-end-fill'),
        shuffleBtn: document.querySelector('.player-controls .bi-shuffle'),
        repeatBtn: document.querySelector('.player-controls .bi-repeat'),
        
        // Progress and volume
        progressBar: document.querySelector('.progress'),
        progressCircle: document.querySelector('.progress-circle'),
        progressContainer: document.querySelector('.progress-bar'),
        currentTimeEl: document.querySelector('.current-time'),
        totalTimeEl: document.querySelector('.total-time'),
        volumeBar: document.querySelector('.volume'),
        volumeCircle: document.querySelector('.volume-circle'),
        volumeContainer: document.querySelector('.volume-bar'),
        volumeIcon: document.querySelector('.player-right .bi-volume-up'),
        
        // Current track info
        nowPlayingImg: document.querySelector('.now-playing-img'),
        nowPlayingTitle: document.querySelector('.now-playing-info h5'),
        nowPlayingArtist: document.querySelector('.now-playing-info p'),
        heartIcon: document.querySelector('.player-left .bi-heart'),
        
        // Lists
        songItems: document.querySelectorAll('.song-item'),
        tabItems: document.querySelectorAll('.tab'),
        
        // Cards
        trendingCards: document.querySelectorAll('.feed-section:nth-child(1) .card'),
        newReleaseCards: document.querySelectorAll('.feed-section:nth-child(2) .card'),
        cardPlayBtns: document.querySelectorAll('.card-play'),
        
        // Featured album
        featuredPlayBtn: document.querySelector('.featured-album .play-btn'),
        featuredFollowBtn: document.querySelector('.featured-album .follow-btn'),
        
        // Sidebar elements
        menuItems: document.querySelectorAll('.menu-item'),
        sidebarToggle: document.querySelector('.sidebar-toggle'),
        sidebar: document.querySelector('.sidebar'),
        
        // Search
        searchInput: document.querySelector('.search-bar input'),
        
        // Tab navigation
        contentPages: document.querySelectorAll('.page'),
        
        // Upload page elements
        fileUploadInput: document.getElementById('file-upload'),
        uploadArea: document.querySelector('.upload-area'),
        uploadItemsList: document.getElementById('upload-items'),
        
        // Playlist page elements
        playlistNameInput: document.getElementById('playlist-name'),
        playlistDescInput: document.getElementById('playlist-description'),
        playlistCoverInput: document.getElementById('playlist-cover'),
        coverPreview: document.getElementById('cover-preview'),
        createPlaylistBtn: document.getElementById('create-playlist'),
        selectableSongs: document.querySelector('.selectable-songs'),
        selectedSongsList: document.getElementById('selected-songs-list'),
        songSearch: document.getElementById('song-search'),
        playlistsGrid: document.querySelector('.playlists-grid'),
        customPlaylistsList: document.querySelector('.playlist-list'),
    };

    // Storage management utilities
    const storageManager = {
        // Check available storage space
        checkStorageQuota: async function() {
            if (navigator.storage && navigator.storage.estimate) {
                try {
                    const estimate = await navigator.storage.estimate();
                    const usedPercentage = Math.round((estimate.usage / estimate.quota) * 100);
                    
                    if (usedPercentage > 80) {
                        showToast(`Warning: Your browser storage is ${usedPercentage}% full. You may need to remove some items.`, 'warning');
                    }
                    
                    return {
                        usedBytes: estimate.usage,
                        totalBytes: estimate.quota,
                        usedPercentage
                    };
                } catch (e) {
                    console.error('Error checking storage quota:', e);
                    return null;
                }
            }
            return null;
        },
        
        // Clear all stored data
        clearStorage: function() {
            if (confirm('Are you sure you want to clear all locally stored music and playlists? This cannot be undone.')) {
                // Clear localStorage
                localStorage.removeItem('musicPlayerData');
                
                // Clear uploaded tracks and revoke URLs
                playerState.uploadedTracks.forEach(track => {
                    if (track.audio) {
                        URL.revokeObjectURL(track.audio);
                    }
                });
                
                // Reset state
                playerState.uploadedTracks = [];
                playerState.customPlaylists = [];
                
                // Clear UI
                elements.uploadItemsList.innerHTML = '';
                elements.customPlaylistsList.innerHTML = '';
                elements.playlistsGrid.innerHTML = '';
                
                // Update UI
                updateSelectableSongs();
                
                showToast('All locally stored music and playlists have been cleared', 'info');
            }
        },
        
        // Get total stored data size
        getStoredDataSize: function() {
            const data = localStorage.getItem('musicPlayerData');
            if (!data) return 0;
            
            // Approximate size in bytes (2 bytes per character for UTF-16)
            return data.length * 2;
        }
    };

    // Initialize the player
    function initPlayer() {
        // Set initial volume
        playerState.audioElement.volume = playerState.volume;
        elements.volumeBar.style.width = `${playerState.volume * 100}%`;
        elements.volumeCircle.style.left = `${playerState.volume * 100}%`;
        
        // Set up the first track
        loadTrack(0);
        
        // Update total time display
        updateTotalTimeDisplay();
        
        // Add mobile sidebar toggle if it exists
        if (elements.sidebarToggle) {
            elements.sidebarToggle.addEventListener('click', toggleSidebar);
        }
        
        // Set up event listeners for song items
        setupPlaylistItems();
        
        // Set up event listeners for trending and new release cards
        setupCardItems();
    }

    // Load a track by index
    function loadTrack(index) {
        if (index < 0) index = playerState.queue.length - 1;
        if (index >= playerState.queue.length) index = 0;
        
        playerState.currentTrackIndex = index;
        playerState.currentTrack = playerState.queue[index];
        
        // Update the audio source
        playerState.audioElement.src = playerState.currentTrack.audio;
        
        // Update the player UI
        elements.nowPlayingImg.src = playerState.currentTrack.cover;
        elements.nowPlayingTitle.textContent = playerState.currentTrack.title;
        elements.nowPlayingArtist.textContent = playerState.currentTrack.artist;
        
        // Update the total time display
        updateTotalTimeDisplay();
        
        // Highlight the current track in the playlist
        updatePlaylistHighlight();
        
        // Update heart icon to show if the track is liked
        updateHeartIcon();
    }

    // Update heart icon based on whether the current track is liked
    function updateHeartIcon() {
        if (!playerState.currentTrack) return;
        
        // Check if current track is in liked songs
        const isLiked = playerState.likedSongs.some(track => 
            track.id === playerState.currentTrack.id
        );
        
        if (isLiked) {
            elements.heartIcon.classList.remove('bi-heart');
            elements.heartIcon.classList.add('bi-heart-fill');
            elements.heartIcon.style.color = '#e25d5d';
        } else {
            elements.heartIcon.classList.remove('bi-heart-fill');
            elements.heartIcon.classList.add('bi-heart');
            elements.heartIcon.style.color = '';
        }
    }

    // Play or pause the current track
    function togglePlay() {
        if (playerState.isPlaying) {
            playerState.audioElement.pause();
            elements.playBtn.classList.remove('bi-pause-circle-fill');
            elements.playBtn.classList.add('bi-play-circle-fill');
        } else {
            playerState.audioElement.play().catch(e => {
                console.error('Error playing audio:', e);
                // If there's an error, we might need to show a message to the user
                alert('Please add audio files to the audio folder to enable playback');
            });
            elements.playBtn.classList.remove('bi-play-circle-fill');
            elements.playBtn.classList.add('bi-pause-circle-fill');
        }
        
        playerState.isPlaying = !playerState.isPlaying;
    }

    // Format time from seconds to MM:SS
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' + secs : secs}`;
    }

    // Update the total time display
    function updateTotalTimeDisplay() {
        if (playerState.currentTrack) {
            elements.totalTimeEl.textContent = formatTime(playerState.currentTrack.duration);
        }
    }

    // Update the current time display and progress bar
    function updateTimeDisplay() {
        const currentTime = playerState.audioElement.currentTime;
        elements.currentTimeEl.textContent = formatTime(currentTime);
        
        const duration = playerState.currentTrack ? playerState.currentTrack.duration : 0;
        const progressPercent = (currentTime / duration) * 100;
        
        elements.progressBar.style.width = `${progressPercent}%`;
        elements.progressCircle.style.left = `${progressPercent}%`;
    }

    // Update which track is highlighted in the playlist
    function updatePlaylistHighlight() {
        elements.songItems.forEach((item, index) => {
            if (index === playerState.currentTrackIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Play next track
    function playNext() {
        if (playerState.isShuffle) {
            // Play a random track if shuffle is on
            const nextIndex = Math.floor(Math.random() * playerState.queue.length);
            loadTrack(nextIndex);
        } else {
            // Play the next track in order
            loadTrack(playerState.currentTrackIndex + 1);
        }
        
        // Start playing if it wasn't already
        if (!playerState.isPlaying) {
            togglePlay();
        } else {
            playerState.audioElement.play().catch(e => console.error('Error playing next track:', e));
        }
    }

    // Play previous track
    function playPrev() {
        loadTrack(playerState.currentTrackIndex - 1);
        
        // Start playing if it wasn't already
        if (!playerState.isPlaying) {
            togglePlay();
        } else {
            playerState.audioElement.play().catch(e => console.error('Error playing previous track:', e));
        }
    }

    // Toggle shuffle mode
    function toggleShuffle() {
        playerState.isShuffle = !playerState.isShuffle;
        
        if (playerState.isShuffle) {
            elements.shuffleBtn.style.color = 'var(--accent-color)';
        } else {
            elements.shuffleBtn.style.color = '';
        }
    }

    // Toggle repeat mode
    function toggleRepeat() {
        playerState.isRepeat = !playerState.isRepeat;
        
        if (playerState.isRepeat) {
            elements.repeatBtn.style.color = 'var(--accent-color)';
        } else {
            elements.repeatBtn.style.color = '';
        }
    }

    // Set up playlist items click handlers
    function setupPlaylistItems() {
        elements.songItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                // Load and play the clicked track
                loadTrack(index);
                togglePlay();
            });
        });
    }

    // Set up card items click handlers
    function setupCardItems() {
        // Trending cards
        elements.trendingCards.forEach((card, index) => {
            card.addEventListener('click', function() {
                alert(`Playing album: ${trendingAlbums[index].title} by ${trendingAlbums[index].artist}`);
            });
        });
        
        // New release cards
        elements.newReleaseCards.forEach((card, index) => {
            card.addEventListener('click', function() {
                alert(`Playing album: ${newReleases[index].title} by ${newReleases[index].artist}`);
            });
        });
        
        // All card play buttons
        elements.cardPlayBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const card = this.closest('.card');
                const cardTitle = card.querySelector('h4').textContent;
                const cardArtist = card.querySelector('p').textContent;
                
                alert(`Playing album: ${cardTitle} by ${cardArtist}`);
            });
        });
    }

    // Toggle mobile sidebar visibility
    function toggleSidebar() {
        elements.sidebar.classList.toggle('show-sidebar');
        document.querySelector('.sidebar-overlay').classList.toggle('show-overlay');
    }

    // Set up event listeners for audio element
    function setupAudioEventListeners() {
        // Update time display while playing
        playerState.audioElement.addEventListener('timeupdate', updateTimeDisplay);
        
        // When track ends
        playerState.audioElement.addEventListener('ended', function() {
            if (playerState.isRepeat) {
                // If repeat is on, play the same track again
                playerState.audioElement.currentTime = 0;
                playerState.audioElement.play();
            } else {
                // Otherwise play the next track
                playNext();
            }
        });
    }

    // Set up event listeners for player controls
    function setupPlayerControls() {
        // Play/Pause button
        elements.playBtn.addEventListener('click', togglePlay);
        
        // Next button
        elements.nextBtn.addEventListener('click', playNext);
        
        // Previous button
        elements.prevBtn.addEventListener('click', playPrev);
        
        // Shuffle button
        elements.shuffleBtn.addEventListener('click', toggleShuffle);
        
        // Repeat button
        elements.repeatBtn.addEventListener('click', toggleRepeat);
        
        // Featured album play button
        if (elements.featuredPlayBtn) {
            elements.featuredPlayBtn.addEventListener('click', function() {
                alert('Playing featured album: The Weeknd - Starboy');
            });
        }
        
        // Featured album follow button
        if (elements.featuredFollowBtn) {
            elements.featuredFollowBtn.addEventListener('click', function() {
                if (this.textContent === 'Follow') {
                    this.textContent = 'Following';
                    this.style.backgroundColor = 'var(--accent-color)';
                    this.style.color = 'var(--background-dark)';
                    this.style.border = 'none';
                } else {
                    this.textContent = 'Follow';
                    this.style.backgroundColor = 'transparent';
                    this.style.color = 'var(--text-white)';
                    this.style.border = '2px solid var(--text-white)';
                }
            });
        }
        
        // Progress bar hover effects
        elements.progressContainer.addEventListener('mouseenter', function(e) {
            if (playerState.currentTrack) {
                const rect = this.getBoundingClientRect();
                const offsetX = e.clientX - rect.left;
                const percentage = offsetX / this.clientWidth * 100;
                elements.progressCircle.style.left = `${percentage}%`;
                elements.progressCircle.style.opacity = '1';
            }
        });
        
        elements.progressContainer.addEventListener('mousemove', function(e) {
            if (playerState.currentTrack) {
                const rect = this.getBoundingClientRect();
                const offsetX = e.clientX - rect.left;
                const percentage = offsetX / this.clientWidth * 100;
                elements.progressCircle.style.left = `${percentage}%`;
            }
        });
        
        elements.progressContainer.addEventListener('mouseleave', function() {
            if (!playerState.isPlaying) {
                elements.progressCircle.style.opacity = '0';
            }
        });
        
        // Progress bar click and drag
        elements.progressContainer.addEventListener('mousedown', function(e) {
            e.preventDefault(); // Prevent text selection during drag
            
            // Start tracking mouse movement for dragging
            const handleDrag = function(e) {
                const width = elements.progressContainer.clientWidth;
                const clickX = Math.min(Math.max(0, e.clientX - elements.progressContainer.getBoundingClientRect().left), width);
                const duration = playerState.currentTrack.duration;
                const percentage = clickX / width;
                
                // Update UI
                elements.progressBar.style.width = `${percentage * 100}%`;
                elements.progressCircle.style.left = `${percentage * 100}%`;
                
                // Update time display
                const newTime = duration * percentage;
                elements.currentTimeEl.textContent = formatTime(newTime);
                
                // Show the progress circle
                elements.progressCircle.style.opacity = '1';
            };
            
            // Handle mouse move
            document.addEventListener('mousemove', handleDrag);
            
            // Handle mouse up - stop dragging and set the position
            document.addEventListener('mouseup', function finalizeSeek(e) {
                document.removeEventListener('mousemove', handleDrag);
                document.removeEventListener('mouseup', finalizeSeek);
                
                const width = elements.progressContainer.clientWidth;
                const clickX = Math.min(Math.max(0, e.clientX - elements.progressContainer.getBoundingClientRect().left), width);
                const duration = playerState.currentTrack.duration;
                
                // Set the new time
                playerState.audioElement.currentTime = (clickX / width) * duration;
                
                // If we're not playing but dragged the slider, show the circle temporarily
                if (!playerState.isPlaying) {
                    elements.progressCircle.style.opacity = '1';
                    setTimeout(() => {
                        elements.progressCircle.style.opacity = '0';
                    }, 1500);
                }
            });
            
            // Call the handler once to update immediately on click
            handleDrag(e);
        });
        
        // Volume bar hover effects
        elements.volumeContainer.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const percentage = offsetX / this.clientWidth * 100;
            elements.volumeCircle.style.left = `${percentage}%`;
            elements.volumeCircle.style.opacity = '1';
        });
        
        elements.volumeContainer.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const percentage = offsetX / this.clientWidth * 100;
            elements.volumeCircle.style.left = `${percentage}%`;
        });
        
        elements.volumeContainer.addEventListener('mouseleave', function() {
            elements.volumeCircle.style.opacity = '0';
        });
        
        // Volume bar click and drag
        elements.volumeContainer.addEventListener('mousedown', function(e) {
            e.preventDefault(); // Prevent text selection during drag
            
            // Start tracking mouse movement for dragging
            const handleDrag = function(e) {
                const width = elements.volumeContainer.clientWidth;
                const clickX = Math.min(Math.max(0, e.clientX - elements.volumeContainer.getBoundingClientRect().left), width);
                const volumeLevel = clickX / width;
                
                // Update UI
                elements.volumeBar.style.width = `${volumeLevel * 100}%`;
                elements.volumeCircle.style.left = `${volumeLevel * 100}%`;
                
                // Show the volume circle
                elements.volumeCircle.style.opacity = '1';
                
                // Update player state and volume
                playerState.volume = volumeLevel;
                playerState.audioElement.volume = volumeLevel;
                
                // Update volume icon based on level
                updateVolumeIcon(volumeLevel);
            };
            
            // Handle mouse move
            document.addEventListener('mousemove', handleDrag);
            
            // Handle mouse up - stop dragging
            document.addEventListener('mouseup', function finalizeVolume(e) {
                document.removeEventListener('mousemove', handleDrag);
                document.removeEventListener('mouseup', finalizeVolume);
                
                // Keep the circle visible for a moment when done
                setTimeout(() => {
                    if (!elements.volumeContainer.matches(':hover')) {
                        elements.volumeCircle.style.opacity = '0';
                    }
                }, 1000);
            });
            
            // Call the handler once to update immediately on click
            handleDrag(e);
        });
        
        // Volume icon click (mute/unmute)
        elements.volumeIcon.addEventListener('click', function() {
            if (playerState.audioElement.volume > 0) {
                // Store the current volume to restore later
                playerState.lastVolume = playerState.audioElement.volume;
                playerState.audioElement.volume = 0;
                elements.volumeBar.style.width = '0%';
                elements.volumeCircle.style.left = '0%';
                elements.volumeIcon.classList.remove('bi-volume-up', 'bi-volume-down');
                elements.volumeIcon.classList.add('bi-volume-mute');
            } else {
                // Restore the previous volume
                playerState.audioElement.volume = playerState.lastVolume || 0.7;
                playerState.volume = playerState.lastVolume || 0.7;
                elements.volumeBar.style.width = `${playerState.volume * 100}%`;
                elements.volumeCircle.style.left = `${playerState.volume * 100}%`;
                elements.volumeIcon.classList.remove('bi-volume-mute');
                if (playerState.volume < 0.5) {
                    elements.volumeIcon.classList.add('bi-volume-down');
                } else {
                    elements.volumeIcon.classList.add('bi-volume-up');
                }
            }
        });
        
        // Heart icon (favorite)
        elements.heartIcon.addEventListener('click', function() {
            if (!playerState.currentTrack) return;
            
            // Update heart icon UI
            if (this.classList.contains('bi-heart')) {
                this.classList.remove('bi-heart');
                this.classList.add('bi-heart-fill');
                this.style.color = '#e25d5d';
            } else {
                this.classList.remove('bi-heart-fill');
                this.classList.add('bi-heart');
                this.style.color = '';
            }
            
            // Add/remove track from liked songs
            toggleLiked(playerState.currentTrack);
        });
        
        // Tab navigation
        elements.tabItems.forEach((tab, index) => {
            tab.addEventListener('click', function() {
                showTab(index);
            });
        });
        
        // Menu items
        elements.menuItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                // Update active state
                elements.menuItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                // Get the menu item text to determine which content to show
                const menuText = this.querySelector('span').textContent.trim();
                console.log(`Sidebar item clicked: ${menuText}`); // Debug
                
                // Use the mapping to find the correct tab to show
                if (window.sidebarToTabMap && window.sidebarToTabMap[menuText] !== undefined) {
                    const tabIndex = window.sidebarToTabMap[menuText];
                    console.log(`Found tab index for ${menuText}: ${tabIndex}`); // Debug
                    
                    if (tabIndex !== -1) {
                        // Directly set active classes on tabs and content pages
                        elements.tabItems.forEach((t, i) => {
                            t.classList.toggle('active', i === tabIndex);
                        });
                        
                        elements.contentPages.forEach((p, i) => {
                            p.classList.toggle('active', i === tabIndex);
                        });
                    }
                } else {
                    console.warn(`No mapping found for sidebar item: ${menuText}`); // Debug
                    
                    // Fallback to old mapping if something went wrong
                    let tabIndex = -1;
                    
                    switch (menuText) {
                        case 'Playlist':
                            tabIndex = 0; // Discover tab
                            break;
                        case 'Last Played':
                            tabIndex = 1; // My Library tab
                            break;
                        case 'Recommended':
                            tabIndex = 2; // Radio tab
                            break;
                        case 'My Uploads':
                            tabIndex = 3; // Upload tab
                            break;
                        case 'My Playlists':
                            tabIndex = 4; // Playlists tab
                            break;
                    }
                    
                    if (tabIndex !== -1) {
                        // Directly set active classes on tabs and content pages
                        elements.tabItems.forEach((t, i) => {
                            t.classList.toggle('active', i === tabIndex);
                        });
                        
                        elements.contentPages.forEach((p, i) => {
                            p.classList.toggle('active', i === tabIndex);
                        });
                    }
                }
                
                // Close sidebar on mobile
                if (window.innerWidth <= 768) {
                    toggleSidebar();
                }
            });
        });
        
        // Helper function to show a specific tab
        function showTab(tabIndex, fromSidebar = false) {
            // Validate the index
            if (tabIndex < 0 || tabIndex >= elements.tabItems.length || 
                tabIndex >= elements.contentPages.length) {
                console.error('Invalid tab index:', tabIndex);
                return;
            }
            
            console.log(`Showing tab: ${tabIndex} (fromSidebar: ${fromSidebar})`); // Debug
            
            // Update tab UI - always update the top tabs to reflect current view
            elements.tabItems.forEach((t, i) => {
                if (i === tabIndex) {
                    t.classList.add('active');
                } else {
                    t.classList.remove('active');
                }
            });
            
            // Update content pages
            elements.contentPages.forEach((p, i) => {
                if (i === tabIndex) {
                    p.classList.add('active');
                } else {
                    p.classList.remove('active');
                }
            });
            
            // If coming from sidebar, we don't need to update sidebar
            // If coming from top tabs, update sidebar to match the selected tab
            if (!fromSidebar && window.sidebarToTabMap) {
                // Find the sidebar item that corresponds to this tab
                let sidebarItemName = null;
                Object.entries(window.sidebarToTabMap).forEach(([name, index]) => {
                    if (index === tabIndex) {
                        sidebarItemName = name;
                    }
                });
                
                if (sidebarItemName) {
                    elements.menuItems.forEach(item => {
                        const itemText = item.querySelector('span').textContent.trim();
                        if (itemText === sidebarItemName) {
                            elements.menuItems.forEach(i => i.classList.remove('active'));
                            item.classList.add('active');
                        }
                    });
                }
            }
        }
        
        // Search functionality
        if (elements.searchInput) {
            elements.searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                
                // Simple search functionality for demo purposes
                if (searchTerm.length > 2) {
                    const results = tracks.filter(
                        track => track.title.toLowerCase().includes(searchTerm) || 
                               track.artist.toLowerCase().includes(searchTerm)
                    );
                    
                    if (results.length > 0) {
                        console.log('Search results:', results);
                        // In a real app, you'd display these results in the UI
                    }
                }
            });
        }
    }

    // Update volume icon based on volume level
    function updateVolumeIcon(level) {
        if (level === 0) {
            elements.volumeIcon.classList.remove('bi-volume-up', 'bi-volume-down');
            elements.volumeIcon.classList.add('bi-volume-mute');
        } else if (level < 0.5) {
            elements.volumeIcon.classList.remove('bi-volume-up', 'bi-volume-mute');
            elements.volumeIcon.classList.add('bi-volume-down');
        } else {
            elements.volumeIcon.classList.remove('bi-volume-down', 'bi-volume-mute');
            elements.volumeIcon.classList.add('bi-volume-up');
        }
    }

    // Handle keyboard controls for the player
    function setupKeyboardControls() {
        document.addEventListener('keydown', function(e) {
            // Space bar: Play/Pause
            if (e.code === 'Space' && !isInputFocused()) {
                e.preventDefault();
                togglePlay();
            }
            
            // Right arrow: Next track
            if (e.code === 'ArrowRight' && !isInputFocused()) {
                playNext();
            }
            
            // Left arrow: Previous track
            if (e.code === 'ArrowLeft' && !isInputFocused()) {
                playPrev();
            }
            
            // M key: Mute/Unmute
            if (e.code === 'KeyM' && !isInputFocused()) {
                elements.volumeIcon.click();
            }
        });
    }

    // Helper to check if an input element is focused
    function isInputFocused() {
        const activeElement = document.activeElement;
        return activeElement.tagName === 'INPUT' || 
               activeElement.tagName === 'TEXTAREA' || 
               activeElement.isContentEditable;
    }

    // Add responsive mobile features
    function addMobileFeatures() {
        // Add sidebar toggle button for mobile if it doesn't exist
        if (!elements.sidebarToggle && window.innerWidth <= 768) {
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'sidebar-toggle';
            toggleBtn.innerHTML = '<i class="bi bi-list"></i>';
            document.querySelector('.top-nav').prepend(toggleBtn);
            
            elements.sidebarToggle = toggleBtn;
            elements.sidebarToggle.addEventListener('click', toggleSidebar);
            
            // Update sidebar for mobile
            elements.sidebar.classList.add('mobile-sidebar');
        }
        
        // Add overlay click event to close sidebar
        const overlay = document.querySelector('.sidebar-overlay');
        if (overlay) {
            overlay.addEventListener('click', toggleSidebar);
        }
        
        // Handle window resize for responsive layout
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 768) {
                if (!elements.sidebarToggle) {
                    addMobileFeatures();
                }
            }
        });
    }

    // New function: Initialize UI tabs
    function initTabs() {
        // Get tab names for better mapping
        const tabNames = Array.from(elements.tabItems).map(tab => tab.textContent.trim());
        console.log('Tab names:', tabNames); // Debug
        
        // Properly map sidebar items to top tabs
        const sidebarToTabMap = {
            'Playlist': tabNames.indexOf('Discover'),
            'Last Played': tabNames.indexOf('My Library'),
            'Recommended': tabNames.indexOf('Radio'),
            'My Uploads': tabNames.indexOf('Upload'),
            'My Playlists': tabNames.indexOf('Playlists')
        };
        
        console.log('Sidebar to tab map:', sidebarToTabMap); // Debug
        
        // Add global mapping for use in other functions
        window.sidebarToTabMap = sidebarToTabMap;
        
        // Setup tab click handlers
        elements.tabItems.forEach((tab, index) => {
            tab.addEventListener('click', function() {
                console.log(`Tab clicked: ${tab.textContent.trim()} (index: ${index})`); // Debug
                
                // Update tab UI
                elements.tabItems.forEach((t, i) => {
                    if (i === index) {
                        t.classList.add('active');
                    } else {
                        t.classList.remove('active');
                    }
                });
                
                // Update content pages
                elements.contentPages.forEach((p, i) => {
                    if (i === index) {
                        p.classList.add('active');
                    } else {
                        p.classList.remove('active');
                    }
                });
                
                // Update sidebar selection to match
                const tabName = tab.textContent.trim();
                let sidebarItemToActivate = null;
                
                // Find corresponding sidebar item
                Object.entries(sidebarToTabMap).forEach(([sidebarName, tabIndex]) => {
                    if (tabIndex === index) {
                        sidebarItemToActivate = sidebarName;
                    }
                });
                
                // Update sidebar selection if we found a match
                if (sidebarItemToActivate) {
                    elements.menuItems.forEach(item => {
                        const itemName = item.querySelector('span').textContent.trim();
                        if (itemName === sidebarItemToActivate) {
                            elements.menuItems.forEach(i => i.classList.remove('active'));
                            item.classList.add('active');
                        }
                    });
                }
            });
        });
        
        // Ensure the initial state matches - find the active tab
        const activeTabIndex = Array.from(elements.tabItems).findIndex(tab => tab.classList.contains('active'));
        if (activeTabIndex !== -1) {
            // Make sure the corresponding content page is shown
            elements.contentPages.forEach((p, i) => {
                if (i === activeTabIndex) {
                    p.classList.add('active');
                } else {
                    p.classList.remove('active');
                }
            });
        } else {
            // Default to first tab if none is active
            if (elements.tabItems.length > 0) {
                elements.tabItems[0].classList.add('active');
            }
            if (elements.contentPages.length > 0) {
                elements.contentPages[0].classList.add('active');
            }
        }
    }

    // New function: Handle file uploads
    function initFileUpload() {
        // Setup file input change event
        elements.fileUploadInput.addEventListener('change', function(e) {
            handleFiles(this.files);
        });
        
        // Setup drag and drop
        elements.uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.add('dragging');
        });
        
        elements.uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.remove('dragging');
        });
        
        elements.uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.remove('dragging');
            
            if (e.dataTransfer.files.length) {
                handleFiles(e.dataTransfer.files);
            }
        });
    }
    
    // Process uploaded files
    function handleFiles(files) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('audio/')) {
                uploadFile(file);
            } else {
                showToast('Only audio files are supported', 'error');
            }
        });
    }
    
    // Upload file and process it
    function uploadFile(file) {
        // Create a unique ID for the track
        const trackId = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        
        // Create a URL for the audio file
        const audioUrl = URL.createObjectURL(file);
        
        // Extract file info
        const fileName = file.name;
        const fileNameWithoutExt = fileName.split('.').slice(0, -1).join('.');
        
        // Try to extract artist and title from filename (format: Artist - Title.mp3)
        let artist = 'Unknown Artist';
        let title = fileNameWithoutExt;
        
        if (fileNameWithoutExt.includes(' - ')) {
            const parts = fileNameWithoutExt.split(' - ');
            artist = parts[0];
            title = parts.slice(1).join(' - ');
        }
        
        // Add loading placeholder first
        const newTrack = {
            id: trackId,
            title: title,
            artist: artist,
            album: 'My Uploads',
            duration: 0, // Will be updated after loading
            cover: 'default', // Will use default icon
            audio: audioUrl,
            fileName: fileName,
            fileType: file.type,
            fileSize: file.size,
            dateAdded: new Date().toISOString()
        };
        
        // Add loading placeholder
        addUploadItem(newTrack, true);
        
        // Convert file to base64 for storage
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Get base64 data
            const base64Audio = e.target.result;
            
            // Store base64 data to track object for persistence
            newTrack.audioData = base64Audio;
            
            // Load the audio to get its duration
            const tempAudio = new Audio(audioUrl);
            tempAudio.addEventListener('loadedmetadata', function() {
                newTrack.duration = tempAudio.duration;
                
                // Add to uploaded tracks
                playerState.uploadedTracks.push(newTrack);
                
                // Update the UI (replace the loading placeholder)
                addUploadItem(newTrack, false);
                
                // Update all songs list for playlist creation
                updateSelectableSongs();
                
                // Save to localStorage
                saveToLocalStorage();
                
                showToast(`"${newTrack.title}" added to your library`, 'success');
            });
            
            tempAudio.addEventListener('error', function() {
                showToast('Error loading audio file', 'error');
                
                // Remove the loading placeholder
                const loadingItem = document.querySelector(`.upload-item[data-id="${trackId}"]`);
                if (loadingItem) {
                    loadingItem.remove();
                }
            });
        };
        
        reader.onerror = function() {
            showToast('Error reading audio file', 'error');
            
            // Remove the loading placeholder
            const loadingItem = document.querySelector(`.upload-item[data-id="${trackId}"]`);
            if (loadingItem) {
                loadingItem.remove();
            }
        };
        
        // Start reading the file as data URL (base64)
        reader.readAsDataURL(file);
    }
    
    // Add upload item to the list
    function addUploadItem(track, isLoading) {
        // Remove existing item with same ID if it exists
        const existingItem = document.querySelector(`.upload-item[data-id="${track.id}"]`);
        if (existingItem) {
            existingItem.remove();
        }
        
        const item = document.createElement('div');
        item.className = 'upload-item' + (isLoading ? ' uploading' : '');
        item.setAttribute('data-id', track.id);
        
        // Create HTML content
        if (isLoading) {
            item.innerHTML = `
                <div class="upload-item-img">
                    <i class="bi bi-music-note"></i>
                </div>
                <div class="upload-item-info">
                    <h4>${track.title}</h4>
                    <p>${track.artist}</p>
                    <div class="upload-progress">
                        <div class="upload-progress-bar" style="width: 70%"></div>
                    </div>
                </div>
            `;
        } else {
            item.innerHTML = `
                <div class="upload-item-img">
                    <i class="bi bi-music-note"></i>
                </div>
                <div class="upload-item-info">
                    <h4>${track.title}</h4>
                    <p>${track.artist} • ${formatTime(track.duration)}</p>
                </div>
                <div class="upload-item-actions">
                    <button class="play-btn" title="Play"><i class="bi bi-play-fill"></i></button>
                    <button class="edit-btn" title="Edit details"><i class="bi bi-pencil"></i></button>
                    <button class="delete-btn" title="Delete"><i class="bi bi-trash"></i></button>
                </div>
            `;
            
            // Add event listeners for buttons
            setTimeout(() => {
                const playBtn = item.querySelector('.play-btn');
                const editBtn = item.querySelector('.edit-btn');
                const deleteBtn = item.querySelector('.delete-btn');
                
                playBtn.addEventListener('click', () => {
                    playUploadedTrack(track);
                });
                
                editBtn.addEventListener('click', () => {
                    editTrackDetails(track);
                });
                
                deleteBtn.addEventListener('click', () => {
                    deleteUploadedTrack(track);
                });
            }, 0);
        }
        
        elements.uploadItemsList.appendChild(item);
    }
    
    // Play an uploaded track
    function playUploadedTrack(track) {
        // Stop current playback
        playerState.audioElement.pause();
        
        // Update player state
        playerState.currentTrack = track;
        playerState.audioElement.src = track.audio;
        
        // Update UI
        elements.nowPlayingImg.src = track.cover !== 'default' ? 
            track.cover : 'images/music-placeholder.jpg';
        elements.nowPlayingTitle.textContent = track.title;
        elements.nowPlayingArtist.textContent = track.artist;
        
        // Update heart icon
        updateHeartIcon();
        
        // Start playing
        playerState.audioElement.play();
        playerState.isPlaying = true;
        elements.playBtn.classList.remove('bi-play-circle-fill');
        elements.playBtn.classList.add('bi-pause-circle-fill');
        
        // Update time display
        updateTotalTimeDisplay();
    }
    
    // Edit track details
    function editTrackDetails(track) {
        // Simple prompt-based editing for now
        const newTitle = prompt('Enter track title:', track.title);
        if (newTitle !== null && newTitle.trim() !== '') {
            track.title = newTitle.trim();
        }
        
        const newArtist = prompt('Enter artist name:', track.artist);
        if (newArtist !== null && newArtist.trim() !== '') {
            track.artist = newArtist.trim();
        }
        
        // Update UI
        const item = document.querySelector(`.upload-item[data-id="${track.id}"]`);
        if (item) {
            item.querySelector('h4').textContent = track.title;
            item.querySelector('p').textContent = `${track.artist} • ${formatTime(track.duration)}`;
        }
        
        // Update selectable songs list for playlists
        updateSelectableSongs();
        
        // Save changes to localStorage
        saveToLocalStorage();
        
        showToast('Track details updated', 'success');
    }
    
    // Delete an uploaded track
    function deleteUploadedTrack(track) {
        if (confirm(`Are you sure you want to delete "${track.title}"?`)) {
            // Remove from uploads list
            playerState.uploadedTracks = playerState.uploadedTracks.filter(t => t.id !== track.id);
            
            // Remove from UI
            const item = document.querySelector(`.upload-item[data-id="${track.id}"]`);
            if (item) {
                item.remove();
            }
            
            // Update selectable songs list for playlists
            updateSelectableSongs();
            
            // If currently playing, stop playback
            if (playerState.currentTrack && playerState.currentTrack.id === track.id) {
                playerState.audioElement.pause();
                playerState.isPlaying = false;
                elements.playBtn.classList.remove('bi-pause-circle-fill');
                elements.playBtn.classList.add('bi-play-circle-fill');
            }
            
            // Revoke object URL to free memory
            URL.revokeObjectURL(track.audio);
            
            // Save changes to localStorage
            saveToLocalStorage();
            
            showToast(`"${track.title}" has been deleted`, 'success');
        }
    }
    
    // Initialize playlist creator
    function initPlaylistCreator() {
        // Update selectable songs list
        updateSelectableSongs();
        
        // Handle playlist cover upload
        elements.playlistCoverInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    elements.coverPreview.innerHTML = `<img src="${e.target.result}" alt="Playlist Cover">`;
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
        
        // Handle song search
        elements.songSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const songs = elements.selectableSongs.querySelectorAll('.selectable-song');
            
            songs.forEach(song => {
                const title = song.querySelector('h4').textContent.toLowerCase();
                const artist = song.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || artist.includes(searchTerm)) {
                    song.style.display = '';
                } else {
                    song.style.display = 'none';
                }
            });
        });
        
        // Handle create playlist button
        elements.createPlaylistBtn.addEventListener('click', createPlaylist);
    }
    
    // Update the selectable songs list
    function updateSelectableSongs() {
        // Clear the container
        elements.selectableSongs.innerHTML = '';
        
        // Combine built-in tracks and uploaded tracks
        const allTracks = [...tracks, ...playerState.uploadedTracks];
        
        // Create a song item for each track
        allTracks.forEach(track => {
            const songItem = document.createElement('div');
            songItem.className = 'selectable-song';
            songItem.setAttribute('data-id', track.id);
            
            // Cover image
            const coverSrc = track.cover === 'default' ? 
                'images/music-placeholder.jpg' : track.cover;
            
            songItem.innerHTML = `
                <img src="${coverSrc}" alt="${track.title}">
                <div class="selectable-song-info">
                    <h4>${track.title}</h4>
                    <p>${track.artist}</p>
                </div>
                <i class="bi bi-plus-circle add-remove-btn"></i>
            `;
            
            // Add event listener to select/deselect
            songItem.addEventListener('click', function() {
                const isSelected = this.classList.toggle('selected');
                const icon = this.querySelector('.add-remove-btn');
                
                if (isSelected) {
                    icon.classList.remove('bi-plus-circle');
                    icon.classList.add('bi-check-circle-fill');
                    addToSelectedSongs(track);
                } else {
                    icon.classList.add('bi-plus-circle');
                    icon.classList.remove('bi-check-circle-fill');
                    removeFromSelectedSongs(track.id);
                }
            });
            
            elements.selectableSongs.appendChild(songItem);
        });
    }
    
    // Add a track to the selected songs list
    function addToSelectedSongs(track) {
        const songItem = document.createElement('div');
        songItem.className = 'selected-song';
        songItem.setAttribute('data-id', track.id);
        
        // Cover image
        const coverSrc = track.cover === 'default' ? 
            'images/music-placeholder.jpg' : track.cover;
        
        songItem.innerHTML = `
            <i class="bi bi-grip-vertical drag-handle"></i>
            <img src="${coverSrc}" alt="${track.title}">
            <div class="selected-song-info">
                <h5>${track.title}</h5>
                <p>${track.artist}</p>
            </div>
            <i class="bi bi-x-circle remove-btn"></i>
        `;
        
        // Add event listener for remove button
        const removeBtn = songItem.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            // Remove from selected list
            songItem.remove();
            
            // Update selectable songs list UI
            const selectableSong = document.querySelector(`.selectable-song[data-id="${track.id}"]`);
            if (selectableSong) {
                selectableSong.classList.remove('selected');
                const icon = selectableSong.querySelector('.add-remove-btn');
                icon.classList.add('bi-plus-circle');
                icon.classList.remove('bi-check-circle-fill');
            }
        });
        
        elements.selectedSongsList.appendChild(songItem);
    }
    
    // Remove a track from the selected songs list
    function removeFromSelectedSongs(trackId) {
        const songItem = document.querySelector(`.selected-song[data-id="${trackId}"]`);
        if (songItem) {
            songItem.remove();
        }
    }
    
    // Create a new playlist
    function createPlaylist() {
        const playlistName = elements.playlistNameInput.value.trim();
        if (!playlistName) {
            showToast('Please enter a playlist name', 'error');
            return;
        }
        
        // Get selected tracks
        const selectedSongs = Array.from(elements.selectedSongsList.querySelectorAll('.selected-song'));
        if (selectedSongs.length === 0) {
            showToast('Please select at least one song', 'error');
            return;
        }
        
        // Get selected track IDs in order
        const trackIds = selectedSongs.map(song => song.getAttribute('data-id'));
        
        // All tracks (built-in + uploaded)
        const allTracks = [...tracks, ...playerState.uploadedTracks];
        
        // Map track IDs to actual track objects
        const playlistTracks = trackIds.map(id => 
            allTracks.find(track => track.id.toString() === id.toString())
        ).filter(Boolean);
        
        // Get playlist cover
        let coverUrl = 'images/playlist-default.jpg';
        if (elements.coverPreview.querySelector('img')) {
            coverUrl = elements.coverPreview.querySelector('img').src;
        }
        
        // Create playlist object
        const playlist = {
            id: Date.now(),
            name: playlistName,
            description: elements.playlistDescInput.value.trim(),
            cover: coverUrl,
            tracks: playlistTracks,
            createdAt: new Date().toISOString()
        };
        
        // Add to playlists array
        playerState.customPlaylists.push(playlist);
        
        // Update UI
        addPlaylistToSidebar(playlist);
        addPlaylistCard(playlist);
        
        // Reset form
        elements.playlistNameInput.value = '';
        elements.playlistDescInput.value = '';
        elements.coverPreview.innerHTML = '<i class="bi bi-image"></i>';
        elements.selectedSongsList.innerHTML = '';
        
        // Update selectable songs list UI (reset selections)
        document.querySelectorAll('.selectable-song.selected').forEach(song => {
            song.classList.remove('selected');
            const icon = song.querySelector('.add-remove-btn');
            icon.classList.add('bi-plus-circle');
            icon.classList.remove('bi-check-circle-fill');
        });
        
        // Save to localStorage
        saveToLocalStorage();
        
        showToast(`Playlist "${playlistName}" created successfully!`, 'success');
    }
    
    // Add a playlist to the sidebar
    function addPlaylistToSidebar(playlist) {
        const playlistItem = document.createElement('div');
        playlistItem.className = 'playlist-item';
        playlistItem.setAttribute('data-id', playlist.id);
        
        playlistItem.innerHTML = `
            <img src="${playlist.cover}" alt="${playlist.name}">
            <div class="playlist-item-info">
                <h4>${playlist.name}</h4>
                <p>${playlist.tracks.length} songs</p>
            </div>
        `;
        
        // Add event listener to play playlist
        playlistItem.addEventListener('click', function() {
            playPlaylist(playlist);
        });
        
        elements.customPlaylistsList.appendChild(playlistItem);
    }
    
    // Add a playlist card to the playlists grid
    function addPlaylistCard(playlist) {
        const playlistCard = document.createElement('div');
        playlistCard.className = 'playlist-card';
        playlistCard.setAttribute('data-id', playlist.id);
        
        playlistCard.innerHTML = `
            <div class="playlist-card-img">
                <img src="${playlist.cover}" alt="${playlist.name}">
            </div>
            <div class="playlist-card-info">
                <h4>${playlist.name}</h4>
                <p>${playlist.tracks.length} songs</p>
            </div>
        `;
        
        // Add event listener to play playlist
        playlistCard.addEventListener('click', function() {
            playPlaylist(playlist);
        });
        
        elements.playlistsGrid.appendChild(playlistCard);
    }
    
    // Play a playlist
    function playPlaylist(playlist) {
        if (playlist.tracks.length === 0) {
            showToast('This playlist is empty', 'warning');
            return;
        }
        
        // Update the queue with playlist tracks
        playerState.queue = [...playlist.tracks];
        playerState.currentTrackIndex = 0;
        
        // Start playing the first track
        loadTrack(0);
        togglePlay();
        
        showToast(`Playing playlist: ${playlist.name}`, 'success');
    }
    
    // Show toast notification
    function showToast(message, type = 'info') {
        // Create toast element if it doesn't exist
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        
        // Set type class
        toast.className = 'toast';
        toast.classList.add(`toast-${type}`);
        
        // Set message
        toast.textContent = message;
        
        // Show toast
        toast.classList.add('show');
        
        // Hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Initialize all player functionality
    function init() {
        initPlayer();
        setupAudioEventListeners();
        setupPlayerControls();
        setupKeyboardControls();
        addMobileFeatures();
        
        // Initialize new features
        initTabs();
        initFileUpload();
        initPlaylistCreator();
        initStorageManagement();
        
        // Load saved tracks and playlists from local storage
        loadFromLocalStorage();
        
        // Create default liked songs playlist if it doesn't exist
        if (!playerState.customPlaylists.some(p => p.id === 'liked-songs')) {
            createLikedSongsPlaylist();
        }
    }

    // Save player state to local storage
    function saveToLocalStorage() {
        // Convert tracks to storable format (serialize audio data to base64)
        const tracksToPersist = playerState.uploadedTracks.map(track => {
            // Don't include the file object itself as it's not serializable
            const { file, ...trackWithoutFile } = track;
            return trackWithoutFile;
        });
        
        // Create storage object
        const storageData = {
            uploadedTracks: tracksToPersist,
            customPlaylists: playerState.customPlaylists,
            likedSongs: playerState.likedSongs,
            lastUpdated: new Date().toISOString()
        };
        
        try {
            localStorage.setItem('musicPlayerData', JSON.stringify(storageData));
            return true;
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            if (e.name === 'QuotaExceededError') {
                showToast('Storage limit exceeded. Some items may not be saved.', 'error');
            }
            return false;
        }
    }
    
    // Load player state from local storage
    function loadFromLocalStorage() {
        try {
            const storageData = localStorage.getItem('musicPlayerData');
            if (!storageData) return;
            
            const parsedData = JSON.parse(storageData);
            
            // Restore uploaded tracks
            if (parsedData.uploadedTracks && Array.isArray(parsedData.uploadedTracks)) {
                // Clear existing uploaded tracks
                playerState.uploadedTracks = [];
                
                // Restore each track
                parsedData.uploadedTracks.forEach(track => {
                    // Convert base64 back to a usable audio URL if it exists
                    if (track.audioData) {
                        // Create a blob from the base64 data
                        const byteString = atob(track.audioData.split(',')[1]);
                        const mimeType = track.audioData.split(',')[0].split(':')[1].split(';')[0];
                        const arrayBuffer = new ArrayBuffer(byteString.length);
                        const uint8Array = new Uint8Array(arrayBuffer);
                        
                        for (let i = 0; i < byteString.length; i++) {
                            uint8Array[i] = byteString.charCodeAt(i);
                        }
                        
                        const blob = new Blob([arrayBuffer], { type: mimeType });
                        track.audio = URL.createObjectURL(blob);
                    }
                    
                    // Add to player state
                    playerState.uploadedTracks.push(track);
                    
                    // Add to UI
                    addUploadItem(track, false);
                });
                
                showToast(`Restored ${playerState.uploadedTracks.length} tracks from your library`, 'success');
            }
            
            // Restore liked songs
            if (parsedData.likedSongs && Array.isArray(parsedData.likedSongs)) {
                playerState.likedSongs = parsedData.likedSongs;
            }
            
            // Restore custom playlists
            if (parsedData.customPlaylists && Array.isArray(parsedData.customPlaylists)) {
                // Clear existing playlists
                playerState.customPlaylists = [];
                elements.customPlaylistsList.innerHTML = '';
                elements.playlistsGrid.innerHTML = '';
                
                // Restore each playlist
                parsedData.customPlaylists.forEach(playlist => {
                    // If the playlist has tracks, ensure they have valid audio URLs
                    if (playlist.tracks && Array.isArray(playlist.tracks)) {
                        playlist.tracks.forEach(track => {
                            // Find the corresponding uploaded track that might have an updated audio URL
                            const matchingTrack = playerState.uploadedTracks.find(t => t.id === track.id);
                            if (matchingTrack) {
                                track.audio = matchingTrack.audio;
                            }
                        });
                    }
                    
                    // Add to player state
                    playerState.customPlaylists.push(playlist);
                    
                    // Add to UI
                    addPlaylistToSidebar(playlist);
                    addPlaylistCard(playlist);
                });
                
                if (playerState.customPlaylists.length > 0) {
                    showToast(`Restored ${playerState.customPlaylists.length} playlists`, 'success');
                }
            } else {
                // If no playlists were loaded and we have liked songs, create the liked songs playlist
                if (playerState.likedSongs.length > 0) {
                    createLikedSongsPlaylist();
                }
            }
            
            // Update selectable songs for playlist creation
            updateSelectableSongs();
        } catch (e) {
            console.error('Error loading from localStorage:', e);
            showToast('Failed to load your saved music library', 'error');
        }
    }

    // Initialize storage management functionality
    function initStorageManagement() {
        const checkStorageBtn = document.getElementById('check-storage');
        const clearStorageBtn = document.getElementById('clear-storage');
        const storageUsedEl = document.getElementById('storage-used');
        const storageInfoEl = document.getElementById('storage-info');
        
        if (checkStorageBtn) {
            checkStorageBtn.addEventListener('click', async function() {
                // Update UI to indicate checking
                storageInfoEl.textContent = 'Checking storage usage...';
                
                // Get storage data
                const quota = await storageManager.checkStorageQuota();
                
                if (quota) {
                    // Update storage meter
                    const percentage = quota.usedPercentage;
                    storageUsedEl.style.width = `${percentage}%`;
                    
                    // Update info text
                    const usedMB = Math.round(quota.usedBytes / (1024 * 1024) * 10) / 10;
                    const totalMB = Math.round(quota.totalBytes / (1024 * 1024) * 10) / 10;
                    storageInfoEl.textContent = `${usedMB} MB used of ${totalMB} MB (${percentage}%)`;
                    
                    // Add color based on usage
                    if (percentage > 80) {
                        storageUsedEl.style.backgroundColor = 'var(--error-color)';
                    } else if (percentage > 60) {
                        storageUsedEl.style.backgroundColor = 'var(--warning-color)';
                    } else {
                        storageUsedEl.style.backgroundColor = 'var(--accent-color)';
                    }
                } else {
                    // Fallback to estimate using localStorage size
                    const storageSize = storageManager.getStoredDataSize();
                    const sizeMB = Math.round(storageSize / (1024 * 1024) * 100) / 100;
                    storageUsedEl.style.width = `20%`; // Arbitrary value since we don't know the quota
                    storageInfoEl.textContent = `Approximately ${sizeMB} MB used for music storage`;
                }
            });
            
            // Trigger a check on init
            setTimeout(() => {
                checkStorageBtn.click();
            }, 1000);
        }
        
        if (clearStorageBtn) {
            clearStorageBtn.addEventListener('click', function() {
                storageManager.clearStorage();
                
                // Update storage display after clearing
                if (checkStorageBtn) {
                    setTimeout(() => {
                        checkStorageBtn.click();
                    }, 500);
                }
            });
        }
    }

    // Toggle song as liked
    function toggleLiked(track) {
        // Check if song is already liked
        const isLiked = playerState.likedSongs.some(likedTrack => 
            likedTrack.id === track.id
        );
        
        if (isLiked) {
            // Remove from liked songs
            playerState.likedSongs = playerState.likedSongs.filter(likedTrack => 
                likedTrack.id !== track.id
            );
            showToast(`Removed "${track.title}" from Liked Songs`, 'info');
        } else {
            // Add to liked songs
            playerState.likedSongs.push(track);
            showToast(`Added "${track.title}" to Liked Songs`, 'success');
        }
        
        // Update the liked songs playlist in UI
        updateLikedSongsPlaylist();
        
        // Save to localStorage
        saveToLocalStorage();
    }
    
    // Update the liked songs playlist in the UI
    function updateLikedSongsPlaylist() {
        // Find existing liked songs playlist
        const likedPlaylist = playerState.customPlaylists.find(p => p.id === 'liked-songs');
        
        if (likedPlaylist) {
            // Update existing playlist
            likedPlaylist.tracks = [...playerState.likedSongs];
            
            // Update UI
            const playlistItem = document.querySelector(`.playlist-item[data-id="liked-songs"]`);
            if (playlistItem) {
                playlistItem.querySelector('p').textContent = `${likedPlaylist.tracks.length} songs`;
            }
            
            const playlistCard = document.querySelector(`.playlist-card[data-id="liked-songs"]`);
            if (playlistCard) {
                playlistCard.querySelector('p').textContent = `${likedPlaylist.tracks.length} songs`;
            }
        } else if (playerState.likedSongs.length > 0) {
            // Create new liked songs playlist if it doesn't exist
            createLikedSongsPlaylist();
        }
    }
    
    // Create the liked songs playlist
    function createLikedSongsPlaylist() {
        // Create playlist object
        const likedPlaylist = {
            id: 'liked-songs', // Fixed ID for liked songs
            name: 'Liked Songs',
            description: 'Songs you have liked',
            cover: 'images/liked-songs.jpg', // Default cover 
            tracks: [...playerState.likedSongs],
            createdAt: new Date().toISOString()
        };
        
        // Check if we already have a liked playlist
        const existingIndex = playerState.customPlaylists.findIndex(p => p.id === 'liked-songs');
        if (existingIndex !== -1) {
            // Replace existing playlist
            playerState.customPlaylists[existingIndex] = likedPlaylist;
        } else {
            // Add new playlist
            playerState.customPlaylists.push(likedPlaylist);
            
            // Add to UI
            addPlaylistToSidebar(likedPlaylist);
            addPlaylistCard(likedPlaylist);
        }
    }

    // Start the player
    init();
});
