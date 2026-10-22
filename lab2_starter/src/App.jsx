import { useState } from "react";

const workshops = [
  "Web Design",
  "JavaScript Basics",
  "Building with React",
];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  portfolio: "",
  workshop: "",
  date: "",
  seats: "1",
};

export default function App() {
  const [form, setForm] = useState(initialForm);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <main>
      <h1>Workshop Registration</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="fullName">Full name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={form.fullName}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">Telephone</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
        />

        <label htmlFor="portfolio">Portfolio URL</label>
        <input
          id="portfolio"
          name="portfolio"
          type="url"
          value={form.portfolio}
          onChange={handleChange}
        />

        <label htmlFor="workshop">Workshop</label>
        <select
          id="workshop"
          name="workshop"
          value={form.workshop}
          onChange={handleChange}
          required
        >
          <option value="">Choose a workshop</option>
          {workshops.map((workshop) => (
            <option key={workshop} value={workshop}>
              {workshop}
            </option>
          ))}
        </select>

        <label htmlFor="date">Preferred date</label>
        <input
          id="date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <label htmlFor="seats">Number of seats</label>
        <input
          id="seats"
          name="seats"
          type="number"
          min="1"
          max="4"
          value={form.seats}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>
    </main>
  );
}