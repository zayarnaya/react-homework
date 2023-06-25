'use client'

// import Image from 'next/image'
// import styles from './page.module.scss'
// import './page.scss';
import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';
import { TicketCard } from './components/TicketCard/TicketCard';
import { useGetMoviesQuery } from './redux/services/services';
import './page.scss';
import { Spinner } from './components/Spinner/Spinner';


export default function Home() {
  const { data, isLoading, error } = useGetMoviesQuery({});

  if (isLoading) {
    return <main><span>Подождем... <Spinner /></span></main>;
  }
  
  // const { title, posterUrl, releaseYear, description, director, genre, id, rating, reviewIds } = data;
  console.log(data);
  return (
    <main>
      <div className='films'>

        <ul className='films__list'>
          {data && data.map(item => (
            <li className='films__list_item' key={item.id}><TicketCard {...item} /></li>
          ))}
        </ul>
      </div>
        
    </main>
  )
}
