"use client";

import Link from "next/link";
import React, { useCallback, useContext, useState } from "react";
import styles from './qanda.module.scss';

const AccordionContext: React.Context<{
  activeGroup?: string;
  switchGroup?: (title: string) => void;
}> = React.createContext({});

const Accordion = ({ children } : { children: React.ReactNode }) => {
  const [activeGroup, setActiveGroup] = useState<string>();

  const switchGroup = useCallback((title: string) => {
    setActiveGroup(title);
  }, []);

  return (
    <AccordionContext.Provider value={{ activeGroup, switchGroup }}>
      {children}
    </AccordionContext.Provider>
  );
};

Accordion.Group = function MenuGroup({ children, title } : { children: React.ReactNode, title: string }) {
  const { activeGroup, switchGroup } = useContext(AccordionContext);
  return (
    <div className={styles.accordion__item}>
      <button className={styles.accordion__title} onClick={() => switchGroup && switchGroup(title)}><h2>{title}</h2></button>
      {activeGroup === title && <div>{children}</div>}
    </div>
     

  );
};

Accordion.Item = function MenuItem({ title, children } : { title: string, children: React.ReactNode }) {
  return <div className={styles.accordion__text}>{title}{children}</div>;
};

const toCart = () => {
  return <Link href="/cart">Корзину</Link>
}

export default function CompoundComponent() {
  return (
    <>
      <Accordion>
        <Accordion.Group title="Что такое Билетопоиск?">
          <Accordion.Item title="Мы — крупнейший сервис о кино в рунете. На нем вы сможете посмотреть фильмы и сериалы, купить билеты в кино, узнать рейтинги популярных видео и интересные факты, поставить фильмам оценки, написать рецензии и дополнить описание фильмов." >{}</Accordion.Item>
        </Accordion.Group>
        <Accordion.Group title="Какой компании принадлежит Билетопоиск?">
          <Accordion.Item title="Владельцем проекта являлась компания ООО «Билетопоиск», которой принадлежало 60 % акций проекта, 40 % акций принадлежало её совладельцу — французской компании ООО AlloCiné. 15 октября 2013 года сервис купила компания «Яндекс» (размер сделки — $80 млн, около 2,6 млрд рублей на то время).">{}</Accordion.Item>
        </Accordion.Group>
        <Accordion.Group title="Как купить билет на Билетопоиск?">
          <Accordion.Item title="Выберите нужное количество билетов и перейдите в ">{toCart()}</Accordion.Item>
        </Accordion.Group>
        <Accordion.Group title="Как оставить отзыв на Билетопоиск?">
          <Accordion.Item title="Пока никак. Но вы можете посмотреть на чужие отзывы!">{}</Accordion.Item>
        </Accordion.Group>
      </Accordion>
    </>
  );
}
