import { Application } from "express";
import applicationRoutes from "./application.routes"; 
import homeRoutes from "./home.routes";

export default class Routes {
	constructor(app: Application) {
		app.use("/", homeRoutes, applicationRoutes);
	}
}