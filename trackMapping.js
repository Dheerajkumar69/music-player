/**
 * TrackMapping.js
 * 
 * This file contains a comprehensive mapping between audio files, song metadata,
 * and cover images to be used throughout the music player application.
 * 
 * Use this file as a single source of truth for track information.
 */

const trackMapping = {
    // The Weeknd
    "The Weeknd - Starboy ft. Daft Punk (Official Video).mp3": {
        id: "weeknd-starboy",
        title: "Starboy",
        artist: "The Weeknd ft. Daft Punk",
        album: "Starboy",
        coverImage: "images/starboy.jpeg",
        year: 2016,
        genre: "R&B/Pop"
    },
    "The Weeknd - After Hours (Audio).mp3": {
        id: "weeknd-afterhours",
        title: "After Hours",
        artist: "The Weeknd",
        album: "After Hours",
        coverImage: "images/afterhours.jpg",
        year: 2020,
        genre: "R&B/Pop"
    },
    
    // Dua Lipa
    "Dua Lipa - Future Nostalgia (Official Lyrics Video).mp3": {
        id: "dualipa-futurenostalgia",
        title: "Future Nostalgia",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        coverImage: "images/hq720.jpg",
        year: 2020,
        genre: "Pop/Dance"
    },
    
    "Lady Gaga - Chromatica I (Audio).mp3": {
        id: "ladygaga-chromatica",
        title: "Chromatica I",
        artist: "Lady Gaga",
        album: "Chromatica",
        coverImage: "images/cromatica.jpg",
        year: 2020,
        genre: "Pop/Dance"
    },
    // Billie Eilish
    "Billie Eilish - Happier Than Ever (Official Music Video).mp3": {
        id: "billie-happierthanever",
        title: "Happier Than Ever",
        artist: "Billie Eilish",
        album: "Happier Than Ever",
        coverImage: "images/happier than ever.jpg",
        year: 2021,
        genre: "Alternative/Pop"
    },
    
    // Olivia Rodrigo
    "brutal.mp3": {
        id: "olivia-brutal",
        title: "Brutal",
        artist: "Olivia Rodrigo",
        album: "SOUR",
        coverImage: "images/sour.jpg",
        year: 2021,
        genre: "Pop/Rock"
    },
    
    // Adele
    "Strangers By Nature.mp3": {
        id: "adele-strangers",
        title: "Strangers By Nature",
        artist: "Adele",
        album: "30",
        coverImage: "images/30.jpg",
        year: 2021,
        genre: "Pop"
    },
    
    // BTS
    "BTS (방탄소년단) 'Butter' Official MV.mp3": {
        id: "bts-butter",
        title: "Butter",
        artist: "BTS",
        album: "Butter",
        coverImage: "images/butter.png",
        year: 2021,
        genre: "K-Pop"
    },
    
    // Ariana Grande
    "Ariana Grande - positions (official video).mp3": {
        id: "ariana-positions",
        title: "Positions",
        artist: "Ariana Grande",
        album: "Positions",
        coverImage: "images/position.jpg",
        year: 2020,
        genre: "Pop/R&B"
    },
    
    // Doja Cat
    "Doja Cat - I Don't Do Drugs (Visualizer) ft. Ariana Grande.mp3": {
        id: "dojacat-idontdodrugs",
        title: "I Don't Do Drugs",
        artist: "Doja Cat ft. Ariana Grande",
        album: "Planet Her",
        coverImage: "images/planet her ].jpg",
        year: 2021,
        genre: "Pop/R&B"
    },
    
    // Lady Gaga
    
    
    // Justice
    "Justice - D.A.N.C.E. (Official Video).mp3": {
        id: "justice-dance",
        title: "D.A.N.C.E.",
        artist: "Justice",
        album: "†",
        coverImage: "images/justice.jpg",
        year: 2007,
        genre: "Electronic/Dance"
    },
    
    // Arijit Singh
    "Saware FULL VIDEO Song - Arijit Singh  Phantom  T-Series.mp3": {
        id: "arijit-saware",
        title: "Saware",
        artist: "Arijit Singh",
        album: "Phantom",
        coverImage: "images/Phantom-Hindi-2015-500x500.jpg",
        year: 2015,
        genre: "Bollywood"
    },
    "Full Song_ KHAIRIYAT (BONUS TRACK)  CHHICHHORE  Sushant, Shraddha  Pritam, Amitabh BArijit Singh.mp3": {
        id: "arijit-khairiyat",
        title: "Khairiyat",
        artist: "Arijit Singh",
        album: "Chhichhore",
        coverImage: "images/khariyat.jpg",
        year: 2019,
        genre: "Bollywood"
    },
    
    // Atif Aslam
    "Tere Sang Yaara - Full Video  Rustom  Akshay Kumar & Ileana D'cruz  Arko ft. Atif Aslam  Manoj M.mp3": {
        id: "atif-teresangyaara",
        title: "Tere Sang Yaara",
        artist: "Atif Aslam",
        album: "Rustom",
        coverImage: "images/tere sang yara.jpg",
        year: 2016,
        genre: "Bollywood"
    },
    
    // Ankit Tiwari
    "Himesh Reshammiya, Ankit Tiwari, Palak Muchhal - Sanam Teri Kasam - Title Song (Lyric Video).mp3": {
        id: "ankit-sanamterikasam",
        title: "Sanam Teri Kasam",
        artist: "Ankit Tiwari",
        album: "Sanam Teri Kasam",
        coverImage: "images/sanam teri kasam.jpg",
        year: 2016,
        genre: "Bollywood"
    },
    
    // Mixed
    "Raabta (Kehte Hain Khuda) Full Song With Lyrics  Agent Vinod  Saif Ali Khan, Kareena Kapoor,Pritam.mp3": {
        id: "pritam-raabta",
        title: "Raabta (Kehte Hain Khuda)",
        artist: "Pritam",
        album: "Agent Vinod",
        coverImage: "images/raabta.jpg",
        year: 2012,
        genre: "Bollywood"
    }
};

// Utility functions for working with the track mapping

/**
 * Get track data by filename
 * @param {string} filename - The audio filename
 * @returns {Object|null} - The track data object or null if not found
 */
function getTrackByFilename(filename) {
    return trackMapping[filename] || null;
}

/**
 * Get track data by ID
 * @param {string} id - The track ID
 * @returns {Object|null} - The track data object or null if not found
 */
function getTrackById(id) {
    for (const [filename, trackData] of Object.entries(trackMapping)) {
        if (trackData.id === id) {
            return { ...trackData, filename };
        }
    }
    return null;
}

/**
 * Get all tracks by artist
 * @param {string} artistName - The artist name (case insensitive, partial match)
 * @returns {Array} - Array of track data objects
 */
function getTracksByArtist(artistName) {
    const results = [];
    const searchTerm = artistName.toLowerCase();
    
    for (const [filename, trackData] of Object.entries(trackMapping)) {
        if (trackData.artist.toLowerCase().includes(searchTerm)) {
            results.push({ ...trackData, filename });
        }
    }
    
    return results;
}

/**
 * Get all tracks by album
 * @param {string} albumName - The album name (case insensitive, partial match)
 * @returns {Array} - Array of track data objects
 */
function getTracksByAlbum(albumName) {
    const results = [];
    const searchTerm = albumName.toLowerCase();
    
    for (const [filename, trackData] of Object.entries(trackMapping)) {
        if (trackData.album.toLowerCase().includes(searchTerm)) {
            results.push({ ...trackData, filename });
        }
    }
    
    return results;
}

/**
 * Get all tracks by genre
 * @param {string} genreName - The genre name (case insensitive, partial match)
 * @returns {Array} - Array of track data objects
 */
function getTracksByGenre(genreName) {
    const results = [];
    const searchTerm = genreName.toLowerCase();
    
    for (const [filename, trackData] of Object.entries(trackMapping)) {
        if (trackData.genre.toLowerCase().includes(searchTerm)) {
            results.push({ ...trackData, filename });
        }
    }
    
    return results;
}

/**
 * Search tracks by query across all fields
 * @param {string} query - The search query
 * @returns {Array} - Array of matching track data objects
 */
function searchTracks(query) {
    const results = [];
    const searchTerm = query.toLowerCase();
    
    for (const [filename, trackData] of Object.entries(trackMapping)) {
        if (
            trackData.title.toLowerCase().includes(searchTerm) ||
            trackData.artist.toLowerCase().includes(searchTerm) ||
            trackData.album.toLowerCase().includes(searchTerm) ||
            trackData.genre.toLowerCase().includes(searchTerm) ||
            String(trackData.year).includes(searchTerm)
        ) {
            results.push({ ...trackData, filename });
        }
    }
    
    return results;
}

/**
 * Convert a track mapping entry to a player track object
 * @param {string} filename - The audio filename
 * @returns {Object|null} - A track object for the player or null if not found
 */
function createPlayerTrack(filename) {
    const trackData = trackMapping[filename];
    if (!trackData) return null;
    
    return {
        id: trackData.id,
        title: trackData.title,
        artist: trackData.artist,
        album: trackData.album,
        duration: 0, // Duration will be determined when audio loads
        cover: trackData.coverImage,
        audio: 'audio/' + filename,
        fileName: filename,
        year: trackData.year,
        genre: trackData.genre,
        dateAdded: new Date().toISOString(),
        source: 'audio-mapping'
    };
}

// Export the mapping and utility functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        trackMapping,
        getTrackByFilename,
        getTrackById,
        getTracksByArtist,
        getTracksByAlbum,
        getTracksByGenre,
        searchTracks,
        createPlayerTrack
    };
} 