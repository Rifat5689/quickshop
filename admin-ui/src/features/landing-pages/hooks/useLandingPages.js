import { useQuery } from '@tanstack/react-query'
import landingPageService from '../services/landingPageService'
import { queryKeys } from '../../../services/queryKeys'

const useLandingPages = () => {
  return useQuery({
    queryKey: queryKeys.pages.all,
    queryFn: landingPageService.getAll,
  })
}

export default useLandingPages
