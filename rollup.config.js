import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import copy from 'rollup-plugin-copy'
import dotenv from "rollup-plugin-dotenv"


const extensions = [".ts", ".js"];


const preventTreeShakingPlugin = () => {
    return {
        name: 'no-treeshaking',
        resolveId(id, importer) {
            if (!importer) {
                // let's not treeshake entry points, as we're not exporting anything in App Scripts
                return {id, moduleSideEffects: "no-treeshake" }
            }
            return null;
        }
    }
}

export default {
    input: "./src/index.ts",
    output: {
        dir: "build",
        format: "cjs",
    },
    plugins: [
        dotenv(),
        preventTreeShakingPlugin(),
        nodeResolve({
            extensions,
            mainFields: ['jsnext:main', 'main']
        }),
        babel({ extensions, babelHelpers: "runtime" }),
        copy({
            targets: [
                {src: 'src/html/*.html', dest: 'build'},
                {src: 'appsscript.json', dest: 'build'}
            ],
            verbose: true,
            overwrite: true
        })
    ],
};