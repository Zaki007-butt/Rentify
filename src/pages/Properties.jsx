import React, { useState } from 'react'
import PropertyCard from '../components/cards/PropertyCard'
import { useGetProperties, useGetPropertiesCategories } from '../react-query/queries/property.queries'
import Dropdown from '../components/shared/Dropdown'
import { Link, useSearchParams } from 'react-router-dom'
import SearchBar from '../components/shared/SearchBar'
import Loader from '../components/shared/Loader'

const Properties = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [categoryID, setCategoryID] = useState(searchParams.get('category_id') || '')
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get('search') || '')
  const { data: response, isPending } = useGetProperties(categoryID, searchKeyword)
  const { data: categories } = useGetPropertiesCategories()

  const updateCategoryId = (ID) => {
    if (ID) {
      setCategoryID(ID)
      setSearchParams({ "category_id": ID })
    } else {
      searchParams.delete('category_id')
      setSearchParams(searchParams)
      setCategoryID('')
    }
  }

  const updateSearchKeyword = (search) => {
    setSearchKeyword(search)
    setSearchParams({ "search": search })
  }

  return (
    <div className='container mx-auto'>
      <div className="flex items-center justify-between w-full">
        <Dropdown
          filterField="Category"
          list={categories}
          setElement={updateCategoryId}
        />
        <SearchBar searchKeyword={searchKeyword} updateSearchKeyword={updateSearchKeyword} />
      </div>
      <div class="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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