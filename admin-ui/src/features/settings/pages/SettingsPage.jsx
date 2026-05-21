import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
import { FontContext } from '../../../context/FontContext'
import useShopSettings from '../hooks/useShopSettings'

const SettingsPage = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  const { font, setFont } = useContext(FontContext)
  const { data, isLoading, save } = useShopSettings()
  const [shopLanguage, setShopLanguage] = useState('bn')

  useEffect(() => {
    if (data?.shopLanguage) {
      setShopLanguage(data.shopLanguage)
    }
  }, [data?.shopLanguage])

  const handleLanguageSave = () => {
    save.mutate({ shopLanguage })
  }

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h2 className="page-title">Settings</h2>
        <p className="page-sub">Dashboard appearance and shop storefront language.</p>
      </div>
      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-label">Shop fixed text language</div>
          <select
            value={shopLanguage}
            onChange={(event) => setShopLanguage(event.target.value)}
            className="settings-select"
            disabled={isLoading || save.isPending}
          >
            <option value="bn">Bangla (বাংলা)</option>
            <option value="en">English</option>
          </select>
          <div className="text-xs" style={{ color: 'var(--text3)' }}>
            Controls labels and buttons on the shop UI (order, delivery, payment, confirm
            panel). Product name, description, and form placeholders you enter stay as you
            type them.
          </div>
          <button
            type="button"
            className="btn btn-accent mt-3"
            onClick={handleLanguageSave}
            disabled={isLoading || save.isPending}
          >
            {save.isPending ? 'Saving...' : 'Save shop language'}
          </button>
        </div>
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
