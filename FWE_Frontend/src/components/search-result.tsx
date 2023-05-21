import PreviewView from "./preview";
import React, { useEffect, useState } from "react";
import { Recipe } from "../model";
import SearchView from "../views/SearchView";
import * as model from "./../model";
const ResultsView: React.FC<{ data: Recipe[] | null }> = ({
  data: initialData,
}) => {
  const [data, setData] = useState<Recipe[] | null>(initialData);
  const [errorMessage, setErrorMessage] = useState<string>("");
  useEffect(() => {
    setData(initialData);
  }, [initialData]);
  useEffect(() => {
    const controlSearchResults = async () => {
      try {
        // 1) Get search query
        const searchView = new SearchView();
        const query = searchView.getQuery();
        if (!query || query === "") {
          await model.loadAll();
        } else {
          await model.loadSearchResults(query);
        }
        // 3) Render results
        const results = model.state.search.results;
        if (results.length === 0) {
          // Render error message
          setErrorMessage("Recipe not found");
          setData([]);
        } else {
          // 3) Render results
          setData([...results]);
          setErrorMessage("");
        }
      } catch (err) {
        console.log(err);
      }
    };
    const tempSearchView = new SearchView();

    tempSearchView.addHandlerSearch(controlSearchResults);
  }, []);
  if (data === null || data.length === 0)
    return (
      <div className="results">
        {errorMessage && (
          <div className="error">
            <p className="errorMsg">{errorMessage}</p>
          </div>
        )}
      </div>
    );
  return (
    <div className="results">
      {data.map((result: Recipe) => (
        <PreviewView key={result.id} data={result} />
      ))}
    </div>
  );
};

export default ResultsView;
