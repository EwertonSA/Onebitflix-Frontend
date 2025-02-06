import Head from 'next/head'
import HeaderNoAuth from '../src/components/homeNoAuth/headerNoAuth'
import PresentationSection from '../src/components/homeNoAuth/presentationSection'
import styles from "../styles/homeNoAuth.module.scss"
import CardSection from '../src/components/homeNoAuth/cardSection'
import SlideSection from '../src/components/homeNoAuth/slideSection'
import { GetStaticProps } from 'next'
import { ReactNode, useEffect } from 'react'
import courseService, { CourseType } from '../src/services/courseService';
import Footer from '../src/components/common/footer'
import AOS from 'aos';
import "aos/dist/aos.css"
interface IndexPageProps{
children:ReactNode;
course:CourseType[]
}
const HomeNoAuth=({course}:IndexPageProps)=>{
    useEffect(()=>{
        AOS.init()
    },[])
    return(
        <>
        <Head >
<title >Onebitflix</title>
<link rel="shortcut icon" href="/favicon.svg" type='image/x-icon' />
<meta property='og:title' content='Onebitflix' key='title'/>
<meta name="description" content="Tenha acessoa aos melhores conteúdos de programação de forma simples e fácil"/>
        </Head>
        <main>
            <div className={styles.sectionBackground} data-aos="fade-zoom-in" data-aos-duration="1600">
            <HeaderNoAuth/> 
            <PresentationSection/>
            <div data-aos="fade-rigth" data-aos-duration="1200"><CardSection />
            </div>
            <div data-aos="fade-up" data-aos-duration="1350"><SlideSection newestCourses={course} /></div>
            
            <Footer/>
            </div>
        </main>
      
        </>
    )
} 
export const getStaticProps: GetStaticProps=async()=>{
    const res=await courseService.getNewestCourses();
    return {
        props:{
            course:res.data,
        },
        revalidate:3600*24
    }
}
export default HomeNoAuth