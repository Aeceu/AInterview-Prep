<template>
  <el-scrollbar
    style="padding: 1em; width: 100%; display: flex; align-items: center; justify-content: center"
  >
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
      v-for="(item, index) in questionStore.getCurrentQuizSession?.questions"
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
              item.questionAnswers[0].selected !== item.correct &&
              item.questionAnswers[0].selected === itemChoice.letter,
          }"
        >
          <el-text size="large" style="font-size: 18px; letter-spacing: 2px">{{
            `${itemChoice.letter.toUpperCase()}. ${itemChoice.text}`
          }}</el-text>
        </el-col>
      </el-row>
    </el-card>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { useQuestionStore } from '@/stores/questionStore'

const questionStore = useQuestionStore()
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
  background-color: rgba(14, 208, 110, 0.03);
}

:deep(.choices.red) {
  border: 2px solid #ee2e38;
  background-color: rgba(238, 46, 56, 0.03);
}

/* :deep(.el-scrollbar__bar) { */
/*   width: 0; */
/* } */
</style>
