import { useContext } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
import { FontContext } from '../../../context/FontContext'

const SettingsPage = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  const { font, setFont } = useContext(FontContext)

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h2 className="page-title">Settings</h2>
        <p className="page-sub">Theme and typography for the dashboard.</p>
      </div>
      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-label">Theme</div>
          <select
            value={theme}
            onChange={(event) => setTheme(event.target.value)}
            className="settings-select"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <div className="text-xs" style={{ color: 'var(--text3)' }}>
            Default is light. Switch anytime.
          </div>
        </div>
        <div className="settings-card">
          <div className="settings-label">Font</div>
          <select
            value={font}
            onChange={(event) => setFont(event.target.value)}
            className="settings-select"
          >
            <option value="Geist">Geist</option>
            <option value="Poppins">Poppins</option>
            <option value="Inter">Inter</option>
            <option value="Roboto">Roboto</option>
          </select>
          <div className="text-xs" style={{ color: 'var(--text3)' }}>
            All text uses one font family.
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
