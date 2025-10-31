export default function SearchBar({ query, onQueryChange, sort, onSortChange }) {
  return (
    <div className="search-header">
      <input
        className="search-box"
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <select
        className="filter-box"
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="release-asc">Release Date (Asc)</option>
        <option value="release-desc">Release Date (Desc)</option>
        <option value="rating-asc">Rating (Asc)</option>
        <option value="rating-desc">Rating (Desc)</option>
      </select>
    </div>
  );
}
