import express from "express";
import fileUpload from "express-fileupload";
import fileRouter from "./routes/fileRoute.js"

const app = express();
app.use(fileUpload());
app.use(express.json());
app.use("/api", fileRouter);


app.get("/", function(request, response) {
    response.json({message : "file managment system"});
})

app.use(function(request, response) {
    response.status(404).json({message : "invalid request"});
})

app.listen(process.env.PORT, function() {
    console.log("server running");
})
