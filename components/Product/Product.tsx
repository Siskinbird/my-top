import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import {Card} from "../Card/Card";
import {Rating} from "../Rating/Rating";
import {Tag} from "../Tag/Tag";
import {Button} from "../Button/Button";
import {declOfNumber, priceRu} from "../../helpers/helpers";
import {Divider} from "../Divider/Divider";
import Image from "next/image";
import {useState} from "react";
import {Review} from "../Review/Review";
import {ReviewForm} from "../ReviewForm/ReviewForm";

export const Product = ({product, className, ...props}: ProductProps): JSX.Element => {
    const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false)

    return (
        <>
        <Card className={styles.product}>
            <div className={styles.logo}>
                <Image src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                       width={70}
                       height={70}
                       alt={product.title}/>
            </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>
                {priceRu(product.price)}
                {product.oldPrice &&
                    <Tag className={styles.oldPrice} color='green'>{priceRu(product.price - product.oldPrice)}</Tag>}
            </div>
            <div className={styles.credit}
            >{priceRu(product.credit)}/
                <span className={styles.month}>мес</span>
            </div>
            <div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating}/></div>
            <div className={styles.tags}>{product.categories.map((c => <Tag className={styles.category} key={c} color='ghost'>{c}</Tag>))}</div>
            <div className={styles.priceTitle}>цена</div>
            <div className={styles.creditTitle}>кредит</div>
            <div className={styles.rateTitle}>{product.reviewCount} {declOfNumber(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</div>
            <div className={styles.hr}>
                <Divider className={styles.hr}/>
            </div>
            <div className={styles.description}>{product.description}</div>
            <div className={styles.feature}>
                {product.characteristics.map(c =>
                    <div className={styles.characteristics} key={c.name}>
                    <span className={styles.characteristicsName}>{c.name}</span>
                        <span className={styles.characteristicsDots}></span>
                        <span className={styles.characteristicsValue}>{c.value}</span>
                </div>)}
            </div>
            <div className={styles.advBlock}>
                {product.advantages && <div className={styles.advantages}>
                    <div className={styles.advTitle}>Преимущества</div>
                    <div>{product.advantages}</div>
                </div>}
                {product.disadvantages && <div className={styles.disadvantages}>
                    <div className={styles.advTitle}>Недостатки</div>
                    <div>{product.disadvantages}</div>
                </div>}
            </div>
            <div className={styles.hr}>
                <Divider className={cn(className, styles.hr2)}/>
            </div>
            <div className={styles.actions}>
                <Button appearance='primary'>Узнать подробнее</Button>
                <Button
                    onClick={ () => setIsReviewOpen(!isReviewOpen)}
                    appearance='ghost'
                    arrow={isReviewOpen ? 'down' : 'right'}
                    className={styles.reviewButton}>Читать отзывы</Button>
            </div>
        </Card>
        <Card color="blue" className={cn(styles.reviews, {
            [styles.opened]: isReviewOpen,
            [styles.closed]: !isReviewOpen,
        })}>
            {product.reviews.map(r => (
                <div key={r._id}>
                    <Review review={r}/>
                    <Divider/>
                </div>
            ))}
            <ReviewForm productId={product._id}/>
        </Card>
        </>
    );
};