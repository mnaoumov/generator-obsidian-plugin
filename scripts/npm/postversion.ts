import { execFromRoot } from "../tools/root.ts";

export default function postversion(): void {
  execFromRoot("git push");
  execFromRoot("git push --tags");
  execFromRoot("npm publish");
}
