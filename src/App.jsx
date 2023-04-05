import { useState,useRef,useCallback } from "react";
import Booksstore from "./booksstore";

function App() {
  const [query, setQuery] = useState("")
  const [pageNumber, setpageNumber] = useState("")

  const {loading, error, books, hasMore} = Booksstore(query, pageNumber);


  const observer = useRef()
  const lastBookElementRef = useCallback(node =>{

    if (loading) return 
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries =>{

        if(entries[0].isIntersecting){
          setpageNumber(prev => prev+1)
        }
      
    })
    if(node) observer.current.observe(node)
  },[loading,hasMore])
  

 

  function handleSearch(e) {
    setQuery(e.target.value);
    setpageNumber(1);
  }
  return (
    <>
      <input type="text" value={query} onChange={handleSearch} />
      {books.map( (book,index) => {
        if(books.length === index+1){
          return <div ref ={lastBookElementRef} key= {book}>{book}</div>
        }
        return <div  key= {book}>{book}</div>
      })}
      <div>{loading && 'isLoading'}</div>
      <div>{error && 'Error'}</div>
    </>
  );
}

export default App;
