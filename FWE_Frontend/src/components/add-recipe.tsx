import * as model from "./../model";
import { MODAL_CLOSE_SEC } from "./../config";
import React, { useState } from "react";

const AddRecipe: React.FC<{ updateResult: any }> = ({ updateResult }) => {
  const [isHidden, setIsHidden] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const toggleWindow = () => {
    setIsHidden(!isHidden);
  };

  const handleRecipeUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const dataArr = [...new FormData(formElement)];
    const newRecipe = Object.fromEntries(dataArr);
    try {
      await model.uploadRecipe(newRecipe);
      setErrorMessage("Recipe successful uploaded");
      await model.loadAll();

      const id =
        model.state.search.results.at(model.state.search.results.length - 1)
          ?.id || null;
      if (id) window.location.hash = id;

      updateResult(model.state.search.results);
      setTimeout(() => {
        toggleWindow();
        setErrorMessage("");
      }, MODAL_CLOSE_SEC * 1000);
    } catch (err: any) {
      console.error("💥", err);
      setErrorMessage("use the correct format");
    }
  };
  const addHandlerShowWindow = () => {
    const btnOpen = document.querySelector(".nav_btn.nav_btn_add_recipe");
    if (btnOpen) {
      btnOpen.addEventListener("click", toggleWindow);
    }
  };

  const addHandlerHideWindow = () => {
    const btnClose = document.querySelector(".btn--close-modal");
    const overlay = document.querySelector(".overlay");
    if (btnClose && overlay) {
      btnClose.addEventListener("click", toggleWindow);
      overlay.addEventListener("click", toggleWindow);
    }
  };

  React.useEffect(() => {
    addHandlerShowWindow();
    addHandlerHideWindow();
  }, [toggleWindow]);
  return (
    <div className={`add-recipe-window ${isHidden ? "hidden" : ""}`}>
      {errorMessage && (
        <div className="error">
          <p className="errorMsg">{errorMessage}</p>
        </div>
      )}
      <button className="btn--close-modal">&times;</button>
      <form className="upload" onSubmit={handleRecipeUpload}>
        <div className="upload_column">
          <label>Recipe Name</label>
          <input required name="name" type="text" />
          <label>Recipe Description</label>
          <input required name="description" type="text" />
          <label>Recipe Image URL</label>
          <input required name="pictureLink" type="text" />
          <label>Recipe Ratings</label>
          <input required name="ratings" type="number" />
        </div>

        <div className="upload_column">
          <label>Ingredient 1</label>
          <input
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Name;Description;Link'"
          />
          <label>Ingredient 2</label>
          <input
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Name;Description;Link'"
          />
          <label>Ingredient 3</label>
          <input
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Name;Description;Link'"
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Name;Description;Link'"
          />
        </div>
        <div className="upload_column">
          <label>Cooking step 1</label>
          <input type="text" required name="cookingStep-1" placeholder="text" />
          <label>Cooking step 2</label>
          <input type="text" name="cookingStep-2" placeholder="text" />
          <label>Cooking step 3</label>
          <input type="text" name="cookingStep-3" placeholder="text" />
          <label>Cooking step 4</label>
          <input type="text" name="cookingStep-4" placeholder="text" />
        </div>

        <button type="submit" className="btn upload_btn">
          <span>Upload</span>
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
