import multer from 'multer'
import path from 'path'
import fs from'fs'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imageFolder=path.resolve(__dirname,'../../images');
const videoFolder=path.resolve(__dirname,'../../videos')
if (!fs.existsSync(imageFolder)) {
  fs.mkdirSync(imageFolder, { recursive: true });
}
if (!fs.existsSync(videoFolder)) {
  fs.mkdirSync(videoFolder, { recursive: true });
}

const  storage=multer.diskStorage({
destination:(req,file,cb)=>{
    if(file.mimetype.startsWith('image/')){
    return cb(null,imageFolder)}
    if(file.mimetype.startsWith('video/')){
    return cb(null,videoFolder)}
},
    filename:(req,file,cb)=>{
    const uniqueName=Date.now().toString()+"_"+file.originalname
    cb(null,uniqueName)
    }})


    const upload=multer({storage})





export default upload