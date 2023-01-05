<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div style="color: #fff">欢迎光临</div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2>欢迎回来</h2>
      <div>
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>
      <div>
        <el-form :model="form" ref="formRef" :rules="rules" class="w-[250px]">
          <el-form-item prop="username">
            <el-input v-model.trim="form.username" placeholder="请输入用户名">
              <template #prefix>
                <el-icon class="el-input__icon"><user /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model.trim="form.password" placeholder="请输入密码">
              <template #prefix>
                <el-icon class="el-input__icon"><lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="w-[250px]"
              round
              color="#626aef"
              @click="onSubmit(formRef)"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>
<script  setup>
import { reactive, ref } from "vue";
import { ElNotification } from "element-plus";
import { getLogin } from "../api/login";
import {useRouter} from "vue-router"
// 初始化路由
const router=useRouter()
// 表单数据
const form = reactive({
  username: "",
  password: "",
});
// 校验规则
const rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 5, message: "用户名长度在3-5个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入用户密码", trigger: "blur" },
    { min: 3, max: 5, message: "用户密码长度在3-5个字符", trigger: "blur" },
  ],
});
const formRef = ref(null);
const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return false;
    getLogin(form)
      .then((response) => {
        console.log("res", response);
           ElNotification({
          title: "登录成功",
          type: "success",
          duration:3000
        });
        router.push('/')
      })
      .catch((error) => {
        ElNotification({
          title: "错误",
          message: error.response.data.msg,
          type: "error",
          duration:3000
        });
        console.log("err", error.response.data.msg);
      });
  });
};
</script>
<style lang="postcss" scoped>
.login-container {
  @apply bg-indigo-500 min-h-screen;
}
.login-container .left,
.login-container .right {
  @apply flex justify-center items-center;
}
.login-container .right {
  @apply bg-light-50  flex-col;
}
.right > h2 {
  @apply font-bold text-3xl text-gray-800;
}
.right > div {
  @apply my-5 text-gray-300 flex justify-center items-center space-x-2;
}
.right > div .line {
  @apply h-[1px] w-16 bg-gray-200;
}
</style>