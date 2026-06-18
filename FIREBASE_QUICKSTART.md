# Firebase Firestore Views & Likes - Quick Start Guide

## 🎯 What You Get

A complete real-time Views and Likes tracking system using **Firebase Firestore only** (no backend database needed).

```
Views: Increment when user opens prompt
Likes: Toggle like/unlike for logged-in users
Real-time: All visible cards update automatically
```

---

## ⚡ Quick Setup (5 Steps)

### Step 1: Get Firebase Credentials
1. Go to https://console.firebase.google.com
2. Create a new project (or use existing)
3. Go to Project Settings → Your Apps → Web
4. Copy the config object

### Step 2: Update firebase-config.js
```javascript
// Replace with your actual credentials
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};
```

### Step 3: Copy Firebase Code to script.js
1. Open `firebase-script-integration.js`
2. Copy the code into your `script.js` at the marked locations:
   - ADD AT TOP (after IIFE opens)
   - REPLACE createPromptCard()
   - REPLACE openModal()
   - UPDATE closeModal()
   - ADD modal like button handler
   - UPDATE init()

### Step 4: Update HTML Modal
Make sure your `index.html` modal contains:
```html
<!-- Views/Likes Display -->
<span id="modalViews">0</span> views
<span id="modalLikes">0</span> likes

<!-- Like Button -->
<button id="modalLikeBtn">
  <i class="fa-regular fa-heart"></i> Like
</button>
```

### Step 5: Add CSS Styling
Copy the CSS from `firebase-script-integration.js` to your `style.css`

---

## 📁 Files Included

| File | Purpose |
|------|---------|
| `firebase-config.js` | Firebase setup & initialization |
| `firestore-service.js` | All Firestore operations |
| `firebase-script-integration.js` | Code to copy into script.js |
| `FIREBASE_INTEGRATION_GUIDE.md` | Detailed step-by-step guide |
| `FIREBASE_REFERENCE.md` | Complete technical reference |

---

## 🗄️ Firestore Collections

### Collection: `prompts`
```javascript
prompts/p01 = {
  id: "p01",
  title: "Dreamy Sunset Couple Portrait",
  views: 0,     // ← Increments on open
  likes: 0      // ← Increments on like
}
```

### Collection: `likes`
```javascript
// Document: userId_promptId
likes/abc123_p01 = {
  userId: "abc123",
  promptId: "p01"
}
// Exists = User liked | Doesn't exist = User hasn't liked
```

---

## 🔄 How It Works

### View Flow
```
User opens modal
  ↓
recordPromptView(promptId) called
  ↓
Firestore increments views += 1
  ↓
Real-time listener fires
  ↓
All visible cards update instantly ✨
```

### Like Flow
```
User clicks heart button
  ↓
Check: Is user logged in?
  ↓
Check: Did user already like?
  ├─ YES → Delete like document, decrement count
  └─ NO  → Create like document, increment count
  ↓
Real-time listener fires
  ↓
All visible cards + modal update ✨
```

---

## 🧪 Quick Test

### Test 1: Views Increment
```javascript
// In browser console
await recordPromptView('p01');
const m = await getPromptMetrics('p01');
console.log(m.views);  // Should be 1 higher
```

### Test 2: Like Toggle (must be logged in)
```javascript
// In browser console
const r = await togglePromptLike('p01');
console.log(r.liked);    // true
console.log(r.message);  // "Like added"

// Click again
const r2 = await togglePromptLike('p01');
console.log(r2.liked);   // false
```

### Test 3: Real-time Updates (2 windows)
```javascript
// Window 1: Set up listener
const unsub = listenToPromptMetrics('p01', (m) => {
  console.log(`Views: ${m.views}, Likes: ${m.likes}`);
});

// Window 2: Make a change
await recordPromptView('p01');

// Window 1: Should log the update immediately ✨
```

---

## 🔐 Firestore Security Rules

Set these in Firebase Console (Firestore → Rules):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Prompts: Everyone can read, only admin can write
    match /prompts/{doc=**} {
      allow read: if true;
      allow write: if request.auth.uid != null && 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    // Likes: Users can read/create/delete their own likes
    match /likes/{doc=**} {
      allow read: if request.auth != null;
      allow create: if request.auth.uid == request.resource.data.userId;
      allow delete: if request.auth.uid == resource.data.userId;
    }
  }
}
```

---

## ✅ Integration Checklist

- [ ] Firebase project created
- [ ] Credentials added to `firebase-config.js`
- [ ] `firestore-service.js` imported in script.js
- [ ] Code copied into `script.js` at marked locations
- [ ] Modal HTML updated with view/like displays
- [ ] Like button HTML element exists
- [ ] CSS styling added
- [ ] Firestore Security Rules configured
- [ ] Tested all features locally

---

## 🎨 What It Looks Like

### Card Display
```
┌─────────────────────┐
│   Prompt Image      │
│  ❤️  (like button)   │
│  🔖 (save button)    │
└─────────────────────┘
Prompt Title
👁 5 views  ❤️ 2 likes
```

### Modal Display
```
Modal Title
👁 5 views  ❤️ 2 likes  🔖 482 saves

[Copy Prompt]  [❤️ Like]  [🔖 Save]
```

---

## 🚀 Real Features

✅ **Views** increment when modal opens
✅ **Likes** toggle on/off (like/unlike)
✅ **Real-time** updates across all tabs
✅ **Per-user** like tracking (one like per user)
✅ **Authentication** required for likes
✅ **No page refresh** needed
✅ **Atomic operations** prevent race conditions
✅ **Firestore-native** (no custom backend)

---

## 🆘 Troubleshooting

### Issue: Views not incrementing
**Solution:** Check that `recordPromptView()` is called in `openModal()`

### Issue: Likes not working
**Solution:** Make sure user is logged in (`currentUser` check)

### Issue: Real-time updates not working
**Solution:** Verify listeners are set up and not unsubscribed

### Issue: Permission denied in console
**Solution:** Check Firestore Security Rules in Firebase Console

### Issue: Images not displaying
**Solution:** Ensure Firebase Storage rules allow read access

---

## 📊 Cost Estimate

Firebase Firestore is free for modest usage:
- Free tier: **50,000 reads/day**
- PromptVerse typical usage: **5,000-10,000 reads/day**

For most projects, you'll stay in the free tier. Costs only apply if you exceed free limits.

---

## 🔗 Key Functions

```javascript
// Views
recordPromptView(promptId)        // Increment view count
getPromptMetrics(promptId)        // Get views + likes
listenToPromptMetrics(id, cb)    // Real-time updates

// Likes
togglePromptLike(promptId)        // Like/unlike
getUserLikeStatus(promptId)       // Check if user liked
listenToUserLikeStatus(id, cb)   // Real-time like updates

// Setup
initializePromptsInFirestore()   // Create prompt docs
```

---

## 📚 More Info

- **Full Guide:** See `FIREBASE_INTEGRATION_GUIDE.md`
- **Technical Ref:** See `FIREBASE_REFERENCE.md`
- **Code to Copy:** See `firebase-script-integration.js`
- **Firebase Docs:** https://firebase.google.com/docs

---

## ✨ You're Ready!

Your Views & Likes system is complete and ready to integrate.

**Next Steps:**
1. Get Firebase credentials
2. Update `firebase-config.js`
3. Follow the integration guide
4. Test everything works
5. Deploy! 🚀
