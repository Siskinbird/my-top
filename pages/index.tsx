import React, { useState } from 'react';
import { Button } from '../components/Button/Button';
import {Htag} from "../components/Htag/Htag";
import { P } from '../components/P/P';
import { Tag } from '../components/Tag/Tag';
// import { Button, Htag, P, Tag } from '../components';

export default function Home() {
  return (
    <>
      <Htag tag='h1'>Заголовок</Htag>
      <Button appearance='primary' arrow='right'>Кнопка</Button>
      <Button appearance='ghost' arrow='down'>Кнопка</Button>
      <P size='l'>Большой</P>
      <P>Средний</P>
      <P size='s'>Маленький</P>
      <Tag size='s'>Ghost</Tag>
      <Tag size='m' color='red'>Red</Tag>
      <Tag size='s' color='green'>Green</Tag>
      <Tag color='primary'>Green</Tag>
    </>
  )
}
