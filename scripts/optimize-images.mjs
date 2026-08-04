import { readdirSync, statSync, unlinkSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DESIGN_DIR = path.resolve("src/assets/design");

async function main() {
  const files = readdirSync(DESIGN_DIR).filter((f) => f.endsWith(".png"));
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const inputPath = path.join(DESIGN_DIR, file);
    const outputPath = inputPath.replace(/\.png$/, ".webp");
    const before = statSync(inputPath).size;

    await sharp(inputPath).webp({ quality: 82 }).toFile(outputPath);

    const after = statSync(outputPath).size;
    totalBefore += before;
    totalAfter += after;
    console.log(
      `${file} -> ${path.basename(outputPath)}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`
    );
  }

  console.log(
    `\nTotal: ${(totalBefore / 1024).toFixed(0)}KB -> ${(totalAfter / 1024).toFixed(0)}KB (${(
      100 - (totalAfter / totalBefore) * 100
    ).toFixed(0)}% smaller)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
