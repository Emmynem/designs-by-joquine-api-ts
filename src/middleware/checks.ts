import { Request, Response, NextFunction } from "express";
// import dotenv from 'dotenv';
import { UnauthorizedError, ForbiddenError } from '../common/index';
import { default_delete_status, dbj_header_key, tag_root, api_keys } from "../config/config";

// dotenv.config();

export interface IGetAuthTypesRequest extends Request {
	API_KEY: string 
}

const verifyKey = (req: IGetAuthTypesRequest, res: Response, next: NextFunction) => {
	const key = req.headers[dbj_header_key] || req.query.key || req.body.key || '';
	if (!key) { 
		ForbiddenError(res, "No key provided!", null);
	} else if (!api_keys.includes(key)) {
		UnauthorizedError(res, "Invalid API Key!", null);
	} else {
		req.API_KEY = key;
		next();
	}
};

export default { verifyKey };