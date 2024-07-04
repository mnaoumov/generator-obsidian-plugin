import { execFromRoot } from "../tools/root.ts";

export default async function postversion(): Promise<void> {
  execFromRoot("git push");
  execFromRoot("git push --tags");
  execFromRoot(`npm publish`);
}
