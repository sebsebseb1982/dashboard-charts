import app from "./app";

let port = 8012;

app.listen(port, () => {
    console.log(`L'API écoute sur le port ${port}`);
});