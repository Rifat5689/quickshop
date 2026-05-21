export const formatBDT = (amount = 0) => {
  const value = Number(amount) || 0
  return `৳${value.toLocaleString('en-US')}`
}
