# 📝 NodeJs Blog Project

A full-featured multi-user blog application built using **Node.js**, **Express.js**, **MongoDB**, **EJS**, and **JWT Authentication**.  
This project includes secure authentication, role-based access control, article management, cookie-based sessions, and a stylish responsive UI.

🔗 GitHub Repository:  
https://github.com/brij018/NodeJs-Blog-Project

---

# 🚀 Features

- 🔐 User Registration & Login
- 🍪 JWT Authentication with Cookies
- 👤 Role-Based Access Control (Admin/User)
- 🔒 Password Hashing using bcrypt
- ✍️ Create, Edit, Delete Articles
- 📄 View All Articles
- 🧑 User-Specific Articles Page
- 🎨 Stylish Responsive UI using EJS & CSS
- 🧭 Navigation Bar with Authentication Links
- 🛡️ Protected Routes using Middleware
- 🚪 Logout Functionality
- 🗄️ MongoDB Database Integration

---

# 🛠️ Tech Stack

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Frontend
- EJS
- CSS

## Authentication & Security
- JSON Web Token (JWT)
- bcryptjs
- cookie-parser

---

# 📁 Project Structure

```bash
NodeJs-Blog-Project/
│
├── controllers/
├── middleware/
├── models/
├── public/
│   └── css/
├── routes/
├── views/
│   ├── partials/
│   │   └── navbar.ejs
│   ├── articleList.ejs
│   ├── myArticles.ejs
│   ├── articleForm.ejs
│   ├── articleItem.ejs
│   ├── login.ejs
│   └── register.ejs
│
├── server.js
├── package.json
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/brij018/NodeJs-Blog-Project.git
```

## 2️⃣ Navigate to Project Folder

```bash
cd NodeJs-Blog-Project
```

## 3️⃣ Install Dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# ▶️ Run the Project

## Development Mode

```bash
npm run dev
```

## Production Mode

```bash
npm start
```

---

# 🔐 Authentication Flow

1. User registers an account
2. Password is hashed using bcrypt
3. JWT token generated after login
4. Token stored in browser cookies
5. Middleware verifies token on protected routes
6. User data extracted from JWT payload

---

# 🌐 Available Routes

| Route | Description |
|------|-------------|
| `/` | View All Articles |
| `/login` | Login Page |
| `/register` | Register Page |
| `/articles/new` | Create New Article |
| `/my-articles` | View Logged-in User Articles |
| `/logout` | Logout User |

---

# 📦 Main Dependencies

```bash
express
ejs
mongoose
jsonwebtoken
bcryptjs
cookie-parser
dotenv
nodemon
```

---

# 🎨 UI Features

- Responsive Layout
- Stylish Blog Theme
- Clean Typography
- Custom CSS Styling
- Mobile-Friendly Design
- Dynamic Navigation Bar

---

# 📌 Future Improvements

- 💬 Comments System
- 🖼️ Image Upload Support
- 🔎 Search Functionality
- 📚 Pagination
- ❤️ Like & Bookmark System
- 📊 Admin Dashboard

---

# 👨‍💻 Author

**Brij**

GitHub:  
https://github.com/brij018

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.

---

Screenshots:
-LogIn
<img width="1913" height="966" alt="image" src="https://github.com/user-attachments/assets/de7a7f69-ba8b-4e64-9e3e-fe46d540ffe7" />

-articles
<img width="1919" height="917" alt="image" src="https://github.com/user-attachments/assets/dc41d83a-ea31-49f2-b606-9bf24bb08731" />

-MyArticle
<img width="1919" height="915" alt="image" src="https://github.com/user-attachments/assets/8447dec1-1386-4310-92f6-0a5ba9189195" />

-NewArticle
<img width="1919" height="915" alt="image" src="https://github.com/user-attachments/assets/8d3c221d-f720-48c0-a82b-f07e579f5b7e" />


---

# 📜 License

This project is licensed under the MIT License.﻿
