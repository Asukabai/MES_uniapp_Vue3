<script setup>
import { ref, provide } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';

onLoad(() => {
  console.log('onLoad');
});

onShow(() => {
  console.log('onShow');
});
</script>

<style>
/*每个页面公共css */
</style>
