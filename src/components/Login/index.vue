<template>
  <div id="content">
    <div class="login_body" >

        
        <div style="margin: 20px;"></div>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="用户名:">
            <el-input v-model="username"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="验证码:" >
          <el-input v-model="verifyImg" style="width:80px;"></el-input>
          <img @touchstart="handleToVerifyImg" src="/api2/users/verifyImg">
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="handleToLogin" round>登录</el-button>
        </el-form-item>
      </el-form>
      <div class="login_link">
        <router-link to="/mine/register">立即注册</router-link>
        <router-link to="/mine/findPassword"> 找回密码</router-link>
      </div>
    </div>
  </div>
</template>

<script>
//  import { constants } from 'crypto';
import {messageBox} from '@/components/JS';
import { constants } from 'crypto';
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      verifyImg:'',
      labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
    };
  },
  methods: {
    handleToLogin() {
        this.axios.post('/api2/users/login',{
			      username:this.username,
            password:this.password,
            verifyImg:this.verifyImg,
		   }).then((res)=>{
            console.log(res)
            var status=res.data.status
            console.log(status)
            var This=this
            if(status==0){
                    messageBox({
                    title:'登录',
                    content:res.data.msg,
                    ok:'确定',
                    handleOk(){
                      This.$router.push('/mine/person');
                    }
					         })
			      }else{
				   messageBox({
					   title:'登录',
					   content:res.data.msg,
             ok:'确定',
				   })
			   }
			   console.log(res);
		   })
    },
    handleToVerifyImg(ev){
       ev.target.src='/api2/users/verifyImg?'+Math.random();
    }
  }
};
</script>

<style scoped>
#content .login_body {
  width: 95%;
}
.login_body .login_text {
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px #ccc solid;
  margin-bottom: 5px;
  outline: none;
  text-indent: 10px;
}
.login_body .login_btn {
  height: 50px;
  margin: 10px;
}
.login_body .login_btn input {
  width: 100%;
  height: 100%;
  background: #e54847;
  border-radius: 3px;
  border: none;
  display: block;
  color: white;
  font-size: 20px;
}
.login_body .login_link {
  display: flex;
  justify-content: space-between;
}
.login_body .login_link a {
  text-decoration: none;
  margin: 0 5px;
  font-size: 12px;
  color: blue;
}
</style>
