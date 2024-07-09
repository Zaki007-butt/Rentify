import {
  useQuery,
} from '@tanstack/react-query'
import { getProperties, getPropertiesCategories, getPropertiesCategoryTypes, getSingleProperty } from '../../apis/property.api'
import { QUERY_KEYS } from '../constants/keys'

export const useGetProperties = (categoryID, subcategoryID, searchKeyword) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROPERTIES, categoryID, subcategoryID, searchKeyword],
    queryFn: () => getProperties(categoryID, subcategoryID, searchKeyword),
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

export const useGetPropertyTypesQuery = (categoryID) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROPERTIES_CATEGORIES_TYPE, categoryID],
    queryFn: () => getPropertiesCategoryTypes(categoryID),
    staleTime: 50 * 1000,
    enabled: !!categoryID
  })
}

export const useGetSingleProperty = (propertyID) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROPERTIES, propertyID],
    queryFn: () => getSingleProperty(propertyID),
    staleTime: 50 * 1000
  })
}
