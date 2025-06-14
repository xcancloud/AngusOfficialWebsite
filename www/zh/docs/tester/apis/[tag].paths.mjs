import { usePaths } from 'vitepress-openapi'
import {testerSpec as spec} from './spec.mjs';

export default {
    paths() {
        return usePaths({ spec })
            .getTags()
            .map(({ name }) => {
                return {
                    params: {
                        tag: name,
                        pageTitle: `${name}`,
                    },
                }
            })
    },
}