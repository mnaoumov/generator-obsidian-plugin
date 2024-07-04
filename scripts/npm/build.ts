import { execFromRoot } from "../tools/root.ts";

export default function build(): void {
  execFromRoot("tsc --build tsconfig.build.json --force");
}
