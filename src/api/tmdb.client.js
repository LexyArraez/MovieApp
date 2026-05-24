const BASE_URL = import.meta.env.VITE_TMBD_API_URL
const API_TOKEN = import.meta.env.VITE_TMBD_API_TOKEN
const DEFAULT_TIMEOUT_MS = 8000

export class ApiError extends Error {
  constructor(message, statusCode, data = null) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.data = data
  }
}

export async function tmdbFetch(path, params = {}, { timeout = DEFAULT_TIMEOUT_MS } = {}) {
  const url = new URL(`${BASE_URL}${path}`)

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value))
    }
  })

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    })

    clearTimeout(timer)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new ApiError(
        errorData.status_message ?? `HTTP ${response.status}`,
        response.status,
        errorData
      )
    }

    return await response.json()
  } catch (err) {
    clearTimeout(timer)
    if (err.name === 'AbortError') {
      throw new ApiError('La petición ha expirado', 408)
    }
    throw err
  }
}
