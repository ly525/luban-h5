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
      <div class="card__title">欢迎加入鲁班H5</div>
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
  width: 360px;
  border-radius: 4px;
  background-color: #fff;
  min-height: 250px;
  padding: 24px 12px 12px;
  box-sizing: border-box;
  box-shadow: 0 0 3px rgba(0,0,0,.1);
}

.card__title {
  text-align: center;
  color: rgba(0,0,0,.85);
  font-size: 32px;
  font-family: PingFangSC-Regular;
  line-height: 40px;
  margin-bottom: 48px;
}

.login-form-button {
  margin-top: 12px;
  width: 100%;
}
</style>
