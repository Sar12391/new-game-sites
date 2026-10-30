/**
 * NEXUS REALM - Gaming Community Platform Dashboard
 * Core Interactive Application Engine & State Controller
 */

// ==========================================================================
// 1. SOUND FX SYNTHESIS ENGINE (Web Audio API - No external assets required)
// ==========================================================================
class SoundFXEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem('nexus_sound_muted') === 'true';
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('nexus_sound_muted', this.isMuted);
    return this.isMuted;
  }

  playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  playXpGain() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.06);

      gain.gain.setValueAtTime(0.15, now + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.2);
    });
  }

  playLevelUp() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const chords = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
    chords.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0.15, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.45);
    });
  }

  playAchievement() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [659.25, 830.61, 987.77, 1318.51];
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.2, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.55);
    });
  }

  playLaunch() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Sub-bass drop
    const bass = this.ctx.createOscillator();
    const bassGain = this.ctx.createGain();
    bass.type = 'sine';
    bass.frequency.setValueAtTime(140, now);
    bass.frequency.exponentialRampToValueAtTime(35, now + 0.7);

    bassGain.gain.setValueAtTime(0.3, now);
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

    bass.connect(bassGain);
    bassGain.connect(this.ctx.destination);
    bass.start(now);
    bass.stop(now + 0.75);
  }

  playPing() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }
}

const Sound = new SoundFXEngine();

// ==========================================================================
// 2. STATE DATA SYSTEM
// ==========================================================================
const AppState = {
  user: {
    gamertag: 'Cyph3r_Ghost',
    clan: 'NEO',
    title: 'Mythic Grandmaster',
    level: 42,
    currentXp: 14850,
    nextLevelXp: 20000,
    statusQuote: 'Never retreat. Always breach the mainframe.',
    rankTier: 'Grandmaster #342',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
    stats: {
      winRate: '68.4%',
      globalRank: '#342',
      playtime: '1,428 hrs',
      achievements: '482 / 550',
      reputation: '99.8%'
    }
  },

  achievements: [
    {
      id: 'ach-1',
      title: 'Void Breaker',
      game: 'Cyber Surge 2099',
      category: 'Combat',
      rarity: 'mythic',
      rarityPercent: '0.8% of players',
      rewardXp: 1200,
      icon: 'fa-skull-crossbones',
      desc: 'Defeated the Cyber-Titan in Hardcore Mode without losing shields.',
      unlockedDate: 'Unlocked 2h ago',
      isUnlocked: true,
      progress: 100
    },
    {
      id: 'ach-2',
      title: 'Apex Predator',
      game: 'Apex Void',
      category: 'Survival',
      rarity: 'legendary',
      rarityPercent: '2.4% of players',
      rewardXp: 750,
      icon: 'fa-crosshairs',
      desc: 'Clutched a 1v3 squad wipe with under 10 HP remaining in final zone.',
      unlockedDate: 'Unlocked Yesterday',
      isUnlocked: true,
      progress: 100
    },
    {
      id: 'ach-3',
      title: 'Quantum Overdrive',
      game: 'Neon Velocity',
      category: 'Speedrun',
      rarity: 'epic',
      rarityPercent: '5.1% of players',
      rewardXp: 500,
      icon: 'fa-bolt',
      desc: 'Completed Sector 7 trial in under 1 minute 15 seconds with zero drift penalty.',
      unlockedDate: 'Unlocked 3d ago',
      isUnlocked: true,
      progress: 100
    },
    {
      id: 'ach-4',
      title: 'Celestial Cartographer',
      game: 'Starfall Odyssey',
      category: 'Exploration',
      rarity: 'rare',
      rarityPercent: '14.8% of players',
      rewardXp: 350,
      icon: 'fa-compass',
      desc: 'Mapped all 12 hidden star anomalies in the Andromeda nebula sector.',
      unlockedDate: 'Unlocked 5d ago',
      isUnlocked: true,
      progress: 100
    },
    {
      id: 'ach-5',
      title: 'Arsenal Architect',
      game: 'Cyber Surge 2099',
      category: 'Crafting',
      rarity: 'legendary',
      rarityPercent: '3.2% of players',
      rewardXp: 850,
      icon: 'fa-shield-halved',
      desc: 'Craft and fully upgrade every prototype particle weapon.',
      unlockedDate: 'In Progress (92%)',
      isUnlocked: false,
      progress: 92
    },
    {
      id: 'ach-6',
      title: 'Syndicate Kingpin',
      game: 'Neon Velocity',
      category: 'Multiplayer',
      rarity: 'epic',
      rarityPercent: '6.7% of players',
      rewardXp: 600,
      icon: 'fa-crown',
      desc: 'Win 25 consecutive street drift battles in multiplayer ranked.',
      unlockedDate: 'In Progress (80%)',
      isUnlocked: false,
      progress: 80
    }
  ],

  friends: [
    {
      id: 'f-1',
      name: 'K4i_Shadow',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      status: 'in-game',
      gameStatus: 'Playing Cyber Surge 2099',
      subStatus: 'Ranked 5v5 (Score 12-10)',
      chatHistory: [
        { sender: 'them', text: 'Yo! You hopping on the raid tonight?' },
        { sender: 'me', text: 'Definitely, just finishing up my gear calibration.' }
      ]
    },
    {
      id: 'f-2',
      name: 'Aura_Sniper',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      status: 'in-game',
      gameStatus: 'Playing Apex Void',
      subStatus: 'Squad Size 3/3 (6 squads left)',
      chatHistory: [
        { sender: 'them', text: 'Just dropped an 8k damage game!' },
        { sender: 'me', text: 'Insane carry as always 🔥' }
      ]
    },
    {
      id: 'f-3',
      name: 'ZeroTolerance',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
      status: 'in-game',
      gameStatus: 'Playing Starfall Odyssey',
      subStatus: 'Deep Space Dungeon Boss',
      chatHistory: [
        { sender: 'them', text: 'Need a tank for the mythic boss if you are free' }
      ]
    },
    {
      id: 'f-4',
      name: 'PixelQueen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      status: 'online',
      gameStatus: 'Streaming on Twitch',
      subStatus: 'In Lobby • Chillin',
      chatHistory: [
        { sender: 'them', text: 'Live now! Tune in if you want to see some speedruns!' }
      ]
    },
    {
      id: 'f-5',
      name: 'Vortex_Rider',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      status: 'online',
      gameStatus: 'Online',
      subStatus: 'Customizing Loadout',
      chatHistory: [
        { sender: 'them', text: 'That new assault rifle build is cracked' }
      ]
    },
    {
      id: 'f-6',
      name: 'Drift_King',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
      status: 'away',
      gameStatus: 'Away (AFK 15m)',
      subStatus: 'Grabbing energy drinks',
      chatHistory: []
    },
    {
      id: 'f-7',
      name: 'RoguePulse',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      status: 'offline',
      gameStatus: 'Offline',
      subStatus: 'Last seen 2h ago',
      chatHistory: []
    }
  ],

  games: [
    {
      id: 'game-1',
      title: 'Cyber Surge 2099',
      genre: 'Action RPG',
      cover: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
      playtime: '342 hrs',
      lastPlayed: 'Today',
      achievementsPct: 88,
      cloudSync: true,
      isFavorite: true,
      fps: 144,
      ping: '14ms',
      version: 'v2.4.1'
    },
    {
      id: 'game-2',
      title: 'Apex Void: Resurgence',
      genre: 'Battle Royale',
      cover: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
      playtime: '512 hrs',
      lastPlayed: 'Yesterday',
      achievementsPct: 65,
      cloudSync: true,
      isFavorite: true,
      fps: 165,
      ping: '18ms',
      version: 'v3.1.0'
    },
    {
      id: 'game-3',
      title: 'Starfall Odyssey',
      genre: 'Sci-Fi MMORPG',
      cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      playtime: '218 hrs',
      lastPlayed: '3 days ago',
      achievementsPct: 92,
      cloudSync: true,
      isFavorite: true,
      fps: 120,
      ping: '22ms',
      version: 'v1.8.4'
    },
    {
      id: 'game-4',
      title: 'Neon Velocity: Redline',
      genre: 'Arcade Racing',
      cover: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
      playtime: '124 hrs',
      lastPlayed: '5 days ago',
      achievementsPct: 74,
      cloudSync: true,
      isFavorite: false,
      fps: 144,
      ping: '16ms',
      version: 'v2.0.2'
    },
    {
      id: 'game-5',
      title: 'Quantum Siege: Tactics',
      genre: 'Tactical Shooter',
      cover: 'https://images.unsplash.com/photo-1552824722-ddab1374e622?auto=format&fit=crop&w=800&q=80',
      playtime: '186 hrs',
      lastPlayed: '1 week ago',
      achievementsPct: 58,
      cloudSync: true,
      isFavorite: false,
      fps: 144,
      ping: '15ms',
      version: 'v1.12.0'
    },
    {
      id: 'game-6',
      title: 'Elden Echoes: Eclipse',
      genre: 'Souls-like RPG',
      cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      playtime: '94 hrs',
      lastPlayed: '2 weeks ago',
      achievementsPct: 45,
      cloudSync: true,
      isFavorite: false,
      fps: 90,
      ping: '20ms',
      version: 'v1.0.8'
    }
  ],

  posts: [
    {
      id: 'post-1',
      author: 'K4i_Shadow',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      badge: 'PRO PLAYER',
      badgeClass: 'pro',
      timestamp: '15m ago',
      game: 'Cyber Surge 2099',
      content: 'Clutched the Grand Finals tiebreaker with an overtime EMP blast! Our squad was at 5% reactor health. Huge shoutout to the team for the distraction play! 🏆🔥',
      hashtags: '#CyberSurge2099 #ClutchPlay #EsportsTourney #NexusRealm',
      mediaType: 'interactive-highlight',
      mediaTitle: 'Overtime EMP Quadra-Breach',
      likes: 148,
      isLiked: false,
      comments: [
        { user: 'Aura_Sniper', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80', text: 'That timing on the EMP was surgical! GG' },
        { user: 'Cyph3r_Ghost', avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80', text: 'I saw that live on stream, clean reaction time!' }
      ],
      isBookmarked: false
    },
    {
      id: 'post-2',
      author: 'Valkyrie_Nova',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      badge: 'CREATOR',
      badgeClass: 'creator',
      timestamp: '2h ago',
      game: 'Starfall Odyssey',
      content: 'Finally unlocked the mythical Nebula Corsair Dreadnought after 60+ interstellar salvage missions. Look at the particle trail radiance on this beauty! 🚀✨',
      hashtags: '#StarfallOdyssey #MMORPG #ShipFleet #CosmicExploration',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      likes: 312,
      isLiked: true,
      comments: [
        { user: 'PixelQueen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', text: 'The glow effect is unreal. What warp drives did you equip?' }
      ],
      isBookmarked: true
    }
  ]
};

// ==========================================================================
// 3. UI RENDER ENGINE
// ==========================================================================

// Render Profile Header Stats & XP
function renderProfile() {
  const u = AppState.user;
  document.getElementById('userGamertag').innerText = u.gamertag;
  document.getElementById('userClan').innerText = `[${u.clan}]`;
  document.getElementById('userRank').innerHTML = `<i class="fa-solid fa-crown"></i> ${u.rankTier}`;
  document.getElementById('userStatusQuote').innerHTML = `<i class="fa-solid fa-quote-left"></i> "${u.statusQuote}"`;
  document.getElementById('userAvatarImg').src = u.avatar;
  document.getElementById('headerAvatarImg').src = u.avatar;
  document.getElementById('headerUserName').innerText = u.gamertag;

  // XP Progress Bar
  const pct = Math.min(100, Math.round((u.currentXp / u.nextLevelXp) * 100));
  document.getElementById('xpLevelBadge').innerText = `LVL ${u.level}`;
  document.getElementById('xpCurrentLevelText').innerText = `Level ${u.level} Apex`;
  document.getElementById('xpNumberStats').innerHTML = `
    <span class="xp-current-num">${u.currentXp.toLocaleString()}</span> / ${u.nextLevelXp.toLocaleString()} XP
    <span class="xp-percentage-tag">(${pct}%)</span>
  `;
  document.getElementById('xpProgressFill').style.width = `${pct}%`;
  document.getElementById('xpMilestoneNext').innerText = `Next: Level ${u.level + 1}`;
}

// Render Achievements Grid
function renderAchievements(filter = 'all') {
  const container = document.getElementById('achievementsGrid');
  container.innerHTML = '';

  let list = AppState.achievements;
  if (filter === 'legendary') {
    list = list.filter(a => a.rarity === 'legendary' || a.rarity === 'mythic');
  } else if (filter === 'progress') {
    list = list.filter(a => !a.isUnlocked);
  }

  list.forEach(a => {
    const card = document.createElement('div');
    card.className = `achievement-card rarity-${a.rarity}`;
    card.onclick = () => openAchievementModal(a.id);

    let progressHtml = '';
    if (!a.isUnlocked) {
      progressHtml = `
        <div class="achievement-progress-strip">
          <div class="achievement-progress-fill" style="width: ${a.progress}%"></div>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="achievement-icon-frame">
        <i class="fa-solid ${a.icon}"></i>
      </div>
      <div class="achievement-details">
        <div class="achievement-top-meta">
          <span class="achievement-game-name">${a.game}</span>
          <span class="achievement-rarity-tag">${a.rarity}</span>
        </div>
        <div class="achievement-title">${a.title}</div>
        <div class="achievement-desc">${a.desc}</div>
        ${progressHtml}
        <div class="achievement-footer-meta">
          <span class="achievement-xp-reward"><i class="fa-solid fa-bolt"></i> +${a.rewardXp} XP</span>
          <span class="achievement-unlocked-date">${a.unlockedDate}</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Render Active Friends List
function renderFriends(tab = 'all', query = '') {
  const container = document.getElementById('friendsListScroll');
  container.innerHTML = '';

  let list = AppState.friends;
  if (tab === 'in-game') {
    list = list.filter(f => f.status === 'in-game');
  } else if (tab === 'online') {
    list = list.filter(f => f.status === 'online' || f.status === 'in-game');
  }

  if (query.trim()) {
    const q = query.toLowerCase();
    list = list.filter(f => f.name.toLowerCase().includes(q) || f.gameStatus.toLowerCase().includes(q));
  }

  document.getElementById('friendsCountBadge').innerText = `${list.length}`;

  list.forEach(f => {
    const item = document.createElement('div');
    item.className = 'friend-item';
    item.onclick = (e) => {
      // If action buttons clicked, do not open default chat
      if (e.target.closest('.btn-friend-action')) return;
      openChatWithFriend(f.id);
    };

    item.innerHTML = `
      <div class="friend-avatar-wrap">
        <img class="friend-avatar-img" src="${f.avatar}" alt="${f.name}">
        <span class="friend-status-dot ${f.status}"></span>
      </div>
      <div class="friend-info">
        <div class="friend-name-row">
          <span class="friend-name">${f.name}</span>
        </div>
        <span class="friend-game-status ${f.status === 'in-game' ? 'in-game-highlight' : ''}">${f.gameStatus}</span>
      </div>
      <div class="friend-hover-actions">
        <button class="btn-friend-action" title="Message" onclick="openChatWithFriend('${f.id}')">
          <i class="fa-solid fa-comment-dots"></i>
        </button>
        <button class="btn-friend-action" title="Invite Party" onclick="sendPartyInvite('${f.name}')">
          <i class="fa-solid fa-user-plus"></i>
        </button>
      </div>
    `;
    container.appendChild(item);
  });
}

// Render Favorite Game Library Cards
function renderGameLibrary(filterFavsOnly = false) {
  const container = document.getElementById('libraryCardsGrid');
  container.innerHTML = '';

  let list = AppState.games;
  if (filterFavsOnly) {
    list = list.filter(g => g.isFavorite);
  }

  list.forEach(g => {
    const card = document.createElement('div');
    card.className = 'game-library-card';
    card.innerHTML = `
      <div class="game-card-cover">
        <img src="${g.cover}" alt="${g.title}" loading="lazy">
        <div class="game-cover-gradient"></div>
        <div class="game-card-badges">
          <span class="game-genre-tag">${g.genre}</span>
          ${g.cloudSync ? '<span class="game-cloud-badge"><i class="fa-solid fa-cloud"></i> Synced</span>' : ''}
        </div>
        <div class="game-favorite-toggle ${g.isFavorite ? 'active' : ''}" onclick="toggleFavoriteGame('${g.id}', event)">
          <i class="fa-${g.isFavorite ? 'solid' : 'regular'} fa-heart"></i>
        </div>
      </div>
      <div class="game-card-body">
        <div class="game-title-row">
          <h3 class="game-title">${g.title}</h3>
          <span class="game-playtime-badge"><i class="fa-regular fa-clock"></i> ${g.playtime}</span>
        </div>
        <div class="game-stats-row">
          <span>Achievements: ${g.achievementsPct}%</span>
          <span>Last played: ${g.lastPlayed}</span>
        </div>
        <div class="game-achievement-bar">
          <div class="game-achievement-bar-fill" style="width: ${g.achievementsPct}%"></div>
        </div>
        <div class="game-card-actions">
          <button class="btn-quick-launch" onclick="launchGame('${g.id}')">
            <i class="fa-solid fa-play"></i> Quick Launch
          </button>
          <button class="btn-game-details" title="Game Hub / Settings" onclick="showToast('Game Hub', 'Checking updates & cloud saves for ${g.title}...')">
            <i class="fa-solid fa-gear"></i>
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Render Community Feed Posts
function renderCommunityFeed() {
  const container = document.getElementById('feedPostsContainer');
  container.innerHTML = '';

  AppState.posts.forEach(p => {
    const card = document.createElement('div');
    card.className = 'feed-post-card';
    card.id = `post-card-${p.id}`;

    let mediaHtml = '';
    if (p.mediaType === 'interactive-highlight') {
      mediaHtml = `
        <div class="post-media-container">
          <div class="interactive-highlight-player" id="player-${p.id}">
            <canvas class="gameplay-canvas" id="canvas-${p.id}"></canvas>
            <div class="video-overlay-play-btn" onclick="togglePlayHighlightCanvas('${p.id}')">
              <i class="fa-solid fa-play" id="playIcon-${p.id}"></i>
            </div>
            <div class="video-hud-overlay">
              <span class="hud-pill live-rec">REC • HIGHLIGHT</span>
              <span class="hud-pill">${p.mediaTitle}</span>
              <span class="hud-pill">60 FPS 4K</span>
            </div>
            <div class="video-player-controls-bar">
              <div class="video-progress-rail">
                <div class="video-progress-fill" id="progressFill-${p.id}"></div>
              </div>
              <span class="video-time-stamp" id="timeCode-${p.id}">00:14 / 00:30</span>
            </div>
          </div>
        </div>
      `;
    } else if (p.mediaType === 'image') {
      mediaHtml = `
        <div class="post-media-container">
          <img src="${p.mediaUrl}" alt="${p.game} highlight" loading="lazy">
        </div>
      `;
    }

    // Render Comments
    const commentsListHtml = p.comments.map(c => `
      <div class="comment-item">
        <img class="comment-avatar" src="${c.avatar}" alt="${c.user}">
        <div class="comment-bubble">
          <div class="comment-user-name">${c.user}</div>
          <div>${c.text}</div>
        </div>
      </div>
    `).join('');

    card.innerHTML = `
      <div class="post-header">
        <div class="post-author-box">
          <img class="post-author-avatar" src="${p.avatar}" alt="${p.author}">
          <div class="post-author-details">
            <div class="post-author-name-row">
              <span class="post-author-name">${p.author}</span>
              ${p.badge ? `<span class="post-badge ${p.badgeClass}">${p.badge}</span>` : ''}
            </div>
            <div class="post-timestamp-meta">
              <span>${p.timestamp}</span>
              <span>•</span>
              <span class="post-game-tag"><i class="fa-solid fa-gamepad"></i> ${p.game}</span>
            </div>
          </div>
        </div>
        <button class="btn-icon-control" style="width:32px; height:32px;" onclick="showToast('Highlight Options', 'Post link copied to clipboard!')">
          <i class="fa-solid fa-ellipsis"></i>
        </button>
      </div>

      <div class="post-content-text">
        ${p.content}
        <div class="post-hashtags">${p.hashtags}</div>
      </div>

      ${mediaHtml}

      <div class="post-actions-bar">
        <div class="post-action-btn-group">
          <button class="btn-post-action ${p.isLiked ? 'liked' : ''}" onclick="toggleLikePost('${p.id}')">
            <i class="fa-${p.isLiked ? 'solid' : 'regular'} fa-heart"></i>
            <span id="likeCount-${p.id}">${p.likes}</span>
          </button>
          <button class="btn-post-action" onclick="toggleCommentsDrawer('${p.id}')">
            <i class="fa-regular fa-comment-dots"></i>
            <span>${p.comments.length} Comments</span>
          </button>
          <button class="btn-post-action" onclick="sharePost('${p.id}')">
            <i class="fa-solid fa-share-nodes"></i> Share
          </button>
        </div>
        <button class="btn-post-action ${p.isBookmarked ? 'bookmarked' : ''}" onclick="toggleBookmarkPost('${p.id}')">
          <i class="fa-${p.isBookmarked ? 'solid' : 'regular'} fa-bookmark"></i>
        </button>
      </div>

      <div class="post-comments-section" id="commentsSection-${p.id}">
        <div class="comment-input-row">
          <input type="text" class="comment-input" id="commentInput-${p.id}" placeholder="Write a comment..." onkeydown="handleCommentKeypress(event, '${p.id}')">
          <button class="btn-send-comment" onclick="submitComment('${p.id}')">
            <i class="fa-solid fa-paper-plane"></i>
          </button>
        </div>
        <div class="comments-thread" id="commentsThread-${p.id}">
          ${commentsListHtml}
        </div>
      </div>
    `;

    container.appendChild(card);

    // Initialize Canvas if highlight player
    if (p.mediaType === 'interactive-highlight') {
      setTimeout(() => initHighlightCanvas(`canvas-${p.id}`), 50);
    }
  });
}

// ==========================================================================
// 4. INTERACTIVE ACTIONS (XP, POSTING, COMMENTS, FRIENDS, MINI-GAME)
// ==========================================================================

// Claim XP Action
function claimDailyXp() {
  Sound.playXpGain();
  const xpBonus = 500;
  AppState.user.currentXp += xpBonus;

  showToast('Daily XP Claimed!', `+${xpBonus} XP added to your Apex progression profile!`);

  // Check if Level Up
  if (AppState.user.currentXp >= AppState.user.nextLevelXp) {
    setTimeout(() => {
      levelUpUser();
    }, 400);
  } else {
    renderProfile();
  }
}

function levelUpUser() {
  AppState.user.level += 1;
  AppState.user.currentXp -= AppState.user.nextLevelXp;
  AppState.user.nextLevelXp = Math.round(AppState.user.nextLevelXp * 1.25);
  Sound.playLevelUp();
  renderProfile();

  showToast('LEVEL UP! 🎉', `Congratulations! You reached Level ${AppState.user.level} Apex Master!`, 'toast-achievement');
  triggerConfetti();
}

// Confetti celebration helper
function triggerConfetti() {
  const colors = ['#00f3ff', '#9d4edd', '#ff007f', '#fbbf24', '#10b981'];
  for (let i = 0; i < 40; i++) {
    const flake = document.createElement('div');
    flake.style.position = 'fixed';
    flake.style.left = `${Math.random() * 100}vw`;
    flake.style.top = '-10px';
    flake.style.width = `${Math.random() * 8 + 6}px`;
    flake.style.height = `${Math.random() * 8 + 6}px`;
    flake.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    flake.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    flake.style.zIndex = '9999';
    flake.style.pointerEvents = 'none';
    flake.style.boxShadow = '0 0 10px rgba(255,255,255,0.8)';
    flake.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(flake);

    const fallDuration = Math.random() * 2 + 1.5;
    flake.animate([
      { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
      { transform: `translateY(100vh) translateX(${Math.random() * 200 - 100}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
    ], {
      duration: fallDuration * 1000,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
    }).onfinish = () => flake.remove();
  }
}

// Post Creator logic
let selectedAttachment = null;

function attachMediaPrompt() {
  Sound.playClick();
  const presets = [
    { type: 'interactive-highlight', title: 'Triple Kill Overtime Clutch' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80', title: 'Cyber Surge Boss Raid Victory' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80', title: 'Drift Circuit World Record' }
  ];

  selectedAttachment = presets[Math.floor(Math.random() * presets.length)];
  const previewBox = document.getElementById('composerPreviewBox');
  const previewImg = document.getElementById('composerPreviewImg');
  
  if (selectedAttachment.type === 'image') {
    previewImg.src = selectedAttachment.url;
  } else {
    previewImg.src = 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80';
  }
  previewBox.style.display = 'block';
  showToast('Media Attached', `Loaded "${selectedAttachment.title}" for your highlight!`);
}

function removeComposerPreview() {
  selectedAttachment = null;
  document.getElementById('composerPreviewBox').style.display = 'none';
}

function submitNewHighlight() {
  const textInput = document.getElementById('composerTextarea');
  const gameSelect = document.getElementById('composerGameSelect');
  const text = textInput.value.trim();

  if (!text) {
    showToast('Empty Highlight', 'Please write something about your gaming highlight!');
    return;
  }

  Sound.playXpGain();

  const newPost = {
    id: `post-${Date.now()}`,
    author: AppState.user.gamertag,
    avatar: AppState.user.avatar,
    badge: 'MEMBER',
    badgeClass: 'pro',
    timestamp: 'Just now',
    game: gameSelect.value,
    content: text,
    hashtags: `#${gameSelect.value.replace(/\s+/g, '')} #Highlight #NexusClips`,
    mediaType: selectedAttachment ? selectedAttachment.type : 'interactive-highlight',
    mediaTitle: selectedAttachment ? selectedAttachment.title : 'Live Gameplay Replay',
    mediaUrl: selectedAttachment?.url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    likes: 1,
    isLiked: true,
    comments: [],
    isBookmarked: false
  };

  AppState.posts.unshift(newPost);
  textInput.value = '';
  removeComposerPreview();
  renderCommunityFeed();

  // Award XP for contributing to community
  AppState.user.currentXp += 150;
  renderProfile();
  showToast('Highlight Published! 🔥', '+150 Community XP earned!');
}

// Like / Comment / Share on Feed
function toggleLikePost(postId) {
  Sound.playClick();
  const post = AppState.posts.find(p => p.id === postId);
  if (!post) return;

  post.isLiked = !post.isLiked;
  post.likes += post.isLiked ? 1 : -1;

  const countSpan = document.getElementById(`likeCount-${postId}`);
  if (countSpan) countSpan.innerText = post.likes;

  const card = document.getElementById(`post-card-${postId}`);
  const btn = card?.querySelector('.btn-post-action');
  if (btn) {
    btn.classList.toggle('liked', post.isLiked);
    const heart = btn.querySelector('i');
    if (heart) {
      heart.className = `fa-${post.isLiked ? 'solid' : 'regular'} fa-heart`;
    }
  }
}

function toggleBookmarkPost(postId) {
  Sound.playClick();
  const post = AppState.posts.find(p => p.id === postId);
  if (!post) return;
  post.isBookmarked = !post.isBookmarked;

  const card = document.getElementById(`post-card-${postId}`);
  const bookmarkBtn = card?.querySelectorAll('.btn-post-action')[3];
  if (bookmarkBtn) {
    bookmarkBtn.classList.toggle('bookmarked', post.isBookmarked);
    const icon = bookmarkBtn.querySelector('i');
    if (icon) icon.className = `fa-${post.isBookmarked ? 'solid' : 'regular'} fa-bookmark`;
  }
  showToast('Bookmarks', post.isBookmarked ? 'Highlight saved to your collection!' : 'Removed from bookmarks.');
}

function toggleCommentsDrawer(postId) {
  Sound.playClick();
  const section = document.getElementById(`commentsSection-${postId}`);
  if (!section) return;
  const isShown = section.style.display === 'flex';
  section.style.display = isShown ? 'none' : 'flex';
}

function handleCommentKeypress(e, postId) {
  if (e.key === 'Enter') {
    submitComment(postId);
  }
}

function submitComment(postId) {
  const input = document.getElementById(`commentInput-${postId}`);
  const text = input.value.trim();
  if (!text) return;

  Sound.playClick();
  const post = AppState.posts.find(p => p.id === postId);
  if (!post) return;

  const newComment = {
    user: AppState.user.gamertag,
    avatar: AppState.user.avatar,
    text: text
  };
  post.comments.push(newComment);

  const thread = document.getElementById(`commentsThread-${postId}`);
  const commentEl = document.createElement('div');
  commentEl.className = 'comment-item';
  commentEl.innerHTML = `
    <img class="comment-avatar" src="${newComment.avatar}" alt="${newComment.user}">
    <div class="comment-bubble">
      <div class="comment-user-name">${newComment.user}</div>
      <div>${newComment.text}</div>
    </div>
  `;
  thread.appendChild(commentEl);
  input.value = '';
}

function sharePost(postId) {
  Sound.playClick();
  navigator.clipboard?.writeText(window.location.href);
  showToast('Share Highlight', 'Direct link to highlight copied to clipboard!');
}

// Favorite Game Toggle
function toggleFavoriteGame(gameId, event) {
  event.stopPropagation();
  Sound.playClick();
  const game = AppState.games.find(g => g.id === gameId);
  if (!game) return;
  game.isFavorite = !game.isFavorite;
  renderGameLibrary();
  showToast('Favorites', game.isFavorite ? `Pinned ${game.title} to favorites!` : `Removed ${game.title} from favorites.`);
}

// ==========================================================================
// 5. ANIMATED HIGHLIGHT CANVAS (Live Cyber Gameplay Visualizer)
// ==========================================================================
const activeAnimations = {};

function initHighlightCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.parentElement.clientWidth || 600;
  canvas.height = canvas.parentElement.clientHeight || 350;

  let frame = 0;
  let particles = [];
  for (let i = 0; i < 35; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 2 + 1,
      color: i % 2 === 0 ? '#00f3ff' : '#9d4edd'
    });
  }

  function draw() {
    ctx.fillStyle = 'rgba(6, 8, 16, 0.25)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid Floor Perspective
    ctx.strokeStyle = 'rgba(0, 243, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Crosshairs & Combat HUD
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const pulse = Math.sin(frame * 0.05) * 6;

    ctx.strokeStyle = '#00f3ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 35 + pulse, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#ff007f';
    ctx.fillRect(centerX - 3, centerY - 3, 6, 6);

    // Particle Swarm
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    frame++;
    activeAnimations[canvasId] = requestAnimationFrame(draw);
  }

  draw();
}

function togglePlayHighlightCanvas(postId) {
  Sound.playClick();
  const icon = document.getElementById(`playIcon-${postId}`);
  if (icon) {
    if (icon.classList.contains('fa-play')) {
      icon.className = 'fa-solid fa-pause';
      showToast('Highlight Playing', 'Playing 4K 60FPS video replay mockup');
    } else {
      icon.className = 'fa-solid fa-play';
    }
  }
}

// ==========================================================================
// 6. MINI-CHAT DRAWER SYSTEM & AUTOMATED GAMER REPLIES
// ==========================================================================
let currentChatFriendId = null;

function openChatWithFriend(friendId) {
  Sound.playPing();
  currentChatFriendId = friendId;
  const friend = AppState.friends.find(f => f.id === friendId);
  if (!friend) return;

  document.getElementById('chatTargetAvatar').src = friend.avatar;
  document.getElementById('chatTargetName').innerText = friend.name;
  
  const drawer = document.getElementById('chatDrawer');
  drawer.classList.add('open');

  renderChatMessages(friend);
}

function closeChatDrawer() {
  document.getElementById('chatDrawer').classList.remove('open');
  currentChatFriendId = null;
}

function renderChatMessages(friend) {
  const container = document.getElementById('chatMessagesBody');
  container.innerHTML = '';

  if (friend.chatHistory.length === 0) {
    container.innerHTML = `<div style="text-align:center; color: var(--text-muted); font-size: 0.8rem; margin-top: 2rem;">Start a chat with ${friend.name}...</div>`;
    return;
  }

  friend.chatHistory.forEach(msg => {
    const el = document.createElement('div');
    el.className = `chat-msg ${msg.sender}`;
    el.innerText = msg.text;
    container.appendChild(el);
  });

  container.scrollTop = container.scrollHeight;
}

function sendChatMessage() {
  const input = document.getElementById('chatInputField');
  const text = input.value.trim();
  if (!text || !currentChatFriendId) return;

  Sound.playClick();
  const friend = AppState.friends.find(f => f.id === currentChatFriendId);
  if (!friend) return;

  friend.chatHistory.push({ sender: 'me', text: text });
  input.value = '';
  renderChatMessages(friend);

  // Automated realistic gamer reply after 1.5s
  setTimeout(() => {
    const gamerReplies = [
      "Let's queue up ranked right now!",
      "Nice clutch on that last match!",
      "GG! Invite me when your party opens up.",
      "Just grabbing a drink then I'm in.",
      "Are you running the laser rifle build?",
      "That highlight you posted was insane haha"
    ];
    const reply = gamerReplies[Math.floor(Math.random() * gamerReplies.length)];
    friend.chatHistory.push({ sender: 'them', text: reply });
    Sound.playPing();
    renderChatMessages(friend);
  }, 1400);
}

function sendPartyInvite(friendName) {
  Sound.playClick();
  showToast('Party Invite Sent', `Invited ${friendName} to your party lobby.`);
}

// ==========================================================================
// 7. GAME LAUNCHER MODAL & PLAYABLE MINI-ARCADE
// ==========================================================================
let launchInterval = null;
let arcadeAnimationId = null;

function launchGame(gameId) {
  const game = AppState.games.find(g => g.id === gameId);
  if (!game) return;

  Sound.playLaunch();

  document.getElementById('launcherTitle').innerText = game.title;
  document.getElementById('launcherHeroView').style.backgroundImage = `url('${game.cover}')`;
  document.getElementById('launcherGenreChip').innerText = game.genre;
  document.getElementById('launcherVersionChip').innerText = game.version;
  document.getElementById('launcherPingVal').innerText = game.ping;
  document.getElementById('launcherFpsVal').innerText = `${game.fps} FPS`;

  const modal = document.getElementById('launcherModal');
  modal.classList.add('active');

  // Reset progress bar
  const fill = document.getElementById('launchProgressFill');
  const label = document.getElementById('launchStatusText');
  fill.style.width = '0%';
  label.innerText = 'Initializing Anti-Cheat & Assets...';

  // Start Launch sequence
  let progress = 0;
  if (launchInterval) clearInterval(launchInterval);
  launchInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 12) + 8;
    if (progress > 100) progress = 100;
    fill.style.width = `${progress}%`;

    if (progress < 30) {
      label.innerText = 'Verifying Cloud Save Data...';
    } else if (progress < 70) {
      label.innerText = 'Connecting to Low-Latency Region (US-East)...';
    } else if (progress < 100) {
      label.innerText = 'Launching Game Engine & Shaders...';
    } else {
      clearInterval(launchInterval);
      label.innerText = 'Running! Enjoy the game.';
      Sound.playLevelUp();
      showToast('Game Launched 🎮', `${game.title} is now running at ${game.fps} FPS.`);
    }
  }, 250);

  // Start Playable Arcade Mini-Game
  initArcadeMiniGame();
}

function closeLauncherModal() {
  document.getElementById('launcherModal').classList.remove('active');
  if (launchInterval) clearInterval(launchInterval);
  if (arcadeAnimationId) cancelAnimationFrame(arcadeAnimationId);
}

// Interactive Playable Mini-Game in Launcher: "NEON RUNNER"
function initArcadeMiniGame() {
  const canvas = document.getElementById('arcadeCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.parentElement.clientWidth || 580;
  canvas.height = 180;

  let player = { x: 50, y: 130, vy: 0, jumping: false, width: 22, height: 22 };
  let obstacles = [];
  let score = 0;
  let gameSpeed = 4;
  let frame = 0;

  function jump() {
    if (!player.jumping) {
      player.vy = -9;
      player.jumping = true;
      Sound.playClick();
    }
  }

  // Bind controls (Spacebar or canvas click/tap)
  window.onkeydown = (e) => {
    if (e.code === 'Space' && document.getElementById('launcherModal').classList.contains('active')) {
      e.preventDefault();
      jump();
    }
  };
  canvas.onclick = jump;

  function update() {
    // Gravity & Ground
    player.vy += 0.45;
    player.y += player.vy;
    if (player.y > 130) {
      player.y = 130;
      player.vy = 0;
      player.jumping = false;
    }

    // Spawn Obstacles
    if (frame % 80 === 0) {
      obstacles.push({ x: canvas.width, y: 132, width: 16, height: 20 });
    }

    // Move Obstacles
    obstacles.forEach((obs, index) => {
      obs.x -= gameSpeed;
      // Collision
      if (
        player.x < obs.x + obs.width &&
        player.x + player.width > obs.x &&
        player.y < obs.y + obs.height &&
        player.y + player.height > obs.y
      ) {
        // Hit obstacle, reset score
        score = 0;
        obs.x = -100;
      }
    });

    obstacles = obstacles.filter(obs => obs.x > -50);
    score++;
    frame++;

    // Draw
    ctx.fillStyle = '#060812';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Floor line
    ctx.strokeStyle = '#00f3ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 152);
    ctx.lineTo(canvas.width, 152);
    ctx.stroke();

    // Player (Cyber Neon Cube)
    ctx.fillStyle = '#ff007f';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ff007f';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.shadowBlur = 0;

    // Obstacles (Spikes / Barriers)
    ctx.fillStyle = '#00f3ff';
    obstacles.forEach(obs => {
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    });

    // Score text
    ctx.fillStyle = '#fff';
    ctx.font = '14px Rajdhani';
    ctx.fillText(`ARCADE SCORE: ${score}`, 15, 25);

    arcadeAnimationId = requestAnimationFrame(update);
  }

  update();
}

// ==========================================================================
// 8. ACHIEVEMENT MODAL & UNLOCK SIMULATOR
// ==========================================================================
function openAchievementModal(achId) {
  Sound.playClick();
  const ach = AppState.achievements.find(a => a.id === achId);
  if (!ach) return;

  document.getElementById('achModalTitle').innerText = ach.title;
  document.getElementById('achModalGame').innerText = ach.game;
  document.getElementById('achModalDesc').innerText = ach.desc;
  document.getElementById('achModalRarity').innerText = `${ach.rarity.toUpperCase()} • ${ach.rarityPercent}`;
  document.getElementById('achModalReward').innerText = `+${ach.rewardXp} XP`;
  document.getElementById('achModalIcon').className = `fa-solid ${ach.icon}`;

  const modal = document.getElementById('achievementModal');
  modal.classList.add('active');
}

function closeAchievementModal() {
  document.getElementById('achievementModal').classList.remove('active');
}

function testUnlockNewAchievement() {
  Sound.playAchievement();
  const newAch = {
    id: `ach-${Date.now()}`,
    title: 'Cyber Overlord',
    game: 'Cyber Surge 2099',
    rarity: 'mythic',
    rarityPercent: '0.4% of players',
    rewardXp: 1500,
    icon: 'fa-shield-halved',
    desc: 'Unlocked all master mastery badges across all game factions.',
    unlockedDate: 'Just now',
    isUnlocked: true,
    progress: 100
  };

  AppState.achievements.unshift(newAch);
  renderAchievements();
  showToast('ACHIEVEMENT UNLOCKED 🏆', `Cyber Overlord (+1,500 XP)`, 'toast-achievement');
  AppState.user.currentXp += 1500;
  if (AppState.user.currentXp >= AppState.user.nextLevelXp) {
    levelUpUser();
  } else {
    renderProfile();
  }
}

// ==========================================================================
// 9. PROFILE EDIT MODAL
// ==========================================================================
function openEditProfileModal() {
  Sound.playClick();
  document.getElementById('editGamertagInput').value = AppState.user.gamertag;
  document.getElementById('editClanInput').value = AppState.user.clan;
  document.getElementById('editStatusInput').value = AppState.user.statusQuote;
  document.getElementById('profileEditModal').classList.add('active');
}

function closeEditProfileModal() {
  document.getElementById('profileEditModal').classList.remove('active');
}

function saveProfileEdits() {
  Sound.playClick();
  const newTag = document.getElementById('editGamertagInput').value.trim();
  const newClan = document.getElementById('editClanInput').value.trim();
  const newStatus = document.getElementById('editStatusInput').value.trim();

  if (newTag) AppState.user.gamertag = newTag;
  if (newClan) AppState.user.clan = newClan;
  if (newStatus) AppState.user.statusQuote = newStatus;

  renderProfile();
  closeEditProfileModal();
  showToast('Profile Updated', 'Your gamer card and status have been updated!');
}

// ==========================================================================
// 10. NOTIFICATION TOAST ENGINE
// ==========================================================================
function showToast(title, desc, extraClass = '') {
  const shelf = document.getElementById('toastShelf');
  const toast = document.createElement('div');
  toast.className = `toast-item ${extraClass}`;
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fa-solid ${extraClass.includes('achievement') ? 'fa-trophy' : 'fa-bell'}"></i>
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-desc">${desc}</div>
    </div>
  `;
  shelf.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'all 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-40px)';
    setTimeout(() => toast.remove(), 350);
  }, 3800);
}

// ==========================================================================
// 11. GLOBAL EVENT LISTENERS & SETUP
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Initial renders
  renderProfile();
  renderAchievements();
  renderFriends();
  renderGameLibrary();
  renderCommunityFeed();

  // Audio Toggle Button
  const audioBtn = document.getElementById('btnAudioToggle');
  const audioIcon = document.getElementById('audioToggleIcon');
  if (Sound.isMuted && audioIcon) {
    audioIcon.className = 'fa-solid fa-volume-xmark';
  }

  audioBtn?.addEventListener('click', () => {
    const muted = Sound.toggleMute();
    audioIcon.className = muted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
    showToast('Sound Effects', muted ? 'Audio Muted' : 'Audio Enabled');
    if (!muted) Sound.playClick();
  });

  // Mobile Sidebar Toggle
  const mobileToggle = document.getElementById('mobileSidebarToggle');
  const sidebar = document.getElementById('appSidebar');
  mobileToggle?.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-open');
  });

  // Friends search input
  const friendSearch = document.getElementById('friendsSearchInput');
  friendSearch?.addEventListener('input', (e) => {
    const activeTab = document.querySelector('.friends-tab-btn.active')?.dataset.tab || 'all';
    renderFriends(activeTab, e.target.value);
  });

  // Global search input
  const globalSearch = document.getElementById('globalSearchInput');
  globalSearch?.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    // Filter games and friends dynamically
    renderFriends('all', val);
  });

  // Friends Filter Tabs
  document.querySelectorAll('.friends-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.friends-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      renderFriends(tab, friendSearch?.value || '');
    });
  });

  // Achievement Filter Tabs
  document.querySelectorAll('.achievement-filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.achievement-filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderAchievements(pill.dataset.filter);
    });
  });

  // Chat message send button & Enter key
  const chatInput = document.getElementById('chatInputField');
  chatInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      sendChatMessage();
    }
  });

  // Close modals on backdrop click
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      e.target.classList.remove('active');
      if (launchInterval) clearInterval(launchInterval);
      if (arcadeAnimationId) cancelAnimationFrame(arcadeAnimationId);
    }
  });
});
