import {useSidebar} from "vitepress-openapi";
import spec from './AngusTester-Api.json' with {type: 'json'}

export const testerSpec = spec;

export const testerSidebar = useSidebar({
    testerSpec,
    linkPrefix: '/apis/',
});

