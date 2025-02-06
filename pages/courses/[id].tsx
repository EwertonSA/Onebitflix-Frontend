import Head from "next/head";
import styles from "../../styles/coursePage.module.scss";
import HeaderAuth from "../../src/components/common/headerAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import courseService, { CourseType } from "../../src/services/courseService";
import { Button, Container } from "reactstrap";
import PageSpinner from "../../src/components/common/spinner";
import EpisodeList from "../../src/components/episodeList";

const CoursePage= ()=>{
    const [course,setCourse]= useState<CourseType>()
    const router=useRouter();
    const [liked,setLiked]=useState(false)
    const[favorited,setFavorited]=useState(false)
    const [loading,setLoading]=useState(true)
    const {id}=router.query;
    useEffect(()=>{
        if(!sessionStorage.getItem('onebitflix-token')){
        router.push('/login')
        }else{
          setLoading(false)  
        }
        
            },[])
            if(loading){
                return <PageSpinner/>
            }
            
    const getCourse = async () => {
        if (typeof id !== "string") return;
        const res = await courseService.getEpisodes(id);
        console.log("Response from API:", res);
        if (res.status === 200) {
            console.log("Course data:", res.data);
            setCourse(res.data);
            setLiked(res.data.liked);
            setFavorited(res.data.favorited);
        }
    };


    useEffect(()=>{
getCourse()
    },[id])
    const handleLikeCourse=async()=>{
        if(typeof id != 'string')return
        if(liked===true){
            await courseService.removeLike(id)
            setLiked(false)
        }else{
            await courseService.like(id)
            setLiked(true)
        }
    }
    const handleFavCourse=async()=>{
        if(typeof id != "string")return
        if(favorited===true){
            await courseService.removeFav(id)
            setFavorited(false)
        }else{
            await courseService.addToFav(id)
            setFavorited(true)
        }
    }
    if(course === undefined){
        return(
            <PageSpinner/>
        )
    }

    return <>
    <Head>
        <title>Onebitflix- {"nomeDoCurso"}</title>
        <link rel="shotcut icon" href="/favicon.svg" type="image/x-icon">
        
        </link>
    </Head>
    <main>
      <div style={
        {backgroundImage:`linear-gradient(to bottom,#6666661a,#151515),
            url(${process.env.NEXT_PUBLIC_BASEURL}/${course?.thumbnailUrl})`,
        backgroundSize:"cover",
        backgroundPosition:"center",
        minHeight:"450px",
    }
      }>
      <HeaderAuth/>
     
     <Container className={styles.courseInfo}>
        <p className={styles.courseTitle}>{course?.name}</p>
        <p className={styles.courseDescription}>{course?.synopsis}</p>
        
        <Button outline className={styles.courseBtn} disabled={course?.episodes?.length===0?true:false}>
            ASSISTIR AGORA!
            <img src="/buttonPlay.svg" alt="buttonImg" className={styles.buttonImg}/>
        </Button>

        <div className={styles.interations}>
            {liked === false?(
                
            <img src="/course/iconLike.svg" alt="buttonImg" className={styles.interationsImg} 
            onClick={handleLikeCourse} />
            ):(
                
            <img src="/course/iconLiked.svg" alt="buttonImg" className={styles.interationsImg} 
            onClick={handleLikeCourse}/>
            )}
            
            {favorited === false?
            
            (<img src="/course/iconAddFav.svg" alt="buttonImg" 
            className={styles.interationsImg}  
            onClick={handleFavCourse}/>):
            
            (<img src="/course/iconFavorited.svg" 
            alt="buttonImg" 
            className={styles.interationsImg}  
            onClick={handleFavCourse}/>)}
        
        </div>
     </Container>
     <Container className={styles.episodeInfo}>
        <p className={styles.episodeDivision}>EPISÓDIOS</p>
        <p className={styles.episodeLength}>
            {course?.episodes?.length} episódios</p>
      
            {course?.episodes?.length > 0 ? (
    course.episodes.map((episode) => (
        <EpisodeList key={episode.id} episode={episode} course={course}/>
    ))
) : (
    <strong><p>Nenhum episódio encontrado. &#x1f606; &#xf919; &#x1f300;</p></strong>
)}
     </Container>
      </div>
    </main>
    </>
}
export default CoursePage