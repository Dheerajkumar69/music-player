// Ensure waves are always animating
document.addEventListener('DOMContentLoaded', () => {
    const waves = document.querySelectorAll('.wave1');
    waves.forEach(wave => {
        wave.style.animationPlayState = 'running';
    });
});

// Music Player App - Full Implementation

// Add styles for playlist detail page
document.addEventListener('DOMContentLoaded', () => {
    // Add styles for playlist detail page if not already added
    if (!document.getElementById('playlist-detail-styles')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'playlist-detail-styles';
        styleEl.textContent = `
            .playlist-detail-page {
                padding: 20px;
                display: none;
            }
            
            .playlist-detail-page.active {
                display: block;
            }
            
            .playlist-detail-header {
                display: flex;
                align-items: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .playlist-detail-header img {
                width: 180px;
                height: 180px;
                object-fit: cover;
                border-radius: 8px;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
                margin-right: 30px;
            }
            
            .playlist-detail-info {
                flex: 1;
            }
            
            .playlist-detail-info h2 {
                font-size: 32px;
                margin-bottom: 10px;
                color: var(--text-white);
            }
            
            .playlist-detail-info p {
                color: var(--text-light);
                margin-bottom: 15px;
            }
            
            .playlist-stats {
                color: var(--text-light);
                font-size: 14px;
                margin-bottom: 20px;
            }
            
            .playlist-actions {
                display: flex;
                gap: 10px;
                margin-top: 15px;
            }
            
            .playlist-actions .btn {
                background-color: var(--accent-color);
                color: var(--background-dark);
                border: none;
                padding: 10px 20px;
                border-radius: 30px;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .playlist-actions .btn:hover {
                transform: scale(1.05);
                background-color: var(--accent-hover);
            }
            
            .playlist-actions .shuffle-btn {
                background-color: transparent;
                color: var(--text-white);
                border: 1px solid var(--text-light);
            }
            
            .playlist-actions .shuffle-btn:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
            
            .playlist-actions .back-btn {
                background-color: transparent;
                color: var(--text-white);
                border: 1px solid var(--text-light);
            }
            
            .playlist-actions .back-btn:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
            
            .playlist-songs-container {
                margin-top: 20px;
            }
            
            .playlist-songs-header {
                display: grid;
                grid-template-columns: 40px 3fr 2fr 2fr 1fr 100px;
                padding: 0 15px 10px 15px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                color: var(--text-light);
                font-size: 14px;
                font-weight: 500;
            }
            
            .playlist-songs-list {
                margin-top: 10px;
            }
            
            .playlist-song-item {
                display: grid;
                grid-template-columns: 40px 3fr 2fr 2fr 1fr 100px;
                align-items: center;
                padding: 12px 15px;
                border-radius: 8px;
                transition: background-color 0.2s ease;
            }
            
            .playlist-song-item:hover {
                background-color: rgba(255, 255, 255, 0.05);
            }
            
            .playlist-song-item .track-info {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .playlist-song-item .track-info img {
                width: 40px;
                height: 40px;
                object-fit: cover;
                border-radius: 4px;
            }
            
            .playlist-song-item .track-title {
                font-weight: 500;
                color: var(--text-white);
            }
            
            .playlist-song-item .track-artist,
            .playlist-song-item .track-album {
                color: var(--text-light);
                font-size: 14px;
            }
            
            .playlist-song-item .track-duration {
                color: var(--text-light);
                font-size: 14px;
            }
            
            .playlist-song-item .track-actions {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                opacity: 0;
                transition: opacity 0.2s ease;
            }
            
            .playlist-song-item:hover .track-actions {
                opacity: 1;
            }
            
            .playlist-song-item .track-actions button {
                background: transparent;
                border: none;
                color: var(--text-white);
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }
            
            .playlist-song-item .track-actions button:hover {
                background-color: rgba(255, 255, 255, 0.1);
                transform: scale(1.1);
            }
            
            .empty-playlist {
                text-align: center;
                padding: 40px 0;
                color: var(--text-light);
                font-size: 16px;
            }
            
            /* System playlist card styling */
            .system-playlist .playlist-card-img {
                position: relative;
                overflow: hidden;
            }
            
            .system-playlist .playlist-card-img::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, var(--accent-color), var(--background-light));
                opacity: 0.4;
                z-index: 1;
            }
            
            .system-playlist .playlist-card-img img {
                z-index: 0;
            }
            
            .system-playlist .playlist-card-info h4 {
                color: var(--accent-color);
            }
        `;
        document.head.appendChild(styleEl);
    }
});

// Sample track data - in a real app this would come from an API
const tracks = [
    {
        id: 1, 
        title: "Saware",
        artist: "Arijit Singh",
        album: "Phantom",
        duration: 290, // in seconds
        cover: "images/saware.jpg", 
        audio: "audio/Saware FULL VIDEO Song - Arijit Singh  Phantom  T-Series.mp3"
    },
    {
        id: 2,
        title: "Sanam Teri Kasam",
        artist: "Ankit Tiwari",
        album: "Sanam Teri Kasam",
        duration: 315,
        cover: "images/sanam.jpg",
        audio: "audio/Himesh Reshammiya, Ankit Tiwari, Palak Muchhal - Sanam Teri Kasam - Title Song (Lyric Video).mp3"
    },
    {
        id: 3,
        title: "Tere Sang Yaara",
        artist: "Atif Aslam",
        album: "Rustom",
        duration: 278,
        cover: "images/tere-sang.jpg",
        audio: "audio/Tere Sang Yaara - Full Video  Rustom  Akshay Kumar & Ileana D'cruz  Arko ft. Atif Aslam  Manoj M.mp3"
    },
    {
        id: 4,
        title: "Khairiyat",
        artist: "Arijit Singh",
        album: "Chhichhore",
        duration: 264,
        cover: "images/khairiyat.jpg",
        audio: "audio/Full Song_ KHAIRIYAT (BONUS TRACK)  CHHICHHORE  Sushant, Shraddha  Pritam, Amitabh BArijit Singh.mp3"
    },
    {
        id: 5,
        title: "Raabta",
        artist: "Arijit Singh",
        album: "Agent Vinod",
        duration: 230,
        cover: "images/raabta.jpg",
        audio: "audio/Raabta (Kehte Hain Khuda) Full Song With Lyrics  Agent Vinod  Saif Ali Khan, Kareena Kapoor,Pritam.mp3"
    }
];
// IndexedDB Manager for storing audio tracks
const indexedDBManager = {
    db: null,

    async initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open("MusicPlayerDB", 1);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains("tracks")) {
                    const store = db.createObjectStore("tracks", { keyPath: "id" });
                    store.createIndex("title", "title", { unique: false });
                }
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this.db);
            };

            request.onerror = (event) => {
                console.error("IndexedDB error:", event.target.error);
                reject(event.target.error);
            };
        });
    },

    async saveTrack(track, blob) {
        await this.initDB();
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction("tracks", "readwrite");
            const store = tx.objectStore("tracks");

            const record = {
                ...track,
                blob,
                cachedAt: new Date().toISOString()
            };

            const request = store.put(record);
            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(false);
        });
    },

    async getTrack(id) {
        await this.initDB();
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction("tracks", "readonly");
            const store = tx.objectStore("tracks");
            const request = store.get(id);

            request.onsuccess = (event) => {
                const result = event.target.result;
                if (result && result.blob) {
                    const blobUrl = URL.createObjectURL(result.blob);
                    // Return the full track object with the blobUrl as the audio property
                    resolve({
                        ...result,
                        audio: blobUrl
                    });
                } else {
                    resolve(null);
                }
            };

            request.onerror = () => reject(null);
        });
    },

    async deleteTrack(id) {
        await this.initDB();
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction("tracks", "readwrite");
            const store = tx.objectStore("tracks");
            const request = store.delete(id);

            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(false);
        });
    },

    async getAllTracks() {
        await this.initDB();
        return new Promise((resolve) => {
            try {
            const tx = this.db.transaction("tracks", "readonly");
            const store = tx.objectStore("tracks");
            const request = store.getAll();

                request.onsuccess = async (event) => {
                    try {
                        const result = event.target.result || [];
                        console.log(`Retrieved ${result.length} tracks from IndexedDB`);
                        
                        const tracks = await Promise.all(
                            result.map(track => {
                                try {
                                    // Check if blob exists and is valid
                                    if (track.blob && track.blob instanceof Blob) {
                                        const blobUrl = URL.createObjectURL(track.blob);
                                        return {
                ...track,
                                            audio: blobUrl
                                        };
                } else {
                                        console.warn(`Track ${track.id} (${track.title}) has invalid blob`);
                                        return track; // Return track without audio URL
                                    }
                                } catch (error) {
                                    console.error(`Error processing track ${track.id}:`, error);
                                    return track; // Return track without modifications
                                }
                            })
                );
                resolve(tracks);
                    } catch (error) {
                        console.error("Error processing tracks from IndexedDB:", error);
                        resolve([]);
                    }
                };

                request.onerror = (error) => {
                    console.error("Error retrieving tracks from IndexedDB:", error);
                    resolve([]);
                };
            } catch (error) {
                console.error("Transaction error in getAllTracks:", error);
                resolve([]);
            }
        });
    },

    async clearAllTracks() {
        await this.initDB();
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction("tracks", "readwrite");
            const store = tx.objectStore("tracks");
            store.clear().onsuccess = () => resolve(true);
            store.onerror = () => reject(false);
        });
    }
};

// Load all saved tracks from IndexedDB on startup
async function loadSavedIndexedDBTracks() {
    try {
        // Initialize IndexedDB first
        await indexedDBManager.initDB();
        console.log("IndexedDB initialized successfully");
        
    const savedTracks = await indexedDBManager.getAllTracks();
        console.log(`Found ${savedTracks.length} tracks in IndexedDB`);
        
        if (savedTracks && savedTracks.length > 0) {
            // Add tracks to the playerState
            savedTracks.forEach(track => {
                // Check if this track already exists in uploadedTracks by id
                const exists = playerState.uploadedTracks.some(t => t.id === track.id);
                if (!exists) {
                    console.log(`Adding track to player: ${track.title}`);
        playerState.uploadedTracks.push(track);
                    
                    // Add to UI
                    addUploadItem(track, false);
    }
            });
            
            // Update UI
    updateSelectableSongs();
        }
        
        // Update storage info
        setTimeout(() => {
    updateStorageDisplay();
        }, 500);
    } catch (error) {
        console.error("Error loading tracks from IndexedDB:", error);
        showToast("Failed to load your music library", "error");
    }
}

// Auto-cache uploaded songs to IndexedDB after upload
if (document.getElementById('file-upload')) {
    document.getElementById('file-upload').addEventListener('change', async function (e) {
        const files = Array.from(e.target.files);
        for (const file of files) {
            const objectUrl = URL.createObjectURL(file);

            const trackId = Date.now() + Math.floor(Math.random() * 1000);
            const uploadedTrack = {
                id: trackId,
                title: file.name.replace(/\.[^/.]+$/, ''),
                artist: 'Unknown Artist',
                album: 'My Uploads',
                duration: 0,
                cover: '',
                audio: objectUrl,
            };

            playerState.uploadedTracks.push(uploadedTrack);
            addUploadItem(uploadedTrack, true);

            try {
                const blob = await file.slice();
                const success = await indexedDBManager.saveTrack(uploadedTrack, blob);
                if (!success) {
                    showToast(`Failed to save "${uploadedTrack.title}" in IndexedDB`, 'error');
                }
            } catch (err) {
                console.error('IndexedDB save error:', err);
                showToast(`Error saving "${uploadedTrack.title}"`, 'error');
            }
        }

        saveToLocalStorage();
        updateSelectableSongs();
        updateStorageDisplay();
    });
}

// Add compatibility function for any code that might still reference renderUploadItem
function renderUploadItem(track, isLoading = false) {
    return addUploadItem(track, isLoading);
}

// Call load on DOMContentLoaded or wherever app initializes
function init() {
    // Existing setup...
    loadSavedIndexedDBTracks(); // 👈 Add here
}


// Continue with the rest of your original script.js content here...
// Continue with the rest of your original script.js content here...


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
        playHistory: [], // Store listening history
        lastPlayedLimit: 50, // Maximum number of tracks to keep in history
        currentTrackRecorded: false,
        cachedTracks: [], // Store information about cached tracks
        tempDisableProgressUpdate: false, // Added this line
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
        
        // Last played page elements
        historyTimeline: document.querySelector('.history-timeline'),
        emptyHistory: document.getElementById('empty-history'),
        
        // Recommended page elements
        recommendationGroups: document.querySelector('.recommendation-groups'),
        artistRecommendations: document.querySelector('.artist-recommendations'),
        emptyRecommendations: document.getElementById('empty-recommendations'),
        
        // Volume slider
        volumeSlider: document.getElementById('volume-slider'),
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
                
                // Clear cache storage
                this.clearCacheStorage();
                
                // Reset state
                playerState.uploadedTracks = [];
                playerState.customPlaylists = [];
                playerState.cachedTracks = [];
                
                // Clear UI
                elements.uploadItemsList.innerHTML = '';
                elements.customPlaylistsList.innerHTML = '';
                elements.playlistsGrid.innerHTML = '';
                
                // Update UI
                updateSelectableSongs();
                updateStorageDisplay();
                
                showToast('All locally stored music and playlists have been cleared', 'info');
            }
        },
        
        // Get total stored data size
        getStoredDataSize: function() {
            const data = localStorage.getItem('musicPlayerData');
            if (!data) return 0;
            
            // Approximate size in bytes (2 bytes per character for UTF-16)
            return data.length * 2;
        },
        
        // Cache Storage Management
        
        // Initialize cache storage
        initCacheStorage: async function() {
            try {
                const cache = await caches.open('music-player-cache');
                return cache;
            } catch (e) {
                console.error('Error initializing cache storage:', e);
                showToast('Error initializing cache storage', 'error');
                return null;
            }
        },
        
        // Store a track in cache
        cacheTrack: async function(track) {
            try {
                // Convert data URL to blob
                const response = await fetch(track.audio);
                const blob = await response.blob();
                
                // Create a new object URL from the blob
                const objectUrl = URL.createObjectURL(blob);
                
                // Store the original track info
                const trackInfo = {
                    id: track.id,
                    title: track.title,
                    artist: track.artist,
                    album: track.album || 'Unknown Album',
                    duration: track.duration,
                    cover: track.cover,
                    cachedAt: new Date().toISOString(),
                    size: blob.size
                };
                
                // Store track info in localStorage
                playerState.cachedTracks = playerState.cachedTracks || [];
                playerState.cachedTracks.push(trackInfo);
                saveToLocalStorage();
                
                // Store audio blob in cache storage
                const cache = await this.initCacheStorage();
                if (cache) {
                    const audioUrl = `/cached-audio/${track.id}`;
                    await cache.put(audioUrl, new Response(blob));
                    
                    // Update UI to show cached status
                    updateCacheStatus(track.id, true);
                    updateStorageDisplay();
                    
                    showToast(`"${track.title}" has been cached for offline use`, 'success');
                    return true;
                }
                return false;
            } catch (e) {
                console.error('Error caching track:', e);
                showToast('Error caching track', 'error');
                return false;
            }
        },
        
        // Get a cached track
        getCachedTrack: async function(trackId) {
            try {
                const cache = await this.initCacheStorage();
                if (!cache) return null;
                
                const audioUrl = `/cached-audio/${trackId}`;
                const response = await cache.match(audioUrl);
                
                if (response) {
                    const blob = await response.blob();
                    return URL.createObjectURL(blob);
                }
                return null;
            } catch (e) {
                console.error('Error getting cached track:', e);
                return null;
            }
        },
        
        // Remove a track from cache
        removeCachedTrack: async function(trackId) {
            try {
                const cache = await this.initCacheStorage();
                if (!cache) return false;
                
                const audioUrl = `/cached-audio/${trackId}`;
                await cache.delete(audioUrl);
                
                // Update cached tracks list
                playerState.cachedTracks = playerState.cachedTracks.filter(t => t.id !== trackId);
                saveToLocalStorage();
                
                // Update UI
                updateCacheStatus(trackId, false);
                updateStorageDisplay();
                
                showToast(`Track removed from cache`, 'info');
                return true;
            } catch (e) {
                console.error('Error removing cached track:', e);
                return false;
            }
        },
        
        // Check if a track is cached
        isTrackCached: async function(trackId) {
            try {
                const cache = await this.initCacheStorage();
                if (!cache) return false;
                
                const audioUrl = `/cached-audio/${trackId}`;
                const response = await cache.match(audioUrl);
                
                return !!response;
            } catch (e) {
                console.error('Error checking cached track:', e);
                return false;
            }
        },
        
        // Get all cached tracks info
        getCachedTracksInfo: function() {
            return playerState.cachedTracks || [];
        },
        
        // Get total cache size
        getCacheSize: function() {
            const cachedTracks = playerState.cachedTracks || [];
            return cachedTracks.reduce((total, track) => total + (track.size || 0), 0);
        },
        
        // Clear all cache storage
        clearCacheStorage: async function() {
            try {
                await caches.delete('music-player-cache');
                playerState.cachedTracks = [];
                saveToLocalStorage();
                updateStorageDisplay();
                return true;
            } catch (e) {
                console.error('Error clearing cache storage:', e);
                return false;
            }
        }
    };
    
    // Update the storage display in the UI
    async function updateStorageDisplay() {
        console.log("Updating storage display...");
        
        try {
        const storageUsed = document.getElementById('storage-used');
        const storageInfo = document.getElementById('storage-info');
        
            // If elements aren't available yet, retry after a delay
            if (!storageUsed || !storageInfo) {
                console.warn("Storage display elements not found, retrying in 1 second...");
                setTimeout(updateStorageDisplay, 1000);
                return;
            }
        
        // Get storage quota
        const quota = await storageManager.checkStorageQuota();
            
            // Get IndexedDB tracks to calculate size
            const tracks = await indexedDBManager.getAllTracks();
            const indexedDBSize = tracks ? tracks.reduce((total, track) => {
                return total + (track.blob ? track.blob.size : 0);
            }, 0) : 0;
        
        // Get cache size
            const cacheSize = storageManager.getCacheSize() || 0;
            const totalSize = indexedDBSize + cacheSize;
            const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
        
        if (quota) {
            const usedMB = (quota.usedBytes / (1024 * 1024)).toFixed(2);
            const totalMB = (quota.totalBytes / (1024 * 1024)).toFixed(2);
            
            storageUsed.style.width = `${quota.usedPercentage}%`;
                storageInfo.textContent = `${usedMB} MB used of ${totalMB} MB (${totalSizeMB} MB in music storage)`;
                
                // Add color based on usage
                if (quota.usedPercentage > 80) {
                    storageUsed.style.backgroundColor = 'var(--error-color, #e25d5d)';
                } else if (quota.usedPercentage > 60) {
                    storageUsed.style.backgroundColor = 'var(--warning-color, #e2b55d)';
        } else {
                    storageUsed.style.backgroundColor = 'var(--accent-color, #5d87e2)';
                }
            } else {
                // If quota is not available, show just the music storage size
                storageUsed.style.width = '30%'; // Default width
                storageInfo.textContent = `${totalSizeMB} MB used in music storage`;
                storageUsed.style.backgroundColor = 'var(--accent-color, #5d87e2)';
            }
            
            console.log("Storage display updated successfully");
        } catch (error) {
            console.error("Error updating storage display:", error);
        }
    }
    
    // Update cache status indicator for a track
    function updateCacheStatus(trackId, isCached) {
        const item = document.querySelector(`.upload-item[data-id="${trackId}"]`);
        if (!item) return;
        
        // Remove existing cache status
        const existingStatus = item.querySelector('.cache-status');
        if (existingStatus) {
            existingStatus.remove();
        }
        
        // Add new cache status if cached
        if (isCached) {
            const cacheStatus = document.createElement('div');
            cacheStatus.className = 'cache-status';
            cacheStatus.innerHTML = '<i class="bi bi-hdd-fill"></i> Cached';
            
            const infoElement = item.querySelector('.upload-item-info');
            infoElement.appendChild(cacheStatus);
        }
    }

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
        
        // Reset progress bar until we have metadata
        elements.progressBar.style.width = '0%';
        elements.progressCircle.style.left = '0%';
        elements.currentTimeEl.textContent = '0:00';
        
        // Show loading in duration display until we get the metadata
        elements.totalTimeEl.textContent = '--:--';
        
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
        } else {
            playerState.audioElement.play().catch(e => {
                console.error('Error playing audio:', e);
                showToast('Error playing track', 'error');
            });
            
            // Add to history when manually playing a track (not just on end)
            if (playerState.currentTrack) {
                addToPlayHistory(playerState.currentTrack);
            }
        }
        
        // Toggle play state
        playerState.isPlaying = !playerState.isPlaying;
        
        // Update UI
        elements.playBtn.classList.toggle('bi-play-circle-fill', !playerState.isPlaying);
        elements.playBtn.classList.toggle('bi-pause-circle-fill', playerState.isPlaying);
        
        // Update all other play/pause icons in the UI
        updateNowPlayingUI();
        
        // Update playlist detail status if that view is active
        updatePlaylistDetailPlayingStatus();
    }

    // Function to format time in seconds to MM:SS format
    function formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return '0:00';
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
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
        
        // Skip updating the visual progress if we're currently hovering
        if (playerState.tempDisableProgressUpdate) return;
        
        // Use the audio element's duration if available, otherwise fall back to track duration
        const duration = playerState.audioElement.duration || (playerState.currentTrack ? playerState.currentTrack.duration : 0);
        
        // Only update if we have a valid duration to avoid NaN
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
        elements.progressBar.style.width = `${progressPercent}%`;
        elements.progressCircle.style.left = `${progressPercent}%`;
        }
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
        // Updated trending albums with real tracks
        const trendingAlbums = [
            { title: "The Weeknd - After Hours", artist: "The Weeknd", audioFile: "The Weeknd - After Hours (Audio).mp3" },
            { title: "Dua Lipa - Future Nostalgia", artist: "Dua Lipa", audioFile: "Dua Lipa - Future Nostalgia (Official Lyrics Video).mp3" },
            { title: "Olivia Rodrigo - Brutal", artist: "Olivia Rodrigo", audioFile: "brutal.mp3" },
            { title: "Adele - Strangers By Nature", artist: "Adele", audioFile: "Strangers By Nature.mp3" }
        ];
        
        // Updated new releases with real tracks
        const newReleases = [
            { title: "Billie Eilish - Happier Than Ever", artist: "Billie Eilish", audioFile: "Billie Eilish - Happier Than Ever (Official Music Video).mp3" },
            { title: "BTS - Butter", artist: "BTS", audioFile: "BTS (방탄소년단) 'Butter' Official MV.mp3" },
            { title: "Ariana Grande - Positions", artist: "Ariana Grande", audioFile: "Ariana Grande - positions (official video).mp3" },
            { title: "Doja Cat - I Don't Do Drugs", artist: "Doja Cat ft. Ariana Grande", audioFile: "Doja Cat - I Don't Do Drugs (Visualizer) ft. Ariana Grande.mp3" }
        ];
        
        // Trending cards
        elements.trendingCards.forEach((card, index) => {
            card.addEventListener('click', function() {
                if (index < trendingAlbums.length) {
                    const album = trendingAlbums[index];
                    const track = createTrackFromAudioFile(album.audioFile);
                    
                    if (track) {
                        playTrack(track);
                        showToast(`Playing ${album.title}`, 'success');
                    } else {
                        showToast(`Couldn't find audio for ${album.title}`, 'error');
                    }
                }
            });
        });
        
        // New release cards
        elements.newReleaseCards.forEach((card, index) => {
            card.addEventListener('click', function() {
                if (index < newReleases.length) {
                    const album = newReleases[index];
                    const track = createTrackFromAudioFile(album.audioFile);
                    
                    if (track) {
                        playTrack(track);
                        showToast(`Playing ${album.title}`, 'success');
                    } else {
                        showToast(`Couldn't find audio for ${album.title}`, 'error');
                    }
                }
            });
        });
        
        // All card play buttons
        elements.cardPlayBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const card = this.closest('.card');
                const cardIndex = Array.from(card.parentElement.children).indexOf(card);
                const isTrending = card.closest('.feed-section:nth-child(1)') !== null;
                
                if (isTrending && cardIndex < trendingAlbums.length) {
                    const album = trendingAlbums[cardIndex];
                    const track = createTrackFromAudioFile(album.audioFile);
                    
                    if (track) {
                        playTrack(track);
                        showToast(`Playing ${album.title}`, 'success');
                    } else {
                        showToast(`Couldn't find audio for ${album.title}`, 'error');
                    }
                } else if (!isTrending && cardIndex < newReleases.length) {
                    const album = newReleases[cardIndex];
                    const track = createTrackFromAudioFile(album.audioFile);
                    
                    if (track) {
                        playTrack(track);
                        showToast(`Playing ${album.title}`, 'success');
                    } else {
                        showToast(`Couldn't find audio for ${album.title}`, 'error');
                    }
                }
            });
        });
    }

    // Toggle mobile sidebar visibility
    function toggleSidebar() {
        if (!elements.sidebar) {
            elements.sidebar = document.querySelector('.sidebar');
        }
        
        elements.sidebar.classList.toggle('show-sidebar');
        
        const overlay = document.querySelector('.sidebar-overlay');
        if (overlay) {
            overlay.classList.toggle('show-overlay');
        }
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
                // Add current track to history before moving to next
                addToPlayHistory(playerState.currentTrack);
                
                // Play the next track
                playNext();
            }
            
            // Update all UI play/pause buttons
            updateNowPlayingUI();
        });
        
        // When playback starts
        playerState.audioElement.addEventListener('play', function() {
            playerState.isPlaying = true;
            updateNowPlayingUI();
        });
        
        // When playback pauses
        playerState.audioElement.addEventListener('pause', function() {
            playerState.isPlaying = false;
            updateNowPlayingUI();
        });
        
        // When metadata is loaded (e.g. duration)
        playerState.audioElement.addEventListener('loadedmetadata', function() {
            // If the track's duration isn't set or doesn't match the actual audio duration, update it
            if (!playerState.currentTrack.duration || Math.abs(playerState.currentTrack.duration - playerState.audioElement.duration) > 1) {
                console.log(`Updating duration for ${playerState.currentTrack.title} from ${playerState.currentTrack.duration} to ${playerState.audioElement.duration}`);
                playerState.currentTrack.duration = playerState.audioElement.duration;
            }
            
            // Update the total time display
            updateTotalTimeDisplay();
            
            // Update the current time display and progress bar
            updateTimeDisplay();
        });
        
        // Handle errors
        playerState.audioElement.addEventListener('error', function(e) {
            console.error('Audio element error:', e);
            showToast('Error loading audio track', 'error');
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
                console.log('Playing featured album: The Weeknd - Starboy');
                
                // Create a playlist for the Weeknd songs
                const weekndTracks = findTracksByArtist('The Weeknd');
                
                if (weekndTracks.length > 0) {
                    // Create a playlist for The Weeknd
                    const weekndPlaylist = {
                        id: 'weeknd-starboy-' + Date.now(),
                        name: 'The Weeknd - Starboy',
                        description: 'Featured album',
                        tracks: weekndTracks,
                        cover: 'images/starboy.jpeg'
                    };
                    
                    // Play the playlist
                    playPlaylist(weekndPlaylist);
                    showToast('Playing The Weeknd - Starboy', 'success');
                } else {
                    // Fallback to a specific track from the audio folder
                    const starBoyTrack = createTrackFromAudioFile("The Weeknd - Starboy ft. Daft Punk (Official Video).mp3");
                    if (starBoyTrack) {
                        playTrack(starBoyTrack);
                        showToast('Playing Starboy by The Weeknd', 'success');
                    } else {
                        showToast('Could not find any Weeknd tracks', 'error');
                    }
                }
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
                    showToast('Following The Weeknd - Starboy', 'success');
                } else {
                    this.textContent = 'Follow';
                    this.style.backgroundColor = 'transparent';
                    this.style.color = 'var(--text-white)';
                    this.style.border = '2px solid var(--text-white)';
                    showToast('Unfollowed The Weeknd - Starboy', 'info');
                }
            });
        }
        
        // Heart icon
        elements.heartIcon.addEventListener('click', function() {
            if (playerState.currentTrack) {
            toggleLiked(playerState.currentTrack);
                updateHeartIcon();
            }
        });
        
        // Progress bar click handling
        elements.progressContainer.addEventListener('click', function(e) {
            const progressWidth = this.clientWidth;
            const clickX = e.offsetX;
            const duration = playerState.audioElement.duration;
            
            playerState.audioElement.currentTime = (clickX / progressWidth) * duration;
        });
        
        // Volume control
        elements.volumeContainer.addEventListener('click', function(e) {
            const volumeWidth = this.clientWidth;
            const clickX = e.offsetX;
            const volume = clickX / volumeWidth;
            
            playerState.audioElement.volume = volume;
            elements.volumeBar.style.width = `${volume * 100}%`;
            elements.volumeCircle.style.left = `${volume * 100}%`;
            
            updateVolumeIcon(volume);
        });
        
        // Other player controls...
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
        // Ensure elements are properly initialized
        if (!elements.sidebar) {
            elements.sidebar = document.querySelector('.sidebar');
        }
        
        // Add sidebar toggle button for mobile if it doesn't exist
        if (!elements.sidebarToggle && window.innerWidth <= 768) {
            const topNav = document.querySelector('.top-nav');
            if (topNav) {
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'sidebar-toggle';
            toggleBtn.innerHTML = '<i class="bi bi-list"></i>';
                topNav.prepend(toggleBtn);
            
            elements.sidebarToggle = toggleBtn;
            elements.sidebarToggle.addEventListener('click', toggleSidebar);
            }
            
            // Update sidebar for mobile
            if (elements.sidebar) {
            elements.sidebar.classList.add('mobile-sidebar');
            }
        }
        
        // Add overlay click event to close sidebar
        const overlay = document.querySelector('.sidebar-overlay');
        if (overlay) {
            // Remove any existing listeners to prevent duplicates
            overlay.removeEventListener('click', toggleSidebar);
            // Add the event listener
            overlay.addEventListener('click', toggleSidebar);
        }
        
        // Handle window resize for responsive layout
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 768) {
                if (!elements.sidebarToggle) {
                    addMobileFeatures();
                }
                
                // Ensure sidebar has mobile class
                if (elements.sidebar && !elements.sidebar.classList.contains('mobile-sidebar')) {
                    elements.sidebar.classList.add('mobile-sidebar');
                }
            }
        });
    }

    // New function: Initialize UI tabs
    function initTabs() {
        // Get tab names for better mapping
        const tabNames = Array.from(elements.tabItems).map(tab => tab.textContent.trim());
        console.log('Tab names:', tabNames); // Debug
        
        // Find the library tab and uploads tab index
        const libraryTabIndex = tabNames.indexOf('My Library');
        const playlistsTabIndex = tabNames.indexOf('Radio'); // Playlists are usually in the Radio tab
        
        // Count all content pages to identify last-played and recommended indices
        const contentPageCount = elements.contentPages.length;
        // Last-played and recommended pages are typically the last two pages
        const lastPlayedIndex = Array.from(elements.contentPages).findIndex(page => page.classList.contains('last-played-page'));
        const recommendedIndex = Array.from(elements.contentPages).findIndex(page => page.classList.contains('recommended-page'));
        
        console.log('Last played index:', lastPlayedIndex, 'Recommended index:', recommendedIndex); // Debug
        console.log('Library tab index:', libraryTabIndex, 'Playlists tab index:', playlistsTabIndex); // Debug
        
        // Properly map sidebar items to top tabs
        const sidebarToTabMap = {
            'Dashboard': tabNames.indexOf('Discover') >= 0 ? tabNames.indexOf('Discover') : 0, // Map Dashboard to Discover tab
            'Playlist': tabNames.indexOf('Discover') >= 0 ? tabNames.indexOf('Discover') : 0,
            'Last Played': lastPlayedIndex, // Map to Last Played page
            'Recommended': recommendedIndex, // Map to Recommended page
            'My Uploads': libraryTabIndex !== -1 ? libraryTabIndex : 1, // Connect to My Library tab
            'My Playlists': playlistsTabIndex !== -1 ? playlistsTabIndex : 2 // Connect to Radio tab
        };
        
        console.log('Sidebar to tab map:', sidebarToTabMap); // Debug
        
        // Add global mapping for use in other functions
        window.sidebarToTabMap = sidebarToTabMap;
        
        // Set up sidebar menu item click handlers
        elements.menuItems.forEach((item) => {
            item.addEventListener('click', function() {
                // Get the menu item text
                const menuText = this.querySelector('span').textContent.trim();
                console.log(`Sidebar item clicked: ${menuText}`); // Debug
                
                // Update active state in sidebar
                elements.menuItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                // If this is the My Playlists item, make sure the default playlists exist
                if (menuText === 'My Playlists') {
                    // Make sure default playlists exist
                    createLocalSongsPlaylist(true);
                    createLikedSongsPlaylist(true);
                    // Make sure playlists are rendered
                    renderPlaylists();
                } else if (menuText === 'My Uploads') {
                    // Make sure uploaded tracks are rendered and Local Songs playlist exists
                    renderUploadedTracks();
                    createLocalSongsPlaylist(true);
                }
                
                // Use the mapping to find the correct tab to show
                if (window.sidebarToTabMap && window.sidebarToTabMap[menuText] !== undefined) {
                    const tabIndex = window.sidebarToTabMap[menuText];
                    showTab(tabIndex, true);
                }
            });
        });
        
        // Rest of the function remains the same
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
                
                // Check if this is the playlists tab and render playlists if needed
                const tabName = tab.textContent.trim();
                if (tabName === 'Radio' || tabName === 'Playlists') {
                    renderPlaylists();
                }
                
                // Update sidebar selection to match
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
    
    // Process uploaded files with validation
    function handleFiles(files) {
        if (!files || files.length === 0) {
            showToast('No files selected', 'warning');
            return;
        }
        
        // Convert FileList to Array for easier manipulation
        const fileArray = Array.from(files);
        
        // Track success and error counts
        let successCount = 0;
        let errorCount = 0;
        const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes
        
        // Process each file
        fileArray.forEach(file => {
            // Validate file type
            if (!file.type.startsWith('audio/')) {
                showToast(`"${file.name}" is not an audio file`, 'error');
                errorCount++;
                return;
            }
            
            // Validate file size
            if (file.size > maxFileSize) {
                showToast(`"${file.name}" exceeds 20MB size limit`, 'error');
                errorCount++;
                return;
            }
            
            // Check for duplicates in existing uploads
            const isDuplicate = playerState.uploadedTracks.some(track => 
                track.fileName === file.name && 
                track.fileSize === file.size
            );
            
            if (isDuplicate) {
                showToast(`"${file.name}" is already in your library`, 'warning');
                errorCount++;
                return;
            }
            
            // Process the valid file
            uploadFile(file);
            successCount++;
        });
        
        // Show summary toast if multiple files were processed
        if (fileArray.length > 1) {
            const message = `Processed ${fileArray.length} files: ${successCount} added, ${errorCount} skipped`;
            showToast(message, errorCount > successCount ? 'warning' : 'success');
        }
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
            dateAdded: new Date().toISOString(),
            source: 'user-upload'
        };
        
        // Add loading placeholder to UI
        addUploadItem(newTrack, true);
        console.log(`Added loading placeholder for track: ${newTrack.title}`);
        
        // Create a temporary audio element to get metadata
        const tempAudio = new Audio();
        
        // Set up event listeners with timeouts for error handling
        let metadataTimeout;
        
        // Handle audio load to get duration
        tempAudio.addEventListener('loadedmetadata', async function() {
            // Clear the timeout since metadata loaded successfully
            clearTimeout(metadataTimeout);
            
            try {
                // Update track with proper duration
                newTrack.duration = tempAudio.duration;
                console.log(`Got duration for track: ${newTrack.title} - ${newTrack.duration}s`);
                
                // Save to IndexedDB - this needs to happen before we push to playerState
                try {
                    console.log(`Saving track to IndexedDB: ${newTrack.title}`);
                    const blob = await file.slice(0);
                    const success = await indexedDBManager.saveTrack(newTrack, blob);
                    
                    if (success) {
                        console.log(`Successfully saved track to IndexedDB: ${newTrack.title}`);
                        // Now add to playerState and update UI
                        playerState.uploadedTracks.push(newTrack);
                        addUploadItem(newTrack, false);
                        
                        // Update all related UI components
                        updateSelectableSongs();
                        saveToLocalStorage();
                        updateStorageDisplay();
                        
                        showToast(`"${newTrack.title}" added to your library`, 'success');
                    } else {
                        console.error(`Failed to save track to IndexedDB: ${newTrack.title}`);
                        showToast(`Failed to save "${newTrack.title}" to your library`, 'error');
                        
                        // Remove loading placeholder if save failed
                        const loadingItem = document.querySelector(`.upload-item[data-id="${newTrack.id}"]`);
                        if (loadingItem) loadingItem.remove();
                    }
                } catch (err) {
                    console.error('IndexedDB save error:', err);
                    showToast(`Error saving "${newTrack.title}" - ${err.message}`, 'error');
                    
                    // Remove loading placeholder if there was an error
                    const loadingItem = document.querySelector(`.upload-item[data-id="${newTrack.id}"]`);
                    if (loadingItem) loadingItem.remove();
                }
            } catch (loadError) {
                console.error('Error processing audio file:', loadError);
                showToast(`Error processing "${newTrack.title}"`, 'error');
                
                // Remove loading placeholder if there was an error
                const loadingItem = document.querySelector(`.upload-item[data-id="${newTrack.id}"]`);
                if (loadingItem) loadingItem.remove();
            }
        });
        
        // Handle load errors
        tempAudio.addEventListener('error', function(e) {
            clearTimeout(metadataTimeout);
            console.error('Error loading audio file:', e);
            showToast(`Error loading "${title}" - ${e.message || 'Unknown error'}`, 'error');
            
            // Remove loading placeholder
            const loadingItem = document.querySelector(`.upload-item[data-id="${newTrack.id}"]`);
            if (loadingItem) loadingItem.remove();
        });
        
        // Set a timeout to handle cases where the metadata doesn't load properly
        metadataTimeout = setTimeout(() => {
            console.error(`Metadata load timeout for track: ${newTrack.title}`);
            showToast(`Timeout loading "${newTrack.title}" - file may be corrupt`, 'error');
            
            // Remove loading placeholder
            const loadingItem = document.querySelector(`.upload-item[data-id="${newTrack.id}"]`);
            if (loadingItem) loadingItem.remove();
            
            // Clean up
            tempAudio.src = '';
        }, 30000); // 30 seconds timeout
        
        // Start loading the audio to get metadata
        tempAudio.src = audioUrl;
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
                    <button class="cache-btn" title="Cache for offline use"><i class="bi bi-hdd"></i></button>
                    <button class="delete-btn" title="Delete"><i class="bi bi-trash"></i></button>
                </div>
            `;
            
            // Add event listeners for buttons
            setTimeout(() => {
                const playBtn = item.querySelector('.play-btn');
                const editBtn = item.querySelector('.edit-btn');
                const cacheBtn = item.querySelector('.cache-btn');
                const deleteBtn = item.querySelector('.delete-btn');
                
                playBtn.addEventListener('click', () => {
                    playUploadedTrack(track);
                });
                
                editBtn.addEventListener('click', () => {
                    editTrackDetails(track);
                });
                
                cacheBtn.addEventListener('click', () => {
                    toggleTrackCache(track);
                });
                
                deleteBtn.addEventListener('click', () => {
                    deleteUploadedTrack(track);
                });
                
                // Check if track is already cached and update UI
                checkAndUpdateCacheStatus(track.id);
            }, 0);
        }
        
        elements.uploadItemsList.appendChild(item);
    }
    
    // Check if a track is cached and update the UI accordingly
    async function checkAndUpdateCacheStatus(trackId) {
        const isCached = await storageManager.isTrackCached(trackId);
        updateCacheStatus(trackId, isCached);
        updateCacheButton(trackId, isCached);
    }
    
    // Update the cache button appearance based on cache status
    function updateCacheButton(trackId, isCached) {
        const item = document.querySelector(`.upload-item[data-id="${trackId}"]`);
        if (!item) return;
        
        const cacheBtn = item.querySelector('.cache-btn');
        if (!cacheBtn) return;
        
        if (isCached) {
            cacheBtn.title = 'Remove from cache';
            cacheBtn.innerHTML = '<i class="bi bi-hdd-fill"></i>';
            cacheBtn.classList.add('cached');
        } else {
            cacheBtn.title = 'Cache for offline use';
            cacheBtn.innerHTML = '<i class="bi bi-hdd"></i>';
            cacheBtn.classList.remove('cached');
        }
    }
    
    // Toggle track caching (cache if not cached, remove from cache if cached)
    async function toggleTrackCache(track) {
        const isCached = await storageManager.isTrackCached(track.id);
        
        if (isCached) {
            // Remove from cache
            const success = await storageManager.removeCachedTrack(track.id);
            if (success) {
                showToast(`"${track.title}" removed from cache`, 'info');
                updateCacheButton(track.id, false);
            }
        } else {
            // Add to cache
            const success = await storageManager.cacheTrack(track);
            if (success) {
                updateCacheButton(track.id, true);
            }
        }
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
        if (!playlist || !playlist.id) return;
        
        // Check if the playlist is already in the sidebar
        const existingItem = document.querySelector(`.playlist-item[data-id="${playlist.id}"]`);
        if (existingItem) return;
        
        // Get playlist cover
        let playlistCover = playlist.cover || 'images/playlist-default.jpg';
        
        // If playlist has tracks, use first track's image if playlist cover is default
        if (playlist.tracks && playlist.tracks.length > 0 && 
            (!playlist.cover || playlist.cover === 'images/playlist-default.jpg')) {
            playlistCover = getTrackImage(playlist.tracks[0]);
        }
        
        // Create the playlist item HTML
        const playlistItem = document.createElement('div');
        playlistItem.className = 'playlist-item';
        playlistItem.dataset.id = playlist.id;
        playlistItem.innerHTML = `
            <img src="${playlistCover}" alt="${playlist.name}">
            <div class="playlist-item-info">
                <h4>${playlist.name}</h4>
                <p>${playlist.tracks ? playlist.tracks.length : 0} songs</p>
            </div>
        `;
        
        // Get the custom playlists list container
        const playlistList = document.querySelector('.playlist-list');
        if (playlistList) {
            // Add the new playlist item to the container
            playlistList.appendChild(playlistItem);
            
            // Add click event to the new playlist item
            playlistItem.addEventListener('click', () => {
                openPlaylistDetail(playlist);
            });
        }
    }
    
    // Add a playlist card to the playlists grid
    function addPlaylistCard(playlist) {
        if (!playlist || !playlist.id) return;
        
        // Check if the playlist card already exists
        const existingCard = document.querySelector(`.playlist-card[data-id="${playlist.id}"]`);
        if (existingCard) return;
        
        // Get playlist cover 
        let playlistCover = playlist.cover || 'images/playlist-default.jpg';
        
        // If playlist has tracks, use first track's image if playlist cover is default
        if (playlist.tracks && playlist.tracks.length > 0 && 
            (!playlist.cover || playlist.cover === 'images/playlist-default.jpg')) {
            playlistCover = getTrackImage(playlist.tracks[0]);
        }
        
        // Create the playlist card element
        const playlistCard = document.createElement('div');
        playlistCard.className = 'playlist-card';
        playlistCard.dataset.id = playlist.id;
        playlistCard.innerHTML = `
            <div class="playlist-card-img">
                <img src="${playlistCover}" alt="${playlist.name}">
            </div>
            <div class="playlist-card-info">
                <h4>${playlist.name}</h4>
                <p>${playlist.tracks ? playlist.tracks.length : 0} songs</p>
            </div>
        `;
        
        // Get the playlists grid container
        const playlistsGrid = document.querySelector('.playlists-grid');
        if (playlistsGrid) {
            // Add the new playlist card to the grid
            playlistsGrid.appendChild(playlistCard);
            
            // Add click event to the new playlist card
            playlistCard.addEventListener('click', () => {
                openPlaylistDetail(playlist);
            });
        }
    }
    
    // Play a playlist
    function playPlaylist(playlist) {
        // Check if playlist is empty
        if (playlist.tracks.length === 0) {
            showToast('This playlist is empty', 'warning');
            return;
        }
        
        // If it's a system playlist (liked-songs or local-songs), open the detail page
        if (playlist.id === 'liked-songs' || playlist.id === 'local-songs' || playlist.isCustom) {
            openPlaylistDetail(playlist);
            return;
        }
        
        // Otherwise, for regular playlists, play immediately
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
        console.log("Initializing music player...");
        
        // Set up basic player functionality
        initPlayer();
        setupAudioEventListeners();
        setupPlayerControls();
        setupKeyboardControls();
        addMobileFeatures();
        
        // Initialize new features
        initTabs();
        initFileUpload();
        initPlaylistCreator();
        
        // Initialize player state from localStorage first
        console.log("Loading state from localStorage...");
        playerState.uploadedTracks = loadFromLocalStorage('uploadedTracks') || [];
        playerState.customPlaylists = loadFromLocalStorage('customPlaylists') || [];
        playerState.likedSongs = loadFromLocalStorage('likedSongs') || [];
        playerState.playHistory = loadFromLocalStorage('playHistory') || [];
        playerState.cachedTracks = loadFromLocalStorage('cachedTracks') || [];
        
        // Initialize storage management
        initStorageManagement();
        
        // Create default playlists first - even before IndexedDB loads
        // This ensures they exist in the UI immediately
        console.log("Creating default playlists...");
        createLocalSongsPlaylist(true); // Force creation even if empty
        createLikedSongsPlaylist(true); // Force creation even if empty
        
        // Render uploaded tracks immediately from localStorage
        renderUploadedTracks();
        
        // Render playlists
        renderPlaylists();
        
        // Now load tracks from IndexedDB (more important and should override localStorage)
        console.log("Loading tracks from IndexedDB...");
        loadSavedIndexedDBTracks().then(() => {
            console.log("Finished loading tracks from IndexedDB");
            
            // Update default playlists after tracks are loaded
            createLocalSongsPlaylist();
            createLikedSongsPlaylist();
            
            // Render uploaded tracks again with the IndexedDB data
            renderUploadedTracks();
            
            // Render all playlists to the playlists page
            renderPlaylists();
            
            // Now also load tracks from the audio folder
            loadTracksFromAudioFolder().then(() => {
                // Update playlists and UI after loading audio folder tracks
                renderUploadedTracks();
                renderPlaylists();
            });
            
            // Trigger storage check after tracks are loaded
        setTimeout(() => {
                console.log("Triggering storage check...");
                const checkStorageBtn = document.getElementById('check-storage');
                if (checkStorageBtn) {
                    checkStorageBtn.click();
                } else {
                    console.warn("Check storage button not found, updating storage display directly");
            updateStorageDisplay();
                }
            }, 1000);
        }).catch(err => {
            console.error("Error during IndexedDB track loading:", err);
            showToast("There was an error loading your music library", "error");
            
            // Still try to load from audio folder even if IndexedDB fails
            loadTracksFromAudioFolder();
        });
        
        // Set up audio element
        playerState.audioElement = new Audio();
        playerState.audioElement.volume = 0.7;
        
        // Add event listener for song end
        playerState.audioElement.addEventListener('ended', function() {
            playNext();
        });
        
        // Add event listener for play time tracking
        playerState.audioElement.addEventListener('timeupdate', function() {
            if (playerState.currentTrack) {
                // Record play in history when reaching 30 seconds or 50% of the song
                const threshold = Math.min(30, playerState.audioElement.duration * 0.5);
                if (playerState.audioElement.currentTime >= threshold && !playerState.currentTrackRecorded) {
                    addToPlayHistory(playerState.currentTrack);
                    playerState.currentTrackRecorded = true;
                }
            }
        });
        
        // Reset recording flag when a new track starts
        playerState.audioElement.addEventListener('play', function() {
            playerState.currentTrackRecorded = false;
        });
        
        // Load initial view
        renderLastPlayed();
        renderRecommendedSongs();
        
        // Set initial volume
        if (elements.volumeSlider) {
        elements.volumeSlider.value = playerState.audioElement.volume * 100;
        }
        
        console.log("Music player initialization complete");
    }

    // Save player state to local storage
    function saveToLocalStorage(key, value) {
        try {
            // If no specific key is provided, save all player state
            if (!key) {
                localStorage.setItem('uploadedTracks', JSON.stringify(playerState.uploadedTracks));
                localStorage.setItem('customPlaylists', JSON.stringify(playerState.customPlaylists));
                localStorage.setItem('likedSongs', JSON.stringify(playerState.likedSongs));
                localStorage.setItem('playHistory', JSON.stringify(playerState.playHistory));
                localStorage.setItem('cachedTracks', JSON.stringify(playerState.cachedTracks));
            } else {
                localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (error) {
            console.error(`Error saving ${key || 'player state'} to localStorage:`, error);
            showToast(`Error saving data: ${error.message}`, 'error');
        }
    }
    
    // Load player state from local storage
    function loadFromLocalStorage(key) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error(`Error loading ${key} from localStorage:`, error);
            showToast(`Error loading data: ${error.message}`, 'error');
            return null;
        }
    }

    // Initialize storage management functionality
    function initStorageManagement() {
        console.log("Initializing storage management...");
        
        // Try to find storage management elements
        const checkStorageBtn = document.getElementById('check-storage');
        const clearStorageBtn = document.getElementById('clear-storage');
        const storageUsedEl = document.getElementById('storage-used');
        const storageInfoEl = document.getElementById('storage-info');
        
        if (!checkStorageBtn || !storageUsedEl || !storageInfoEl) {
            console.warn("Some storage management elements not found - will retry");
            // Retry after a short delay to allow DOM to fully load
            setTimeout(initStorageManagement, 1000);
            return;
        }
        
        console.log("Storage management elements found");
        
        // Set up check storage button
            checkStorageBtn.addEventListener('click', async function() {
                // Update UI to indicate checking
            if (storageInfoEl) {
                storageInfoEl.textContent = 'Checking storage usage...';
                storageInfoEl.style.color = 'var(--text-white, #fff)';
            }
                
            try {
                // Get storage data
                const quota = await storageManager.checkStorageQuota();
                
                // Get cache size
                const cacheSize = storageManager.getCacheSize();
                const cacheSizeMB = (cacheSize / (1024 * 1024)).toFixed(2);
                
                // Get IndexedDB size
                const tracks = await indexedDBManager.getAllTracks();
                const indexedDBSize = tracks.reduce((total, track) => {
                    return total + (track.blob ? track.blob.size : 0);
                }, 0);
                
                const totalSize = cacheSize + indexedDBSize;
                const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
                
                if (quota && storageUsedEl && storageInfoEl) {
                    // Update storage meter
                    const percentage = quota.usedPercentage;
                    storageUsedEl.style.width = `${percentage}%`;
                    
                    // Update info text
                    const usedMB = (quota.usedBytes / (1024 * 1024)).toFixed(2);
                    const totalMB = (quota.totalBytes / (1024 * 1024)).toFixed(2);
                    storageInfoEl.textContent = `${usedMB} MB used of ${totalMB} MB (${totalSizeMB} MB in music storage)`;
                    
                    // Add color based on usage
                    if (percentage > 80) {
                        storageUsedEl.style.backgroundColor = 'var(--error-color, #e25d5d)';
                    } else if (percentage > 60) {
                        storageUsedEl.style.backgroundColor = 'var(--warning-color, #e2b55d)';
                    } else {
                        storageUsedEl.style.backgroundColor = 'var(--accent-color, #5d87e2)';
                    }
                } else if (storageUsedEl && storageInfoEl) {
                    // Fallback to estimate using localStorage size
                    const storageSize = storageManager.getStoredDataSize();
                    const sizeMB = Math.round(storageSize / (1024 * 1024) * 100) / 100;
                    storageUsedEl.style.width = `30%`; // Arbitrary value since we don't know the quota
                    storageInfoEl.textContent = `Approximately ${sizeMB} MB used for storage (${totalSizeMB} MB in music)`;
                    storageUsedEl.style.backgroundColor = 'var(--accent-color, #5d87e2)';
                }
                
                // Check cache status for all uploaded tracks
                if (playerState.uploadedTracks && playerState.uploadedTracks.length > 0) {
                playerState.uploadedTracks.forEach(track => {
                        if (track && track.id) {
                    checkAndUpdateCacheStatus(track.id);
                        }
                    });
                }
                
                console.log("Storage check complete");
            } catch (error) {
                console.error("Storage check failed:", error);
                if (storageInfoEl) {
                    storageInfoEl.textContent = "Error checking storage";
                    storageInfoEl.style.color = 'var(--error-color, #e25d5d)';
                }
            }
        });
        
        // Set up clear storage button
        if (clearStorageBtn) {
            clearStorageBtn.addEventListener('click', function() {
                if (confirm('Are you sure you want to clear all music storage? This cannot be undone.')) {
                    try {
                        // Clear IndexedDB
                        indexedDBManager.db.transaction("tracks", "readwrite")
                            .objectStore("tracks")
                            .clear();
                        
                        // Clear localStorage
                        localStorage.removeItem('uploadedTracks');
                        localStorage.removeItem('customPlaylists');
                        localStorage.removeItem('cachedTracks');
                        
                        // Reset state
                        playerState.uploadedTracks = [];
                        playerState.cachedTracks = [];
                        
                        // Clear UI
                        if (elements.uploadItemsList) {
                            elements.uploadItemsList.innerHTML = '';
                        }
                        
                        // Update UI
                        updateSelectableSongs();
                
                // Update storage display after clearing
                if (checkStorageBtn) {
                    setTimeout(() => {
                        checkStorageBtn.click();
                    }, 500);
                        }
                        
                        showToast('All music storage has been cleared', 'info');
                    } catch (error) {
                        console.error("Error clearing storage:", error);
                        showToast('Error clearing storage: ' + error.message, 'error');
                    }
                }
            });
        }
        
        // Trigger an initial check
        setTimeout(() => {
            if (checkStorageBtn) {
                checkStorageBtn.click();
            }
        }, 1000);
        
        console.log("Storage management initialized");
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
    function createLikedSongsPlaylist(forceCreate = false) {
        console.log("Creating Liked Songs playlist");
        
        // Create playlist object
        const likedPlaylist = {
            id: 'liked-songs', // Fixed ID for liked songs
            name: 'Liked Songs',
            description: 'Songs you have liked',
            cover: 'images/liked-songs.jpg', // Default cover 
            tracks: [...playerState.likedSongs],
            createdAt: new Date().toISOString(),
            isSystem: true // Mark as a system playlist
        };
        
        // Check if we already have a liked playlist
        const existingIndex = playerState.customPlaylists.findIndex(p => p.id === 'liked-songs');
        if (existingIndex !== -1) {
            // Replace existing playlist
            playerState.customPlaylists[existingIndex] = likedPlaylist;
            
            // Update UI if exists
            const playlistItem = document.querySelector(`.playlist-item[data-id="liked-songs"]`);
            if (playlistItem) {
                playlistItem.querySelector('p').textContent = `${likedPlaylist.tracks.length} songs`;
        } else {
                // Add to UI if not in the sidebar
                addPlaylistToSidebar(likedPlaylist);
            }
            
            const playlistCard = document.querySelector(`.playlist-card[data-id="liked-songs"]`);
            if (playlistCard) {
                playlistCard.querySelector('p').textContent = `${likedPlaylist.tracks.length} songs`;
            } else {
                // Add to playlists grid if not there
                addPlaylistCard(likedPlaylist);
            }
        } else if (playerState.likedSongs.length > 0 || forceCreate) {
            // Add new playlist if there are liked songs or if force create is true
            playerState.customPlaylists.push(likedPlaylist);
            
            // Add to UI
            addPlaylistToSidebar(likedPlaylist);
            addPlaylistCard(likedPlaylist);
        }
        
        // Save to localStorage
        saveToLocalStorage();
    }

    // Function to add a track to play history
    function addToPlayHistory(track) {
        // Create a copy of the track with a timestamp
        const historyEntry = {
            ...track,
            playedAt: new Date().toISOString()
        };
        
        // Check if the track is already in history
        const existingIndex = playerState.playHistory.findIndex(t => t.id === track.id);
        
        // If it exists, remove it
        if (existingIndex !== -1) {
            playerState.playHistory.splice(existingIndex, 1);
        }
        
        // Add to the beginning of history array
        playerState.playHistory.unshift(historyEntry);
        
        // Keep history size limited
        if (playerState.playHistory.length > playerState.lastPlayedLimit) {
            playerState.playHistory = playerState.playHistory.slice(0, playerState.lastPlayedLimit);
        }
        
        // Save to local storage
        saveToLocalStorage('playHistory', playerState.playHistory);
        
        // Update last played rendering if that page is active
        if (activeTab === 6) {
            renderLastPlayed();
        }
        
        // Update recommendations if that page is active
        if (activeTab === 7) {
            renderRecommendedSongs();
        }
    }

    // Function to render last played tracks
    function renderLastPlayed() {
        console.log("Rendering Last Played view");
        const historyTimeline = elements.historyTimeline;
        const emptyHistory = elements.emptyHistory;
        
        // Clear current content
        historyTimeline.innerHTML = '';
        
        // Check if we have any history
        if (playerState.playHistory.length === 0) {
            emptyHistory.style.display = 'flex';
            return;
        }
        
        // Hide empty state
        emptyHistory.style.display = 'none';
        
        // Ensure all history items have valid audio paths before rendering
        playerState.playHistory.forEach(historyTrack => {
            if (!historyTrack.audio || (!historyTrack.audio.startsWith('audio/') && !historyTrack.audio.startsWith('blob:'))) {
                // Try to find a match in main tracks or uploaded tracks
                const allTracks = [...tracks, ...playerState.uploadedTracks];
                const matchingTrack = allTracks.find(t => 
                    t.title.toLowerCase() === historyTrack.title.toLowerCase() &&
                    t.artist.toLowerCase() === historyTrack.artist.toLowerCase()
                );
                
                if (matchingTrack && matchingTrack.audio) {
                    console.log(`Updating audio path for history track "${historyTrack.title}" from matching track`);
                    historyTrack.audio = matchingTrack.audio;
                } else {
                    // Try to find a match in audio folder
                    const matchingFile = findMatchingAudioFile(historyTrack);
                    if (matchingFile) {
                        console.log(`Found matching audio file for history track "${historyTrack.title}": ${matchingFile}`);
                        historyTrack.audio = `audio/${matchingFile}`;
                    }
                }
            }
        });
        
        // Group tracks by day
        const groupedHistory = {};
        
        playerState.playHistory.forEach(track => {
            const date = new Date(track.playedAt);
            const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD
            
            if (!groupedHistory[dateKey]) {
                groupedHistory[dateKey] = [];
            }
            
            groupedHistory[dateKey].push(track);
        });
        
        // Sort dates newest first
        const sortedDates = Object.keys(groupedHistory).sort((a, b) => b.localeCompare(a));
        
        // Create HTML for each day
        sortedDates.forEach(dateKey => {
            const tracks = groupedHistory[dateKey];
            const dateObj = new Date(dateKey);
            
            // Format date: "Today", "Yesterday", or date
            let dateText = '';
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (dateKey === today.toISOString().split('T')[0]) {
                dateText = 'Today';
            } else if (dateKey === yesterday.toISOString().split('T')[0]) {
                dateText = 'Yesterday';
            } else {
                dateText = dateObj.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                });
            }
            
            // Create day container
            const dayEl = document.createElement('div');
            dayEl.className = 'history-day';
            
            // Add day header
            dayEl.innerHTML = `
                <div class="history-day-header">
                    <div class="history-date">${dateText}</div>
                    <div class="history-divider"></div>
                </div>
            `;
            
            // Add tracks for this day
            const tracksContainer = document.createElement('div');
            tracksContainer.className = 'history-tracks';
            
            tracks.forEach(track => {
                const time = new Date(track.playedAt).toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
                
                const trackEl = document.createElement('div');
                trackEl.className = 'history-item';
                trackEl.innerHTML = `
                    <div class="history-time">${time}</div>
                    <img src="${track.cover || 'images/music-placeholder.png'}" alt="${track.title}">
                    <div class="history-item-info">
                        <h4>${track.title}</h4>
                        <p>${track.artist}</p>
                    </div>
                    <div class="history-item-actions">
                        <button class="play-history-btn" data-track-id="${track.id}">
                            <i class="bi bi-play-circle"></i>
                        </button>
                        <button class="like-history-btn" data-track-id="${track.id}">
                            <i class="bi ${playerState.likedSongs.some(t => t.id === track.id) ? 'bi-heart-fill' : 'bi-heart'}"></i>
                        </button>
                    </div>
                `;
                
                tracksContainer.appendChild(trackEl);
            });
            
            dayEl.appendChild(tracksContainer);
            historyTimeline.appendChild(dayEl);
        });
        
        // Add event listeners to play buttons with improved error handling
        const playButtons = document.querySelectorAll('.play-history-btn');
        playButtons.forEach(button => {
            button.addEventListener('click', function() {
                const trackId = this.dataset.trackId;
                console.log(`History play button clicked for track ID: ${trackId}`);
                const track = findTrackById(trackId);
                if (track) {
                    playTrack(track);
                } else {
                    showToast("Could not find this track", "error");
                }
            });
        });
        
        // Add event listeners to like buttons
        const likeButtons = document.querySelectorAll('.like-history-btn');
        likeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const trackId = this.dataset.trackId;
                const track = findTrackById(trackId);
                if (track) {
                    toggleLiked(track);
                    // Update heart icon
                    const icon = this.querySelector('i');
                    if (playerState.likedSongs.some(t => t.id === trackId)) {
                        icon.classList.remove('bi-heart');
                        icon.classList.add('bi-heart-fill');
                    } else {
                        icon.classList.remove('bi-heart-fill');
                        icon.classList.add('bi-heart');
                    }
                }
            });
        });
    }

    // Function to find a track by ID across all track sources
    function findTrackById(trackId) {
        console.log(`Finding track by ID: ${trackId}`);
        
        // Check in main tracks array
        let track = tracks.find(t => t.id == trackId);
        if (track) {
            console.log(`Found track in main tracks array: ${track.title} by ${track.artist}`);
            
            // Ensure the audio path is valid
            if (!track.audio.startsWith('audio/') && !track.audio.startsWith('blob:')) {
                // Look for a matching audio file in our known audio files
                const audioFiles = [
                    "The Weeknd - Starboy ft. Daft Punk (Official Video).mp3",
                    "brutal.mp3",
                    "Strangers By Nature.mp3",
                    "Billie Eilish - Happier Than Ever (Official Music Video).mp3",
                    "Justice - D.A.N.C.E. (Official Video).mp3",
                    "BTS (방탄소년단) 'Butter' Official MV.mp3",
                    "Ariana Grande - positions (official video).mp3",
                    "Doja Cat - I Don't Do Drugs (Visualizer) ft. Ariana Grande.mp3",
                    "Lady Gaga - Chromatica I (Audio).mp3",
                    "Dua Lipa - Future Nostalgia (Official Lyrics Video).mp3",
                    "The Weeknd - After Hours (Audio).mp3",
                    "Tere Sang Yaara - Full Video  Rustom  Akshay Kumar & Ileana D'cruz  Arko ft. Atif Aslam  Manoj M.mp3",
                    "Full Song_ KHAIRIYAT (BONUS TRACK)  CHHICHHORE  Sushant, Shraddha  Pritam, Amitabh BArijit Singh.mp3",
                    "Raabta (Kehte Hain Khuda) Full Song With Lyrics  Agent Vinod  Saif Ali Khan, Kareena Kapoor,Pritam.mp3",
                    "Himesh Reshammiya, Ankit Tiwari, Palak Muchhal - Sanam Teri Kasam - Title Song (Lyric Video).mp3",
                    "Saware FULL VIDEO Song - Arijit Singh  Phantom  T-Series.mp3"
                ];
                
                // Try to find a match based on title and artist
                let matchingFile = null;
                
                // First try exact title match
                matchingFile = audioFiles.find(file => 
                    file.toLowerCase().includes(track.title.toLowerCase())
                );
                
                // If that fails, try artist match
                if (!matchingFile && track.artist) {
                    matchingFile = audioFiles.find(file => 
                        file.toLowerCase().includes(track.artist.toLowerCase())
                    );
                }
                
                if (matchingFile) {
                    console.log(`Found matching audio file for "${track.title}": ${matchingFile}`);
                    track.audio = `audio/${matchingFile}`;
                } else {
                    console.warn(`No matching audio file found for "${track.title}"`);
                }
            }
            
            return track;
        }
        
        // Check in uploaded tracks
        track = playerState.uploadedTracks.find(t => t.id == trackId);
        if (track) {
            console.log(`Found track in uploaded tracks: ${track.title} by ${track.artist}`);
            return track;
        }
        
        // Check in play history (for tracks that might have been removed)
        track = playerState.playHistory.find(t => t.id == trackId);
        if (track) {
            console.log(`Found track in play history: ${track.title} by ${track.artist}`);
            
            // Ensure the audio path is valid for history tracks
            if (!track.audio.startsWith('audio/') && !track.audio.startsWith('blob:')) {
                // Look for matching track in main tracks and uploaded tracks
                const allTracks = [...tracks, ...playerState.uploadedTracks];
                const matchingTrack = allTracks.find(t => 
                    t.title.toLowerCase() === track.title.toLowerCase() &&
                    t.artist.toLowerCase() === track.artist.toLowerCase()
                );
                
                if (matchingTrack && matchingTrack.audio) {
                    console.log(`Updating audio path for history track "${track.title}" from matching track`);
                    track.audio = matchingTrack.audio;
                } else {
                    // Try to find a match in audio folder based on title and artist
                    const audioFiles = [
                        "The Weeknd - Starboy ft. Daft Punk (Official Video).mp3",
                        "brutal.mp3",
                        "Strangers By Nature.mp3",
                        "Billie Eilish - Happier Than Ever (Official Music Video).mp3",
                        "Justice - D.A.N.C.E. (Official Video).mp3",
                        "BTS (방탄소년단) 'Butter' Official MV.mp3",
                        "Ariana Grande - positions (official video).mp3",
                        "Doja Cat - I Don't Do Drugs (Visualizer) ft. Ariana Grande.mp3",
                        "Lady Gaga - Chromatica I (Audio).mp3",
                        "Dua Lipa - Future Nostalgia (Official Lyrics Video).mp3",
                        "The Weeknd - After Hours (Audio).mp3",
                        "Tere Sang Yaara - Full Video  Rustom  Akshay Kumar & Ileana D'cruz  Arko ft. Atif Aslam  Manoj M.mp3",
                        "Full Song_ KHAIRIYAT (BONUS TRACK)  CHHICHHORE  Sushant, Shraddha  Pritam, Amitabh BArijit Singh.mp3",
                        "Raabta (Kehte Hain Khuda) Full Song With Lyrics  Agent Vinod  Saif Ali Khan, Kareena Kapoor,Pritam.mp3",
                        "Himesh Reshammiya, Ankit Tiwari, Palak Muchhal - Sanam Teri Kasam - Title Song (Lyric Video).mp3",
                        "Saware FULL VIDEO Song - Arijit Singh  Phantom  T-Series.mp3"
                    ];
                    
                    let matchingFile = null;
                    
                    // Try title match
                    matchingFile = audioFiles.find(file => 
                        file.toLowerCase().includes(track.title.toLowerCase())
                    );
                    
                    // If that fails, try artist match
                    if (!matchingFile && track.artist) {
                        matchingFile = audioFiles.find(file => 
                            file.toLowerCase().includes(track.artist.toLowerCase())
                        );
                    }
                    
                    if (matchingFile) {
                        console.log(`Found matching audio file for history track "${track.title}": ${matchingFile}`);
                        track.audio = `audio/${matchingFile}`;
                    } else {
                        console.warn(`No matching audio file found for history track "${track.title}"`);
                    }
                }
            }
            
        return track;
        }
        
        console.warn(`No track found with ID: ${trackId}`);
        return null;
    }

    // Function to play a track directly
    function playTrack(track) {
        if (!track) {
            console.error("Attempted to play null or undefined track");
            showToast("Error: Invalid track", "error");
            return;
        }
        
        console.log(`Playing track: ${track.title} by ${track.artist}, audio source: ${track.audio}`);
        
        // Stop current playback
        playerState.audioElement.pause();
        
        // Set as current track
        playerState.currentTrack = track;
        
        // Check if audio path exists and is valid
        if (!track.audio) {
            console.error(`Track "${track.title}" has no audio path`);
            showToast(`Cannot play "${track.title}" - Missing audio file`, "error");
            return;
        }
        
        // Try to find a match in audio folder if the audio path doesn't start with audio/ or blob:
        if (!track.audio.startsWith('audio/') && !track.audio.startsWith('blob:')) {
            // Find a matching audio file
            const potentialMatch = findMatchingAudioFile(track);
            if (potentialMatch) {
                track.audio = `audio/${potentialMatch}`;
                console.log(`Updated audio path for "${track.title}" to: ${track.audio}`);
            } else {
                console.error(`No matching audio file found for "${track.title}"`);
            }
        }
        
        // Set the audio source
        try {
        playerState.audioElement.src = track.audio;
        } catch (e) {
            console.error(`Error setting audio source for "${track.title}":`, e);
            showToast(`Error loading "${track.title}"`, "error");
            return;
        }
        
        // Update UI
        elements.nowPlayingImg.src = track.cover || 'images/music-placeholder.png';
        elements.nowPlayingTitle.textContent = track.title;
        elements.nowPlayingArtist.textContent = track.artist;
        
        // Update play button
        elements.playBtn.classList.remove('bi-play-circle-fill');
        elements.playBtn.classList.add('bi-pause-circle-fill');
        
        // Start playing
        playerState.audioElement.play()
            .then(() => {
                console.log(`Successfully started playback for "${track.title}"`);
        playerState.isPlaying = true;
        
        // Add to history
        addToPlayHistory(track);
            })
            .catch(e => {
                console.error(`Error playing "${track.title}":`, e);
                showToast(`Error playing "${track.title}"`, "error");
            });
    }

    // Function to find a matching audio file based on track metadata
    function findMatchingAudioFile(track) {
        if (!track) {
            console.error('No track provided to findMatchingAudioFile');
            return null;
        }
        
        try {
            // Audio file mappings based on artist and title
            const audioMappings = {
                'The Weeknd': {
                    'Starboy': 'audio/The Weeknd - Starboy ft. Daft Punk (Official Video).mp3',
                    'After Hours': 'audio/The Weeknd - After Hours (Audio).mp3'
                },
                'Dua Lipa': {
                    'Future Nostalgia': 'audio/Dua Lipa - Future Nostalgia (Official Lyrics Video).mp3'
                },
                'Lady Gaga': {
                    'Chromatica I': 'audio/Lady Gaga - Chromatica I (Audio).mp3'
                },
                'Olivia Rodrigo': {
                    'brutal': 'audio/brutal.mp3'
                },
                'Doja Cat': {
                    'I Don\'t Do Drugs': 'audio/Doja Cat - I Don\'t Do Drugs (Visualizer) ft. Ariana Grande.mp3'
                },
                'Ariana Grande': {
                    'positions': 'audio/Ariana Grande - positions (official video).mp3'
                },
                'BTS': {
                    'Butter': 'audio/BTS (방탄소년단) \'Butter\' Official MV.mp3'
                },
                'Justin Bieber': {
                    'Justice': 'audio/Justice - D.A.N.C.E. (Official Video).mp3'
                },
                'Justice': {
                    'D.A.N.C.E.': 'audio/Justice - D.A.N.C.E. (Official Video).mp3'
                },
                'Billie Eilish': {
                    'Happier Than Ever': 'audio/Billie Eilish - Happier Than Ever (Official Music Video).mp3'
                },
                'Adele': {
                    'Strangers By Nature': 'audio/Strangers By Nature.mp3'
                },
                'Arijit Singh': {
                    'Saware': 'audio/Saware FULL VIDEO Song - Arijit Singh  Phantom  T-Series.mp3',
                    'Khairiyat': 'audio/Full Song_ KHAIRIYAT (BONUS TRACK)  CHHICHHORE  Sushant, Shraddha  Pritam, Amitabh BArijit Singh.mp3',
                    'Raabta': 'audio/Raabta (Kehte Hain Khuda) Full Song With Lyrics  Agent Vinod  Saif Ali Khan, Kareena Kapoor,Pritam.mp3'
                },
                'Ankit Tiwari': {
                    'Sanam Teri Kasam': 'audio/Himesh Reshammiya, Ankit Tiwari, Palak Muchhal - Sanam Teri Kasam - Title Song (Lyric Video).mp3'
                },
                'Atif Aslam': {
                    'Tere Sang Yaara': 'audio/Tere Sang Yaara - Full Video  Rustom  Akshay Kumar & Ileana D\'cruz  Arko ft. Atif Aslam  Manoj M.mp3'
                }
            };
            
            // Check if already a valid audio path
            if (track.audio && (track.audio.startsWith('audio/') || track.audio.startsWith('blob:') || track.audio.includes('.mp3'))) {
                return track.audio;
            }
            
            // First try exact match
            if (track.artist && track.title && audioMappings[track.artist] && audioMappings[track.artist][track.title]) {
                return audioMappings[track.artist][track.title];
            }
            
            // If no exact match, try fuzzy matching
            for (const [artist, songs] of Object.entries(audioMappings)) {
                // Check if the track artist contains this artist name or vice versa
                if (track.artist && 
                    (track.artist.toLowerCase().includes(artist.toLowerCase()) || 
                    artist.toLowerCase().includes(track.artist.toLowerCase()))) {
                    
                    // Check songs for this artist
                    for (const [title, path] of Object.entries(songs)) {
                        // Check if the track title contains this song title or vice versa
                        if (track.title && 
                            (track.title.toLowerCase().includes(title.toLowerCase()) || 
                            title.toLowerCase().includes(track.title.toLowerCase()))) {
                            
                            // Verify file exists by trying to fetch it (without actually downloading)
                            try {
                                const req = new XMLHttpRequest();
                                req.open('HEAD', path, false);
                                req.send();
                                if (req.status === 200) {
                                    return path;
                                }
                            } catch (e) {
                                // Silent catch - we're just testing if file exists
                                console.log(`File existence check failed for: ${path}`);
                            }
                            
                            // Return the path even if we couldn't verify it exists
                            return path;
                        }
                    }
                    
                    // If we found matching artist but no matching title, return the first song
                    if (Object.values(songs).length > 0) {
                        return Object.values(songs)[0];
                    }
                }
            }
            
            // If we get here, try to search for matching filenames in the audio directory
            // This would require a more complex API on the server side
            
            console.log(`No matching audio file found for track: ${track.title} by ${track.artist}`);
            return null;
        } catch (error) {
            console.error('Error in findMatchingAudioFile:', error);
            return null;
        }
    }

    // Function to render recommended songs
    function renderRecommendedSongs() {
        console.log("Rendering Recommended Songs view");
        const recommendationGroups = elements.recommendationGroups;
        const artistRecommendations = elements.artistRecommendations;
        const emptyRecommendations = elements.emptyRecommendations;
        
        // Clear current content
        recommendationGroups.innerHTML = '';
        artistRecommendations.innerHTML = '';
        
        // Check if we have enough history
        if (playerState.playHistory.length < 3) {
            emptyRecommendations.style.display = 'flex';
            return;
        }
        
        // Hide empty state
        emptyRecommendations.style.display = 'none';
        
        // Get recent tracks for recommendations (last 10)
        const recentTracks = playerState.playHistory.slice(0, 10);
        
        // Ensure all recent tracks have valid audio paths
        recentTracks.forEach(track => {
            if (!track.audio || (!track.audio.startsWith('audio/') && !track.audio.startsWith('blob:'))) {
                const matchingFile = findMatchingAudioFile(track);
                if (matchingFile) {
                    console.log(`Found matching audio file for recent track "${track.title}": ${matchingFile}`);
                    track.audio = `audio/${matchingFile}`;
                }
            }
        });
        
        // Take 3 random tracks from recent history to base recommendations on
        const sourceTrack1 = recentTracks[Math.floor(Math.random() * Math.min(3, recentTracks.length))];
        const sourceTrack2 = recentTracks[Math.floor(Math.random() * Math.min(5, recentTracks.length))];
        const sourceTrack3 = recentTracks[Math.floor(Math.random() * recentTracks.length)];
        
        // Create recommendation groups
        const sources = [sourceTrack1, sourceTrack2, sourceTrack3];
        
        // Filter out duplicates
        const uniqueSources = sources.filter((track, index, self) => 
            index === self.findIndex(t => t.id === track.id)
        );
        
        // Create recommendation groups for each source
        uniqueSources.forEach(source => {
            const recommendations = generateRecommendations(source);
            
            // Ensure all recommended tracks have valid audio paths
            recommendations.forEach(track => {
                if (!track.audio || (!track.audio.startsWith('audio/') && !track.audio.startsWith('blob:'))) {
                    const matchingFile = findMatchingAudioFile(track);
                    if (matchingFile) {
                        console.log(`Found matching audio file for recommended track "${track.title}": ${matchingFile}`);
                        track.audio = `audio/${matchingFile}`;
                    }
                }
            });
            
            if (recommendations.length > 0) {
                const groupEl = document.createElement('div');
                groupEl.className = 'recommendation-group';
                
                groupEl.innerHTML = `
                    <div class="recommendation-source">
                        <img src="${source.cover || 'images/music-placeholder.png'}" alt="${source.title}">
                        <div class="recommendation-source-info">
                            <h4>${source.title}</h4>
                            <p>${source.artist}</p>
                        </div>
                    </div>
                    <div class="recommendation-tracks">
                        ${recommendations.map(track => `
                            <div class="recommendation-track" data-track-id="${track.id}">
                                <img src="${track.cover || 'images/music-placeholder.png'}" alt="${track.title}">
                                <div class="recommendation-track-info">
                                    <h5>${track.title}</h5>
                                    <p>${track.artist}</p>
                                </div>
                                <div class="play-icon">
                                    <i class="bi bi-play-fill"></i>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
                
                recommendationGroups.appendChild(groupEl);
            }
        });
        
        // Generate similar artists
        const similarArtists = generateSimilarArtists();
        
        // Add similar artists section
        similarArtists.forEach(artist => {
            const artistCardEl = document.createElement('div');
            artistCardEl.className = 'artist-card';
            
            artistCardEl.innerHTML = `
                <img src="${artist.image || 'images/artist-placeholder.jpg'}" alt="${artist.name}">
                <h4>${artist.name}</h4>
                <p>${artist.genre}</p>
                <button class="btn artist-explore-btn" data-artist="${artist.name}">
                    Explore
                </button>
            `;
            
            artistRecommendations.appendChild(artistCardEl);
        });
        
        // Add event listeners to recommendation tracks with improved error handling
        const recommendationTracks = document.querySelectorAll('.recommendation-track');
        recommendationTracks.forEach(trackEl => {
            trackEl.addEventListener('click', function() {
                const trackId = this.dataset.trackId;
                console.log(`Recommendation track clicked for track ID: ${trackId}`);
                const track = findTrackById(trackId);
                if (track) {
                    playTrack(track);
                } else {
                    showToast("Could not find this track", "error");
                }
            });
        });
        
        // Add event listeners to artist explore buttons
        const exploreButtons = document.querySelectorAll('.artist-explore-btn');
        exploreButtons.forEach(button => {
            button.addEventListener('click', function() {
                const artistName = this.dataset.artist;
                showToast(`Exploring ${artistName}'s music...`, 'info');
                
                // Find tracks by this artist
                const artistTracks = [...tracks, ...playerState.uploadedTracks].filter(
                    track => track.artist.toLowerCase().includes(artistName.toLowerCase())
                );
                
                // Ensure all artist tracks have valid audio paths
                artistTracks.forEach(track => {
                    if (!track.audio || (!track.audio.startsWith('audio/') && !track.audio.startsWith('blob:'))) {
                        const matchingFile = findMatchingAudioFile(track);
                        if (matchingFile) {
                            console.log(`Found matching audio file for artist track "${track.title}": ${matchingFile}`);
                            track.audio = `audio/${matchingFile}`;
                        }
                    }
                });
                
                if (artistTracks.length > 0) {
                    // Create a playlist for this artist
                    const playlist = {
                        id: 'artist_' + Date.now(),
                        name: `${artistName}'s Music`,
                        description: `Music by ${artistName}`,
                        tracks: artistTracks,
                        cover: artistTracks[0].cover || 'images/music-placeholder.png'
                    };
                    
                    // Play the playlist
                    playPlaylist(playlist);
                }
            });
        });
    }

    // Enhance the recommendations generator to ensure audio files are linked
    function generateRecommendations(sourceTrack) {
        console.log(`Generating recommendations based on: ${sourceTrack.title} by ${sourceTrack.artist}`);
        
        if (!sourceTrack) return [];
        
        // Get all available tracks to search from
        const allTracks = [...tracks, ...playerState.uploadedTracks];
        
        // Filter out the source track itself
        const availableTracks = allTracks.filter(track => track.id !== sourceTrack.id);
        
        // Different recommendation strategies
        const recommendations = [];
        
        // 1. Same artist tracks
        if (sourceTrack.artist) {
            const sameArtistTracks = availableTracks.filter(track => 
                track.artist && track.artist.toLowerCase() === sourceTrack.artist.toLowerCase()
            );
            
            // Add up to 2 tracks from the same artist (different from source)
            sameArtistTracks.slice(0, 2).forEach(track => {
                // Ensure the track has a valid audio path
                if (!track.audio || (!track.audio.startsWith('audio/') && !track.audio.startsWith('blob:'))) {
                    const matchingFile = findMatchingAudioFile(track);
                    if (matchingFile) {
                        console.log(`Found matching audio file for same artist track "${track.title}": ${matchingFile}`);
                        track.audio = `audio/${matchingFile}`;
                    }
                }
                
                if (!recommendations.some(t => t.id === track.id)) {
                    recommendations.push(track);
                }
            });
        }
        
        // 2. Tracks from similar artists
        // This is a simplified version - in a real app, you'd use an API to get similar artists
        if (sourceTrack.artist) {
            const similarArtists = [
                'Arijit Singh', 'Atif Aslam', 'Ankit Tiwari', 'Jubin Nautiyal',  // Bollywood voices
                'The Weeknd', 'Billie Eilish', 'Dua Lipa', 'BTS', 'Ariana Grande', 'Doja Cat', // Pop
                'Drake', 'Kendrick Lamar', 'J. Cole', // Hip hop
                'Lady Gaga', 'Justice', 'Daft Punk' // Electronic/Dance
            ].filter(artist => artist.toLowerCase() !== sourceTrack.artist.toLowerCase());
            
            // Pick 2 random similar artists
            const selectedArtists = [];
            for (let i = 0; i < 2 && similarArtists.length > 0; i++) {
                const randomIndex = Math.floor(Math.random() * similarArtists.length);
                selectedArtists.push(similarArtists[randomIndex]);
                similarArtists.splice(randomIndex, 1);
            }
            
            // Find tracks by these artists
            selectedArtists.forEach(artist => {
                const artistTracks = availableTracks.filter(track => 
                    track.artist && track.artist.toLowerCase() === artist.toLowerCase()
                );
                
                if (artistTracks.length > 0) {
                    // Get a random track from this artist
                    const randomTrack = artistTracks[Math.floor(Math.random() * artistTracks.length)];
                    
                    // Ensure the track has a valid audio path
                    if (!randomTrack.audio || (!randomTrack.audio.startsWith('audio/') && !randomTrack.audio.startsWith('blob:'))) {
                        const matchingFile = findMatchingAudioFile(randomTrack);
                        if (matchingFile) {
                            console.log(`Found matching audio file for similar artist track "${randomTrack.title}": ${matchingFile}`);
                            randomTrack.audio = `audio/${matchingFile}`;
                        }
                    }
                    
                    if (!recommendations.some(t => t.id === randomTrack.id)) {
                        recommendations.push(randomTrack);
                    }
                }
            });
        }
        
        // 3. Tracks from the same album (if album info exists)
        if (sourceTrack.album) {
            const sameAlbumTracks = availableTracks.filter(track => 
                track.album && track.album.toLowerCase() === sourceTrack.album.toLowerCase()
            );
            
            // Add up to 2 tracks from the same album
            sameAlbumTracks.slice(0, 2).forEach(track => {
                // Ensure the track has a valid audio path
                if (!track.audio || (!track.audio.startsWith('audio/') && !track.audio.startsWith('blob:'))) {
                    const matchingFile = findMatchingAudioFile(track);
                    if (matchingFile) {
                        console.log(`Found matching audio file for same album track "${track.title}": ${matchingFile}`);
                        track.audio = `audio/${matchingFile}`;
                    }
                }
                
                if (!recommendations.some(t => t.id === track.id)) {
                    recommendations.push(track);
                }
            });
        }
        
        // 4. Fill remaining slots with random tracks
        while (recommendations.length < 6 && availableTracks.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableTracks.length);
            const randomTrack = availableTracks[randomIndex];
            
            // Ensure the track has a valid audio path
            if (!randomTrack.audio || (!randomTrack.audio.startsWith('audio/') && !randomTrack.audio.startsWith('blob:'))) {
                const matchingFile = findMatchingAudioFile(randomTrack);
                if (matchingFile) {
                    console.log(`Found matching audio file for random recommendation "${randomTrack.title}": ${matchingFile}`);
                    randomTrack.audio = `audio/${matchingFile}`;
                }
            }
            
            if (!recommendations.some(t => t.id === randomTrack.id)) {
                recommendations.push(randomTrack);
            }
            
            // Remove this track from the available pool to avoid duplicates
            availableTracks.splice(randomIndex, 1);
        }
        
        console.log(`Generated ${recommendations.length} recommendations for "${sourceTrack.title}"`);
        return recommendations;
    }

    // Helper function to generate similar artists
    function generateSimilarArtists() {
        // Get artists from play history
        const historyArtists = playerState.playHistory
            .map(track => track.artist)
            .filter((artist, index, self) => self.indexOf(artist) === index);
        
        // Get artists from all tracks
        const allArtists = [...tracks, ...playerState.uploadedTracks]
            .map(track => ({
                name: track.artist,
                image: track.cover,
                genre: track.genre || 'Unknown Genre'
            }))
            .filter((artist, index, self) => 
                index === self.findIndex(a => a.name === artist.name) && 
                !historyArtists.includes(artist.name)
            );
        
        // Shuffle and take 6 artists
        allArtists.sort(() => Math.random() - 0.5);
        return allArtists.slice(0, 6);
    }

    // Create and update Local Songs playlist
    function updateLocalSongsPlaylist() {
        // Find existing local songs playlist
        const localPlaylist = playerState.customPlaylists.find(p => p.id === 'local-songs');
        
        if (localPlaylist) {
            // Update existing playlist
            localPlaylist.tracks = [...playerState.uploadedTracks];
            
            // Update UI
            const playlistItem = document.querySelector(`.playlist-item[data-id="local-songs"]`);
            if (playlistItem) {
                playlistItem.querySelector('p').textContent = `${localPlaylist.tracks.length} songs`;
            }
            
            const playlistCard = document.querySelector(`.playlist-card[data-id="local-songs"]`);
            if (playlistCard) {
                playlistCard.querySelector('p').textContent = `${localPlaylist.tracks.length} songs`;
            }
        } else {
            // Create new local songs playlist if it doesn't exist
            createLocalSongsPlaylist();
        }
    }
    
    // Create the Local Songs playlist
    function createLocalSongsPlaylist(forceCreate = false) {
        console.log("Creating Local Songs playlist");
        
        // Create playlist object
        const localPlaylist = {
            id: 'local-songs', // Fixed ID for local songs
            name: 'Local Songs',
            description: 'Songs you have uploaded',
            cover: 'images/local-songs.jpg', // Default cover, will fallback to a placeholder
            tracks: [...playerState.uploadedTracks],
            createdAt: new Date().toISOString(),
            isSystem: true // Mark as a system playlist
        };
        
        // Check if we already have a local songs playlist
        const existingIndex = playerState.customPlaylists.findIndex(p => p.id === 'local-songs');
        if (existingIndex !== -1) {
            // Replace existing playlist
            playerState.customPlaylists[existingIndex] = localPlaylist;
            
            // Update UI if exists
            const playlistItem = document.querySelector(`.playlist-item[data-id="local-songs"]`);
            if (playlistItem) {
                playlistItem.querySelector('p').textContent = `${localPlaylist.tracks.length} songs`;
            } else {
                // Add to UI if not in the sidebar
                addPlaylistToSidebar(localPlaylist);
            }
            
            const playlistCard = document.querySelector(`.playlist-card[data-id="local-songs"]`);
            if (playlistCard) {
                playlistCard.querySelector('p').textContent = `${localPlaylist.tracks.length} songs`;
            } else {
                // Add to playlists grid if not there
                addPlaylistCard(localPlaylist);
            }
        } else if (playerState.uploadedTracks.length > 0 || forceCreate) {
            // Add new playlist if there are uploaded tracks or if force create is true
            playerState.customPlaylists.push(localPlaylist);
            
            // Add to UI
            addPlaylistToSidebar(localPlaylist);
            addPlaylistCard(localPlaylist);
        }
        
        // Save to localStorage
        saveToLocalStorage();
    }

    // Function to open playlist detail view
    function openPlaylistDetail(playlist) {
        // Get the actual playlist object if a string ID was passed
        let actualPlaylist = playlist;
        if (typeof playlist === 'string') {
            actualPlaylist = findPlaylistById(playlist);
            if (!actualPlaylist) {
                console.error(`Playlist with ID ${playlist} not found`);
                return;
            }
        }
        
        console.log(`Opening playlist detail for: ${actualPlaylist.name}`);
        
        // Hide all pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => page.classList.remove('active'));
        
        // Get or create playlist detail page
        let playlistDetailPage = document.querySelector('.playlist-detail-page');
        
        if (!playlistDetailPage) {
            playlistDetailPage = document.createElement('div');
            playlistDetailPage.className = 'page playlist-detail-page';
            
            // Add to content pages container if it exists
            const contentPages = document.querySelector('.content-pages');
            if (contentPages) {
                contentPages.appendChild(playlistDetailPage);
            } else {
                // Fallback to main content
                const mainContent = document.querySelector('.main-content');
                if (mainContent) {
                    mainContent.appendChild(playlistDetailPage);
                }
            }
        }
        
        // Set playlist ID in dataset for reference
        playlistDetailPage.dataset.playlistId = actualPlaylist.id;
        
        // Calculate total duration
        const totalDuration = actualPlaylist.tracks.reduce((total, track) => total + (track.duration || 0), 0);
        const formattedDuration = formatDuration(totalDuration);
        
        // Get the playlist cover image
        const playlistCover = actualPlaylist.cover || 'images/playlist-default.jpg';
        
        // Update content
        playlistDetailPage.innerHTML = `
            <div class="playlist-header">
                <div class="back-button">
                    <i class="bi bi-arrow-left"></i> Back
                </div>
                <div class="playlist-info">
                    <div class="playlist-cover">
                        <img src="${playlistCover}" alt="${actualPlaylist.name}">
                    </div>
                    <div class="playlist-details">
                        <div class="playlist-type">Playlist</div>
                        <h1 class="playlist-name">${actualPlaylist.name}</h1>
                        <div class="playlist-description">${actualPlaylist.description || ''}</div>
                        <div class="playlist-meta">
                            <span>${actualPlaylist.tracks.length} songs</span>
                            <span>•</span>
                            <span>${formattedDuration}</span>
                        </div>
                    </div>
                </div>
                <div class="playlist-actions">
                    <button class="play-all-button">
                        <i class="bi bi-play-fill"></i> Play All
                    </button>
                    <button class="shuffle-button">
                        <i class="bi bi-shuffle"></i> Shuffle
                    </button>
                </div>
            </div>
            <div class="playlist-songs">
                ${generatePlaylistSongsList(actualPlaylist.tracks, actualPlaylist.id)}
            </div>
        `;
        
        // Show the playlist detail page
        playlistDetailPage.classList.add('active');
        
        // Add event listener for back button
        const backButton = playlistDetailPage.querySelector('.back-button');
        if (backButton) {
            backButton.addEventListener('click', () => {
                // Hide playlist detail page
                playlistDetailPage.classList.remove('active');
                
                // Show the playlists page
                const playlistsPage = document.querySelector('.playlists-page');
                if (playlistsPage) {
                    playlistsPage.classList.add('active');
                    
                    // Update the tab navigation to match the playlists tab
                    const tabItems = document.querySelectorAll('.tab');
                    const playlistsTabIndex = Array.from(tabItems).findIndex(tab => 
                        tab.textContent.trim() === 'Playlist' || tab.textContent.trim() === 'My Playlists'
                    );
                    
                    if (playlistsTabIndex !== -1) {
                        showTab(playlistsTabIndex, true);
                    }
                } else {
                    // Fall back to the first tab if playlists page not found
                    showTab(0);
                }
            });
        }
        
        // Add play all button event listener
        const playAllBtn = playlistDetailPage.querySelector('.play-all-button');
        if (playAllBtn) {
            playAllBtn.addEventListener('click', function() {
                if (actualPlaylist.tracks && actualPlaylist.tracks.length > 0) {
                    playerState.currentPlaylist = actualPlaylist;
                    playerState.currentPlaylistIndex = 0;
                    playerState.isShuffle = false;
                    playTrack(actualPlaylist.tracks[0], 0);
                    updateNowPlayingUI();
                    showToast('Playing playlist');
                } else {
                    showToast('This playlist has no songs', 'error');
                }
            });
        }
        
        // Add shuffle button event listener
        const shuffleBtn = playlistDetailPage.querySelector('.shuffle-button');
        if (shuffleBtn) {
            shuffleBtn.addEventListener('click', function() {
                if (actualPlaylist.tracks && actualPlaylist.tracks.length > 0) {
                    playerState.currentPlaylist = actualPlaylist;
                    playerState.isShuffle = true;
                    
                    // Create shuffled indices
                    const indices = Array.from({ length: actualPlaylist.tracks.length }, (_, i) => i);
                    for (let i = indices.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [indices[i], indices[j]] = [indices[j], indices[i]];
                    }
                    
                    playerState.shuffledIndices = indices;
                    const firstIndex = indices[0];
                    playerState.currentPlaylistIndex = 0;
                    playTrack(actualPlaylist.tracks[firstIndex], firstIndex);
                    updatePlayerUI();
                    showToast('Playing in shuffle mode');
                } else {
                    showToast('This playlist has no songs', 'error');
                }
            });
        }
        
        // Add event listeners for songs
        setupSpotifyStyleTrackListeners(playlistDetailPage, actualPlaylist);
        
        // Add CSS styles for Spotify-style playlist detail page
        addSpotifyStyleStyles();
    }

    // Generate Spotify-style tracks HTML
    function generateSpotifyStyleTracks(tracks) {
        return `
            <div class="track-list-header">
                <div class="track-number">#</div>
                <div class="track-title">Title</div>
                <div class="track-album">Album</div>
                <div class="track-duration">
                    <i class="bi bi-clock"></i>
                </div>
            </div>
            <div class="track-list">
                ${tracks.map((track, index) => {
                    const isLiked = playerState.likedSongs && 
                                  playerState.likedSongs.some(likedTrack => likedTrack.id === track.id);
                    const isPlaying = playerState.currentTrack && playerState.currentTrack.id === track.id;
                    const trackImage = getTrackImage(track);
                    
                    return `
                        <div class="track-row ${isPlaying ? 'playing' : ''}" data-id="${track.id}" data-index="${index}">
                            <div class="track-number">
                                <span class="track-index">${index + 1}</span>
                                <span class="track-play-icon">
                                    <i class="bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'}"></i>
                                </span>
                            </div>
                            <div class="track-title">
                                <div class="track-img">
                                    <img src="${trackImage}" alt="${track.title}">
                                </div>
                                <div class="track-info">
                                    <div class="track-name ${isPlaying ? 'playing' : ''}">${track.title || 'Unknown Title'}</div>
                                    <div class="track-artist">${track.artist || 'Unknown Artist'}</div>
                                </div>
                            </div>
                            <div class="track-album">${track.album || ''}</div>
                            <div class="track-duration">
                                <span class="duration">${formatDuration(track.duration || 0)}</span>
                                <span class="track-actions">
                                    <i class="bi ${isLiked ? 'bi-heart-fill liked' : 'bi-heart'} like-btn"></i>
                                    <i class="bi bi-three-dots context-menu-btn"></i>
                                </span>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    // Setup listeners for Spotify-style track rows
    function setupSpotifyStyleTrackListeners(container, playlist) {
        // Track row events
        const trackRows = container.querySelectorAll('.track-row');
        trackRows.forEach(row => {
            const playIcon = row.querySelector('.track-play-icon');
            const likeBtn = row.querySelector('.track-like');
            const moreBtn = row.querySelector('.track-more');
            const index = parseInt(row.dataset.index);
            const track = playlist.tracks[index];
            
            // Play icon click
            if (playIcon) {
                playIcon.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    // Toggle play/pause if this is the current track
                    if (playerState.currentTrack && playerState.currentTrack.id === track.id) {
                        togglePlay();
                    } else {
                        // Play this track
                        playerState.currentPlaylist = playlist;
                        playerState.shuffleMode = false;
                        playerState.currentPlaylistIndex = index;
                        playTrack(track, index);
                    }
                    
                    updatePlayerUI();
                    updateTrackRowsPlayingState(trackRows, row);
                });
            }
            
            // Like button click
            if (likeBtn) {
                likeBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    toggleLikeTrack(track);
                    const isLiked = playerState.likedSongs.some(likedTrack => likedTrack.id === track.id);
                    likeBtn.className = `track-like ${isLiked ? 'liked' : ''}`;
                    likeBtn.querySelector('i').className = `bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'}`;
                });
            }
            
            // More button click
            if (moreBtn) {
                moreBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const rect = moreBtn.getBoundingClientRect();
                    showSongContextMenu(track, rect.left, rect.bottom);
                });
            }
            
            // Row click
            row.addEventListener('click', function() {
                playerState.currentPlaylist = playlist;
                playerState.shuffleMode = false;
                playerState.currentPlaylistIndex = index;
                playTrack(track, index);
                updatePlayerUI();
                updateTrackRowsPlayingState(trackRows, row);
            });
        });
    }

    // Helper function to update playing state across track rows
    function updateTrackRowsPlayingState(rows, currentRow) {
        rows.forEach(row => {
            row.classList.remove('playing');
            const playIcon = row.querySelector('.track-play-icon i');
            const trackName = row.querySelector('.track-name');
            
            if (playIcon) {
                playIcon.className = 'bi bi-play-fill';
            }
            
            if (trackName) {
                trackName.classList.remove('playing');
            }
        });
        
        if (currentRow) {
            currentRow.classList.add('playing');
            const currentPlayIcon = currentRow.querySelector('.track-play-icon i');
            const currentTrackName = currentRow.querySelector('.track-name');
            
            if (currentPlayIcon) {
                currentPlayIcon.className = 'bi bi-pause-fill';
            }
            
            if (currentTrackName) {
                currentTrackName.classList.add('playing');
            }
        }
    }

    // Add Spotify-style CSS
    function addSpotifyStyleStyles() {
        // Check if styles already exist
        if (document.getElementById('spotify-style-styles')) return;
        
        const styleElement = document.createElement('style');
        styleElement.id = 'spotify-style-styles';
        styleElement.textContent = `
            .playlist-detail-page {
                color: var(--text-white);
                padding: 16px;
                font-family: 'Poppins', sans-serif;
            }
            
            .header-back-btn {
                display: inline-flex;
                align-items: center;
                color: var(--text-light);
                cursor: pointer;
                margin-bottom: 24px;
                font-size: 14px;
                opacity: 0.7;
                transition: opacity 0.2s;
            }
            
            .header-back-btn:hover {
                opacity: 1;
            }
            
            .header-back-btn i {
                margin-right: 6px;
            }
            
            .spotify-style-container {
                max-width: 100%;
                margin: 0 auto;
                border-radius: 8px;
                overflow: hidden;
                background: linear-gradient(to bottom, rgba(25, 32, 54, 0.8) 0%, var(--background-dark) 100%);
                box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
            }
            
            .playlist-header {
                display: flex;
                padding: 24px;
                align-items: center;
                gap: 24px;
            }
            
            .playlist-cover {
                width: 192px;
                height: 192px;
                flex-shrink: 0;
                box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
            }
            
            .playlist-cover img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 4px;
            }
            
            .playlist-info {
                flex: 1;
                min-width: 0;
            }
            
            .playlist-type {
                font-size: 12px;
                text-transform: uppercase;
                font-weight: 700;
                margin-bottom: 8px;
            }
            
            .playlist-title {
                font-size: 32px;
                font-weight: 900;
                margin: 0 0 8px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .playlist-description {
                color: var(--text-light);
                margin-bottom: 12px;
                font-size: 14px;
                opacity: 0.8;
                max-height: 60px;
                overflow: hidden;
            }
            
            .playlist-meta {
                display: flex;
                align-items: center;
                font-size: 14px;
                color: var(--text-light);
                flex-wrap: wrap;
            }
            
            .meta-dot {
                margin: 0 8px;
            }
            
            .playlist-duration {
                margin-left: 4px;
            }
            
            .playlist-controls {
                padding: 0 32px 24px;
                display: flex;
                align-items: center;
                gap: 16px;
            }
            
            .spotify-play-button {
                width: 56px;
                height: 56px;
                border-radius: 50%;
                background-color: var(--accent-color);
                color: var(--background-dark);
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.2s, background-color 0.2s;
                box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3);
            }
            
            .spotify-play-button:hover {
                transform: scale(1.05);
                background-color: #00e6ff;
            }
            
            .spotify-play-button i {
                font-size: 24px;
                margin-left: 2px;
            }
            
            .spotify-icon-button {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: transparent;
                color: var(--text-light);
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: color 0.2s;
            }
            
            .spotify-icon-button:hover {
                color: var(--text-white);
            }
            
            .playlist-tracks-container {
                padding: 0 16px 16px;
            }
            
            .track-list-header {
                display: grid;
                grid-template-columns: 48px 4fr 2fr 1fr;
                padding: 0 16px 8px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                color: var(--text-light);
                font-size: 14px;
                font-weight: 500;
            }
            
            .track-duration {
                text-align: right;
            }
            
            .track-list {
                margin-top: 8px;
            }
            
            .track-row {
                display: grid;
                grid-template-columns: 48px 4fr 2fr 1fr;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                transition: background-color 0.2s;
                align-items: center;
            }
            
            .track-row:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
            
            .track-row:hover .track-index {
                display: none;
            }
            
            .track-row:hover .track-play-icon {
                display: flex;
            }
            
            .track-number {
                position: relative;
                width: 24px;
                color: var(--text-light);
            }
            
            .track-index {
                display: block;
            }
            
            .track-play-icon {
                position: absolute;
                top: 0;
                left: 0;
                display: none;
                align-items: center;
                justify-content: center;
                color: var(--text-white);
            }
            
            .track-title {
                display: flex;
                align-items: center;
                min-width: 0;
            }
            
            .track-img {
                width: 40px;
                height: 40px;
                margin-right: 16px;
                flex-shrink: 0;
            }
            
            .track-img img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 4px;
            }
            
            .track-info {
                min-width: 0;
            }
            
            .track-name {
                font-size: 16px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .track-name.playing {
                color: var(--accent-color);
            }
            
            .track-artist {
                font-size: 14px;
                color: var(--text-light);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .track-album {
                font-size: 14px;
                color: var(--text-light);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .track-actions {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                gap: 16px;
            }
            
            .track-like {
                background: transparent;
                border: none;
                color: var(--text-light);
                cursor: pointer;
                padding: 0;
                font-size: 16px;
                opacity: 0;
                transition: opacity 0.2s, color 0.2s;
            }
            
            .track-row:hover .track-like {
                opacity: 1;
            }
            
            .track-like.liked {
                color: var(--accent-color);
                opacity: 1;
            }
            
            .track-like:hover {
                color: var(--text-white);
            }
            
            .track-like.liked:hover {
                color: var(--accent-color);
            }
            
            .track-duration {
                color: var(--text-light);
                font-size: 14px;
            }
            
            .track-more {
                background: transparent;
                border: none;
                color: var(--text-light);
                cursor: pointer;
                padding: 0;
                font-size: 16px;
                opacity: 0;
                transition: opacity 0.2s;
            }
            
            .track-row:hover .track-more {
                opacity: 1;
            }
            
            .track-more:hover {
                color: var(--text-white);
            }
            
            .track-row.playing .track-index {
                display: none;
            }
            
            .track-row.playing .track-play-icon {
                display: flex;
                color: var(--accent-color);
            }
            
            .empty-playlist {
                text-align: center;
                padding: 40px 0;
                color: var(--text-light);
                font-size: 14px;
            }
            
            @media (max-width: 768px) {
                .playlist-header {
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }
                
                .playlist-cover {
                    width: 160px;
                    height: 160px;
                }
                
                .track-list-header {
                    grid-template-columns: 48px 4fr 1fr;
                }
                
                .track-row {
                    grid-template-columns: 48px 4fr 1fr;
                }
                
                .track-album {
                    display: none;
                }
            }
            
            @media (max-width: 576px) {
                .playlist-title {
                    font-size: 24px;
                }
                
                .playlist-controls {
                    padding: 0 16px 16px;
                }
                
                .track-actions {
                    gap: 8px;
                }
            }
        `;
        
        document.head.appendChild(styleElement);
    }

    // Update which track is highlighted in playlist detail view
    function updatePlaylistDetailPlayingStatus() {
        if (!playerState.currentTrack) return;
        
        const playlistDetailPage = document.querySelector('.playlist-detail-page');
        if (!playlistDetailPage) return;
        
        const trackRows = playlistDetailPage.querySelectorAll('.track-row');
        trackRows.forEach(row => {
            const trackId = row.getAttribute('data-id');
            
            if (trackId === playerState.currentTrack.id) {
                row.classList.add('playing');
                
                // Update play icon
                const playIcon = row.querySelector('.track-play-icon i');
                if (playIcon) {
                    playIcon.className = playerState.isPlaying ? 'bi bi-pause-fill' : 'bi bi-play-fill';
                }
                
                // Update track name
                const trackName = row.querySelector('.track-name');
                if (trackName) {
                    trackName.classList.add('playing');
                }
            } else {
                row.classList.remove('playing');
                
                // Reset play icon
                const playIcon = row.querySelector('.track-play-icon i');
                if (playIcon) {
                    playIcon.className = 'bi bi-play-fill';
                }
                
                // Reset track name
                const trackName = row.querySelector('.track-name');
                if (trackName) {
                    trackName.classList.remove('playing');
                }
            }
        });
    }

    // Function to format duration for playlist display
    function formatDuration(seconds) {
        if (!seconds || isNaN(seconds)) return '0:00';
        
        const mins = Math.floor(seconds / 60);
        const hours = Math.floor(mins / 60);
        
        if (hours > 0) {
            const remainingMins = (mins % 60).toString().padStart(2, '0');
            return `${hours}:${remainingMins}:00`;
        } else {
            const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
            return `${mins}:${secs}`;
        }
    }

    // Function to find a playlist by its ID
    function findPlaylistById(playlistId) {
        if (!playlistId) return null;
        
        // Search through all custom playlists
        return playerState.customPlaylists.find(playlist => playlist.id === playlistId);
    }

    // Function to create shuffled indices for playlists
    function createShuffledIndices(count) {
        if (!count || count <= 0) return [0];
        
        // Create an array of indices
        const indices = Array.from({ length: count }, (_, i) => i);
        
        // Shuffle using Fisher-Yates algorithm
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        
        return indices;
    }

    // Function to load tracks from the file system audio folder
    async function loadTracksFromAudioFolder() {
        console.log("Loading tracks from audio folder...");
        
        // Get list of audio files from the audio directory
        const audioFiles = [
            "The Weeknd - Starboy ft. Daft Punk (Official Video).mp3",
            "brutal.mp3",
            "Strangers By Nature.mp3",
            "Billie Eilish - Happier Than Ever (Official Music Video).mp3",
            "Justice - D.A.N.C.E. (Official Video).mp3",
            "BTS (방탄소년단) 'Butter' Official MV.mp3",
            "Ariana Grande - positions (official video).mp3",
            "Doja Cat - I Don't Do Drugs (Visualizer) ft. Ariana Grande.mp3",
            "Lady Gaga - Chromatica I (Audio).mp3",
            "Dua Lipa - Future Nostalgia (Official Lyrics Video).mp3",
            "The Weeknd - After Hours (Audio).mp3",
            "Tere Sang Yaara - Full Video  Rustom  Akshay Kumar & Ileana D'cruz  Arko ft. Atif Aslam  Manoj M.mp3",
            "Full Song_ KHAIRIYAT (BONUS TRACK)  CHHICHHORE  Sushant, Shraddha  Pritam, Amitabh BArijit Singh.mp3",
            "Raabta (Kehte Hain Khuda) Full Song With Lyrics  Agent Vinod  Saif Ali Khan, Kareena Kapoor,Pritam.mp3",
            "Himesh Reshammiya, Ankit Tiwari, Palak Muchhal - Sanam Teri Kasam - Title Song (Lyric Video).mp3",
            "Saware FULL VIDEO Song - Arijit Singh  Phantom  T-Series.mp3"
        ];
        
        // Create tracks from audio files
        const audioTracks = audioFiles.map(filename => {
            // Extract title, artist from filename
            const fileNameWithoutExt = filename.split('.').slice(0, -1).join('.');
            let artist = 'Unknown Artist';
            let title = fileNameWithoutExt;
            
            // Extract artist and title using different patterns
            if (fileNameWithoutExt.includes(' - ')) {
                // Pattern: "Artist - Title"
                const parts = fileNameWithoutExt.split(' - ');
                artist = parts[0].trim();
                title = parts.slice(1).join(' - ').trim();
            } else if (fileNameWithoutExt.includes("'")) {
                // Pattern: "Artist 'Title'"
                const parts = fileNameWithoutExt.split("'");
                artist = parts[0].trim();
                title = parts.slice(1).join("'").replace(/'/g, '').trim();
            } else if (fileNameWithoutExt.match(/^[^(]+\([^)]+\)/)) {
                // Pattern: "Title (Artist)"
                const match = fileNameWithoutExt.match(/^([^(]+)\(([^)]+)\)/);
                if (match) {
                    title = match[1].trim();
                    artist = match[2].trim();
                }
            }
            
            // Clean up titles containing "Official Video", "Full Video", etc.
            const cleanupPatterns = [
                /\(Official Video\)/i, /\(Official Music Video\)/i, /\(Lyric Video\)/i, 
                /\(Audio\)/i, /\(Visualizer\)/i, /Official MV/i, /Full Video/i,
                /Full Song/i, /FULL VIDEO Song/i
            ];
            
            cleanupPatterns.forEach(pattern => {
                title = title.replace(pattern, '').trim();
            });
            
            // Generate unique ID
            const trackId = 'audio_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            
            return {
                id: trackId,
                title: title,
                artist: artist,
                album: 'Audio Folder',
                duration: 0, // Will be updated when audio loads
                cover: 'images/music-placeholder.png',
                audio: 'audio/' + filename,
                fileName: filename,
                dateAdded: new Date().toISOString(),
                source: 'audio-folder'
            };
        });
        
        console.log(`Created ${audioTracks.length} track objects from audio folder`);
        
        // Get metadata (duration) for each track
        const tracksWithMetadata = await Promise.all(
            audioTracks.map(track => {
                return new Promise(resolve => {
                    const audio = new Audio();
                    
                    audio.addEventListener('loadedmetadata', function() {
                        // Update track with duration info
                        track.duration = audio.duration;
                        console.log(`Got duration for ${track.title}: ${track.duration}s`);
                        resolve(track);
                    });
                    
                    audio.addEventListener('error', function() {
                        console.error(`Failed to load metadata for ${track.title}`);
                        // Still resolve but with 0 duration
                        resolve(track);
                    });
                    
                    // Load the audio to get metadata
                    audio.src = track.audio;
                });
            })
        );
        
        console.log(`Loaded metadata for ${tracksWithMetadata.length} tracks`);
        
        // Check for matching tracks in the player state and update their audio paths
        tracksWithMetadata.forEach(newTrack => {
            // First check if we already have this track in uploaded tracks by filename
            const existingUploadedTrack = playerState.uploadedTracks.find(
                track => track.fileName === newTrack.fileName
            );
            
            if (existingUploadedTrack) {
                console.log(`Found existing uploaded track for ${newTrack.fileName}`);
                existingUploadedTrack.audio = newTrack.audio;
                return;
            }
            
            // Try to find similar tracks from the main player state or sample tracks
            // using various matching criteria
            const allTracks = [...playerState.uploadedTracks, ...playerState.queue];
            
            // Try exact title and artist match
            const exactMatch = allTracks.find(track => 
                track.title.toLowerCase() === newTrack.title.toLowerCase() && 
                track.artist.toLowerCase() === newTrack.artist.toLowerCase()
            );
            
            if (exactMatch) {
                console.log(`Found exact match for "${newTrack.title}" by ${newTrack.artist}`);
                exactMatch.audio = newTrack.audio;
                return;
            }
            
            // Try fuzzy title match (title contains or is contained in)
            let fuzzyTitleMatch = allTracks.find(track => {
                const trackTitle = track.title.toLowerCase();
                const newTitle = newTrack.title.toLowerCase();
                return trackTitle.includes(newTitle) || newTitle.includes(trackTitle);
            });
            
            if (fuzzyTitleMatch) {
                console.log(`Found fuzzy title match for "${newTrack.title}": "${fuzzyTitleMatch.title}"`);
                fuzzyTitleMatch.audio = newTrack.audio;
                return;
            }
            
            // If no match found, add this as a new track
            console.log(`No match found for "${newTrack.title}" - adding as new track`);
            playerState.uploadedTracks.push(newTrack);
            addUploadItem(newTrack, false);
        });
        
        // Update UI components
        updateSelectableSongs();
        
        // Update playlists
        createLocalSongsPlaylist();
        updateStorageDisplay();
        
        console.log("Finished loading tracks from audio folder");
        showToast(`Loaded ${tracksWithMetadata.length} tracks from audio folder`, 'success');
        
        return tracksWithMetadata;
    }

    // Function to create track object from audio file
    function createTrackFromAudioFile(fileName) {
        // First check if we have mapping data for this file
        if (typeof trackMapping !== 'undefined' && trackMapping[fileName]) {
            // Use the createPlayerTrack utility function if available
            if (typeof createPlayerTrack === 'function') {
                return createPlayerTrack(fileName);
            }
            
            // Otherwise create track manually from the mapping
            const trackData = trackMapping[fileName];
            return {
                id: trackData.id || 'audio_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                title: trackData.title,
                artist: trackData.artist,
                album: trackData.album,
                duration: 0, // Will be updated when audio loads
                cover: trackData.coverImage,
                audio: 'audio/' + fileName,
                fileName: fileName,
                dateAdded: new Date().toISOString(),
                source: 'audio-mapping',
                year: trackData.year,
                genre: trackData.genre
            };
        }
        
        // Fallback to original implementation if no mapping exists
        // Extract title, artist from filename
        const fileNameWithoutExt = fileName.split('.').slice(0, -1).join('.');
        let artist = 'Unknown Artist';
        let title = fileNameWithoutExt;
        
        // Extract artist and title using different patterns
        if (fileNameWithoutExt.includes(' - ')) {
            // Pattern: "Artist - Title"
            const parts = fileNameWithoutExt.split(' - ');
            artist = parts[0].trim();
            title = parts.slice(1).join(' - ').trim();
        } else if (fileNameWithoutExt.includes("'")) {
            // Pattern: "Artist 'Title'"
            const parts = fileNameWithoutExt.split("'");
            artist = parts[0].trim();
            title = parts.slice(1).join("'").replace(/'/g, '').trim();
        } else if (fileNameWithoutExt.match(/^[^(]+\([^)]+\)/)) {
            // Pattern: "Title (Artist)"
            const match = fileNameWithoutExt.match(/^([^(]+)\(([^)]+)\)/);
            if (match) {
                title = match[1].trim();
                artist = match[2].trim();
            }
        }
        
        // Clean up titles containing "Official Video", "Full Video", etc.
        const cleanupPatterns = [
            /\(Official Video\)/i, /\(Official Music Video\)/i, /\(Lyric Video\)/i, 
            /\(Audio\)/i, /\(Visualizer\)/i, /Official MV/i, /Full Video/i,
            /Full Song/i, /FULL VIDEO Song/i
        ];
        
        cleanupPatterns.forEach(pattern => {
            title = title.replace(pattern, '').trim();
        });
        
        // Generate unique ID
        const trackId = 'audio_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        
        // Get cover image using artist name
        const coverImage = getCoverForArtist(artist, title);
        
        return {
            id: trackId,
            title: title,
            artist: artist,
            album: 'Audio Files',
            duration: 0, // Will be updated when audio loads
            cover: coverImage,
            audio: 'audio/' + fileName,
            fileName: fileName,
            dateAdded: new Date().toISOString(),
            source: 'audio-folder'
        };
    }

    // Helper function to find tracks by artist
    function findTracksByArtist(artistName) {
        // First check if we have the mapping utility function
        if (typeof getTracksByArtist === 'function') {
            const mappedTracks = getTracksByArtist(artistName);
            if (mappedTracks.length > 0) {
                // Convert to player track objects
                return mappedTracks.map(track => createTrackFromAudioFile(track.filename));
            }
        }
        
        // Fallback to original implementation
        const results = [];
        
        // Check uploaded tracks
        if (playerState.uploadedTracks && playerState.uploadedTracks.length > 0) {
            playerState.uploadedTracks.forEach(track => {
                if (track.artist && track.artist.toLowerCase().includes(artistName.toLowerCase())) {
                    results.push(track);
                }
            });
        }
        
        // Check audio folder tracks using mapping if available
        if (typeof trackMapping !== 'undefined') {
            for (const [filename, trackData] of Object.entries(trackMapping)) {
                if (trackData.artist.toLowerCase().includes(artistName.toLowerCase())) {
                    results.push(createTrackFromAudioFile(filename));
                }
            }
        } else {
            // Fallback to checking audio folder directly
            const audioFiles = [
                "The Weeknd - Starboy ft. Daft Punk (Official Video).mp3",
                "brutal.mp3",
                "Strangers By Nature.mp3",
                "Billie Eilish - Happier Than Ever (Official Music Video).mp3",
                "Justice - D.A.N.C.E. (Official Video).mp3",
                "BTS (방탄소년단) 'Butter' Official MV.mp3",
                "Ariana Grande - positions (official video).mp3",
                "Doja Cat - I Don't Do Drugs (Visualizer) ft. Ariana Grande.mp3",
                "Lady Gaga - Chromatica I (Audio).mp3",
                "Dua Lipa - Future Nostalgia (Official Lyrics Video).mp3",
                "The Weeknd - After Hours (Audio).mp3",
                "Tere Sang Yaara - Full Video  Rustom  Akshay Kumar & Ileana D'cruz  Arko ft. Atif Aslam  Manoj M.mp3",
                "Full Song_ KHAIRIYAT (BONUS TRACK)  CHHICHHORE  Sushant, Shraddha  Pritam, Amitabh BArijit Singh.mp3",
                "Raabta (Kehte Hain Khuda) Full Song With Lyrics  Agent Vinod  Saif Ali Khan, Kareena Kapoor,Pritam.mp3",
                "Himesh Reshammiya, Ankit Tiwari, Palak Muchhal - Sanam Teri Kasam - Title Song (Lyric Video).mp3",
                "Saware FULL VIDEO Song - Arijit Singh  Phantom  T-Series.mp3"
            ];
            
            audioFiles.forEach(filename => {
                const track = createTrackFromAudioFile(filename);
                if (track.artist.toLowerCase().includes(artistName.toLowerCase())) {
                    results.push(track);
                }
            });
        }
        
        return results;
    }

    // Helper function to get cover image for a specific artist - updated with correct image paths
    function getCoverForArtist(artist, title) {
        const artistMap = {
            'The Weeknd': 'images/starboy.jpeg',
            'Weeknd': 'images/afterhours.jpg',
            'Dua Lipa': 'images/hq720.jpg', // Using this as Dua Lipa cover
            'Billie Eilish': 'images/happier than ever.jpg',
            'BTS': 'images/butter.png',
            'Ariana Grande': 'images/position.jpg',
            'Doja Cat': 'images/planet her ].jpg',
            'Olivia Rodrigo': 'images/sour.jpg',
            'Adele': 'images/30.jpg',
            'Lady Gaga': 'images/cromatica.jpg',
            'Justice': 'images/justice.jpg',
            'Arijit Singh': 'images/Phantom-Hindi-2015-500x500.jpg',
            'Ankit Tiwari': 'images/sanam teri kasam.jpg',
            'Atif Aslam': 'images/tere sang yara.jpg',
            'Pritam': 'images/raabta.jpg',
            'Khairiyat': 'images/khariyat.jpg'
        };
        
        // Try to find an exact match first
        if (artistMap[artist]) {
            return artistMap[artist];
        }
        
        // If not, try fuzzy match (check if any part of the artist name appears in our map)
        for (const [key, value] of Object.entries(artistMap)) {
            if (artist && key && (artist.toLowerCase().includes(key.toLowerCase()) || 
                key.toLowerCase().includes(artist.toLowerCase()))) {
                return value;
            }
        }
        
        console.log(`No cover image found for artist: ${artist}, using generated placeholder`);
        // Return a generated placeholder image
        return getImagePlaceholder(title, artist);
    }

    // Helper function to create placeholder for missing images
    function getImagePlaceholder(title, artist) {
        // Default to a solid color with text if image is missing
        const colors = [
            '#1DB954', // Spotify green
            '#3D5AFE', // Blue
            '#FF4081', // Pink
            '#FF9100', // Orange
            '#00BFA5', // Teal
            '#6200EA', // Purple
            '#C51162', // Dark pink
            '#2962FF'  // Bright blue
        ];
        
        // Generate a consistent color based on the string
        const hashCode = (str) => {
            let hash = 0;
            if (!str) str = 'music';
            for (let i = 0; i < str.length; i++) {
                hash = ((hash << 5) - hash) + str.charCodeAt(i);
                hash |= 0; // Convert to 32bit integer
            }
            return Math.abs(hash);
        };
        
        const colorIndex = hashCode((title || '') + (artist || '')) % colors.length;
        const bgColor = colors[colorIndex];
        
        // Create a data URL for a colored rectangle
        const getInitials = (name) => {
            if (!name) return '♪';
            return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
        };
        
        const artistInitials = getInitials(artist);
        
        // Create a data URL for an SVG image with text
        return `data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
                <rect width="200" height="200" fill="${bgColor}" />
                <text x="100" y="100" font-family="Arial, sans-serif" font-size="80" font-weight="bold" fill="rgba(255,255,255,0.8)" text-anchor="middle" dominant-baseline="middle">${artistInitials}</text>
                <text x="100" y="150" font-family="Arial, sans-serif" font-size="16" fill="rgba(255,255,255,0.9)" text-anchor="middle">${artist || 'Unknown Artist'}</text>
            </svg>
        `)}`;
    }

    // Update the UI for the currently playing track
    function updateCurrentTrackUI(track) {
        if (!track) return;
        
        console.log("Updating UI for track:", track);
        
        // Update player info
        const playerTrackTitle = document.querySelector('.player-track-title');
        const playerTrackArtist = document.querySelector('.player-track-artist');
        const playerTrackCover = document.querySelector('.player-track-cover img');
        
        if (playerTrackTitle) playerTrackTitle.textContent = track.title || 'Unknown Title';
        if (playerTrackArtist) playerTrackArtist.textContent = track.artist || 'Unknown Artist';
        
        // Update cover image with error handling
        if (playerTrackCover) {
            const trackImage = getTrackImage(track);
            
            // If it's an SVG placeholder (data URL)
            if (trackImage.startsWith('data:')) {
                playerTrackCover.src = trackImage;
            } 
            // Otherwise it's a file path
            else {
                // Set a temporary placeholder while loading
                const tempColor = '#1DB954';
                
                // Use SVG placeholder initially
                playerTrackCover.src = `data:image/svg+xml,${encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
                        <rect width="200" height="200" fill="${tempColor}" />
                        <text x="100" y="100" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle">Loading...</text>
                    </svg>
                `)}`;
                
                // Try to load the actual image
                const img = new Image();
                img.onload = function() {
                    playerTrackCover.src = trackImage;
                };
                img.onerror = function() {
                    console.error(`Failed to load cover image: ${trackImage}`);
                    // Use generated placeholder on error
                    playerTrackCover.src = getImagePlaceholder(track.title, track.artist);
                };
                img.src = trackImage;
            }
        }
        
        // Also update mini player if available
        const miniPlayerImg = document.querySelector('.now-playing-img');
        if (miniPlayerImg) {
            miniPlayerImg.src = getTrackImage(track);
        }
        
        // Update currently playing class on song list
        document.querySelectorAll('.song-item').forEach(item => {
            if (item.dataset.id === track.id) {
                item.classList.add('currently-playing');
            } else {
                item.classList.remove('currently-playing');
            }
        });
        
        // Make sure the main player is visible
        const playerControls = document.querySelector('.player-controls');
        if (playerControls) {
            playerControls.style.display = 'flex';
        }
    }

    // ... existing code ...

    // Start the player
    init();
});

// Get the now playing UI
function getNowPlayingView() {
    if (!window.currentTrack) return '';
    
    // Get cover image with fallback
    let coverImage = getTrackImage(window.currentTrack);
    
    return `
    <div class="now-playing-page">
        <div class="back-button">
            <i class="fas fa-arrow-left"></i> Back to Home
        </div>
        <div class="now-playing-container">
            <div class="now-playing-cover">
                <img src="${coverImage}" alt="${window.currentTrack.title} cover">
            </div>
            <div class="now-playing-info">
                <h2 class="now-playing-title">${window.currentTrack.title || 'Unknown Title'}</h2>
                <h3 class="now-playing-artist">${window.currentTrack.artist || 'Unknown Artist'}</h3>
                <p class="now-playing-album">${window.currentTrack.album || 'Unknown Album'}</p>
                
                <div class="progress-container">
                    <span class="current-time">0:00</span>
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                        <div class="progress-handle"></div>
                    </div>
                    <span class="total-time">0:00</span>
                </div>
                
                <div class="now-playing-controls">
                    <button class="control-button shuffle-button">
                        <i class="fas fa-random"></i>
                    </button>
                    <button class="control-button prev-button">
                        <i class="fas fa-step-backward"></i>
                    </button>
                    <button class="control-button play-pause-button">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="control-button next-button">
                        <i class="fas fa-step-forward"></i>
                    </button>
                    <button class="control-button repeat-button">
                        <i class="fas fa-repeat"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
}

// Open the Now Playing view
function openNowPlayingView() {
    const mainContent = document.querySelector('.main-content');
    const contentPages = document.querySelector('.content-pages');
    const container = contentPages || mainContent;
    
    // Hide all existing pages
    const allPages = container.querySelectorAll('.content-page');
    allPages.forEach(page => {
        page.style.display = 'none';
    });
    
    // Remove existing now playing page if it exists
    const existingNowPlayingPage = document.querySelector('.now-playing-page');
    if (existingNowPlayingPage) {
        existingNowPlayingPage.remove();
    }
    
    // Create now playing page element
    const nowPlayingPage = document.createElement('div');
    nowPlayingPage.className = 'content-page now-playing-page';
    nowPlayingPage.innerHTML = getNowPlayingView();
    container.appendChild(nowPlayingPage);
    
    // Add event listeners to the back button
    const backButton = nowPlayingPage.querySelector('.back-button');
    backButton.addEventListener('click', () => {
        nowPlayingPage.style.display = 'none';
        // Show the home page or last active page
        const homePage = document.querySelector('.home-page') || document.querySelector('.content-page');
        if (homePage) {
            homePage.style.display = 'block';
        }
    });
    
    // Add event listeners to player controls in now playing view
    const playPauseButton = nowPlayingPage.querySelector('.play-pause-button');
    playPauseButton.addEventListener('click', togglePlayPause);
    
    const prevButton = nowPlayingPage.querySelector('.prev-button');
    prevButton.addEventListener('click', playPreviousTrack);
    
    const nextButton = nowPlayingPage.querySelector('.next-button');
    nextButton.addEventListener('click', playNextTrack);
    
    const shuffleButton = nowPlayingPage.querySelector('.shuffle-button');
    shuffleButton.addEventListener('click', toggleShuffle);
    
    const repeatButton = nowPlayingPage.querySelector('.repeat-button');
    repeatButton.addEventListener('click', toggleRepeat);
    
    // Set up progress bar functionality
    const progressBar = nowPlayingPage.querySelector('.progress-bar');
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        if (audioPlayer && !isNaN(audioPlayer.duration)) {
            audioPlayer.currentTime = pos * audioPlayer.duration;
            updateProgressBar();
        }
    });
    
    // Setup timeupdate event listener to update progress continuously
    if (audioPlayer) {
        audioPlayer.addEventListener('timeupdate', updateProgressBar);
    } else if (playerState.audioElement) {
        playerState.audioElement.addEventListener('timeupdate', updateProgressBar);
    }
    
    // Update the UI to reflect current state
    updateNowPlayingUI();
}

// Update Now Playing UI to reflect current state
function updateNowPlayingUI() {
    // Update the now playing page if it exists
    const nowPlayingPage = document.querySelector('.now-playing-page');
    if (nowPlayingPage && window.currentTrack) {
        const playPauseButton = nowPlayingPage.querySelector('.play-pause-button');
        if (playPauseButton) {
            if (audioPlayer && !audioPlayer.paused) {
                playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
            }
        }
    }
    
    // Update the main player controls play button
    const mainPlayBtn = document.querySelector('.player-controls .play-btn');
    if (mainPlayBtn) {
        if (playerState.audioElement && !playerState.audioElement.paused && playerState.isPlaying) {
            mainPlayBtn.className = 'bi bi-pause-circle-fill play-btn';
        } else {
            mainPlayBtn.className = 'bi bi-play-circle-fill play-btn';
        }
    }
    
    // Also update the play/pause icon in the playlist detail view if it exists
    const playlistDetailPlayButton = document.querySelector('.playlist-detail-page .play-all-button');
    if (playlistDetailPlayButton && window.currentTrack) {
        const isPlayingFromCurrentPlaylist = 
            playerState.currentPlaylist && 
            document.querySelector('.playlist-detail-page').dataset.playlistId === playerState.currentPlaylist.id;
            
        if (isPlayingFromCurrentPlaylist && playerState.audioElement && !playerState.audioElement.paused) {
            playlistDetailPlayButton.innerHTML = '<i class="bi bi-pause"></i> Pause';
        } else {
            playlistDetailPlayButton.innerHTML = '<i class="bi bi-play"></i> Play All';
        }
    }
    
    // Update all song rows in the playlist detail view
    updatePlaylistDetailPlayingStatus();
    
    // Update shuffle and repeat button states
    const shuffleButton = document.querySelector('.shuffle-button') || document.querySelector('.player-controls .bi-shuffle');
    if (shuffleButton) {
        if (playerState.isShuffle) {
            shuffleButton.classList.add('active');
        } else {
            shuffleButton.classList.remove('active');
        }
    }
    
    const repeatButton = document.querySelector('.repeat-button') || document.querySelector('.player-controls .bi-repeat');
    if (repeatButton) {
        if (playerState.isRepeat) {
            repeatButton.classList.add('active');
        } else {
            repeatButton.classList.remove('active');
        }
    }
}

// Add click event to mini player to open now playing view
function setupMiniPlayerEvents() {
    const miniPlayerCover = document.querySelector('.player-cover');
    const miniPlayerInfo = document.querySelector('.player-track-info');
    
    if (miniPlayerCover) {
        miniPlayerCover.addEventListener('click', openNowPlayingView);
    }
    
    if (miniPlayerInfo) {
        miniPlayerInfo.addEventListener('click', openNowPlayingView);
    }
}

// Update event listeners after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    
    // Setup events for mini player
    setupMiniPlayerEvents();
    
    // Initialize the music player
    init();
    
    // Ensure sidebar functionality is properly initialized
    setTimeout(() => {
        console.log("Initializing sidebar functionality...");
        const sidebar = document.querySelector('.sidebar');
        const sidebarToggle = document.querySelector('.sidebar-toggle');
        const overlay = document.querySelector('.sidebar-overlay');
        
        if (sidebar && !sidebar.classList.contains('mobile-sidebar') && window.innerWidth <= 768) {
            sidebar.classList.add('mobile-sidebar');
        }
        
        if (!sidebarToggle && window.innerWidth <= 768) {
            const topNav = document.querySelector('.top-nav');
            if (topNav) {
                const toggleBtn = document.createElement('button');
                toggleBtn.className = 'sidebar-toggle';
                toggleBtn.innerHTML = '<i class="bi bi-list"></i>';
                topNav.prepend(toggleBtn);
                
                toggleBtn.addEventListener('click', function() {
                    sidebar.classList.toggle('show-sidebar');
                    if (overlay) {
                        overlay.classList.toggle('show-overlay');
                    }
                });
            }
        }
        
        if (overlay) {
            overlay.addEventListener('click', function() {
                sidebar.classList.remove('show-sidebar');
                overlay.classList.remove('show-overlay');
            });
        }
    }, 500);
});

// Helper function to get universal track image
function getTrackImage(track) {
    if (!track) {
        return 'images/music-placeholder.png';
    }
    
    // First check if the track has a valid cover property
    if (track.cover && track.cover !== 'default' && track.cover !== 'path/to/default-cover.jpg') {
        return track.cover;
    }
    
    // Then check if it has artwork property
    if (track.artwork) {
        return track.artwork;
    }
    
    // If artist is available, try to get a cover image for the artist
    if (track.artist) {
        const artistCover = getCoverForArtist(track.artist, track.title);
        if (artistCover && !artistCover.startsWith('data:')) {
            return artistCover;
        }
    }
    
    // Finally, generate a placeholder if nothing else works
    return getImagePlaceholder(track.title, track.artist);
}

// Helper function to get cover image for a specific artist - updated with correct image paths
function getCoverForArtist(artist, title) {
    const artistMap = {
        'The Weeknd': 'images/starboy.jpeg',
        'Weeknd': 'images/afterhours.jpg',
        'Dua Lipa': 'images/hq720.jpg', // Using this as Dua Lipa cover
        'Billie Eilish': 'images/happier than ever.jpg',
        'BTS': 'images/butter.png',
        'Ariana Grande': 'images/position.jpg',
        'Doja Cat': 'images/planet her ].jpg',
        'Olivia Rodrigo': 'images/sour.jpg',
        'Adele': 'images/30.jpg',
        'Lady Gaga': 'images/cromatica.jpg',
        'Justice': 'images/justice.jpg',
        'Arijit Singh': 'images/Phantom-Hindi-2015-500x500.jpg',
        'Ankit Tiwari': 'images/sanam teri kasam.jpg',
        'Atif Aslam': 'images/tere sang yara.jpg',
        'Pritam': 'images/raabta.jpg',
        'Khairiyat': 'images/khariyat.jpg'
    };
    
    // Try to find an exact match first
    if (artistMap[artist]) {
        return artistMap[artist];
    }
    
    // If not, try fuzzy match (check if any part of the artist name appears in our map)
    for (const [key, value] of Object.entries(artistMap)) {
        if (artist && key && (artist.toLowerCase().includes(key.toLowerCase()) || 
            key.toLowerCase().includes(artist.toLowerCase()))) {
            return value;
        }
    }
    
    console.log(`No cover image found for artist: ${artist}, using generated placeholder`);
    // Return a generated placeholder image
    return getImagePlaceholder(title, artist);
}

// Function to generate HTML for tracks in playlist detail
function generatePlaylistSongsList(tracks, playlistId) {
    if (!tracks || tracks.length === 0) {
        return `<div class="empty-songs-message">No songs in this playlist yet</div>`;
    }
    
    return tracks.map((track, index) => {
        const isPlaying = playerState.currentTrack && playerState.currentTrack.id === track.id;
        const isLiked = playerState.likedSongs && playerState.likedSongs.some(t => t.id === track.id);
        const trackImage = getTrackImage(track);
        
        return `
            <div class="playlist-song ${isPlaying ? 'playing' : ''}" data-id="${track.id}" data-index="${index}" data-playlist="${playlistId}">
                <div class="song-number">
                    <span class="number">${index + 1}</span>
                    <span class="play-icon"><i class="bi bi-play-fill"></i></span>
                    <span class="pause-icon"><i class="bi bi-pause-fill"></i></span>
                </div>
                <div class="song-details">
                    <img src="${trackImage}" alt="${track.title}" class="song-img">
                    <div class="song-info">
                        <div class="song-title ${isPlaying ? 'playing' : ''}">${track.title}</div>
                        <div class="song-artist">${track.artist}</div>
                    </div>
                </div>
                <div class="song-duration">${formatDuration(track.duration || 0)}</div>
                <div class="song-actions">
                    <button class="like-button ${isLiked ? 'liked' : ''}">
                        <i class="bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'}"></i>
                    </button>
                    <button class="more-button">
                        <i class="bi bi-three-dots"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Function to show a specific tab by index with improved navigation handling
function showTab(index, updateSidebar = false) {
    console.log(`Showing tab at index: ${index}`);
    
    // Validate index
    if (index === undefined || index === null || index < 0 || index >= elements.contentPages.length) {
        console.warn(`Invalid tab index: ${index}, defaulting to 0`);
        index = 0; // Default to first tab
    }
    
    // Store current tab for state management
    playerState.currentTabIndex = index;
    saveToLocalStorage('currentTabIndex', index);
    
    // Hide all pages
    elements.contentPages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const selectedPage = elements.contentPages[index];
    if (selectedPage) {
        selectedPage.classList.add('active');
        
        // Update tab highlighting
        elements.tabItems.forEach(tab => tab.classList.remove('active'));
        if (elements.tabItems[index]) {
            elements.tabItems[index].classList.add('active');
        }
        
        // Get the tab name for specialized handling
        const tabName = elements.tabItems[index]?.textContent.trim() || '';
        
        // Initialize specific page content based on tab index and name
        if (index === 0 || tabName === 'Discover' || tabName === 'Dashboard') {
            // Discover page - ensure audio links are properly set up
            linkAudioFilesToDiscoverPage();
        } else if (index === 1 || tabName === 'My Uploads' || tabName.includes('Upload')) {
            // Upload page - initialize upload functionality
            initializeUploadPage();
            renderUploadedTracks();
        } else if (index === 2 || tabName === 'Playlist' || tabName === 'My Playlists') {
            // Playlist page - refresh playlist display
            renderPlaylists();
        } else if (index === 3 || tabName === 'History' || tabName === 'Last Played') {
            // History page - refresh history display
            renderLastPlayed();
        } else if (index === 4 || tabName === 'Recommended') {
            // Recommended page - refresh recommendations
            renderRecommendedSongs();
        }
        
        // Update sidebar if requested
        if (updateSidebar) {
            updateSidebarHighlight(tabName);
        }
        
        // Hide any open modals or overlays
        hideAllModals();
        
        // Update URL hash for deep linking (optional)
        window.location.hash = tabName.toLowerCase().replace(/\s+/g, '-');
    }
}

// Helper to update sidebar highlighting
function updateSidebarHighlight(activeTabName) {
    // Map tab names to sidebar item names (in case they differ)
    const tabToSidebarMap = {
        'Discover': 'Dashboard',
        'My Uploads': 'My Uploads',
        'Playlist': 'My Playlists',
        'My Playlists': 'My Playlists',
        'History': 'Last Played',
        'Last Played': 'Last Played',
        'Recommended': 'Recommended'
    };
    
    // Get the sidebar item name that corresponds to the active tab
    const sidebarItemToActivate = tabToSidebarMap[activeTabName] || activeTabName;
    
    // Update sidebar items
    elements.menuItems.forEach(item => {
        const itemName = item.querySelector('span')?.textContent.trim() || '';
        if (itemName === sidebarItemToActivate) {
            elements.menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        }
    });
}

// Helper to hide any active modals or overlays
function hideAllModals() {
    // Hide playlist detail view if open
    const playlistDetailView = document.querySelector('.playlist-detail-page');
    if (playlistDetailView && playlistDetailView.classList.contains('active')) {
        playlistDetailView.classList.remove('active');
    }
    
    // Hide now playing view if open in modal mode
    const nowPlayingView = document.querySelector('.now-playing-view');
    if (nowPlayingView && nowPlayingView.style.display === 'block') {
        nowPlayingView.style.display = 'none';
    }
    
    // Hide any other modals or overlays
    const overlays = document.querySelectorAll('.modal, .overlay');
    overlays.forEach(overlay => {
        overlay.style.display = 'none';
    });
}

// Initialize the upload page
function initializeUploadPage() {
    console.log('Initializing upload page...');
    
    try {
        // Setup file input event listener
        const fileInput = document.getElementById('file-upload');
        if (fileInput && !fileInput.hasListenerAttached) {
            // Remove any existing listeners first to prevent duplicates
            const newFileInput = fileInput.cloneNode(true);
            fileInput.parentNode.replaceChild(newFileInput, fileInput);
            
            // Add fresh event listener
            newFileInput.addEventListener('change', function(e) {
                const files = this.files;
                if (files && files.length > 0) {
                    handleFiles(files);
                }
            });
            newFileInput.hasListenerAttached = true;
            console.log('File input listener attached');
        }
        
        // Setup drag and drop area
        const uploadArea = document.querySelector('.upload-area');
        if (uploadArea && !uploadArea.hasListenerAttached) {
            // Create handler functions for each event
            const dragOverHandler = (e) => {
                e.preventDefault();
                e.stopPropagation();
                uploadArea.classList.add('drag-over');
            };
            
            const dragLeaveHandler = (e) => {
                e.preventDefault();
                e.stopPropagation();
                uploadArea.classList.remove('drag-over');
            };
            
            const dropHandler = (e) => {
                e.preventDefault();
                e.stopPropagation();
                uploadArea.classList.remove('drag-over');
                
                if (e.dataTransfer.files.length > 0) {
                    handleFiles(e.dataTransfer.files);
                }
            };
            
            // Remove any existing listeners first to prevent duplicates
            uploadArea.removeEventListener('dragover', dragOverHandler);
            uploadArea.removeEventListener('dragleave', dragLeaveHandler);
            uploadArea.removeEventListener('drop', dropHandler);
            
            // Add fresh event listeners
            uploadArea.addEventListener('dragover', dragOverHandler);
            uploadArea.addEventListener('dragleave', dragLeaveHandler);
            uploadArea.addEventListener('drop', dropHandler);
            
            uploadArea.hasListenerAttached = true;
            console.log('Drag and drop listeners attached');
        }
        
        // Setup storage management buttons
        const checkStorageBtn = document.getElementById('check-storage');
        if (checkStorageBtn && !checkStorageBtn.hasListenerAttached) {
            checkStorageBtn.addEventListener('click', updateStorageDisplay);
            checkStorageBtn.hasListenerAttached = true;
        }
        
        const clearStorageBtn = document.getElementById('clear-storage');
        if (clearStorageBtn && !clearStorageBtn.hasListenerAttached) {
            clearStorageBtn.addEventListener('click', function() {
                if (confirm('Are you sure you want to delete all your music? This cannot be undone.')) {
                    // Clear all tracks
                    playerState.uploadedTracks = [];
                    
                    // Update UI
                    renderUploadedTracks();
                    
                    // Clear IndexedDB
                    if (indexedDBManager) {
                        indexedDBManager.clearAllTracks().then(success => {
                            if (success) {
                                showToast('All music has been deleted', 'success');
                                updateStorageDisplay();
                            } else {
                                showToast('Error clearing music storage', 'error');
                            }
                        });
                    }
                    
                    // Update storage display
                    updateStorageDisplay();
                }
            });
            clearStorageBtn.hasListenerAttached = true;
        }
        
        // Update storage display
        if (typeof updateStorageDisplay === 'function') {
            updateStorageDisplay();
        }
    } catch (error) {
        console.error('Error initializing upload page:', error);
        showToast('Error initializing upload functionality', 'error');
    }
}

// Function to toggle play/pause state
function togglePlayPause() {
    // Use the existing togglePlay function if the track exists
    if (playerState.currentTrack || window.currentTrack) {
        togglePlay();
    } else {
        // If no track is loaded, try to play the first track from the queue
        const tracks = playerState.queue;
        if (tracks && tracks.length > 0) {
            playTrack(tracks[0]);
        } else {
            showToast("No tracks available to play", "error");
        }
    }
}

// Function to play previous track
function playPreviousTrack() {
    // Use the existing playPrev function if a track exists
    if (playerState.currentTrack || window.currentTrack) {
        playPrev();
    } else {
        showToast("No current track playing", "info");
    }
}

// Function to play next track
function playNextTrack() {
    // Use the existing playNext function if a track exists
    if (playerState.currentTrack || window.currentTrack) {
        playNext();
    } else {
        showToast("No current track playing", "info");
    }
}

// Update the progress bar in the now playing view
function updateProgressBar() {
    const nowPlayingPage = document.querySelector('.now-playing-page');
    if (!nowPlayingPage) return;
    
    const progressFill = nowPlayingPage.querySelector('.progress-fill');
    const progressHandle = nowPlayingPage.querySelector('.progress-handle');
    const currentTimeEl = nowPlayingPage.querySelector('.current-time');
    const totalTimeEl = nowPlayingPage.querySelector('.total-time');
    
    if (audioPlayer && !isNaN(audioPlayer.duration)) {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        
        if (progressFill) {
            progressFill.style.width = `${percent}%`;
        }
        
        if (progressHandle) {
            progressHandle.style.left = `${percent}%`;
        }
        
        if (currentTimeEl) {
            currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
        }
        
        if (totalTimeEl) {
            totalTimeEl.textContent = formatTime(audioPlayer.duration);
        }
    }
}
