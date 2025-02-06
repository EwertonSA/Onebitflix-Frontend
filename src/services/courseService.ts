import api from "./api";
export type EpisodeType={
    id:number
    name:string
    synopsis:string
    order:number
    videoUrl:string
    secondsLong:number
}
export type CourseType={
    id:number
    name:string
    thumbnailUrl:string
    synopsis:string
    episodes?:EpisodeType[]
}
const courseService={
getNewestCourses: async()=>{
    const res= await api.get("/courses/newest").catch((error)=>{
 
        return error.response
    })
    return res;
},
getFeaturedCourses:async()=>{
const token=sessionStorage.getItem("onebitflix-token")
const res=await api.get("/courses/featured",{
    headers:{
Authorization:`Bearer ${token}`
    }
})
.catch((error)=>{
    
    return error.response
})
return res
},
addToFav:async (courseId:number|string)=>{
const token =sessionStorage.getItem("onebitflix-token")
const res=await api.post("/favorites",{courseId},{
    headers:{
        Authorization:`Bearer ${token}`
    }
}).catch((error)=>{
return error.response
})
return res
},
removeFav:async(courseId:number| string)=>{
    const token=sessionStorage.getItem("onebitflix-token")
    const res=await api.delete(`/favorites/${courseId}`,{
        headers:{
            Authorization:`Bearer ${token}`,
        },
     
    }).catch((error)=>{
        return error.response
    })
    return res
},
getFavCourse:async(courseId:number| string)=>{
    const token=sessionStorage.getItem("onebitflix-token")
    const res=api.get("/favorites",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).catch((error)=>{
        return error.response
    })
    return res
},
like:async(courseId:number| string)=>{
    const token=sessionStorage.getItem("onebitflix-token")
    const res=api.post("/likes",{courseId},{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).catch((error)=>{
        return error.response
    })
    return res
},
removeLike:async(courseId:number| string)=>{
    const token=sessionStorage.getItem("onebitflix-token")
    const res=api.post(`/likes/${courseId}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).catch((error)=>{
        return error.response
    })
    return res
},
getSearch: async (name: string) => {
	const token = sessionStorage.getItem("onebitflix-token");

  const res = await api
  .get(`/courses/search?name=${name}`, {
  headers: {
	  Authorization: `Bearer ${token}`,
  },
  })
  .catch((error) => {
	  console.log(error.response.data.messsage);

    return error.response;
  });

  return res;
},
getEpisodes:async (id: number | string) => {
    const token = sessionStorage.getItem("onebitflix-token");

    try {
        const res = await api.get(`/courses/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
        console.error("Erro ao buscar episódios:", error.response?.data?.message || error.message);
        return null; // Retorne `null` para tratar erros no front-end
    }
}

}
export default courseService;