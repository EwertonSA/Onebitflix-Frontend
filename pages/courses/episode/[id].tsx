import Head from "next/head"
import styles from "../../../styles/episodePlayer.module.scss";
import { useRouter } from "next/router"
import HeaderGeneric from "../../../src/components/common/headerGeneric"
import courseService, { CourseType } from "../../../src/services/courseService"
import { useEffect, useRef, useState } from "react"
import PageSpinner from "../../../src/components/common/spinner"
import { Button, Container } from "reactstrap"
import ReactPlayer from "react-player"
import watchEpisodeService from "../../../src/services/episodeService";

const EpisodePlayer=()=>{
    const router=useRouter()
    const[course,setCourse]=useState<CourseType>()
    const episodeOrder=parseFloat(router.query.id?.toString()||"")
    const courseId= router.query.courseid?.toString()||""
    const episodeId=parseFloat(router.query.episodeid?.toString()||"")
    const [getEpisodeTime,setGetEpisodeTime]=useState(0)
    const [episodeTime,setEpisodeTime]=useState(0)
    const playerRef= useRef<ReactPlayer>(null)
    const [ isReady,setIsReady]=useState(false);
    const [loading,setLoading]=useState(true)
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
            
    const handleGetEpisodeTime=async()=>{
        const res=await watchEpisodeService.getWatchTime(episodeId) 
        console.log(res)
        if(res.data !== null){
            setGetEpisodeTime(res.data.seconds)
        }
    };
    const handleSetGetEpisodeTime=async()=>{
        await watchEpisodeService.setWhatchTime({
            episodeId:episodeId,
             seconds:Math.round(episodeTime)
        })
       
    }
    useEffect(()=>{
handleGetEpisodeTime()
    },[router])

    const handlePlayerTime=async()=>{
        playerRef.current?.seekTo(getEpisodeTime)
        setIsReady(true)
    }
    if(isReady===true){
        setTimeout(()=>{
            handleSetGetEpisodeTime()
        },1000*3)
    }
    const getCourse=async()=>{
        if(typeof courseId !=='string')return;

        const res=await courseService.getEpisodes(courseId);
        if(res.status===200){
            setCourse(res.data)
        }
    }

    const handleLastEpisode=()=>{
        router.push(`/courses/episode/${episodeOrder-1}?courseid=${course.id}&episodeid=${episodeId-1}`)
    }
    const handleNextEpisode=()=>{
        router.push(`/courses/episode/${episodeOrder+1}?courseid=${course.id}&episodeid=${episodeId+1}`)
    }
    

    useEffect(()=>{
        getCourse()
    },[courseId])
    if(course?.episodes===undefined) return <PageSpinner/>
    if(episodeOrder+1 <course?.episodes?.length){
   if(Math.round(episodeTime)===course.episodes[episodeOrder].secondsLong){
       handleNextEpisode()
   }
    }
    
    return(
        <>
        <Head>
            <title>Onebitflix-{course.episodes[episodeOrder].name}</title>
            <link rel="shotcut icon" href="/favicon.svg" type="image/x-icon"/>

        </Head>
        <main>
            <HeaderGeneric logoUrl="/home" btnContent={'Voltar para o curso'} btnUrl={`/courses/${courseId}`}/>

            <Container className="d-flex flex-column align-items-center gap-3 pt-3">
               <p className={styles.episodeTitle}>{course.episodes[episodeOrder].name}</p> 
               {typeof window === 'undefined'?null:(
                <ReactPlayer className={styles.player}
                 url={`${process.env.NEXT_PUBLIC_BASEURL}/episodes/stream?videoUrl=${course.episodes[episodeOrder].videoUrl}&token=${sessionStorage.getItem("onebitflix-token")}`} 
                 controls ref={playerRef} 
                 onStart={handlePlayerTime} 
                  onProgress={(progress)=>{setEpisodeTime(progress.playedSeconds)}}/>
               )}
               <div className={styles.episodeButtonDiv}>
                <Button
                className={styles.episodeButton} 
                disabled={episodeOrder === 0? true:false} 
                onClick={handleLastEpisode}>
                <img src="/episode/iconArrowLeft.svg" 
                alt="Seta pra esqueda" 
                className={styles.arrowImg} />
                </Button>
                <Button className={styles.episodeButton} onClick={handleNextEpisode}
                 disabled={episodeOrder+1 === course.episodes.length? true:false }>
                <img src="/episode/iconArrowRight.svg" 
                alt="Seta pra esqueda" 
                className={styles.arrowImg} />
                </Button>
                
               </div>
               <p className="text-center py-4">
               {course.episodes[episodeOrder].synopsis} 
               </p>
            </Container>
        </main>
        </>
    )
}
export default EpisodePlayer;