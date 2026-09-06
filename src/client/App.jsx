import { useEffect, useState } from "react";
import { getStays } from "./api.js";
import SearchFilters from "./components/SearchFilters.jsx";
import StayCard from "./components/StayCard.jsx";

export default function App() {
  const [destination, setDestination] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    getStays(destination, controller.signal)
      .then((data) => {
        if (controller.signal.aborted) return;
        setStays(data.stays);
        setDestinations(data.destinations);
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        setError(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    // Prevent an older, slower request from overwriting a newer selection.
    return () => controller.abort();
  }, [destination, reload]);

  function resetFilters() {
    setDestination("");
    setReload((previous) => previous + 1);
  }

  const statusText = loading ? "Loading stays…" : error ? "Stays unavailable" : `${stays.length} ${stays.length === 1 ? "stay" : "stays"}`;

  return (
    <>
      <a className="skip-link" href="#stays">Skip to stays</a>
      <div className="page-shell">
        <header className="site-header">
          <a className="brand" href="/" aria-label="Weekend Stay home">
            <span className="brand-mark" aria-hidden="true">w.</span>
            Weekend Stay
          </a>
          <span className="demo-badge">React + Node.js demo</span>
        </header>
        <main>
          <section className="hero" aria-labelledby="hero-title">
            <div>
              <p className="eyebrow">Less planning. More weekend.</p>
              <h1 id="hero-title">A little change<br />of <span>scenery.</span></h1>
              <p className="hero-description">A coastal cottage. A city hideout. Somewhere under the redwoods. Find a spot for your next California escape.</p>
            </div>
            <aside className="weekend-note" aria-label="About this collection">
              <span className="note-icon" aria-hidden="true">↗</span>
              <p className="eyebrow">The short-list</p>
              <p className="note-title">Close to home.<br />Far from ordinary.</p>
              <p>6 fictional stays · 3 destinations<br />A small full-stack experiment.</p>
            </aside>
          </section>
          <section id="stays" className="stays-section" aria-labelledby="stays-title" tabIndex={-1}>
            <div className="section-heading">
              <h2 id="stays-title">Find your kind of weekend</h2>
              <span className="collection-label">The California collection / 01</span>
            </div>
            <SearchFilters
              destination={destination}
              destinations={destinations}
              onDestinationChange={setDestination}
              onReset={resetFilters}
              statusText={statusText}
            />
            <div aria-busy={loading}>
              {loading && <div className="state-panel">Finding your next weekend…</div>}
              {!loading && error && (
                <div className="state-panel state-error" role="alert">
                  <h3>We couldn’t load the stays.</h3>
                  <p>{error} Check that the API server is running, then try again.</p>
                  <button type="button" onClick={() => setReload((previous) => previous + 1)}>Try again</button>
                </div>
              )}
              {!loading && !error && stays.length === 0 && (
                <div className="state-panel">
                  <h3>No stays found.</h3>
                  <p>Try another destination or reset the filter.</p>
                </div>
              )}
              {!loading && !error && (
                <div id="stay-grid" className="stay-grid">
                  {stays.map((stay) => <StayCard key={stay.id} stay={stay} />)}
                </div>
              )}
            </div>
          </section>
        </main>
        <footer className="site-footer">
          <p><strong>Small website. Real files. Your next experiment.</strong></p>
          <p>Learning demo only. All stays and prices are fictional. No bookings or payments.</p>
        </footer>
      </div>
    </>
  );
}
