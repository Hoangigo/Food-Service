import React, { useState, useEffect } from "react";
import "./styles/App.css";
import "./styles/Header.css";
import "./styles/Component.css";
import "./styles/preview.css";
import "./styles/Recipe.css";
import "./styles/upload.css";
import { Recipe } from "./model";
import Header from "./components/header";
import SearchResult from "./components/search-result";
import RecipeView from "./components/recipes";
import AddRecipe from "./components/add-recipe";
import Overlay from "./components/overlay";
function App() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [result, setResult] = useState<Recipe[] | null>(null);

  return (
    <div>
      <div className="container">
        <Header />
        <SearchResult data={result} />
        <RecipeView recipe={recipe} updateResult={setResult} />
      </div>
      <Overlay />
      <AddRecipe updateResult={setResult} />
    </div>
  );
}

export default App;
