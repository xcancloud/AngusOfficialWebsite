<script setup>
import { useData } from 'vitepress';
import { ref, computed, watch } from 'vue';
import '@fortawesome/fontawesome-free/css/all.min.css';

const { isDark } = useData();

import {useSafeI18n} from '../../../utils/i18nData'
const {safeGet} = useSafeI18n();

// Load features data
const footerContent = computed(() => {
  return safeGet('footer', '')
});

const themeColors = ref({
  bg: isDark.value ? '#0f172a' : '#f8fafc',
  text: isDark.value ? '#cbd5e1' : '#334155',
  heading: isDark.value ? '#e2e8f0' : '#0f172a',
  border: isDark.value ? '#1e293b' : '#e2e8f0',
  accent: isDark.value ? '#38bdf8' : '#2563eb',
  accentLight: isDark.value ? 'rgba(56, 189, 248, 0.1)' : 'rgba(37, 99, 235, 0.08)',
  accentHover: isDark.value ? 'rgba(56, 189, 248, 0.3)' : 'rgba(37, 99, 235, 0.2)'
});

watch(isDark, () => {
  themeColors.value = {
    bg: isDark.value ? '#0f172a' : '#f8fafc',
    text: isDark.value ? '#cbd5e1' : '#334155',
    heading: isDark.value ? '#e2e8f0' : '#0f172a',
    border: isDark.value ? '#1e293b' : '#e2e8f0',
    accent: isDark.value ? '#38bdf8' : '#2563eb',
    accentLight: isDark.value ? 'rgba(56, 189, 248, 0.1)' : 'rgba(37, 99, 235, 0.08)',
    accentHover: isDark.value ? 'rgba(56, 189, 248, 0.3)' : 'rgba(37, 99, 235, 0.2)'
  };
});
</script>

<template>
  <footer
      class="vp-footer"
      :style="{
      '--vp-bg': themeColors.bg,
      '--vp-text': themeColors.text,
      '--vp-heading': themeColors.heading,
      '--vp-border': themeColors.border,
      '--vp-accent': themeColors.accent,
      '--vp-accent-light': themeColors.accentLight,
      '--vp-accent-hover': themeColors.accentHover
    }"
  >
    <!-- Decorative patterns -->
    <div class="pattern pattern-1">
      <i class="fas fa-bug"></i>
    </div>
    <div class="pattern pattern-2">
      <i class="fas fa-rocket"></i>
    </div>

    <div class="footer-container">
      <!-- Brand and description -->
      <div class="footer-section ml-12 mr-30">
        <div class="footer-brand ">
          <div class="footer-logo">
            <i class="fas fa-bolt"></i>
            {{ footerContent.brand.name }}
          </div>
        </div>
        <p class="footer-description">
          {{ footerContent.brand.description }}
        </p>
        <div class="footer-social">
          <a
              v-for="(social, index) in footerContent.social"
              :key="index"
              :href="social.link"
              :aria-label="social.platform"
          >
            <i :class="social.icon"></i>
          </a>
        </div>
      </div>

      <!-- Dynamically generated sections -->
      <div
          v-for="(section, index) in footerContent.sections"
          :key="index"
          class="footer-section"
      >
        <h3>{{ section.title }}</h3>

        <!-- Links section -->
        <ul v-if="section.links" class="footer-links">
          <li v-for="(link, linkIndex) in section.links" :key="linkIndex">
            <a :href="link.link">
              <i :class="['fas', link.icon]"></i> {{ link.text }}
            </a>
          </li>
        </ul>

        <!-- Contact information -->
        <div v-if="section.contact" class="footer-contact">
          <p v-for="(contact, contactIndex) in section.contact" :key="contactIndex">
            <i :class="['fas', contact.icon]"></i> {{ contact.text }}
          </p>
        </div>
      </div>
    </div>

    <!-- Copyright information -->
    <div class="footer-bottom">
      <div class="footer-copyright">
        {{ footerContent.copyright }}
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Footer container */
.vp-footer {
  background: var(--vp-bg);
  color: var(--vp-text);
  padding: 4rem 1.5rem 2rem;
  position: relative;
  overflow: hidden;
  margin-top: 60px;
  width: 100%;
  box-sizing: border-box;
}

/* Content container */
.footer-container {
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr repeat(4, 1fr);
  gap: 2rem;
  position: relative;
  z-index: 2;
  width: 100%;
  box-sizing: border-box;
}

/* Section styling */
.footer-section {
  margin-bottom: 1.5rem;
}

.footer-section h3 {
  color: var(--vp-accent);
  margin-bottom: 1.8rem;
  font-size: 1.25rem;
  position: relative;
  display: inline-block;
  padding-bottom: 8px;
}

.footer-section h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 45px;
  height: 3px;
  background: var(--vp-accent);
  border-radius: 3px;
}

/* Links list */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* MODIFIED: Reduced spacing between links by 30% */
.footer-links li {
  margin-bottom: 0.6rem; /* Original: 0.9rem */
}

.footer-links a {
  color: var(--vp-text);
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  padding: 5px 0; /* Slightly reduced padding */
}

.footer-links a i {
  margin-right: 10px; /* Reduced from 12px */
  color: var(--vp-accent);
  font-size: 0.9rem; /* Slightly smaller */
  transition: transform 0.3s ease;
}

.footer-links a:hover {
  color: var(--vp-accent);
  transform: translateX(5px);
}

.footer-links a:hover i {
  transform: rotate(90deg);
}

/* Description text */
.footer-description {
  color: var(--vp-text);
  line-height: 1.75;
  max-width: 320px;
  margin-bottom: 1.8rem;
}

/* Social media links */
.footer-social {
  display: flex;
  gap: 0.8rem; /* Reduced from 1.2rem (30% reduction) */
  margin-top: 1.5rem;
}

.footer-social a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px; /* Slightly smaller */
  height: 38px; /* Slightly smaller */
  background: var(--vp-accent-light);
  border-radius: 50%;
  color: var(--vp-accent);
  transition: all 0.3s ease;
  border: 1px solid var(--vp-border);
}

.footer-social a:hover {
  background: var(--vp-accent);
  color: white;
  transform: translateY(-5px);
  box-shadow: 0 5px 15px var(--vp-accent-hover);
}

/* Contact information */
.footer-contact {
  padding: 0;
  margin: 0;
}

/* MODIFIED: Reduced spacing between contact items by 30% */
.footer-contact p {
  display: flex;
  align-items: flex-start;
  color: var(--vp-text);
  margin-bottom: 0.8rem; /* Original: 1.1rem */
  line-height: 1.6;
  font-size: 0.95rem; /* Slightly smaller font */
}

.footer-contact i {
  color: var(--vp-accent);
  margin-right: 10px; /* Reduced from 12px */
  margin-top: 4px;
  min-width: 18px; /* Slightly smaller */
  font-size: 1rem; /* Slightly smaller */
}

/* Copyright section */
.footer-bottom {
  max-width: 1300px;
  margin: 3rem auto 0; /* Reduced top margin */
  padding-top: 1.8rem; /* Reduced padding */
  border-top: 1px solid var(--vp-border);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  box-sizing: border-box;
}

.footer-copyright {
  color: var(--vp-text);
  font-size: 0.9rem; /* Slightly smaller */
  opacity: 0.8;
  text-align: center;
  width: 100%;
}

/* Brand logo */
.footer-brand {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem; /* Slightly reduced */
}

.footer-logo {
  font-size: 1.9rem;
  font-weight: 700;
  color: var(--vp-heading);
  display: flex;
  align-items: center;
  letter-spacing: -0.5px;
}

.footer-logo i {
  margin-right: 12px;
  color: var(--vp-accent);
  font-size: 1.8rem;
}

/* Decorative patterns */
.pattern {
  position: absolute;
  opacity: 0.03;
  z-index: 1;
  color: var(--vp-accent);
}

.pattern-1 {
  top: 5%;
  right: 5%;
  font-size: 14rem;
  transform: rotate(25deg);
}

.pattern-2 {
  bottom: 12%;
  left: 5%;
  font-size: 11rem;
  transform: rotate(-15deg);
}

/* Responsive design */
@media (max-width: 992px) {
  .footer-container {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 2.5rem;
  }
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-section h3::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .footer-links a {
    justify-content: center;
  }

  .footer-description {
    margin: 0 auto 1.8rem;
    max-width: 100%;
  }

  .footer-social {
    justify-content: center;
  }

  .footer-contact p {
    justify-content: center;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
  }

  .footer-brand {
    justify-content: center;
  }

  .footer-links li {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .vp-footer {
    padding: 3rem 1rem 1.5rem;
  }

  .pattern-1,
  .pattern-2 {
    display: none;
  }

  .footer-logo {
    font-size: 1.7rem;
  }

  .footer-section h3 {
    font-size: 1.2rem;
  }

  /* Further reduce spacing on mobile */
  .footer-links li {
    margin-bottom: 0.5rem;
  }

  .footer-contact p {
    margin-bottom: 0.7rem;
  }

  .footer-social {
    gap: 0.7rem;
  }
}
</style>