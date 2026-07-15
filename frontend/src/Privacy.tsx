import { ArrowLeft, Orbit, ShieldCheck } from "lucide-react";
import { Link } from "react-router";
import Footer from "./Footer";

function Privacy() {
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
            <ShieldCheck size={15} aria-hidden="true" />
            Privacy
          </div>

          <p>
            Into the Void processes uploaded CSV files only long enough to
            create the analysis.
          </p>
        </div>

        <section className="info-card" aria-labelledby="privacy-overview-title">
          <span className="panel-kicker">Overview</span>
          <h2 id="privacy-overview-title">How files are handled</h2>

          <p>
            Uploaded CSV files are sent to the application backend for
            temporary analysis. The application doesn't intentionally save,
            archive, or create user accounts for uploaded datasets.
          </p>
        </section>

        <section className="info-card" aria-labelledby="collection-title">
          <span className="panel-kicker">Data collection</span>
          <h2 id="collection-title">What the app collects</h2>

          <p>
            Into the Void doesn't request names, email addresses, passwords,
            or other account information. However, please don't upload files 
            containing private, confidential, medical, financial, or otherwise 
            sensitive information.
          </p>
        </section>

        <section className="info-card" aria-labelledby="retention-title">
          <span className="panel-kicker">Retention</span>
          <h2 id="retention-title">File storage</h2>

          <p>
            Uploaded files are read into memory for analysis and aren't
            intentionally stored by the application after the request is
            completed.
          </p>
        </section>

        <section className="info-card" aria-labelledby="updates-title">
          <span className="panel-kicker">Updates</span>
          <h2 id="updates-title">Policy changes</h2>

          <p>
            This policy may be updated if the application later adds hosting,
            analytics, accounts, saved reports, or other features that change
            how information is handled.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Privacy;