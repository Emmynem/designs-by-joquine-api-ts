import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export const primary_domain: string = "https://designsbyjoquine.space";
export const mailer_url: string = "https://api.mailer.xnyder.com";

export const api_keys: Array<string> = [
	"34303f21-8094-4e86-8e55-7cdd21b97fc3", // Used
	"7a4af55e-8324-4dad-8503-f71dd2ca0be1",
	"84195873-25b3-4af1-9ca4-5423e8a13940",
	"a3abaae5-f6f8-4a4e-91d4-e739caea95ed",
	"f7c72a30-8a8f-4524-b71d-6b6be7a5e6c9",
	"888c20e9-d8a6-4b72-8bf8-c6af9f433abf",
	"2804fddd-9767-41f9-8862-87eb2438e93e",
	"698da120-2e94-42bb-89d0-318b8f18aad3",
	"b9a81786-2a88-480b-8708-0a74c656ce59",
	"516f9910-d22d-44b2-b6a1-c29fb7ab34c8",
	"1ed42dcf-9f04-407f-b923-a3332b58800f",
	"1b0922a2-4e17-4a97-a6d9-a9c7d4a09850",
	"6aacb468-f0ba-4e3c-958e-44888dc8aa0e",
	"9d1e97db-7274-48d7-b4e5-ebe997a9073d",
	"5a81f35c-94e3-461f-b1a8-10b616014bd8",
	"515f1d2c-9154-4175-865c-f6e3158aa620",
	"a70de607-6f46-4182-afd1-5cc44eb30ecd",
	"ce6df151-731e-40d0-86a1-4562f49c924c",
	"bce3d55b-cf20-4625-8011-2fd0bb811733",
	"6f423872-300e-45ae-be68-222a62e44459", 
];

export const tag_root: string = "Root";
export const db_start: string = "dbj_";
export const db_end: string = "_tbl";

export const dbj_header_key: string = "dbj-access-key";

export const false_status: boolean = false;
export const true_status: boolean = true;

export const default_status: number = 1;
export const default_delete_status: number = 0;
export const default_pending_status: number = 2;

export const check_length_TINYTEXT: number = 255;
export const check_length_TEXT: number = 65535;
export const check_length_MEDIUMTEXT: number = 16777215;
export const check_length_LONGTEXT: number = 4294967295;

export const paginate_limit: number = 20;

export interface IPagination {
	page?: number;
	size?: number;
	orderBy?: string;
	sortBy?: string;
	search?: string;
};

export interface ISearch {
	[key: string]: any;
};

// File lengths
export const file_length_5Mb: number = 5000000;
export const file_length_10Mb: number = 10000000;
export const file_length_15Mb: number = 15000000;
export const file_length_20Mb: number = 20000000;
export const file_length_25Mb: number = 25000000;
export const file_length_30Mb: number = 30000000;
export const file_length_35Mb: number = 35000000;
export const file_length_40Mb: number = 40000000;
export const file_length_45Mb: number = 45000000;
export const file_length_50Mb: number = 50000000;
export const file_length_55Mb: number = 55000000;
export const file_length_60Mb: number = 60000000;
export const file_length_65Mb: number = 65000000;
export const file_length_70Mb: number = 70000000;
export const file_length_75Mb: number = 75000000;
export const file_length_80Mb: number = 80000000;
export const file_length_85Mb: number = 85000000;
export const file_length_90Mb: number = 90000000;
export const file_length_95Mb: number = 95000000;
export const file_length_100Mb: number = 100000000;

export const today_str = () => {
	const d = new Date();
	const date_str = d.getFullYear() + "-" + ((d.getUTCMonth() + 1) < 10 ? "0" + (d.getUTCMonth() + 1) : (d.getUTCMonth() + 1)) + "-" + (d.getDate() < 10 ? "0" + d.getDate() : d.getDate());
	return date_str;
};

export const todays_date = () => {
	const d = new Date();
	return d.toDateString();
};

export const year_str = () => {
	const d = new Date();
	const date_str = d.getFullYear();
	return date_str;
};

export const timestamp_str = (date: any) => {
	const d = new Date(date * 1000);
	return {
		fulldate: d.toDateString() + " at " + d.toLocaleTimeString(),
		date: d.toDateString(),
		time: d.toLocaleTimeString(),
	};
};

export const timestamp_str_alt = (date: string) => {
	const d = new Date(date);
	const date_ = d.getFullYear() + "-" + ((d.getUTCMonth() + 1) < 10 ? "0" + (d.getUTCMonth() + 1) : (d.getUTCMonth() + 1)) + "-" + (d.getDate() < 10 ? "0" + d.getDate() : d.getDate());
	const time_ = (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) + ":" + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) + ":" + (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds());
	return date_ + " " + time_;
};

export const time_zero_hundred = () => {
	const d = new Date();
	const time_str = (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) + "00";
	return time_str;
};

export const random_uuid = (length: number) => {
	if (length === undefined || length === null || length === 0) {
		let values = crypto.randomBytes(20).toString('hex');
		return values;
	} else {
		let values = crypto.randomBytes(length).toString('hex');
		return values;
	}
};

export const random_numbers = (length: number) => {
	if (length === undefined || length === null || length === 0) {
		return 0;
	} else {
		let rand_number = "";
		for (let index = 0; index < length; index++) {
			rand_number += Math.floor(Math.random() * 10);
		}
		return rand_number;
	}
};

export const test_all_regex = (data: any, regex: RegExp) => {
	if (!data) {
		return false;
	}

	const valid = regex.test(data);
	if (!valid) {
		return false;
	}

	return true;
};

export const digit_filter = (digits: number) => {
	return digits.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const strip_text = (text: string) => {
	//Lower case everything
	let string = text.toLowerCase();
	//Make alphanumeric (removes all other characters)
	string = string.replace(/[^a-z0-9_\s-]/g, "");
	//Clean up multiple dashes or whitespaces
	string = string.replace(/[\s-]+/g, " ");
	//Convert whitespaces and underscore to dash
	string = string.replace(/[\s_]/g, "-");
	return string;
};

export const unstrip_text = (text: string) => {
	let string = text.replace(/[-_]/g, " ");
	return string;
};

export const unstrip_text_alt = (text: string) => {
	let string = text.replace(/[-_]/g, "");
	return string;
};

export const filterBytes = (bytes: any) => {
	if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '0 bytes';
	var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
		number = Math.floor(Math.log(bytes) / Math.log(1024));
	return (bytes / Math.pow(1024, Math.floor(number))).toFixed(1) + " " + units[number];
};

export const getFileExtension = (filename: string) => {
	let lastDot = filename.lastIndexOf('.');
	let ext = filename.substring(lastDot + 1);
	return ext;
};

export const strip_text_underscore = (text: string) => {
	let string = text.replace(/[\s]/g, "_");
	return string;
};

export const return_first_letter_uppercase = (str: any) => {
	return str.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, (letter: string) => letter.toUpperCase());
};

export const return_first_letter_uppercase_alt = (_str: any) => {
	const str = unstrip_text(_str);
	return str.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, (letter: string) => letter.toUpperCase());
};

export const return_all_letters_uppercase = (str: any) => {
	return str ? str.toUpperCase() : str;
};

export const return_all_letters_lowercase = (str: any) => {
	return str ? str.toLowerCase() : str;
};

export const return_trimmed_data = (str: any) => {
	return str.trim();
};

export const return_sort_by = (str: any) => {
	if (!str) return "desc";
	else if (str.toLowerCase() !== "asc" && str.toLowerCase() !== "desc") return "desc";
	else return str.toLowerCase();
};

export const return_order_by_for_others = (str: any) => {
	if (!str) return "createdAt";
	else if (str !== "updatedAt") return "createdAt";
	else return (str === "updatedAt") ? str : str.toLowerCase();
};

export const validate_future_date = (date: any) => {
	const d = new Date(date);
	const today = new Date();
	if (typeof d === "string" && d === "Invalid Date") return false;
	if (today.getTime() > d.getTime()) return false;
	return true;
};

export const validate_past_date = (date: any) => {
	const d = new Date(date);
	const today = new Date();
	if (typeof d === "string" && d === "Invalid Date") return false;
	if (today.getTime() < d.getTime()) return false;
	return true;
};

export const validate_future_end_date = (_start: any, _end: any) => {
	const start = new Date(_start);
	const end = new Date(_end);
	if (typeof start === "string" && start === "Invalid Date") return false;
	if (typeof end === "string" && end === "Invalid Date") return false;
	if (start.getTime() >= end.getTime()) return false;
	return true;
};

export const validate_future_end_date_alt = (_start: any, _end: any) => {
	const start = new Date(_start);
	const end = new Date(_end * 1000);
	if (typeof start === "string" && start === "Invalid Date") return false;
	if (typeof end === "string" && end === "Invalid Date") return false;
	if (start.getTime() >= end.getTime()) return false;
	return true;
};

export const paginate = (page: number, _records: number, total_records: number) => {
	// Get total pages available for the amount of records needed in each page with total records
	const records = !_records || _records < paginate_limit ? paginate_limit : _records;
	const pages = Math.ceil(total_records / records);
	// return false if page is less than 1 (first page) or greater than pages (last page)
	if (page < 1 || page > pages || !page) {
		return {
			start: 0,
			end: total_records < records ? total_records : records,
			pages: pages,
			limit: total_records < records ? total_records : records,
		};
	}

	// get the end limit
	const end = pages === page ? total_records : (page === 1 ? page * records : page * records);
	// get start limit
	// if records are uneven at the last page, show all records from last ending to the end
	const start = page === 1 ? 0 : (pages === page ? ((total_records - records) - (total_records - (page * records))) : end - records);

	// return object
	return {
		start: start,
		end: end,
		pages: pages,
		limit: end - start,
	};
};
