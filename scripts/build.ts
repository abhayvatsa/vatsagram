import fetch from 'cross-fetch';
import fs from 'fs';
import util from 'util';
import { cdn } from '../config';

const writeFile = util.promisify(fs.writeFile);

// Intended to be executed from root dir
async function main() {
  console.log('Grabbing latest manifest...');

  const manifestUrl = `${cdn}/manifest.json`;
  const manifest = await fetch(manifestUrl).then((res) => res.text());
  await writeFile('./public/manifest.json', manifest);

  console.log('Done!');
}

main();
