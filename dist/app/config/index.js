"use strict";
// import dotenv from "dotenv";
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config({ path: process.cwd() + "/.env" });
exports.default = {
    port: process.env.PROT,
    database_url: process.env.DATABASE_URL,
};
