import React from 'react'

const PropertyCard = ({id, title, description, price, address}) => {
  return (
    <div class="relative mx-auto w-full">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.0/css/all.css" integrity="sha384-Bfad6CLCknfcloXFOyFnlgtENryhrpZCe29RTifKEixXQZ38WheV+i/6YWSzkz3V" crossorigin="anonymous" />
      <a href="#" class="relative inline-block w-full transform transition-transform duration-300 ease-in-out hover:-translate-y-2">
        <div class="rounded-lg bg-white p-4 shadow">
          <div class="relative flex h-52 justify-center overflow-hidden rounded-lg">
            <div class="w-full transform transition-transform duration-500 ease-in-out hover:scale-110">
              <div class="absolute inset-0 bg-black bg-opacity-80">
                <img src="https://assets.entrepreneur.com/content/3x2/2000/20150622231001-for-sale-real-estate-home-house.jpeg?crop=16:9" alt="" />
              </div>
            </div>

            <div class="absolute bottom-0 left-5 mb-3 flex">
              <p class="flex items-center font-medium text-white shadow-sm">
                <i class="fa fa-camera mr-2 text-xl text-white"></i>
                10
              </p>
            </div>
            <div class="absolute bottom-0 right-5 mb-3 flex">
              <p class="flex items-center font-medium text-gray-800">
                <i class="fa fa-heart mr-2 text-2xl text-white"></i>
              </p>
            </div>

            <span class="absolute top-0 right-2 z-10 mt-3 ml-3 inline-flex select-none rounded-sm bg-[#1f93ff] px-2 py-1 text-xs font-semibold text-white"> Commercial </span>
            <span class="absolute top-0 left-0 z-10 mt-3 ml-3 inline-flex select-none rounded-lg bg-transparent px-3 py-2 text-lg font-medium text-white"> <i class="fa fa-star"></i> </span>
          </div>

          <div class="mt-4">
            <h2 class="line-clamp-1 text-2xl font-medium text-gray-800 md:text-lg" title="New York">{ title }</h2>

            <p class="text-primary mt-2 inline-block whitespace-nowrap rounded-xl font-semibold leading-tight">
              <span class="text-sm uppercase"> PKR </span>
              <span class="text-2xl">{ price }</span>
            </p>
          </div>
          <div class="mt-4">
            <p class="line-clamp-1 mt-2 text-lg text-gray-800">{ description }</p>
          </div>
          <div class="justify-center">
            <div class="mt-4 flex space-x-3 overflow-hidden rounded-lg px-1 py-1">
              <p class="flex items-center font-medium text-gray-800">
                <i class="fa fa-bed mr-2 text-blue-900"></i>
                2
              </p>

              <p class="flex items-center font-medium text-gray-800">
                <i class="fa fa-bath mr-2 text-blue-900"></i>
                3
              </p>
              <p class="flex items-center font-medium text-gray-800">
                <i class="fa fa-home mr-2 text-blue-900"></i>
                2000 Yd<sup>2</sup>
              </p>
            </div>
          </div>
          <div class="mt-8 grid grid-cols-2">
            <div class="flex items-center">
              <div class="relative">
                <div class="h-6 w-6 rounded-full bg-gray-200 md:h-8 md:w-8"></div>
                <span class="bg-primary-red absolute top-0 right-0 inline-block h-3 w-3 rounded-full"></span>
              </div>

              <p class="line-clamp-1 ml-2 text-gray-800">Zakriya Butt </p>
            </div>

            <div class="flex justify-end">
              <button><i class="fa fa-sms mx-1 rounded-md bg-[#0174E1] py-1 px-3 text-2xl text-white"></i></button>
              <button><i class="fa fa-phone rounded-md bg-[#0174E1] py-1 px-3 text-2xl text-white"></i></button>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}

export default PropertyCard