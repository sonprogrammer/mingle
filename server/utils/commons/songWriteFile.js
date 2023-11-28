const fs = require("fs").promises;
const path = require("path");

async function copyFile(srcPath, destPath) {
  const fileData = await fs.readFile(srcPath);
  await fs.writeFile(destPath, fileData);
}

async function songWriteFile(audio, songImage) {
  const imgLocation = path.join(
    __dirname,
    `../../upload/songImg/${songImage[0].filename}`
  );
  const audioLocation = path.join(
    __dirname,
    `../../upload/audio/${audio[0].filename}`
  );

  await Promise.all([
    copyFile(imgLocation, imgLocation),
    copyFile(audioLocation, audioLocation),
  ]);
}

module.exports = { songWriteFile };
