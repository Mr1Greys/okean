import sharp from "sharp";
import { readFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");
const iconsDir = join(publicDir, "icons");

const svg = readFileSync(join(publicDir, "icon.svg"));

mkdirSync(iconsDir, { recursive: true });

const sizes = [
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "icon-512-maskable.png", size: 512, maskable: true },
];

for (const { name, size, maskable } of sizes) {
  let pipeline = sharp(svg).resize(size, size).png();

  if (maskable) {
    pipeline = sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 30, g: 154, b: 174, alpha: 1 },
      },
    })
      .composite([
        {
          input: await sharp(svg)
            .resize(Math.round(size * 0.62), Math.round(size * 0.62))
            .png()
            .toBuffer(),
          gravity: "center",
        },
      ])
      .png();
  }

  await pipeline.toFile(join(iconsDir, name));
  console.log(`Generated ${name}`);
}
