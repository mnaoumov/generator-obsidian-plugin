import { execFromRoot } from "../tools/root.ts";

export default async function build(): Promise<void> {
  execFromRoot("tsc --build tsconfig.build.json --force");
}
