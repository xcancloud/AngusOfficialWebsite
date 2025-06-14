import {usePaths} from 'vitepress-openapi';
import {gmSpec as spec} from './spec.mjs';

export default {
    paths() {
        return usePaths({spec})
            .getTags()
            .map(({name}) => {
                return {
                    params: {
                        tag: name,
                        pageTitle: `${name}`,
                    },
                }
            })
    }
}
