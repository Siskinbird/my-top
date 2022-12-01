import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import {Rating} from "../Rating/Rating";
import {Input} from "../Input/Input";
import {TextArea} from "../Textarea/TextArea";
import {Button} from "../Button/Button";
import CloseIcon from "./close.svg"

export const ReviewForm = ({productId, className, ...props}: ReviewFormProps): JSX.Element => {
    return (
        <>
            <div className={cn(styles.reviewForm, className)}
                 {...props}
            >
                <Input className={styles.title} placeholder='Имя'/>
                <Input className={styles.title} placeholder='Заголовок отзыва'/>
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Rating rating={0}/>
                </div>
                <TextArea placeholder='Текст отзыва' className={styles.description}/>
                <div className={styles.submit}>
                    <Button appearance='primary'>Отправить</Button>
                    <span
                        className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>
            <div className={styles.success}>
                <div className={styles.successTitle}>Ваш отзыв отправлен</div>
                <div>
                    Спасибо, ваш отзыв будет опубликован после проверки
                </div>
                <CloseIcon className={styles.close}/>
            </div>
        </>
    );
};