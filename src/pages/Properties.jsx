import React, { useState, useEffect } from 'react'
import PropertyCard from '../components/cards/PropertyCard'
import {
  useGetProperties,
  useGetPropertiesCategories,
  useGetPropertyTypesQuery
} from '../react-query/queries/property.queries'
import Dropdown from '../components/shared/Dropdown'
import { Link, useSearchParams } from 'react-router-dom'
import SearchBar from '../components/shared/SearchBar'
import Loader from '../components/shared/Loader'

const Properties = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [categoryID, setCategoryID] = useState(searchParams.get('category_id') || '')
  const [subcategoryID, setSubcategoryID] = useState(searchParams.get('subcategory_id') || '')
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get('search') || '')
  const { data: response, isPending } = useGetProperties(categoryID, subcategoryID, searchKeyword)
  const { data: categories } = useGetPropertiesCategories()
  const { data: subcategories } = useGetPropertyTypesQuery(categoryID)

  const updateCategoryId = (ID) => {
    if (ID) {
      setCategoryID(ID)
      setSearchParams({ "category_id": ID })
    } else {
      searchParams.delete('category_id')
      setSearchParams(searchParams)
      setCategoryID('')
    }
    setSubcategoryID('')
  }

  const updateSubcategoryId = (ID) => {
    if (ID) {
      setSubcategoryID(ID)
      setSearchParams(prevParams => {
        const newParams = new URLSearchParams(prevParams)
        newParams.set("subcategory_id", ID)
        return newParams
      })
    } else {
      searchParams.delete('subcategory_id')
      setSearchParams(searchParams)
      setSubcategoryID('')
    }
  }

  const updateSearchKeyword = (search) => {
    setSearchKeyword(search)
    setSearchParams({ "search": search })
  }

  const clearCategoryFilter = () => {
    setSearchParams(prevParams => {
      prevParams.delete('category_id')
      return prevParams
    })
    setCategoryID('')
    setSubcategoryID('')
  }

  const clearSubcategoryFilter = () => {
    setSearchParams(prevParams => {
      prevParams.delete('subcategory_id')
      return prevParams
    })
    setSubcategoryID('')
  }

  return (
    <div className='container mx-auto'>
      <div className="flex items-center justify-between w-full">
        <div className='flex'>
          <Dropdown
            filterField="Category"
            list={categories}
            setElement={updateCategoryId}
          />
          {categoryID && <Dropdown
            filterField="Subcategory"
            list={subcategories}
            setElement={updateSubcategoryId}
          />}
        </div>
        <SearchBar searchKeyword={searchKeyword} updateSearchKeyword={updateSearchKeyword} />
      </div>
      <div className='flex pb-8'>
        {categoryID && (
          <div className="flex items-center space-x-2 mr-2">
            <span className="font-semibold">{categories?.find(cat => cat.id === parseInt(categoryID))?.name}</span>
            <button onClick={clearCategoryFilter}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 1a9 9 0 110 18 9 9 0 010-18zm3.293 5.293a1 1 0 10-1.414-1.414L10 8.586 7.121 5.707a1 1 0 00-1.414 1.414L8.586 10l-2.879 2.879a1 1 0 101.414 1.414L10 11.414l2.879 2.879a1 1 0 101.414-1.414L11.414 10l2.879-2.879z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
        {subcategoryID && (
          <div className="flex items-center space-x-2">
            <span className="font-semibold">{subcategories?.find(subcat => subcat.id === parseInt(subcategoryID))?.name}</span>
            <button onClick={clearSubcategoryFilter}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 1a9 9 0 110 18 9 9 0 010-18zm3.293 5.293a1 1 0 10-1.414-1.414L10 8.586 7.121 5.707a1 1 0 00-1.414 1.414L8.586 10l-2.879 2.879a1 1 0 101.414 1.414L10 11.414l2.879 2.879a1 1 0 101.414-1.414L11.414 10l2.879-2.879z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {
          response?.data?.results?.length > 0 && response.data.results.map(property => (
            <Link to={`/properties/${property.id}`} key={property.id}>
              <PropertyCard
                id={property.id}
                title={property.title}
                description={property.description}
                price={property.price}
                address={property.address}
                bedroom={property.bedroom}
                washroom={property.washroom}
                area={property.area}
                property_category_name={property.property_category_name}
              />
            </Link>
          ))
        }
      </div>
      {
        isPending && <div className='flex justify-center items-center w-full h-[80vh]'>
          <Loader />
        </div>
      }
    </div>
  )
}

export default Properties
