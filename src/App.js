import { useState,useEffect } from 'react';
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Content from './components/Content/Content';
import AddItem from './components/Content/AddItem';
import SearchItem  from './components/Search/SearchItem';
import apiRequest from './API/apiRequest';

function App() {

  //API URL
   const API_URL = 'http://localhost:3500/items';
  //useState
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');  
  const [search,setSearch] = useState ('')
  const [fetchError,setFetchError] = useState (null)
  const [isLoading,setIsLoading] = useState(true)


  useEffect(()=>{
    const fetchItems = async()=>{
      try {
          const response = await fetch(API_URL); 
          if(!response.ok) throw Error("didn't received expected data")
          const listItems = await response.json();
          setItems(listItems);
          setFetchError(null)
      } catch (error) {
        setFetchError(error.message)
      } finally{
        setIsLoading(false)
      }
    }
    setTimeout(()=>{
      (async()=>fetchItems())();
    },2000)
  },[])
 
  


 const addItem = async (item)=>{
    // generate a new id
    const id = items.length ? items[items.length -1].id + 1: 1;
    
    //myNewItem
    const myNewItem = {id,checked:false,item};
   
    //add myNewItem to a list 
    const listItems = [...items,myNewItem];
    setItems(listItems)

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
 }

  const handleCheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems)

    /* use for API */
    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  }

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id === id);
    setItems(listItems)

    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
      
    //verify is the value isn't empty
    if(!newItem) return;
    //add item : set a new item
    addItem(newItem);
    setNewItem('');        
  }

  
  //implement functions

/*   const setAndSaveItems = (newItems)=>{
    setItems(newItems);
    
  } */

  return (
    <div className="App">
      {/* my header */}
       <Header 
          title={"Groceries list"}
        />
      
      {/* add a new Item component */}
       <AddItem 
          newItem={newItem}
          setNewItem={setNewItem}
          handleSubmit={handleSubmit}
       />

      {/*  add search bar */}
       <SearchItem 
         search = {search}
         setSearch = {setSearch}
      />
        <main>
           {isLoading && <p>is loading...</p>}
           {fetchError && !isLoading && <p style={{color : "red"}}>{`Error : ${fetchError}`}</p>}
          {!fetchError && <Content
              items={items.filter(item=>(item.item).toLowerCase().includes(search.toLocaleLowerCase()))}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
          />}
        </main>

        {/* mon footer */}
       <Footer 
          length={items.length} 
        />
    </div>
  );
}

export default App;
