import {useSidebar} from "vitepress-openapi";
import spec from './AngusGM-Api.json' with {type: 'json'}

export const gmSpec = spec;

export const gmSidebar = useSidebar({
    gmSpec,
    linkPrefix: '/apis/',
});

