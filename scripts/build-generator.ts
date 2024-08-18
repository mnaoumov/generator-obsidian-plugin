import {
  context,
  type BuildOptions
} from "esbuild";
import { wrapCliTask } from "obsidian-dev-utils/bin/cli";
import { banner, invoke } from "obsidian-dev-utils/bin/esbuild/ObsidianPluginBuilder";

await wrapCliTask(async () => {
  const buildOptions: BuildOptions = {
    banner: {
      js: banner
    },
    bundle: false,
    entryPoints: ["src/generator.ts"],
    format: "cjs",
    logLevel: "info",
    outfile: "dist/index.cjs",
    platform: "node",
    sourcemap: "inline",
    target: "ESNext",
    treeShaking: true
  };

  const buildContext = await context(buildOptions);
  await invoke(buildContext, true);
});
