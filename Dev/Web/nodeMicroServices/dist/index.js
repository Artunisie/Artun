"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const body_parser_1 = __importDefault(require("body-parser"));
const serve_static_1 = __importDefault(require("serve-static"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, serve_static_1.default)("public"));
app.use((0, cors_1.default)());
const uri = "mongodb+srv://seifeddine:B85mToSBEVYdGF6k@cluster0.o4udqpk.mongodb.net/Artun";
mongoose_1.default.connect(uri)
    .then(() => {
    console.log("MongoDb connection success");
})
    .catch((err) => {
    console.error('MongoDb connection error:', err);
});
app.get("/", (req, resp) => {
    resp.send("Hello world");
});
app.get("/users", (req, resp) => {
    user_1.default.find()
        .then((users) => {
        resp.send(users);
    })
        .catch((err) => {
        resp.status(500).send(err);
    });
});
app.get("/users/:id", (req, resp) => {
    const userId = req.params.id;
    user_1.default.findById(userId)
        .then((user) => {
        if (user) {
            resp.send(user);
        }
        else {
            resp.status(404).send("user not found");
        }
    })
        .catch((err) => {
        resp.status(500).send(err);
    });
});
app.post("/users", (req, resp) => {
    const newUser = new user_1.default(req.body);
    newUser.save()
        .then((user) => {
        resp.status(201).send(user);
    })
        .catch((err) => {
        resp.status(500).send(err);
    });
});
app.put("/users/:id", (req, resp) => {
    const userId = req.params.id;
    user_1.default.findByIdAndUpdate(userId, req.body)
        .then(() => {
        resp.send("Successfully updated user");
    })
        .catch((err) => {
        resp.status(500).send(err);
    });
});
app.delete("/users/:id", (req, resp) => {
    const userId = req.params.id;
    user_1.default.findByIdAndRemove(userId)
        .then((user) => {
        if (user) {
            resp.send(`Successfully deleted user with ID ${userId}`);
        }
        else {
            resp.status(404).send("user not found");
        }
    })
        .catch((err) => {
        resp.status(500).send(err);
    });
});
app.get("/userss-search", (req, resp) => {
    const keyword = req.query.kw || '';
    user_1.default.find({ name: { $regex: new RegExp(".*" + keyword + ".*", "i") } })
        .then((users) => {
        if (users.length > 0) {
            resp.send(users);
        }
        else {
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
