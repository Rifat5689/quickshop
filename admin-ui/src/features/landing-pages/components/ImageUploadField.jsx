import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { FiImage, FiUploadCloud } from 'react-icons/fi'

const ImageUploadField = ({
  label,
  files,
  existingImages = [],
  onChange,
  error,
  required = false,
  replaceLabel = false,
}) => {
  const inputId = useId()
  const inputRef = useRef(null)
  const [previewUrls, setPreviewUrls] = useState([])

  const fileArray = useMemo(() => {
    if (!files?.length) return []
    return Array.from(files)
  }, [files])

  useEffect(() => {
    const urls = fileArray.map((file) => URL.createObjectURL(file))
    setPreviewUrls(urls)
    return () => urls.forEach((url) => URL.revokeObjectURL(url))
  }, [fileArray])

  const existingUrls = useMemo(
    () =>
      (existingImages || [])
        .map((img) => (typeof img === 'string' ? img : img?.url))
        .filter(Boolean),
    [existingImages]
  )

  const thumbs = previewUrls.length > 0 ? previewUrls : existingUrls
  const fileCount = fileArray.length

  return (
    <div className="form-group">
      <label className="form-label" htmlFor={inputId}>
        {label}
        {required ? <span style={{ color: 'var(--red)' }}> *</span> : null}
      </label>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        multiple
        accept="image/*"
        className="image-upload-input"
        onChange={(event) => onChange(event.target.files)}
      />

      <label htmlFor={inputId} className="image-upload-trigger">
        <span className="image-upload-trigger-icon" aria-hidden>
          <FiUploadCloud />
        </span>
        <span className="image-upload-trigger-text">
          <span className="image-upload-trigger-title">
            {replaceLabel ? 'Choose new images' : 'Upload product images'}
          </span>
          <span className="image-upload-trigger-sub">
            {fileCount > 0
              ? `${fileCount} file${fileCount > 1 ? 's' : ''} selected — tap to change`
              : 'PNG, JPG, WEBP · multiple allowed'}
          </span>
        </span>
        <span className="image-upload-trigger-action">Browse</span>
      </label>

      {thumbs.length > 0 ? (
        <div className="image-upload-previews" role="list" aria-label="Selected images">
          {thumbs.map((src, index) => (
            <div key={`${src}-${index}`} className="image-upload-preview-item" role="listitem">
              <img src={src} alt={`Preview ${index + 1}`} className="image-upload-thumb" />
              <span className="image-upload-thumb-badge">
                <FiImage size={10} />
                {index + 1}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="image-upload-hint">Thumbnails appear here after you select images.</p>
      )}

      {error ? (
        <div className="mt-2 text-xs font-semibold" style={{ color: 'var(--red)' }}>
          {error}
        </div>
      ) : null}
    </div>
  )
}

export default ImageUploadField
