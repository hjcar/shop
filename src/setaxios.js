import axios from 'axios'
import store from './store/index.js'
import router from './router/index.js'

//http全局拦截

//toke 要放在我们的请求的header 上面带回去给后端



export default function setAxios(){
    axios.interceptors.request.use( //请求都带token
        config=>{
            if(store.state.token){
                config.headers.token=store.state.token
            }
            return config
        }
    )
    
    //每次的请求有返回的，都是经过拦截器
    axios.interceptors.response.use(
        response=>{
            if(response.status==200){
                const data=response.data
                if(data.code==-1){
                    //登录过期 需要重新登录 清空token 
                    store.commit('setToken','')
                    localStorage.removeItem('token')
                    //跳转到login页面
                    router.replace({path:'/login'});
                }
                 return data
            }
           
           return response
        }
         
    )
}


