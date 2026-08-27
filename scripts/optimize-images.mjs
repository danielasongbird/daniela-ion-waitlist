import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const imageDir = path.resolve('public/images');
const files = (await readdir(imageDir)).filter((name) => /\.(png|jpe?g)$/i.test(name));
let totalBefore = 0;
let totalAfter = 0;

for (const name of files) {
  const source = path.join(imageDir, name);
  const destination = path.join(imageDir, name.replace(/\.(png|jpe?g)$/i, '.webp'));
  const before = (await stat(source)).size;
  const metadata = await sharp(source).metadata();
  const pipeline = sharp(source).rotate();

  if ((metadata.width ?? 0) > 2000 || (metadata.height ?? 0) > 2600) {
    pipeline.resize({
      width: 2000,
      height: 2600,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  await pipeline
    .webp({ quality: 80, alphaQuality: 90, effort: 6, smartSubsample: true })
    .toFile(destination);

  const after = (await stat(destination)).size;
  totalBefore += before;
  totalAfter += after;
  console.log(`${name} -> ${path.basename(destination)} | ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB`);
}

console.log(`TOTAL | ${(totalBefore / 1024 / 1024).toFixed(2)} MB -> ${(totalAfter / 1024 / 1024).toFixed(2)} MB | ${((1 - totalAfter / totalBefore) * 100).toFixed(1)}% smaller`);