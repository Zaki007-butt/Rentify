import {
  useQuery,
} from '@tanstack/react-query'
import { getProperties } from '../../apis/property.api'
import { QUERY_KEYS } from '../constants/keys'

export const useGetProperties = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROPERTIES],
    queryFn: getProperties,
    staleTime: 20 * 1000
  })
}
