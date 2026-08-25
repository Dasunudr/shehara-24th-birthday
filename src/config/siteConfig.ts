export interface PhotoItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  location?: string;
  tag?: string;
  span?: "tall" | "wide" | "normal" | "large";
}

export interface VideoItem {
  id: string;
  src: string;
  poster?: string;
  title: string;
  subtitle: string;
  duration?: string;
  caption: string;
}

export interface ReasonItem {
  number: number;
  title: string;
  description: string;
  iconName: string;
  tag: string;
}

export interface TimelineItem {
  year?: string;
  date?: string;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  tag: string;
}

export const siteConfig = {
  herName: "Shehara",
  yourName: "Dasun",
  herPhone: "94721431597",
  yourPhone: "94715121506",
  age: 24,
  birthDate: "2026",
  subheading: "To someone who makes the world a little more beautiful just by being in it.",
  
  // Hero section photo
  heroImage: "/images/portrait-01.jpg",
  
  // Sunset highlight section photo
  sunsetImage: "/images/sunset-01.jpg",
  
  // Nature & garden section photo
  gardenImage: "/images/garden-01.jpg",
  
  // Closing section photo
  finalImage: "/images/portrait-01.jpg",

  // Audio background music
  music: {
    title: "Romantic Birthday Melody",
    src: "/audio/birthday-song.mp3",
    autoFallbackSynth: true, // If MP3 is not uploaded yet, Web Audio ambient synth plays automatically
  },

  // 24 Reasons
  reasons: [
    {
      number: 1,
      title: "Your Radiant Smile",
      description: "It lights up any room effortlessly and brings an instant wave of happiness to everyone around you.",
      iconName: "Smile",
      tag: "Charm"
    },
    {
      number: 2,
      title: "Your Boundless Kindness",
      description: "The genuine warmth and compassion you show to everyone is something truly rare and precious.",
      iconName: "HeartHandshake",
      tag: "Heart"
    },
    {
      number: 3,
      title: "Your Beautiful Energy",
      description: "A vibrant, uplifting aura that makes every ordinary moment feel alive, exciting, and full of hope.",
      iconName: "Sparkles",
      tag: "Soul"
    },
    {
      number: 4,
      title: "The Way You Laugh",
      description: "It is pure music—spontaneous, infectious, and capable of melting away any worry in seconds.",
      iconName: "Music",
      tag: "Joy"
    },
    {
      number: 5,
      title: "Your Captivating Eyes",
      description: "Full of depth, unspoken warmth, intelligence, and a gentle spark that holds countless beautiful stories.",
      iconName: "Eye",
      tag: "Beauty"
    },
    {
      number: 6,
      title: "Your Cute Expressions",
      description: "From your quiet thoughtful looks to your playful smiles, every little expression is adorable.",
      iconName: "Laugh",
      tag: "Charm"
    },
    {
      number: 7,
      title: "Your Quiet Confidence",
      description: "The graceful poise and inner self-assurance you carry yourself with through every season of life.",
      iconName: "Crown",
      tag: "Strength"
    },
    {
      number: 8,
      title: "Your Gentle Heart",
      description: "Soft yet resilient, loving unconditionally and holding space for the people who matter most.",
      iconName: "Heart",
      tag: "Heart"
    },
    {
      number: 9,
      title: "Your Sense of Humor",
      description: "Your witty remarks, playful banter, and how you find reasons to smile even on busy days.",
      iconName: "Flame",
      tag: "Joy"
    },
    {
      number: 10,
      title: "The Way You Care",
      description: "Attentive, thoughtful, and always remembering the little details that mean the absolute most.",
      iconName: "ShieldCheck",
      tag: "Heart"
    },
    {
      number: 11,
      title: "Your Genuine Personality",
      description: "Authentic, true to yourself, honest, and refreshingly real in a world full of imitations.",
      iconName: "Sun",
      tag: "Soul"
    },
    {
      number: 12,
      title: "Your Inner Strength",
      description: "The quiet determination you hold when facing challenges, always emerging stronger and wiser.",
      iconName: "Gem",
      tag: "Strength"
    },
    {
      number: 13,
      title: "Your Big Dreams",
      description: "Your passion, ambition, and the beautiful future you are thoughtfully building step by step.",
      iconName: "Compass",
      tag: "Vision"
    },
    {
      number: 14,
      title: "Your Beautiful Soul",
      description: "The purity, depth, and gentle grace that makes you undeniably one of a kind.",
      iconName: "Flower2",
      tag: "Soul"
    },
    {
      number: 15,
      title: "Your Playful Laugh",
      description: "How your eyes crinkle when you're truly amused and how you bring lightness to every conversation.",
      iconName: "PartyPopper",
      tag: "Joy"
    },
    {
      number: 16,
      title: "Your Endearing Patience",
      description: "Understanding, listening calmly, and greeting the world with open arms and thoughtful grace.",
      iconName: "Feather",
      tag: "Heart"
    },
    {
      number: 17,
      title: "Your Magical Presence",
      description: "Just having you near makes any place feel warmer, safer, and infinitely more special.",
      iconName: "Stars",
      tag: "Soul"
    },
    {
      number: 18,
      title: "Your Inspiring Courage",
      description: "Daring to step into new adventures, embrace growth, and stand tall with unwavering grace.",
      iconName: "Zap",
      tag: "Strength"
    },
    {
      number: 19,
      title: "Your Unique Elegance",
      description: "A natural, effortless charm in how you dress, speak, and make everyone around you feel appreciated.",
      iconName: "Palette",
      tag: "Beauty"
    },
    {
      number: 20,
      title: "Your Radiant Positivity",
      description: "A guiding light that shines through cloudy days, bringing optimism and good vibrations.",
      iconName: "SunMedium",
      tag: "Joy"
    },
    {
      number: 21,
      title: "Your Comforting Warmth",
      description: "Like a cozy cup of tea on a rainy afternoon—soothing, comforting, and deeply cherished.",
      iconName: "Coffee",
      tag: "Heart"
    },
    {
      number: 22,
      title: "The Memories We Share",
      description: "Every shared laugh, candid glance, quiet sunset, and beautiful memory we've woven together.",
      iconName: "Camera",
      tag: "Memories"
    },
    {
      number: 23,
      title: "The Happiness You Bring",
      description: "You have an innate gift for making life feel lighter, sweeter, and infinitely more meaningful.",
      iconName: "Gift",
      tag: "Joy"
    },
    {
      number: 24,
      title: "Simply Being YOU",
      description: "Because out of eight billion people in this universe, there is no one else quite as magnificent as you. ❤️",
      iconName: "HeartPulse",
      tag: "Forever"
    }
  ] as ReasonItem[],

  // Photo Gallery
  galleryPhotos: [
    {
      id: "photo-1",
      src: "/images/portrait-01.jpg",
      alt: "Shehara's radiant portrait",
      title: "Pure Radiance",
      caption: "A smile that could brighten even the stormiest skies.",
      tag: "Portrait",
      location: "Warm Afternoon",
      backNote: "Every time you smile like this, the whole day turns into pure sunshine. You have the most genuine and comforting expression, Shehara. Never stop smiling!",
      tapeColor: "from-amber-300/60 to-rose-300/60",
      rotation: -2,
    },
    {
      id: "photo-2",
      src: "/images/sunset-01.jpg",
      alt: "Shehara by the ocean at sunset in yellow dress",
      title: "Golden Hour Queen",
      caption: "Golden light dancing upon the waves, matching your glowing spirit.",
      location: "Golden Shoreline",
      tag: "Sunset",
      backNote: "The ocean and the sunset were breathtaking, but nothing in that horizon could outshine you in that yellow dress holding those flowers. One of my favorite pictures of you ever. ✨",
      tapeColor: "from-yellow-400/60 to-amber-500/60",
      rotation: 2.5,
    },
    {
      id: "photo-3",
      src: "/images/garden-01.jpg",
      alt: "Shehara beside the glowing holiday tree",
      title: "Fairy Lights & Magic",
      caption: "Among a thousand sparkling lights, you were still the brightest.",
      location: "Festive Wonder",
      tag: "Memories",
      backNote: "Surrounded by hundreds of glittering lights, yet your eyes and smile carried ten times more magic than all the festive trees in the world! 🎄✨",
      tapeColor: "from-emerald-300/60 to-teal-400/60",
      rotation: -1.5,
    },
    {
      id: "photo-4",
      src: "/images/portrait-02.jpg",
      alt: "Shehara looking up thoughtfully",
      title: "Dreamy Horizons",
      caption: "Looking forward to endless possibilities, dreams, and beautiful beginnings.",
      location: "Quiet Moments",
      tag: "Dreamer",
      backNote: "That gentle, dreamy look of yours—where beauty meets quiet grace and infinite dreams. Wishing all your 24th birthday dreams come true, Shehara. ❤️",
      tapeColor: "from-rose-400/60 to-pink-500/60",
      rotation: 3,
    }
  ] as (PhotoItem & { backNote?: string; tapeColor?: string; rotation?: number })[],

  // Timeline
  timeline: [
    {
      year: "Chapter 1",
      date: "The First Smile",
      title: "An Unforgettable Spark",
      subtitle: "The day the world felt a little warmer",
      description: "Some moments don't need a reason to be remembered—just Shehara's presence that makes everything feel effortless and genuine.",
      image: "/images/portrait-01.jpg",
      tag: "First Moments"
    },
    {
      year: "Chapter 2",
      date: "Golden Sunset",
      title: "Where Time Stood Still",
      subtitle: "Golden hour upon the ocean shoreline",
      description: "Shehara walking along the tide in a golden dress, holding fresh blossoms while the horizon ignited in hues of amber and rose gold.",
      image: "/images/sunset-01.jpg",
      tag: "Adventures"
    },
    {
      year: "Chapter 3",
      date: "Fairy Lights & Magic",
      title: "Bright Lights, Brighter Smiles",
      subtitle: "Surrounded by festive wonder",
      description: "Standing amidst towering festive lights and holiday magic, reminding everyone that real sparkle comes from Shehara's heart.",
      image: "/images/garden-01.jpg",
      tag: "Celebration"
    },
    {
      year: "Chapter 4",
      date: "Turning 24",
      title: "A New Chapter of Dreams",
      subtitle: "Today & Forever Ahead",
      description: "Stepping into 24 with elegance, beauty, strength, and an entire universe of exciting dreams waiting to unfold for Shehara.",
      image: "/images/portrait-02.jpg",
      tag: "24th Milestone"
    }
  ] as TimelineItem[],

  // Videos
  videos: [
    {
      id: "vid-1",
      src: "/videos/video-01.mp4",
      poster: "/images/portrait-02.jpg",
      title: "Special Moments with Shehara",
      subtitle: "Memories in Motion",
      duration: "HD Video",
      caption: "Cherished moments, radiant smiles, and unforgettable memories celebrated on your 24th birthday."
    }
  ] as VideoItem[],

  // Letter content
  letter: {
    greeting: "Dear Shehara,",
    paragraphs: [
      "Today isn't just another birthday.",
      "It's a celebration and a reminder of how truly beautiful life becomes when someone with your heart, grace, and radiant kindness is a part of it.",
      "I hope your 24th year unfolds like a dream—bringing you countless reasons to smile, breathtaking adventures you'll never forget, people who genuinely appreciate and treasure you, and quiet moments that fill your soul with pure joy.",
      "Never forget how deeply special you are, Shehara. Keep shining your light, dreaming fearlessly, and being the magnificent person you are.",
      "Happy 24th Birthday ❤️"
    ],
    signature: "— With all my love & warmest wishes, Dasun ❤️"
  },

  // Easter Egg
  easterEgg: {
    triggerCount: 5,
    title: "Okay Shehara... one last thing ❤️",
    message: "You deserve all the happiness, peace, love, and magic this world has to offer. May this 24th year be your most extraordinary adventure yet!",
    note: "Happy 24th Birthday, Shehara."
  }
};
