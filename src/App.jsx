import { useEffect, useState } from "react";

// Replace these URLs with your own API endpoints
const API = {
  recipes: "http://localhost:3000/recipes",
  recipeById: "http://localhost:3000/recipes/1",
  createRecipe: "http://localhost:3000/recipes",

  users: "http://localhost:3000/users",
  createUser: "http://localhost:3000/users",

  categories: "http://localhost:3000/categories",
};

function Recipes({ recipes }) {
  return (
    <section>
      <h2>Recipes</h2>

      {recipes.map((recipe) => (
        <article key={recipe.id}>
          <h3>{recipe.name}</h3>
          <p>{recipe.ingredients}</p>
          <p>{recipe.instructions}</p>
          <small>
            Author: {recipe.author} | Category: {recipe.category}
          </small>
        </article>
      ))}
    </section>
  );
}

function AddRecipe({ onRecipeAdded, users, categories }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  // const [chefs, setChefs] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [selectedChefValue, setSelectedChefValue] = useState("");
  const [selectedCategoryValue, setSelectedCategoryValue] = useState("");

  // useEffect(() => {
  //   fetch(API.users)
  //     .then((response) => response.json())
  //     .then((data) => setChefs(data));
  // }, []);

  // useEffect(() => {
  //   fetch(API.categories)
  //     .then((response) => response.json())
  //     .then((data) => setCategories(data));
  // }, []);

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

    alert("Recipe added!");
  }

  const handleDropdownChefChange = (event) => {
    setSelectedChefValue(event.target.value);
  };

  const handleDropdownCategoryChange = (event) => {
    setSelectedCategoryValue(event.target.value);
  };

  return (
    <section>
      <h2>Add Recipe</h2>

      <form onSubmit={handleSubmit}>
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
          {/* Placeholder choice */}
          <option key={"chef_title"} value="">
            -- Please select a chef --
          </option>

          {/* 6. Map through options to build the dropdown dynamically */}
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
          {/* Placeholder choice */}
          <option key={"cat_title"} value="">
            -- Please select a category --
          </option>
          {console.log(categories)}

          {/* 6. Map through options to build the dropdown dynamically */}
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <button type="submit">Add Recipe</button>
      </form>
    </section>
  );
}

function Users({ users }) {
  return (
    <section>
      <h2>Users</h2>

      {users.map((user) => (
        <p key={user.id}>
          {user.username} - {user.email}
          {/* {user.username} */}
        </p>
      ))}
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

    alert("User added!");
  }

  return (
    <section>
      <h2>Add User</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <button type="submit">Add User</button>
      </form>
    </section>
  );
}

function Categories({ categories }) {
  return (
    <section>
      <h2>Categories</h2>

      {categories.map((category) => (
        <p key={category.id}>{category.name}</p>
      ))}
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
    <main>
      <h1>KitchenBase</h1>
      <p>A simple recipe collection.</p>

      <Recipes recipes={recipes} />
      <AddRecipe
        onRecipeAdded={fetchRecipes}
        users={users}
        categories={categories}
      />

      <Users users={users} />
      <AddUser onUserAdded={fetchUsers} />

      <Categories categories={categories} />
    </main>
  );
}

export default App;
