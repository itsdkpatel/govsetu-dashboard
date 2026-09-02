import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const appDirectory = existsSync(join(process.cwd(), "dashboard-entry.hex"))
  ? process.cwd()
  : join(process.cwd(), "artifacts/govstart-setu-dashboard");
const hex = readFileSync(join(appDirectory, "dashboard-entry.hex"), "utf8").replace(
  /\s/g,
  "",
);

writeFileSync(join(appDirectory, "index.html"), Buffer.from(hex, "hex"));