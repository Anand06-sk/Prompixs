const categories = [
  'Couples', 'Friends', 'AI Chibi', 'Cartoon', 'AI Caricature', 'Fake Movie Poster',
  'AI Action Figure', 'Scrapbook', 'Journal Style', 'Barbie Version', '90s Photos',
  'Anime', 'Fantasy'
];

const prompts = [
  {
    id: 'p1',
    title: 'Sunset Lovers in Dreamy Baroque Style',
    category: 'Couples',
    tags: ['Romantic', 'Baroque'],
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
    prompt: 'A romantic couple portrait in soft pastel baroque lighting, cinematic background, watercolor texture.',
    bookmarked: false,
  },
  {
    id: 'p2',
    title: 'Friend Squad Street Scene',
    category: 'Friends',
    tags: ['Urban', 'Casual'],
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    prompt: 'A vibrant group of friends hanging out in a neon city street, candid expressions, magazine cover energy.',
    bookmarked: false,
  },
  {
    id: 'p3',
    title: 'Chibi Wizard Adventure',
    category: 'AI Chibi',
    tags: ['Cute', 'Fantasy'],
    image: 'https://images.unsplash.com/photo-1512418490979-92798cec8073?auto=format&fit=crop&w=900&q=80',
    prompt: 'Tiny chibi wizard carrying a glowing staff in an enchanted forest, soft lighting, adorable proportions.',
    bookmarked: false,
  },
  {
    id: 'p4',
    title: 'Cartoon Hero Action Pose',
    category: 'Cartoon',
    tags: ['Dynamic', 'Colorful'],
    image: 'https://images.unsplash.com/photo-1523475496153-3d6cc3ffab0d?auto=format&fit=crop&w=900&q=80',
    prompt: 'A bold cartoon hero striking an action pose on a city rooftop, exaggerated features, bright palette.',
    bookmarked: false,
  },
  {
    id: 'p5',
    title: 'Satirical Celebrity Caricature',
    category: 'AI Caricature',
    tags: ['Humor', 'Portrait'],
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=900&q=80',
    prompt: 'An over-the-top caricature portrait with exaggerated facial features and playful expression, glossy finish.',
    bookmarked: false,
  },
  {
    id: 'p6',
    title: 'Fake Movie Poster Mystery',
    category: 'Fake Movie Poster',
    tags: ['Cinematic', 'Drama'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80',
    prompt: 'A dramatic fake movie poster featuring a mysterious hero and neon title, film grain, dramatic lighting.',
    bookmarked: false,
  },
  {
    id: 'p7',
    title: 'AI Action Figure Showcase',
    category: 'AI Action Figure',
    tags: ['Toy', 'Collectible'],
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    prompt: 'A premium action figure showcase with futuristic armor and reflective surfaces, studio lighting.',
    bookmarked: false,
  },
  {
    id: 'p8',
    title: 'Scrapbook Memory Page',
    category: 'Scrapbook',
    tags: ['Collage', 'Retro'],
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
    prompt: 'A scrapbook page full of polaroids, stickers, dried flowers, and handwritten notes with warm textures.',
    bookmarked: false,
  },
  {
    id: 'p9',
    title: 'Journal Storytelling Layout',
    category: 'Journal Style',
    tags: ['Analog', 'Narrative'],
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80',
    prompt: 'A detailed journal spread with ink sketches, typed notes, and stickers on cream-colored paper.',
    bookmarked: false,
  },
  {
    id: 'p10',
    title: 'Barbiecore Dreamscape',
    category: 'Barbie Version',
    tags: ['Pink', 'Fantasy'],
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    prompt: 'A glamorous Barbie-inspired dreamscape with pink neon lights, glitter, and playful fashion details.',
    bookmarked: false,
  },
  {
    id: 'p11',
    title: '90s Photo Shoot Vibe',
    category: '90s Photos',
    tags: ['Retro', 'Fashion'],
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
    prompt: 'A 90s-inspired photo shoot with vintage color grading, bold outfits, and analogue grain.',
    bookmarked: false,
  },
  {
    id: 'p12',
    title: 'Anime Sword Master',
    category: 'Anime',
    tags: ['Epic', 'Hero'],
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    prompt: 'An anime sword master standing on a cliff at twilight with windblown hair and dynamic energy.',
    bookmarked: false,
  },
  {
    id: 'p13',
    title: 'Fantasy Castle Overlook',
    category: 'Fantasy',
    tags: ['Epic', 'Realm'],
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=900&q=80',
    prompt: 'A mythic fantasy castle perched above clouds, glowing towers, and an enchanted misty valley.',
    bookmarked: false,
  }
];

const categoryGrid = document.querySelector('#categoryGrid');
const promptGrid = document.querySelector('#promptGrid');
const popularList = document.querySelector('#popularList');
const latestList = document.querySelector('#latestList');
const navSearch = document.querySelector('#navSearch');
const heroSearch = document.querySelector('#heroSearch');
const exploreBtn = document.querySelector('#exploreBtn');
const modeToggle = document.querySelector('#modeToggle');
const promptModal = document.querySelector('#promptModal');
const closeModal = document.querySelector('#closeModal');
const modalImage = document.querySelector('#modalImage');
const modalTitle = document.querySelector('#modalTitle');
const modalText = document.querySelector('#modalText');
const copyPrompt = document.querySelector('#copyPrompt');
const openChatGPT = document.querySelector('#openChatGPT');
const openGemini = document.querySelector('#openGemini');
const toggleBookmark = document.querySelector('#toggleBookmark');
const navPills = document.querySelectorAll('.nav-pill');

let activeCategory = 'all';
let activePrompt = null;
let bookmarks = JSON.parse(localStorage.getItem('promptverseBookmarks') || '[]');

function init() {
  renderCategories();
  renderPrompts();
  renderPopular();
  renderLatest();
  restoreDarkMode();
  highlightActiveCategory();
}

function saveBookmarks() {
  localStorage.setItem('promptverseBookmarks', JSON.stringify(bookmarks));
}

function isBookmarked(promptId) {
  return bookmarks.includes(promptId);
}

function toggleBookmarkState(promptId) {
  if (isBookmarked(promptId)) {
    bookmarks = bookmarks.filter(id => id !== promptId);
  } else {
    bookmarks.push(promptId);
  }
  saveBookmarks();
  renderPrompts();
  renderPopular();
}

function filterPrompts(searchTerm = '', category = activeCategory) {
  return prompts.filter(item => {
    const matchesCategory = category === 'all' || item.category === category;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
      || item.category.toLowerCase().includes(searchTerm.toLowerCase())
      || item.prompt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}

function renderCategories() {
  categoryGrid.innerHTML = categories.map(category => {
    return `<button class="category-card" data-category="${category}">${category}</button>`;
  }).join('');

  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      activeCategory = card.dataset.category;
      setActivePillForCategory(activeCategory);
      renderPrompts();
      highlightCategoryCard(card);
    });
  });
}

function setActivePillForCategory(category) {
  navPills.forEach(pill => {
    if (category === 'all' && pill.dataset.category === 'all') {
      pill.classList.add('active');
    } else if (pill.dataset.category === category) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });
}

function highlightCategoryCard(selectedCard) {
  document.querySelectorAll('.category-card').forEach(card => {
    card.classList.toggle('active', card === selectedCard);
  });
}

function renderPrompts() {
  const searchTerm = navSearch.value.trim() || heroSearch.value.trim();
  const visiblePrompts = filterPrompts(searchTerm, activeCategory);

  promptGrid.innerHTML = visiblePrompts.map(item => {
    const bookmarkedClass = isBookmarked(item.id) ? '★' : '☆';
    return `
      <article class="prompt-card" data-id="${item.id}">
        <div class="prompt-image" style="background-image:url('${item.image}')">
          <div class="prompt-overlay"></div>
          <button class="bookmark-btn" data-action="bookmark" aria-label="Toggle bookmark">${bookmarkedClass}</button>
        </div>
        <div class="prompt-card-content">
          <h3>${item.title}</h3>
          <p>${item.prompt}</p>
          <div class="prompt-meta">
            <span>${item.category}</span>
            <span>${isBookmarked(item.id) ? 'Bookmarked' : 'Save'}</span>
          </div>
        </div>
      </article>
    `;
  }).join('');

  promptGrid.querySelectorAll('.prompt-card').forEach(card => {
    const promptId = card.dataset.id;
    card.addEventListener('click', event => {
      if (event.target.closest('.bookmark-btn')) return;
      const prompt = prompts.find(item => item.id === promptId);
      openDetailModal(prompt);
    });
  });

  promptGrid.querySelectorAll('.bookmark-btn').forEach(btn => {
    btn.addEventListener('click', event => {
      event.stopPropagation();
      const promptId = event.currentTarget.closest('.prompt-card').dataset.id;
      toggleBookmarkState(promptId);
    });
  });
}

function renderPopular() {
  const sortedByBookmarks = prompts
    .map(item => ({ ...item, score: isBookmarked(item.id) ? 1 : 0 }))
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, 4);

  if (sortedByBookmarks.length === 0) {
    popularList.innerHTML = '<div class="panel-card"><div class="chip">♥</div><div><h4>No bookmarks yet</h4><p>Start saving prompts to see them here.</p></div></div>';
    return;
  }

  popularList.innerHTML = sortedByBookmarks.map(item => `
    <div class="panel-card">
      <div class="chip">${item.category.slice(0, 2).toUpperCase()}</div>
      <div>
        <h4>${item.title}</h4>
        <p>${item.category} · ${item.tags.join(', ')}</p>
      </div>
    </div>
  `).join('');
}

function renderLatest() {
  const latestPrompts = [...prompts].slice(-4).reverse();
  latestList.innerHTML = latestPrompts.map(item => `
    <div class="latest-item">
      <div>
        <h4>${item.title}</h4>
        <p>${item.prompt}</p>
      </div>
      <div class="tag">${item.category}</div>
    </div>
  `).join('');
}

function openDetailModal(prompt) {
  activePrompt = prompt;
  modalTitle.textContent = prompt.title;
  modalText.textContent = prompt.prompt;
  modalImage.style.backgroundImage = `url('${prompt.image}')`;
  toggleBookmark.textContent = isBookmarked(prompt.id) ? 'Remove bookmark' : 'Bookmark';
  promptModal.classList.remove('hidden');
  promptModal.setAttribute('aria-hidden', 'false');
}

function closeDetailModal() {
  promptModal.classList.add('hidden');
  promptModal.setAttribute('aria-hidden', 'true');
}

function copyPromptText() {
  if (!activePrompt) return;
  navigator.clipboard.writeText(activePrompt.prompt);
  copyPrompt.textContent = 'Copied!';
  setTimeout(() => { copyPrompt.textContent = 'Copy prompt'; }, 1400);
}

function openExternal(url) {
  window.open(url, '_blank');
}

function restoreDarkMode() {
  const savedPreference = localStorage.getItem('promptverseDarkMode');
  if (savedPreference === 'enabled') {
    document.documentElement.classList.add('dark-mode');
    modeToggle.textContent = '☀️';
  }
}

function toggleDarkMode() {
  const isDark = document.documentElement.classList.toggle('dark-mode');
  modeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('promptverseDarkMode', isDark ? 'enabled' : 'disabled');
}

function highlightActiveCategory() {
  document.querySelectorAll('.category-card').forEach(card => {
    card.classList.toggle('active', card.dataset.category === activeCategory);
  });
}

navSearch.addEventListener('input', renderPrompts);
heroSearch.addEventListener('input', renderPrompts);
exploreBtn.addEventListener('click', () => {
  heroSearch.focus();
});
modeToggle.addEventListener('click', toggleDarkMode);
closeModal.addEventListener('click', closeDetailModal);
promptModal.addEventListener('click', event => {
  if (event.target === promptModal) closeDetailModal();
});
copyPrompt.addEventListener('click', copyPromptText);
openChatGPT.addEventListener('click', () => {
  if (!activePrompt) return;
  openExternal(`https://chat.openai.com/?prompt=${encodeURIComponent(activePrompt.prompt)}`);
});
openGemini.addEventListener('click', () => {
  if (!activePrompt) return;
  openExternal(`https://gemini.google.com/?q=${encodeURIComponent(activePrompt.prompt)}`);
});
navPills.forEach(pill => {
  pill.addEventListener('click', () => {
    activeCategory = pill.dataset.category;
    highlightActiveCategory();
    renderPrompts();
  });
});

init();
