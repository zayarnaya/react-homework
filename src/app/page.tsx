// import Image from 'next/image'
// import styles from './page.module.scss'
// import './page.scss';
import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';

export default function Home() {
  return (
    <main>
        <Button variant='yes'>Да</Button>
        <Button variant='no'>Нет</Button>
        <Button variant='plus'></Button>
        <Button variant='minus'></Button>
        <Input placeholder='двлап' label='Название'></Input>
        
    </main>
  )
}
