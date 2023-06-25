'use client'
// РАБОТАЕТ фильтр
import { useEffect, useRef, useState } from 'react'
import { Input } from '../components/Input/Input'
import { useGetMoviesQuery } from '../redux/services/services'
import { filter } from '../components/Filters/Filters'
import { createPortal } from 'react-dom'

const Main = data => {
  console.log(data)
  return <></>
}

const Filterrr = () => {
  const { data, isLoading, error } = useGetMoviesQuery({})
  const [list, setList] = useState()
  const [query, setFilter] = useState('')
  const [coords, setCoords] = useState([0, 0])
  const [isGenreOpen, setGenreOpen] = useState(false)
  console.log('LIST', list)
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const input = ref.current
    input?.addEventListener('focus', e => {
      setGenreOpen(true)
    })
    input?.addEventListener('blur', e => {
      setGenreOpen(false)
    })
    const rect = input?.getBoundingClientRect()
    if (rect) setCoords([rect.bottom, rect.left])
    console.log(input)
    setList(data)
  }, [data])

  console.log(ref.current)

  if (isLoading) {
    return <span>щащаща</span>
  }

  let filtered = []
  if (!!list) {
    filtered = filter(list, 'title', query)
    console.log(filtered)
  }
  return (
    <>
      <Input ref={ref} />
      {!!isGenreOpen &&
        createPortal(
          <div
            style={{ position: 'absolute', left: coords[1], top: coords[0] }}>
            kjwghl hkqerjhgkwqlhkwgh ;queweiuf
          </div>,
          document.body
        )}
      <ul>
        {!!list && filtered.map(item => <li key={item.id}>{item.title}</li>)}
      </ul>
    </>
  )
}

export default Filterrr
