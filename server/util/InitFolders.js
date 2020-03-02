import execa from 'execa';
import fs from 'fs';
import Path from 'path';
import logger from '../api/logger';

let path = Path.join('');

export async function InitFolder(nameFolder) {
  try {
    console.log(path);
  } catch (err) {
    console.log('error : ', err);
    throw new Error(`Create folder ${nameFolder} error.`)
  }
}
