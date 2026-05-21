import { useMutation, useQueryClient } from '@tanstack/react-query'
import landingPageService from '../services/landingPageService'
import { queryKeys } from '../../../services/queryKeys'
import useToast from '../../../hooks/useToast'
import { buildPageUrl } from '../../../config/env'

const usePageActions = () => {
  const queryClient = useQueryClient()
  const { showToast } = useToast()

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.products.all })
  }

  const upsertPage = (page) => {
    queryClient.setQueryData(queryKeys.products.all, (current = []) => {
      const next = current.filter((item) => item._id !== page._id)
      return [page, ...next]
    })
  }

  const removePage = (id) => {
    queryClient.setQueryData(queryKeys.products.all, (current = []) =>
      current.filter((item) => item._id !== id)
    )
  }

  const create = useMutation({
    mutationFn: landingPageService.create,
    onSuccess: async (page) => {
      if (page) upsertPage(page)
      refresh()
      const url = page?.url || buildPageUrl(page?.slug)
      try {
        if (url) await navigator.clipboard.writeText(url)
        showToast(
          url ? 'Page created — shop URL copied to clipboard' : 'Page created',
          'success'
        )
      } catch {
        showToast('Page created', 'success')
      }
    },
    onError: (error) => showToast(error?.message || 'Failed to create page', 'error'),
  })

  const update = useMutation({
    mutationFn: ({ id, payload }) => landingPageService.update(id, payload),
    onSuccess: (page) => {
      showToast('Page updated', 'success')
      if (page) upsertPage(page)
      refresh()
    },
    onError: (error) => showToast(error?.message || 'Failed to update page', 'error'),
  })

  const remove = useMutation({
    mutationFn: landingPageService.remove,
    onSuccess: (_, id) => {
      showToast('Page deleted', 'success')
      removePage(id)
      refresh()
    },
    onError: (error) => showToast(error?.message || 'Failed to delete page', 'error'),
  })

  const publish = useMutation({
    mutationFn: landingPageService.publish,
    onSuccess: (page) => {
      showToast('Page published', 'success')
      if (page) upsertPage(page)
      refresh()
    },
    onError: (error) => showToast(error?.message || 'Failed to publish page', 'error'),
  })

  const unpublish = useMutation({
    mutationFn: landingPageService.unpublish,
    onSuccess: (page) => {
      showToast('Page unpublished', 'success')
      if (page) upsertPage(page)
      refresh()
    },
    onError: (error) => showToast(error?.message || 'Failed to unpublish page', 'error'),
  })

  return { create, update, remove, publish, unpublish }
}

export default usePageActions
