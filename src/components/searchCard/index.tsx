import Link from "next/link";
import { CourseType } from "../../services/courseService";
import styles from "./styles.module.scss";
interface props{
    course:CourseType
}
const SearchCard=({course}:props)=>{
    return <>
    <Link href={`/courses/${course.id}`}>
    <div className={styles.searchCard}>
        <img src={`${process.env.NEXT_PUBLIC_BASEURL}/${course.thumbnailUrl}`}
         alt={course.name} 
         className={styles.searchCardImg}/>
        <p className={styles.searchCard}>{course.name}</p>
        <p className={styles.searchCardDescription}>{course.synopsis}</p>
        <p></p>
    </div>
    
    </Link>
    </>
}
export default SearchCard;