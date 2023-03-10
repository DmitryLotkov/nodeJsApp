import {UploadedFile} from "express-fileupload";
import * as uuid from "uuid"
import path from "path";

class PostFileService {
    saveFile(file: UploadedFile) {
        try {
            const fileName = uuid.v4() + ".jpg"
            const filePath = path.resolve("static", fileName)
            file.mv(filePath)
            return fileName
        } catch (e) {
            console.log(e)
        }
    }
}

export default new PostFileService();