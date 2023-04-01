import { useCallback, useRef, useState, useContext } from 'react';
import { AuthStateContext } from '../context/GlobalContext';
import Link from 'next/link';
import {URL_STOCK} from '../constants/baseURL';
import { STOCK } from '../constants/routers';

export default function Search(page_ticker) {
  const state = useContext(AuthStateContext);
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
    window.addEventListener('click', onClick)
  }, [])

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false)
      window.removeEventListener('click', onClick)
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
        placeholder={page_ticker.page_ticker}
        className="bg-yellow-500 text-xs md:text-sm lg:text-lg text-black
        placeholder-black outline-none relative md:h-10 lg:h-10 h-7 pl-2 w-[30%]" 
        
      />
      { active && results.length > 0 && (
        <ul>
          {results.map(({ _id, id, equity_name }) => (
            <li  key={_id} className="list-none absolute ">
              <Link href={`${STOCK}/${id}&${state.accessToken}`}>
                <div className="bg-gray-700 flex h-10 items-center cursor-pointer p-2 text-white">
                  <span className="mr-4">{id}</span>
                  <span>{equity_name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) }
    </div>
  )
}
