<template>
  <el-card ref="target" style="width: 600px; margin-top: 1em">
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
        >{{ `${questionStore.getCurrentIndex + 1}. ${props.questionnare.question}` }}</el-text
      >
    </template>

    <el-row>
      <el-col
        class="choices"
        v-for="(item, index) in props.questionnare.choices"
        :key="index"
        :span="24"
        @click="userChoice = item.letter"
        :class="{
          green: userChoice === item.letter,
        }"
      >
        <el-text size="large" style="font-size: 18px; letter-spacing: 2px">{{
          `${item.letter.toUpperCase()}. ${item.text}`
        }}</el-text>
      </el-col>
      <el-col
        :span="24"
        style="display: flex; align-items: center; justify-content: end; margin-top: 1em"
      >
        <el-button
          @click="handleNext"
          size="large"
          style="
            color: rgba(255, 255, 255, 1);
            border: 2px solid #0ed06e;
            background-color: rgba(14, 208, 110, 0.1); /* Light green background */
            font-weight: bold;
            font-size: 16px;
          "
          >Next</el-button
        >
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import type { QuestionTypes } from '@/models/types'
import { useQuestionStore } from '@/stores/questionStore'
import { useMotion } from '@vueuse/motion'
import { ref } from 'vue'

type Props = {
  questionnare: QuestionTypes
}
const props = defineProps<Props>()

const target = ref<HTMLElement>()
const userChoice = ref<string>('')

const questionStore = useQuestionStore()

const { variant } = useMotion(target, {
  initial: {
    opacity: 0,
    x: 200,
  },
  enter: {
    opacity: 1,
    x: 0,
  },
  leave: {
    opacity: 0,
    x: -200,
  },
})

const handleNext = () => {
  questionStore.setAnswer(userChoice.value)

  setTimeout(() => {
    if (questionStore.getCurrentIndex < questionStore.getQuestions.length) {
      questionStore.setCurrentIndex(questionStore.getCurrentIndex + 1)
      userChoice.value = ''
    }
    variant.value = 'leave'
  })
}
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
</style>
