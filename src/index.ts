import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import rateLimit from 'express-rate-limit';
import morganMiddleware from "./middleware/morgan.js";
import { dbj_header_key, primary_domain } from './config/config.js';
import Routes from "./routes";
import Database from "./models";

// Rate limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per windowMs
	message: 'Too many requests from this IP, please try again later',
	standardHeaders: true,
	legacyHeaders: false,
});

export default class Server {
	constructor(app: Application) {
		this.config(app);
		this.syncDatabase();
		new Routes(app);
	}

	private config(app: Application): void {
		const appWhitelist = [primary_domain, "http://localhost", "http://localhost:80", "http://localhost:3000", "http://localhost:5173"];

		const corsOptions: CorsOptions = {
			allowedHeaders: [
				'Access-Control-Allow-Headers',
				'Origin',
				'X-Requested-With',
				'Content-Type',
				'Accept',
				dbj_header_key
			],
			methods: 'GET,PUT,POST,DELETE',
			credentials: true,
			origin: function (org: any, callback) {
				if (appWhitelist.indexOf(org) !== -1) {
					callback(null, true);
				} else {
					callback(null, false);
				}
			},
		};

		app.use(cors(corsOptions));
		app.use(express.json());
		app.use(express.urlencoded({ extended: true, limit: '100mb' }));
		app.use(limiter); // Apply rate limiting to all routes
		app.use(helmet());
		app.use(morganMiddleware);
	}

	private syncDatabase(): void {
		const db = new Database();
		db.sequelize?.sync({ alter: false });
	}
}