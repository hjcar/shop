module.exports={
    devServer:{
        port: 8080 ,//端口号
        open:false,
        //mock接口编写的地方
        //每次更改都必须重启项目
        before(app){
            // app.get('api/reg',(req,res)=>{
            //     res.json({
            //         code:0
            //     })
            // })
            
            //注册
            let userpot = [
                {username:'xiaod',password:'123456'},
                {username:'tim',password:'123456'}
            ]
            //注册接口
            app.get('/api/reg',(req,res)=>{
                //ES6解构
                const {username,password}=req.query
                const userLength=userpot.filter(v=> v.username==username).length
                
                if(userLength>0){
                    res.json({
                        success:false,
                        msg:'用户名已存在',
                        
                    })
                }else{
                    res.json({
                        success:true,
                        msg:'注册成功'
                    })
                }
            })
            //登录接口
            let tokenKey='huojin'
            app.get('/api/login',(req,res)=>{
                const {username,password}=req.query
                if(username=='tim' && password=='123456'){
                    res.json({
                        code:0,
                        message:'登录成功',
                        token:tokenKey+'-'+'username'+'-'+(new Date().getTime()+60*60*1000)
                    })
                }else{
                    res.json({
                        message:'账号或者密码错误'
                    })
                }
            })
            
        }
  },
        
        
        
    css: {
      loaderOptions: {
        stylus: {
          'resolve url': true,
          'import': [
            './src/theme'
          ]
        }
      }
    },

    pluginOptions: {
      'cube-ui': {
        postCompile: true,
        theme: true
      }
    }
}
