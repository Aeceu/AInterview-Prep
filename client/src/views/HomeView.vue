<template>
  <el-container style="width: 100%; height: 100vh">
    <SidebarView />
    <el-container style="background-color: #222222">
      <el-header style="width: 100%">
        <el-row style="width: 100%; height: 100%" align="middle" justify="end">
          <el-button
            @click="handleLogin"
            v-if="!userStore.getUser"
            size="large"
            style="width: 100px; background-color: white; color: #181818"
            round
            >Login</el-button
          >
          <el-dropdown v-else placement="bottom-end">
            <el-avatar
              v-if="!userStore.getUser"
              src="
                   'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
              "
            />
            <el-avatar v-else :src="userStore.getUser.profileImage" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Profile</el-dropdown-item>
                <el-dropdown-item>
                  <el-button
                    @click="handleLogout"
                    v-if="userStore.getUser"
                    style="width: 100px; background-color: white; color: #181818"
                    >Logout</el-button
                  >
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-row>
      </el-header>
      <el-main
        style="
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0;
        "
      >
        <CurrentQuizSession v-if="questionStore.getCurrentQuizSession" />
        <TopicForm
          v-if="questionStore.getQuestions.length <= 0 && !questionStore.getCurrentQuizSession"
        />
        <QuestionCard
          :key="questionStore.getCurrentIndex"
          :questionnare="questionStore.getQuestions[questionStore.getCurrentIndex]"
          v-if="
            questionStore.getAnswers.length < questionStore.getQuestions.length &&
            !questionStore.getCurrentQuizSession
          "
        />
        <AnswersForm
          v-if="
            questionStore.getAnswers.length > 0 &&
            questionStore.getAnswers.length === questionStore.getQuestions.length &&
            !questionStore.getCurrentQuizSession
          "
        />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { handleLogout } from '@/api/actions/userActions'
import AnswersForm from '@/components/AnswersForm.vue'
import CurrentQuizSession from '@/components/CurrentQuizSession.vue'
import QuestionCard from '@/components/QuestionCard.vue'
import SidebarView from '@/components/SidebarView.vue'
import TopicForm from '@/components/TopicForm.vue'
import { useQuestionStore } from '@/stores/questionStore'
import { useUserStore } from '@/stores/userStore'

const questionStore = useQuestionStore()
const userStore = useUserStore()
const handleLogin = async () => {
  window.location.href = 'http://localhost:4200/api/v1/auth/google'
}
</script>

<style scoped></style>
