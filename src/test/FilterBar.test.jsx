import React from 'react'
import ReactDOM from 'react-dom/client'
import { act } from 'react-dom/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { FilterBar } from '../components/movieHome/FilterBar'

const genres = [
  { id: 28, name: 'Acción' },
  { id: 35, name: 'Comedia' },
]

function render(component) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  let root

  act(() => {
    root = ReactDOM.createRoot(container)
    root.render(component)
  })

  return { container, root }
}

describe('FilterBar', () => {
  it('llama onGenreChange al seleccionar un género', () => {
    const onGenreChange = vi.fn()
    const { container, root } = render(
      <FilterBar
        genres={genres}
        activeGenreId={null}
        onGenreChange={onGenreChange}
        minRating={null}
        onRatingChange={() => {}}
        trending={false}
        onTrendingChange={() => {}}
        activeGenreName={null}
        onClearAll={() => {}}
      />
    )

    const actionButton = Array.from(container.querySelectorAll('button')).find(
      (button) => button.textContent.trim() === 'Acción'
    )

    expect(actionButton).toBeTruthy()

    act(() => {
      actionButton.click()
    })

    expect(onGenreChange).toHaveBeenCalledWith(28)
    root.unmount()
  })

  it('llama onRatingChange al seleccionar un rating', () => {
    const onRatingChange = vi.fn()
    const { container, root } = render(
      <FilterBar
        genres={genres}
        activeGenreId={null}
        onGenreChange={() => {}}
        minRating={6}
        onRatingChange={onRatingChange}
        trending={false}
        onTrendingChange={() => {}}
        activeGenreName={null}
        onClearAll={() => {}}
      />
    )

    const ratingButton = Array.from(container.querySelectorAll('button')).find(
      (button) => button.textContent.trim() === '7+'
    )

    expect(ratingButton).toBeTruthy()

    act(() => {
      ratingButton.click()
    })

    expect(onRatingChange).toHaveBeenCalledWith(7)
    root.unmount()
  })

  it('llama onTrendingChange al activar tendencia', () => {
    const onTrendingChange = vi.fn()
    const { container, root } = render(
      <FilterBar
        genres={genres}
        activeGenreId={null}
        onGenreChange={() => {}}
        minRating={null}
        onRatingChange={() => {}}
        trending={false}
        onTrendingChange={onTrendingChange}
        activeGenreName={null}
        onClearAll={() => {}}
      />
    )

    const trendingButton = Array.from(container.querySelectorAll('button')).find(
      (button) => button.textContent.trim() === 'Tendencia'
    )

    expect(trendingButton).toBeTruthy()

    act(() => {
      trendingButton.click()
    })

    expect(onTrendingChange).toHaveBeenCalledWith(true)
    root.unmount()
  })

  it('llama onGenreChange y onTrendingChange al quitar filtros activos', () => {
    const onGenreChange = vi.fn()
    const onTrendingChange = vi.fn()
    const { container, root } = render(
      <FilterBar
        genres={genres}
        activeGenreId={28}
        onGenreChange={onGenreChange}
        minRating={null}
        onRatingChange={() => {}}
        trending={true}
        onTrendingChange={onTrendingChange}
        activeGenreName="Acción"
        onClearAll={() => {}}
      />
    )

    const removeGenreButton = Array.from(container.querySelectorAll('button')).find(
      (button) => button.getAttribute('aria-label') === 'Quitar filtro Acción'
    )

    const removeTrendingButton = Array.from(container.querySelectorAll('button')).find(
      (button) => button.getAttribute('aria-label') === 'Quitar filtro Tendencia'
    )

    expect(removeGenreButton).toBeTruthy()
    expect(removeTrendingButton).toBeTruthy()

    act(() => {
      removeGenreButton.click()
      removeTrendingButton.click()
    })

    expect(onGenreChange).toHaveBeenCalledWith(null)
    expect(onTrendingChange).toHaveBeenCalledWith(false)
    root.unmount()
  })

  it('llama onClearAll al limpiar todos los filtros', () => {
    const onClearAll = vi.fn()
    const { container, root } = render(
      <FilterBar
        genres={genres}
        activeGenreId={28}
        onGenreChange={() => {}}
        minRating={6}
        onRatingChange={() => {}}
        trending={false}
        onTrendingChange={() => {}}
        activeGenreName="Acción"
        onClearAll={onClearAll}
      />
    )

    const clearAllButton = Array.from(container.querySelectorAll('button')).find(
      (button) => button.textContent.trim() === 'Limpiar todo'
    )

    expect(clearAllButton).toBeTruthy()

    act(() => {
      clearAllButton.click()
    })

    expect(onClearAll).toHaveBeenCalled()
    root.unmount()
  })
})
