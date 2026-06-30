import { pool } from "../../db";
import bcrypt from "bcrypt";
import type { ILogin, IUser } from "./user.interface";


const createUserIntoDB = async (payload: IUser) => {

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

const userLoginResponceIntoDB = async (payload: ILogin) => {
    const {email, password} = payload;
    
    const result = await pool.query(`
            SELECT * FROM users WHERE email=$1
        `, [email])

        console.log(result.rows[0]);
}

export const userService = {
    createUserIntoDB,
    userLoginResponceIntoDB
}