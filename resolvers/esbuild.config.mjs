import * as esbuild from 'esbuild'

await esbuild.build({
    entryPoints: [ 'src/http/resolver.ts'],
    bundle: true,
    sourcemap: "inline",
    sourcesContent: false,
    target: 'esnext',
    platform: 'node',
    format: 'esm',
    external: ['@aws-appsync/utils'],
    outdir: 'dist/appsync'
})
