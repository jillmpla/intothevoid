import { ArrowLeft, Orbit, Sparkles } from "lucide-react";
import { Link } from "react-router";
import Footer from "./Footer";

function About() {
  return (
    <div className="app-shell">
      {/* Decorative background only, so assistive technology can ignore it. */}
      <div className="space-noise" aria-hidden="true" />

      <header className="site-header">
        <Link className="brand" to="/" aria-label="Into the Void home">
          <span className="brand-mark" aria-hidden="true">
            <Orbit size={22} />
          </span>

          <span>Into the Void</span>
        </Link>
      </header>

      <main id="main-content" className="info-page">
        <Link className="back-link" to="/">
          <ArrowLeft size={18} aria-hidden="true" />
          Back to the scanner
        </Link>

        <div className="info-heading">
          <div className="eyebrow">
            <Sparkles size={15} aria-hidden="true" />
            About
          </div>

          <p>
            Into the Void makes missing data easier to see, understand, and
            investigate.
          </p>
        </div>

        <section className="info-card" aria-labelledby="about-app-title">
          <span className="panel-kicker">The project</span>
          <h2 id="about-app-title">About Into the Void</h2>

          <p>
            Into the Void is a small data-quality tool that analyzes CSV files
            and reveals where values are missing. It provides an overall
            missing-data score, column-level details, and a visual map of gaps
            in the dataset.
          </p>

          <p>
            The project was designed to make data exploration feel less
            intimidating while remaining clear, useful, and accessible.
          </p>
        </section>

        <section className="info-card" aria-labelledby="about-me-title">
          <span className="panel-kicker">The creator</span>
          <h2 id="about-me-title">About Me</h2>

          <p>
            Hi, I’m <strong>Jill Platts</strong>, a developer and educator who
            enjoys combining technology, data, and thoughtful design to create
            small, meaningful projects.
          </p>

          <p>
            I built Into the Void as a practical way to explore data quality
            while creating an interface that feels distinctive, approachable,
            and accessible.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default About;