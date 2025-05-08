import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./garden-quiz.module.css";

interface FormData {
  zipCode: string;
  length: string;
  width: string;
  growContainers: string[];
  sunTypes: string[];
  timeInvestment: string;
  plantTypePreference: string;
  goals: string[];
}

interface GardenQuizProps {
  setQuizResults: (results: string) => void;
}

const initialFormData: FormData = {
  zipCode: "",
  length: "",
  width: "",
  growContainers: [],
  sunTypes: [],
  timeInvestment: "",
  plantTypePreference: "",
  goals: [],
};

const GardenQuiz: React.FC<GardenQuizProps> = ({ setQuizResults }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const updated = new Set(prev[name as keyof FormData] as string[]);
        checked ? updated.add(value) : updated.delete(value);
        return {
          ...prev,
          [name]: Array.from(updated),
        };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const promptText = `
Garden Location: Area code ${formData.zipCode}
Garden Size: ${formData.length} ft by ${formData.width} ft
Growing Containers: ${formData.growContainers.join(", ")}
Sun Exposure: ${formData.sunTypes.join(", ")}
Time Investment: ${formData.timeInvestment}
Plant Preference: ${formData.plantTypePreference}
Garden Goals: ${formData.goals.join(", ")}
    `.trim();

    console.log("Prompt Text for AI:");
    console.log(promptText);
    setQuizResults(promptText);
  };

  return (
    <form className={styles.quizForm} onSubmit={handleSubmit}>
      <h3>1. Where is your garden located?</h3>
      <input
        type="text"
        name="zipCode"
        placeholder="Enter area code"
        value={formData.zipCode}
        onChange={handleChange}
        className={styles.input}
      />

      <h3>2. About how large is your garden?</h3>
      <input
        type="number"
        name="length"
        placeholder="Length (ft)"
        value={formData.length}
        onChange={handleChange}
        className={styles.input}
      />
      <input
        type="number"
        name="width"
        placeholder="Width (ft)"
        value={formData.width}
        onChange={handleChange}
        className={styles.input}
      />

      <h3>3. What are you planning to grow in?</h3>
      {["Pots and planters", "A garden bed", "Directly into soil"].map(
        (option, i) => (
          <label key={i} className={styles.label}>
            <input
              type="checkbox"
              name="growContainers"
              value={option}
              onChange={handleChange}
            />
            {option}
          </label>
        )
      )}

      <h3>4. What types of sun do you have in your garden?</h3>
      {["Full sun", "Partial sun", "Partial shade", "Full shade"].map(
        (option, i) => (
          <label key={i} className={styles.label}>
            <input
              type="checkbox"
              name="sunTypes"
              value={option}
              onChange={handleChange}
            />
            {option}
          </label>
        )
      )}

      <h3>5. How much time do you want to invest in gardening?</h3>
      {["Low", "Medium", "High"].map((option, i) => (
        <label key={i} className={styles.label}>
          <input
            type="radio"
            name="timeInvestment"
            value={option}
            checked={formData.timeInvestment === option}
            onChange={handleChange}
          />
          {option}
        </label>
      ))}

      <h3>6. Do you prefer commonly available plants or rare varieties?</h3>
      {[
        "I'd like common plants that I can buy at any local store",
        "I want plants that can be easily found in most nurseries",
        "I don't mind visiting a few nurseries until I find my dream cultivars!",
      ].map((option, i) => (
        <label key={i} className={styles.label}>
          <input
            type="radio"
            name="plantTypePreference"
            value={option}
            checked={formData.plantTypePreference === option}
            onChange={handleChange}
          />
          {option}
        </label>
      ))}

      <h3>7. What do you want out of your garden? (Pick up to 3)</h3>
      {[
        "I want to be surrounded by the beauty of nature!",
        "I want to be self-sufficient and grow my own food!",
        "I want to have fresh, delicious herbs for cooking!",
        "I want to create a haven for local pollinators!",
        "I want to plant native species to restore the local ecosystem!",
        "I want to have a dazzling variety of plants!",
      ].map((option, i) => (
        <label key={i} className={styles.label}>
          <input
            type="checkbox"
            name="goals"
            value={option}
            onChange={handleChange}
          />
          {option}
        </label>
      ))}

      <button type="submit" className={styles.button}>
        Submit
      </button>
    </form>
  );
};

export default GardenQuiz;
