<template>
  <el-row :gutter="1" align="middle" justify="space-between" style="width: 700px">
    <el-col :span="24" style="width: 100%; display: flex; justify-content: center">
      <el-text style="font-size: 36px; font-weight: bolder"
        >Good day, Pick your topics to start!</el-text
      >
    </el-col>
    <el-col :span="16" style="margin-top: 2em; margin-bottom: 2em">
      <el-select
        v-model="questionStore.tags"
        multiple
        filterable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="5"
        placeholder="Topics"
      >
        <el-option
          v-for="item in topicOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-col>
    <el-col :span="4">
      <el-select v-model="questionStore.difficulty" placeholder="Difficulty" size="large">
        <el-option
          v-for="item in DifficultyOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-col>
    <el-col :span="3">
      <el-select v-model="questionStore.count" placeholder="Count" size="large">
        <el-option
          v-for="item in countOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-col>

    <el-col :span="24" style="width: 100%; display: flex; justify-content: center">
      <el-button
        v-loading="questionStore.getLoading"
        :disabled="questionStore.getLoading"
        style="
          width: 100px;
          color: rgba(255, 255, 255, 1);
          border: 2px solid #0ed06e;
          background-color: rgba(14, 208, 110, 0.1);
          font-weight: bold;
          font-size: 16px;
        "
        size="large"
        @click="
          () =>
            handleGetQuestions(
              questionStore.getTags,
              questionStore.getDifficulty,
              questionStore.getCount,
            )
        "
        >Start</el-button
      >
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { handleGetQuestions } from '@/api/actions/questionActions'
import { countOption, DifficultyOptions, topicOptions } from '@/models/constant'
import { useQuestionStore } from '@/stores/questionStore'

const questionStore = useQuestionStore()
</script>

<style scoped>
:deep(.el-select__wrapper) {
  height: 50px;
}
</style>
