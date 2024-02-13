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




























// import http from "http";
// import querystring from "querystring";

// let requestHandler = {
//     'GET' : {},

//     "POST" : {},

//     "DELETE" : {},

//     "PUT" : {}
// }

// const middlewareStack = [];


// async function parseJson(request, response) {
//     await new Promise((resolve, reject) => {
//         let data = '';
//         request.on('data', (chunk) => {
//             data += chunk;
//         });

//         request.on('end', () => {
//             try {
//                 request.body = JSON.parse(data);
//                 resolve();
//             } catch (error) {
//                 reject(error);
//             }
//         });
//     });
// }


// function json(object) {
//     if (typeof object != "object") {
//         throw new Error("argument typ is not a object");
//     }
//     let jsonObject = JSON.stringify(object);
//     this.setHeader("Content-Type", "application/json");
//     this.end(jsonObject); 
//     return this;   
// }


// function status(statusCode) {
//     if (statusCode / 1 != statusCode) {
//         throw new Error("invalid argument");
//     }
//     this.statusCode = statusCode
//     return this;
// }



// async function requestController(request, response) {
//     let httpMethod = request.method;
//     let httpUrl = request.url;

//     let handler = requestHandler[httpMethod][httpUrl];
//     response.json = json;
//     response.status = status;

//     if (!handler) {
//         return response.status(404).json({message : "invalid request"});
//     }
//     for (let i = 0; i < middlewareStack.length; ++i) {
//         return middlewareStack[i](request, response, middlewareStack[i + 1]);
//     }

//     handler(request, response);
//     request.end();
// }



// function expressCopy() {
//     const server = http.createServer(requestController);
//     expressCopy.json = parseJson;
//     return {
//         get(route, cb) {
//             requestHandler['GET'][route] = cb;
//         },

//         post(route, cb) {
//             requestHandler['POST'][route] = cb;
//         },
        
//         delete(route, cb) {
//             requestHandler['DELETE'][route] = cb;
//         },

//         put(route, cb) {
//             requestHandler['PUT'][route] = cb;
//         },

//         use(cb) {
//             middlewareStack.push(cb);
//         },

//         listen(port, cb) {
//             server.listen(port, cb);
//         }
//     }
// }



// const app = expressCopy();
// app.use(expressCopy.json);

// app.get("/test", function(request, response) {
//     response.status(500).json({message : 'welcome home page'})
// })

// app.get("/test:id", function(request, response) {
//     console.log(request.params.id);
//     response.json({message : "ok"});
// })

// app.post("/post_test", function(request, response) {
//     response.status(404).json({"message" : "hello world"});
// });

// app.listen(process.env.PORT, function() {
//     console.log('server running');
// })