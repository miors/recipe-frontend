# 🍳 MioRecipes

**MioRecipes** is a sleek, modern web platform designed to showcase curated recipes from top chefs around the world. It provides users with an intuitive interface to discover culinary creations, explore categorized dishes, and learn about the chefs behind them.

The project follows a decoupling architecture using a high-performance **React** frontend connected to a robust **PostgreSQL** database, orchestrated by an **Express/Node.js** REST API gateway.

---

## 🚀 Live Deployments

- 🌐 **Frontend Application:** [MioRecipes Web Client](https://recipe-backend-production-0156.up.railway.app/)
- ⚙️ **Backend API Gateway & Documentation:** [MioRecipes API Reference](https://recipe-backend-production-0156.up.railway.app/)

---

## 🛠️ Tech Stack

| Layer                | Technology           | Purpose                                                        |
| :------------------- | :------------------- | :------------------------------------------------------------- |
| **Frontend**         | React                | Component-based, responsive user interface                     |
| **Middleware / API** | Express.js & Node.js | RESTful API gateway handling requests & routing                |
| **Database**         | PostgreSQL           | Relational data persistence for recipes, categories, and chefs |
| **Hosting**          | Railway              | Cloud infrastructure and continuous deployment                 |

---

## 📡 API Features & Endpoints

The Express backend acts as the data middleman, exposing standard RESTful endpoints for consumption. Below are the available operations:

### 📖 Recipes

- `GET` `/recipes` — View all recipes across the platform
- `GET` `/recipes/:id` — Retrieve comprehensive details for a single recipe by its unique ID
- `POST` `/recipes` — Add a new recipe into the system
- `DELETE` `/recipes/:id` — Remove a recipe permanently from the database

### 👨‍🍳 Chefs

- `GET` `/users` — View a directory of all registered chefs
- `POST` `/users` — Register a new chef profile

### 📂 Categories

- `GET` `/categories` — Fetch all recipe categories (e.g., Appetizers, Desserts, Vegan)

---

## 📦 Local Installation & Setup

To clone and run this application locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org) (v16+ recommended)
- [PostgreSQL](https://postgresql.org) database instance

### 1. Clone the Repository

```bash
frontend: git clone https://github.com/miors/recipe-frontend
backend: https://github.com/miors/recipe-backend
cd into directory
```

### 2. Configure the Backend

1. Navigate to your backend directory.
2. Create a `.env` file and populate your connection credentials:
   ```env
   PORT=5000
   DATABASE_URL=postgres://username:password@localhost:5432/miorecipes
   ```
3. Install dependencies and start the local API server:
   ```bash
   npm install
   npm run dev
   ```

### 3. Configure the Frontend

1. Navigate to your frontend directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Boot up the React development server:
   ```bash
   npm start
   ```

---

## 📝 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
