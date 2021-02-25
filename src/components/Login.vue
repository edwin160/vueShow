<template>
  <div class="login_container">
    <div class="login_box">
      <!--      头像区-->
      <div class="avatar_box">
        <img
          src="../assets/logo.png"
          alt=""
        >
      </div>
      <!--      登录表单区-->
      <el-form
        ref="loginFormRef"
        :rules="loginFormRules"
        :model="loginForm"
        label-width="0px"
        class="login_form"
      >
        <!--        用户名-->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
          />
        </el-form-item>
        <!--        密码-->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            prefix-icon="iconfont icon-3702mima"
          />
        </el-form-item>
        <!--      按钮-->
        <el-form-item class="btns">
          <el-button
            type="primary"
            @click="login"
          >
            登录
          </el-button>
          <el-button
            type="info"
            @click="resetLoginForm"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      // 登陆表单绑定数据对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符之间', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登陆密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6到15个字符之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) { return this.$message.error('登录失败') }
        this.$message.success('登录成功')
        // 将token保存到客户端中
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}

</script>

// less语法，作用域是当前组件
<style lang='less' scoped>
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  border: 1px solid #eee;

  .avatar_box{
    height: 130px;
    width: 130px;
    padding: 10px;
    border-radius: 50%;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .btns{
    display: flex;
    justify-content: flex-end;
  }
  .login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
}
</style>
