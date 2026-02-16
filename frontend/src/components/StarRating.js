import React from "react";

function StarRating({ value, onChange }) {
  return (
    <div className="star-rating" role="radiogroup" aria-label="Meal rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={star <= value ? "star-btn active" : "star-btn"}
          onClick={() => onChange(star)}
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default StarRating;
