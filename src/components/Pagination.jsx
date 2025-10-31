export default function Pagination({ page, totalPages, onPrev, onNext }) {
  return (
    <div className="button-container">
      <button className="previous-button" onClick={onPrev} disabled={page === 1}>
        Previous
      </button>
      <p className="page-info">Page {page} of {totalPages}</p>
      <button
        className="next-button"
        onClick={onNext}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}
