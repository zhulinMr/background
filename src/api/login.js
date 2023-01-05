import axios from "../../axios"

export const getLogin = (data)=>{
    return axios({
        url:'/admin/login',
        method:"POST",
        data
    })
}

