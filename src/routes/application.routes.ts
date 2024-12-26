import { Router } from "express";
import { checks } from "../middleware/index";
import { ApplicationRules } from "../rules/application.rules";
import { DefaultRules } from "../rules/default.rules";
import ApplicationController from "../controllers/application.controller";

class ApplicationRoutes {
	router = Router();
	controller = new ApplicationController();

	constructor() {
		this.intializeRoutes();
	}

	intializeRoutes() {

		this.router.get("/applications", [checks.verifyKey as any], this.controller.getApplications as any);
		this.router.get("/search/applications", [checks.verifyKey as any, DefaultRules.forSearching], this.controller.searchApplications as any);

		this.router.post("/application", [checks.verifyKey as any, ApplicationRules.forAdding], this.controller.addApplication as any);

		this.router.delete("/application", [checks.verifyKey as any, ApplicationRules.forFindingApplication], this.controller.deleteApplication as any);
	}
}

export default new ApplicationRoutes().router;