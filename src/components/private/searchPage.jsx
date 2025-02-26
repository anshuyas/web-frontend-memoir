import { useState } from "react";
import { FaSearch, FaTag, FaStar, FaRunning, FaSmile, FaChevronDown } from "react-icons/fa";
import "../../styles/search.css";

const SearchPage = () => {
  const [filters, setFilters] = useState({
    tag: false,
    starred: false,
    activity: false,
    sentiment: false,
  });

  // Toggle filters
  const toggleFilter = (filter) => {
    setFilters({ ...filters, [filter]: !filters[filter] });
  };

  return (
    <div className="search-container">
      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search" className="search-input" />
        <button className="search-btn">
          <FaSearch />
        </button>
      </div>

      {/* Filters */}
      <div className="filters">
        <h3 className="filters-title">Filters</h3>

        {/* Tag Filter */}
        <div className="filter-item" onClick={() => toggleFilter("tag")}>
          <FaTag className="filter-icon" />
          <span>Tag</span>
          <FaChevronDown className={`chevron ${filters.tag ? "open" : ""}`} />
        </div>

        {/* Activity Filter */}
        <div className="filter-item" onClick={() => toggleFilter("activity")}>
          <FaRunning className="filter-icon" />
          <span>Activity</span>
          <FaChevronDown className={`chevron ${filters.activity ? "open" : ""}`} />
        </div>

        {/* Sentiment Filter */}
        <div className="filter-item" onClick={() => toggleFilter("sentiment")}>
          <FaSmile className="filter-icon" />
          <span>Sentiment</span>
          <FaChevronDown className={`chevron ${filters.sentiment ? "open" : ""}`} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
