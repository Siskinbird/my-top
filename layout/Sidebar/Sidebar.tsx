import { SidebarProps } from './Sidebar.props';
import styles from './Sidebar.module.css';
import Logo from '../logo.svg'
import {Menu} from "../Menu/Menu";
import cn from "classnames";

export const Sidebar = ({className, ...props}: SidebarProps): JSX.Element => {
    return (
        <div className={cn(className, styles.sidebar)} {...props}>
            <Logo className={styles.logo}/>
            <div>Search</div>
            <Menu/>
        </div>
    );
};