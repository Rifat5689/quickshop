/** Greeting from Asia/Dhaka (BDT) local time */
export const getBDTGreeting = (date = new Date()) => {
  const hour = Number(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Dhaka',
      hour: 'numeric',
      hour12: false,
    }).format(date)
  )

  if (hour >= 5 && hour < 12) return 'Good morning'
  if (hour >= 12 && hour < 17) return 'Good afternoon'
  if (hour >= 17 && hour < 21) return 'Good evening'
  return 'Good night'
}
