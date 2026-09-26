import { useEffect, useState } from "react";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import miorLogo from "./assets/miorecipes.png";

const backend = `https://recipe-backend-production-0156.up.railway.app/`;
const API = {
  recipes: `${backend}recipes`,
  recipeById: `${backend}recipes/1`,
  createRecipe: `${backend}recipes`,
  users: `${backend}users`,
  createUser: `${backend}users`,
  categories: `${backend}categories`,
};

function Recipes({ recipes }) {
  return (
    <section className="card-section">
      <h2>Recipes</h2>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <article key={recipe.id} className="recipe-card">
            <h3>{recipe.name}</h3>
            <p className="recipe-text">
              <strong>Ingredients:</strong> {recipe.ingredients}
            </p>
            <p className="recipe-text">
              <strong>Instructions:</strong> {recipe.instructions}
            </p>
            <small className="recipe-meta">
              Author: <span>{recipe.author}</span> | Category:{" "}
              <span>{recipe.category}</span>
            </small>
          </article>
        ))}
      </div>
    </section>
  );
}

function AddRecipe({ onRecipeAdded, users, categories }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [selectedChefValue, setSelectedChefValue] = useState("");
  const [selectedCategoryValue, setSelectedCategoryValue] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    await fetch(API.createRecipe, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        ingredients,
        instructions,
        username: selectedChefValue,
        categoryname: selectedCategoryValue,
      }),
    });
    onRecipeAdded();
    setName("");
    setIngredients("");
    setInstructions("");
    setSelectedChefValue("");
    setSelectedCategoryValue("");
    toast.success("Recipe successfully added!");
    // alert("Recipe added!");
  }

  const handleDropdownChefChange = (event) => {
    setSelectedChefValue(event.target.value);
  };

  const handleDropdownCategoryChange = (event) => {
    setSelectedCategoryValue(event.target.value);
  };

  return (
    <section className="form-section">
      <h2>Add Recipe</h2>
      <form onSubmit={handleSubmit} className="styled-form">
        <input
          placeholder="Recipe name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <textarea
          placeholder="Ingredients"
          value={ingredients}
          onChange={(event) => setIngredients(event.target.value)}
        />
        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(event) => setInstructions(event.target.value)}
        />
        <select
          id="api-select-chef"
          value={selectedChefValue}
          onChange={handleDropdownChefChange}
        >
          <option key="chef_title" value="">
            -- Please select a chef --
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>
        <select
          id="api-select-categories"
          value={selectedCategoryValue}
          onChange={handleDropdownCategoryChange}
        >
          <option key="cat_title" value="">
            -- Please select a category --
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit" className="btn-primary">
          Add Recipe
        </button>
      </form>
    </section>
  );
}

function Users({ users }) {
  return (
    <section className="card-section">
      <h2>Chefs</h2>
      <div className="list-grid">
        {users.map((user) => (
          <div key={user.id} className="list-item">
            <strong>{user.username}</strong>
            <span className="subtext">{user.email}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function AddUser({ onUserAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    await fetch(API.createUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
        email,
      }),
    });
    onUserAdded();
    setName("");
    setEmail("");
    // alert("User added!");
    toast.success("User successfully added!");
  }

  return (
    <section className="form-section">
      <h2>Add Chef</h2>
      <form onSubmit={handleSubmit} className="styled-form">
        <input
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit" className="btn-primary">
          Add Chef
        </button>
      </form>
    </section>
  );
}

function Categories({ categories }) {
  return (
    <section className="card-section">
      <h2>Categories</h2>
      <div className="tag-cloud">
        {categories.map((category) => (
          <span key={category.id} className="tag">
            {category.name}
          </span>
        ))}
      </div>
    </section>
  );
}

function App() {
  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(API.categories)
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  const fetchRecipes = () => {
    fetch(API.recipes)
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  };

  const fetchUsers = () => {
    fetch(API.users)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  };

  useEffect(() => {
    fetchRecipes();
    fetchUsers();
  }, []);

  return (
    <main className="app-container">
      <div>
        <Toaster />
      </div>
      <header className="app-header">
        <div>
          <h1>MioRecipes</h1>
          <img src={miorLogo} alt="miorecipes logo" />
        </div>
        <p>A simple recipe collection.</p>
      </header>

      <div className="app-layout">
        <div className="main-content">
          <Recipes recipes={recipes} />
        </div>
        <aside className="sidebar">
          <AddRecipe
            onRecipeAdded={fetchRecipes}
            users={users}
            categories={categories}
          />
          <AddUser onUserAdded={fetchUsers} />
          <Users users={users} />
          <Categories categories={categories} />
        </aside>
      </div>
    </main>
  );
}

export default App;
