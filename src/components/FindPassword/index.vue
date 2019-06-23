<template>
    <div class="container" >

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
                <el-form-item label="新的密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" show-password>
                    </el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleToFindPassword" style="width:40%">修改密码</el-button>
                    <el-button @click="resetForm('ruleForm')" style="width:40%">重置</el-button>
                </el-form-item>
            </el-form>

        <!-- <div class="register_text">用户名:<input v-model="username" type="text" /></div>
        <div class="register_text">邮箱:<input v-model="email" type="text"  /><button @touchstart="handleToVerify">发送验证码</button></div>
        <div class="register_text">验证码:<input v-model="verify" type="text" /></div>
        <div class="register_text">新密码:<input v-model="password" type="password" /></div>
        <div class="register_btn">
            <button @touchstart="handleToFindPassword" >修改密码</button>
        </div>-->
        <div class="register_link">
            <router-link to="/mine/login">立即登录</router-link>
            <router-link to="/mine/register">注册账号</router-link>
        </div> 
    </div> 
</template>

<script>
import {messageBox} from '@/components/JS'
export default {
    name:'findPassword',
    data(){
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
       /*  return{
            username:'',
            password:'',
            email:'',
            verify:'',
        } */
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
            this.axios.get('/api2/users/verify?email='+this.ruleForm.email).then((res)=>{
                var status=res.data.status;
                var This=this;
                if(status===0){
                    messageBox({
                        title:'验证码',
                        content:'验证码发送成功',
                        ok:'确定',
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
        handleToFindPassword(){
            this.axios.post('/api2/users/findPassword',{
                username:this.ruleForm.username,
                password:this.ruleForm.pass,
                email:this.ruleForm.email,
                verify:this.ruleForm.verify,
            }).then((res)=>{
                console.log(res.data)
                var status=res.data.result.code;
                var This=this;
                if(status===1){
                    messageBox({
                        title:'更改密码',
                        content:'用户密码与之前相同',
                        ok:'确定',
                    });
                }else if(status===200){
                    messageBox({
                        title:'更改密码',
                        content:'用户密码更改成功',
                        ok:'确定',
                       handleOk(){
                           This.$router.push('/mine/login');
                           console.log('222')
                       },
                    })
                }else if(status==-1){
                    messageBox({
                        title:'更改密码',
                        content:'用户密码更改失败',
                        ok:'确定',
                    })
                }
            })
    },
    }
}
</script>

<style scoped>
.container{
    width: 95%;
    padding-top:10px;
}
.register_link {
  display: flex;
  justify-content: space-between;
}
.register_link a {
  text-decoration: none;
  margin: 0 5px;
  font-size: 12px;
  color:blue;
}
</style>
