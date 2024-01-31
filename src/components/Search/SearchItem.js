import React from 'react'

const SearchItem = ({search ,setSearch}) => {
  return (
    <form className='searchForm' onClick={(e)=>e.preventDefault()}>
        <label htmlFor='Search'>Search</label>
        <input 
          id='Search'
          type='text'
          roles='searchBox'
          placeholder='Search Item'
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
      
    </form>
  )
}

export default SearchItem
