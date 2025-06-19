<template>
  <div class="relative mx-auto">
    <img
      class="w-full"
      src="/assets/image/home/open-1.png"
      alt=""
    >
    <div class="child flex items-center">
      <div>
        <div class="child-text1">
          AngusTester 云测试平台
        </div>
        <div class="child-text2">
          Cloud Testing Platform
        </div>
      </div>
      <RouterLink to="/purchase/angustester">
        <div class="child-btn flex items-center justify-center">
          立即开通
          <Icon icon="icon-hengjiantou" class="text-vp-white ml-2" />
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>

</script>
<style scoped>
.child {
  position: absolute;
  z-index: 9;
  top: 30%;
  width: 100%;
  justify-content: space-around;
}

.child .child-text1 {
  height: 36px;
  margin-bottom: 10px;
  color: #fff;
  /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
  font-family: PingFangSC, PingFang SC;
  font-size: 36px;
  font-weight: 600;
  line-height: 36px;
}



.child .child-text2 {
  color: #fff;
  /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
  font-family: PingFangSC, PingFang SC;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 4px;
  line-height: 16px;
}

.child .child-btn {
  height: 46px;
  padding: 0 20px;
  border: 2px solid #fff;
  border-radius: 8px;
  color: #fff;
  line-height: 46px;
  text-align: center;
}
</style>
