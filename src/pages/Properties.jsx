import React from 'react'
import PropertyCard from '../components/cards/PropertyCard'
import { useGetProperties } from '../react-query/queries/property.queries'
import Dropdown from '../components/shared/Dropdown'

const Properties = () => {
  const { data: response, isPending } = useGetProperties()

  if (isPending) {
    return <h1>Loading...</h1>
  }

  return (
    <div className='container mx-auto'>
      <div className="flex">
        <Dropdown filterField="Category"/>
        <Dropdown filterField="Type"/>
      </div>
      <div class="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {
          response.data.results.length > 0 && response.data.results.map(property => (
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
          ))
        }
      </div>
    </div>
  )
}

export default Properties