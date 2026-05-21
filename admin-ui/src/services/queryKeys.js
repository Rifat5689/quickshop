export const queryKeys = {
  orders: {
    all: ['orders'],
    byId: (id) => ['orders', id],
    pending: ['orders', 'pending'],
    processing: ['orders', 'processing'],
    shipped: ['orders', 'shipped'],
    delivered: ['orders', 'delivered'],
  },
  pages: {
    all: ['pages'],
  },
  views: {
    all: ['views'],
    summary: ['views', 'summary'],
  },
  notifications: ['notifications'],
  overview: {
    stats: ['overview', 'stats'],
  },
  settings: ['settings'],
}
