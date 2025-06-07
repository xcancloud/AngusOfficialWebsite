---
layout: home

hero:
  name: "XCan Cloud"
  text: "A VitePress Site"
  tagline: My great project tagline
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples

features:
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---


<script setup>
  import {  defineAsyncComponent } from 'vue';
  const HomePage = defineAsyncComponent(() => import('./.vitepress/theme/home/index.vue'))

</script>
<div>
  <HomePage />
</div>



