<template>
  <!-- Fixed Full-Screen Animated Background -->
  <ColorBends 
    class="animated-background"
    :colors="['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F6E58D', '#B8E994']"
    :speed="0.2"
    :scale="1"
    :frequency="1.2"
    :warp-strength="1.2"
    :mouse-influence="0.5"
    :parallax="0.3"
    :rotation="45"
    :auto-rotate="0.5"
    :transparent="false"
  />
  
  <div id="app">

    <!-- Intro Animation (Shows First) -->
    <IntroScreenSimple 
      v-if="showIntro" 
      @intro-complete="onIntroComplete"
    />

    <!-- Your Main Website (Shows After Intro) -->
    <div v-show="!showIntro">
      <!-- Navigation -->
      <nav>
        <div class="nav-container">
          <div class="nav-logo">COSTA</div>
          <div class="nav-links">
            <a @click="scrollTo('home')">Home</a>
            <a @click="scrollTo('about')">About</a>
            <a @click="scrollTo('education')">Education</a>
            <a @click="scrollTo('skills')">Skills</a>
            <a @click="scrollTo('gallery')">Gallery</a>
            <a @click="scrollTo('guestbook')">Guestbook</a>
            <a @click="scrollTo('resources')">Resources</a>
          </div>
          <button class="theme-toggle" @click="toggleTheme">
            {{ darkMode ? '☀️' : '🌙' }}
          </button>
        </div>
      </nav>

      <!-- Audio Player -->
      <div class="audio-player" @click="toggleAudio">
        <div class="record-player">
          <div class="record" :class="{ playing: audioPlaying }"></div>
          <div class="tonearm" :class="{ active: audioPlaying }">
            <div class="tonearm-base"></div>
            <div class="tonearm-arm"></div>
            <div class="tonearm-head"></div>
          </div>
        </div>
      </div>

      <audio ref="bgMusicLight" loop>
        <source src="/BOB_MARLEY.mp3" type="audio/mpeg">
      </audio>
      
      <audio ref="bgMusicDark" loop>
        <source src="/SZA_GOODDAYS.mp4" type="audio/mp4">
      </audio>
      
      <!-- Hero Section -->
      <section id="home" class="hero">
        <div class="hero-content">
          <h1>
            <DecryptedText 
              text="Hi, I'm Marcus Montero" 
              trigger="view"
              :speed="111"
              reveal-direction="start"
            />
          </h1>
          <p>
            <DecryptedText 
              text="A coastal soul who loves clean code and calm design" 
              trigger="view"
              :speed="111"
              reveal-direction="start"
            />
          </p>
          <div class="scroll-indicator" @click="scrollTo('about')">↓</div>
        </div>
      </section>

      <!-- About Section -->
      <section id="about" class="section-light">
        <div class="container">
          <h2><ScrollFloat text="About Me" :stagger="40" :duration="600" /></h2>
          <p style="text-align: center; max-width: 800px; margin: 0 auto 3rem; font-size: 1.1rem; opacity: 0.85;">
            Welcome to my digital space! I'm a passionate IT student with a love for creating beautiful, functional web experiences. 
            Like the ocean waves that inspire me, I believe in finding balance between creativity and structure in everything I build.
          </p>
          
          <!-- Profile Card -->
          <div style="display: flex; justify-content: center; margin-bottom: 4rem;">
            <ProfileCard 
              name="Marcus Costa"
              title="Bachelor of Science in Information Technology"
              handle="costa"
              status="Online"
              contact-text="Contact Me"
              avatar-url="/profile-photo.png"
              mini-avatar-url="/profile-photo.png"
              @contact-click="() => scrollTo('guestbook')"
            />
          </div>
          
          <div class="about-container">
            <div class="about-grid">
              <div class="about-card">
                <h3>Education & Achievements</h3>
                <p><strong>Grade School - Junior High:</strong> La Immaculada Concepcion School</p>
                <p><strong>Senior High:</strong> Colegio De San Juan De Letran</p>
                <p><strong>College:</strong> Asia Pacific College</p>
                <p><strong>Course:</strong> Bachelor of Science in Information Technology</p>
                <p><strong>IT Experience:</strong> Code Combat</p>
              </div>
              <div class="about-card">
                <h3>Hobbies & Interests</h3>
                <p>When I'm not coding, you'll find me playing basketball or tending to my fish tanks. I love the balance between the active energy of sports and the peaceful calm of fish keeping.</p>
                <p>I'm most creative when things feel calm — that's why I'm drawn to beaches, minimal layouts, and clean code.</p>
              </div>
              <div class="about-card">
                <h3>Goals & Dreams</h3>
                <p>To succeed in IT, stay healthy, and make my loved ones proud.</p>
                <p>I'm passionate about building thoughtful web experiences that prioritize user experience, accessibility, and aesthetic harmony.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Education Section -->
      <section id="education" class="section-dark-bg">
        <div class="container">
          <h2><ScrollFloat text="My Educational Journey" :stagger="35" :duration="600" /></h2>
          <p style="text-align: center; margin-bottom: 3rem; opacity: 0.75;">Click on school logos to hear their hymns</p>

          <div class="timeline">
            <div v-for="school in schools" :key="school.id" class="timeline-item">
              <div class="timeline-date">
                <div class="year">{{ school.years }}</div>
              </div>

              <div class="timeline-content">
                <div class="school-header">
                  <div class="school-logo" 
                       :class="{ playing: currentPlaying === school.id }"
                       @click="toggleHymn(school.id)">
                    <img v-if="school.logo" :src="'/' + school.logo" :alt="school.name">
                    <span v-else>{{ school.emoji }}</span>
                  </div>
                  <div class="school-info">
                    <h2>{{ school.name }}</h2>
                    <div class="school-level">{{ school.level }}</div>
                  </div>
                </div>

                <p class="school-description">{{ school.description }}</p>

                <div class="audio-indicator" :class="{ active: currentPlaying === school.id }">
                  <span>🎵 Playing School Hymn</span>
                  <span class="wave"></span>
                  <span class="wave"></span>
                  <span class="wave"></span>
                </div>

                <audio :ref="el => { if (el) audioRefs['audio' + school.id] = el }">
                  <source v-if="school.hymn" :src="'/' + school.hymn" type="audio/mpeg">
                </audio>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section id="skills" class="section-light">
        <div class="container">
          <h2><ScrollFloat text="My Skills" :stagger="50" :duration="600" /></h2>
          <p style="text-align: center; margin-bottom: 3rem; opacity: 0.75;">Technologies and tools I work with</p>

          <div class="skills-grid">
            <div v-for="skill in skills" 
                 :key="skill.name" 
                 class="skill-card">
              <div class="skill-icon" v-html="skill.icon"></div>
              <p class="skill-name">{{ skill.name }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Gallery Section -->
      <section id="gallery" class="section-dark-bg">
        <div class="container">
          <h2><ScrollFloat text="Coastal Gallery" :stagger="45" :duration="600" /></h2>
          <div class="gallery-grid">
            <div v-for="item in gallery" :key="item.id" class="gallery-item" @click="openLightbox(item)">
              <div v-if="item.image" class="gallery-bg" :style="{ backgroundImage: 'url(/' + item.image + ')' }"></div>
              <div v-else class="gallery-bg" :style="{ background: item.gradient }"></div>
              <div class="gallery-overlay">
                <p class="gallery-caption">{{ item.caption }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Lightbox -->
      <div class="lightbox" :class="{ active: lightbox.show }" @click="closeLightbox">
        <span class="lightbox-close">&times;</span>
        <div v-if="lightbox.currentItem.image" 
             class="lightbox-content" 
             :style="{ backgroundImage: 'url(/' + lightbox.currentItem.image + ')', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '80vw', height: '80vh' }">
        </div>
        <div v-else 
             class="lightbox-content" 
             :style="{ background: lightbox.currentItem.gradient, width: '80vw', height: '80vh', borderRadius: '12px' }">
        </div>
      </div>

      <!-- Block Blast Game -->
      <section id="blockblast" class="section-light">
        <div class="container">
          <h2>🌊 Ocean Block Blast 🌊</h2>
          <p style="text-align: center; margin-bottom: 3rem; opacity: 0.75;">Place blocks on the grid. Clear rows or columns to score points!</p>
          
          <div class="game-container">
            <div class="game-info">
              <div class="game-stat">
                <div class="game-stat-label">Score</div>
                <div class="game-stat-value">{{ game.score }}</div>
              </div>
              <div class="game-stat">
                <div class="game-stat-label">Best</div>
                <div class="game-stat-value">{{ game.bestScore }}</div>
              </div>
              <div class="game-stat">
                <div class="game-stat-label">Moves</div>
                <div class="game-stat-value">{{ game.moves }}</div>
              </div>
            </div>

            <div class="game-board">
              <div v-for="(cell, index) in game.board" 
                   :key="index"
                   class="game-cell"
                   :class="{ 
                       filled: cell, 
                       preview: game.previewCells.includes(index),
                       invalid: game.invalidCells.includes(index)
                   }"
                   @click="placePiece(index)"
                   @mouseenter="showPreview(index)"
                   @mouseleave="clearPreview">
              </div>
            </div>

            <div class="game-pieces">
              <div v-for="(piece, pIndex) in game.pieces" 
                   :key="pIndex"
                   class="game-piece"
                   :class="{ selected: game.selectedPiece === pIndex, used: piece.used }"
                   :style="{ gridTemplateColumns: 'repeat(' + piece.width + ', 30px)' }"
                   @click="selectPiece(pIndex)">
                <div v-for="(cell, cIndex) in piece.shape" 
                     :key="cIndex"
                     class="piece-cell"
                     :class="{ filled: cell }">
                </div>
              </div>
            </div>

            <div class="game-controls">
              <button class="game-btn" @click="newGame">New Game</button>
            </div>
          </div>

          <div v-if="game.gameOver" class="game-overlay" @click="game.gameOver = false"></div>
          <div v-if="game.gameOver" class="game-over">
            <h2 style="margin-bottom: 1rem; font-size: 2rem;">🎮 Game Over!</h2>
            <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">Final Score: <strong>{{ game.score }}</strong></p>
            <p v-if="game.score === game.bestScore && game.score > 0" style="color: #06b6d4; margin-bottom: 2rem;">🎉 New Best Score! 🎉</p>
            <p v-else style="opacity: 0.75; margin-bottom: 2rem;">Best: {{ game.bestScore }}</p>
            <button class="game-btn" @click="newGame">Play Again</button>
          </div>
        </div>
      </section>

      <!-- Guestbook Section -->
      <section id="guestbook" class="section-dark-bg">
        <div class="container">
          <h2><ScrollFloat text="Leave a Footprint in the Sand" :stagger="30" :duration="600" /></h2>
          <p style="text-align: center; margin-bottom: 3rem; opacity: 0.75;">Share your coastal thoughts with me</p>
          
          <div class="guestbook-form">
            <div class="form-group">
              <input v-model="form.name" type="text" placeholder="Your Name">
            </div>
            <div class="form-group">
              <input v-model="form.beach" type="text" placeholder="What beach do you love most?">
            </div>
            <div class="form-group">
              <select v-model="form.preference">
                <option value="sunrise">Sunrise 🌅</option>
                <option value="sunset">Sunset 🌇</option>
              </select>
            </div>
            <div class="form-group">
              <input v-model="form.word" type="text" placeholder="One word that reminds you of the ocean">
            </div>
            <button class="submit-btn" @click="submitEntry">Submit</button>
          </div>

          <div v-if="entries.length > 0" class="entries">
            <h3 style="margin-bottom: 2rem; font-weight: 300;">Recent Footprints</h3>
            <div v-for="entry in entries" :key="entry.id" class="entry">
              <p class="entry-name">{{ entry.name }}</p>
              <p class="entry-detail">Loves: {{ entry.beach }}</p>
              <p class="entry-detail">Prefers: {{ entry.preference }}</p>
              <p class="entry-detail">Ocean word: <em>{{ entry.word }}</em></p>
            </div>
          </div>
        </div>
      </section>

      <!-- Resources Section -->
      <section id="resources" class="section-light">
        <div class="container">
          <h2><ScrollFloat text="Resources" :stagger="60" :duration="600" /></h2>
          <div class="resources-grid">
            <div class="resource-card">
              <h3>Images</h3>
              <p>CSS gradients - no external images needed</p>
            </div>
            <div class="resource-card">
              <h3>Fonts</h3>
              <p><strong>Inter</strong> - Body text and UI elements</p>
              <p><strong>Fraunces</strong> - Headings and logo</p>
              <p>Source: Google Fonts (fonts.google.com)</p>
              <p style="opacity: 0.75; font-size: 0.9rem; margin-top: 0.5rem;">Free and open source fonts</p>
            </div>
            <div class="resource-card">
              <h3>Framework</h3>
              <p>Vue.js 3 - Composition API</p>
            </div>
            <div class="resource-card">
              <h3>AI Assistance</h3>
              <p>Built with Claude (Anthropic) - claude.ai</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="section-dark-bg">
        <p>Made with 🌊 by Marcus</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue';
import IntroScreenSimple from './components/IntroScreenSimple.vue';
import ColorBends from './components/ColorBends.vue';
import DecryptedText from './components/DecryptedText.vue';
import ScrollFloat from './components/ScrollFloat.vue';
import ProfileCard from './components/ProfileCard.vue';

// Intro State
const showIntro = ref(false);

// Theme & UI State
const darkMode = ref(false);
const previousDarkMode = ref(false);
const scrolled = ref(false);
const menuOpen = ref(false);
const audioPlaying = ref(false);
const currentPlaying = ref(null);



// Refs
const bgMusicLight = ref(null);
const bgMusicDark = ref(null);
const audioRefs = reactive({});

// Form State
const form = reactive({
  name: '',
  beach: '',
  preference: 'sunrise',
  word: ''
});

const entries = ref([]);

// Game State
const game = reactive({
  board: Array(64).fill(false),
  score: 0,
  bestScore: 0,
  moves: 0,
  pieces: [],
  selectedPiece: null,
  previewCells: [],
  invalidCells: [],
  gameOver: false
});

// Lightbox State
const lightbox = reactive({
  show: false,
  currentItem: {}
});

// Data
const skills = [
  { 
    name: 'HTML', 
    icon: '<svg viewBox="0 0 128 128"><path fill="#E44D26" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z"></path><path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z"></path><path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z"></path><path fill="#FFF" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z"></path></svg>'
  },
  { 
    name: 'CSS', 
    icon: '<svg viewBox="0 0 128 128"><path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z"></path><path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z"></path><path fill="#fff" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z"></path><path fill="#EBEBEB" d="M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.39z"></path><path fill="#fff" d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881H81.127z"></path><path fill="#EBEBEB" d="M64.048 23.435v13.831H30.64l-.277-3.108-.63-7.012-.331-3.711h34.646zm-.047 27.996v13.831H48.792l-.277-3.108-.631-7.012-.33-3.711h16.447z"></path></svg>'
  },
  { 
    name: 'JavaScript', 
    icon: '<svg viewBox="0 0 128 128"><path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z"></path><path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"></path></svg>'
  },
  { 
    name: 'Vue.js', 
    icon: '<svg viewBox="0 0 128 128"><path fill="#42b883" d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z"></path><path fill="#35495e" d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z"></path></svg>'
  },
  { name: 'Flutter', icon: '<svg viewBox="0 0 128 128"><g fill="#3FB6D3"><path d="M12.3 64.2L76.3 0h39.4L32.1 83.6zM76.3 128h39.4L81.6 93.9l34.1-34.8H76.3L42.2 93.5z"></path></g><path fill="#27AACD" d="M81.6 93.9l-20-20-19.4 19.6 19.4 19.6z"></path><path fill="#19599A" d="M115.7 128L81.6 93.9l-20 19.2L76.3 128z"></path></svg>' },
  { name: 'React', icon: '<svg viewBox="0 0 128 128"><g fill="#61DAFB"><circle cx="64" cy="64" r="11.4"></circle><path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8z"></path></g></svg>' },
  { name: 'Tailwind CSS', icon: '<svg viewBox="0 0 128 128"><path d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0" fill="#38bdf8"></path></svg>' },
  { name: 'Canva', icon: '<svg viewBox="0 0 128 128"><g fill="#00c4cc"><path d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008z"></path></g></svg>' },
  { name: 'Node.js', icon: '<svg viewBox="0 0 128 128"><path fill="#83CD29" d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623C42.594 41 41 42.061 41 42.773v50.49c0 3.896-3.524 7.773-10.11 4.48L18.723 90.73c-.424-.23-.723-.693-.723-1.181V38.407c0-.482.555-.966.982-1.213l44.424-25.561c.415-.235 1.025-.235 1.439 0l43.882 25.555c.42.253.272.722.272 1.219v51.142c0 .488.183.963-.232 1.198l-43.882 25.561c-.41.232-1.02.232-1.43 0l-11.214-6.688c-.33-.183-.695-.388-.88-.388-2.055 0-2.456.916-10.77 3.319-.955.277-1.564.434 0 1.104l14.66 8.694c1.38.79 2.985 1.238 4.642 1.238 1.668 0 3.275-.465 4.665-1.238l43.882-25.561c2.87-1.672 4.23-4.764 4.23-8.083V38.407c0-3.319-1.36-6.414-4.229-8.073zM77.91 81.445c-11.726 0-14.309-3.235-15.17-9.066-.1-.628-.633-1.379-1.272-1.379h-5.731c-.709 0-1.279.86-1.279 1.566 0 7.466 4.059 16.512 23.453 16.512 14.039 0 22.088-5.455 22.088-15.109 0-9.572-6.467-12.084-20.082-13.886-13.762-1.819-15.16-2.738-15.16-5.962 0-2.658 1.184-6.203 11.374-6.203 9.105 0 12.461 1.954 13.842 8.091.118.577.645.991 1.24.991h5.754c.354 0 .692-.143.94-.396.24-.272.367-.613.335-.979-.891-10.568-7.912-15.493-22.112-15.493-12.631 0-20.166 5.334-20.166 14.275 0 9.698 7.497 12.378 19.622 13.577 14.505 1.422 15.633 3.542 15.633 6.395 0 4.955-3.978 7.066-13.309 7.066z"></path></svg>' },
  { name: 'Dart', icon: '<svg viewBox="0 0 128 128"><path fill="#00c4b3" d="M35.2 34.9l-8.3-8.3v59.7l.1 2.8c0 1.3.2 2.8.7 4.3l65.6 23.1 16.3-7.2-74.4-74.4z"></path><path d="M27.7 93.4zm81.9 15.9l-16.3 7.2-65.4-23.1c1.3 4.8 4 10.1 7 13.2l21.3 21.2 47.6.1 5.8-18.6z" fill="#22d3c5"></path><path fill="#0075c9" d="M1.7 65.1C-.4 67.3.7 72 4 75.5l14.7 14.8 9.2 3.3c-.3-1.5-.7-3-.7-4.3l-.1-2.8-.2-59.8"></path></svg>' },
  { name: 'Firebase', icon: '<svg viewBox="0 0 128 128"><path fill="#ffa000" d="M17.474 103.276 33.229 2.462a2.91 2.91 0 0 1 5.44-.924l16.294 30.39 6.494-12.366a2.91 2.91 0 0 1 5.15 0l43.97 83.714H17.474Z"></path><path fill="#f57c00" d="M71.903 64.005 54.955 31.913l-37.481 71.363Z"></path><path fill="#ffca28" d="M110.577 103.276 98.51 28.604a2.913 2.913 0 0 0-1.984-2.286 2.906 2.906 0 0 0-2.94.714l-76.112 76.243 42.115 23.618a8.728 8.728 0 0 0 8.51 0l42.478-23.618Z"></path></svg>' },
  { name: 'Supabase', icon: '<svg viewBox="0 0 128 128"><path fill="#3ecf8e" d="M53.484 2.128c3.267-4.117 9.905-1.862 9.977 3.396l.508 76.907H12.902c-9.365 0-14.587-10.817-8.764-18.149z"></path></svg>' },
  { name: 'MySQL', icon: '<svg viewBox="0 0 128 128"><path fill="#00618A" d="M117.688 98.242c-6.973-.191-12.297.461-16.852 2.379-1.293.547-3.355.559-3.566 2.18.711.746.82 1.859 1.387 2.777 1.086 1.754 2.922 4.113 4.559 5.352 1.789 1.348 3.633 2.793 5.551 3.961z"></path></svg>' },
  { name: 'PostgreSQL', icon: '<svg viewBox="0 0 128 128"><path d="M93.809 92.112c.785-6.533.55-7.492 5.416-6.433l1.235.108c3.742.17 8.637-.602 11.513-1.938 6.191-2.873 9.861-7.668 3.758-6.409z"></path></svg>' },
  { name: 'VS Code', icon: '<svg viewBox="0 0 128 128"><path fill="#0065A9" d="M123.471 13.82 97.097 1.12A7.973 7.973 0 0 0 88 2.668L1.662 81.387a5.333 5.333 0 0 0 .006 7.887l7.052 6.411z"></path></svg>' },
  { name: 'Python', icon: '<svg viewBox="0 0 128 128"><path fill="#FFD43B" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977z"></path></svg>' },
  { name: 'Git', icon: '<svg viewBox="0 0 128 128"><path fill="#F34F29" d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518z"></path></svg>' },
  { name: 'GitHub', icon: '<svg viewBox="0 0 128 128"><g fill="#181616"><path fill-rule="evenodd" clip-rule="evenodd" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303z"></path></g></svg>' },
  { name: 'Vercel', icon: '<svg viewBox="0 0 128 128"><path d="M64.002 8.576 128 119.424H0Zm0 0"></path></svg>' },
  { name: 'Figma', icon: '<svg viewBox="0 0 128 128"><path fill="#0acf83" d="M45.5 129c11.9 0 21.5-9.6 21.5-21.5V86H45.5C33.6 86 24 95.6 24 107.5S33.6 129 45.5 129zm0 0"></path></svg>' },
  { name: 'Carrd', icon: '<svg viewBox="0 0 24 24"><path d="M21.2539 18.4207 9.7457 23.9469a.5163.5163 0 0 1-.23.0531.5491.5491 0 0 1-.2832-.0796z"></path></svg>' }
];

const gallery = [
  { id: 1, caption: 'Beach sunset', image: 'photo1.jpg' },
  { id: 2, caption: 'Ocean waves', image: 'photo2.jpg' },
  { id: 3, caption: 'Sandy shores', image: 'photo3.jpg' },
  { id: 4, caption: 'Coastal view', image: 'photo4.jpg' }
];

const schools = [
  {
    id: 1,
    name: 'La Immaculada Concepcion School',
    level: 'Grade School - Junior High',
    years: '20XX - 20XX',
    emoji: '',
    logo: 'lics-logo.png',
    hymn: '',
    description: 'My foundational years of education where I developed core academic skills and discovered my love for learning.'
  },
  {
    id: 2,
    name: 'Colegio De San Juan De Letran',
    level: 'Senior High School',
    years: '20XX - 20XX',
    emoji: '',
    logo: 'letran-logo.png',
    hymn: 'letran-hymn.mp4',
    description: 'Advanced my studies in preparation for college, focusing on STEM subjects and building critical thinking skills.'
  },
  {
    id: 3,
    name: 'Asia Pacific College',
    level: 'Bachelor of Science in Information Technology',
    years: '2024 - Present',
    emoji: '',
    logo: 'apc-logo.png',
    hymn: '',
    description: 'Currently pursuing my degree in Information Technology, developing expertise in web development, programming, and digital innovation.'
  }
];

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 50;
  });
  
  // Initialize game
  initGame();
  
  // Try to autoplay music (after intro completes)
});

// Methods
const onIntroComplete = () => {
  showIntro.value = false;
  
  // Start music after intro
  nextTick(() => {
    const audio = bgMusicLight.value;
    if (audio) {
      audio.play().catch(() => {
        console.log('Autoplay prevented by browser');
      });
      audioPlaying.value = true;
    }
  });
};

const toggleTheme = () => {
  previousDarkMode.value = darkMode.value;
  darkMode.value = !darkMode.value;
  document.body.className = darkMode.value ? 'dark-mode' : 'light-mode';
  
  if (audioPlaying.value) {
    const oldAudio = previousDarkMode.value ? bgMusicDark.value : bgMusicLight.value;
    const newAudio = darkMode.value ? bgMusicDark.value : bgMusicLight.value;
    
    oldAudio.pause();
    oldAudio.currentTime = 0;
    newAudio.play().catch(() => {});
  }
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const scrollTo = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
  menuOpen.value = false;
};

const toggleAudio = () => {
  const audio = darkMode.value ? bgMusicDark.value : bgMusicLight.value;
  const record = document.querySelector('.record');
  const tonearm = document.querySelector('.tonearm');
  
  if (audioPlaying.value) {
    record?.classList.remove('playing');
    record?.classList.add('stopping');
    tonearm?.classList.remove('active');
    
    setTimeout(() => {
      audio.pause();
      record?.classList.remove('stopping');
    }, 2000);
    
    audioPlaying.value = false;
  } else {
    record?.classList.remove('stopping');
    record?.classList.add('playing');
    tonearm?.classList.add('active');
    audio.play();
    audioPlaying.value = true;
  }
};

const toggleHymn = (schoolId) => {
  const audioRef = audioRefs['audio' + schoolId];
  
  if (!audioRef) return;
  
  if (currentPlaying.value === schoolId) {
    audioRef.pause();
    audioRef.currentTime = 0;
    currentPlaying.value = null;
    return;
  }
  
  if (currentPlaying.value !== null) {
    const currentAudio = audioRefs['audio' + currentPlaying.value];
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
  }
  
  currentPlaying.value = schoolId;
  audioRef.play().catch(() => {
    currentPlaying.value = null;
  });
  
  audioRef.onended = () => {
    currentPlaying.value = null;
  };
};

const submitEntry = () => {
  if (form.name && form.beach && form.word) {
    entries.value.push({
      name: form.name,
      beach: form.beach,
      preference: form.preference,
      word: form.word,
      id: Date.now()
    });
    form.name = '';
    form.beach = '';
    form.preference = 'sunrise';
    form.word = '';
  }
};

const openLightbox = (item) => {
  lightbox.currentItem = item;
  lightbox.show = true;
};

const closeLightbox = () => {
  lightbox.show = false;
  lightbox.currentItem = {};
};

// Game Functions
const initGame = () => {
  game.board = Array(64).fill(false);
  game.score = 0;
  game.moves = 0;
  game.selectedPiece = null;
  game.previewCells = [];
  game.invalidCells = [];
  game.gameOver = false;
  generatePieces();
  
  const saved = localStorage.getItem('blockBlastBestScore');
  if (saved) {
    game.bestScore = parseInt(saved);
  }
};

const generatePieces = () => {
  const shapes = [
    { shape: [1], width: 1 },
    { shape: [1, 1], width: 2 },
    { shape: [1, 1, 1], width: 3 },
    { shape: [1, 1, 1, 1], width: 4 },
    { shape: [1, 0, 1, 1], width: 2 },
    { shape: [1, 1, 1, 0], width: 2 },
    { shape: [1, 1, 0, 1], width: 2 },
    { shape: [1, 1, 1, 1, 0, 1], width: 2 },
    { shape: [1, 1, 1, 1, 1], width: 1 },
    { shape: [1, 1, 1, 1], width: 2 },
    { shape: [1, 1, 1, 0, 1, 0], width: 3 },
    { shape: [1, 0, 1, 1, 1, 1], width: 3 }
  ];
  
  game.pieces = [];
  for (let i = 0; i < 3; i++) {
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    game.pieces.push({
      shape: [...randomShape.shape],
      width: randomShape.width,
      used: false
    });
  }
};

const selectPiece = (index) => {
  if (game.pieces[index].used) return;
  game.selectedPiece = index;
};

const showPreview = (cellIndex) => {
  if (game.selectedPiece === null) return;
  
  const piece = game.pieces[game.selectedPiece];
  if (piece.used) return;
  
  const row = Math.floor(cellIndex / 8);
  const col = cellIndex % 8;
  const cells = [];
  let invalid = false;
  
  for (let i = 0; i < piece.shape.length; i++) {
    if (piece.shape[i]) {
      const pieceRow = Math.floor(i / piece.width);
      const pieceCol = i % piece.width;
      const targetRow = row + pieceRow;
      const targetCol = col + pieceCol;
      const targetIndex = targetRow * 8 + targetCol;
      
      if (targetRow >= 8 || targetCol >= 8 || game.board[targetIndex]) {
        invalid = true;
      }
      cells.push(targetIndex);
    }
  }
  
  if (invalid) {
    game.invalidCells = cells;
    game.previewCells = [];
  } else {
    game.previewCells = cells;
    game.invalidCells = [];
  }
};

const clearPreview = () => {
  game.previewCells = [];
  game.invalidCells = [];
};

const placePiece = (cellIndex) => {
  if (game.selectedPiece === null) return;
  if (game.invalidCells.length > 0) return;
  if (game.previewCells.length === 0) return;
  
  const piece = game.pieces[game.selectedPiece];
  if (piece.used) return;
  
  for (let i = 0; i < game.previewCells.length; i++) {
    game.board[game.previewCells[i]] = true;
  }
  
  piece.used = true;
  game.moves++;
  game.selectedPiece = null;
  clearPreview();
  
  checkClearedLines();
  
  const allUsed = game.pieces.every(p => p.used);
  if (allUsed) {
    generatePieces();
  }
  
  checkGameOver();
};

const checkClearedLines = () => {
  let clearedCount = 0;
  const cellsToClear = [];
  
  // Check rows
  for (let row = 0; row < 8; row++) {
    let filled = true;
    for (let col = 0; col < 8; col++) {
      if (!game.board[row * 8 + col]) {
        filled = false;
        break;
      }
    }
    if (filled) {
      clearedCount++;
      for (let col = 0; col < 8; col++) {
        cellsToClear.push(row * 8 + col);
      }
    }
  }
  
  // Check columns
  for (let col = 0; col < 8; col++) {
    let filled = true;
    for (let row = 0; row < 8; row++) {
      if (!game.board[row * 8 + col]) {
        filled = false;
        break;
      }
    }
    if (filled) {
      clearedCount++;
      for (let row = 0; row < 8; row++) {
        const idx = row * 8 + col;
        if (!cellsToClear.includes(idx)) {
          cellsToClear.push(idx);
        }
      }
    }
  }
  
  if (clearedCount > 0) {
    for (let i = 0; i < cellsToClear.length; i++) {
      game.board[cellsToClear[i]] = false;
    }
    
    game.score += clearedCount * 10 + cellsToClear.length;
    
    if (game.score > game.bestScore) {
      game.bestScore = game.score;
      localStorage.setItem('blockBlastBestScore', game.bestScore);
    }
  }
};

const checkGameOver = () => {
  const canPlace = game.pieces.some(piece => {
    if (piece.used) return false;
    
    for (let cellIndex = 0; cellIndex < 64; cellIndex++) {
      const row = Math.floor(cellIndex / 8);
      const col = cellIndex % 8;
      let valid = true;
      
      for (let i = 0; i < piece.shape.length; i++) {
        if (piece.shape[i]) {
          const pieceRow = Math.floor(i / piece.width);
          const pieceCol = i % piece.width;
          const targetRow = row + pieceRow;
          const targetCol = col + pieceCol;
          
          if (targetRow >= 8 || targetCol >= 8 || game.board[targetRow * 8 + targetCol]) {
            valid = false;
            break;
          }
        }
      }
      
      if (valid) return true;
    }
    
    return false;
  });
  
  if (!canPlace) {
    game.gameOver = true;
  }
};

const newGame = () => {
  initGame();
};
</script>

<style>
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@300;400;500;600&display=swap');

/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  background: transparent;
  transition: background-color 0.3s, color 0.3s;
}

h1, h2, h3, .logo {
  font-family: 'Fraunces', serif;
  font-optical-sizing: auto;
}

body.light-mode {
  background: transparent;
  color: #1e293b;
}

body.dark-mode {
  background: transparent;
  color: #f1f5f9;
}

/* ===== ColorBends Animated Background ===== */
.animated-background {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 0 !important;
  pointer-events: none !important;
  overflow: hidden !important;
}

/* Ensure ColorBends inner container has full size */
.animated-background > div {
  width: 100% !important;
  height: 100% !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
}

/* Ensure canvas element fills container */
.animated-background canvas {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
}

/* App content layer - above background */
#app {
  position: relative;
  z-index: 10;
  min-height: 100vh;
}

/* Navigation */
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

body.dark-mode nav {
  background: rgba(30, 41, 59, 0.95);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: 2px;
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-links a {
  cursor: pointer;
  font-weight: 500;
  transition: color 0.3s ease;
  text-decoration: none;
}

.nav-links a:hover {
  color: #06b6d4;
}

body.dark-mode .nav-links a:hover {
  color: #22d3ee;
}

.theme-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.theme-toggle:hover {
  transform: scale(1.2) rotate(20deg);
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: transparent;
}

body.dark-mode .hero {
  background: transparent;
}

.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 1;
  transition: background 0.5s;
}

body.dark-mode .hero-overlay {
  background: rgba(0, 0, 0, 0.4);
}

.hero-content {
  position: relative;
  text-align: center;
  z-index: 100;
  padding: 2rem;
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero h1 {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 400;
  margin-bottom: 1rem;
  letter-spacing: 2px;
  color: white;
  min-height: 1.2em;
  line-height: 1.2;
}

.hero p {
  font-size: clamp(1rem, 3vw, 1.5rem);
  font-weight: 300;
  margin-bottom: 2rem;
  opacity: 0.9;
  color: white;
  min-height: 1.5em;
  line-height: 1.6;
}

/* DecryptedText styling */
.hero .decrypted-text {
  font-family: inherit;
  letter-spacing: inherit;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.scroll-indicator {
  animation: bounce 2s infinite;
  font-size: 2rem;
  cursor: pointer;
  color: white;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Sections */
section {
  padding: 5rem 2rem;
}

.section-light {
  background: transparent;
  position: relative;
  z-index: 1;
}

.section-dark-bg {
  background: transparent;
  position: relative;
  z-index: 1;
}

body.dark-mode .section-light {
  background: transparent;
}

body.dark-mode .section-dark-bg {
  background: transparent;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  font-size: 2.5rem;
  font-weight: 400;
  text-align: center;
  margin-bottom: 3rem;
  min-height: 1.2em;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* ScrollFloat styling for section titles */
h2 .scroll-float {
  display: inline-block;
}

/* About Section */
.about-container {
  display: flex;
  gap: 3rem;
  align-items: flex-start;
  flex-wrap: wrap;
}

.profile-photo-container {
  flex: 0 0 350px;
  aspect-ratio: 3 / 4;
  background: transparent;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s;
  position: relative;
}

body.dark-mode .profile-photo-container {
  background: transparent;
}

.profile-photo-container:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 32px rgba(6, 182, 212, 0.3);
}

.profile-photo-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.about-grid {
  flex: 1;
  min-width: 300px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.about-card {
  padding: 2rem;
  border-radius: 16px;
  background: transparent;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

body.dark-mode .about-card {
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.about-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(6, 182, 212, 0.3);
}

.about-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

.about-card p {
  opacity: 0.9;
  margin-bottom: 0.5rem;
}

.about-card p:last-child {
  margin-bottom: 0;
}

/* Skills Section */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
}

.skill-card {
  padding: 2rem 1rem;
  border-radius: 12px;
  background: transparent;
  color: #f1f5f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

body.dark-mode .skill-card {
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.skill-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(6, 182, 212, 0.2);
}

.skill-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skill-icon svg {
  width: 100%;
  height: 100%;
}

.skill-name {
  font-weight: 500;
  text-align: center;
}

/* Education Section */
.timeline {
  position: relative;
  padding: 2rem 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 20%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #06b6d4, #0284c7);
}

.timeline-item {
  display: grid;
  grid-template-columns: 20% 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
  position: relative;
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
}

.timeline-item:nth-child(1) {
  animation-delay: 0.1s;
}

.timeline-item:nth-child(2) {
  animation-delay: 0.3s;
}

.timeline-item:nth-child(3) {
  animation-delay: 0.5s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.timeline-date {
  text-align: right;
  padding-right: 2rem;
  position: relative;
}

.timeline-date::after {
  content: '';
  position: absolute;
  right: -0.5rem;
  top: 0.5rem;
  width: 1rem;
  height: 1rem;
  background: #06b6d4;
  border-radius: 50%;
  border: 3px solid #faf8f3;
  box-shadow: 0 0 0 3px #06b6d4;
}

body.dark-mode .timeline-date::after {
  border-color: #0f172a;
}

.year {
  font-size: 1.5rem;
  font-weight: 600;
  color: #0a2540;
  font-family: 'Fraunces', serif;
}

body.dark-mode .year {
  color: #f1f5f9;
}

.timeline-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

body.dark-mode .timeline-content {
  background: #1e293b;
}

.timeline-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(6, 182, 212, 0.2);
}

.school-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.school-logo {
  width: 100px;
  height: 100px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.school-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 0.5rem;
}

.school-logo.playing {
  animation: pulse 1.5s infinite;
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.school-logo::before {
  content: '🎵';
  position: absolute;
  font-size: 2rem;
  opacity: 0;
  transition: opacity 0.3s;
}

.school-logo:hover::before {
  opacity: 0.3;
}

.school-info h2 {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #0a2540;
}

body.dark-mode .school-info h2 {
  color: #f1f5f9;
}

.school-level {
  color: #06b6d4;
  font-weight: 500;
  font-size: 0.95rem;
}

.school-description {
  opacity: 0.8;
  line-height: 1.8;
}

.audio-indicator {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  display: none;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #f1f5f9;
}

.audio-indicator.active {
  display: flex;
}

.wave {
  display: inline-block;
  width: 3px;
  height: 12px;
  background: #06b6d4;
  margin: 0 2px;
  animation: wave 1s infinite ease-in-out;
}

.wave:nth-child(2) {
  animation-delay: 0.1s;
}

.wave:nth-child(3) {
  animation-delay: 0.2s;
}

@keyframes wave {
  0%, 100% {
    height: 12px;
  }
  50% {
    height: 20px;
  }
}

/* Gallery Section */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.gallery-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
}

.gallery-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.gallery-bg {
  position: absolute;
  inset: 0;
  transition: transform 0.3s;
  background-size: cover;
  background-position: center;
}

.gallery-item:hover .gallery-bg {
  transform: scale(1.1);
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0);
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  transition: background 0.3s;
}

.gallery-item:hover .gallery-overlay {
  background: rgba(0, 0, 0, 0.4);
}

.gallery-caption {
  color: white;
  opacity: 0;
  transition: opacity 0.3s;
  font-weight: 300;
}

.gallery-item:hover .gallery-caption {
  opacity: 1;
}

/* Lightbox */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  cursor: pointer;
  animation: fadeIn 0.3s ease-out;
}

.lightbox.active {
  display: flex;
}

.lightbox-content {
  max-width: 90%;
  max-height: 90%;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: zoomIn 0.3s ease-out;
}

@keyframes zoomIn {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.lightbox-close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  color: white;
  font-size: 3rem;
  font-weight: 300;
  cursor: pointer;
  z-index: 2001;
  transition: transform 0.3s;
}

.lightbox-close:hover {
  transform: rotate(90deg);
}

/* Guestbook Section */
.guestbook-form {
  max-width: 600px;
  margin: 0 auto 3rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

input, select {
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: #f1f5f9;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s;
}

body.dark-mode input,
body.dark-mode select {
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: #f1f5f9;
}

input:focus, select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.3);
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(to right, #06b6d4, #0284c7);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.3s;
}

.submit-btn:hover {
  transform: scale(1.02);
}

.entries {
  max-width: 800px;
  margin: 0 auto;
}

.entry {
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  background: #f1f5f9;
}

body.dark-mode .entry {
  background: #334155;
}

.entry-name {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.entry-detail {
  opacity: 0.75;
  margin-bottom: 0.3rem;
}

/* Resources Section */
.resources-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
}

.resource-card {
  padding: 2rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%);
  color: #f1f5f9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s;
  border: 2px solid rgba(6, 182, 212, 0.2);
  display: flex;
  flex-direction: column;
}

body.dark-mode .resource-card {
  background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(6, 182, 212, 0.3);
}

.resource-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(6, 182, 212, 0.3);
}

.resource-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-weight: 500;
  color: #06b6d4;
}

/* Footer */
footer {
  text-align: center;
  padding: 2rem;
  opacity: 0.75;
}

/* Block Blast Game Styles */
.game-container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.game-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

body.dark-mode .game-info {
  background: #1e293b;
}

.game-stat {
  text-align: center;
}

.game-stat-label {
  font-size: 0.9rem;
  opacity: 0.75;
  margin-bottom: 0.5rem;
}

.game-stat-value {
  font-size: 2rem;
  font-weight: 600;
  color: #06b6d4;
}

.game-board {
  display: inline-grid;
  grid-template-columns: repeat(8, 45px);
  grid-template-rows: repeat(8, 45px);
  gap: 3px;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

body.dark-mode .game-board {
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.game-cell {
  width: 45px;
  height: 45px;
  background: transparent;
  border-radius: 4px;
  transition: all 0.2s;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

body.dark-mode .game-cell {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.game-cell.filled {
  background: linear-gradient(135deg, #06b6d4, #0284c7);
  box-shadow: 0 2px 4px rgba(6, 182, 212, 0.3);
  border: 1px solid #0891b2;
}

body.dark-mode .game-cell.filled {
  background: linear-gradient(135deg, #22d3ee, #06b6d4);
  box-shadow: 0 4px 8px rgba(34, 211, 238, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.2);
  border: 2px solid #22d3ee;
}

.game-cell.preview {
  background: rgba(6, 182, 212, 0.5);
  border: 2px solid #06b6d4;
}

body.dark-mode .game-cell.preview {
  background: rgba(6, 182, 212, 0.6);
  border: 2px solid #06b6d4;
}

.game-cell.invalid {
  background: rgba(239, 68, 68, 0.5);
  border: 2px solid #ef4444;
}

.game-pieces {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 2rem;
  margin-bottom: 2rem;
  min-height: 120px;
}

.game-piece {
  display: grid;
  gap: 3px;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  cursor: grab;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

body.dark-mode .game-piece {
  background: #0f172a;
  border: 2px solid #334155;
}

.game-piece:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(6, 182, 212, 0.2);
}

.game-piece.selected {
  transform: scale(1.1);
  box-shadow: 0 8px 24px rgba(6, 182, 212, 0.4);
}

.game-piece.used {
  opacity: 0.3;
  pointer-events: none;
}

.piece-cell {
  width: 30px;
  height: 30px;
  border-radius: 4px;
  background: transparent;
}

.piece-cell.filled {
  background: linear-gradient(135deg, #06b6d4, #0284c7);
  border: 1px solid #0891b2;
  box-shadow: 0 2px 4px rgba(6, 182, 212, 0.3);
}

.game-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.game-btn {
  padding: 1rem 2rem;
  background: linear-gradient(to right, #06b6d4, #0284c7);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.3s;
}

.game-btn:hover {
  transform: scale(1.05);
}

.game-btn.secondary {
  background: #64748b;
}

.game-over {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
  z-index: 1001;
  animation: gameOverPop 0.5s ease-out;
}

body.dark-mode .game-over {
  background: #1e293b;
}

@keyframes gameOverPop {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

.game-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

/* Audio Player Styles */
.audio-player {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;
}

.record-player {
  position: relative;
  width: 65px;
  height: 65px;
  cursor: pointer;
}

.record {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background: 
    radial-gradient(circle at center, #1a1a1a 20%, transparent 20%),
    radial-gradient(circle at center, #2a2a2a 20%, #0a0a0a 21%, #0a0a0a 80%, #2a2a2a 81%);
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.3),
    inset 0 0 20px rgba(255, 255, 255, 0.1);
  position: relative;
  transition: transform 0.3s;
  animation-play-state: paused;
}

.record:hover {
  transform: scale(1.05);
}

.record::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 13px;
  height: 13px;
  background: #d4d4d4;
  border-radius: 50%;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
}

.record::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background: repeating-conic-gradient(
    from 0deg,
    rgba(255, 255, 255, 0.03) 0deg,
    rgba(255, 255, 255, 0.03) 2deg,
    transparent 2deg,
    transparent 4deg
  );
}

.record.playing {
  animation: spin 3s linear infinite;
}

.record.stopping {
  animation: spinSlow 2s ease-out forwards;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(720deg); }
}

.tonearm {
  position: absolute;
  top: 8px;
  right: -12px;
  width: 40px;
  height: 40px;
  transform-origin: 90% 10%;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  transform: rotate(-35deg);
}

.tonearm.active {
  transform: rotate(28deg);
}

.tonearm-arm {
  position: absolute;
  width: 2.5px;
  height: 30px;
  background: linear-gradient(to bottom, #94a3b8, #64748b);
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  right: 0;
}

.tonearm-head {
  position: absolute;
  bottom: -3px;
  right: -2.5px;
  width: 7px;
  height: 7px;
  background: #475569;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

.tonearm-base {
  position: absolute;
  top: 0;
  right: -1.5px;
  width: 6px;
  height: 6px;
  background: #64748b;
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

body.dark-mode .record {
  background: 
    radial-gradient(circle at center, #0a0a0a 20%, transparent 20%),
    radial-gradient(circle at center, #1a1a1a 20%, #000 21%, #000 80%, #1a1a1a 81%);
}

/* Responsive */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .nav-links.active {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  body.dark-mode .nav-links.active {
    background: #1e293b;
  }

  section {
    padding: 3rem 1rem;
  }

  .timeline::before {
    left: 1.5rem;
  }

  .timeline-item {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding-left: 3rem;
  }

  .timeline-date {
    text-align: left;
    padding-right: 0;
    padding-left: 2rem;
  }

  .timeline-date::after {
    left: -2.5rem;
    right: auto;
  }

  .school-header {
    flex-direction: column;
    text-align: center;
  }

  .about-container {
    flex-direction: column;
  }
  
  .profile-photo-container {
    flex: 0 0 auto;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }

  .game-board {
    grid-template-columns: repeat(8, 35px);
    grid-template-rows: repeat(8, 35px);
  }
  
  .game-cell {
    width: 35px;
    height: 35px;
  }
  
  .piece-cell {
    width: 25px;
    height: 25px;
  }
  
  .game-pieces {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>	
