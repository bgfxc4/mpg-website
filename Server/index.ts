import express from 'express';
const app = express();
const PORT = 5558;

app.get('/api/:args', (req,res) => {
	console.log("got api request args: " + req.params.args)
});


app.listen(PORT, () => {
	console.log(`[server]: Server is running at https://localhost:${PORT}`);
	app.use("/", express.static("../Website"));
});
