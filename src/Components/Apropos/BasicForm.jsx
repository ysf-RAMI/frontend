import { useForm, ValidationError } from "@formspree/react";
import "./contac.css";

export default function ModernContactForm() {
  const [state, handleSubmit] = useForm("your-form-id"); // Replace with your Formspree form ID

  if (state.succeeded) {
    return (
      <div className="success-message">
        <p>Merci pour votre message! Nous vous contacterons bientôt.</p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2>Contactez-nous</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="nom">Nom</label>
          <input id="nom" type="text" name="nom" required />
          <ValidationError prefix="Nom" field="nom" errors={state.errors} />
        </div>

        <div className="form-group">
          <label htmlFor="prenom">Prénom</label>
          <input id="prenom" type="text" name="prenom" required />
          <ValidationError
            prefix="Prénom"
            field="prenom"
            errors={state.errors}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>

        <div className="form-group">
          <label htmlFor="sujet">Sujet</label>
          <input id="sujet" type="text" name="sujet" required />
          <ValidationError prefix="Sujet" field="sujet" errors={state.errors} />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" required />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
        </div>

        <button
          type="submit"
          disabled={state.submitting}
          className="submit-button"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}
