import { Sequelize } from "sequelize-typescript";
import { config, dialect, dialectOptions, timezone } from "../config/db.config";
import Application from "./application.model";
import logger from "../common/logger";

class Database {
	public sequelize: Sequelize | undefined;

	constructor() {
		this.connectToDatabase();
	}

	private async connectToDatabase() {
		this.sequelize = new Sequelize({
			database: config.DB,
			username: config.USER,
			password: config.PASSWORD,
			host: config.HOST,
			dialect: dialect,
			logging: false,
			pool: {
				max: config.pool.max,
				min: config.pool.min,
				acquire: config.pool.acquire,
				idle: config.pool.idle,
				evict: config.pool.evict
			},
			dialectOptions: {
				// useUTC: dialectOptions.useUTC, 
				dateStrings: dialectOptions.dateStrings,
				typeCast: dialectOptions.typeCast
			},
			timezone: timezone,
			models: [Application]
		});

		await this.sequelize
			.authenticate()
			.then(() => {
				// logger.info("Connection has been established successfully.");
				logger.info("DB Connected 🚀");
			})
			.catch((err) => {
				logger.error("Unable to connect to the Database:".concat(JSON.stringify(err)));
			});
	}
}

export default Database;