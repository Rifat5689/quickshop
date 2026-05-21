const OrderFilterRow = ({ search, setSearch, status, setStatus }) => {
  const statuses = ['all', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

  return (
    <div className="filter-row">
      <div className="filter-input-wrap" style={{ maxWidth: 280 }}>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, product…"
        />
      </div>
      <select
        className="filter-select"
        value={status}
        onChange={(event) => setStatus(event.target.value)}
        aria-label="Filter by status"
      >
        {statuses.map((item) => (
          <option key={item} value={item}>
            {item === 'all' ? 'All Orders' : item}
          </option>
        ))}
      </select>
      <div className="status-filter-line">
        {statuses.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setStatus(item)}
            className={`status-filter-btn${status === item ? ' active' : ''}`}
          >
            {item === 'all' ? 'All' : item}
          </button>
        ))}
      </div>
    </div>
  )
}

export default OrderFilterRow
