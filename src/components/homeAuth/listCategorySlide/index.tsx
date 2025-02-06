import styles from "../../../../styles/slideCategory.module.scss"
import useSWR from "swr";
import categoryService from "../../../services/categoryService";
import SlideComponent from "../../common/slideComponent";
import PageSpinner from "../../common/spinner";

interface props{
    categoryId:number;
    categoryName:string;
}

const ListCategoriesSlide=({categoryId,categoryName}:props)=>{
    const {data,error}=useSWR(`/categoriesCourses/${categoryId}`,()=>categoryService.getCourses(categoryId))
    if(error) return error;
    if(!data)
        
    return (<>
    <PageSpinner/>
    </>);
    return<>
    <p className={styles.titleCategory}>{categoryName}</p>
    <SlideComponent course={data.data.courses}/>
    </>
}
export default ListCategoriesSlide