<template>
  <el-container
    style="width: 100%; height: 100vh; display: flex; align-items: center; justify-content: center"
  >
    <el-card>
      <el-form style="width: 600px" ref="ruleFormRef" :model="ruleForm" :rules="rules">
        <el-row align="middle" justify="center">
          <el-text style="font-size: 2em; font-weight: bold">login your account</el-text>
        </el-row>
        <el-text v-if="userStore.getErrorMessage" type="danger">{{
          userStore.getErrorMessage
        }}</el-text>
        <el-form-item label="Email" prop="email" label-position="top">
          <el-input
            style="height: 50px"
            v-model="ruleForm.email"
            aria-placeholder="type your email"
            placeholder="type your email"
          />
        </el-form-item>

        <el-form-item label="Password" prop="password" label-position="top">
          <el-input
            style="height: 50px"
            type="password"
            v-model="ruleForm.password"
            aria-placeholder="type your password"
            placeholder="type your password"
          />
        </el-form-item>

        <el-text
          style="
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: end;
            margin-bottom: 1em;
          "
          >forgot password?</el-text
        >

        <el-form-item style="margin-bottom: 0">
          <el-button
            v-loading="userStore.getAuthLoading"
            :disabled="userStore.getAuthLoading"
            style="width: 100%; height: 50px"
            type="primary"
            @click="submitForm(ruleFormRef)"
            >Login</el-button
          >

          <el-text style="width: 100%; display: flex; align-items: center; justify-content: center"
            >or</el-text
          >

          <el-button style="width: 100%; height: 50px" @click="router.push('/signup')"
            >Signup</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { handleLogin } from '@/api/actions/userActions'

interface RuleForm {
  email: string
  password: string
}

const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  email: '',
  password: '',
})
const userStore = useUserStore()

const rules = reactive<FormRules<RuleForm>>({
  email: [
    { required: true, message: 'Please input your email', trigger: 'blur' },
    { type: 'email', message: 'Invalid email', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please your password', trigger: 'blur' },
    { min: 6, max: 30, message: 'Length should be 6 to 30', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  userStore.setErrorMessage('')
  if (!formEl) return

  await formEl.validate((valid) => {
    if (!valid) return
    handleLogin(ruleForm)
  })
}
</script>

<style scoped></style>
