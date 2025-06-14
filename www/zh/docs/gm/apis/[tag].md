---
aside: false
outline: false
title: vitepress-openapi
---

<script setup>
import { useRoute } from 'vitepress';
import { useSidebar } from 'vitepress-openapi';
import { useTheme } from 'vitepress-openapi/client';
import { onBeforeMount } from 'vue';

import spec from './AngusGM-Api.json';

const sidebar = useSidebar({
  spec,
  linkPrefix: '/apis/',
});

onBeforeMount(() => {
    useTheme({
        server: {
            allowCustomServer: true,
        },
    })
});

const route = useRoute();
const tag = route.data.params.tag;
</script>

<OASpec :spec="spec" :tags="[tag]" hide-info hide-servers hide-paths-summary hide-branding />