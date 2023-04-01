import { useCallback, useRef, useState} from 'react';
import {URL_STOCK} from '../constants/baseURL';

export default function SearchAdd({addFunction}) {
  const searchRef = useRef(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(false)
  const [results, setResults] = useState([])

  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query)
    if (query.length) {
      fetch(`${URL_STOCK}/ticker?stock=${query}`)
      .then(response => response.json())
      .then(data => {
        setResults(data)
      })
    } else {
      setResults([])
    }
  }, [])

  const onFocus = useCallback(() => {
    setActive(true)
    window.addEventListener('click', Click)
  }, [])

  const Click = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false)
      window.removeEventListener('click', Click)
    }
  }, [])

  return (
    <div
      ref={searchRef}
    >
      <input
        onChange={onChange}
        onFocus={onFocus}
        type='text'
        value={query}
        className="bg-yellow-500 text-xs md:text-sm lg:text-lg text-black
          outline-none ml-10 w-[50%] px-1" 
        
      />
      { active && results.length > 0 && (
        <ul>
          {results.map(({ _id, id, equity_name }) => (
            <li  key={_id} className="list-none absolute ">
              <button onClick={(e) => addFunction(e, id)}
                value={id}>
                <div className="bg-gray-700 flex h-10 items-center cursor-pointer p-2 text-white relative left-10 top-0.5">
                  <span className="mr-4">{id}</span>
                  <span>{equity_name}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      ) }
    </div>
  )
}
