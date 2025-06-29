<template>
  <!-- 增强版顶部Banner -->
  <div class="banner-container">
    <div class="banner-content">
      <div class="banner-text">
        <h1 class="banner-title">{{ messages.bannerTitle }}</h1>
        <p class="banner-description">{{ messages.bannerDescription }}</p>
        <div class="banner-cta">
          <button class="cta-button">{{ messages.exploreButton }}</button>
          <button class="cta-button secondary" @click="scrollToSubscribe">
            {{ messages.subscribeButton }}
          </button>
        </div>
      </div>
      <div class="banner-graphic">
        <div class="graphic-element"></div>
        <div class="graphic-element"></div>
        <div class="graphic-element"></div>
      </div>
    </div>

    <!-- 波浪分隔线 -->
    <div class="wave-divider">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="wave-fill"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="wave-fill"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="wave-fill"></path>
      </svg>
    </div>
  </div>

  <div class="blog-container">
    <!-- 标签过滤区域 -->
    <div class="filter-section">
      <h2 class="filter-title">{{ messages.filterTitle }}</h2>
      <div class="tags-container">
        <button
            v-for="(tag, index) in allTags"
            :key="index"
            class="tag-btn"
            :class="{ 'active': activeTag === tag }"
            @click="toggleTag(tag)"
        >
          {{ tag }}
        </button>
      </div>
      <div v-if="activeTag" class="active-filter-info">
        {{ messages.filteringBy }}: <strong>{{ activeTag }}</strong>
        <button class="clear-filter-btn" @click="clearFilter">
          {{ messages.clearFilter }}
        </button>
      </div>
    </div>

    <!-- 博客文章列表 -->
    <div class="blog-list">
      <div
          v-for="(post, index) in filteredPosts"
          :key="index"
          class="blog-card"
          :style="`--delay: ${index * 0.1}s;`"
      >
        <div
            class="card-img"
            :style="post.image ? `background-image: url(${post.image})` : ''"
        >
          <span class="tag-badge" v-for="tag in post.tags" :key="tag">{{ tag }}</span>
        </div>
        <div class="card-content">
          <h3 class="post-title">{{ post.title }}</h3>
          <p class="post-description">{{ post.description }}</p>
          <div class="post-meta">
            <div class="author-info">
              <div class="author-avatar"></div>
              <div>
                <div class="author-name">{{ post.author }}</div>
                <div class="post-date">{{ formatDate(post.date) }}</div>
              </div>
            </div>
            <div class="read-time">{{ post.readTime }} {{ messages.minRead }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 没有文章时的提示 -->
    <div v-if="filteredPosts.length === 0" class="no-results">
      <div class="no-results-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2"/>
          <path d="M12 8V12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 16H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <h3>{{ messages.noResultsTitle }}</h3>
      <p>{{ messages.noResultsDescription }}</p>
      <button class="clear-filter-btn" @click="clearFilter">
        {{ messages.clearFilter }}
      </button>
    </div>

    <!-- 订阅表单 -->
    <div class="subscription-section" ref="subscribeSection">
      <div class="subscribe-content">
        <div class="subscribe-text">
          <h2 class="subscribe-title">{{ messages.subscribeTitle }}</h2>
          <p class="subscribe-description">{{ messages.subscribeDescription }}</p>
        </div>
        <form @submit.prevent="handleSubscription" class="subscribe-form">
          <div class="input-group">
            <input
                type="email"
                v-model="subscriberEmail"
                :placeholder="messages.emailPlaceholder"
                required
                class="email-input"
            >
            <button type="submit" class="subscribe-btn">
              {{ messages.subscribeButton }}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <p class="privacy-note">{{ messages.privacyNote }}</p>
        </form>
      </div>
      <div class="subscribe-graphic">
        <div class="graphic-element"></div>
        <div class="graphic-element"></div>
        <div class="graphic-element"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

// 多语言消息对象
const messages = reactive({
  bannerTitle: "探索前沿技术，分享专业智慧",
  bannerDescription: "专注于软件开发、软件测试和人工智能的技术博客，致力于分享实用的技术教程和行业洞察",
  exploreButton: "探索文章",
  subscribeButton: "订阅更新",
  filterTitle: "按标签筛选",
  clearFilter: "清除筛选",
  filteringBy: "正在筛选",
  minRead: "分钟阅读",
  noResultsTitle: "没有找到匹配的文章",
  noResultsDescription: "尝试选择其他标签或清除筛选条件",
  subscribeTitle: "订阅最新文章",
  subscribeDescription: "获取前端技术最新动态和文章更新",
  emailPlaceholder: "输入您的邮箱地址",
  privacyNote: "我们尊重您的隐私，绝不会分享您的邮箱"
})

// 博客文章数据
const blogPosts = ref([
  {
    id: 1,
    title: "Vue 3 组合式 API 深度指南",
    description: "探索 Vue 3 组合式 API 的强大功能和实用技巧，提高开发效率和代码复用性。",
    date: "2023-05-15",
    readTime: 8,
    tags: ["Vue", "JavaScript"],
    author: "张明",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "现代 CSS 布局完全指南",
    description: "掌握 CSS Grid 和 Flexbox 等现代布局技术，创建响应式和灵活的页面布局。",
    date: "2023-06-20",
    readTime: 12,
    tags: ["CSS", "前端"],
    author: "李华",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Vitepress 主题开发详解",
    description: "从零开始创建自定义 Vitepress 主题，打造个人化文档网站和博客。",
    date: "2023-07-10",
    readTime: 15,
    tags: ["Vitepress", "Vue"],
    author: "王芳",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "TypeScript 类型系统高级技巧",
    description: "深入了解 TypeScript 高级类型系统，掌握泛型、条件类型等复杂类型操作。",
    date: "2023-07-25",
    readTime: 10,
    tags: ["TypeScript"],
    author: "赵强",
    image: "https://images.unsplash.com/photo-1579820011850-7e626c40b5ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "前端性能优化实践",
    description: "网站性能优化的现代策略和工具，包含图片优化、代码拆分和懒加载技术。",
    date: "2023-08-05",
    readTime: 9,
    tags: ["性能优化"],
    author: "陈静",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    title: "Webpack 5 配置指南",
    description: "从初级到高级的 Webpack 5 配置教程，涵盖常用加载器和插件使用方法。",
    date: "2023-08-12",
    readTime: 14,
    tags: ["Webpack"],
    author: "刘伟",
    image: "" // 测试空图片情况
  }
])

// 标签相关逻辑
const activeTag = ref(null)

// 所有标签列表
const allTags = computed(() => {
  const tags = new Set()
  blogPosts.value.forEach(post => {
    post.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags)
})

// 过滤博客文章
const filteredPosts = computed(() => {
  if (!activeTag.value) return blogPosts.value
  return blogPosts.value.filter(post => post.tags.includes(activeTag.value))
})

// 切换标签
function toggleTag(tag) {
  if (activeTag.value === tag) {
    activeTag.value = null
  } else {
    activeTag.value = tag
  }
}

// 清除标签筛选
function clearFilter() {
  activeTag.value = null
}

// 日期格式化
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 订阅逻辑
const subscriberEmail = ref('')
const subscriptionStatus = ref(null)
const subscribeSection = ref(null)

function handleSubscription() {
  // TODO: 替换为实际的API调用
  console.log("订阅邮箱:", subscriberEmail.value)

  // 模拟订阅请求
  subscriptionStatus.value = {
    success: true,
    message: "订阅成功！感谢您的订阅"
  }

  // 重置邮箱字段
  subscriberEmail.value = ''

  // 3秒后清除状态消息
  setTimeout(() => {
    subscriptionStatus.value = null
  }, 3000)
}

// 滚动到订阅区域
function scrollToSubscribe() {
  if (subscribeSection.value) {
    subscribeSection.value.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* 精简变量定义 */
:root {
  --vp-c-banner-bg: linear-gradient(135deg, #6e8efb 0%, #a777e3 100%);
  --vp-c-card-bg: var(--vp-c-bg);
  --vp-c-card-border: var(--vp-c-divider);
  --vp-c-tag-bg: var(--vp-c-bg-alt);
  --vp-c-tag-active: #a777e3;
  --vp-c-subscribe-bg: var(--vp-c-bg-soft);
  --vp-c-text-light: #ffffff;
  --vp-c-text-dark: #2c3e50;
  --vp-c-accent: #6e8efb;
  --vp-c-accent-light: #8da3fb;
  --vp-c-accent-dark: #5a7bfa;
}

.dark {
  --vp-c-banner-bg: linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%);
  --vp-c-card-bg: var(--vp-c-bg-alt);
  --vp-c-tag-bg: var(--vp-c-bg-soft);
  --vp-c-tag-active: #4ca1af;
  --vp-c-accent: #4ca1af;
  --vp-c-accent-light: #5fb0bd;
  --vp-c-accent-dark: #3a8c9a;
}

/* 浅色主题样式 */
:root:not(.dark) {
  --vp-c-banner-bg: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
}

/* 现代化Banner样式 */
.banner-container {
  position: relative;
  padding: 5rem 1rem 8rem;
  margin-bottom: 3rem;
  background: var(--vp-c-banner-bg);
  overflow: hidden;
  animation: banner-appear 1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

@keyframes banner-appear {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.banner-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  position: relative;
  z-index: 2;
}

.banner-text {
  flex: 1;
  max-width: 600px;
}

.banner-title {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-weight: 800;
  line-height: 1.2;
  color: var(--vp-c-text-dark);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: title-pop 0.8s 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}

.dark .banner-title {
  color: var(--vp-c-text-light);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

@keyframes title-pop {
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.banner-description {
  font-size: 1.4rem;
  margin-bottom: 2rem;
  color: var(--vp-c-text-dark);
  line-height: 1.6;
  animation: fadeIn 1.2s 0.4s both;
}

.dark .banner-description {
  color: rgba(255, 255, 255, 0.9);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.banner-cta {
  display: flex;
  gap: 1rem;
  animation: fadeIn 1.2s 0.6s both;
}

.cta-button {
  padding: 0.8rem 1.8rem;
  border-radius: 8px;
  background: var(--vp-c-accent);
  color: var(--vp-c-text-light);
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.cta-button::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s ease;
  z-index: -1;
}

.cta-button:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.cta-button.secondary {
  background: transparent;
  color: #000000;
  border: 2px solid rgba(110, 142, 251, 0.5);
}

.dark .cta-button.secondary {
  color: var(--vp-c-text-light);
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.cta-button.secondary:hover {
  background: rgba(110, 142, 251, 0.1);
}

.banner-graphic {
  position: relative;
  width: 40%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.graphic-element {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: float 6s infinite ease-in-out;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.graphic-element:nth-child(1) {
  width: 200px;
  height: 200px;
  animation-delay: 0s;
}

.graphic-element:nth-child(2) {
  width: 150px;
  height: 150px;
  animation-delay: -2s;
}

.graphic-element:nth-child(3) {
  width: 100px;
  height: 100px;
  animation-delay: -4s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(20px, -20px);
  }
  50% {
    transform: translate(0, -30px);
  }
  75% {
    transform: translate(-20px, -10px);
  }
}

/* 波浪分隔线 - 优化点：加深蓝色效果 */
.wave-divider {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
  height: 100px;
}

.wave-divider svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 100px;
}

.wave-fill {
  fill: rgba(70, 110, 230, 0.5); /* 加深的蓝色效果 */
}

.dark .wave-fill {
  fill: rgba(70, 110, 230, 0.4); /* 深色主题下微调透明度 */
}

.blog-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* 筛选部分样式 */
.filter-section {
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.filter-title {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
  font-weight: 700;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.tag-btn {
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  background-color: var(--vp-c-tag-bg);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.tag-btn:hover {
  background-color: var(--vp-c-tag-active);
  color: white;
  transform: translateY(-2px);
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tag-btn.active {
  background-color: var(--vp-c-tag-active);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.active-filter-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  color: var(--vp-c-text-2);
  padding-top: 1rem;
  margin-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.clear-filter-btn {
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: var(--vp-c-tag-active);
  border: 1px solid var(--vp-c-tag-active);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  font-weight: 500;
}

.clear-filter-btn:hover {
  background-color: var(--vp-c-tag-active);
  color: white;
}

/* 博客列表样式 */
.blog-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;
}

.blog-card {
  background-color: var(--vp-c-card-bg);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
  animation: card-appear 0.6s forwards;
  animation-delay: var(--delay);
  border: 1px solid var(--vp-c-card-border);
  display: flex;
  flex-direction: column;
  height: 100%;
}

@keyframes card-appear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.blog-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  border-color: transparent;
}

.card-img {
  height: 180px;
  position: relative;
  padding: 1.2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  align-items: flex-start;
  background-size: cover;
  background-position: center;
  background-color: #6e8efb;
  background-image: linear-gradient(120deg, #6e8efb 0%, #a777e3 100%);
}

/* 卡片内标签样式 */
.tag-badge {
  background-color: rgba(255, 255, 255, 0.9);
  color: #6e8efb;
  padding: 0.3rem 0.9rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.card-content {
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.post-title {
  font-size: 1.4rem;
  margin-bottom: 0.9rem;
  color: var(--vp-c-text-1);
  line-height: 1.4;
  font-weight: 700;
}

.post-description {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider-light);
}

.author-info {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.author-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(45deg, #6e8efb, #a777e3);
}

.author-name {
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.post-date {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.read-time {
  background: var(--vp-c-bg-soft);
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-weight: 500;
}

/* 订阅表单样式 */
.subscription-section {
  background: var(--vp-c-subscribe-bg);
  border-radius: 16px;
  padding: 3rem;
  margin: 3rem 0;
  display: flex;
  gap: 3rem;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--vp-c-divider);
}

.subscribe-content {
  flex: 1;
}

.subscribe-text {
  margin-bottom: 2rem;
}

.subscribe-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
  font-weight: 700;
}

.subscribe-description {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.input-group {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.email-input {
  flex: 1;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 1rem;
  outline: none;
  transition: all 0.3s;
}

.email-input:focus {
  border-color: var(--vp-c-tag-active);
  box-shadow: 0 0 0 3px rgba(110, 142, 251, 0.2);
}

.subscribe-btn {
  padding: 1rem 1.8rem;
  background-color: var(--vp-c-tag-active);
  color: #4d6acc;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(110, 142, 251, 0.3);
}

.subscribe-btn:hover {
  background-color: var(--vp-c-accent-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(110, 142, 251, 0.4);
}

.privacy-note {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.subscribe-graphic {
  width: 40%;
  height: 200px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.subscribe-graphic .graphic-element {
  position: absolute;
  border-radius: 16px;
  background: rgba(110, 142, 251, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(110, 142, 251, 0.2);
  animation: float 8s infinite ease-in-out;
}

.subscribe-graphic .graphic-element:nth-child(1) {
  width: 120px;
  height: 120px;
  animation-delay: 0s;
}

.subscribe-graphic .graphic-element:nth-child(2) {
  width: 80px;
  height: 80px;
  animation-delay: -2s;
}

.subscribe-graphic .graphic-element:nth-child(3) {
  width: 50px;
  height: 50px;
  animation-delay: -4s;
}

/* 无结果提示 */
.no-results {
  text-align: center;
  padding: 4rem 2rem;
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  grid-column: 1 / -1;
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
}

.no-results-icon {
  margin-bottom: 1.5rem;
}

.no-results-icon svg {
  color: var(--vp-c-text-2);
}

.no-results h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.no-results p {
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .banner-content {
    flex-direction: column;
    text-align: center;
  }

  .banner-graphic {
    width: 100%;
    height: 200px;
    margin-top: 2rem;
  }

  .banner-cta {
    justify-content: center;
  }

  .subscribe-graphic {
    display: none;
  }
}

@media (max-width: 768px) {
  .banner-container {
    padding: 3rem 1rem 6rem;
  }

  .banner-title {
    font-size: 2.2rem;
  }

  .banner-description {
    font-size: 1.2rem;
  }

  .blog-list {
    grid-template-columns: 1fr;
  }

  .subscription-section {
    flex-direction: column;
    padding: 2rem;
  }

  .subscribe-content {
    width: 100%;
  }

  .input-group {
    flex-direction: column;
  }

  .subscribe-btn {
    width: 100%;
    justify-content: center;
  }

  .blog-card {
    max-width: 500px;
    margin: 0 auto;
  }
}

@media (max-width: 480px) {
  .banner-title {
    font-size: 1.8rem;
  }

  .banner-description {
    font-size: 1.1rem;
  }

  .banner-cta {
    flex-direction: column;
  }

  .cta-button {
    width: 100%;
  }

  .tags-container {
    justify-content: center;
  }

  .active-filter-info {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-section {
    padding: 1.2rem;
  }

  .subscription-section {
    padding: 1.5rem;
  }

  .subscribe-title {
    font-size: 1.6rem;
  }
}
</style>