import { Router } from "express";
import {File} from "../models/File.js";
import { fileController } from "../controllers/fileController.js";
const router = new Router();
export default router;


router.post("/files", async function(request, response) {
    const uploadedFile = request.files.file; 
    let fileData = uploadedFile.data.toString("utf-8");
    let file = new File(uploadedFile.name, fileData, uploadedFile.size, uploadedFile.mimetype);
    let isFileAdded = await fileController.addToFilesDir(file);
    if (isFileAdded) {
        return response.status(201).json({fileId: file.id});
    }
    return response.status(500).json({message : "server internal error"});
})


router.get("/files/:fileId", async function(request, response) {
    let fileId = request.params.fileId;
    let fileName = await fileController.getFileNameById(fileId);

    if (!fileName) {
        return response.status(404).json({ message: "invalid id"});
    }
    return response.status(200).json({file : fileName});
});


router.delete("/files/:fileId", async function(request, response) {
    let fileId = request.params.fileId;
    let isFileDeleted = await fileController.deleteFileById(fileId);
    if (isFileDeleted) {
        return response.status(200).json({message : "File Successful deleted"});
    }
    return response.status(500).json({message : "!Error!, file not deleted"})
})


router.get("/allFiles", async function(request, response) {
    let allFiles = await fileController.getAllFiles();
    response.status(200).json({files : allFiles});
})


router.use(function(request, response) {
    response.status(404).json({message : "invalid request"});
})