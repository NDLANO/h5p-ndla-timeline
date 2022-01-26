import * as fs from "fs";
import { semantics } from "./src/semantics";

const semanticsPath = "semantics.json";
async function deleteSemanticsJson(): Promise<void> {
  await fs.promises.rm(semanticsPath);
}

async function createSemanticsJson(): Promise<void> {
  const textContent = JSON.stringify(semantics, null, 2);
  await fs.promises.writeFile(semanticsPath, textContent);
}

async function run(): Promise<void> {
  const semanticsJsonExists = fs.existsSync(semanticsPath);
  if (semanticsJsonExists) {
    await deleteSemanticsJson();
  }

  await createSemanticsJson();
}

run();
