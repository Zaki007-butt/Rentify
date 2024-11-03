import { useMutation } from "@tanstack/react-query";
import { createProperty, updateProperty, deleteSingleProperty } from "../../apis/property.api";
import { queryClient } from "../../main";
import { PROPERTIES_PAGE_SIZE, QUERY_KEYS } from "../constants/keys";

export const useCreatePropertyMutation = () => {
  return useMutation({
    mutationFn: createProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROPERTIES] });
    },
  });
};

export const useUpdatePropertyMutation = (propertyID) => {
  return useMutation({
    mutationFn: updateProperty,
    onSuccess: () => {
      if (propertyID)
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROPERTIES, propertyID] });
    },
  });
};

export const useDeletePropertyMutation = () => {
  return useMutation({
    mutationFn: deleteSingleProperty,
    onSuccess: () => {
      let categoryID, subcategoryID, searchKeyword;

      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.PROPERTIES,
          categoryID,
          subcategoryID,
          searchKeyword,
          PROPERTIES_PAGE_SIZE,
        ],
      });
    },
  });
};
