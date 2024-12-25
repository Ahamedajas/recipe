"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image"; // Import Image from next/image for optimization

interface Recipe {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
}

export default function RecipePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.meals || []);
      })
      .catch(() => {
        console.error("Error fetching data.");
        setMessage("Failed to load recipes.");
        setTimeout(() => setMessage(""), 3000);
      });
  }, []);

  const addToFavorites = async (recipe: Recipe) => {
    try {
      await axios.post("/api/favorites", {
        recipeId: recipe.idMeal,
        recipeName: recipe.strMeal,
        imageUrl: recipe.strMealThumb,
      });
      setMessage(`${recipe.strMeal} has been added to favorites!`);
      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessage("Failed to add recipe to favorites.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <main className="min-h-screen p-10 bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-10 text-center">Recipe List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="border border-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-900 transition"
            >
              <Link href={`/recipe/${recipe.idMeal}`}>
                {/* Replaced img with Image for optimization */}
                <Image
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  width={500}  // Specify width for optimization
                  height={350} // Specify height for optimization
                  className="w-full h-48 object-cover rounded-lg"
                />
              </Link>
              <h2 className="text-3xl mt-4">{recipe.strMeal}</h2>
              <p className="text-sm text-gray-400 mt-2">
                {recipe.strInstructions.substring(0, 100)}...
              </p>
              <button
                onClick={() => addToFavorites(recipe)}
                className="mt-4 bg-yellow-500 text-white p-4 rounded-full hover:bg-yellow-600"
                aria-label="Add to favorites"
              >
                <StarIcon
                  className="w-8 h-8 text-gray-400 hover:text-yellow-500"
                />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center col-span-3 text-lg text-gray-400">
            No recipes available.
          </div>
        )}
      </div>

      {message && (
        <div className="mt-4 p-4 bg-green-500 text-white rounded-lg">
          {message}
        </div>
      )}
    </main>
  );
}
