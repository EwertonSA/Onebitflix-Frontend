import { useRouter } from "next/router";
import { CourseType, EpisodeType } from "../../services/courseService";
import styles from "./styles.module.scss";
interface props{
    episode:EpisodeType;
    course:CourseType;
}
const EpisodeList=({episode,course}:props)=>{

    const router=useRouter();


    const handleSecondsTomin=(totalSeconds:number)=>{
        const minutes= Math.floor(totalSeconds/60);
        const seconds=totalSeconds%60;
        function toString(num:number){
            return num.toString().padStart(2,'0')
        }
        const result= `${toString(minutes)}:${toString(seconds)}`;
        return result;
    }
    const handleEpisodePlayer=()=>{
        router.push(`/courses/episode/${episode.order-1}?courseid=${course.id}&episodeid=${episode.id}`)
    }
    return( <>
    <div className={styles.episodeCard} onClick={handleEpisodePlayer}>
    <div className={styles.episodeOrder}>
        <p>Episode nº {episode.order}</p>
        <p className={styles.episodeTime}>{handleSecondsTomin(episode.secondsLong)}</p>
    </div>
    <div className={styles.episodeTitleDescription}>
        <p className={styles.episodeTitle}>{episode.name}</p>
        <p className={styles.episodeDescription}>
            {episode.synopsis}
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
         Animi ratione tempora minima quod, minus aperiam.</p>
    </div>
    </div>
    </>)
}
export default EpisodeList;