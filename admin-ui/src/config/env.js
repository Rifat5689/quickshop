export const API_BASE_URL =
	
	'https://quickshop-3ovc.onrender.com/api/v1'

/** Shop-ui Firebase hosting URL (no trailing slash) */
export const SHOP_BASE_URL =
	
	'https://originsofbeautydotcom.web.app'

/** @deprecated Use SHOP_BASE_URL */
export const PAGES_BASE_URL = SHOP_BASE_URL

export const buildPageUrl = (slug) => {
	const base = SHOP_BASE_URL.replace(/\/$/, '')
	if (!slug) return base
	return `${base}/${slug}`
}
//import.meta.env.VITE_API_BASE_URL ||
//import.meta.env.VITE_SHOP_BASE_URL ||
//	import.meta.env.VITE_PAGES_BASE_URL ||
