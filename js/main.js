// ---- EDIT THIS: wedding date/time used by the countdown ----
// Format: "YYYY-MM-DDTHH:MM:SS"
const WEDDING_DATE = "2027-06-20T15:00:00";

// ---- EDIT THIS: default language shown on first visit ("cs" or "tr") ----
const DEFAULT_LANG = "cs";

// ---- EDIT THIS: Google Maps address used by the "Show on map" link ----
const VENUE_MAP_QUERY = "Prague, Czech Republic";

(function () {
  const STORAGE_LANG = "wedding_lang";
  const STORAGE_MUSIC = "wedding_music_on";

  let currentLang = localStorage.getItem(STORAGE_LANG) || DEFAULT_LANG;

  function applyTranslations(lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG];
    document.documentElement.lang = lang;
    document.title = dict.page_title;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    const musicBtn = document.getElementById("music-toggle");
    if (musicBtn) {
      const isOn = musicBtn.dataset.state === "on";
      musicBtn.setAttribute("aria-label", isOn ? dict.music_on : dict.music_off);
    }
  }

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem(STORAGE_LANG, lang);
    applyTranslations(lang);
  }

  // ---- Countdown ----
  function startCountdown() {
    const target = new Date(WEDDING_DATE).getTime();
    const daysEl = document.getElementById("cd-days");
    const hoursEl = document.getElementById("cd-hours");
    const minsEl = document.getElementById("cd-minutes");
    const secsEl = document.getElementById("cd-seconds");
    if (!daysEl) return;

    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) {
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minsEl.textContent = "00";
        secsEl.textContent = "00";
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      daysEl.textContent = String(d).padStart(2, "0");
      hoursEl.textContent = String(h).padStart(2, "0");
      minsEl.textContent = String(m).padStart(2, "0");
      secsEl.textContent = String(s).padStart(2, "0");
    }
    tick();
    setInterval(tick, 1000);
  }

  // ---- Envelope open sequence: the seal breaks and glows, then the whole
  // envelope dissolves in place (no lifting or rising — a straight cross-fade,
  // like the reference video) into the invitation card, then the overlay
  // fades to reveal the page. Music autostarts (tied to the click, so the
  // browser's autoplay-after-gesture rule allows it). ----
  function setupEnvelope() {
    const screen = document.getElementById("envelope-screen");
    const trigger = document.getElementById("envelope-trigger");
    const seal = document.getElementById("envelope-seal-btn");
    const card = document.getElementById("envelope-card");
    if (!screen || !trigger || !seal || !card) return;

    let opened = false;

    seal.addEventListener("click", () => {
      if (opened) return;
      opened = true;

      trigger.classList.add("opening"); // glow burst + seal breaks away, caption fades

      const music = document.getElementById("bg-music");
      const musicBtn = document.getElementById("music-toggle");
      const wantsMusic = localStorage.getItem(STORAGE_MUSIC) !== "off";
      if (music && wantsMusic) {
        music.play().catch(() => {
          /* browser blocked autoplay; the floating button lets them start it */
        });
        if (musicBtn) musicBtn.dataset.state = "on";
      }

      // Phase 1: the seal has broken and the glow is building (see CSS). Once the
      // glow is near its peak, the envelope and the card cross-fade in place —
      // one dissolves out exactly as the other dissolves in, no motion at all.
      setTimeout(() => trigger.classList.add("dissolve"), 900);
      // Phase 2: pause on the fully-revealed card for a beat, then reveal the page.
      setTimeout(() => {
        screen.classList.add("overlay-fade");
        document.body.classList.remove("no-scroll");
        if (musicBtn) {
          musicBtn.hidden = false;
          requestAnimationFrame(() => musicBtn.classList.add("visible"));
          applyTranslations(currentLang);
        }
      }, 3000);
      setTimeout(() => {
        screen.style.display = "none";
      }, 3900);
    });
  }

  // ---- Floating music toggle button ----
  function setupMusicToggle() {
    const btn = document.getElementById("music-toggle");
    const music = document.getElementById("bg-music");
    const iconPause = document.getElementById("icon-pause");
    const iconPlay = document.getElementById("icon-play");
    if (!btn || !music) return;

    btn.dataset.state = localStorage.getItem(STORAGE_MUSIC) === "off" ? "off" : "on";

    function syncIcon() {
      const isOn = btn.dataset.state === "on";
      if (iconPause) iconPause.style.display = isOn ? "block" : "none";
      if (iconPlay) iconPlay.style.display = isOn ? "none" : "block";
    }
    syncIcon();

    btn.addEventListener("click", () => {
      const isOn = btn.dataset.state === "on";
      if (isOn) {
        music.pause();
        btn.dataset.state = "off";
        localStorage.setItem(STORAGE_MUSIC, "off");
      } else {
        music.play().catch(() => {});
        btn.dataset.state = "on";
        localStorage.setItem(STORAGE_MUSIC, "on");
      }
      syncIcon();
      applyTranslations(currentLang);
    });
  }

  // ---- Language switch buttons ----
  function setupLangButtons() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
    });
  }

  // ---- RSVP modal ----
  function setupRsvpModal() {
    const openBtn = document.getElementById("rsvp-open");
    const modal = document.getElementById("rsvp-modal");
    const closeBtn = document.getElementById("rsvp-close");
    if (!openBtn || !modal) return;

    openBtn.addEventListener("click", () => modal.classList.add("visible"));
    closeBtn.addEventListener("click", () => modal.classList.remove("visible"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("visible");
    });

    const form = document.getElementById("rsvp-form");
    const thanks = document.getElementById("rsvp-thanks");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        // Replace the form's "action" attribute in index.html with your
        // own Formspree endpoint (see README.md) to receive real submissions.
        await fetch(form.action, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });
      } catch (err) {
        console.warn("RSVP form is not connected to a submission service yet. See README.md.", err);
      }
      form.hidden = true;
      thanks.hidden = false;
    });
  }

  // ---- Venue map link ----
  function setupMapLink() {
    const link = document.getElementById("venue-map-link");
    if (!link) return;
    link.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(VENUE_MAP_QUERY);
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("no-scroll");
    startCountdown();
    setupEnvelope();
    setupMusicToggle();
    setupLangButtons();
    setupRsvpModal();
    setupMapLink();
    applyTranslations(currentLang);
  });
})();
