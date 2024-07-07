import {
  useQuery,
} from '@tanstack/react-query'
import { getProperties, getPropertiesCategories } from '../../apis/property.api'
import { QUERY_KEYS } from '../constants/keys'

export const useGetProperties = (category_id) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROPERTIES, category_id],
    queryFn: () => getProperties(category_id),
    staleTime: 20 * 1000
  })
}

export const useGetPropertiesCategories = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROPERTIES_CATEGORIES],
    queryFn: getPropertiesCategories,
    staleTime: 50 * 1000
  })
}
