import fetch from "node-fetch";
import fs from "fs";
import config from "./config";
import Path from "path";

export const downloadFile = async (url: string, path: string) => {
  const res = await fetch(url);
  await fs.promises.mkdir(config.publicPath + '/imagesGoogle', {recursive: true});
  res.body.pipe(fs.createWriteStream(Path.join(config.publicPath, `/imagesGoogle/${path}`)));
};