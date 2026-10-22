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

function getTodayLocal() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function validateForm(form) {
  const errors = {};

  if (!form.fullName.trim()) {
    errors.fullName = "Enter your full name.";
  } else if (form.fullName.trim().length < 2) {
    errors.fullName = "Your name must contain at least 2 characters.";
  }

  if (!form.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (form.phone && !/^\+?[0-9]{9,15}$/.test(form.phone.trim())) {
    errors.phone = "Use 9–15 digits, with an optional + at the start.";
  }

  if (form.portfolio) {
    try {
      const url = new URL(form.portfolio);

      if (url.protocol !== "http:" && url.protocol !== "https:") {
        errors.portfolio =
          "Use a complete website address starting with http:// or https://.";
      }
    } catch {
      errors.portfolio = "Enter a valid website address.";
    }
  }

  if (!form.workshop) {
    errors.workshop = "Choose a workshop.";
  }

  if (!form.date) {
    errors.date = "Choose a preferred date.";
  } else if (form.date < getTodayLocal()) {
    errors.date = "Choose today or a future date.";
  }

  const seatCount = Number(form.seats);

  if (
    !form.seats ||
    !Number.isInteger(seatCount) ||
    seatCount < 1 ||
    seatCount > 4
  ) {
    errors.seats = "Choose a whole number from 1 to 4.";
  }

  return errors;
}

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [registrations, setRegistrations] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));

    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formErrors = validateForm(form);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      setMessage("Please correct the fields marked below.");
      return;
    }

    const registration = {
      ...form,
      id: Date.now(),
      fullName: form.fullName.trim(),
      seats: Number(form.seats),
    };

    setRegistrations((current) => [...current, registration]);
    setForm(initialForm);
    setErrors({});
    setMessage("Registration added successfully.");
  }

  function handleRemove(id) {
    setRegistrations((current) =>
      current.filter((registration) => registration.id !== id)
    );
  }

  return (
    <main>
      <h1>Workshop Registration</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={handleChange}
            required
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
          />
          {errors.fullName && (
            <small id="fullName-error">{errors.fullName}</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && <small id="email-error">{errors.email}</small>}
        </div>

        <div className="field">
          <label htmlFor="phone">Telephone (optional)</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && <small id="phone-error">{errors.phone}</small>}
        </div>

        <div className="field">
          <label htmlFor="portfolio">Portfolio URL (optional)</label>
          <input
            id="portfolio"
            name="portfolio"
            type="url"
            value={form.portfolio}
            onChange={handleChange}
            aria-invalid={Boolean(errors.portfolio)}
            aria-describedby={errors.portfolio ? "portfolio-error" : undefined}
          />
          {errors.portfolio && (
            <small id="portfolio-error">{errors.portfolio}</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="workshop">Workshop</label>
          <select
            id="workshop"
            name="workshop"
            value={form.workshop}
            onChange={handleChange}
            required
            aria-invalid={Boolean(errors.workshop)}
            aria-describedby={errors.workshop ? "workshop-error" : undefined}
          >
            <option value="">Choose a workshop</option>
            {workshops.map((workshop) => (
              <option key={workshop} value={workshop}>
                {workshop}
              </option>
            ))}
          </select>
          {errors.workshop && (
            <small id="workshop-error">{errors.workshop}</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="date">Preferred date</label>
          <input
            id="date"
            name="date"
            type="date"
            min={getTodayLocal()}
            value={form.date}
            onChange={handleChange}
            required
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? "date-error" : undefined}
          />
          {errors.date && <small id="date-error">{errors.date}</small>}
        </div>

        <div className="field">
          <label htmlFor="seats">Number of seats</label>
          <input
            id="seats"
            name="seats"
            type="number"
            min="1"
            max="4"
            step="1"
            value={form.seats}
            onChange={handleChange}
            required
            aria-invalid={Boolean(errors.seats)}
            aria-describedby={errors.seats ? "seats-error" : undefined}
          />
          {errors.seats && <small id="seats-error">{errors.seats}</small>}
        </div>

        <button type="submit">Register</button>

        {message && (
          <p role="status" aria-live="polite">
            {message}
          </p>
        )}
      </form>

      <section aria-labelledby="registrations-heading">
        <h2 id="registrations-heading">Registrations</h2>

        {registrations.length === 0 ? (
          <p>No registrations yet. Complete the form to add one.</p>
        ) : (
          <ul>
            {registrations.map((registration) => (
              <li key={registration.id}>
                <strong>{registration.fullName}</strong>
                <p>
                  {registration.email} · {registration.workshop} ·{" "}
                  {registration.date} · {registration.seats} seat
                  {registration.seats === 1 ? "" : "s"}
                </p>
                <button
                  type="button"
                  onClick={() => handleRemove(registration.id)}
                  aria-label={`Remove registration for ${registration.fullName}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}