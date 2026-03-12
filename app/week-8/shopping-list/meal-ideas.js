"use client";

import React, { useEffect, useState } from "react";

/**
 * Fetch meals that include `ingredient` using TheMealDB filter endpoint.
 * Returns an array (possibly empty) of meals:
 *  { idMeal, strMeal, strMealThumb }
 */
export async function fetchMealIdeas(ingredient) {
  if (!ingredient) return [];
  try {
    const encoded = encodeURIComponent(ingredient);
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encoded}`
    );
    if (!res.ok) return [];
    const json = await res.json();
    return json.meals || [];
  } catch (err) {
    console.error("fetchMealIdeas error:", err);
    return [];
  }
}


export async function fetchMealDetails(idMeal) {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(idMeal)}`
    );
    if (!res.ok) return null;
    const json = await res.json();
    return (json.meals && json.meals[0]) || null;
  } catch (err) {
    console.error("fetchMealDetails error:", err);
    return null;
  }
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null); // for details per meal
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!ingredient || ingredient.trim() === "") {
        setMeals([]);
        return;
      }
      setLoading(true);
      const results = await fetchMealIdeas(ingredient.trim());
      if (!cancelled) {
        setMeals(results);
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [ingredient]);

  async function showDetails(idMeal) {
    setLoadingDetails(true);
    setSelectedDetails(null);
    const details = await fetchMealDetails(idMeal);
    setSelectedDetails(details);
    setLoadingDetails(false);
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-2">Meal ideas</h2>
      <p className="text-sm text-gray-600 mb-4">
        Based on: <span className="font-semibold">{ingredient || "—"}</span>
      </p>

      {loading ? (
        <p>Loading meal ideas…</p>
      ) : meals.length === 0 ? (
        <p className="text-sm text-gray-500">No meal ideas found.</p>
      ) : (
        <ul className="space-y-3">
          {meals.map((m) => (
            <li
              key={m.idMeal}
              className="flex items-center gap-3 p-2 border rounded hover:bg-gray-50"
            >
              <img
                src={m.strMealThumb}
                alt={m.strMeal}
                width={64}
                height={64}
                className="rounded-md w-16 h-16 object-cover"
              />
              <div className="flex-1">
                <div className="font-semibold">{m.strMeal}</div>
                <div className="text-xs text-gray-500">id: {m.idMeal}</div>
              </div>
              <div>
                <button
                  onClick={() => showDetails(m.idMeal)}
                  className="px-3 py-1 rounded bg-blue-500 text-white text-sm"
                >
                  Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Details panel (Optional Challenge 2) */}
      <div className="mt-4">
        {loadingDetails ? (
          <p>Loading details…</p>
        ) : selectedDetails ? (
          <div className="p-3 border rounded bg-gray-50">
            <h3 className="font-bold text-lg">{selectedDetails.strMeal}</h3>
            <p className="text-sm mb-2">{selectedDetails.strInstructions?.slice(0, 200)}{selectedDetails.strInstructions?.length>200 ? "…" : ""}</p>
            <h4 className="font-semibold">Ingredients</h4>
            <ul className="list-disc ml-5 text-sm">
              {Array.from({ length: 20 }).map((_, i) => {
                const ing = selectedDetails[`strIngredient${i + 1}`];
                const measure = selectedDetails[`strMeasure${i + 1}`];
                if (ing && ing.trim()) {
                  return (
                    <li key={i}>
                      {measure ? `${measure} ` : ""}{ing}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
            {selectedDetails.strSource ? (
              <p className="text-xs mt-2">
                Source: <a className="text-blue-600" href={selectedDetails.strSource} target="_blank" rel="noreferrer">link</a>
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}