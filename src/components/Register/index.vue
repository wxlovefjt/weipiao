<template>
        <div class="register_body">

            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input type="text" v-model="ruleForm.email" autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item  label="验证码" prop="verify"  >
                    <el-input type="text" v-model="ruleForm.verify" autocomplete="off" style=" width:100px;">
                    </el-input>
                    <el-button :disabled="disabled" @click="handleToVerify" >{{ verifyTime }}</el-button>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" show-password>
                    </el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password>
                    </el-input>
                </el-form-item>
                <el-form-item label="支付密码" prop="paypassword">
                    <el-input v-model="ruleForm.paypassword" show-password>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleToRegister" style="width:40%">注册</el-button>
                    <el-button @click="resetForm('ruleForm')" style="width:40%">重置</el-button>
                </el-form-item>
            </el-form>

            <!-- <div class="register_text">用户名:<input v-model="username" type="text" /></div>
            <div class="register_text">邮箱:<input v-model="email" type="text"  /><button :disabled="disabled" @touchstart="handleToVerify">{{ verifyTime }}</button></div>
            <div class="register_text">验证码:<input v-model="verify" type="text" /></div>
            <div class="register_text">密码:<input v-model="password" type="password" /></div>
            <div class="register_text">确认密码:<input type="password" /></div>
            <div class="register_btn">
                <button @touchstart="handleToRegister" >注册</button>
            </div> -->
            <div class="register_link">
                <router-link to="/mine/login">立即登录</router-link>
                <router-link to="/mine/findPassword">找回密码</router-link>
            </div>
        </div>
</template>

<script>
import {messageBox} from '@/components/JS'
import { setInterval, clearInterval } from 'timers';
export default {
    name:'register',
    data() {
       /*  return {
            username:'',
            password:'',
            email:'',
            verify:'',
            verifyTime:'发送验证码',
            disabled:false, 
        }; */
        
        var checkAge = (rule, value, callback) => {
            if (!value) {
            return callback(new Error('年龄不能为空'));
            }
            setTimeout(() => {
            if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
            } else {
                if (value < 18) {
                callback(new Error('必须年满18岁'));
                } else {
                callback();
                }
            }
            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        return {
            username:'',
            password:'',
            email:'',
            verify:'',
            verifyTime:'发送验证码',
            disabled:false, 

            ruleForm: {
            pass: '',
            checkPass: '',
            age: '',
            username:'',
            paypassword:'',
            email:'',
            verify:'',
            },
            rules: {
            pass: [
                { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
                { validator: validatePass2, trigger: 'blur' }
            ],
            age: [
                { validator: checkAge, trigger: 'blur' }
            ]
            }
        };

    },
    methods:{

        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
        resetForm(formName) {
        this.$refs[formName].resetFields();
      },


        handleToVerify(){
            //当disabled=true时，无法点击
           /*  if(this.disabled){
                return;
            } */
             this.axios.get('/api2/users/verify?email='+this.ruleForm.email).then((res)=>{
                 var status=res.data.status;
                 console.log(status)
                 var This=this;
                 if(status===0){
                       
                    messageBox({
                        title:'验证码',
                        content:'验证码发送成功',
                        ok:'确定',
                        /* handleOk(){
                            This.countDown();
                        } */
                    });
                 }else{
                     messageBox({
                        title:'验证码',
                        content:'验证码发送失败',
                        ok:'确定',
                    });
                 }
             })
        },
        handleToRegister(){
           this.axios.post('/api2/users/register',{
               email:this.ruleForm.email,
               username:this.ruleForm.username,
               password:this.ruleForm.pass,
               paypassword:this.ruleForm.paypassword,
               verify:this.ruleForm.verify,
           }).then((res)=>{
               var status=res.data.result.code;
               var This=this;
               if(status=== 200){
                   messageBox({
                       title:'注册',
                       content:res.data.result.msg,  
                       ok:'确定',
                       handleOk(){
                           This.$router.push('/mine/login');
                       },
                   });
               }else{
                   messageBox({
                       title:'注册',
                       content:res.data.result.msg,
                       ok:'确定',
                   });
               }
           })
        },
        disabledTime(){
            //防止一直发送，设置30秒可以再次发送
           this.disabled=true;
           var timer=setInterval(()=>{
                   this.disabled=false;
           
           },30000);
        }
      /*   countDown(){
           this.disabled=true;
           var count=60;
           var timer=setInterval(()=>{
               count--;
               this.verifyTime='剩余'+count+'秒';
               if(count===0){
                   this.disabled=false;
                   count=60;
                   this.verifyTime='发送验证码';
                   clearInterval(timer._id);
               }
           },1000);
        } */
    }
}
</script>

<style scoped>
.register_body {
  width: 95%;
  padding: 0 auto;
  padding-top: 10px;
}
.register_body .register_text {
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px #ccc solid;
  margin-bottom: 5px;
  outline: none;
  text-indent: 10px;
}
.register_body .register_btn {
  height: 50px;
  margin: 10px;
}
.register_body .register_btn button{
  width: 100%;
  height: 100%;
  background: #e54847;
  border-radius: 3px;
  border: none;
  display: block;
  color: white;
  font-size: 20px;
}
.register_body .register_link {
  display: flex;
  justify-content: space-between;
}
.register_body .register_link a {
  text-decoration: none;
  margin: 0 5px;
  font-size: 12px;
  color:blue;
}
</style>
