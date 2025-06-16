---
aside: false
outline: false
title: vitepress-openapi
---

<script setup>
import { useRoute } from 'vitepress';
import { useTheme } from 'vitepress-openapi/client';
import { onBeforeMount } from 'vue';
import {gmSpec, gmSidebar} from './spec.mjs';

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

<OASpec :spec="gmSpec" :tags="[tag]" hide-info hide-servers hide-paths-summary hide-branding />