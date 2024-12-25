"use client";

import { MagnifyingGlassIcon, BookmarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-blue-900 text-white flex flex-col justify-center items-center p-10">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold mb-6 text-white">
          Perfect Recipe Platform for Food Lovers
        </h1>

        <p className="text-xl mb-10 text-gray-200">
          Explore a wide variety of recipes, save your favorites, and cook your favorite dishes with ease.
        </p>

        <div className="space-x-6 mb-10">
          <Link 
            href="/recipe"
            className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-xl text-lg font-semibold transition duration-300 transform hover:scale-105"
            aria-label="Explore Recipes"
          >
            Explore Recipes
          </Link>

          <Link 
            href="/favorites"
            className="bg-white text-blue-900 hover:bg-blue-100 px-8 py-4 rounded-xl text-lg font-semibold transition duration-300 transform hover:scale-105"
            aria-label="View Favorite Recipes"
          >
            View Favorites
          </Link>
        </div>

        <section className="bg-white text-blue-900 p-10 rounded-lg shadow-lg my-10">
          <h2 className="text-3xl font-bold mb-4 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <MagnifyingGlassIcon className="w-32 h-32 mb-4 text-blue-900" />
              <h3 className="text-2xl font-semibold">Browse Recipes</h3>
              <p className="text-gray-600 mt-2">Discover new and exciting dishes from a variety of cuisines.</p>
            </div>

            <div className="flex flex-col items-center">
              <BookmarkIcon className="w-32 h-32 mb-4 text-blue-900" />
              <h3 className="text-2xl font-semibold">Save Favorites</h3>
              <p className="text-gray-600 mt-2">Bookmark your favorite meals and access them anytime.</p>
            </div>

            <div className="flex flex-col items-center">
              <CheckCircleIcon className="w-32 h-32 mb-4 text-blue-900" />
              <h3 className="text-2xl font-semibold">Cook with Ease</h3>
              <p className="text-gray-600 mt-2">Follow easy-to-understand recipes and make the perfect dish.</p>
            </div>
          </div>
        </section>

        <section className="bg-blue-600 text-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">A Platform for Every Food Lover</h2>
          <p className="text-lg text-center">
            Whether you're a beginner or an experienced cook, our platform offers a wide range of recipes to suit your taste.
          </p>
        </section>
      </div>
    </main>
  );
}
