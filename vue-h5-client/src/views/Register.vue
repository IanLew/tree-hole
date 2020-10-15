<template>
  <div class="register">
    <van-form @submit="onSubmit">
      <van-field 
        v-model="account" 
        name="account" 
        label-width="0" 
        placeholder="请输入数字、字母账号" 
        maxlength="16" 
        left-icon="user-circle-o" 
        :rules="[
          { required: true, message: '请输入账号' }, 
          { pattern: /[0-9A-Za-z]/g, message: '请输入数字、字母' }
        ]"
      />
      <van-field 
        v-model="password" 
        type="password" 
        name="password" 
        label-width="0" 
        placeholder="请输入数字、字母、符号组成的密码" 
        maxlength="30" 
        left-icon="browsing-history-o" 
        :rules="[
          { required: true, message: '请请输入密码' }, 
          { pattern: /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}/g, message: '请输入数字、字母、符号组成的密码' }
        ]"
      />
      <van-field 
        v-model="repeatPassword" 
        type="password" 
        name="repeatPassword" 
        label-width="0" 
        placeholder="请重复输入数字、字母、符号组成的密码" 
        maxlength="30" 
        left-icon="browsing-history-o" 
        :rules="[
          { required: true, message: '请再次请输入密码' }, 
          { validator: (val) => password === val, message: '两次输入的密码不一致' }
        ]"
      />
      <div class="submit">
        <van-button round block type="primary" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import md5 from 'md5';
import cryptoJs from 'crypto-js';
import { getCurrentInstance } from 'vue';
import { Form, Field, Button } from 'vant';
import { register } from '@/apis';

export default {
  name: 'Register',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button
  },
  data() {
    return {
      account: '',
      password: '',
      repeatPassword: '',
    }
  },
  setup() {
    const  { ctx } = getCurrentInstance();
    
    return {
      onSubmit (values) {
        const password = md5(values.password);
        const ciphertext = cryptoJs.AES.encrypt(password, 'tree-hole').toString();

        register({
          account: values.account,
          password: ciphertext
        }).then(() => {
          ctx.$router.back();
        }).catch(() => {});
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.register {
  padding-top: 20px;
}
.submit {
  margin: 30px 15px;
}
</style>