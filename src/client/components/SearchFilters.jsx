export default function SearchFilters({ destination, destinations, onDestinationChange, onReset, statusText }) {
  return (
    <div className="filter-bar">
      <div className="filter-field">
        <label htmlFor="destination">Destination</label>
        <select
          id="destination"
          value={destination}
          onChange={(event) => onDestinationChange(event.target.value)}
          disabled={destinations.length === 0}
        >
          <option value="">All destinations</option>
          {destinations.map((city) => <option key={city} value={city}>{city}</option>)}
        </select>
      </div>
      <button id="reset-filters" className="reset-button" type="button" onClick={onReset}>Reset filter</button>
      <p id="results-count" className="results-count" role="status" aria-atomic="true">{statusText}</p>
    </div>
  );
}
