import runNpmScript from "../tools/npmScriptRunner.ts";

export default async function preversion(): Promise<void> {
  await runNpmScript("build");
  await runNpmScript("lint");
}
