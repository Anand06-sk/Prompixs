# Firebase Firestore Views & Likes System - Complete Reference

## 🎯 What Was Implemented

A complete real-time Views and Likes tracking system using **Firebase Firestore** (not localStorage, not backend database).

---

## 📋 Files Created

1. **firebase-config.js** - Firebase initialization and configuration
2. **firestore-service.js** - All Firestore operations (views, likes, listeners)
3. **FIREBASE_INTEGRATION_GUIDE.md** - Step-by-step integration instructions

---

## 🗄️ Firestore Database Schema

### Collection: `prompts`

Every prompt document contains:

```javascript
{
  id: "p01",                                    // Unique prompt ID
  title: "Dreamy Sunset Couple Portrait",       // Prompt title
  category: "couples",                          // Category ID
  image: "https://images.unsplash.com/...",    // Image URL
  prompt: "A romantic portrait of a couple...", // Prompt text
  bookmarks: 482,                               // Bookmark count (static)
  date: "2026-06-10",                           // Creation date
  views: 0,                                     // ✨ Dynamic - increments on open
  likes: 0,                                     // ✨ Dynamic - increments on like
  createdAt: Timestamp,                         // Server timestamp
  updatedAt: Timestamp                          // Last update timestamp
}
```

**Key Features:**
- `views` and `likes` **start at 0**
- Updated using **atomic increments** (prevents race conditions)
- Changes are **real-time** (listeners update UI automatically)

---

### Collection: `likes`

User-specific like tracking to prevent duplicate likes:

```javascript
{
  // Document ID format: {userId}_{promptId}
  // Example: "abc123_p01"
  
  userId: "abc123",              // Firebase Auth UID
  promptId: "p01",               // Prompt ID being liked
  createdAt: Timestamp           // When like was created
}
```

**Key Features:**
- **Unique constraint** on (userId, promptId) pair
- Allows quick lookup: "Did this user like this prompt?"
- Document exists = **Liked**, Document doesn't exist = **Not liked**

---

## 🔄 How It Works

### View Tracking Flow

```
1. User clicks card or link
           ↓
2. openModal(promptId) called
           ↓
3. recordPromptView(promptId) executes
           ↓
4. Firestore increments: prompts/{promptId}.views += 1
           ↓
5. Real-time listener fires
           ↓
6. All visible cards update display
           ↓
7. No page refresh needed ✨
```

**View Rules:**
- ✅ Increment when: Opening modal, opening detail page
- ❌ Don't increment when: Scrolling, hovering, page refresh

### Like Tracking Flow

```
1. User clicks heart button
           ↓
2. Check: Is user logged in?
   - NO → Redirect to login
   - YES → Continue
           ↓
3. Check: Did this user already like?
   - Look for likes/{userId}_{promptId}
           ↓
4. If NOT liked (document doesn't exist):
   - Create likes document
   - Increment prompts/{promptId}.likes += 1
   - Update UI (heart becomes solid)
           ↓
5. If ALREADY liked (document exists):
   - Delete likes document
   - Decrement prompts/{promptId}.likes -= 1
   - Update UI (heart becomes outline)
           ↓
6. Real-time listeners fire
           ↓
7. All visible cards + modal update
```

---

## 🛠️ Core Functions

### View Tracking

```javascript
// Record a view when prompt is opened
await recordPromptView(promptId);

// Get current view/like counts
const metrics = await getPromptMetrics(promptId);
console.log(metrics.views);  // Number
console.log(metrics.likes);  // Number
```

### Like Tracking

```javascript
// Toggle like/unlike for current user
const result = await togglePromptLike(promptId);

if (result.success) {
  console.log(result.liked);    // true or false
  console.log(result.message);  // "Like added" or "Like removed"
}

// Check if current user liked a prompt
const status = await getUserLikeStatus(promptId);
console.log(status.liked);  // true or false
```

### Real-time Updates

```javascript
// Listen to prompt metrics changes in real-time
const unsubscribe = listenToPromptMetrics(promptId, (metrics) => {
  // Called whenever views or likes change
  console.log(`Views: ${metrics.views}`);
  console.log(`Likes: ${metrics.likes}`);
});

// When done, unsubscribe
unsubscribe();

// Listen to user's like status
const unsubsLike = listenToUserLikeStatus(promptId, (status) => {
  console.log(`Liked: ${status.liked}`);
});
```

---

## 📊 Real-time Updates Example

**Scenario:** Two users viewing the same prompt

```
Time 1: User A has prompt modal open
        - Views: 5, Likes: 2
        
Time 2: User B opens the same prompt
        - recordPromptView() fires
        - Firestore: views = 6
        - Real-time listener fires
        - User A sees Views: 6 (automatically ✨)
        
Time 3: User B clicks like heart
        - togglePromptLike() fires
        - Firestore: likes = 3
        - Real-time listener fires
        - User A sees Likes: 3 (automatically ✨)
        - User A's heart button shows "Liked" state
```

**No refresh needed!** Firestore listeners push updates to all connected clients.

---

## 🔐 Security Rules

Firestore Security Rules should be configured as:

```
prompts: READ all users, WRITE admin only
likes:   READ/CREATE/DELETE authenticated users only
```

This ensures:
- Everyone can see view/like counts ✓
- Only authenticated users can like ✓
- Users can only like/unlike their own likes ✓
- Admins can manage prompts ✓

---

## ✨ Key Differences from Backend API

| Feature | Firebase Firestore | Traditional Backend |
|---------|-------------------|-------------------|
| Real-time | ✅ Yes (built-in) | ❌ Polling needed |
| Database | ✅ Included | ✅ Separate |
| Server | ❌ None needed | ✅ Required |
| Cost | 💰 Per operation | 💰 Per server hour |
| Setup | ⚡ Minutes | ⏱️ Hours |
| Scalability | ✅ Auto (Firebase) | ⚠️ Manual |

---

## 🚀 Installation Checklist

- [ ] Configure Firebase in `firebase-config.js`
- [ ] Add `<script type="module">` imports to HTML
- [ ] Import functions in `script.js`
- [ ] Update `createPromptCard()` function
- [ ] Update `openModal()` function
- [ ] Add modal like button handler
- [ ] Update `init()` to initialize Firestore
- [ ] Add CSS styling for like button
- [ ] Set Firestore Security Rules
- [ ] Test all functionality

---

## 📱 Client-Side Only

**Important:** This implementation is entirely client-side. There's:
- ✅ No backend server needed
- ✅ No API endpoints to build
- ✅ No database migrations
- ✅ Just Firebase Firestore

Everything is handled by:
1. **firebase-config.js** - Configuration
2. **firestore-service.js** - Database operations
3. **Updated script.js** - UI integration

---

## 🧪 Testing

### Test View Increment

```javascript
// In browser console
await recordPromptView('p01');
const metrics = await getPromptMetrics('p01');
console.log(metrics.views);  // Should be 1 higher
```

### Test Like Toggle

```javascript
// In browser console (when logged in)
const result = await togglePromptLike('p01');
console.log(result.liked);    // Should be true
console.log(result.message);  // "Like added"

// Click again
const result2 = await togglePromptLike('p01');
console.log(result2.liked);   // Should be false
```

### Test Real-time Listener

```javascript
// Open console in 2 browser windows
// Window 1:
const unsub = listenToPromptMetrics('p01', (metrics) => {
  console.log(`Updates: Views=${metrics.views}, Likes=${metrics.likes}`);
});

// Window 2:
await recordPromptView('p01');

// In Window 1, you should immediately see the update logged
```

---

## 📈 Data Flow

```
User Action
    ↓
Call Firebase Function (togglePromptLike, recordPromptView)
    ↓
Update Firestore Document (atomic increment)
    ↓
Real-time Listener Fires
    ↓
UI Updates (card metrics, button state)
    ↓
All visible clients see update ✨
```

---

## 💡 Performance Considerations

1. **Listeners only on visible cards** - Don't listen to cards below the fold
2. **Unsubscribe when done** - Clean up listeners in modal close
3. **Batch operations** - Use transactions for complex operations
4. **Cache metrics locally** - Reduce Firestore reads during card creation
5. **Real-time at cost** - Each listener = one active connection (Firestore limit: 100,000 per database)

---

## 🔗 Integration Points in script.js

### 1. Card Creation
- Get metrics from Firestore
- Set up real-time listener
- Attach like button handler

### 2. Modal Open
- Record view (increment)
- Fetch fresh metrics
- Set up real-time listener
- Update like button state

### 3. Modal Close
- Unsubscribe from listeners
- Clean up event handlers

### 4. Like Button Click
- Check authentication
- Call togglePromptLike
- Update UI
- Show toast message

---

## 🎨 UI States

### Like Button States

```
Default (Not Liked):
<i class="fa-regular fa-heart"></i>  ← Outline heart
Background: Transparent

Liked:
<i class="fa-solid fa-heart"></i>    ← Solid heart
Color: #ef4444 (Red)

Hover:
Color: #f5a6a6 (Light red)
```

### View/Like Display

```
Card:
👁 12 views
❤️ 3 likes

Modal:
👁 12 views
❤️ 3 likes
```

---

## 🆘 Troubleshooting

### Views not incrementing
- Check `recordPromptView()` is called
- Verify Firestore rules allow writes
- Check browser console for Firebase errors

### Likes not toggling
- Ensure user is logged in (`currentUser` check)
- Verify likes collection has write permissions
- Check document ID format: `{userId}_{promptId}`

### Real-time updates not working
- Confirm listeners are set up with `listenToPromptMetrics()`
- Check card HTML selectors match your structure
- Ensure listener isn't unsubscribed prematurely

### Permission denied errors
- Check Firestore Security Rules
- Verify user is authenticated
- Check Firebase Console for rule violations

---

## 📚 Related Documentation

- Firebase Official Docs: https://firebase.google.com/docs/firestore
- Real-time Updates: https://firebase.google.com/docs/firestore/query-data/listen
- Security Rules: https://firebase.google.com/docs/firestore/security/get-started
- Atomic Operations: https://firebase.google.com/docs/firestore/manage-data/add-data#increment

---

## ✅ Implementation Complete!

Your Firebase Firestore Views & Likes system is ready to integrate.

**Next Steps:**
1. Read `FIREBASE_INTEGRATION_GUIDE.md`
2. Update `script.js` following the guide
3. Configure Firebase in `firebase-config.js`
4. Test each feature
5. Deploy and monitor Firestore usage

---

**Questions?** Check the guide, console errors, and Firestore Security Rules first. 🚀
