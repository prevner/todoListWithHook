import React, { useRef } from 'react'
import { FaPlus } from 'react-icons/fa'
const AddItem = ({newItem, setNewItem, handleSubmit}) => {
    const inputRef = useRef();
  return (
    <form className='addForm' onSubmit={(e)=>handleSubmit(e)}>
        <label htmlFor='addItem'> Add Item</label>
        <input
            autoFocus
            ref={inputRef}
            type='text'
            placeholder='Add Item'
            id='addItem'
            required
            value={newItem}
            onChange={(e)=>setNewItem(e.target.value)}
        />
     <button 
        type='submit'
        arria-label="Add Item"
        onClick={(e)=>inputRef.current.focus()}
      >
        <FaPlus />
      </button>
    </form>
  )
}

export default AddItem
