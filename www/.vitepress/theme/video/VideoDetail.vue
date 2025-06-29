<template>
  <div class="course-page">
    <!-- 顶部Banner -->
    <header>
      <div class="header-content">
        <h1 class="course-title">{{ courseTitle }}</h1>
        <p class="course-subtitle">{{ courseSubtitle }}</p>
      </div>
    </header>

    <div class="container">
      <!-- 返回按钮 -->
      <a href="#" class="back-btn" @click.prevent="goBack">
        <i class="fas fa-arrow-left"></i> {{ backBtnText }}
      </a>

      <div class="main-content">
        <div class="video-content">
          <div class="video-container">
            <div class="video-player" @click="playVideo">
              <div class="video-placeholder" v-if="!isPlaying"></div>
              <div class="play-icon" v-if="!isPlaying">
                <i class="fas fa-play-circle"></i>
              </div>
              <video
                  ref="mainVideo"
                  v-show="isPlaying"
                  @timeupdate="updateProgress"
                  @ended="videoEnded"
              ></video>

              <div class="video-info">
                <div class="video-title">{{ currentLesson.title }}</div>
                <div class="video-description">{{ currentLesson.description }}</div>
              </div>
            </div>

            <div class="video-controls" v-if="isPlaying">
              <button class="control-btn" @click="togglePlay">
                <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
              </button>
              <div class="progress-bar" @click="seekVideo">
                <div class="progress" :style="{ width: progressPercentage + '%' }"></div>
              </div>
              <div class="time">{{ currentTime }} / {{ duration }}</div>
              <button class="control-btn" @click="toggleFullscreen">
                <i class="fas fa-expand"></i>
              </button>
            </div>
          </div>

          <div class="what-you-learn">
            <h2 class="section-title">{{ learnTitle }}</h2>
            <div class="learn-list">
              <div class="learn-item" v-for="(item, index) in learnItems" :key="index">
                <i class="fas fa-check-circle learn-icon"></i>
                <div>{{ item }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="course-details">
          <h2 class="section-title">{{ detailsTitle }}</h2>

          <div class="instructor">
            <div class="instructor-avatar">{{ instructorInitials }}</div>
            <div class="instructor-info">
              <h3>{{ instructorName }}</h3>
              <p>{{ instructorTitle }}</p>
            </div>
          </div>

          <div class="course-description">{{ courseDescription }}</div>

          <div class="course-stats">
            <div class="stat-card">
              <div class="stat-value">{{ lessonsCount }}</div>
              <div class="stat-label">{{ lessonsLabel }}</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ hoursCount }}</div>
              <div class="stat-label">{{ hoursLabel }}</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ projectsCount }}</div>
              <div class="stat-label">{{ projectsLabel }}</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ accessTerm }}</div>
              <div class="stat-label">{{ accessLabel }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="chapters-section">
        <h2 class="section-title">{{ chaptersTitle }}</h2>

        <div class="chapters-list">
          <div
              class="chapter"
              v-for="(chapter, chapterIndex) in chapters"
              :key="chapterIndex"
          >
            <div class="chapter-header" @click="toggleChapter(chapterIndex)">
              <div class="chapter-title">
                <i
                    class="fas"
                    :class="chapter.open ? 'fa-folder-open' : 'fa-folder'"
                ></i>
                <span>{{ chapter.title }}</span>
              </div>
              <div class="chapter-duration">{{ chapter.duration }}</div>
            </div>

            <div class="lessons" v-show="chapter.open">
              <div
                  class="lesson"
                  v-for="(lesson, lessonIndex) in chapter.lessons"
                  :key="lessonIndex"
                  :class="{ active: isActiveLesson(chapterIndex, lessonIndex) }"
                  @click="selectLesson(chapterIndex, lessonIndex)"
              >
                <div class="lesson-icon">
                  <i class="fas fa-play-circle"></i>
                </div>
                <div class="lesson-title">{{ lesson.title }}</div>
                <div class="lesson-duration">{{ lesson.duration }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoursePage',
  data() {
    return {
      // 课程数据
      courseTitle: 'Vue 3 高级开发实战',
      courseSubtitle: '掌握Vue 3核心特性，学习状态管理、性能优化、SSR等高级技巧，构建企业级应用',
      learnTitle: '你将学到',
      detailsTitle: '课程详情',
      chaptersTitle: '课程章节',
      instructorName: '张明',
      instructorTitle: '高级前端工程师 & Vue.js核心贡献者',
      courseDescription: '这门课程将带你深入探索Vue 3的高级特性和最佳实践。通过构建真实项目，你将学习如何开发可扩展、高性能的Vue应用程序。课程涵盖Composition API、状态管理、性能优化、服务端渲染等关键主题，适合有一定Vue基础但希望提升到高级水平的开发者。',
      lessonsCount: '32',
      hoursCount: '18',
      projectsCount: '7',
      accessTerm: '终身',
      lessonsLabel: '课程章节',
      hoursLabel: '小时内容',
      projectsLabel: '实战项目',
      accessLabel: '访问权限',
      backBtnText: '返回课程首页',
      instructorInitials: 'ES',

      // 学习目标
      learnItems: [
        'Vue 3 Composition API 的深入理解和实践',
        '使用Pinia进行高效状态管理',
        'Vite构建工具的高级配置和优化',
        'Vue应用性能优化策略与实践',
        'Vue 3服务端渲染(SSR)实现',
        '单元测试与端到端测试最佳实践'
      ],

      // 章节数据
      chapters: [
        {
          title: '第一章: Vue 3 基础回顾与Composition API',
          duration: '2小时15分钟',
          open: true,
          lessons: [
            {
              title: '1.1 Vue 3 新特性概览',
              duration: '25:18',
              description: '全面介绍Vue 3的核心新特性及其设计理念',
              videoUrl: 'https://example.com/videos/vue3-features.mp4'
            },
            {
              title: '1.2 Composition API 深度解析',
              duration: '38:42',
              description: '深入理解Composition API原理和使用场景',
              videoUrl: 'https://example.com/videos/composition-api.mp4'
            },
            {
              title: '1.3 Reactivity系统原理',
              duration: '32:10',
              description: '解析Vue 3响应式系统底层实现机制',
              videoUrl: 'https://example.com/videos/reactivity-system.mp4'
            },
            {
              title: '1.4 实战：重构Options API组件',
              duration: '39:05',
              description: '将传统组件转换为Composition API风格',
              videoUrl: 'https://example.com/videos/refactoring-components.mp4'
            }
          ]
        },
        {
          title: '第二章: 高级状态管理与Pinia',
          duration: '3小时10分钟',
          open: false,
          lessons: [
            {
              title: '2.1 Vuex 4 与 Pinia 对比',
              duration: '28:15',
              description: '选择合适的状态管理方案',
              videoUrl: 'https://example.com/videos/vuex-pinia.mp4'
            },
            {
              title: '2.2 Pinia 核心概念与API',
              duration: '35:22',
              description: 'Pinia的基本使用和高级功能',
              videoUrl: 'https://example.com/videos/pinia-core.mp4'
            },
            {
              title: '2.3 实战：电商购物车状态管理',
              duration: '46:30',
              description: '使用Pinia实现完整电商状态管理',
              videoUrl: 'https://example.com/videos/ecommerce-cart.mp4'
            },
            {
              title: '2.4 状态持久化与缓存策略',
              duration: '40:08',
              description: '实现状态持久化和性能优化',
              videoUrl: 'https://example.com/videos/state-persistence.mp4'
            }
          ]
        },
        {
          title: '第三章: 性能优化与高级技巧',
          duration: '2小时45分钟',
          open: false,
          lessons: [
            {
              title: '3.1 Vue应用性能分析工具',
              duration: '22:45',
              description: '使用DevTools分析应用性能',
              videoUrl: 'https://example.com/videos/performance-tools.mp4'
            },
            {
              title: '3.2 虚拟滚动与大型列表优化',
              duration: '36:12',
              description: '优化大型列表渲染性能',
              videoUrl: 'https://example.com/videos/virtual-scroll.mp4'
            },
            {
              title: '3.3 组件懒加载与代码分割',
              duration: '31:20',
              description: '提高应用加载速度的最佳实践',
              videoUrl: 'https://example.com/videos/lazy-loading.mp4'
            },
            {
              title: '3.4 内存管理与防泄漏策略',
              duration: '34:50',
              description: '避免常见内存泄漏问题',
              videoUrl: 'https://example.com/videos/memory-management.mp4'
            }
          ]
        }
      ],

      // 视频播放状态
      isPlaying: false,
      currentTime: '0:00',
      duration: '0:00',
      progressPercentage: 0,
      currentChapter: 0,
      currentLessonIndex: 0
    };
  },
  computed: {
    currentLesson() {
      return this.chapters[this.currentChapter].lessons[this.currentLessonIndex];
    }
  },
  methods: {
    // 播放/暂停视频
    togglePlay() {
      if (this.$refs.mainVideo.paused) {
        this.$refs.mainVideo.play();
      } else {
        this.$refs.mainVideo.pause();
      }
    },

    // 开始播放视频
    playVideo() {
      if (!this.isPlaying) {
        this.isPlaying = true;
        if (!this.$refs.mainVideo.src) {
          this.$refs.mainVideo.src = this.currentLesson.videoUrl;
        }
        this.$refs.mainVideo.play();
      }
    },

    // 视频结束
    videoEnded() {
      this.isPlaying = false;
    },

    // 更新进度条
    updateProgress() {
      const video = this.$refs.mainVideo;
      if (video.duration) {
        const currentMins = Math.floor(video.currentTime / 60);
        const currentSecs = Math.floor(video.currentTime % 60);
        const durationMins = Math.floor(video.duration / 60);
        const durationSecs = Math.floor(video.duration % 60);

        this.currentTime = `${currentMins}:${currentSecs < 10 ? '0' : ''}${currentSecs}`;
        this.duration = `${durationMins}:${durationSecs < 10 ? '0' : ''}${durationSecs}`;
        this.progressPercentage = (video.currentTime / video.duration) * 100;
      }
    },

    // 跳转视频进度
    seekVideo(event) {
      const progressBar = event.currentTarget;
      const pos = (event.pageX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
      this.$refs.mainVideo.currentTime = pos * this.$refs.mainVideo.duration;
    },

    // 切换全屏
    toggleFullscreen() {
      if (!document.fullscreenElement) {
        this.$el.requestFullscreen().catch(err => {
          console.error(`全屏请求错误: ${err.message}`);
        });
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    },

    // 切换章节展开/折叠
    toggleChapter(index) {
      this.chapters[index].open = !this.chapters[index].open;
    },

    // 选择课程
    selectLesson(chapterIndex, lessonIndex) {
      this.currentChapter = chapterIndex;
      this.currentLessonIndex = lessonIndex;

      // 如果视频正在播放，切换到新课程
      if (this.isPlaying) {
        this.$refs.mainVideo.src = this.currentLesson.videoUrl;
        this.$refs.mainVideo.play();
      }
    },

    // 检查是否是当前激活的课程
    isActiveLesson(chapterIndex, lessonIndex) {
      return this.currentChapter === chapterIndex && this.currentLessonIndex === lessonIndex;
    },

    // 返回按钮功能
    goBack() {
      // 在实际应用中，这里可以导航到课程列表页
      this.$router.go(-1);
    }
  },
  mounted() {
    // 初始化视频元素
    this.$refs.mainVideo.addEventListener('loadedmetadata', () => {
      const durationMins = Math.floor(this.$refs.mainVideo.duration / 60);
      const durationSecs = Math.floor(this.$refs.mainVideo.duration % 60);
      this.duration = `${durationMins}:${durationSecs < 10 ? '0' : ''}${durationSecs}`;
    });
  }
};
</script>

<style scoped>
:root {
  --vp-c-brand: #42b983;
  --vp-c-brand-light: #42d392;
  --vp-c-brand-lighter: #35eb9a;
  --vp-c-brand-dark: #33a06f;
  --vp-c-brand-darker: #155f3e;
  --vp-c-text-1: rgba(60, 60, 67, 0.9);
  --vp-c-text-2: rgba(60, 60, 67, 0.78);
  --vp-c-text-3: rgba(60, 60, 67, 0.56);
  --vp-c-bg: #ffffff;
  --vp-c-bg-alt: #f6f6f7;
  --vp-c-bg-soft: #f9f9f9;
  --vp-c-divider: rgba(60, 60, 67, 0.12);
  --vp-c-divider-light: rgba(60, 60, 67, 0.08);
  --vp-border-radius: 8px;
  --vp-shadow-1: 0 1px 4px rgba(0, 0, 0, 0.05);
  --vp-shadow-2: 0 3px 12px rgba(0, 0, 0, 0.07);
  --vp-shadow-3: 0 8px 24px rgba(0, 0, 0, 0.09);
  --vp-shadow-4: 0 16px 48px rgba(0, 0, 0, 0.1);
  --vp-font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  --vp-font-family-mono: "Fira Code", "Fira Mono", Menlo, Monaco, Consolas, "Courier New", monospace;
  --vp-transition: all 0.3s ease;
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

.course-page {
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-soft);
  line-height: 1.6;
  transition: background-color 0.5s ease, color 0.3s ease;
  overflow-x: hidden;
}

/* 优化容器布局 */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
}

/* 返回按钮 - 固定在右上角 */
.back-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--vp-c-brand);
  font-weight: 600;
  transition: var(--vp-transition);
  padding: 10px 16px;
  border-radius: var(--vp-border-radius);
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  box-shadow: var(--vp-shadow-1);
  z-index: 100;
}

.back-btn:hover {
  background: var(--vp-c-bg-alt);
  transform: translateY(-3px);
  box-shadow: var(--vp-shadow-3);
}

/* 优化顶部Banner */
header {
  padding: 60px 0 40px;
  text-align: center;
  position: relative;
  margin-bottom: 40px;
  background: linear-gradient(135deg, rgba(66, 185, 131, 0.08), rgba(66, 211, 146, 0.1));
  overflow: hidden;
  border-bottom: 1px solid var(--vp-c-divider-light);
  /* 移除顶部间距，横向占满屏幕 */
  width: 100%;
  margin-top: 0;
}

.header-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 装饰性元素 */
header::before {
  content: '';
  position: absolute;
  top: -100px;
  left: -100px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(66, 185, 131, 0.2), transparent 70%);
  z-index: -1;
}

header::after {
  content: '';
  position: absolute;
  bottom: -80px;
  right: -80px;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: linear-gradient(315deg, rgba(66, 185, 131, 0.15), transparent 70%);
  z-index: -1;
}

.course-title {
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 16px;
  color: var(--vp-c-brand);
  background: linear-gradient(to right, var(--vp-c-brand), var(--vp-c-brand-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;
  padding: 0 20px;
}

.course-title::before, .course-title::after {
  content: '';
  position: absolute;
  top: 50%;
  height: 2px;
  width: 40px;
  background: linear-gradient(to right, transparent, var(--vp-c-brand));
}

.course-title::before {
  left: 0;
}

.course-title::after {
  right: 0;
  background: linear-gradient(to left, transparent, var(--vp-c-brand));
}

.course-subtitle {
  font-size: 1.3rem;
  color: var(--vp-c-text-2);
  max-width: 700px;
  margin: 0 auto 30px;
  font-weight: 500;
  position: relative;
}

.main-content {
  display: grid;
  grid-template-columns: 8fr 4fr; /* 调整比例 */
  gap: 40px;
  margin-bottom: 40px;
}

.video-container {
  background-color: var(--vp-c-bg);
  border-radius: var(--vp-border-radius);
  overflow: hidden;
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  box-shadow: var(--vp-shadow-3);
}

.video-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--vp-c-brand-dark), var(--vp-c-brand));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
}

.video-player video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: url('https://images.unsplash.com/photo-1566837945740-289579a8f1c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=80');
}

.play-icon {
  font-size: 4rem;
  cursor: pointer;
  transition: transform 0.2s;
  position: absolute;
  z-index: 10;
}

.play-icon:hover {
  transform: scale(1.1);
}

.video-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background: rgba(0,0,0,0.7);
  color: white;
  z-index: 5;
}

.video-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;
  background: none;
  -webkit-text-fill-color: white;
}

.video-description {
  font-size: 1.05rem;
  opacity: 0.9;
}

.video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  padding: 12px;
  z-index: 10;
}

.progress-bar {
  flex-grow: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  margin: 0 15px;
  position: relative;
  cursor: pointer;
}

.progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: var(--vp-c-brand);
  border-radius: 2px;
}

.control-btn {
  color: white;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 5px;
  transition: var(--vp-transition);
}

.control-btn:hover {
  color: var(--vp-c-brand-light);
}

.time {
  color: white;
  font-size: 0.9rem;
  min-width: 90px;
}

.course-details {
  background: var(--vp-c-bg);
  border-radius: var(--vp-border-radius);
  padding: 30px;
  box-shadow: var(--vp-shadow-2);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--vp-c-brand);
  position: relative;
  padding-bottom: 12px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background: var(--vp-c-brand);
  border-radius: 2px;
}

.instructor {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
}

.instructor-avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--vp-c-brand-darker), var(--vp-c-brand));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.6rem;
  box-shadow: var(--vp-shadow-1);
}

.instructor-info h3 {
  font-size: 1.3rem;
  margin-bottom: 5px;
  color: var(--vp-c-text-1);
}

.instructor-info p {
  color: var(--vp-c-text-3);
  font-size: 1rem;
}

.course-description {
  margin-bottom: 25px;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}

.course-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 30px;
}

.stat-card {
  background: var(--vp-c-bg-alt);
  padding: 15px;
  border-radius: var(--vp-border-radius);
  text-align: center;
  transition: var(--vp-transition);
  box-shadow: var(--vp-shadow-1);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--vp-shadow-3);
}

.stat-value {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.95rem;
  color: var(--vp-c-text-3);
}

.what-you-learn {
  background: var(--vp-c-bg);
  border-radius: var(--vp-border-radius);
  padding: 30px;
  box-shadow: var(--vp-shadow-2);
  margin-top: 40px;
}

.learn-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 20px;
}

.learn-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.learn-icon {
  color: var(--vp-c-brand);
  margin-top: 3px;
  font-size: 1.1rem;
}

.chapters-section {
  background: var(--vp-c-bg);
  border-radius: var(--vp-border-radius);
  padding: 30px;
  box-shadow: var(--vp-shadow-2);
  margin-top: 40px;
}

.chapter {
  border-bottom: 1px solid var(--vp-c-divider-light);
  padding: 20px 0;
  transition: var(--vp-transition);
}

.chapter:hover {
  background-color: var(--vp-c-bg-alt);
  border-radius: var(--vp-border-radius);
}

.chapter:last-child {
  border-bottom: none;
}

.chapter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 5px 0;
}

.chapter-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.chapter-icon {
  color: var(--vp-c-brand);
  transition: var(--vp-transition);
  font-size: 1.1rem;
}

.chapter-duration {
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
}

.lessons {
  padding-top: 15px;
  padding-left: 30px;
}

.lesson {
  display: flex;
  align-items: center;
  padding: 12px 0;
  cursor: pointer;
  transition: var(--vp-transition);
  border-radius: 6px;
  padding-left: 15px;
}

.lesson:hover {
  background: var(--vp-c-bg-alt);
}

.lesson.active {
  background: rgba(66, 185, 131, 0.1);
  border-left: 3px solid var(--vp-c-brand);
}

.lesson-icon {
  width: 24px;
  color: var(--vp-c-text-3);
  text-align: center;
}

.active .lesson-icon {
  color: var(--vp-c-brand);
}

.lesson-title {
  flex-grow: 1;
  color: var(--vp-c-text-2);
}

.active .lesson-title {
  color: var(--vp-c-brand-dark);
  font-weight: 500;
}

.lesson-duration {
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
  min-width: 60px;
  text-align: right;
}

@media (max-width: 960px) {
  .main-content {
    grid-template-columns: 1fr;
  }

  .learn-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .course-title {
    font-size: 2.2rem;
    padding: 0 15px;
  }

  .course-subtitle {
    font-size: 1.1rem;
    padding: 0 15px;
  }

  .video-info {
    padding: 10px;
  }

  .video-title {
    font-size: 1.2rem;
  }

  .stat-card {
    padding: 10px;
  }

  .section-title {
    font-size: 1.3rem;
  }

  header {
    padding: 40px 0 30px;
  }
}
</style>