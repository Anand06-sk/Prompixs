# Firebase Firestore Views & Likes Implementation Guide

## Overview

This guide shows how to integrate Firebase Firestore for real-time Views and Likes tracking into your existing PromptVerse frontend.

---

## Step 1: Add Firebase Scripts to HTML

Add these imports at the **top** of your `index.html` `<head>` section:

```html
<!-- Firebase Configuration & Services -->
<script type="module">
  // Import will be added in step 2
</script>
```

Then add the modular imports:

```html
<!-- At end of body -->
<script type="module">
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
  import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';
  import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';
  
  // Your app will use these
  window.firebase = {
    initializeApp,
    getAuth,
    onAuthStateChanged,
    getFirestore
  };
</script>
```

---

## Step 2: Update Your HTML Index

Make sure your modal has these elements for displaying views/likes:

```html
<!-- In your modal section, update the meta display -->
<div class="modal-meta">
  <span><i class="fa-solid fa-eye"></i> <span id="modalViews">0</span> views</span>
  <span><i class="fa-solid fa-heart"></i> <span id="modalLikes">0</span> likes</span>
  <span><i class="fa-solid fa-bookmark"></i> <span id="modalBookmarkCount">0</span> saves</span>
  <span><i class="fa-solid fa-clock"></i> <span id="modalDate"></span></span>
</div>

<!-- Make sure modal has a like button -->
<div class="modal-actions">
  <button class="btn btn-primary" id="modalCopyBtn">
    <i class="fa-solid fa-copy"></i> Copy prompt
  </button>
  <button class="btn btn-outline" id="modalLikeBtn" aria-label="Like this prompt">
    <i class="fa-regular fa-heart"></i> Like
  </button>
  <button class="btn btn-outline" id="modalBookmarkBtn">
    <i class="fa-regular fa-bookmark"></i> Save
  </button>
</div>
```

---

## Step 3: Add Firebase Configuration

Replace the configuration values in `firebase-config.js`:

```javascript
// Get these from Firebase Console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};
```

---

## Step 4: Initialize Firestore in Script.js

Add this **at the very beginning** of your script.js IIFE, before any existing code:

```javascript
// ========== FIREBASE IMPORTS & INITIALIZATION ==========

import {
  db,
  auth
} from './firebase-config.js';

import {
  recordPromptView,
  togglePromptLike,
  getUserLikeStatus,
  getPromptMetrics,
  listenToPromptMetrics,
  listenToUserLikeStatus,
  initializePromptsInFirestore
} from './firestore-service.js';

import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';

// Store for tracking real-time listeners
const firestoreListeners = {};

// Monitor auth state
let currentUser = null;
onAuthStateChanged(auth, (user) => {
  currentUser = user;
  updateAuthUI();
});
```

---

## Step 5: Update createPromptCard Function

Find your `createPromptCard` function and update it to use Firestore metrics:

```javascript
async function createPromptCard(p) {
  const card = document.createElement('div');
  card.className = 'prompt-card';
  card.dataset.id = p.id;
  
  const isSaved = state.bookmarks.has(p.id);
  
  // Get metrics from Firestore
  const metrics = await getPromptMetrics(p.id);
  const views = metrics.views || 0;
  const likes = metrics.likes || 0;
  
  // Check if current user liked this
  const likeStatus = await getUserLikeStatus(p.id);
  const isLiked = likeStatus.liked || false;

  card.innerHTML = `
    <div class="card-img-wrap">
      <img src="${p.img}" alt="${p.title}" loading="lazy">
      <div class="card-overlay"></div>
      
      <div class="card-actions-top">
        <button class="card-action-btn card-like-btn ${isLiked ? 'liked' : ''}" 
                aria-label="Like this prompt" type="button">
          <i class="fa-${isLiked ? 'solid' : 'regular'} fa-heart"></i>
        </button>
        <button class="card-action-btn card-save-btn ${isSaved ? 'saved' : ''}" 
                data-id="${p.id}" aria-label="Save this prompt" type="button">
          <i class="fa-${isSaved ? 'solid' : 'regular'} fa-bookmark"></i>
        </button>
      </div>
      
      <button class="card-action-center" aria-label="View prompt details" type="button">
        <i class="fa-solid fa-arrow-up-right"></i>
      </button>
      
      <div class="card-category-badge">${(catNameById[p.category] || p.category).toUpperCase()}</div>
    </div>
    
    <div class="card-content">
      <h3 class="card-title">${p.title}</h3>
      <div class="card-meta">
        <div class="card-meta-left">
          <span class="meta-item card-views"><i class="fa-solid fa-eye"></i> ${views}</span>
          <span class="meta-item card-likes"><i class="fa-solid fa-heart"></i> ${likes}</span>
        </div>
        <span class="card-meta-date">${new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
      </div>
    </div>
  `;

  // Click handler to open modal
  card.addEventListener('click', (e) => {
    if (e.target.closest('.card-action-btn') || e.target.closest('.card-action-center')) return;
    openModal(p.id);
  });

  // Save button
  const saveBtn = card.querySelector('.card-save-btn');
  saveBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!isLoggedIn()) {
      redirectToAuth(window.location.pathname + window.location.search + window.location.hash, 'bookmark', p.id);
      return;
    }
    toggleBookmark(p.id);
    saveBtn.classList.toggle('saved', state.bookmarks.has(p.id));
  });

  // Like button
  const likeBtn = card.querySelector('.card-like-btn');
  if (likeBtn) {
    likeBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      
      if (!currentUser) {
        redirectToAuth(window.location.pathname + window.location.search + window.location.hash);
        return;
      }
      
      const result = await togglePromptLike(p.id);
      if (result.success) {
        // Update button state
        likeBtn.classList.toggle('liked', result.liked);
        likeBtn.innerHTML = `<i class="fa-${result.liked ? 'solid' : 'regular'} fa-heart"></i>`;
      } else {
        showToast(result.message, 'fa-solid fa-exclamation-circle');
      }
    });
  }

  // Center action button
  const actionCenter = card.querySelector('.card-action-center');
  actionCenter.addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(p.id);
  });

  // Set up real-time listener for metrics
  if (!firestoreListeners[p.id]) {
    firestoreListeners[p.id] = listenToPromptMetrics(p.id, (metrics) => {
      updateCardMetrics(p.id, metrics);
    });
  }

  return card;
}
```

---

## Step 6: Add Utility Functions to Update UI

Add these functions to your script.js:

```javascript
/**
 * Update card metrics display when Firestore data changes
 */
function updateCardMetrics(promptId, metrics) {
  document.querySelectorAll(`.prompt-card[data-id="${promptId}"] .card-views`).forEach(el => {
    el.innerHTML = `<i class="fa-solid fa-eye"></i> ${metrics.views}`;
  });
  
  document.querySelectorAll(`.prompt-card[data-id="${promptId}"] .card-likes`).forEach(el => {
    el.innerHTML = `<i class="fa-solid fa-heart"></i> ${metrics.likes}`;
  });
}

/**
 * Update modal metrics
 */
function updateModalMetrics(metrics) {
  const viewsEl = document.getElementById('modalViews');
  const likesEl = document.getElementById('modalLikes');
  
  if (viewsEl) viewsEl.textContent = metrics.views;
  if (likesEl) likesEl.textContent = metrics.likes;
}

/**
 * Update modal like button state
 */
async function updateModalLikeButton(promptId) {
  const likeStatus = await getUserLikeStatus(promptId);
  const likeBtn = document.getElementById('modalLikeBtn');
  
  if (likeBtn) {
    likeBtn.classList.toggle('liked', likeStatus.liked);
    likeBtn.innerHTML = likeStatus.liked
      ? '<i class="fa-solid fa-heart"></i> Liked'
      : '<i class="fa-regular fa-heart"></i> Like';
  }
}
```

---

## Step 7: Update openModal Function

Update your `openModal` function to record views and set up real-time updates:

```javascript
async function openModal(id) {
  const p = PROMPTS.find(x => x.id === id);
  if (!p) return;
  currentModalId = id;

  // Record view in Firestore
  await recordPromptView(id);
  
  // Fetch and display metrics
  const metrics = await getPromptMetrics(id);
  updateModalMetrics(metrics);

  $('#modalImage').src = p.img;
  $('#modalImage').alt = p.title;
  $('#modalCategoryChip').textContent = catNameById[p.category];
  $('#modalTitle').textContent = p.title;
  $('#modalBookmarkCount').textContent = p.bookmarks;
  $('#modalDate').textContent = formatDate(p.date);
  $('#modalPromptText').textContent = p.prompt;

  const encoded = encodeURIComponent(p.prompt);
  $('#modalChatGPTBtn').href = `https://chat.openai.com/?q=${encoded}`;
  $('#modalGeminiBtn').href = `https://gemini.google.com/app?q=${encoded}`;

  // Update like button
  await updateModalLikeButton(id);

  // Set up real-time listener for modal metrics
  if (firestoreListeners[`modal_${id}`]) {
    firestoreListeners[`modal_${id}`]();
  }
  firestoreListeners[`modal_${id}`] = listenToPromptMetrics(id, (metrics) => {
    updateModalMetrics(metrics);
  });

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
```

---

## Step 8: Update Modal Like Button Handler

Add this to your modal setup code:

```javascript
// Modal like button
const modalLikeBtn = document.getElementById('modalLikeBtn');
if (modalLikeBtn) {
  modalLikeBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      redirectToAuth(window.location.pathname + window.location.search + window.location.hash);
      return;
    }
    
    const result = await togglePromptLike(currentModalId);
    if (result.success) {
      await updateModalLikeButton(currentModalId);
      showToast(result.message, 'fa-solid fa-heart');
    } else {
      showToast(result.message || 'Error updating like', 'fa-solid fa-exclamation-circle');
    }
  });
}
```

---

## Step 9: Update Init Function

Update your `init()` function to initialize Firestore:

```javascript
async function init() {
  // restore dark mode
  const savedDark = localStorage.getItem('pv_dark') === '1';
  applyDarkMode(savedDark);

  // Initialize prompts in Firestore (only creates if don't exist)
  await initializePromptsInFirestore(PROMPTS);

  // update auth UI
  updateAuthUI();

  renderCategories();
  renderAllCardSections();
  updateBookmarkCount();
}
```

---

## Step 10: Add CSS Styling

Add these styles to your `style.css`:

```css
/* Like button styling */
.card-like-btn {
  transition: all 0.2s ease;
}

.card-like-btn.liked i {
  color: #ef4444;
}

.card-like-btn:hover:not(.liked) i {
  color: #f5a6a6;
}

/* Modal like button */
#modalLikeBtn {
  transition: all 0.2s ease;
}

#modalLikeBtn.liked {
  background-color: #ef4444 !important;
  border-color: #ef4444 !important;
  color: white;
}

#modalLikeBtn.liked i {
  color: white;
}

#modalLikeBtn:hover {
  background-color: #dc2626 !important;
}
```

---

## Step 11: Set Up Firestore Security Rules

In Firebase Console, set these Firestore Security Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Prompts: Read all, Write only admin
    match /prompts/{document=**} {
      allow read: if true;
      allow write: if request.auth.uid != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    // Likes: Users can only manage their own likes
    match /likes/{document=**} {
      allow read: if request.auth != null;
      allow create: if request.auth.uid == request.resource.data.userId;
      allow delete: if request.auth.uid == resource.data.userId;
      allow update: if false; // Don't allow updates
    }
  }
}
```

---

## Firestore Collections Structure

After setup, your Firestore database will have:

### Collection: `prompts`
```
Document: p01
{
  id: "p01",
  title: "Dreamy Sunset Couple Portrait",
  category: "couples",
  image: "https://...",
  prompt: "A romantic portrait...",
  bookmarks: 482,
  date: "2026-06-10",
  views: 12,          ← Updates in real-time
  likes: 3,           ← Updates in real-time
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Collection: `likes`
```
Document: abc123_p01
{
  userId: "abc123",
  promptId: "p01",
  createdAt: timestamp
}
```

---

## Testing Checklist

- [ ] Views increment when opening modal
- [ ] Views don't increment on page refresh (only once per session)
- [ ] Views display correctly on all cards
- [ ] Like button works (requires login)
- [ ] Like button toggles (like/unlike)
- [ ] Likes update in real-time on all visible cards
- [ ] Unauthenticated users are redirected to login
- [ ] Modal displays correct views/likes
- [ ] Real-time updates work (open in 2 windows)

---

## Real-time Updates Explained

With Firestore real-time listeners, if two users have the same prompt open:

1. User A likes the prompt
2. Firestore updates the document
3. User B's screen automatically shows the new like count (no refresh needed)

This is because we're using `listenToPromptMetrics()` which subscribes to changes.

---

## Common Issues

### Views not incrementing
- Check that `recordPromptView()` is called in `openModal()`
- Verify Firestore rules allow writes
- Check browser console for errors

### Likes not working
- Ensure user is logged in (check `currentUser`)
- Verify Firestore rules allow likes collection writes
- Check that user UID matches in likes document

### Real-time updates not working
- Verify listeners are set up in `createPromptCard()`
- Check that card selector matches your HTML
- Make sure listener unsubscribe works

---

## Performance Tips

- Use `listenToPromptMetrics()` only for visible cards
- Unsubscribe from listeners when card is removed
- Batch Firestore operations when possible
- Consider pagination for large prompt lists

---

## Database Indexes (Optional but Recommended)

In Firebase Console, create composite indexes for:
1. `prompts` collection, field `views` (Descending)
2. `prompts` collection, field `likes` (Descending)
3. `likes` collection, field `userId` (Ascending)

This improves query performance for sorting and filtering.
