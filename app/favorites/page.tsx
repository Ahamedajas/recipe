"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Favorite {
  recipeId: string;
  recipeName: string;
  imageUrl: string;
}

export default function FavoritesPage(): JSX.Element {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [message, setMessage] = useState<string>("");

  // Ensure async code in useEffect has a return type of Promise<void>
  useEffect(() => {
    const fetchFavorites = async (): Promise<void> => {
      try {
        const res = await fetch("/api/favorites");
        const data = await res.json();
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  const removeFromFavorites = async (recipeId: string): Promise<void> => {
    try {
      await axios.delete("/api/favorites", {
        data: { recipeId },
      });
      setFavorites(favorites.filter((fav) => fav.recipeId !== recipeId));
      setMessage("Recipe removed from favorites!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error: any) {
      setMessage("Failed to remove recipe from favorites.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <main className="min-h-screen p-10 bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-10 text-center">Your Favorite Recipes</h1>

      {message && (
        <div className="mt-4 p-4 bg-green-500 text-white rounded-lg">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {favorites.length > 0 ? (
          favorites.map((fav) => (
            <div
              key={fav.recipeId}
              className="border p-6 rounded-lg shadow-lg"
            >
              <img
                src={fav.imageUrl}
                alt={fav.recipeName}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="text-3xl mt-4">{fav.recipeName}</h2>
              <button
                onClick={() => removeFromFavorites(fav.recipeId)}
                className="mt-4 bg-red-500 text-white p-4 rounded-full hover:bg-red-600"
                aria-label="Remove from favorites"
              >
                Remove from Favorites
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">No favorites yet!</p>
        )}
      </div>
    </main>
  );
}
