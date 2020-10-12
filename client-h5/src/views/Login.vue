<template>
  <div class="login">
    <van-form @submit="onSubmit">
      <van-field 
        v-model="account" 
        name="account" 
        label-width="0" 
        placeholder="账号" 
        left-icon="user-circle-o" 
        maxlength="16" 
        :rules="[{ required: true, message: '请输入账号' }]"
      />
      <van-field 
        v-model="password" 
        type="password" 
        name="password" 
        label-width="0" 
        placeholder="密码"
        left-icon="browsing-history-o" 
        maxlength="30" 
        :rules="[{ required: true, message: '请输入密码' }]"
      />
      <div class="submit">
        <van-button round block type="primary" native-type="submit">提交</van-button>
        <van-button :to="{name: 'Register'}" round block plain type="primary" class="register">注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import md5 from 'md5';
import cryptoJs from 'crypto-js';
import { getCurrentInstance } from 'vue';
import { Form, Field, Button } from 'vant';
import { login } from '@/apis';

export default {
  name: 'Login',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button
  },
  data() {
    return {
      account: '',
      password: ''
    }
  },
  setup() {
    const  { ctx } = getCurrentInstance();

    return {
      onSubmit (values) {
        const password = md5(values.password);
        const ciphertext = cryptoJs.AES.encrypt(password, 'tree-hole').toString();

        login({
          account: values.account,
          password: ciphertext
        }).then((res) => {
          ctx.$store.commit('user', res);

          const route = ctx.$router.currentRoute.value;

          if (route.query.back) {
            ctx.$router.replace({
              name: route.query.back
            });
          } else {
            ctx.$router.back();
          }
        }).catch(() => {});
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.login {
  padding-top: 20px;
}
.submit {
  padding: 30px 16px;
}
.register {
  margin-top: 20px;
}
</style>