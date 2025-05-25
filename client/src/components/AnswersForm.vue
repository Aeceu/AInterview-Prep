<template>
  <el-scrollbar>
    <el-text
      size="large"
      style="
        width: 600px;
        display: flex;
        justify-content: center;
        font-size: 36px;
        font-weight: bold;
      "
      >Questions and Answers
    </el-text>
    <el-card
      v-for="(item, index) in questionStore.getQuestions"
      :key="index"
      style="width: 600px; margin-top: 1em"
    >
      <template #header>
        <el-text
          size="large"
          style="
            width: 100%;
            font-size: 26px;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
          "
          >{{ `${index + 1}. ${item.question}` }}</el-text
        >
      </template>

      <el-row>
        <el-col
          class="choices"
          v-for="(itemChoice, key) in item.choices"
          :key="key"
          :span="24"
          :class="{
            green: itemChoice.letter === item.correct,
            red:
              questionStore.getAnswers[index] !== item.correct &&
              questionStore.getAnswers[index] === itemChoice.letter,
          }"
        >
          <el-text size="large" style="font-size: 18px; letter-spacing: 2px">{{
            `${itemChoice.letter.toUpperCase()}. ${itemChoice.text}`
          }}</el-text>
        </el-col>
      </el-row>
    </el-card>
    <el-row style="margin-top: 1em; margin-bottom: 1em" align="middle" justify="end">
      <el-button
        v-loading="loading"
        :disabled="loading"
        size="large"
        style="
          color: rgba(255, 255, 255, 1);
          border: 2px solid #0ed06e;
          background-color: rgba(14, 208, 110, 0.1); /* Light green background */
          font-weight: bold;
          font-size: 16px;
        "
        @click="handleSave"
        >Save</el-button
      >
      <el-button
        size="large"
        style="
          color: rgba(255, 255, 255, 1);
          border: 2px solid #0ed06e;
          background-color: rgba(14, 208, 110, 0.1); /* Light green background */
          font-weight: bold;
          font-size: 16px;
        "
        @click="handleReset"
        >Again</el-button
      >
    </el-row>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { handleSaveQuestions } from '@/api/actions/questionActions'
import { useQuestionStore } from '@/stores/questionStore'
import { useUserStore } from '@/stores/userStore'
import { onMounted, ref } from 'vue'

const questionStore = useQuestionStore()
const userStore = useUserStore()
const score = ref(0)
const loading = ref<boolean>(false)

const handleReset = () => {
  questionStore.setQuestions([])
  questionStore.setAnswers([])
  questionStore.setCurrentIndex(0)
  questionStore.setTags([])
  questionStore.setDifficulty('')
  questionStore.setCount(0)
}

const handleSave = async () => {
  loading.value = true
  if (!userStore.getUser) return
  await handleSaveQuestions({
    score: score.value,
    questions: questionStore.getQuestions,
    userId: userStore.getUser.id,
    answers: questionStore.getAnswers,
    tags: questionStore.getTags.join(','),
    difficulty: questionStore.getDifficulty,
    count: questionStore.getCount,
  }).finally(() => {
    loading.value = false
  })
}

onMounted(() => {
  score.value = questionStore.getQuestions.reduce((total, item, index) => {
    return total + (item.correct === questionStore.getAnswers[index] ? 1 : 0)
  }, 0)
})
</script>

<style scoped>
.choices {
  width: 100%;
  padding: 1em;
  border-radius: 10px;
  background-color: #282828;
  margin-top: 1em;
  cursor: pointer;
}
:deep(.choices.green) {
  border: 2px solid #0ed06e;
  background-color: rgba(14, 208, 110, 0.03); /* Very light green background */
}

:deep(.choices.red) {
  border: 2px solid #ee2e38;
  background-color: rgba(238, 46, 56, 0.03); /* Very light red background */
}

:deep(.el-scrollbar__bar) {
  width: 0;
}
</style>
