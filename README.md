# 🧽 EraseMateAI - AI Powered Background Remover

![EraseMateAI Banner](https://github.com/Saquib-Anjum/EraseMate-AI/blob/main/result/image.png) <!-- Optional: Replace with actual banner or logo -->

EraseMateAI is a blazing-fast, AI-powered background remover that helps users instantly erase backgrounds from images using the **Clipdrop API**. No complicated tools — just upload your image and get a clean result! 🪄

🧾 Users can purchase credits using **Razorpay** to download high-resolution results, and authentication is securely handled by **Clerk**.

---

## 🚀 Features

- 🎯 **AI Background Removal** with Clipdrop API
- 🔐 **User Authentication** using Clerk
- 💳 **Secure Payments** via Razorpay
- 📦 **Credit-Based System** to manage downloads
- 🌐 **Full Stack MERN Application**
- 🖼️ **Clean UI** with responsive design
- ⏱️ Fast results with minimal latency

---

## 🛠️ Tech Stack

- **Frontend**: React.js, TailwindCSS (optional)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Auth**: Clerk
- **Payments**: Razorpay
- **AI API**: Clipdrop API
- **Hosting**: Vercel / Render / Railway / Your choice

---



## 🧑‍💻 How It Works

1. 🔐 Sign up or log in via Clerk
2. 🖼️ Upload your image
3. 🤖 Our AI removes the background instantly
4. 💳 Purchase credits via Razorpay
5. ⬇️ Download high-quality, background-free images

---

## 🧰 Getting Started (Local Setup)

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/erasemateai.git
cd erasemateai

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env

# 4. Run the app
npm run dev
---


```

### 🗝️ env setup
```bash
CLIPDROP_API_KEY=your_clipdrop_key
CLERK_SECRET_KEY=your_clerk_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
MONGO_URI=your_mongodb_uri

```
## 🗂️ Project Structure
```bash
/client     -> React frontend
/server     -> Node + Express backend
.env.example
README.md

```


