import { useQuery } from '@tanstack/react-query'
import overviewService from '../services/overviewService'
import { queryKeys } from '../../../services/queryKeys'

const useOverview = () => {
  return useQuery({
    queryKey: queryKeys.overview.stats,
    queryFn: overviewService.getStats,
    staleTime: 60_000,
  })
}

export default useOverview
