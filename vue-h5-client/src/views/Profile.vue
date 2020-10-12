<template>
  <div class="profile">
    <van-nav-bar 
      title="修改信息" 
      left-arrow
      :fixed="true" 
      :z-index="10"
      @click-left="$router.back" 
    />
    <van-form @submit="onSubmit">
      <van-field 
        v-model="userInfo.nickname" 
        name="nickname" 
        input-align="right" 
        label="昵称" 
        placeholder="请输入昵称" 
        maxlength="16" 
      />
      <van-field name="avatar" label="头像" input-align="right" >
        <template #input>
          <van-uploader 
            v-model="avatar" 
            image-fit="cover" 
            :after-read="afterRead" 
            :max-count="1" 
          />
        </template>
      </van-field>
      <van-field 
        v-model="gender.text"   
        name="gender" 
        input-align="right" 
        label="性别" 
        placeholder="请选择性别" 
        readonly 
        is-link 
        clickable 
        @click="showGenderPicker = true" 
      />
      <van-field 
        v-model="birthday.text" 
        name="birthday" 
        input-align="right" 
        label="生日" 
        placeholder="请选择生日" 
        readonly 
        is-link 
        clickable 
        @click="showBirthdayPicker = true"
      />
      <van-field 
        v-model="area.text" 
        name="area" 
        input-align="right" 
        label="地区" 
        placeholder="请选择地区" 
        readonly 
        is-link 
        clickable 
        @click="showAreaPicker = true"
      />
      <van-field 
        v-model="userInfo.mobile" 
        name="mobile" 
        input-align="right" 
        label="手机号" 
        placeholder="请输入手机号" 
        maxlength="11"
        :rules="[{ validator: (val) => val && /^1[3456789]\d{9}$/g.test(val), message: '请输入正确手机号' }]"
      />
      <van-field 
        v-model="userInfo.email" 
        name="email" 
        input-align="right" 
        label="邮箱" 
        placeholder="请输入邮箱" 
        :rules="[{ validator: (val) => val && /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/g.test(val), message: '请输入正确邮箱' }]"
      />
      <van-field 
        v-model="userInfo.address" 
        name="address" 
        input-align="right" 
        label="详细地址" 
        placeholder="请输入详细地址" 
        type="textarea"
        maxlength="50" 
        show-word-limit
      />
      <van-field 
        v-model="userInfo.hobby" 
        name="hobby" 
        input-align="right" 
        label="爱好" 
        placeholder="请输入爱好" 
        type="textarea"
        maxlength="100" 
        show-word-limit
      />
      <div class="submit">
        <van-button round block type="primary" native-type="submit">保存</van-button>
      </div>
    </van-form>
    <van-popup v-model:show="showGenderPicker" position="bottom">
      <van-picker 
        title="请选择性别" 
        :columns="genderCols" 
        :default-index="gender.index" 
        @confirm="onGenderConfirm" 
        @cancel="showGenderPicker = false" 
      />
    </van-popup>
    <van-popup v-model:show="showBirthdayPicker" position="bottom">
      <van-datetime-picker
        v-model="birthday.time"
        type="date"
        title="请选择生日"
        :minDate="minDate" 
        :max-date="maxDate" 
        @confirm="onBirthdayComfirm" 
        @cancel="showBirthdayPicker = false"
      />
    </van-popup>
    <van-popup v-model:show="showAreaPicker" position="bottom">
      <van-area 
        title="请选择地区" 
        :area-list="areaList" 
        :value="area.code" 
        @confirm="onAreaConfirm" 
        @cancel="showAreaPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import moment from 'moment';
import { getCurrentInstance, ref, reactive } from 'vue';
import { NavBar, Form, Uploader, Field, Button, Popup, Picker, DatetimePicker, Area } from 'vant';
import areaList from '@/utils/area';
import { uploadFile, updateUserInfo, getUserInfo } from '@/apis';

export default {
  name: 'Profile',
  components: {
    [NavBar.name]: NavBar,
    [Form.name]: Form,
    [Uploader.name]: Uploader,
    [Field.name]: Field,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [DatetimePicker.name]: DatetimePicker,
    [Area.name]: Area
  },
  data () {
    return {
      showGenderPicker: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      showBirthdayPicker: false,
      areaList: areaList,
      showAreaPicker: false
    }
  },
  setup () {
    const  { ctx } = getCurrentInstance();
    
    const userInfo = ref({});
    const genderCols = [
      { text: '女', tag: 0 }, 
      { text: '男', tag: 1},
      { text: '保密', tag: 2}
    ];
    const gender = ref({
      text: null,
      index: 0
    });
    const birthday = ref({
      text: null,
      time: new Date()
    });
    const area = ref({
      text: null,
      code: null
    });
    const avatar = ref([]);

    const state = reactive({
      userInfo,
      gender,
      birthday,
      avatar,
      area
    });

    getUserInfo({
      userid: ctx.$store.getters.user.userid
    }).then(res => {
      state.userInfo = res;

      if (res.gender >= 0) {
        const gender = genderCols.find(v => v.tag === res.gender);
        if (gender) {
          state.gender = {
            text: gender.text,
            index: gender.tag
          };
        }
      }
      
      if (res.birthday) {
        state.birthday = {
          text: res.birthday,
          time: new Date(res.birthday.replace(/-/g, '/'))
        };
      }

      if (res.avatar) {
        state.avatar = [{ 
          url: res.avatar.replace(/^(.+:\/\/).+(:.+)$/g, `$1${location.hostname}$2`) 
        }];
      }

      if (res.district) {
        const district = Object.entries(areaList.county_list).find(v => v[1] === res.district);
        if (district) {
          state.area = {
            text: `${res.province} ${res.city} ${res.district}`,
            code: district[0]
          };
        }
      }
    }).catch(() => {});

    return {
      genderCols,
      userInfo,
      gender,
      birthday,
      area,
      avatar,
      onSubmit (values) {
        Object.assign(values, state.userInfo, {
          userid: ctx.$store.getters.userid
        });
        let params = {};
        for(let [k, v] of Object.entries(values)) {
          if (k !== 'area' && v !== '') {
            params[k] = v;
          }
        }
        updateUserInfo(params).then(()=> {
          ctx.$router.back();
        }).catch(() => {});
      }
    }
  },
  methods: {
    afterRead (file) {
      file.status = 'uploading';
      file.message = '上传中...';
      const form = new FormData();
      form.append('file', file.file);

      uploadFile(form).then(res => {
        this.userInfo.avatar = res;
        this.avatar = [{ url: res }];
      }).catch(() => {
        file.status = 'failed';
        file.message = '上传失败';
      });
    },
    onGenderConfirm (values) {
      this.userInfo.gender = values.tag >= 0 ? values.tag : null;
      this.gender = {
        text: values.text,
        index: values.tag
      };
      this.showGenderPicker = false;
    },
    onBirthdayComfirm (values) {
      const t = moment(values).format('YYYY-MM-DD');
      this.userInfo.birthday = t;
      this.birthday = {
        text: t,
        time: values
      };
      this.showBirthdayPicker = false;
    },
    onAreaConfirm (values) {
      this.userInfo.province = values[0].name;
      this.userInfo.city = values[1].name;
      this.userInfo.district = values[2].name;
      const t = values.map(v => v.name);
      this.area = {
        text: t.join(' '),
        code: values[values.length - 1].code
      };
      this.showAreaPicker = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  padding-top: 45px;
  padding-bottom: 65px;
  &::v-deep(.van-uploader__upload), &::v-deep(.van-uploader__preview) {
    margin: 0;
  }
  &::v-deep(.van-field__error-message) {
    text-align: right;
  }
  .submit {
    background-color: #fff;
    width: 100%;
    padding: 10px 16px;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
  }
}
</style>