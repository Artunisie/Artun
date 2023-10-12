import express,{Request , Response, query} from "express";
import User from "./user";
import bodyParser from "body-parser";
import serverStatic from "serve-static";
import mongoose from "mongoose";
import cors from "cors";

const app=express();

app.use(bodyParser.json());
app.use(serverStatic("public"));
app.use(cors());


const uri = "mongodb+srv://seifeddine:B85mToSBEVYdGF6k@cluster0.o4udqpk.mongodb.net/Artun";
mongoose.connect(uri)
    .then(() => {
        console.log("MongoDb connection success");
    })
    .catch((err) => {
        console.error('MongoDb connection error:', err);
    });

app.get("/",(req:Request,resp:Response)=>{
    resp.send("Hello world");
});


app.get("/users", (req, resp) => {
    User.find() 
        .then((users) => {
            resp.send(users); 
        })
        .catch((err) => {
            resp.status(500).send(err); 
        });
});




app.get("/users/:id", (req:Request, resp:Response) => {
    const userId = req.params.id;

    User.findById(userId)
        .then((user) => {
            if (user) {
                resp.send(user);  
            } else {
                resp.status(404).send("user not found");  
            }
        })
        .catch((err) => {
            resp.status(500).send(err);
        });
});


app.post("/users", (req:Request, resp:Response) => {
    const newUser = new User(req.body);

    newUser.save()
        .then((user) => {
            resp.status(201).send(user); 
        })
        .catch((err) => {
            resp.status(500).send(err); 
        });
});


app.put("/users/:id", (req:Request, resp:Response) => {
    const userId = req.params.id;

    User.findByIdAndUpdate(userId, req.body)
        .then(() => {
            resp.send("Successfully updated user");
        })
        .catch((err) => {
            resp.status(500).send(err);
        });
});


app.delete("/users/:id", (req, resp) => {
    const userId = req.params.id;

    User.findByIdAndRemove(userId)
        .then((user) => {
            if (user) {
                resp.send(`Successfully deleted user with ID ${userId}`);
            } else {
                resp.status(404).send("user not found");
            }
        })
        .catch((err) => {
            resp.status(500).send(err);
        });
});







app.get("/userss-search", (req:Request, resp:Response) => {
    const keyword = req.query.kw || '';
    User.find({ name: { $regex: new RegExp(".*" + keyword + ".*", "i") })
        .then((users) => {
            if (users.length > 0) {
                resp.send(users);
            } else {
                resp.status(404).send("No users found with the given keyword");
            }
        })
        .catch((err) => {
            resp.status(500).send(err);
        });
});







const port = 8700; 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
