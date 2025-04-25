

---

# 🛡️ Login Microservice

This microservice handles user authentication and authorization for the **Ordering System**. It is designed to work independently and integrate seamlessly with other services such as Ordering, Inventory, and Payment.

---

## 🚀 Features

- User registration with validation
- Secure login with token-based authentication (JWT)
- Password hashing
- Role-based access control (if applicable)
- Session handling / stateless auth (depending on implementation)
- JSON-based API responses

---

## 🧰 Tech Stack

- **Backend**: Node.js / Express *(or your backend tech)*
- **Authentication**: JWT (JSON Web Token)
- **Database**: MongoDB / PostgreSQL *(or your DB)*
- **Security**: bcrypt, dotenv

---

## 📁 Folder Structure

```
login-service/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── .env
├── server.js
└── README.md
```

---

## 🔐 API Endpoints

### POST `/api/auth/register`
Registers a new user.
- **Body Parameters**: `name`, `email`, `password`
- **Response**: JSON message and JWT token

### POST `/api/auth/login`
Authenticates a user.
- **Body Parameters**: `email`, `password`
- **Response**: JWT token and user info

### GET `/api/auth/profile` *(Protected)*
Returns authenticated user’s profile.
- **Headers**: `Authorization: Bearer <token>`

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/login-microservice.git

# Navigate into the project
cd login-microservice

# Install dependencies
npm install

# Create a .env file based on .env.example
touch .env
```

---

## 🧪 Run Locally

```bash
# Start the development server
npm run dev
```

---

## 🛠️ Environment Variables

Create a `.env` file with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 📦 Integration with Other Services

This microservice is part of the **Ordering Microservices System**. Other services should use the authentication token returned by this service to access protected resources.

---

## 🧑‍💻 Contributing

Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you’d like to change.

---

## 📄 License

MIT License © 2025 [Your Name]

---

Want help adapting this for a specific tech stack (like Django, Flask, Spring Boot, etc.) or including Docker support? Let me know!
