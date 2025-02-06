import styles from '../styles/search.module.scss'
import Head from "next/head"
import HeaderAuth from "../src/components/common/headerAuth"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import courseService, { CourseType } from "../src/services/courseService"
import PageSpinner from "../src/components/common/spinner"
import { Container } from 'reactstrap'
import SearchCard from '../src/components/searchCard'
import Footer from '../src/components/common/footer'

const Search=()=>{
    const router=useRouter()
    const searchName=router.query.name as string
    const [searchResult,setSearchResult]=useState<CourseType[]>([])
     const [loading,setLoading]=useState(true)
    const searchCourses = async () => {
        if (typeof searchName === "string") {
        
            const res = await courseService.getSearch(searchName);
            
            if (res?.data?.courses) 
              setSearchResult(res.data.courses);
            } else {
    
              setSearchResult([]);
            }
          } 
       
      
    useEffect(()=>{
searchCourses()
    },[searchName])
   
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
    
    return(
        <>
        <Head>
            <title>Onebitflix - {searchName}</title>
            <link rel="shortcut icon" href="/favicon.svg" type='image/x-icon'/>
        </Head>
        <main className={styles.main}>
            <div className={styles.headFootBg}><HeaderAuth/></div>
            
            {searchResult?.length > 0 ? (
 <div className={styles.searchContainer}>
    <Container className="d-flex flex-wrap justify-content-center py-4 gap-5 ">
    {
         searchResult.map((course) => (
    <SearchCard key={course.id} course={course}/>
         ))
    }
 </Container>
 </div>
) : (
    <div className={styles.searchContainer}> 
    <p className={styles.noSearchResult}>Nenhum resultado encontrado</p>
    </div>
 
)}
<div className={styles.headerFooterBg}><Footer/></div>
            </main>
        </>
    )
}
export default Search