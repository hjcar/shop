<template>
    <div>
        <cube-form
          :model="model"
          :schema="schema"
          @submit="submitHandler"
          @reset="resetHandler"></cube-form>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                model:{
                    username:'',
                    password:''
                },
                schema:{
                    fields:[
                         { type:'input', //类型
                            modelKey:'username', //双向绑定名
                            label: '用户', 
                            props: { //提示内容
                                placeholder: '用户名'
                            },
                            rules: {  //校验规则
                                required: true,
                                type:"string", //只能是字符串
                                min:3, //不能小于
                                max:15   //不能大于15
                            },
                              trigger: 'blur' ,//触发 失焦的时候
                              messages:{
                                  required:"请输入用户名",
                                  min:'用户名大于3位小于15位',
                                  max:'用户名大于3位小于15位'
                              }
                        },
                        { type:'input', //类型
                            modelKey:'password', //双向绑定名
                            label: '密码', 
                            props: { //提示内容
                                placeholder: '请输入密码',
                                type:'password',
                                eye:{
                                    open:false
                                }
                            },
                            rules: {  //校验规则
                                required: true,
                                min:6
                            },
                              trigger: 'blur'
                        },{
                            type:'submit',
                            label:"登录"
                        }
                    ]
                }
            }
        },
        methods:{
          async  submitHandler(e) {
             e.preventDefault() //清除默认事件
              try{
                  const result =await
                  this.$axios.get('/api/login',{params:this.model}).then((res)=>{
                      if(res.code==0){
                          this.$store.commit('setToken',res.token)//保存token
                          localStorage.setItem('token',res.token) //本地存储token
                            console.log('登录成功')
                      }else{
                             console.log("用户或密码错误")
                      }
                  })
              }catch(err){
                  console.log(err)
              }
              },

               resetHandler(e) {
                 console.log('reset', e)
               }
        }
    }
</script>

<style>
</style>
