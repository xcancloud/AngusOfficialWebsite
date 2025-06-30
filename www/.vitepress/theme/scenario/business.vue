<template>
  <div class="angus-tester-page">
    <!-- Banner区域 -->
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

    <!-- 功能特性展示区 -->
    <section class="features-section">
      <div class="container">
        <h2 class="section-title">{{ content.sectionTitle }}</h2>
        <div class="feature-grid">
          <div
              v-for="(feature, index) in content.features"
              :key="feature.title"
              class="feature-card"
              :style="{ animationDelay: `${0.1 * index}s` }"
          >
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
            <div class="feature-media">
              <img :src="feature.image" :alt="feature.title">
              <div class="play-btn" @click="showVideo(index)">
                <i class="fas fa-play"></i>
              </div>
              <video class="feature-video" controls>
                <source :src="feature.video" type="video/mp4">
                {{ content.videoNotSupported }}
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 页尾CTA区域 -->
    <div class="footer">
      <div class="footer-content">
        <h3 class="footer-title">{{ content.footer.title }}</h3>
        <a :href="content.footer.button.url" class="btn">
          {{ content.footer.button.label }}
          <span class="free-tag">{{ content.footer.button.tag }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
// 所有文案内容提取到单独的对象中
const contentData = {
  banner: {
    title: "专为IT企业设计，针对20人以下团队免费",
    description: "详细了解AngusTester的强大功能，包括规划、跟踪、协作和测试。立即注册，免费亲自试用，体验如何提升团队效率与项目管理！",
    button: {
      label: "开始试用",
      url: "#"
    }
  },
  sectionTitle: "全流程研发测试管理平台",
  features: [
    {
      title: "项目管理与流程",
      description: [
        "定义管理和组织任务、测试、需求、工作流程、资源的基本单位，为团队提供了一个集中化方式来计划、跟踪、报告和验收工作进展。",
        "\n一、添加项目\n建立管理组织研发和测试活动的工作流程基本单元。\n\n二、指定迭代和测试计划\n明确研发和测试活动的负责人、时间、目标、验收标准等。\n\n三、开展研发和测试活动\n按照计划开展研发和测试活动，随时跟踪和管理项目中的工作任务、缺陷、需求、用户故事、测试等工作项。\n\n四、报告结果\n总结研发和测试活动的各个方面，包括项目进展、效能分析、数据资产、测试结果等，为项目的成功交付提供有力支持。"
      ],
      image: "https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/01-%E9%A1%B9%E7%9B%AE%E6%B5%81%E7%A8%8B.gif?fid=251751339858591758",
      video: "https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/01-%E9%A1%B9%E7%9B%AE%E6%B5%81%E7%A8%8B.mp4?fid=251751339858591816&fpt=ggksoHPteDAgBSEMSUPqcHSFQWGn23POg5Jvqt9G",
      learnMore: {
        label: "了解更多",
        url: "#"
      }
    },
    {
      title: "任务协同",
      description: [
        "丰富的功能和多样的任务视图，可在团队内部和团队之间实现直观轻松的协作、提及、评论、备注等。",
        "\n可以完成以下工作：\n通过“迭代”组织规划团队成员开展项目活动和排期；\n以明确负责人方式进行任务分配、确认和协作；\n报告和分析项目的健康状况、进展情况和问题趋势。"
      ],
      image: "https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/02-%E4%BB%BB%E5%8A%A1%E5%8D%8F%E5%90%8C.gif?fid=251751339858591760",
      video: "https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/02-%E4%BB%BB%E5%8A%A1%E5%8D%8F%E5%90%8C.mp4?fid=251751339858591818&fpt=PFxtOunmMTVFBlH0mzDwlTaOHXdQY2emstybSdAu",
      learnMore: {
        label: "了解更多",
        url: "#"
      }
    },
    {
      title: "功能测试",
      description: [
        "功能测试管理模块，用于建立评审机制和验证软件系统是否符合规格说明和用户需求的过程。",
        "\n可以完成以下工作：\n通过“计划”组织测试人员开展功能测试活动；\n组织用例评审及早发现潜在的缺陷和错误等；\n报告和分析项目的健康状况、进展情况和问题趋势。"
      ],
      image: "https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/03-%E5%8A%9F%E8%83%BD%E6%B5%8B%E8%AF%95.gif?fid=251751339858591762",
      video: "https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/03-%E5%8A%9F%E8%83%BD%E6%B5%8B%E8%AF%95.mp4?fid=251751339858591820&fpt=V8Kgo5Ju6mvzks5EB3DjNCPv6jBjrkj77LpkVgjN",
      learnMore: {
        label: "了解更多",
        url: "#"
      }
    },
    {
      title: "接口测试",
      description: [
        "接口管理模块，可以帮助开发人员和测试人员轻松地添加、测试、调试和文档化API，最终帮助企业达成API资产化目的。",
        "\n可以完成以下工作：\n在线编辑、调试接口；\n管理项目、服务、接口以及测试任务；\n开展接口功能测试、性能测试和稳定性测试，保证交付稳定且满足性能指标要求的系统。"
      ],
      image: "https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/04-%E6%8E%A5%E5%8F%A3%E6%B5%8B%E8%AF%95-%E6%80%A7%E8%83%BD%E6%B5%8B%E8%AF%95.gif?fid=251751339858591764",
      video: "https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/04-%E6%8E%A5%E5%8F%A3%E6%B5%8B%E8%AF%95-%E6%80%A7%E8%83%BD%E6%B5%8B%E8%AF%95.mp4?fid=251751339858591822&fpt=C4p5oIQln8MXXpvtRMqMUJedKobpraybgvDGtM2C",
      learnMore: {
        label: "了解更多",
        url: "#"
      }
    },
    {
      title: "场景测试",
      description: [
        "场景管理模块，场景可以帮助您编排更加复杂的需求或用户故事，相比单个步骤的测试用例，场景可以包含更多步骤和流程。",
        "\n可以完成以下工作：\n在线编辑、调试场景；\n快速生成场景测试脚本和任务；\n监控业务场景运行，触发通知或者告警。"
      ],
      image: "https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/05-%E5%9C%BA%E6%99%AF%E6%B5%8B%E8%AF%95.gif?fid=251751339858591766",
      video: "https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/05-%E5%9C%BA%E6%99%AF%E6%B5%8B%E8%AF%95.mp4?fid=251751417168003119&fpt=PhlWjkXOU9fpgzsg04ntvjY4fugbe6CLjlQG5GOF",
      learnMore: {
        label: "了解更多",
        url: "#"
      }
    },
    {
      title: "服务模拟",
      description: [
        "可快速生成并模拟您所依赖的 API，使开发和测试先行，以实现更快的开发和更全面的测试，更早地交付稳定的产品或应用。通过Mock也可避免直接与生产系统联调造成的脏数据问题。",
        "\n可以完成以下工作：\n1. 能够根据请求路径、方法和参数模拟不同响应的HTTP请求。\n2. 支持用户自定义响数据格式，以及设置响应状态码。\n3. 回推场景模拟，支持触发异步和同步回推请求。\n4. 支持响应延迟的选项，模拟网络延迟或服务器处理时间。\n5. 支持使用Mock函数生成动态数据，生成不同的响应内容。\n6. 支持模拟不同类型的错误响应，以便测试客户端的错误处理逻辑。"
      ],
      image: "https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/06-%E5%9C%BA%E6%99%AF%E6%BC%94%E7%A4%BA-%E6%9C%8D%E5%8A%A1%E6%A8%A1%E6%8B%9F.gif?fid=251751417168003091",
      video: "https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/06-%E5%9C%BA%E6%99%AF%E6%BC%94%E7%A4%BA-%E6%9C%8D%E5%8A%A1%E6%A8%A1%E6%8B%9F.mp4?fid=251751417168003121&fpt=6RIOs6pzYsvVQ0HgoyaLPTgDgnNuyf0Pt4LBwsG9",
      learnMore: {
        label: "了解更多",
        url: "#"
      }
    },
    {
      title: "看板(大屏)",
      description: [
        "通过据资产大屏和效能大屏帮助团队和管理层监控、分析和优化项目进展与质量。",
        "\n数据资产看板：\n集中展示项目中的各种数据资产，比如任务、测试用例、缺陷报告、接口、脚本、报告等，使得团队能够直观地了解数据的现状。\n\n效能分析看板：\n实时展示项目的关键性能指标（KPI），如工作量、任务数、效率、缺陷率、逾期等，帮助团队监控项目的健康状况和进展。"
      ],
      image: "https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/06-%E7%9C%8B%E6%9D%BF%E5%A4%A7%E5%B1%8F.gif?fid=251751339858591768",
      video: "https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/07-%E7%9C%8B%E6%9D%BF%E5%A4%A7%E5%B1%8F.mp4?fid=251751417168003123&fpt=7HRGQrRyBDViUSwsD9bmuTPdw4tJeYSHwyspdEPm",
      learnMore: {
        label: "了解更多",
        url: "#"
      }
    },
    {
      title: "分析与报告",
      description: [
        "帮助团队可以全面总结研发和测试活动的各个方面，包括进度、效能、质量、执行情况、结果分析等等，这有助于提高透明度和沟通，为项目的成功交付提供有力支持。",
        "支持5大类报告：项目报告、研发任务报告、功能测试报告、接口测试报告、执行报告。"
      ],
      image: "https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/07-%E6%8A%A5%E5%91%8A%E4%B8%8E%E5%88%86%E6%9E%90.gif?fid=251751339858591770",
      video: "https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/08-%E6%8A%A5%E5%91%8A%E4%B8%8E%E5%88%86%E6%9E%90.mp4?fid=251751417168003125&fpt=8iZzcxqICmQMnmFRkJrahUO8TpvNZixGW48vcBlh",
      learnMore: {
        label: "了解更多",
        url: "#"
      }
    }
  ],
  footer: {
    title: "立即体验专为小型团队设计的免费研发测试平台",
    button: {
      label: "免费注册使用",
      tag: "20人以下永久免费",
      url: "#"
    }
  },
  videoNotSupported: "您的浏览器不支持视频播放。"
};

export default {
  name: 'BusinessScenariosPage',
  data() {
    return {
      content: contentData
    };
  },
  methods: {
    showVideo(index) {
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
    }
  }
};
</script>

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

/* Banner样式 - 横向占满整个屏幕 */
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
  font-size: 2.8rem;
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

.section-title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 60px;
  color: var(--vp-c-text-1);
}

.feature-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 70px;
}

.feature-card {
  display: grid;
  grid-template-columns: 4fr 6fr;
  gap: 40px;
  align-items: center;
  background: var(--vp-c-bg);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
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
  width: 45px;
  height: 45px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 45px;
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.feature-title {
  font-size: 1.7rem;
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
  white-space: pre-line;
}

.feature-media {
  position: relative;
  height: 380px;
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

/* 页脚样式 */
.footer {
  background: var(--vp-c-brand-lighter);
  color: white;
  text-align: center;
  padding: 60px 0;
}

.footer-content {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-title {
  font-size: 1.8rem;
  margin-bottom: 30px;
}

.free-tag {
  background: white;
  color: var(--vp-c-brand-darker);
  font-weight: 700;
  padding: 3px 15px;
  border-radius: 20px;
  margin-left: 10px;
  font-size: 0.9rem;
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .feature-card {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .feature-media {
    height: 380px;
  }
}

@media (max-width: 768px) {
  .full-width-banner {
    padding: 60px 0 40px;
  }

  .header-content h1 {
    font-size: 2.2rem;
  }

  .header-content p {
    font-size: 1.1rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .feature-title {
    font-size: 1.5rem;
  }

  .feature-content {
    padding: 30px;
  }

  .feature-media {
    height: 320px;
  }

  .footer-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .header-content h1 {
    font-size: 1.8rem;
  }

  .btn {
    padding: 12px 25px;
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .feature-media {
    height: 240px;
  }

  .feature-content {
    padding: 25px;
  }

  .footer {
    padding: 40px 0;
  }

  .footer-title {
    font-size: 1.3rem;
    margin-bottom: 20px;
  }

  .free-tag {
    display: block;
    margin: 10px auto 0;
    width: fit-content;
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