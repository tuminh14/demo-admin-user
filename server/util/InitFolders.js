import Path from 'path';


const path = Path.join('');

export async function InitFolder(nameFolder) {
  try {
    console.log(path);
  } catch (err) {
    console.log('error : ', err);
    throw new Error(`Create folder ${nameFolder} error.`);
  }
}
