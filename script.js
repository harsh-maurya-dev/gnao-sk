/**
 * =========================================================
 * NAVRATRI GARBA NIGHT — RAAS & ROMANCE INVITATION ENGINE
 * =========================================================
 */

// ✏️ Personalize default names and data here:
const dateConfig = {
  yourName: "Harsh",
  herName: "Shehnaz",
  heroTitle: "Garba Under The Starlit Sky",
  dateNumber: "2026",
  music: "assets/music.mp3",
  photos: [
    {
      src: "assets/images/photo1.jpg",
      caption: "When the noise faded, you wrapped me in your dupatta and held me close. In your warmth, I found my safest home. 🌸❤️",
      date: "My Safe Haven & Your Warmth"
    },
    {
      src: "assets/images/photo2.jpg",
      caption: "Lost in the dhol beats, twirling hand in hand under a canopy of starlight. In a ground full of dancers, my eyes never left yours. 💃✨",
      date: "Twirling Under the Starlight"
    },
    {
      src: "assets/images/photo3.jpg",
      caption: "Pulling you close mid-dance, heartbeats racing faster than the music. In that split second, time stopped just for the two of us. 🥁💫",
      date: "A Stolen Beat & Sweet Embrace"
    },
    {
      src: "assets/images/photo4.jpg",
      caption: "When your feet couldn't walk from dancing all night, carrying you in my arms felt like the easiest, sweetest thing in the world. 🌙❤️",
      date: "Carrying My Whole World"
    }
  ]
};

// Current chosen date options
const selectedDate = {
  restro: "🏛️ Global Garba Festival 2026 (Purana Qila)",
  timing: "👑 Patola Print Fusion Coordinates",
  commute: "🎶 \"Chogada\" (Loveyatri)",
  duration: "🥟 Crispy Fafda & Hot Sweet Jalebis"
};

(() => {
  'use strict';

  // Ensure her name is firmly set to Shehnaz
  dateConfig.herName = "Shehnaz";
  dateConfig.music = "assets/music.mp3";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  /* =========================================================
     1. BIND DATA & CUSTOMIZATION
     ========================================================= */
  function applyBindings() {
    $$('[data-bind="yourName"]').forEach(el => el.textContent = dateConfig.yourName);
    $$('[data-bind="herName"]').forEach(el => el.textContent = dateConfig.herName);
    $$('[data-bind="dateNumber"]').forEach(el => el.textContent = dateConfig.dateNumber);
    
    document.title = `For ${dateConfig.herName} ❤️ | Will You Be My Garba Partner?`;
  }

  let startFestiveMusic = null;

  /* =========================================================
     2. STEP 1: OPENING GARBA LOADER SEQUENCE
     ========================================================= */
  function initLoader() {
    const loader = $('#romantic-loader');
    const fill = $('#loader-progress');
    const pct = $('#loader-percentage');
    const quote = $('#loader-quote');
    const skipBtn = $('#skip-loader-btn');

    if (!loader) return;

    const messages = [
      { at: 5, text: "Tuning the dhol beats..." },
      { at: 28, text: "Polishing the dandiya sticks & checking matching chaniya choli..." },
      { at: 55, text: "Searching for the most stunning Garba partner in the universe..." },
      { at: 80, text: "Brewing an invitation straight from the heart..." },
      { at: 96, text: "Ready to twirl into Navratri night together... ✨" }
    ];

    let currentProgress = 0;
    let loaderDone = false;

    function exitLoader() {
      if (loaderDone) return;
      loaderDone = true;
      loader.classList.add('hidden-loader');

      // Start background music automatically right as loading finishes
      if (typeof startFestiveMusic === 'function') {
        startFestiveMusic();
      }

      setTimeout(() => {
        loader.remove();
        // trigger gentle festive particle burst
        for (let i = 0; i < 6; i++) {
          setTimeout(createFloatingParticle, i * 220);
        }
      }, 850);
    }

    skipBtn?.addEventListener('click', exitLoader);

    const interval = setInterval(() => {
      if (loaderDone) {
        clearInterval(interval);
        return;
      }

      currentProgress += Math.floor(Math.random() * 4) + 1;
      if (currentProgress > 100) currentProgress = 100;

      if (fill) fill.style.width = `${currentProgress}%`;
      if (pct) pct.textContent = `${currentProgress}%`;

      // Update quote based on progress
      const matchMsg = [...messages].reverse().find(m => currentProgress >= m.at);
      if (matchMsg && quote && quote.textContent !== matchMsg.text) {
        quote.style.opacity = '0';
        setTimeout(() => {
          quote.textContent = matchMsg.text;
          quote.style.opacity = '1';
        }, 200);
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(exitLoader, 600);
      }
    }, 60);
  }

  /* =========================================================
     3. AMBIENT CANVAS (Golden Embers, Diya Sparks, Warm Bokeh)
     ========================================================= */
  function initAmbientCanvas() {
    const canvas = $('#ambient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Warm bokeh festive lights
    const bokehCount = Math.min(45, Math.floor(window.innerWidth / 28));
    const bokehParticles = [];
    const colors = [
      'rgba(255, 210, 77,', // Warm festive gold
      'rgba(255, 122, 0,',  // Marigold saffron
      'rgba(255, 42, 122,', // Rani pink
      'rgba(255, 235, 150,' // Pale warm gold
    ];

    for (let i = 0; i < bokehCount; i++) {
      bokehParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3.2 + 1.2,
        baseAlpha: Math.random() * 0.45 + 0.2,
        alpha: 0,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: -Math.random() * 0.45 - 0.2, // drifting upwards like festival embers
        glowColor: colors[Math.floor(Math.random() * colors.length)],
        phase: Math.random() * Math.PI * 2
      });
    }

    // Rising golden sparks & embers
    const sparkCount = Math.min(35, Math.floor(window.innerWidth / 35));
    const sparks = [];
    for (let i = 0; i < sparkCount; i++) {
      sparks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.8,
        speedY: -Math.random() * 1.5 - 0.6,
        speedX: (Math.random() - 0.5) * 0.6,
        alpha: Math.random() * 0.7 + 0.2,
        wobble: Math.random() * Math.PI * 2
      });
    }

    let tick = 0;
    function render() {
      ctx.clearRect(0, 0, width, height);
      tick += 0.02;

      // 1. Draw glowing festival bokeh orbs
      for (const f of bokehParticles) {
        f.x += f.speedX;
        f.y += f.speedY;
        f.alpha = f.baseAlpha + Math.sin(tick + f.phase) * 0.18;

        if (f.y < -20) {
          f.y = height + 10;
          f.x = Math.random() * width;
        }
        if (f.x < -20) f.x = width + 10;
        if (f.x > width + 20) f.x = -10;

        const rad = Math.max(0.1, f.radius);
        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, rad * 4);
        grad.addColorStop(0, `${f.glowColor} ${Math.max(0, Math.min(1, f.alpha))})`);
        grad.addColorStop(0.5, `${f.glowColor} ${Math.max(0, Math.min(1, f.alpha * 0.35))})`);
        grad.addColorStop(1, `${f.glowColor} 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, rad * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw rising festive sparks
      for (const s of sparks) {
        s.y += s.speedY;
        s.x += s.speedX + Math.sin(tick + s.wobble) * 0.3;

        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(255, 220, 120, ${s.alpha * (0.8 + Math.sin(tick * 3 + s.wobble) * 0.2)})`;
        ctx.shadowColor = '#ffd24d';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }

  /* =========================================================
     4. FLOATING PARTICLES GENERATOR
     ========================================================= */
  function createFloatingParticle() {
    if (document.hidden) return;
    const container = $('#hearts-container');
    if (!container) return;

    const el = document.createElement('div');
    el.className = 'floating-heart';
    const emojis = ['🪔', '✨', '💃', '🕺', '💖', '🥁', '🌸', '⭐'];
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    el.style.left = `${Math.random() * 94}vw`;
    el.style.fontSize = `${Math.random() * 16 + 15}px`;
    el.style.animationDuration = `${Math.random() * 3 + 5.5}s`;

    container.appendChild(el);
    el.addEventListener('animationend', () => el.remove(), { once: true });
  }
  setInterval(createFloatingParticle, 2800);

  /* Sparkle trail on mousemove */
  let lastSparkleTime = 0;
  window.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSparkleTime < 50) return;
    lastSparkleTime = now;

    const s = document.createElement('div');
    s.className = 'sparkle-trail';
    const size = Math.random() * 7 + 4;
    s.style.width = `${size}px`;
    s.style.height = `${size}px`;
    s.style.left = `${e.clientX}px`;
    s.style.top = `${e.clientY}px`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 700);
  });

  /* =========================================================
     5. FESTIVE AUDIO ENGINE & MUSIC PLAYER
     ========================================================= */
  let audioCtx = null;
  let isMusicPlaying = false;
  let synthInterval = null;

  function playFestiveMelody() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Melodic Indian classical pentatonic raag scales (Bhupali / Mohanam: Sa, Re, Ga, Pa, Dha)
    const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
    let step = 0;

    function playChime(freq) {
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.06, audioCtx.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.8);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 1.8);
      } catch (e) {
        console.warn("Audio chime error", e);
      }
    }

    synthInterval = setInterval(() => {
      if (!isMusicPlaying) return;
      const note = notes[step % notes.length];
      playChime(note);
      step = (step + (Math.random() > 0.4 ? 1 : 2)) % notes.length;
    }, 420);
  }

  function stopFestiveMelody() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  }

  function setupMusicToggle() {
    const musicBtn = $('#musicToggleBtn');
    const musicIcon = $('#musicIcon');
    const musicLabel = $('#musicLabel');

    if (!musicBtn) return;

    const audioEl = new Audio();
    audioEl.src = dateConfig.music;
    audioEl.loop = true;
    audioEl.volume = 0.85;
    audioEl.preload = 'auto';

    startFestiveMusic = playMusic;

    async function playMusic() {
      if (isMusicPlaying) return;
      try {
        await audioEl.play();
        isMusicPlaying = true;
        musicBtn.classList.add('playing');
        if (musicIcon) musicIcon.textContent = '🪔';
        if (musicLabel) musicLabel.textContent = "Playing Melody";
      } catch (err) {
        console.log("Audio autoplay waiting for user interaction:", err);
        // If autoplay is blocked by browser until user gesture, start immediately on first tap/interaction:
        const unlockAudio = async () => {
          if (!isMusicPlaying) {
            try {
              await audioEl.play();
              isMusicPlaying = true;
              musicBtn.classList.add('playing');
              if (musicIcon) musicIcon.textContent = '🪔';
              if (musicLabel) musicLabel.textContent = "Playing Melody";
            } catch (e) {
              playFestiveMelody();
            }
          }
          window.removeEventListener('click', unlockAudio);
          window.removeEventListener('touchstart', unlockAudio);
          window.removeEventListener('pointerdown', unlockAudio);
        };
        window.addEventListener('click', unlockAudio, { once: true });
        window.addEventListener('touchstart', unlockAudio, { once: true });
        window.addEventListener('pointerdown', unlockAudio, { once: true });
      }
    }

    function pauseMusic() {
      isMusicPlaying = false;
      musicBtn.classList.remove('playing');
      if (musicIcon) musicIcon.textContent = '🎵';
      if (musicLabel) musicLabel.textContent = 'Play Music';
      audioEl.pause();
      stopFestiveMelody();
    }

    async function toggle() {
      if (!isMusicPlaying) {
        await playMusic();
      } else {
        pauseMusic();
      }
    }

    musicBtn.addEventListener('click', toggle);

    // Auto-start on first user interaction
    const startAudioOnFirstClick = () => {
      if (!isMusicPlaying) {
        playMusic();
      }
      document.removeEventListener('click', startAudioOnFirstClick);
    };
    document.addEventListener('click', startAudioOnFirstClick, { once: true });
  }

  /* =========================================================
     6. MEMORIES POLAROID LIGHTBOX
     ========================================================= */
  function setupLightbox() {
    const cards = $$('.polaroid-card');
    const lightbox = $('#photoLightbox');
    const lightboxImg = $('#lightboxImg');
    const lightboxCaption = $('#lightboxCaption');
    const closeBtn = $('#lightboxCloseBtn');
    const backdrop = $('#lightboxClose');

    if (!lightbox) return;

    function open(src, captionText) {
      if (lightboxImg) lightboxImg.src = src;
      if (lightboxCaption) lightboxCaption.querySelector('p').textContent = captionText;
      lightbox.classList.remove('hidden');
      document.body.classList.add('modal-open');
      document.documentElement.classList.add('modal-open');
    }

    function close() {
      lightbox.classList.add('hidden');
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
    }

    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const img = card.querySelector('.polaroid-img');
        const cap = card.querySelector('.handwriting');
        if (img && cap) {
          open(img.src, cap.textContent);
        }
      });
    });

    closeBtn?.addEventListener('click', close);
    backdrop?.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        close();
        closeInvitation();
        closePlannerModal();
      }
    });
  }

  /* =========================================================
     7. SPECIAL INVITATION & PLANNER POPUP MODALS
     ========================================================= */
  let hasInvitationPopped = false;

  function openInvitation() {
    const modal = $('#invitationModal');
    if (!modal) return;
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.documentElement.classList.add('modal-open');
    hasInvitationPopped = true;
  }

  function closeInvitation() {
    const modal = $('#invitationModal');
    if (!modal) return;
    modal.classList.add('hidden');

    const plannerModal = $('#plannerModal');
    if (!plannerModal || plannerModal.classList.contains('hidden')) {
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
    }

    // Reset noBtn positioning if modal is closed
    const noBtn = $('#noBtn');
    if (noBtn) {
      noBtn.style.position = '';
      noBtn.style.zIndex = '';
      noBtn.style.left = '';
      noBtn.style.top = '';
      noBtn.style.transform = '';
      noBtn.style.whiteSpace = '';
      noBtn.style.display = '';
    }
  }

  function openPlannerModal() {
    const modal = $('#plannerModal');
    if (!modal) return;
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.documentElement.classList.add('modal-open');
  }

  function closePlannerModal() {
    const modal = $('#plannerModal');
    if (!modal) return;
    modal.classList.add('hidden');

    const invModal = $('#invitationModal');
    if (!invModal || invModal.classList.contains('hidden')) {
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
    }
  }

  function setupInvitationModal() {
    const modal = $('#invitationModal');
    const openBtn = $('#openInvitationBtn');
    const closeBtn = $('#closeInvitationModal');
    const backdrop = $('#invitationModalBackdrop');
    const goToMenuBtn = $('#goToMenuBtn');
    const heroBtn = $('#heroInvitationBtn');

    openBtn?.addEventListener('click', openInvitation);
    heroBtn?.addEventListener('click', () => {
      setTimeout(openInvitation, 400);
    });
    closeBtn?.addEventListener('click', closeInvitation);
    backdrop?.addEventListener('click', closeInvitation);
    backdrop?.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
    backdrop?.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

    // Open planner popup modal from invitation
    goToMenuBtn?.addEventListener('click', () => {
      closeInvitation();
      openPlannerModal();
    });

    // Auto-popup when scrolling past the love letter section
    const triggerBox = $('#invitationTriggerBox') || $('#letter');
    if (triggerBox && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasInvitationPopped) {
            setTimeout(() => {
              if (!hasInvitationPopped) {
                openInvitation();
              }
            }, 600);
            observer.disconnect();
          }
        });
      }, { threshold: 0.4 });
      observer.observe(triggerBox);
    }
  }

  /* =========================================================
     8. THE QUESTION INTERACTION (YES & PLAYFUL RUNAWAY NO)
     ========================================================= */
  function setupQuestionSection() {
    const yesBtn = $('#yesBtn');
    const noBtn = $('#noBtn');
    const acceptedBox = $('#acceptedMessage');
    const actionsArea = $('#askActionsArea');

    if (!yesBtn || !noBtn) return;

    const cheekyPhrases = [
      "Wait, but who will hold my other Dandiya stick? 🥺",
      "Error 404: Sanedo without you is impossible! 😉",
      "Nice try! But dodging won't save your feet from twirling! 💃",
      "I already matched our traditional outfits! Look at that smile! ❤️",
      "Unlimited hot jalebi & crispy fafda guaranteed! 🥰",
      "Just press YES, let's dance till 11 PM! 🎉"
    ];

    let dodgeCount = 0;
    let yesScale = 1;

    function dodgeNo() {
      dodgeCount++;
      const phrase = cheekyPhrases[(dodgeCount - 1) % cheekyPhrases.length];
      noBtn.querySelector('span').textContent = phrase;

      // Make YES button grow bigger each time
      yesScale = Math.min(1.4, yesScale + 0.08);
      yesBtn.style.transform = `scale(${yesScale})`;

      // Pop out of the card and teleport across the WHOLE screen
      noBtn.style.position = 'fixed';
      noBtn.style.zIndex = '2005';
      noBtn.style.whiteSpace = 'nowrap';

      const btnW = noBtn.offsetWidth || 200;
      const btnH = noBtn.offsetHeight || 44;

      const padding = 24;
      const maxLeft = Math.max(padding, window.innerWidth - btnW - padding);
      const maxTop = Math.max(padding, window.innerHeight - btnH - padding);

      const randX = Math.floor(Math.random() * (maxLeft - padding + 1)) + padding;
      const randY = Math.floor(Math.random() * (maxTop - padding + 1)) + padding;

      noBtn.style.left = `${randX}px`;
      noBtn.style.top = `${randY}px`;
      noBtn.style.transform = `rotate(${(Math.random() - 0.5) * 12}deg)`;
    }

    noBtn.addEventListener('mouseenter', dodgeNo);
    noBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      dodgeNo();
    });
    noBtn.addEventListener('click', (e) => {
      e.preventDefault();
      dodgeNo();
    });

    yesBtn.addEventListener('click', () => {
      // 1. Hide runaway no button
      noBtn.style.display = 'none';

      // 2. Big festive party popper explosion spreading across the screen
      triggerPartyPoppers();

      // 3. Show accepted celebration message inside popup
      actionsArea.classList.add('hidden');
      acceptedBox.classList.remove('hidden');

      // 4. Smoothly transition into the Garba Planner popup modal after celebration
      setTimeout(() => {
        closeInvitation();
        openPlannerModal();
      }, 2300);
    });
  }

  /* =========================================================
     FULL-SCREEN FESTIVE PARTY POPPERS & CONFETTI EXPLOSION
     ========================================================= */
  function triggerPartyPoppers() {
    const colors = ['#ffd24d', '#ff2a7a', '#ff7a00', '#a855f7', '#10b981', '#ffffff', '#f59e0b', '#ec4899'];
    const emojis = ['🎉', '🪔', '🥁', '💃', '🕺', '✨', '💖', '⭐', '🌸'];

    // 1. Popping emojis blasting across screen
    for (let e = 0; e < 35; e++) {
      setTimeout(() => {
        const pop = document.createElement('div');
        pop.className = 'party-popper-emoji';
        pop.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        const originX = Math.random() < 0.5 ? Math.random() * 30 : 70 + Math.random() * 30;
        pop.style.left = `${originX}vw`;
        pop.style.bottom = `${Math.random() * 20}vh`;
        pop.style.fontSize = `${Math.random() * 18 + 22}px`;
        
        const dx = (Math.random() - 0.5) * 400;
        const dy = -(Math.random() * 500 + 350);
        pop.style.setProperty('--pop-dx', `${dx}px`);
        pop.style.setProperty('--pop-dy', `${dy}px`);
        
        document.body.appendChild(pop);
        setTimeout(() => pop.remove(), 2500);
      }, e * 40);
    }

    // 2. Dense confetti stream raining from top across screen
    for (let i = 0; i < 120; i++) {
      setTimeout(() => {
        const conf = document.createElement('div');
        conf.className = 'party-popper-confetti';
        conf.style.left = `${Math.random() * 100}vw`;
        conf.style.top = '-20px';
        conf.style.width = `${Math.random() * 8 + 6}px`;
        conf.style.height = `${Math.random() * 16 + 10}px`;
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '3px';
        conf.style.transform = `rotate(${Math.random() * 360}deg)`;
        conf.style.animation = `confettiFlutter ${Math.random() * 2 + 2.4}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
        document.body.appendChild(conf);
        setTimeout(() => conf.remove(), 4500);
      }, i * 25);
    }

    // 3. Floating festive emojis burst
    for (let j = 0; j < 30; j++) {
      setTimeout(createFloatingParticle, j * 80);
    }
  }

  // Keyframes for full-screen party popper animations
  const popperStyle = document.createElement('style');
  popperStyle.textContent = `
    .party-popper-emoji {
      position: fixed;
      pointer-events: none;
      z-index: 10001;
      animation: popBurst 2s cubic-bezier(0.12, 0.8, 0.32, 1) forwards;
      filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4));
    }
    @keyframes popBurst {
      0% { transform: scale(0.3) translate(0, 0) rotate(0deg); opacity: 1; }
      50% { opacity: 1; }
      100% { transform: scale(1.3) translate(var(--pop-dx), var(--pop-dy)) rotate(720deg); opacity: 0; }
    }
    .party-popper-confetti {
      position: fixed;
      pointer-events: none;
      z-index: 10000;
    }
    @keyframes confettiFlutter {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(105vh) rotate(1080deg); opacity: 0; }
    }
  `;
  document.head.appendChild(popperStyle);

  /* =========================================================
     9. GARBA PLANNER & VIP GARBA PASS GENERATOR
     ========================================================= */
  function setupDateMenu() {
    const restroGroup = $('#options-restro');
    const timingGroup = $('#options-timing');
    const commuteGroup = $('#options-commute');
    const durationGroup = $('#options-duration');
    const genBtn = $('#generateTicketBtn');
    const ticketWrap = $('#ticketContainer');
    const closePlannerBtn = $('#closePlannerModal');
    const plannerBackdrop = $('#plannerModalBackdrop');
    const navPlannerLink = $('#navPlannerLink') || $('a[href="#planner"]');

    // Planner modal close buttons
    closePlannerBtn?.addEventListener('click', closePlannerModal);
    plannerBackdrop?.addEventListener('click', closePlannerModal);

    // Navbar link opens planner modal
    navPlannerLink?.addEventListener('click', (e) => {
      e.preventDefault();
      openPlannerModal();
    });

    function handleMenuSelection(container, groupKey) {
      if (!container) return;
      container.addEventListener('click', (e) => {
        // Allow ticket/external booking links inside cards to open naturally
        if (e.target.tagName === 'A' || e.target.closest('a')) return;

        const card = e.target.closest('.menu-dish-card');
        if (!card) return;
        container.querySelectorAll('.menu-dish-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        selectedDate[groupKey] = card.dataset.value;
      });
    }

    handleMenuSelection(restroGroup, 'restro');
    handleMenuSelection(timingGroup, 'timing');
    handleMenuSelection(commuteGroup, 'commute');
    handleMenuSelection(durationGroup, 'duration');

    genBtn?.addEventListener('click', () => {
      // Update ticket fields with selected items
      const tRestro = $('#t-restro-val');
      const tTiming = $('#t-timing-val');
      const tCommute = $('#t-commute-val');
      const tDuration = $('#t-duration-val');

      if (tRestro) tRestro.textContent = selectedDate.restro;
      if (tTiming) tTiming.textContent = selectedDate.timing;
      if (tCommute) tCommute.textContent = selectedDate.commute;
      if (tDuration) tDuration.textContent = selectedDate.duration;

      if (ticketWrap) {
        ticketWrap.classList.remove('hidden');
        ticketWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Celebration burst on ticket creation
      triggerPartyPoppers();
    });

    // Download / Print VIP Pass button (saves high-res PNG image)
    $('#printTicketBtn')?.addEventListener('click', async () => {
      const btn = $('#printTicketBtn');
      const span = btn?.querySelector('span');
      const prevText = span ? span.textContent : '';
      if (span) span.textContent = 'Saving VIP Pass Image... ⏳';

      try {
        const blob = await generateTicketImageBlob();
        if (blob) {
          const downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(blob);
          downloadLink.download = `Garba-VIP-Pass-${dateConfig.herName}.png`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          downloadLink.remove();
          showToast(`Saved VIP Pass image for ${dateConfig.herName}! 🎟️`);
        } else {
          window.print();
        }
      } catch (e) {
        console.error("Print/Save error:", e);
        window.print();
      } finally {
        if (span) span.textContent = prevText;
      }
    });

    // Share confirmation via WhatsApp (shares actual image of VIP card!)
    $('#shareWhatsappBtn')?.addEventListener('click', async () => {
      const btn = $('#shareWhatsappBtn');
      const span = btn?.querySelector('span');
      const prevText = span ? span.textContent : '';
      if (span) span.textContent = 'Creating Pass Image... ⏳';
      showToast('Rendering VIP Card image for WhatsApp... ✨');

      try {
        const blob = await generateTicketImageBlob();
        if (!blob) throw new Error("Could not create image blob");

        const fileName = `Garba-VIP-Pass-${dateConfig.herName}.png`;
        const file = new File([blob], fileName, { type: 'image/png' });

        const shareData = {
          title: `Garba Night VIP Pass for ${dateConfig.herName} ❤️`,
          text: `Hey ${dateConfig.herName}! 🪔✨ Here is our Official VIP Garba Night Pass! See you on the dance floor! 💃🥁\n\n🎪 Venue: ${selectedDate.restro}\n👗 Attire: ${selectedDate.timing}\n🥁 Groove: ${selectedDate.commute}\n🥟 Midnight Cravings: ${selectedDate.duration}`,
          files: [file]
        };

        // 1. Check if device supports Web Share API with files (Android, iOS Safari/Chrome, etc.)
        if (navigator.canShare && navigator.canShare(shareData)) {
          await navigator.share(shareData);
          showToast('VIP Pass image shared successfully! 🎉');
        } else {
          // 2. Fallback for Desktop/unsupported browsers:
          // Download the generated PNG ticket image to photos/downloads
          const downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(blob);
          downloadLink.download = fileName;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          downloadLink.remove();

          showToast('VIP Pass image downloaded! Opening WhatsApp to share with Shehnaz ❤️');

          // Open WhatsApp with romantic message
          setTimeout(() => {
            const message = `Hey ${dateConfig.herName}! 🪔✨\nI just generated our official Garba VIP Pass image! (I've saved the image to show you ❤️)\n\n🎪 Venue: ${selectedDate.restro}\n👗 Attire: ${selectedDate.timing}\n🥁 Groove: ${selectedDate.commute}\n🥟 Midnight Cravings: ${selectedDate.duration}\n\nCan't wait to twirl with you this Navratri! 💃❤️`;
            const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
          }, 800);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error("WhatsApp share image error:", err);
          showToast('Opening WhatsApp with your Garba plan! 💌');
          const message = `Hey ${dateConfig.herName}! 🪔✨\nI picked our dream Garba Night plan:\n🎪 Venue: ${selectedDate.restro}\n👗 Attire: ${selectedDate.timing}\n🥁 Groove: ${selectedDate.commute}\n🥟 Midnight Cravings: ${selectedDate.duration}\nCan't wait to twirl with you this Navratri! 💃❤️`;
          const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
          window.open(url, '_blank');
        }
      } finally {
        if (span) span.textContent = prevText;
      }
    });
  }

  /* =========================================================
     FESTIVE TOAST NOTIFICATION & VIP CARD IMAGE GENERATOR
     ========================================================= */
  function showToast(message) {
    let toast = $('.festive-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'festive-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>🪔</span><span>${message}</span>`;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  async function generateTicketImageBlob() {
    const ticketEl = $('#dateVipTicket');
    if (!ticketEl) return null;

    if (window.html2canvas) {
      try {
        const canvas = await window.html2canvas(ticketEl, {
          scale: 2.5,
          backgroundColor: '#160a2c',
          useCORS: true,
          logging: false
        });
        return await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      } catch (err) {
        console.warn('html2canvas rendering error, falling back to manual canvas:', err);
      }
    }

    // Manual Canvas Drawing Fallback
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 700;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1000, 700);
    bgGrad.addColorStop(0, '#231040');
    bgGrad.addColorStop(0.5, '#36165a');
    bgGrad.addColorStop(1, '#190a30');
    ctx.fillStyle = bgGrad;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(0, 0, 1000, 700, 32) : ctx.rect(0, 0, 1000, 700);
    ctx.fill();

    // Gold border
    ctx.strokeStyle = '#ffd24d';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(12, 12, 976, 676, 24) : ctx.rect(12, 12, 976, 676);
    ctx.stroke();

    // Header
    ctx.fillStyle = '#ffd24d';
    ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('✨ OFFICIAL GARBA NIGHT VIP PASS ✨', 50, 68);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`PASS #GARBA-${dateConfig.dateNumber}`, 950, 68);

    // Dashed divider
    ctx.strokeStyle = 'rgba(255, 210, 77, 0.4)';
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(50, 90);
    ctx.lineTo(950, 90);
    ctx.stroke();
    ctx.setLineDash([]);

    // Lovers title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px "Playfair Display", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${dateConfig.yourName} × ${dateConfig.herName}`, 500, 152);

    // Details box
    ctx.fillStyle = 'rgba(12, 5, 24, 0.75)';
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(50, 185, 900, 350, 16) : ctx.rect(50, 185, 900, 350);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    const rows = [
      { label: 'GARBA VENUE:', val: selectedDate.restro },
      { label: 'ATTIRE STYLE:', val: selectedDate.timing },
      { label: 'DANCE ANTHEM:', val: selectedDate.commute },
      { label: 'MIDNIGHT CRAVING:', val: selectedDate.duration },
      { label: 'STATUS:', val: '✓ 100% OFFICIALLY CONFIRMED GARBA PARTNER', isGreen: true }
    ];

    let rowY = 236;
    rows.forEach((r) => {
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(r.label, 80, rowY);

      ctx.fillStyle = r.isGreen ? '#4ade80' : '#ffffff';
      ctx.font = r.isGreen ? 'bold 20px "Plus Jakarta Sans", sans-serif' : '600 20px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'right';

      let displayVal = r.val;
      if (displayVal.length > 46) {
        displayVal = displayVal.substring(0, 43) + '...';
      }
      ctx.fillText(displayVal, 920, rowY);

      rowY += 58;
    });

    // Barcode area divider
    ctx.strokeStyle = 'rgba(255, 210, 77, 0.4)';
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(50, 565);
    ctx.lineTo(950, 565);
    ctx.stroke();
    ctx.setLineDash([]);

    // Barcode lines
    let barX = 260;
    for (let b = 0; b < 48; b++) {
      const w = (b % 3 === 0 ? 5 : 2);
      ctx.fillStyle = (b % 2 === 0 ? '#ffd24d' : '#ffffff');
      ctx.fillRect(barX, 585, w, 40);
      barX += w + 6;
    }

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '13px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('NON-REFUNDABLE • UNLIMITED TWIRLS GUARANTEED FOR SHEHNAZ', 500, 656);

    return await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  }

  /* =========================================================
     10. INIT ALL MODULES
     ========================================================= */
  function init() {
    applyBindings();
    setupMusicToggle();
    initLoader();
    initAmbientCanvas();
    setupLightbox();
    setupInvitationModal();
    setupQuestionSection();
    setupDateMenu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
