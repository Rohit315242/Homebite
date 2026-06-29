import { useState } from "react";

function SearchBar({ onSearch }) {
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    onSearch(location);
  };

  return (
    <div className="mb-3">
      <input
        className="form-control mb-2"
        placeholder="Enter location (e.g. Pune)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;