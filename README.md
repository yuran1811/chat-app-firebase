<h1 align="center">Chatie</h1>
<p align="center" style="font-size:16px"><strong>Free, easy-to-use Chat App!</strong></p>
<p align="center">  
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/palette/macchiato.png" width="400" />
</p>

## Features

- Sign in with Google, Facebook
- Create conversations (personally, group)
- Allow sending
  - Text
  - Image
  - File
  - Stickers (from zalo)
  - Gif (from giph
  - Emoji (emoji-mart)
- Show if user has seen message
- Drop file to upload
- Paste image from clipboard
- Send reactions to message (like, love, care, haha, wow, sad, angry)
- Unsent message
- Reply message
- Change conversation settings
  - Change group theme, image
  - Change theme
- View conversation images, files
- Detect link an add an anchor to it

## Tech Stack

<img src="https://skill-icons-livid.vercel.app/icons?i=react,ts,tailwind,vite&gap=60" height="36" />

- Firebase
- zustand

## Screenshots

<div style="display:flex;gap:12px;justify-content:center">
	<img src="" style="width:45%;max-width:380px">
	<img src="" style="width:45%;max-width:380px">
</div>

## Quick Start

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/yuran1811/Chatie.git
cd Chatie
```

**Installation**

Install the project dependencies:

```bash
npm install
```

or

```bash
yarn
```

**Prepare for running**

```bash
cp .env.example .env
```

- Create your own firebase project
  - Enable auth (google, facebook)
  - Enable cloud firestore
  - Enable firebase storage
- Create your own giphy developer account
- Example .env file:

```env
VITE_FIREBASE_CONFIG={"apiKey":"","authDomain":"","projectId":"","storageBucket":"","messagingSenderId":"","appId":""}
VITE_GIPHY_API_KEY=your_api_key
```

**Running the Project**

```bash
npm run dev
```

or

```bash
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.

## References

- This project has been under my maintenance since its origin from [this repo](https://github.com/napthedev/fireverse)
