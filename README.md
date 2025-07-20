# Blog App API 📝🚀

A full-featured RESTful API built using **Node.js, Express, MySQL (Sequelize)**, and **JWT authentication**.  
This project enables users to create blogs, share posts (text, image, or video), and interact via comments – all with access control, soft deletion, and pagination.

## 🌟 Features

✅ User authentication (JWT)  
✅ Create, update, and delete blogs  
✅ Add and manage posts (text/image/video)  
✅ Add and manage comments  
✅ Role-based authorization (User/Admin)  
✅ Middleware for verifying owners (blog, post, comment)  
✅ Soft delete support  
✅ Pagination and search  
✅ File uploads via multer  
✅ Sequelize ORM with validations  
✅ MVC architecture  
✅ .env support for configuration

---

## ⚙️ Tech Stack

- **Node.js** + **Express**
- **Sequelize ORM** + **MySQL**
- **JWT** for auth
- **bcrypt**, **helmet**, **multer**
- **Postman** Collection for testing
- Organized via **MVC** pattern

---

## 📦 Coming Enhancements

- ⛅ Store media files on **Cloudinary / AWS S3**
- 🧪 Add **unit testing** and **API testing** (Jest / Supertest)
- 🌐 Upload live version using **Render / Railway**
- 📊 Admin dashboard & analytics
- 🔍 Full-text search & filter by tags/categories

---

## 📂 How to Run Locally

```bash
git clone https://github.com/Mohamedawad114/Blog-App-api.git
cd Blog-App-api
npm install
cp .env.example .env  # Then edit the DB credentials
npm start
