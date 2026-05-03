import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./PlayerFeedback.module.css";

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

const PlayerFeedback = () => {

  const { coachId } = useParams();
  const navigate    = useNavigate();

  const [rating,  setRating]  = useState(0);
  const [hover,   setHover]   = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    const playerId = sessionStorage.getItem("pid");
    const formData = new FormData();
    formData.append("player_id", playerId);
    formData.append("coach_id",  coachId);
    formData.append("rating",    rating);
    formData.append("comment",   comment);

    axios.post("http://127.0.0.1:8000/AddFeedback/", formData)
      .then(() => { alert("Feedback submitted"); navigate("/player/mytraining"); })
      .catch((err) => { console.error(err); alert("Error submitting feedback"); });
  };

  const active = hover || rating;

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        {/* ── Header ── */}
        <div className={styles.cardHeader}>
          <span className={styles.eyebrow}>Player Review</span>
          <h2 className={styles.title}>Rate Your Coach</h2>
        </div>

        {/* ── Body ── */}
        <div className={styles.cardBody}>

          {/* Stars */}
          <div className={styles.starSection}>
            <span className={styles.starLabel}>Tap to rate</span>

            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`${styles.star} ${active >= star ? styles.starActive : ""}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  ★
                </span>
              ))}
            </div>

            <span className={styles.ratingValue}>
              {active > 0 ? `${RATING_LABELS[active]} (${active}/5)` : ""}
            </span>
          </div>

          <div className={styles.divider} />

          {/* Comment */}
          <div className={styles.field}>
            <label>Your Feedback</label>
            <textarea
              className={styles.textarea}
              placeholder="Share your experience with this coach..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button className={styles.submitBtn} onClick={handleSubmit}>
            Submit Feedback
          </button>

        </div>
      </div>
    </div>
  );
};

export default PlayerFeedback;