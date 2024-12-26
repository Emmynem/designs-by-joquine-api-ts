import express, { Application } from "express";
import Server from "./src/index";
import Database from "./src/models";

const app: Application = express();
const server: Server = new Server(app);
const NODE_ENV: any = process.env.NODE_ENV;
const PORT: number = process.env.PORT ? (NODE_ENV === "development" ? parseInt('821') : parseInt('3021')) : (NODE_ENV === "development" ? parseInt('821') : parseInt('3021'));
const db = new Database();

app
	.listen(PORT, "localhost", function () {
		console.log(`Server is running on port ${PORT}.`);
	})
	.on("error", (err: any) => {
		if (err.code === "EADDRINUSE") {
			console.log("Error: address already in use");
			db.sequelize?.close();
			process.exit(1);
		} else {
			console.log(err);
			process.exit(1);
		}
	});