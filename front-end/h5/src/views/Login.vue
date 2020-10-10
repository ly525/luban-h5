<template>
<a-layout style="height: 100vh">
  <Header />
  <div class="login-page">
    <!-- <div class="login-page__title">鲁班H5</div> -->
    <!-- <img src="../assets/logo.png" style="max-width: 300px" /> -->
    <div>
      <img src="https://luban-h5.com/luban-h5/static/banner.e673e408.svg" width="510px"  alt="" srcset="">
    </div>
    <a-card class="login-page__card">
      <h2 style="text-align: center;margin-bottom: 24px;">欢迎加入鲁班H5</h2>
      <a-form :form="form" class="login-form" @submit="handleSubmit">
        <a-form-item>
          <a-input
            v-decorator="[
              'identifier',
              { rules: [{ required: true, message: '请输入用户名！' }] }
            ]"
            placeholder="用户名"
          >
            <a-icon slot="prefix" type="user"  />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'password',
              { rules: [{ required: true, message: '请输入密码!' }] }
            ]"
            type="password"
            placeholder="密码"
          >
            <a-icon slot="prefix" type="lock" />
          </a-input>
        </a-form-item>
        <a-button
          size="large"
          type="info"
          html-type="submit"
          class="login-form-button"
          >登录</a-button
        >
      </a-form>
    </a-card>

  </div>
</a-layout>

</template>

<script>
import strapi from '@/utils/strapi'
import Header from '@/components/common/header/index'
export default {
  components: { Header },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          let inputPassword = values['password']
          let inputPhone = values['identifier']
          console.log('Received values of form: ', values)
          this.requestLogin(inputPhone, inputPassword)
        }
      })
    },
    requestLogin (identifier, password) {
      console.log('start request')
      console.log('identifier' + identifier)
      console.log('password' + password)
      strapi
        .login(identifier, password)
        .then(res => {
          this.$router.push(`/`)
        })
        .catch(function (error) {
          console.log('error==========')
          console.log(error)
        })
    }
  },

  mounted () {}
}
</script>
<style>
.login-page__title {
  /* margin-top: 10%; */
  /* text-align: center; */
  height: 50px;
  line-height: 50px;
  font-weight: bold;
  font-size: 30px;
  margin-bottom: 20px;
  font-size: 33px;
  color: rgba(0, 0, 0, 0.85);
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-weight: 600;
  position: relative;
}
.login-page {
  /* text-align: center; */
  padding: 8rem 12rem;
  /* height: 100vh; */
  display: flex;
  justify-content: space-between;
}
.login-page__card {
  border-radius: 8px;
  /* border-top: 4px solid rgb(28, 93, 231); */
  padding: 16px;
  box-shadow: rgb(227, 233, 243) 0px 2px 4px 0px;
  max-width: 440px;
  min-width: 340px;
  height: 340px;

}

.login-form-button {
  margin-top: 30px;
  width: 100%;
}
</style>
