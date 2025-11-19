<template>
  <view class="user-page-wrapper" :class="{ 'safe-area-bottom': isIOS }">
    <view class="user-content">
      <wd-cell
          :title-style="{ fontWeight: 'bold', fontSize: '16px' }"
      />
      <!-- 用户信息卡片 -->
      <wd-cell-group class="user-card">
        <wd-cell class="user-card-background">
          <view style="display: flex; align-items: center;">
            <view class="user-details">
              <view v-if="!userInfo.name">正在加载用户信息...</view>
              <view v-else><text class="label">姓名：</text>{{ userInfo.name }}</view>
              <view><text class="label">手机号：</text>{{ userInfo.phone }}</view>
              <view><text class="label">企业：</text>{{ companyInfo.name }}</view>
            </view>
          </view>
        </wd-cell>
<!--        <view class="footer-section">-->
<!--          <VerificationCode />-->
<!--        </view>-->
      </wd-cell-group>
      <!-- 其他功能入口 -->
      <wd-cell-group style="margin-top: 15px;">
<!--        <wd-cell title="个人资料" is-link @click="goToProfile" />-->
        <wd-cell title="缓存清理" is-link @click="handleInviteClick" />
        <wd-cell title="推送通知" is-link @click="handlePushNotification" />
        <wd-cell title="在线支持" is-link @click="handleOnlineSupport" />
        <wd-cell title="系统版本" :value="version" />
      </wd-cell-group>
    </view>
  </view>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { getCurrentDepartment, departmentPrefix } from "@/pages/utils/Dingding"

// 响应式数据
const userInfo = ref({
  name: '',
  phone: ''
})

const isIOS = ref(false)
const companyInfo = ref({
  name: ''
})

const version = ref('V0.1.1')

// 计算属性
const deptPrefix = computed(() => departmentPrefix)

// 方法定义
const detectIOS = () => {
  // 检测是否为iOS设备
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  isIOS.value = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
}

const loadUserInfo = () => {
  const name = uni.getStorageSync('sensor_DingName'); // 从缓存中获取姓名
  const phone = uni.getStorageSync('key_DingUserPhone'); // 假设手机号也已保存

  userInfo.value = {
    name: name || '未知用户',
    phone: phone || '未绑定手机号'
  };
}

// 新增方法：加载公司信息
const loadCompanyInfo = () => {
  const department = getCurrentDepartment();
  const companyNames = {
    'xian': '陕西晟思智能测控有限公司',
    'taiyuan': '山西大钧自动化设备有限公司'
  };

  companyInfo.value.name = companyNames[department] || companyNames['xian'];
}

const goToProfile = () => {
}

const handleInviteClick = () => {
  uni.showModal({
    title: '提示',
    content: '确定要清除所有本地缓存吗？',
    success: function (res) {
      if (res.confirm) {
        try {
          // 调用uniapp清除缓存方法
          uni.clearStorageSync();
          uni.showToast({
            title: '缓存已清除',
            icon: 'success'
          });
          loadUserInfo(); // 重新加载用户信息
        } catch (e) {
          console.error('清除缓存出错:', e);
          uni.showToast({
            title: '清除缓存失败',
            icon: 'none'
          });
        }
      }
    }
  });
}

const handlePushNotification = () => {
  uni.showToast({
    title: '推送通知已开启',
    icon: 'success'
  });
}

const handleOnlineSupport = () => {
  uni.showLoading({
    title: '正在连接客服...'
  });
  setTimeout(() => {
    uni.hideLoading();
  }, 2000);
}

// 生命周期钩子
onMounted(() => {
  loadUserInfo();
  detectIOS();
  loadCompanyInfo();
})
</script>

<style scoped>
.user-page-wrapper {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.user-content {
  padding: 0 0 10px 0;
  min-height: 100%;
}

.user-card {
  margin: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.user-card-background {
  background-image: url('@/static/images/background-2.png'); /* 替换为您的背景图片路径 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 150px;
  position: relative;
}

.user-card-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.25); /* 半透明白色遮罩 */
  z-index: 1;
}

.user-info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
}

.user-details {
  text-align: left;
  position: relative;
  z-index: 2;
  width: 100%;
}

.user-details view {
  background-color: rgba(255, 255, 255, 0.7); /* 为文字添加轻微背景以提高可读性 */
  padding: 10px 10px;
  border-radius: 15px;
  display: block;
  margin: 8px 0;
  text-align: left;
}

.label {
  font-weight: bold;
}

/* 确保最后的内容不会被底部导航栏遮挡 */
.footer-section {
  margin-bottom: 20px;
}
</style>
