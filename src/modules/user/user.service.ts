import config from "../../config.ts";
import { pool } from "../../db";
import bcrypt from "bcrypt";


const createUserIntoDB = async (payload: any) => {

        const { name, email, password, role } = payload;

        const hashPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `
      INSERT INTO users(name, email, password, role)
      VALUES($1, $2, $3, $4)
      RETURNING *;
      `,
            [name, email, hashPassword, role]
        );

        return result;
}

export const userService = {
    createUserIntoDB
}