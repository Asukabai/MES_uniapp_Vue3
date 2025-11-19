<template>
  <div class="recommend">
    <div class="header">
      <div class="left">
        <div class="icon-wrapper">
          <image class="icon" :src="IconTitle"></image>
        </div>
        <div class="title">今日主推</div>
      </div>
      <div class="right">
        <span>更多</span>
        <wd-icon name="chevron-right" size="16px"></wd-icon>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="item in contentList" :key="item.id">
        <div class="banner-wrapper">
          <image class="banner" :src="item.banner"></image>
        </div>
        <div class="title">{{ item.title }}</div>
      </div>
    </div>
    <div class="footer">
      <span>活动清单</span>
      <wd-icon name="chevron-right" size="16px"></wd-icon>
    </div>
  </div>
</template>
<script setup>
import IconTitle from '@/static/images/icon-title-act.svg';
import BgDemo1 from '@/static/images/bg-demo1.jpg';
import BgDemo2 from '@/static/images/bg-demo2.jpg';
import BgDemo3 from '@/static/images/bg-demo3.jpg';
import { ref } from 'vue';

const contentList = ref([
  {
    id: 1,
    title: '文章标题文章标题文章标题文章标题文章标题',
    banner: BgDemo1,
  },
  {
    id: 2,
    title: '文章标题文章标题文章标题文章标题文章标题',
    banner: BgDemo2,
  },
  {
    id: 3,
    title: '文章标题文章标题文章标题文章标题文章标题',
    banner: BgDemo3,
  },
  {
    id: 4,
    title: '文章标题文章标题文章标题文章标题文章标题',
    banner: BgDemo2,
  },
]);
</script>

<style scoped lang="scss">
.recommend {
  padding: 20rpx 30rpx;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .left {
    //border: 1px dashed black;

    .icon {
      width: 140rpx;
      height: 32rpx;
    }

    .title {
      font-size: 32rpx;
      color: #EDF2FA;
    }
  }

  .right {
    //border: 1px dashed black;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: #EDF2FA;
    font-size: 26rpx;
  }
}

.list {
  //border: 1px dashed black;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-x: auto;
  gap: 20rpx;
  margin-top: 30rpx;

  .item {
    width: 200rpx;
    .banner-wrapper {
      //border: 1px dashed black;
      //line-height: 0;
      font-size: 0;
      .banner {
        width: 200rpx;
        height: 250rpx;
      }
    }

    .title {
      width: 200rpx;
      @include line-clamp-2();
      font-size: 22rpx;
      color: #EDF2FA;
      margin-top: 10rpx;
    }
  }
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #EDF2FA;
  font-size: 24rpx;
  font-weight: lighter;
  margin-top: 30rpx;
}
</style>
