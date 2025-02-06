import useSWR from "swr"
import  { CategoryType } from "../../../services/categoryService";
import categoryService from "../../../services/categoryService";
import ListCategoriesSlide from "../listCategorySlide";
import PageSpinner from "../../common/spinner";


const ListCategories=()=>{
    const{data,error}=useSWR("/listCategory",categoryService.getCategories)
    if(error) return error;
    if(!data)
        return(
            <PageSpinner/>
        );
    return <>
     {data.data.categories?.map((category: CategoryType) => (
	    <ListCategoriesSlide
      key={category.id}
      categoryId={category.id}
      categoryName={category.name}
      />))}
   </>
}
export default ListCategories;