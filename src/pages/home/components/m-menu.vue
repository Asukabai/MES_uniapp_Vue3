<template>
  <div class="menu">
    <div class="menu-item" v-for="item in menuList" :key="item.title" @click="onClick(item)">
      <div class="icon-wrapper">
        <image class="icon" :src="item.icon"></image>
      </div>
      <div class="title">{{ item.title }}</div>
    </div>
  </div>
</template>
<script setup>
import taskCalendarIcon from '@/static/images/项目编码 (2).png'
import projectListIcon from '@/static/images/项目管理.png'
import fileStatIcon from '@/static/images/项目类型统计.png'
import feedbackIcon from '@/static/images/评论列表-高亮.png'
import progressTrackIcon from '@/static/images/进度跟踪.png'
import contactIcon from '@/static/images/联系人123.png'
import singleScanIcon from '@/static/images/单板扫码.png'
import batchScanIcon from '@/static/images/批量扫码.png'
import scanRecordIcon from '@/static/images/日志详情.png'
import scanConfigIcon from '@/static/images/流程汇总日志.png'
import scanDashboardIcon from '@/static/images/项目总览@3x.png'
import { ref } from 'vue';

const menuList = ref([
  {
    icon: taskCalendarIcon,
    title: '开卷',
    path: '',
  },
  {
    icon: projectListIcon,
    title: '古早',
    path: '',
  },
  {
    icon: fileStatIcon,
    title: '演出',
    path: '',
  },
  {
    icon: feedbackIcon,
    title: '活动',
    path: '',
  },
  {
    icon: progressTrackIcon,
    title: '艺培',
    path: '',
  },
  {
    icon: contactIcon,
    title: '养生',
    path: '',
  },  {
    icon: scanConfigIcon,
    title: '养生',
    path: '',
  },  {
    icon: scanRecordIcon,
    title: '养生',
    path: '',
  },  {
    icon: batchScanIcon,
    title: '养生',
    path: '',
  },  {
    icon: singleScanIcon,
    title: '养生',
    path: '',
  }, {
    icon: scanDashboardIcon,
    title: '养生',
    path: '',
  },
]);

function onClick(item) {
  uni.navigateTo({
    url: item.path,
  });
}
</script>

<style scoped lang="scss">
.menu {
  //border: 1px dashed black;
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  padding: 50rpx 30rpx;
  gap: 50rpx 0;
}

.menu-item {
  width: calc(100% / 6);

  .icon-wrapper {
    //border: 1px dashed black;
    font-size: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      width: 50rpx;
      height: 50rpx;
    }
  }

  .title {
    font-size: 28rpx;
    text-align: center;
    margin-top: 5rpx;
  }
}
</style>
