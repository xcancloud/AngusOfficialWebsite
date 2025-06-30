<script setup>
import {computed} from 'vue';
import {useSafeI18n} from "../../utils/i18nData.js";

const {safeGet} = useSafeI18n();
const content = computed(() => {
  return safeGet('scenario.ai', '')
});

// 方法改为函数声明
const showVideo = (index) => {
  const mediaContainer = document.querySelectorAll('.feature-media')[index];
  const img = mediaContainer.querySelector('img');
  const video = mediaContainer.querySelector('.feature-video');
  const playBtn = mediaContainer.querySelector('.play-btn');

  // 隐藏图片和播放按钮
  if (img && playBtn) {
    img.style.display = 'none';
    playBtn.style.display = 'none';
  }

  // 显示并播放视频
  if (video) {
    video.style.display = 'block';
    video.play();

    // 视频结束时重置状态
    video.onended = function() {
      img.style.display = 'block';
      playBtn.style.display = 'flex';
      video.style.display = 'none';
    };
  }
};
</script>

<template>
  <div class="angus-tester-page">
    <!-- 头部区域 - 占满整个屏幕宽度 -->
    <header class="full-width-banner">
      <div class="wave">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
        </svg>
      </div>
      <div class="header-content">
        <h1>{{ content.banner.title }}</h1>
        <p>{{ content.banner.description }}</p>
        <a :href="content.banner.button.url" class="btn">{{ content.banner.button.label }}</a>
      </div>
    </header>

    <!-- 特性展示区域 -->
    <section class="features-section">
      <div class="container">
        <div class="feature-grid">
          <div
              v-for="(feature, index) in content.features"
              :key="feature.title"
              class="feature-card"
              :style="{ animationDelay: `${0.1 * index}s` }"
          >
            <!-- 内容区域占比40% -->
            <div class="feature-content">
              <div class="feature-number">{{ index + 1 }}</div>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <div class="feature-description">
                <p v-for="(paragraph, pIndex) in feature.description" :key="pIndex">{{ paragraph }}</p>
              </div>
              <a :href="feature.learnMore.url" class="learn-more">
                {{ feature.learnMore.label }} <i class="fas fa-arrow-right"></i>
              </a>
            </div>

            <!-- 媒体区域占比60% -->
            <div class="feature-media">
              <img :src="feature.image" :alt="feature.title">
              <div class="play-btn" @click="showVideo(index)">
                <i class="fas fa-play"></i>
              </div>
              <video class="feature-video" controls>
                <source :src="feature.video" type="video/mp4">
                您的浏览器不支持视频播放。
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
:root {
  --vp-c-text-1: #213547;
  --vp-c-text-2: rgba(60, 60, 67, 0.78);
  --vp-c-text-3: rgba(60, 60, 67, 0.56);
  --vp-c-bg: #ffffff;
  --vp-c-bg-alt: #f6f6f7;
  --vp-c-bg-soft: #f9f9f9;
  --vp-c-divider: rgba(60, 60, 67, 0.12);
  --vp-border-radius: 8px;
  --vp-font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  --vp-font-family-mono: "Fira Code", "Fira Mono", Menlo, Monaco, Consolas, "Courier New", monospace;
}

.angus-tester-page {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-soft);
  line-height: 1.6;
  overflow-x: hidden;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 头部样式 - 横向占满整个屏幕 */
.full-width-banner {
  background: linear-gradient(135deg, var(--vp-c-brand-light), var(--vp-c-brand));
  color: white;
  padding: 80px 0 60px;
  text-align: center;
  position: relative;
  overflow: hidden;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}

.header-content {
  position: relative;
  z-index: 2;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-content h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.2;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.header-content p {
  font-size: 1.3rem;
  max-width: 700px;
  margin: 0 auto 40px;
  opacity: 0.9;
}

.btn {
  display: inline-block;
  padding: 14px 32px;
  background: white;
  color: var(--vp-c-brand-darker);
  border-radius: var(--vp-border-radius);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  background: var(--vp-c-brand-lighter);
}

/* 特性部分样式 */
.features-section {
  padding: 100px 0;
  background-color: var(--vp-c-bg);
}

.feature-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 80px;
}

.feature-card {
  display: grid;
  /* 内容区域和媒体区域宽度占比4:6 */
  grid-template-columns: 4fr 6fr;
  gap: 40px;
  align-items: center;
  background: var(--vp-c-bg);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.feature-content {
  padding: 40px;
}

.feature-number {
  display: inline-block;
  width: 50px;
  height: 50px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
  font-weight: 700;
  font-size: 1.3rem;
  margin-bottom: 20px;
}

.feature-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--vp-c-brand-dark);
}

.feature-description {
  color: var(--vp-c-text-2);
  margin-bottom: 25px;
  line-height: 1.8;
}

.feature-description p {
  margin-bottom: 15px;
}

.feature-media {
  position: relative;
  height: 400px; /* 固定高度使内容更整齐 */
  overflow: hidden;
  background: var(--vp-c-bg-alt);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.feature-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  display: none;
  border-radius: 12px;
}

.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.play-btn i {
  color: var(--vp-c-brand);
  font-size: 2rem;
  margin-left: 5px;
}

.play-btn:hover {
  transform: translate(-50%, -50%) scale(1.1);
  background: white;
}

.learn-more {
  display: inline-flex;
  align-items: center;
  color: var(--vp-c-brand);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.learn-more i {
  margin-left: 8px;
  transition: transform 0.3s ease;
}

.learn-more:hover {
  color: var(--vp-c-brand-dark);
}

.learn-more:hover i {
  transform: translateX(4px);
}

/* 波浪背景 */
.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
}

.wave svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 120px;
}

.wave .shape-fill {
  fill: var(--vp-c-bg);
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .feature-card {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .feature-media {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .header-content h1 {
    font-size: 2.5rem;
  }

  .header-content p {
    font-size: 1.1rem;
  }

  .feature-title {
    font-size: 1.5rem;
  }

  .feature-content {
    padding: 30px;
  }

  .feature-media {
    height: 350px;
  }
}

@media (max-width: 480px) {
  .header-content h1 {
    font-size: 2rem;
  }

  .btn {
    padding: 12px 25px;
    font-size: 1rem;
  }

  .feature-media {
    height: 250px;
  }
}

/* 动画效果 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.feature-card {
  animation: fadeIn 0.6s ease forwards;
  opacity: 0;
}
</style>