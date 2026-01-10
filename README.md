# Real-Time Chat Application - Frontend

A modern React frontend for real-time chat built with Vite, Tailwind CSS, and Socket.io. Features responsive design, live messaging, and drag-and-drop media uploads.

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=flat-square&logo=tailwind-css)
![Socket.io](https://img.shields.io/badge/Socket.io-4.8-010101?style=flat-square&logo=socket.io)

---

## Features

- **Real-Time Messaging** - Instant updates with Socket.io
- **Responsive Design** - Works on desktop and mobile
- **Live Status** - Online indicators and typing animations
- **Media Uploads** - Drag-and-drop or click to upload images
- **State Management** - Centralized Zustand store
- **Friend System** - Search users with status indicators (Friend/Sent/Pending)
- **Group Chats** - Create groups with multi-select modal
- **Toast Notifications** - New message and request alerts

---

## Tech Stack

**Framework:** React 19.2 (Vite 7.2)  
**Styling:** Tailwind CSS 4.1  
**State:** Zustand 5.0  
**HTTP:** Axios 1.13  
**WebSockets:** Socket.io-client 4.8  
**Routing:** React Router 7.10  
**Icons:** Lucide React  
**Date Utils:** date-fns 4.1

---

## Getting Started

### Prerequisites

- Node.js 16 or higher
- Backend server running on port 4000

### Installation

1. Navigate to frontend and install

   ```bash
   cd chat-app-frontend
   npm install
   ```

2. Set up environment variables - create `.env`:

   ```env
   VITE_BASE_URL=http://localhost:4000
   ```

3. Run the dev server

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173)

---

## Environment Variables

| Variable        | Description     | Required |
| --------------- | --------------- | -------- |
| `VITE_BASE_URL` | Backend API URL | Yes      |

---

## Project Structure

```
chat-app-frontend/
├── node_modules/
├── public/
├── src/
│   ├── components/      # React components
│   ├── lib/                # Utilities and helpers
│   ├── pages/              # Page components
│   ├── store/              # Zustand stores
│   ├── App.css             # Global styles
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── .env                    # Environment variables
├── .gitignore
├── eslint.config.js
├── index.html           # HTML template
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js       # Vite configuration
```

---

## Scripts

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

---

## Key Features

### Real-Time Updates

- Messages appear instantly without refresh
- Typing indicators show when someone is typing
- Green dots indicate online users

### Media Handling

- Drag and drop images into chat
- Click to select files from device
- Profile picture upload and preview

### User Search

- Search for users to add as friends
- Status badges show relationship (Friend/Sent/Pending)
- Send friend requests with one click

### Group Creation

- Multi-select modal for choosing members
- Name your group
- See all members in group chat

---

## Roadmap

- [ ] Voice messages
- [ ] Video calls
- [ ] Message reactions
- [ ] Dark mode toggle
- [ ] Message search
- [ ] File attachments (PDF, docs)
- [ ] Read receipts
- [ ] Message forwarding
- [ ] User blocking

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

1. Fork the repo
2. Create your branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## License

MIT License

---

## Author

**Satyam Sharma**

[![GitHub](https://img.shields.io/badge/GitHub-Shasatya-100000?style=flat-square&logo=github)](https://github.com/Shasatya)

---

**Star this repo if you found it helpful!**
