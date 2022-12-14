import React, { useState } from 'react';
import {Button, Htag, Rating, P, Tag, Input, TextArea } from '../components';
import {withLayout} from "../layout/Layout";
import {GetStaticProps} from "next";
import axios from "axios";
import {MenuItem} from "../interfaces/menu.interface";


function Home({menu}: HomeProps): JSX.Element {
    const [rating, setRating] = useState<number>(4)
    console.log(process.env.NEXT_PUBLIC_DOMAIN)

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
            <Rating rating={rating} isEditable setRating={setRating}/>
            <Input placeholder='test'/>
            <TextArea placeholder='Textarea'/>
        </>
    )
}
export default withLayout(Home)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
     const firstCategory = 0;
     const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
         firstCategory
     });
     console.log(process.env.NEXT_PUBLIC_DOMAIN)

     return {
         props: {
             menu,
             firstCategory
         }
     };
};

interface HomeProps extends Record<string, unknown>{
    menu: MenuItem[];
    firstCategory: number;
}
