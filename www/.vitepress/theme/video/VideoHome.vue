<script setup>
import { ref, computed } from 'vue'

import {useSafeI18n} from "../../utils/i18nData.js";
const {safeGet} = useSafeI18n();

// 多语言消息对象
const messages = computed(() => {
  return safeGet('video.messages', '')
});

// 精选视频数据
const featuredVideos = computed(() => {
  return safeGet('video.featuredVideos', '')
});

// 课程数据
const courses = computed(() => {
  return safeGet('video.courses', '')
});

// 订阅逻辑
const email = ref('')
const submitSubscribe = () => {
  alert(`提交的邮箱: ${email.value}\n实际功能待后端实现`)
  email.value = ''
}

// 播放视频函数
const playVideo = (video) => {
  alert(`即将播放视频: ${video.title}\n在实际应用中，这里将打开视频播放器或跳转到详情页`)
}

// 查看课程函数
const viewCourse = (course) => {
  alert(`即将查看课程: ${course.title}\n在实际应用中，这里将跳转到课程详情页`)
}

// 滚动到订阅区域
const subscribeSection = ref(null)
function scrollToSubscribe() {
  if (subscribeSection.value) {
    subscribeSection.value.scrollIntoView({ behavior: 'smooth' })
  }
}

</script>

<template>
  <div id="app">
    <div class="video-page">
      <!-- 修复后的顶部Banner -->
      <div class="video-banner-container">
        <section class="video-banner">
          <div class="video-banner-content">
            <div class="video-banner-text">
              <h1>{{ messages.pageTitle }}</h1>
              <p>{{ messages.bannerSubtitle }}</p>
              <div class="video-banner-actions">
                <button class="btn btn-primary">{{ messages.signUpNow }}</button>
                <button class="btn btn-outline" @click="scrollToSubscribe">{{ messages.subscribeButton }}</button>
              </div>
            </div>
            <div class="video-banner-shapes">
              <div class="shape shape-1"></div>
              <div class="shape shape-2"></div>
              <div class="shape shape-3"></div>
              <div class="play-icon"></div>
            </div>
          </div>
        </section>
      </div>

      <!-- 精选视频区域 -->
      <div class="section-header">
        <h2 class="section-title">{{ messages.featuredVideos }}</h2>
      </div>

      <div class="video-grid">
        <div class="card card-featured" v-for="(video, index) in featuredVideos" :key="index" @click="playVideo(video)">
          <div class="card-image">
            <img :src="video.thumbnail" alt="视频封面">
            <div class="duration">{{ video.duration }}</div>
          </div>
          <div class="card-content">
            <div class="card-header">
              <h3 class="card-title">{{ video.title }}</h3>
            </div>
            <div class="card-meta">
              <span><i class="fas fa-user"></i> {{ video.author }}</span>
              <span><i class="fas fa-calendar"></i> {{ video.date }}</span>
            </div>
            <p class="card-description">{{ video.description }}</p>
          </div>
        </div>
      </div>

      <!-- 课程视频区域 -->
      <div class="section-header">
        <h2 class="section-title">{{ messages.courseCategories }}</h2>
      </div>

      <div class="course-grid">
        <div class="card" v-for="(course, index) in courses" :key="index" @click="viewCourse(course)">
          <div class="card-image">
            <img :src="course.thumbnail" alt="课程封面">
            <div class="duration">{{ course.total_duration }}</div>
          </div>
          <div class="card-content">
            <div class="card-header">
              <h3 class="card-title">{{ course.title }}</h3>
            </div>
            <p class="card-description">{{ course.description }}</p>
            <div class="stats">
              <span><i class="fas fa-video"></i> {{ course.video_count }}个视频</span>
              <span><i class="fas fa-clock"></i> {{ course.total_duration }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 订阅表单 -->
      <section class="video-subscribe" ref="subscribeSection">
        <h2 class="video-subscribe-title">{{ messages.subscribeTitle }}</h2>
        <p class="video-subscribe-subtitle">{{ messages.subscribeDescription }}</p>
        <form class="video-subscribe-form" @submit.prevent="submitSubscribe">
          <input type="email" class="form-control" :placeholder="messages.emailPlaceholder" required v-model="email">
          <button type="submit" class="btn btn-primary">{{ messages.subscribeBtn }}</button>
        </form>
      </section>
    </div>
  </div>
</template>

<style>
:root {
  /* Vitepress主题变量 */
  --vp-c-text-1: rgba(60, 60, 67, 0.9);
  --vp-c-text-2: rgba(60, 60, 67, 0.78);
  --vp-c-text-3: rgba(60, 60, 67, 0.56);
  --vp-c-bg: #ffffff;
  --vp-c-bg-alt: #f8f8f8;
  --vp-c-bg-elv: #ffffff;
  --vp-c-divider: rgba(60, 60, 67, 0.12);
  --vp-c-divider-light: rgba(60, 60, 67, 0.08);
  --vp-shadow-1: 0 1px 4px rgba(0, 0, 0, 0.05);
  --vp-shadow-2: 0 3px 12px rgba(0, 0, 0, 0.07);
  --vp-shadow-3: 0 8px 24px rgba(0, 0, 0, 0.09);
  --vp-shadow-4: 0 16px 48px rgba(0, 0, 0, 0.1);
  --vp-radius-small: 4px;
  --vp-radius-medium: 8px;
  --vp-radius-large: 16px;
  --vp-font-family-base: 'Inter var experimental', 'Inter var', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  --vp-font-family-mono: 'Menlo', 'Monaco', 'Consolas', 'Courier New', monospace;
  --vp-code-font-size: 14px;
  --vp-line-height-base: 1.6;
}

.dark {
  --vp-c-bg: #121212;
  --vp-c-bg-alt: #1a1a1a;
  --vp-c-bg-elv: #1e1e1e;
  --vp-c-text-1: rgba(255, 255, 245, 0.86);
  --vp-c-text-2: rgba(235, 235, 245, 0.6);
  --vp-c-text-3: rgba(235, 235, 245, 0.38);
  --vp-c-divider: rgba(82, 82, 89, 0.32);
  --vp-c-divider-light: rgba(82, 82, 89, 0.24);
  --vp-shadow-1: 0 1px 4px rgba(0, 0, 0, 0.3);
  --vp-shadow-2: 0 3px 12px rgba(0, 0, 0, 0.4);
  --vp-shadow-3: 0 8px 24px rgba(0, 0, 0, 0.5);
  --vp-shadow-4: 0 16px 48px rgba(0, 0, 0, 0.6);
  --vp-c-brand: #64a8ff;
  --vp-c-brand-light: #7ebdff;
}

body {
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  line-height: var(--vp-line-height-base);
  transition: background-color 0.5s ease, color 0.3s ease;
  overflow-x: hidden;
}

.video-page {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 1.5rem 2rem;
}

/* Banner 样式 - 全屏设计 */
.video-banner-container {
  position: relative;
  margin-bottom: 3rem;
  overflow: hidden;
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);
}

.video-banner {
  position: relative;
  overflow: hidden;
  height: 320px;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, var(--vp-c-brand-light), var(--vp-c-brand));
  box-shadow: var(--vp-shadow-2);
  animation: fadeIn 1.2s ease-out;
  width: 100%;
  max-width: 100vw;
}

.dark .video-banner {
  background: linear-gradient(135deg, var(--vp-c-brand-dark), var(--vp-c-brand-darker));
}

/* 动画形状 */
.video-banner::before,
.video-banner::after {
  content: '';
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  border-radius: 45%;
  background: rgba(255,255,255,0.05);
  animation: rotate 18s linear infinite;
  transform: rotate(0deg);
  opacity: 0.15;
}

.video-banner::after {
  animation-delay: -9s;
  opacity: 0.1;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.video-banner-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.video-banner-text {
  max-width: 650px;
  position: relative;
  z-index: 2;
}

.video-banner h1 {
  font-size: 3rem;
  margin-bottom: 1.2rem;
  font-weight: 800;
  text-shadow: 0 2px 8px rgba(0,0,0,0.2);
  animation: fadeIn 0.8s ease-out 0.3s both;
}

.video-banner p {
  font-size: 1.3rem;
  opacity: 0.92;
  margin-bottom: 1.8rem;
  text-shadow: 0 1px 3px rgba(0,0,0,0.2);
  animation: fadeIn 0.8s ease-out 0.6s both;
}

/* 使用CSS创建的动画图形 */
.video-banner-shapes {
  position: relative;
  width: 400px;
  height: 280px;
  animation: float 3s ease-in-out infinite;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  animation-duration: 20s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.shape-1 {
  width: 180px;
  height: 180px;
  top: 20px;
  left: 20px;
  background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
  animation: rotate 25s linear infinite;
  box-shadow: 极速安装0 0 20px rgba(255,255,255,0.1);
}

.shape-2 {
  width: 120px;
  height: 120px;
  bottom: 30px;
  right: 40px;
  background: linear-gradient(45deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05));
  animation: pulse 4s ease-in-out infinite;
}

.shape-3 {
  width: 80px;
  height: 80px;
  top: 100px;
  right: 100极速安装px;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  animation: float 6s ease-in-out infinite;
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s ease-in-out infinite;
  z-index: 2;
}

.play-icon::before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left: 25px solid white;
  left: 55%;
  transform: translateX(-50%);
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
}

.video-banner-actions {
  display: flex;
  gap: 1rem;
  animation: fadeIn 0.8s ease-out 0.9s both;
}

.btn {
  padding: 0.9rem 1.8rem;
  border-radius: var(--vp-radius-small);
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  font-size: 1.1rem;
  position: relative;
  overflow: hidden;
}

.btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255,255,255,0.15);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.btn:hover::after {
  opacity: 1;
}

.btn-primary {
  background: white;
  color: var(--vp-c-brand);
  box-shadow: var(--vp-shadow-1);
}

.dark .btn-primary {
  background: var(--vp-c-bg);
  color: var(--vp-c-brand-light);
}

.btn-outline {
  background: transparent;
  color: white;
  border: 2px solid rgba(255,255,255,0.7);
}

.dark .btn-outline {
  border: 2px solid rgba(255,255,255,0.85);
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: var(--vp-shadow-3);
}

/* 分区标题 */
.section-header {
  margin-bottom: 1.8rem;
  margin-top: 3rem;
}

.section-title {
  font-size: 1.9rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  position: relative;
  padding-left: 1rem;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background: var(--vp-c-brand);
  border-radius: 2px;
}

/* 卡片样式 */
.video-grid {
  display: grid;
  gap: 1.8rem;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

.card {
  background-color: var(--vp-c-bg-elv);
  border-radius: var(--vp-radius-medium);
  overflow: hidden;
  box-shadow: var(--vp-shadow-1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: var(--vp-shadow-3);
}

.card-featured {
  grid-column: span 1;
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.8rem;
}

.card-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.card:hover .card-image img {
  transform: scale(1.08);
}

.duration {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: var(--vp-radius-small);
  font-size: 0.85rem;
  font-weight: 500;
}

.card-content {
  padding: 1.25rem 1.5rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.card:hover .card-title {
  color: var(--vp-c-brand);
}

.card-meta {
  display: flex;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.75rem;
}

.card-description {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.stats {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--vp-c-divider-light);
  padding-top: 0.75rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
}

/* 订阅表单 */
.video-subscribe {
  background-color: var(--vp-c-bg-alt);
  border-radius: var(--vp-radius-large);
  padding: 2.8rem;
  margin: 4.5rem 0 2rem;
  text-align: center;
  box-shadow: var(--vp-shadow-1);
  transition: all 0.3s ease;
  border: 1px solid var(--vp-c-divider-light);
}

.video-subscribe:hover {
  transform: translateY(-5px);
  box-shadow: var(--vp-shadow-3);
}

.video-subscribe-title {
  font-size: 1.9rem;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.video-subscribe-subtitle {
  color: var(--vp-c-text-2);
  max-width: 600px;
  margin: 0 auto 2rem;
  font-size: 1.1rem;
}

.video-subscribe-form {
  display: flex;
  max-width: 500px;
  margin: 0 auto;
  gap: 0.75rem;
}

.form-control {
  flex: 1;
  padding: 1rem 1.3rem;
  border-radius: var(--vp-radius-small);
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-1);
  font-size: 1.05rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: var(--vp-c-brand-light);
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.2);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .video-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  .course-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }

  .video-banner h1 {
    font-size: 2.6rem;
  }
}

@media (max-width: 900px) {
  .video-banner {
    height: 280px;
  }

  .video-banner-content {
    flex-direction: column;
    text-align: center;
  }

  .video-banner-shapes {
    display: none;
  }

  .video-banner-actions {
    justify-content: center;
  }

  .video-banner-text {
    max-width: 90%;
  }
}

@media (max-width: 768px) {
  .video-banner {
    height: 250px;
  }

  .video-banner h1 {
    font-size: 2.2rem;
  }

  .video-banner p {
    font-size: 1.1rem;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .video-subscribe {
    padding: 1.8rem;
  }

  .video-subscribe-title {
    font-size: 1.6rem;
  }

  .video-subscribe-form {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .video-banner {
    height: 240px;
  }

  .video-banner h1 {
    font-size: 1.9rem;
  }

  .video-page {
    padding: 0 1rem 1.5rem;
  }

  .btn {
    padding: 0.8rem 1.2rem;
    font-size: 1rem;
  }

  .video-grid,
  .course-grid {
    grid-template-columns: 1fr;
  }
}
</style>