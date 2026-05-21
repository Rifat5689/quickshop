import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import settingsService from '../services/settingsService'
import { queryKeys } from '../../../services/queryKeys'
import useToast from '../../../hooks/useToast'

const useShopSettings = () => {
  const queryClient = useQueryClient()
  const { showToast } = useToast()

  const query = useQuery({
    queryKey: queryKeys.settings,
    queryFn: settingsService.getShopSettings,
  })

  const save = useMutation({
    mutationFn: settingsService.updateShopSettings,
    onSuccess: () => {
      showToast('Shop language saved', 'success')
      queryClient.invalidateQueries({ queryKey: queryKeys.settings })
    },
    onError: (error) =>
      showToast(error?.message || 'Failed to save settings', 'error'),
  })

  return { ...query, save }
}

export default useShopSettings
