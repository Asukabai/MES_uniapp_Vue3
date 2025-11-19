<template>
  <view class="home-container">
    <!-- 背景图片 -->
    <view class="background"></view>
    <!-- 卡片容器（固定定位） -->
    <view class="card-wrapper">
      <view class="card-content">
        <!-- 资产卡片 -->
        <view class="card-section asset-card">
          <wd-grid :border="false" :column-num="3">
            <wd-grid-item
                v-for="(item, index) in assetItems"
                :key="index"
                :icon="item.icon"
                :text="item.text"
                @click="handleGridClick(item)"
                class="custom-grid-item"
            />
          </wd-grid>
        </view>
        <!-- 耗材卡片 -->
        <view class="card-section consumable-card">
          <wd-grid :border="false" :column-num="3">
            <wd-grid-item
                v-for="(item, index) in consumableItems"
                :key="index"
                :icon="item.icon"
                :text="item.text"
                @click="handleGridClick(item)"
                class="custom-grid-item"
            />
          </wd-grid>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
import { ref, computed } from 'vue'
import { departmentPrefix } from "@/pages/utils/Dingding";
import SensorRequest from "@/pages/utils/SensorRequest";
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
// 响应式数据
const assetItems = ref([
  { icon: taskCalendarIcon, text: '任务日历' },
  { icon: projectListIcon, text: '项目列表' },
  { icon: fileStatIcon, text: '文件统计' },
  { icon: feedbackIcon, text: '问题反馈' },
  { icon: progressTrackIcon, text: '进度跟踪' },
  { icon: contactIcon, text: '联系人' },
])
const consumableItems = ref([
  { icon: singleScanIcon, text: '单板扫码' },
  { icon: batchScanIcon, text: '批量扫码' },
  { icon: scanRecordIcon, text: '扫码记录' },
  { icon: scanConfigIcon, text: '扫码配置' },
  { icon: scanDashboardIcon, text: '扫码看板' }
])
// 方法定义
const handleGridClick = (item) => {
  if (item.text === '任务日历') {
    uni.navigateTo({
      url: `/${departmentPrefix}/task-manage`
    })
  }
  if (item.text === '项目列表') {
    uni.navigateTo({
      url: `/${departmentPrefix}/project-manage`
    })
  }
  if (item.text === '文件统计') {
    uni.navigateTo({
      url: `/${departmentPrefix}/statistical-report`
    })
  }
  if (item.text === '进度跟踪') {
    uni.navigateTo({
      url: `/${departmentPrefix}/progress-tracking`
    })
  }
  if (item.text === '问题反馈') {
    uni.showToast({
      title: '感谢您的反馈',
      icon: 'success'
    })
  }
  if (item.text === '单板扫码') {
    scanQRCode()
  }
  if (item.text === '批量扫码') {
    uni.showToast({
      title: '正在开发中',
      icon: 'none'
    })
  }
  if (item.text === '联系人') {
    uni.showToast({
      title: '正在开发中',
      icon: 'none'
    })
  }
  if (item.text === '扫码配置') {
    uni.navigateTo({
      url: `/${departmentPrefix}/code/config`
    })
  }
  if (item.text === '扫码看板') {
    uni.showToast({
      title: '正在开发中',
      icon: 'none'
    })
  }
}

const scanQRCode = () => {
  console.log("开始扫码");
  // 使用钉钉API进行扫码
  if (typeof dd !== 'undefined') {
    dd.ready(() => {
      dd.biz.util.scan({
        type: 'qrCode',
        onSuccess: (data) => {
          const result = data.text;
          if (result) {
            const parts = result.split('_');
            if (parts.length < 3) {
              uni.showToast({
                title: '二维码的类型不符，请切换板卡重新扫描!',
                icon: 'none'
              });
              return;
            }

            // 检查二维码是否存在于数据库中
            SensorRequest.GetAssetInfoByAssetCodeFun(JSON.stringify({ Asset_Code: result }), (response) => {
              let respone_Object = JSON.parse(response);
              if (respone_Object.Project_Code === '' && respone_Object.Project_Name === '') {
                uni.navigateTo({
                  url: `/${departmentPrefix}/code/AddStored`,
                  query: {
                    Module_Name: respone_Object.Module_Name,
                    Module_Type: respone_Object.Module_Type
                  }
                });
              } else {
                uni.navigateTo({
                  url: `/${departmentPrefix}/code/AddHistory`,
                  query: {
                    Module_Name: respone_Object.Module_Name,
                    Module_Type: respone_Object.Module_Type
                  }
                });
              }
            }, (searchError) => {
              uni.showToast({
                title: '二维码未查询到，请联系管理员配置录入！',
                icon: 'none'
              });
            });

            // 存储扫码结果
            uni.setStorageSync('key_DingScannedResult', result);
          } else {
            uni.showToast({
              title: '扫描的二维码不符合要求，请重新扫描！',
              icon: 'none'
            });
          }
        },
        onFail: (err) => {
          if (err.errorCode !== 300001) {
            uni.showToast({
              title: '未扫描到二维码！',
              icon: 'none'
            });
          }
        }
      });
    });
  } else {
    uni.showToast({
      title: '请在钉钉客户端中操作',
      icon: 'none'
    });
  }
}
</script>

<style scoped>
.home-container {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background-color: #f5f5f5;
}

/* 背景图片 - 最底层 */
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/static/images/background.png');
  background-size: cover;
  background-position: center;
  z-index: 1;
}

/* 卡片容器 - 中间层 */
.card-wrapper {
  position: fixed;
  top: 33vh;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 750rpx;
  z-index: 2;
  display: flex;
  flex-direction: column;
  bottom: calc(100rpx + env(safe-area-inset-bottom, 20rpx));
  padding: 0 32rpx;
}

.card-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 32rpx 32rpx 32rpx;
  scrollbar-width: none;
}

.card-content::-webkit-scrollbar {
  display: none;
}

/* 卡片区域 */
.card-section {
  margin: 40rpx auto 16rpx;
 padding: 16rpx;
 width: 100%;
 background-color: #ffffff;
 border-radius: 24rpx;
 box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
 z-index: 3;
 position: relative;
 min-height: fit-content;
}

/* 六宫格项样式 */
.custom-grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20rpx 0;
}

/* 响应式调整 */
@media (max-width: 375px) {
  .card-wrapper {
    top: 120px;
    width: 85%;
  }

  .custom-grid-item {
    padding: 16rpx 0;
  }
}

@media (min-width: 414px) {
  .card-wrapper {
    width: 85%;
  }
}
</style>
