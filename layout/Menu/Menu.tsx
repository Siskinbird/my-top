import React, {useContext} from "react";
import {AppContext} from "../../context/app.context";
import {FirstLevelMenuItem, PageItem} from "../../interfaces/menu.interface";
import styles from './Menu.module.css'
import CoursesIcon from './icons/courses.svg'
import BooksIcon from './icons/books.svg'
import ProductsIcon from './icons/products.svg'
import ServicesIcon from './icons/services.svg'
import {TopLevelCategory} from "../../interfaces/page.interface";
import cn from "classnames";
import Link from "next/link";
import {useRouter} from "next/router";


const firstLevelMenu: FirstLevelMenuItem[] = [
    {route: 'courses', name: 'Курсы', icon: <CoursesIcon/>, id: TopLevelCategory.Courses},
    {route: 'services', name: 'Сервисы', icon: <ServicesIcon/>, id: TopLevelCategory.Services},
    {route: 'books', name: 'Книги', icon: <BooksIcon/>, id: TopLevelCategory.Books},
    {route: 'products', name: 'Продукты', icon: <ProductsIcon/>, id: TopLevelCategory.Products}
]






export const Menu = (): JSX.Element => {
    const {menu, setMenu, firstCategory} = useContext(AppContext)
    const router = useRouter()

    const openSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu.map(m=> {
            if (m._id.secondCategory == secondCategory) {
                m.isOpen = !m.isOpen;
            }
            return m;
        }))
    }

    const buildFirstLevel = () => {
        return (
            <>
                {firstLevelMenu.map(m => (
                    <div key={m.route}>
                        <Link href={`/${m.route}`}>

                                <div className={cn(styles.firstLevel, {
                                    [styles.firstLevelActive]: m.id === firstCategory
                                })}>
                                    {m.icon}
                                    <span>{m.name}</span>
                                </div>

                        </Link>
                        {m.id === firstCategory && buildSecondLevel(m)}
                    </div>
                ))}
            </>
        );
    };

    const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
        return (
            <div className={styles.secondBlock}>
                {menu.map(m => {
                    if (m.pages.map(p => p.alias).includes(router.asPath.split('/') [2])) {
                        m.isOpen = true
                    }
                    return (
                        <div key={m._id.secondCategory}>
                            <div className={styles.secondLevel} onClick={() => openSecondLevel(m._id.secondCategory)}>{m._id.secondCategory}</div>
                            <div className={cn(styles.secondLevelBlock, {
                                [styles.secondLevelBlockOpened]: m.isOpen
                            })}>
                                {buildThirdLevel(m.pages, menuItem.route)}
                            </div>
                        </div>)
                })}
            </div>
        )
    }

    const buildThirdLevel = (pages: PageItem[], route: string) => {
        return (
            pages.map(p => (
                <Link key={p._id} href={`/${route}/${p.alias}`}>
                    <div className={cn(styles.thirdLevel, {
                        [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
                    })}>
                        {p.category}
                    </div>
                </Link>
            ))
        )
    };

    return (
        <div className={styles.menu}>
            {buildFirstLevel()}
        </div>
    );
};