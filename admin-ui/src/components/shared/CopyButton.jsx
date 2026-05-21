import { useState } from 'react'
import { FiCheck, FiClipboard } from 'react-icons/fi'

const CopyButton = ({ text, disabled = false, className = '' }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (event) => {
    event.stopPropagation()
    if (!text || disabled) return

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      title={copied ? 'Copied!' : 'Copy'}
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
      disabled={disabled || !text}
      onClick={handleCopy}
      className={`copy-btn btn btn-ghost btn-sm shrink-0 ${copied ? 'copy-btn--success' : ''} ${className}`}
    >
      {copied ? (
        <>
          <FiCheck className="copy-btn__icon" aria-hidden />
          <span className="copy-btn__label">Copied!</span>
        </>
      ) : (
        <FiClipboard className="copy-btn__icon" aria-hidden />
      )}
    </button>
  )
}

export default CopyButton
