import React from 'react'
import PropertyCard from './cards/PropertyCard'

const Properties = () => {
  return (
    <div class="container mx-auto grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-32">
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
    </div>
  )
}

export default Properties