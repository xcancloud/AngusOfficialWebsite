import { usePaths } from 'vitepress-openapi'
import spec from './AngusTester-Api.json' with { type: 'json' }

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