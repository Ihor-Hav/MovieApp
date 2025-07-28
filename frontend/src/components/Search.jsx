import React from 'react'
import { Search } from 'lucide-react'

export default function SearchField({searchTerm, setSearchTerm}) {

  return (
    <div className='flex justify-center w-[45%]'>
        <div className='min-h-12 w-full relative'>
            <Search className='absolute left-[10px] top-[50%] translate-y-[-50%] z-10'/>

            <input type="text" placeholder='Search through thousands of movies' 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='input w-full min-h-full px-12 border-0 border-blue-800 outline-0 active:outline-0 focus:outline-0 focus:border-1'/>
        </div>
    </div>
  )
}
