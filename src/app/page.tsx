'use client'

// import Image from 'next/image'
// import styles from './page.module.scss'
import styles from '../app/components/Filters/Filters.module.scss';
// import './page.scss';
import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';
import { TicketCard } from './components/TicketCard/TicketCard';
import { useGetCinemaQuery, useGetMoviesQuery } from './redux/services/services';
import './page.scss';
import { Spinner } from './components/Spinner/Spinner';
import { createRef, forwardRef, useEffect, useRef, useState } from 'react';
import { Filters, filter } from './components/Filters/Filters';
import { useDispatch, useSelector } from 'react-redux';
import { moviesActions } from './redux/features/movies';
import { Films } from './components/Films/Films';
import { selectOneFilter } from './redux/features/filters/selector';
import { filterSliceActions } from './redux/features/filters';
import { createPortal } from 'react-dom';
import { genres } from './utils/consts';


export default function Home() {
  const cinemas = [
    {
      id: "CTfrB5PGEJHBwxCNlU4uo",
      name: "Синема сад",
    },
    {
      id: "2a2976KdjBek0e2ZR_07V",
      name: "4 с половиной звезды",
    },
    {
      id: "4gJr8UOYvT7UuprciZ4iL",
      name: "Дружба",
    },
  ];
  const [list, setList] = useState();
  const [titleQuery, setTitleQuery] = useState('');
  const [genreQuery, setGenreQuery] = useState('');
  const [cinemaQuery, setCinemaQuery] = useState('');
  const [cinemaId, setCinemaId] = useState('');
  const [cinemaFilms, setCinemaFilms] = useState([]);
  const [genreCoords, setGenreCoords] = useState([0, 0, 0, 0]);
  const [cinemaCoords, setCinemaCoords] = useState([0, 0, 0, 0]);
  const [isOpenGenre, setIsOpenGenre] = useState(false);
  const [isOpenCinema, setIsOpenCinema] = useState(false);
  const { data, isLoading, error } = useGetMoviesQuery({});
  const cinemaData = useGetCinemaQuery(cinemaId);
  const titleRef = useRef<HTMLInputElement>(null);
  // const titleRef = createRef();
  const genreRef = useRef<HTMLInputElement>(null);
  const cinemaRef= useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const titleInput = titleRef.current;
    const genreSelect = genreRef.current;
    const cinemaSelect = cinemaRef.current;
    const coordsGenre = genreSelect?.getBoundingClientRect();
    const coordsCinema = cinemaSelect?.getBoundingClientRect();
    if (!!coordsGenre && !!coordsCinema) {
      setGenreCoords([coordsGenre.bottom, coordsGenre.left, coordsGenre.top, coordsGenre.right]);
      setCinemaCoords([coordsCinema.bottom, coordsCinema.left, coordsCinema.top, coordsCinema.right]);
    }
    // console.log('INPUT', titleInput);
    titleInput?.addEventListener("input", (e) => {setTitleQuery(e.target.value)})
    genreSelect?.addEventListener('focus', (e) => {setIsOpenGenre(true); (e.target as HTMLInputElement).classList.add('active'); (e.target as HTMLInputElement).previousElementSibling?.classList.add('active'); });
    // genreSelect?.addEventListener('blur', () => {setIsOpenGenre(false)})
    cinemaSelect?.addEventListener('focus', (e) => {setIsOpenCinema(true);  (e.target as HTMLInputElement).classList.add('active'); (e.target as HTMLInputElement).previousElementSibling?.classList.add('active');})
    // cinemaSelect?.addEventListener('blur', () => {setIsOpenCinema(false)})
        
    setList(data);
    return () => {
      titleInput?.removeEventListener("input", (e) => {setTitleQuery(e.target.value)})
      genreSelect?.removeEventListener('focus', () => {setIsOpenGenre(true)})
      genreSelect?.removeEventListener('blur', () => {setIsOpenGenre(false)})
      cinemaSelect?.removeEventListener('focus', () => {setIsOpenCinema(true)})
      cinemaSelect?.removeEventListener('blur', () => {setIsOpenCinema(false)})
    }
  }, [data, genreQuery, cinemaQuery])
  useEffect(() => {
    if (cinemaData) setCinemaFilms(cinemaData.data)
  },[cinemaData, cinemaQuery, cinemaId])
  if (isLoading) {
    return <main><span>Подождем... <Spinner /></span></main>;
  }
  
  !!data && dispatch(moviesActions.addAll(data));
  // setList(data);
  console.log('LIST', list);

  
  // const { title, posterUrl, releaseYear, description, director, genre, id, rating, reviewIds } = data;
  let filtered = [];
  if(!!list) {
      filtered = filter(list, 'title', titleQuery);
      filtered = filter(filtered, 'genre', genreQuery);
      if (!!cinemaQuery) {
        // console.log(cinemaFilms);
        filtered = cinemaFilms;
      }

      console.log(filtered);
  }

  return (
<>
      {/* <Filters ref={titleRef}/> */}
      {!!isOpenCinema && createPortal(
        <div onBlur={() => {
          setIsOpenCinema(false);
        }} className={styles.select__flyout} style={{top: cinemaCoords[0] + 4, left: cinemaCoords[1]}}>
          <button className={styles.select__item} onClick={() => {
            setCinemaQuery('');
            setCinemaId('');
          }}>Не выбран</button>
          {cinemas.map((cinema) => {
            return <button key={cinema.id} id={cinema.id} className={styles.select__item} onClick={(e) => {
              setCinemaQuery((e.target as Element).textContent || '');
              setCinemaId((e.target as Element).id);

            }}>{cinema.name}</button>
          })}
        </div>, document.body
      )}
      {!!isOpenGenre && createPortal(
        <div onBlur={() => {
          setIsOpenGenre(false);
        }} className={styles.select__flyout} style={{top: genreCoords[0] + 4, left: genreCoords[1]}}>
          <button className={styles.select__item} onClick={(e) => {
                        // console.log(genreRef.current);
                        // genreRef.current?.focus();
            setGenreQuery('');


          }}>Не выбран</button>
          {Object.keys(genres).map((g, index) => {
            return <button key={g + index} id={g} className={styles.select__item} onClick={(e) => {
              setGenreQuery((e.target as Element).id);

            }}>{genres[g]}</button>
          })}
        </div>, document.body
      )}
      <div className={styles.filters}>
      <Input ref={titleRef} label={'Название'} placeholder={'Введите название'} onChange={(e) => {setTitleQuery(e.target.value)  }}/>
      <Input onButtonClick={(e) => {
        if (!isOpenGenre) {
          (e.target as HTMLElement).classList.add('active');
        } else {
          (e.target as HTMLElement).classList.remove('active');
        }
        setIsOpenGenre(!isOpenGenre);
        
      }} select={true} ref={genreRef} label={'Жанр'} placeholder={genreQuery ? genres[genreQuery] : 'Выберите жанр'}/>
      <Input select={true} ref={cinemaRef} label={'Кинотеатр'} placeholder={cinemaQuery || 'Выберите кинотеатр'}/>
        </div>
      {!!data && <Films films = {filtered}/>}

      </>
  )
}
