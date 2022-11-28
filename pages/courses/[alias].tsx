import React, { useState } from 'react';
import {withLayout} from "../../layout/Layout";
import {GetStaticProps, GetStaticPropsContext} from "next";
import axios from "axios";
import {MenuItem} from "../../interfaces/menu.interface";
import {TopPageModel} from "../../interfaces/page.interface";
import {ParsedUrlQuery} from "querystring";

function Courses({menu}: CourseProps): JSX.Element {
        return (
        <>

        </>
    )
}
export default withLayout(Courses)

export const getStaticProps: GetStaticProps<CourseProps> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>) => {
    if(!params) {
        return {
            notFound: true
        }
    }
    const firstCategory = 0;
    const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
        firstCategory
    });
    const {data: page} = await axios.get<TopPageModel>(process.env.NEXT_PUBLIC_DOMAIN
        + '/api/top-page/byAlias/'
        + params.alias);
    console.log(process.env.NEXT_PUBLIC_DOMAIN)

    return {
        props: {
            menu,
            firstCategory,
            page
        }
    };
};

interface CourseProps extends Record<string, unknown>{
    menu: MenuItem[];
    firstCategory: number;
    page: TopPageModel;
}
