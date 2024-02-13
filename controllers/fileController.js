import fs from "fs";
import fsExtra from "fs-extra";
import path from "path";

export default class fileController {

    static async addToFilesDir(file) {
        try {
            const isDirExist = fs.existsSync(path.resolve('Files'));
            if (!isDirExist) {
                await fs.promises.mkdir(path.resolve('Files'));
            }
            await fs.promises.mkdir(path.resolve(`Files/${file.id}`));

            //write file by chunks
            let dataChunks = file.data.split("\n");

            const timeId = setTimeout(async () => {
                let chunk = dataChunks.splice(0, 1);
                await fs.promises.appendFile(path.resolve(`Files/${file.id}/${file.name}`), `${chunk.toString()}\n`);
                if (dataChunks.length > 0) {
                    timeId.refresh();
                }
            }, 100);
            return true;
        }
        catch(error) {
            console.log(error);
            return false;
        }
    }


    static async getFileNameById(fileId) {
        try {
            let allFilesById = await fs.promises.readdir(path.resolve(`Files/${fileId}`), "utf-8");
            return allFilesById.legnth < 1? null : allFilesById[0] //first matched;
        } catch(error) {
            console.log(error);
        }
    }


    static async deleteFileById(fileId) {
        try {
            await fsExtra.remove(path.resolve(`Files/${fileId}`));
            return true;
        }
        catch(error) {
            console.log(error);
            return false;
        }
    }


    static async getAllFiles() {
        try {
            let allFiles = [];
            let allFilesIds = await fs.promises.readdir(path.resolve("Files"), "utf-8");
            for (const fileId of allFilesIds) {
                let file = await this.getFileNameById(fileId);
                allFiles.push(file);
            }
            return allFiles.length > 0? allFiles : "Empty";
        } catch(error) {
            console.log(error);
        }
    }
}