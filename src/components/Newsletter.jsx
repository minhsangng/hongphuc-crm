import { useState } from "react";
import { images } from "../utils/helpers";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire this up to your newsletter provider
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <section className="newsletter-section section-padding pt-0 fix">
      <div className="w-[90%] mx-auto">
        <div className="section-title text-center">
          <span className="sub-title">Subscribe Now</span>
          <h2>
            Sign up for our <span>newsletter</span>
          </h2>
          <p className="mt-4">
            Keep up to date with the latest news and offers
          </p>
        </div>

        <div className="signUp-box mt-4 mt-md-0">
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <input
                type="email"
                id="emailInput"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="far fa-house house-icon" />
            </div>
            <button type="submit" className="theme-btn">
              Subscribe Now <i className="icon-arrow-icon" />
            </button>
          </form>
        </div>

        <div className="newsletter-image">
          <img src={images("newsletter1.png")} alt="newsletter-image" />
        </div>
      </div>
    </section>
  );
}
