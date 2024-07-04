import React from 'react'
import PropertyCard from './cards/PropertyCard'
import { useGetProperties } from '../react-query/queries/property.queries'

const Properties = () => {
  const { data: response, isPending } = useGetProperties()
 
  if (isPending) {
    return <h1>Loading...</h1>
  }

  return (
    <div class="container mx-auto grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-32">
      {
        response.data.results.length > 0 && response.data.results.map(property => (
          <PropertyCard
            id={property.id}
            title={property.title}
            description={property.description}
            price={property.price}
            address={property.address}
          />
        ))
      }
    </div>
  )
}

export default Properties