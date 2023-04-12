
import React from 'react'

function munubar() {
  return (
    <div>
        <div className ="max-w-2xl mx-auto">

<nav className ="border-gray-200 px-2 mb-10">
  <div className ="container mx-auto flex flex-wrap items-center justify-between">
 
  <div className ="flex md:order-2">
      <div className ="relative mr-3 md:mr-0 hidden md:block">
        <div className ="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className ="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
      </div>
      <button data-collapse-toggle="mobile-menu-3" type="button" className ="md:hidden text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center" aria-controls="mobile-menu-3" aria-expanded="false">
      <span className ="sr-only">Open main menu</span>
      <svg className ="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      <svg className ="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
  </div>
  <div className ="hidden md:flex justify-between items-center w-full md:w-auto md:order-1" id="mobile-menu-3">
    <ul className ="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
      <li>
        <a href="#" className ="bg-blue-700 md:bg-transparent 
                                text-white block pl-3 pr-4 py-2 
                                md:text-blue-700 md:p-0 rounded" 
                                aria-current="page"
                    >Home
        </a>
      </li>
      <li>
        <a href="#" className ="bg-blue-700 md:bg-transparent 
                                text-white block pl-3 pr-4 py-2 
                                md:text-blue-700 md:p-0 rounded" 
                                aria-current="page"
                    >Home
        </a>
      </li>
      <li>
        <a href="#" className ="bg-blue-700 md:bg-transparent 
                                text-white block pl-3 pr-4 py-2 
                                md:text-blue-700 md:p-0 rounded" 
                                aria-current="page"
                    >Home
        </a>
      </li>
      <li>
        <a href="#" className ="bg-blue-700 md:bg-transparent 
                                text-white block pl-3 pr-4 py-2 
                                md:text-blue-700 md:p-0 rounded" 
                                aria-current="page"
                    >Home
        </a>
      </li>
    
    </ul>
  </div>
  </div>
</nav>

    <p className ="mt-5">This navbar element is part of a larger, open-source library of Tailwind CSS components. Learn more by going to the official <a className ="text-blue-600 hover:underline" href="#" target="_blank">Flowbite Documentation</a>.</p>
</div>


    </div>
  )
}

export default munubar