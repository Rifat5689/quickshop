import { useQuery } from '@tanstack/react-query'
import viewsService from '../services/viewsService'
import { queryKeys } from '../../../services/queryKeys'

export const useViewsSummary = () => {
  return useQuery({
    queryKey: queryKeys.views.summary,
    queryFn: viewsService.getSummary,
  })
}

export const useViewsList = () => {
  return useQuery({
    queryKey: queryKeys.views.all,
    queryFn: viewsService.getAll,
  })
}
