const AVATAR_COLORS = ['#6366f1', '#14b8a6', '#f59e0b', '#f43f5e', '#8b5cf6', '#10b981']

const Avatar = ({ name, index = 0, size = 'md' }) => {
  const initials = (name || '?')
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const color = AVATAR_COLORS[index % AVATAR_COLORS.length]
  const sizeClass = size === 'sm' ? 'avatar-sm' : ''

  return (
    <div
      className={`avatar ${sizeClass}`}
      style={{
        background: color,
        border: '1.5px solid rgba(255,255,255,0.15)',
      }}
    >
      {initials}
    </div>
  )
}

export default Avatar
