// Theme toggle
function toggleTheme() {
  const body = document.body;
  const current = body.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', next);

  const themeBtn = document.getElementById('themeBtn');
  if (next === 'light') {
    themeBtn.innerHTML = '<span id="themeIcon">🌙</span> <span class="btn-label">Chế độ Tối</span>';
  } else {
    themeBtn.innerHTML = '<span id="themeIcon">☀️</span> <span class="btn-label">Chế độ Sáng</span>';
  }
}

// Mobile Sidebar Drawer toggle
function toggleMobileSidebar() {
  const sidebar = document.getElementById('appSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (!sidebar) return;
  const isOpen = sidebar.classList.toggle('mobile-open');
  if (backdrop) backdrop.classList.toggle('active', isOpen);
  document.body.classList.toggle('drawer-open', isOpen);
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('appSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (sidebar) sidebar.classList.remove('mobile-open');
  if (backdrop) backdrop.classList.remove('active');
  document.body.classList.remove('drawer-open');
}

// Font size control
let currentFontSize = 17;
function changeFontSize(delta) {
  currentFontSize = Math.max(14, Math.min(26, currentFontSize + delta));
  document.documentElement.style.setProperty('--reading-size', currentFontSize + 'px');
}

// Character Filter
function filterCharacter(charKey, btnElement) {
  document.querySelectorAll('.char-pill').forEach(el => el.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  const items = document.querySelectorAll('.script-item');
  if (charKey === 'all') {
    items.forEach(el => {
      el.classList.remove('dimmed', 'highlighted');
    });
    closeMobileSidebar();
    return;
  }

  items.forEach(el => {
    const char = el.getAttribute('data-character');
    const charList = char ? char.split(' ') : [];
    if (char === charKey || charList.includes(charKey) || (charKey === 'elizabeth' && (char === 'elizabeth' || char === 'ho-hang'))) {
      el.classList.remove('dimmed');
      el.classList.add('highlighted');
    } else {
      el.classList.add('dimmed');
      el.classList.remove('highlighted');
    }
  });
  closeMobileSidebar();
}

// Live search
function handleSearch(query) {
  const term = query.trim().toLowerCase();
  const items = document.querySelectorAll('.script-item');

  if (!term) {
    items.forEach(el => el.classList.remove('dimmed', 'highlighted'));
    return;
  }

  items.forEach(el => {
    const text = el.innerText.toLowerCase();
    if (text.includes(term)) {
      el.classList.remove('dimmed');
      el.classList.add('highlighted');
    } else {
      el.classList.add('dimmed');
      el.classList.remove('highlighted');
    }
  });
}

// Auto Scroll (Teleprompter feature for rehearsals)
let autoScrollInterval = null;
let scrollSpeed = 1.0;

function toggleAutoScroll() {
  const btn = document.getElementById('autoScrollBtn');
  const bar = document.getElementById('teleprompterBar');

  if (autoScrollInterval) {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
    btn.classList.remove('active');
    btn.innerHTML = '<span>▶</span> <span class="btn-label">Cuộn tự động</span>';
    bar.classList.remove('active');
  } else {
    autoScrollInterval = setInterval(() => {
      window.scrollBy({ top: scrollSpeed, behavior: 'smooth' });
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        toggleAutoScroll();
      }
    }, 50);
    btn.classList.add('active');
    btn.innerHTML = '<span>⏸</span> <span class="btn-label">Đang cuộn...</span>';
    bar.classList.add('active');
  }
}

function changeScrollSpeed(delta) {
  scrollSpeed = Math.max(0.5, Math.min(5.0, scrollSpeed + delta));
  document.getElementById('speedDisplay').innerText = scrollSpeed.toFixed(1) + 'x';
}

// Active Navigation on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.scene-section');
  const navLinks = document.querySelectorAll('.scene-nav-link');
  let currentId = '';

  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) {
      currentId = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentId) {
      link.classList.add('active');
    }
  });
});

// ==============================================
// AUDIO PLAYER LOGIC FOR EMMANUEL.MP3
// ==============================================
const emmanuelAudio = document.getElementById('emmanuelAudio');
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const progressBarFill = document.getElementById('progressBarFill');
const progressThumb = document.getElementById('progressThumb');
const progressContainer = document.getElementById('progressContainer');
const audioCurrentTime = document.getElementById('audioCurrentTime');
const audioTotalDuration = document.getElementById('audioTotalDuration');
const soundWave = document.getElementById('soundWave');
const vinylDisc = document.getElementById('vinylDisc');
const loopBtn = document.getElementById('loopBtn');
const speedVal = document.getElementById('speedVal');
const volumeSlider = document.getElementById('volumeSlider');
const volumeIcon = document.getElementById('volumeIcon');

let audioSpeeds = [0.75, 1.0, 1.25, 1.5];
let currentSpeedIdx = 1;

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
}

if (emmanuelAudio) {
  emmanuelAudio.addEventListener('loadedmetadata', () => {
    if (audioTotalDuration) {
      audioTotalDuration.innerText = formatTime(emmanuelAudio.duration);
    }
  });

  emmanuelAudio.addEventListener('timeupdate', () => {
    if (!emmanuelAudio.duration) return;
    const progress = (emmanuelAudio.currentTime / emmanuelAudio.duration) * 100;
    if (progressBarFill) progressBarFill.style.width = progress + '%';
    if (progressThumb) progressThumb.style.left = progress + '%';
    if (audioCurrentTime) audioCurrentTime.innerText = formatTime(emmanuelAudio.currentTime);
  });

  emmanuelAudio.addEventListener('play', () => {
    if (playIcon) playIcon.innerText = '⏸';
    if (soundWave) soundWave.classList.add('active');
    if (vinylDisc) vinylDisc.classList.add('spinning');
    document.querySelectorAll('audio').forEach((otherAudio) => {
      if (otherAudio !== emmanuelAudio && !otherAudio.paused) {
        otherAudio.pause();
      }
    });
  });

  emmanuelAudio.addEventListener('pause', () => {
    if (playIcon) playIcon.innerText = '▶';
    if (soundWave) soundWave.classList.remove('active');
    if (vinylDisc) vinylDisc.classList.remove('spinning');
  });

  emmanuelAudio.addEventListener('ended', () => {
    if (!emmanuelAudio.loop) {
      if (playIcon) playIcon.innerText = '▶';
      if (soundWave) soundWave.classList.remove('active');
      if (vinylDisc) vinylDisc.classList.remove('spinning');
      if (progressBarFill) progressBarFill.style.width = '0%';
      if (progressThumb) progressThumb.style.left = '0%';
    }
  });
}

function togglePlayAudio() {
  if (!emmanuelAudio) return;
  if (emmanuelAudio.paused) {
    emmanuelAudio.play().catch(e => console.log('Audio playback error:', e));
  } else {
    emmanuelAudio.pause();
  }
}

function stopAudio() {
  if (!emmanuelAudio) return;
  emmanuelAudio.pause();
  emmanuelAudio.currentTime = 0;
  if (progressBarFill) progressBarFill.style.width = '0%';
  if (progressThumb) progressThumb.style.left = '0%';
  if (audioCurrentTime) audioCurrentTime.innerText = '00:00';
}

function seekAudioRelative(deltaSec) {
  if (!emmanuelAudio) return;
  const target = Math.max(0, Math.min(emmanuelAudio.duration || 0, emmanuelAudio.currentTime + deltaSec));
  emmanuelAudio.currentTime = target;
}

function toggleLoopAudio() {
  if (!emmanuelAudio) return;
  emmanuelAudio.loop = !emmanuelAudio.loop;
  if (loopBtn) {
    if (emmanuelAudio.loop) {
      loopBtn.classList.add('active');
    } else {
      loopBtn.classList.remove('active');
    }
  }
}

function cycleSpeedAudio() {
  if (!emmanuelAudio) return;
  currentSpeedIdx = (currentSpeedIdx + 1) % audioSpeeds.length;
  const spd = audioSpeeds[currentSpeedIdx];
  emmanuelAudio.playbackRate = spd;
  if (speedVal) speedVal.innerText = spd + 'x';
}

function changeVolume(val) {
  if (!emmanuelAudio) return;
  emmanuelAudio.volume = parseFloat(val);
  updateVolumeIcon(emmanuelAudio.volume);
}

let lastVolumeVal = 0.9;
function toggleMuteAudio() {
  if (!emmanuelAudio) return;
  if (emmanuelAudio.volume > 0) {
    lastVolumeVal = emmanuelAudio.volume;
    emmanuelAudio.volume = 0;
    if (volumeSlider) volumeSlider.value = 0;
  } else {
    emmanuelAudio.volume = lastVolumeVal || 0.9;
    if (volumeSlider) volumeSlider.value = emmanuelAudio.volume;
  }
  updateVolumeIcon(emmanuelAudio.volume);
}

function updateVolumeIcon(vol) {
  if (!volumeIcon) return;
  if (vol === 0) {
    volumeIcon.innerText = '🔇';
  } else if (vol < 0.5) {
    volumeIcon.innerText = '🔉';
  } else {
    volumeIcon.innerText = '🔊';
  }
}

// Seeking on progress container
if (progressContainer) {
  let isSeeking = false;
  function handleSeek(e) {
    if (!emmanuelAudio || !emmanuelAudio.duration) return;
    const rect = progressContainer.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    emmanuelAudio.currentTime = ratio * emmanuelAudio.duration;
  }

  progressContainer.addEventListener('pointerdown', (e) => {
    isSeeking = true;
    handleSeek(e);
  });
  window.addEventListener('pointermove', (e) => {
    if (isSeeking) handleSeek(e);
  });
  window.addEventListener('pointerup', () => {
    if (isSeeking) isSeeking = false;
  });
}

// Toggle Lyrics Drawer
function toggleLyricsDrawer() {
  const drawer = document.getElementById('lyricsDrawer');
  const arrow = document.getElementById('lyricsArrowIcon');
  if (!drawer) return;
  const isOpen = drawer.classList.contains('open');
  if (isOpen) {
    drawer.classList.remove('open');
    if (arrow) arrow.innerText = '▼ Mở lời';
  } else {
    drawer.classList.add('open');
    if (arrow) arrow.innerText = '▲ Đóng lời';
  }
}
// ==============================================
// AUDIO PLAYER LOGIC FOR SCENE PLAYERS (ĐỊA CẦU HOAN CA & MAGNIFICAT3)
// ==============================================
function initSceneAudioPlayer(cardId) {
  const card = document.getElementById(cardId);
  if (!card) return;
  const $ = (role) => card.querySelector('[data-role="' + role + '"]');

  const audio = $('audio');
  const playIcon = $('playIcon');
  const fill = $('fill');
  const thumb = $('thumb');
  const progress = $('progress');
  const curTime = $('current');
  const totalTime = $('total');
  const wave = $('wave');
  const vinyl = $('vinyl');
  const loopBtn = $('loop');
  const speedVal = $('speedVal');
  const volSlider = $('volume');
  const volIcon = $('volIcon');
  const lyricsDrawer = $('lyricsDrawer');
  const lyricsArrow = $('lyricsArrow');

  const speeds = [0.75, 1.0, 1.25, 1.5];
  let speedIdx = 1;
  let lastVol = 0.9;
  audio.volume = 0.9;

  const fmt = (s) => {
    if (isNaN(s) || s < 0) return '00:00';
    const m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return (m < 10 ? '0' : '') + m + ':' + (sec < 10 ? '0' : '') + sec;
  };

  const setPlayingUI = (on) => {
    playIcon.innerText = on ? '⏸' : '▶';
    wave.classList.toggle('active', on);
    vinyl.classList.toggle('spinning', on);
  };

  const updateVolIcon = (v) => {
    volIcon.innerText = v === 0 ? '🔇' : (v < 0.5 ? '🔉' : '🔊');
  };

  audio.addEventListener('loadedmetadata', () => { totalTime.innerText = fmt(audio.duration); });

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const p = (audio.currentTime / audio.duration) * 100;
    fill.style.width = p + '%';
    thumb.style.left = p + '%';
    curTime.innerText = fmt(audio.currentTime);
  });

  audio.addEventListener('play', () => {
    setPlayingUI(true);
    // Không phát chồng với các bài hát khác trên trang
    document.querySelectorAll('audio').forEach((otherAudio) => {
      if (otherAudio !== audio && !otherAudio.paused) {
        otherAudio.pause();
      }
    });
  });
  audio.addEventListener('pause', () => setPlayingUI(false));
  audio.addEventListener('ended', () => {
    if (!audio.loop) {
      setPlayingUI(false);
      fill.style.width = '0%';
      thumb.style.left = '0%';
    }
  });

  // Khi Emmanuel phát thì dừng player này
  if (typeof emmanuelAudio !== 'undefined' && emmanuelAudio) {
    emmanuelAudio.addEventListener('play', () => { if (!audio.paused) audio.pause(); });
  }

  $('play').addEventListener('click', () => {
    if (audio.paused) audio.play().catch(e => console.log('Audio playback error:', e));
    else audio.pause();
  });

  $('stop').addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
    fill.style.width = '0%';
    thumb.style.left = '0%';
    curTime.innerText = '00:00';
  });

  const seekRel = (d) => {
    audio.currentTime = Math.max(0, Math.min(audio.duration || 0, audio.currentTime + d));
  };
  $('back').addEventListener('click', () => seekRel(-5));
  $('forward').addEventListener('click', () => seekRel(5));

  loopBtn.addEventListener('click', () => {
    audio.loop = !audio.loop;
    loopBtn.classList.toggle('active', audio.loop);
  });

  $('speed').addEventListener('click', () => {
    speedIdx = (speedIdx + 1) % speeds.length;
    audio.playbackRate = speeds[speedIdx];
    speedVal.innerText = speeds[speedIdx] + 'x';
  });

  volSlider.addEventListener('input', () => {
    audio.volume = parseFloat(volSlider.value);
    updateVolIcon(audio.volume);
  });

  $('mute').addEventListener('click', () => {
    if (audio.volume > 0) {
      lastVol = audio.volume;
      audio.volume = 0;
      volSlider.value = 0;
    } else {
      audio.volume = lastVol || 0.9;
      volSlider.value = audio.volume;
    }
    updateVolIcon(audio.volume);
  });

  // Kéo / chạm thanh tiến trình (chuột + cảm ứng)
  let seeking = false;
  const seekTo = (e) => {
    if (!audio.duration) return;
    const rect = progress.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * audio.duration;
  };
  progress.addEventListener('pointerdown', (e) => { seeking = true; seekTo(e); });
  window.addEventListener('pointermove', (e) => { if (seeking) seekTo(e); });
  window.addEventListener('pointerup', () => { seeking = false; });

  // Mở / đóng lời bài hát
  $('lyricsBtn').addEventListener('click', () => {
    const open = lyricsDrawer.classList.toggle('open');
    lyricsArrow.innerText = open ? '▲ Đóng lời' : '▼ Mở lời';
  });
}

initSceneAudioPlayer('diaCauPlayerCard');
initSceneAudioPlayer('truyenTinPlayerCard');
initSceneAudioPlayer('magnificatPlayerCard');

// ==============================================
// MUSIC DOWNLOAD LOGIC (BLOB FORCED DOWNLOAD)
// ==============================================
function showToast(message, duration = 4000) {
  let toast = document.getElementById('musicToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'musicToast';
    toast.className = 'music-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = message;
  toast.classList.add('active');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('active');
  }, duration);
}

function openDownloadModal() {
  const modal = document.getElementById('musicDownloadModal');
  if (modal) {
    modal.classList.add('active');
    document.body.classList.add('drawer-open');
  }
}

function closeDownloadModal() {
  const modal = document.getElementById('musicDownloadModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.classList.remove('drawer-open');
  }
}

// Tải 1 bài MP3 - Ép tải về máy thay vì mở trình phát nhạc
async function downloadSingleTrack(url, filename, btnElement) {
  const originalHtml = btnElement ? btnElement.innerHTML : '';
  if (btnElement) {
    btnElement.innerHTML = '<span>⏳</span> Đang tải...';
    btnElement.style.pointerEvents = 'none';
  }

  // Trường hợp 1: Chạy trên Web (GitHub Pages / HTTP / HTTPS)
  // Dùng kỹ thuật Blob URL để ép trình duyệt lưu file trực tiếp vào thư mục Downloads
  if (window.location.protocol.startsWith('http')) {
    try {
      showToast(`⏳ Đang tải <strong>${filename}</strong> về máy của bạn...`);
      const response = await fetch(url);
      if (!response.ok) throw new Error('Không thể fetch file');
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);

      showToast(`✅ Đã tải xong <strong>${filename}</strong> vào thư mục Downloads!`, 3000);
      if (btnElement) {
        btnElement.innerHTML = '<span>✅</span> Đã tải!';
        setTimeout(() => {
          btnElement.innerHTML = originalHtml;
          btnElement.style.pointerEvents = '';
        }, 1500);
      }
      return;
    } catch (err) {
      console.warn('Lỗi Blob download, chuyển sang fallback:', err);
    }
  }

  // Trường hợp 2: Mở file:/// trực tiếp từ máy tính
  // Trình duyệt bảo mật chặn auto-download trên file:// nên sẽ mở tab trình phát.
  showToast(`💡 File đã có trong máy của bạn! Hoặc bấm dấu <strong>[⋮]</strong> trên tab nhạc vừa mở &rarr; chọn <strong>Tải xuống</strong>.`, 5500);
  const win = window.open(url, '_blank');
  if (!win) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  if (btnElement) {
    btnElement.innerHTML = originalHtml;
    btnElement.style.pointerEvents = '';
  }
}

// Tải lần lượt cả 4 bài hát
async function downloadAllTracks(btnElement) {
  const tracks = [
    { url: 'Địa cầu hoan ca - Sơn túi đỏ.mp3', name: 'Dia_cau_hoan_ca_Son_tui_do.mp3' },
    { url: 'Truyền_Tin.mp3', name: 'Truyen_Tin.mp3' },
    { url: 'Magnificat3.mp3', name: 'Magnificat.mp3' },
    { url: 'Emmanuel.mp3', name: 'Emmanuel.mp3' }
  ];

  const originalHtml = btnElement ? btnElement.innerHTML : '';

  if (window.location.protocol.startsWith('http')) {
    if (btnElement) {
      btnElement.innerHTML = '<span>⏳</span> Đang tải 4 bài...';
      btnElement.style.pointerEvents = 'none';
    }

    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      if (btnElement) {
        btnElement.innerHTML = `<span>⏳</span> Đang tải bài ${i + 1}/4...`;
      }
      await downloadSingleTrack(track.url, track.name);
      await new Promise(r => setTimeout(r, 600));
    }

    if (btnElement) {
      btnElement.innerHTML = '<span>✅</span> Đã tải xong cả 4 bài!';
      setTimeout(() => {
        btnElement.innerHTML = originalHtml;
        btnElement.style.pointerEvents = '';
      }, 2000);
    }
  } else {
    // file:/// mode
    showToast(`💡 Đang mở 4 bài: File đã có trong máy, hoặc bấm dấu [⋮] &rarr; Tải xuống trên từng tab!`, 5500);
    tracks.forEach((track, index) => {
      setTimeout(() => {
        window.open(track.url, '_blank');
      }, index * 400);
    });
  }
}

