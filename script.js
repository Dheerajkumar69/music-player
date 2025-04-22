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
                // Add current track to history before moving to next
                addToPlayHistory(playerState.currentTrack);
                
                // Play the next track
                playNext();
            }
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
            
            // Ensure we have a track loaded
            if (!playerState.currentTrack) return;
            
            // Start tracking mouse movement for dragging
            const handleDrag = function(e) {
                const width = elements.progressContainer.clientWidth;
                const clickX = Math.min(Math.max(0, e.clientX - elements.progressContainer.getBoundingClientRect().left), width);
                // Use the audio element's duration if available, otherwise fall back to track duration
                const duration = playerState.audioElement.duration || playerState.currentTrack.duration;
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
                // Use the audio element's duration if available, otherwise fall back to track duration
                const duration = playerState.audioElement.duration || playerState.currentTrack.duration;
                
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
                        // Call showTab function to handle tab switching
                        showTab(tabIndex, true);
                    }
                } else {
                    console.warn(`No mapping found for sidebar item: ${menuText}`); // Debug
                    
                    // Fallback to old mapping if something went wrong
                    let tabIndex = -1;
                    
                    switch (menuText) {
                        case 'Dashboard':
                            tabIndex = 0; // Discover tab
                            break;
                        case 'Playlist':
                            tabIndex = 0; // Discover tab
                            break;
                        case 'Last Played':
                            tabIndex = 3; // Last Played tab
                            break;
                        case 'Recommended':
                            tabIndex = 4; // Recommended tab
                            break;
                        case 'My Uploads':
                            tabIndex = 1; // My Library tab
                            break;
                        case 'My Playlists':
                            tabIndex = 2; // Radio tab
                            break;
                    }
                    
                    if (tabIndex !== -1) {
                        // Call showTab function to handle tab switching
                        showTab(tabIndex, true);
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
            
            // Call specific render functions based on which tab is now active
            const lastPlayedIndex = Array.from(elements.contentPages).findIndex(page => page.classList.contains('last-played-page'));
            const recommendedIndex = Array.from(elements.contentPages).findIndex(page => page.classList.contains('recommended-page'));
            
            switch(tabIndex) {
                case lastPlayedIndex: // Last Played tab
                    renderLastPlayed();
                    break;
                case recommendedIndex: // Recommended tab
                    renderRecommendedSongs();
                    break;
                case 1: // Library tab
                    // Update library view if we have a render function for it
                    if (typeof renderLibrary === 'function') {
                        renderLibrary();
                    }
                    break;
                case 0: // Discover/Playlists tab
                    // Update playlists view if needed
                    if (typeof renderPlaylists === 'function') {
                        renderPlaylists();
                    }
                    break;
            }
            
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
            dateAdded: new Date().toISOString(),
            source: 'user-upload'
        };
        
        // Add loading placeholder to UI
        addUploadItem(newTrack, true);
        console.log(`Added loading placeholder for track: ${newTrack.title}`);
        
        // Create a file reader to process the file
        const tempAudio = new Audio();
        
        // Handle audio load to get duration
        tempAudio.addEventListener('loadedmetadata', async function() {
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
                    }
                } catch (err) {
                    console.error('IndexedDB save error:', err);
                    showToast(`Error saving "${newTrack.title}" - ${err.message}`, 'error');
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
            console.error('Error loading audio file:', e);
            showToast(`Error loading "${title}" - ${e.message || 'Unknown error'}`, 'error');
            
            // Remove loading placeholder
            const loadingItem = document.querySelector(`.upload-item[data-id="${newTrack.id}"]`);
            if (loadingItem) loadingItem.remove();
        });
        
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
        // Don't add duplicates
        const existingItem = document.querySelector(`.playlist-item[data-id="${playlist.id}"]`);
        if (existingItem) {
            // Just update the song count
            existingItem.querySelector('p').textContent = `${playlist.tracks.length} songs`;
            return;
        }
        
        const playlistItem = document.createElement('div');
        playlistItem.className = 'playlist-item';
        playlistItem.setAttribute('data-id', playlist.id);
        
        // Add special class for system playlists
        if (playlist.isSystem || playlist.id === 'liked-songs' || playlist.id === 'local-songs') {
            playlistItem.classList.add('system-playlist');
        }
        
        playlistItem.innerHTML = `
            <img src="${playlist.cover || 'images/playlist-default.jpg'}" alt="${playlist.name}">
            <div class="playlist-item-info">
                <h4>${playlist.name}</h4>
                <p>${playlist.tracks.length} songs</p>
            </div>
        `;
        
        // Add event listener to handle playlist click
        playlistItem.addEventListener('click', function() {
            openPlaylistDetail(playlist);
        });
        
        // Add to the appropriate section - system playlists at the top, user playlists below
        if (playlist.isSystem || playlist.id === 'liked-songs' || playlist.id === 'local-songs') {
            // Add at the beginning of the playlist list
            if (elements.customPlaylistsList.firstChild) {
                elements.customPlaylistsList.insertBefore(playlistItem, elements.customPlaylistsList.firstChild);
            } else {
                elements.customPlaylistsList.appendChild(playlistItem);
            }
        } else {
            // Add at the end for user-created playlists
            elements.customPlaylistsList.appendChild(playlistItem);
        }
    }
    
    // Add a playlist card to the playlists grid
    function addPlaylistCard(playlist) {
        const playlistCard = document.createElement('div');
        playlistCard.className = 'playlist-card';
        playlistCard.setAttribute('data-id', playlist.id);
        
        // Add a special class for system playlists
        if (playlist.id === 'liked-songs' || playlist.id === 'local-songs') {
            playlistCard.classList.add('system-playlist');
        }
        
        playlistCard.innerHTML = `
            <div class="playlist-card-img">
                <img src="${playlist.cover || 'images/playlist-default.jpg'}" alt="${playlist.name}">
                <div class="play-overlay">
                    <i class="bi bi-play-circle-fill"></i>
                </div>
            </div>
            <div class="playlist-card-info">
                <h4>${playlist.name}</h4>
                <p>${playlist.tracks.length} songs</p>
            </div>
        `;
        
        // Add event listener to view playlist details
        playlistCard.addEventListener('click', function() {
            openPlaylistDetail(playlist);
        });
        
        // Add a play button that starts playing immediately
        const playOverlay = playlistCard.querySelector('.play-overlay');
        if (playOverlay) {
            playOverlay.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent opening the detail page
                
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
            });
        }
        
        elements.playlistsGrid.appendChild(playlistCard);
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
            
            // Trigger storage check after IndexedDB tracks are loaded
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
                    <img src="${track.cover}" alt="${track.title}">
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
        
        // Add event listeners to play buttons
        const playButtons = document.querySelectorAll('.play-history-btn');
        playButtons.forEach(button => {
            button.addEventListener('click', function() {
                const trackId = this.dataset.trackId;
                const track = findTrackById(trackId);
                if (track) {
                    playTrack(track);
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
        // Check in main tracks array
        let track = tracks.find(t => t.id === trackId);
        if (track) return track;
        
        // Check in uploaded tracks
        track = playerState.uploadedTracks.find(t => t.id === trackId);
        if (track) return track;
        
        // Check in play history (for tracks that might have been removed)
        track = playerState.playHistory.find(t => t.id === trackId);
        return track;
    }

    // Function to play a track directly
    function playTrack(track) {
        // Stop current playback
        playerState.audioElement.pause();
        
        // Set as current track
        playerState.currentTrack = track;
        playerState.audioElement.src = track.audio;
        
        // Update UI
        elements.nowPlayingImg.src = track.cover;
        elements.nowPlayingTitle.textContent = track.title;
        elements.nowPlayingArtist.textContent = track.artist;
        
        // Update play button
        elements.playBtn.classList.remove('bi-play-circle-fill');
        elements.playBtn.classList.add('bi-pause-circle-fill');
        
        // Start playing
        playerState.audioElement.play();
        playerState.isPlaying = true;
        
        // Add to history
        addToPlayHistory(track);
    }

    // Function to render recommended songs
    function renderRecommendedSongs() {
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
            
            if (recommendations.length > 0) {
                const groupEl = document.createElement('div');
                groupEl.className = 'recommendation-group';
                
                groupEl.innerHTML = `
                    <div class="recommendation-source">
                        <img src="${source.cover}" alt="${source.title}">
                        <div class="recommendation-source-info">
                            <h4>${source.title}</h4>
                            <p>${source.artist}</p>
                        </div>
                    </div>
                    <div class="recommendation-tracks">
                        ${recommendations.map(track => `
                            <div class="recommendation-track" data-track-id="${track.id}">
                                <img src="${track.cover}" alt="${track.title}">
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
                <img src="${artist.image}" alt="${artist.name}">
                <h4>${artist.name}</h4>
                <p>${artist.genre}</p>
                <button class="btn artist-explore-btn" data-artist="${artist.name}">
                    Explore
                </button>
            `;
            
            artistRecommendations.appendChild(artistCardEl);
        });
        
        // Add event listeners to recommendation tracks
        const recommendationTracks = document.querySelectorAll('.recommendation-track');
        recommendationTracks.forEach(trackEl => {
            trackEl.addEventListener('click', function() {
                const trackId = this.dataset.trackId;
                const track = findTrackById(trackId);
                if (track) {
                    playTrack(track);
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
                
                if (artistTracks.length > 0) {
                    // Create a playlist for this artist
                    const playlist = {
                        id: 'artist_' + Date.now(),
                        name: `${artistName}'s Music`,
                        description: `Music by ${artistName}`,
                        tracks: artistTracks,
                        cover: artistTracks[0].cover
                    };
                    
                    // Play the playlist
                    playPlaylist(playlist);
                }
            });
        });
    }

    // Helper function to generate recommendations based on a source track
    function generateRecommendations(sourceTrack) {
        const allTracks = [...tracks, ...playerState.uploadedTracks];
        
        // Get tracks by same artist
        const sameArtistTracks = allTracks.filter(track => 
            track.artist === sourceTrack.artist && track.id !== sourceTrack.id
        );
        
        // Get tracks from same genre or album
        const relatedTracks = allTracks.filter(track => 
            (track.genre === sourceTrack.genre || track.album === sourceTrack.album) && 
            track.id !== sourceTrack.id && 
            track.artist !== sourceTrack.artist
        );
        
        // Combine and shuffle recommendations
        let recommendations = [...sameArtistTracks, ...relatedTracks];
        
        // Filter out recently played tracks (except the source)
        const recentIds = playerState.playHistory.slice(0, 5).map(t => t.id);
        recommendations = recommendations.filter(track => 
            track.id !== sourceTrack.id && !recentIds.includes(track.id)
        );
        
        // Shuffle the array
        recommendations.sort(() => Math.random() - 0.5);
        
        // Return at most 4 recommendations
        return recommendations.slice(0, 4);
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
        // Hide all other pages first
        const allPages = document.querySelectorAll('.main-page');
        allPages.forEach(page => page.classList.remove('active'));
        
        // Check if playlist detail page already exists, create if not
        let playlistDetailPage = document.querySelector('.playlist-detail-page');
        if (!playlistDetailPage) {
            playlistDetailPage = document.createElement('div');
            playlistDetailPage.className = 'main-page playlist-detail-page';
            
            // Create page header
            const pageHeader = document.createElement('div');
            pageHeader.className = 'page-header';
            pageHeader.innerHTML = `
                <div class="header-back-btn">
                    <i class="bi bi-chevron-left"></i>
                </div>
                <h1>Playlist Details</h1>
            `;
            
            // Create content wrapper
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'playlist-detail-content';
            contentWrapper.innerHTML = `
                <div class="playlist-header-info"></div>
                <div class="playlist-actions">
                    <button class="btn primary-btn play-all-btn"><i class="bi bi-play-fill"></i> Play</button>
                    <button class="btn secondary-btn shuffle-btn"><i class="bi bi-shuffle"></i> Shuffle</button>
                </div>
                <div class="playlist-songs-list">
                    <p class="loading-text">Loading songs...</p>
                </div>
            `;
            
            playlistDetailPage.appendChild(pageHeader);
            playlistDetailPage.appendChild(contentWrapper);
            
            // Add the page to main content
            document.querySelector('.main-content').appendChild(playlistDetailPage);
            
            // Setup back button event
            pageHeader.querySelector('.header-back-btn').addEventListener('click', () => {
                navigateToPage('playlists');
            });
        }
        
        // Make playlist detail page active
        playlistDetailPage.classList.add('active');
        
        // Get playlist if ID was passed instead of full playlist object
        let actualPlaylist = playlist;
        if (typeof playlist === 'string') {
            actualPlaylist = findPlaylistById(playlist);
            
            if (!actualPlaylist) {
                showToast('Playlist not found');
                navigateToPage('playlists');
                return;
            }
        }
        
        // Update UI with playlist info
        updatePlaylistDetailUI(actualPlaylist);
        
        // Setup event listeners
        setupPlaylistDetailActions(actualPlaylist);
    }

    // Update playlist detail UI with playlist information
    function updatePlaylistDetailUI(playlist) {
        const playlistDetailPage = document.querySelector('.playlist-detail-page');
        if (!playlistDetailPage) return;
        
        // Update header info
        const headerInfo = playlistDetailPage.querySelector('.playlist-header-info');
        if (headerInfo) {
            // Get total duration of all songs
            const totalDuration = playlist.tracks ? playlist.tracks.reduce((total, track) => {
                return total + (track.duration || 0);
            }, 0) : 0;
            
            // Format duration as MM:SS
            const formattedDuration = formatDuration(totalDuration);
            
            headerInfo.innerHTML = `
                <div class="playlist-image-container">
                    <img src="${playlist.cover || 'images/playlist-default.jpg'}" alt="${playlist.name}" class="playlist-image">
                </div>
                <div class="playlist-info">
                    <h2 class="playlist-name">${playlist.name || 'Untitled Playlist'}</h2>
                    <p class="playlist-description">${playlist.description || 'No description'}</p>
                    <p class="playlist-stats">${playlist.tracks ? playlist.tracks.length : 0} songs • ${formattedDuration}</p>
                </div>
            `;
        }
        
        // Generate songs list
        generatePlaylistSongsList(playlist);
    }

    // Generate song list for playlist
    function generatePlaylistSongsList(playlist) {
        const songsListContainer = document.querySelector('.playlist-detail-page .playlist-songs-list');
        if (!songsListContainer) return;
        
        // Clear previous content
        songsListContainer.innerHTML = '';
        
        if (!playlist.tracks || playlist.tracks.length === 0) {
            songsListContainer.innerHTML = '<p class="empty-playlist">This playlist has no songs yet.</p>';
            return;
        }
        
        // Create songs list
        playlist.tracks.forEach((track, index) => {
            const songItem = document.createElement('div');
            songItem.className = 'song-item';
            songItem.dataset.index = index;
            songItem.dataset.id = track.id;
            
            // Check if song is currently playing
            const isPlaying = playerState.currentTrack && playerState.currentTrack.id === track.id;
            if (isPlaying) {
                songItem.classList.add('playing');
            }
            
            // Check if song is liked
            const isLiked = playerState.likedSongs.some(likedTrack => likedTrack.id === track.id);
            
            songItem.innerHTML = `
                <div class="song-number">${index + 1}</div>
                <div class="song-play-btn">
                    <i class="bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'}"></i>
                </div>
                <div class="song-info">
                    <div class="song-title">${track.title || 'Unknown Title'}</div>
                    <div class="song-artist">${track.artist || 'Unknown Artist'}</div>
                </div>
                <div class="song-album">${track.album || 'Unknown Album'}</div>
                <div class="song-duration">${formatDuration(track.duration)}</div>
                <div class="song-actions">
                    <button class="song-like-btn ${isLiked ? 'liked' : ''}">
                        <i class="bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'}"></i>
                    </button>
                    <button class="song-options-btn">
                        <i class="bi bi-three-dots-vertical"></i>
                    </button>
                </div>
            `;
            
            songsListContainer.appendChild(songItem);
        });
        
        // Add event listeners
        setupPlaylistDetailSongs(playlist);
    }

    // Setup action buttons for playlist detail
    function setupPlaylistDetailActions(playlist) {
        const playlistDetailPage = document.querySelector('.playlist-detail-page');
        if (!playlistDetailPage) return;
        
        const playAllBtn = playlistDetailPage.querySelector('.play-all-btn');
        const shuffleBtn = playlistDetailPage.querySelector('.shuffle-btn');
        
        if (playAllBtn) {
            playAllBtn.addEventListener('click', () => {
                if (playlist.tracks && playlist.tracks.length > 0) {
                    // Set current playlist and start playing from first track
                    playerState.currentPlaylist = playlist;
                    playerState.currentPlaylistIndex = 0;
                    playerState.shuffleMode = false;
                    playTrack(playlist.tracks[0], 0);
                    updatePlayerUI();
                    showToast('Playing all songs');
                } else {
                    showToast('This playlist has no songs', 'error');
                }
            });
        }
        
        if (shuffleBtn) {
            shuffleBtn.addEventListener('click', () => {
                if (playlist.tracks && playlist.tracks.length > 0) {
                    // Create a shuffled version of the tracks
                    playerState.currentPlaylist = playlist;
                    playerState.shuffleMode = true;
                    playerState.shuffledIndices = createShuffledIndices(playlist.tracks.length);
                    const firstIndex = playerState.shuffledIndices[0];
                    playerState.currentPlaylistIndex = 0;
                    playTrack(playlist.tracks[firstIndex], firstIndex);
                    updatePlayerUI();
                    showToast('Playing in shuffle mode');
                } else {
                    showToast('This playlist has no songs', 'error');
                }
            });
        }
    }

    // Setup event listeners for songs in playlist detail view
    function setupPlaylistDetailSongs(playlist) {
        const songItems = document.querySelectorAll('.playlist-detail-page .song-item');
        
        songItems.forEach((songItem, index) => {
            const songId = songItem.dataset.id;
            const songIndex = parseInt(songItem.dataset.index);
            const track = playlist.tracks[songIndex];
            
            // Play button click
            const playBtn = songItem.querySelector('.song-play-btn');
            if (playBtn) {
                playBtn.addEventListener('click', () => {
                    // Set current playlist and play the selected track
                    playerState.currentPlaylist = playlist;
                    playerState.shuffleMode = false;
                    playerState.currentPlaylistIndex = songIndex;
                    playTrack(track, songIndex);
                    
                    // Update UI
                    updatePlayerUI();
                    
                    // Update playing status in the list
                    songItems.forEach(item => item.classList.remove('playing'));
                    songItem.classList.add('playing');
                    songItem.querySelector('.song-play-btn i').className = 'bi bi-pause-fill';
                });
            }
            
            // Like button click
            const likeBtn = songItem.querySelector('.song-like-btn');
            if (likeBtn) {
                likeBtn.addEventListener('click', () => {
                    toggleLikeTrack(track);
                    
                    // Update like button UI
                    const isLiked = playerState.likedSongs.some(likedTrack => likedTrack.id === track.id);
                    likeBtn.className = `song-like-btn ${isLiked ? 'liked' : ''}`;
                    likeBtn.querySelector('i').className = `bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'}`;
                    
                    // Show toast
                    showToast(`${isLiked ? 'Added to' : 'Removed from'} Liked Songs`);
                });
            }
            
            // Options button click
            const optionsBtn = songItem.querySelector('.song-options-btn');
            if (optionsBtn) {
                optionsBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    
                    // Create and position context menu
                    showSongContextMenu(track, e.clientX, e.clientY);
                });
            }
            
            // Double click to play
            songItem.addEventListener('dblclick', () => {
                // Set current playlist and play the selected track
                playerState.currentPlaylist = playlist;
                playerState.shuffleMode = false;
                playerState.currentPlaylistIndex = songIndex;
                playTrack(track, songIndex);
                
                // Update UI
                updatePlayerUI();
                
                // Update playing status in the list
                songItems.forEach(item => item.classList.remove('playing'));
                songItem.classList.add('playing');
                songItem.querySelector('.song-play-btn i').className = 'bi bi-pause-fill';
            });
        });
    }

    // Function to toggle like status of a track
    function toggleLikeTrack(track) {
        if (!track || !track.id) return;
        
        // Check if already liked
        const likedIndex = playerState.likedSongs.findIndex(likedTrack => likedTrack.id === track.id);
        
        if (likedIndex === -1) {
            // Add to liked songs
            playerState.likedSongs.push(track);
        } else {
            // Remove from liked songs
            playerState.likedSongs.splice(likedIndex, 1);
        }
        
        // Save to localStorage
        savePlayerState();
        
        // Update UI if on liked songs page
        if (document.querySelector('.liked-songs-page.active')) {
            loadLikedSongs();
        }
    }

    // Show context menu for song actions
    function showSongContextMenu(track, x, y) {
        // Remove existing context menu if any
        const existingMenu = document.querySelector('.context-menu');
        if (existingMenu) {
            existingMenu.remove();
        }
        
        // Create menu element
        const menu = document.createElement('div');
        menu.className = 'context-menu';
        
        // Calculate position
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Adjust position if too close to edge
        const menuWidth = 220; // Approximate width of menu
        const menuHeight = 200; // Approximate height of menu
        
        let posX = x;
        let posY = y;
        
        if (x + menuWidth > viewportWidth) {
            posX = viewportWidth - menuWidth - 10;
        }
        
        if (y + menuHeight > viewportHeight) {
            posY = viewportHeight - menuHeight - 10;
        }
        
        menu.style.left = `${posX}px`;
        menu.style.top = `${posY}px`;
        
        // Add menu items
        const isLiked = playerState.likedSongs.some(likedTrack => likedTrack.id === track.id);
        
        menu.innerHTML = `
            <div class="context-menu-item play-item">
                <i class="bi bi-play-fill"></i> Play
            </div>
            <div class="context-menu-item add-to-queue-item">
                <i class="bi bi-list-ul"></i> Add to Queue
            </div>
            <div class="context-menu-item like-item">
                <i class="bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'}"></i> 
                ${isLiked ? 'Remove from Liked Songs' : 'Add to Liked Songs'}
            </div>
            <div class="context-menu-item add-to-playlist-item">
                <i class="bi bi-music-note-list"></i> Add to Playlist
            </div>
            <div class="context-menu-divider"></div>
            <div class="context-menu-item view-artist-item">
                <i class="bi bi-person"></i> View Artist
            </div>
            <div class="context-menu-item view-album-item">
                <i class="bi bi-disc"></i> View Album
            </div>
        `;
        
        // Add to document
        document.body.appendChild(menu);
        
        // Add event listeners
        const playItem = menu.querySelector('.play-item');
        const addToQueueItem = menu.querySelector('.add-to-queue-item');
        const likeItem = menu.querySelector('.like-item');
        const addToPlaylistItem = menu.querySelector('.add-to-playlist-item');
        const viewArtistItem = menu.querySelector('.view-artist-item');
        const viewAlbumItem = menu.querySelector('.view-album-item');
        
        playItem.addEventListener('click', () => {
            playTrack(track);
            menu.remove();
        });
        
        addToQueueItem.addEventListener('click', () => {
            // Add to queue logic
            if (playerState.queue) {
                playerState.queue.push(track);
                showToast('Added to queue');
            }
            menu.remove();
        });
        
        likeItem.addEventListener('click', () => {
            toggleLikeTrack(track);
            menu.remove();
        });
        
        addToPlaylistItem.addEventListener('click', () => {
            // Will implement later - show playlist selection modal
            showToast('Add to playlist feature coming soon');
            menu.remove();
        });
        
        viewArtistItem.addEventListener('click', () => {
            // Will implement later - navigate to artist page
            showToast('View artist feature coming soon');
            menu.remove();
        });
        
        viewAlbumItem.addEventListener('click', () => {
            // Will implement later - navigate to album page
            showToast('View album feature coming soon');
            menu.remove();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }

    // Function to render all uploaded tracks in the upload list
    function renderUploadedTracks() {
        // Clear the current list first
        if (elements.uploadItemsList) {
            elements.uploadItemsList.innerHTML = '';
            
            // Add all uploaded tracks to the UI
            if (playerState.uploadedTracks.length > 0) {
                playerState.uploadedTracks.forEach(track => {
                    addUploadItem(track, false);
                });
            } else {
                // Show empty state
                elements.uploadItemsList.innerHTML = `
                    <div class="empty-uploads">
                        <i class="bi bi-cloud-upload"></i>
                        <p>No uploaded tracks yet</p>
                        <p class="subtext">Click the button above to upload your music</p>
                    </div>
                `;
            }
        }
    }

    // Function to render all playlists on the playlists page
    function renderPlaylists() {
        console.log("Rendering all playlists to the playlists grid");
        
        if (!elements.playlistsGrid) {
            console.warn("Playlists grid element not found");
            return;
        }
        
        // Clear the current grid
        elements.playlistsGrid.innerHTML = '';
        
        // Check if we have any playlists
        if (playerState.customPlaylists.length === 0) {
            // Show empty state
            elements.playlistsGrid.innerHTML = `
                <div class="empty-playlists">
                    <i class="bi bi-music-note-list"></i>
                    <p>No playlists yet</p>
                    <p class="subtext">Create your first playlist to get started</p>
                </div>
            `;
            return;
        }
        
        // Add system playlists first (Liked Songs and Local Songs)
        const systemPlaylists = playerState.customPlaylists.filter(playlist => 
            playlist.isSystem || playlist.id === 'liked-songs' || playlist.id === 'local-songs'
        );
        
        // Add user created playlists
        const userPlaylists = playerState.customPlaylists.filter(playlist => 
            !playlist.isSystem && playlist.id !== 'liked-songs' && playlist.id !== 'local-songs'
        );
        
        // Add a header for system playlists if we have any
        if (systemPlaylists.length > 0) {
            const systemHeader = document.createElement('div');
            systemHeader.className = 'playlist-section-header';
            systemHeader.innerHTML = '<h3>System Playlists</h3>';
            elements.playlistsGrid.appendChild(systemHeader);
            
            // Add system playlists
            systemPlaylists.forEach(playlist => {
                addPlaylistCard(playlist);
            });
        }
        
        // Add a header for user playlists if we have any
        if (userPlaylists.length > 0) {
            const userHeader = document.createElement('div');
            userHeader.className = 'playlist-section-header';
            userHeader.innerHTML = '<h3>Your Playlists</h3>';
            elements.playlistsGrid.appendChild(userHeader);
            
            // Add user playlists
            userPlaylists.forEach(playlist => {
                addPlaylistCard(playlist);
            });
        }
    }

    // Start the player
    init();
});
