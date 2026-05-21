import { useViewsList, useViewsSummary } from '../hooks/useViews'

const ViewsPage = () => {
  const { data: summary, isLoading: summaryLoading } = useViewsSummary()
  const { data: pages = [], isLoading } = useViewsList()

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h2 className="page-title">Views</h2>
        <p className="page-sub">Live traffic and page visibility.</p>
      </div>
      <div className="views-grid">
        {summaryLoading ? (
          <div className="card col-span-full p-6 text-[13px]" style={{ color: 'var(--text3)' }}>
            Loading summary...
          </div>
        ) : (
          <>
            <div className="view-card">
              <div className="view-label">Total Views</div>
              <div className="view-val">{summary?.viewsTotal || 0}</div>
            </div>
            <div className="view-card">
              <div className="view-label">Today</div>
              <div className="view-val">{summary?.viewsToday || 0}</div>
            </div>
            <div className="view-card">
              <div className="view-label">Monthly</div>
              <div className="view-val">{summary?.viewsMonth || 0}</div>
            </div>
            <div className="view-card">
              <div className="view-label">Pages</div>
              <div className="view-val">{pages.length}</div>
            </div>
          </>
        )}
      </div>

      {isLoading ? (
        <div className="card p-6 text-[13px]" style={{ color: 'var(--text3)' }}>
          Loading views...
        </div>
      ) : (
        <div className="card">
          <div className="tbl-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Slug</th>
                  <th>Active</th>
                  <th>Today</th>
                  <th>Month</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page) => (
                  <tr key={page._id}>
                    <td className="td-user-name">{page.name}</td>
                    <td className="font-mono text-xs" style={{ color: 'var(--text3)' }}>
                      /{page.slug}
                    </td>
                    <td>
                      <span className="badge badge-pending">
                        <span className="badge-dot" />
                        {page.viewsToday || 0}
                      </span>
                    </td>
                  <td style={{ fontFamily: 'var(--mono)' }}>{page.viewsToday || 0}</td>
                  <td style={{ fontFamily: 'var(--mono)' }}>{page.viewsMonth || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewsPage
