<template>
  <el-aside style="height: 100vh; display: flex; flex-direction: column">
    <el-header
      style="
        display: flex;
        align-items: center;
        justify-content: start;
        border-bottom: 1px solid var(--vt-c-black-mute);
      "
    >
      <el-text size="large" style="font-size: 24px; font-weight: bold">AInterview</el-text>
    </el-header>
    <el-main
      v-loading="questionStore.getQuizSessionLoading"
      style="
        width: 100%;
        height: 100%;
        box-shadow: inset 0px 0px 10px 4px rgba(0, 0, 0, 0.2);
        padding: 0;
      "
    >
      <el-scrollbar style="width: 100%; padding: 1em">
        <el-card
          v-for="(item, index) in questionStore.getQuizSession"
          :key="index"
          style="margin-top: 1em; cursor: pointer"
          :class="{
            green: questionStore.getCurrentQuizSession?.id === item?.id,
          }"
          @click="questionStore.setCurrentQuizSession(item)"
        >
          <el-col :span="24" style="display: flex; justify-content: space-between">
            <el-text>{{ `Quiz ` }}</el-text>
            <el-text>{{
              `Score : ${questionStore.getQuizSession[index].score} / ${questionStore.getQuizSession[index].questions.length} `
            }}</el-text>
          </el-col>
          <el-row>
            <el-col :span="7">
              <el-text>Difficulty:</el-text>
            </el-col>
            <el-col :span="17">
              <el-tag :type="getDifficultyColor(item.difficulty)" size="small">{{
                item.difficulty
              }}</el-tag>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-text>Items:</el-text>
            </el-col>
            <el-col :span="17">
              <el-tag type="info" size="small">{{ item.count }}</el-tag>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-text>Topics:</el-text>
            </el-col>
            <el-col :span="17">
              <el-tag
                type="info"
                size="small"
                v-for="(topic, index) in item.tags.split(',')"
                :key="index"
                >{{ topic }}</el-tag
              >
            </el-col>
          </el-row>
        </el-card>
      </el-scrollbar>
    </el-main>
    <el-footer
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid var(--vt-c-black-mute);
      "
    >
      <el-text style="font-weight: bold; letter-spacing: 0.5px; font-size: 12px">
        {{ userStore.getUser?.email }}
      </el-text>
    </el-footer>
  </el-aside>
</template>

<script setup lang="ts">
import { handleFetchQuizSessions } from '@/api/actions/questionActions'
import { useQuestionStore } from '@/stores/questionStore'
import { useUserStore } from '@/stores/userStore'
import { onMounted } from 'vue'

const questionStore = useQuestionStore()
const userStore = useUserStore()

const getDifficultyColor = (diff: string) => {
  if (diff === 'easy') {
    return 'success'
  } else if (diff === 'medium') {
    return 'warning'
  } else {
    return 'danger'
  }
}

onMounted(async () => {
  await handleFetchQuizSessions()
})
</script>
<style scoped>
:deep(.green) {
  border: 1px solid #0ed06e;
}
</style>
