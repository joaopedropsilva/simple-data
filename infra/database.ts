import { Pool, QueryResult, PoolClient, PoolConfig } from "pg";
import { Result } from "@/models/result";

interface DBResult extends Result {
    payload: QueryResult<any> | null;
};

const config: PoolConfig = {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    port: parseInt(process.env.POSTGRES_PORT!),
    connectionTimeoutMillis: 2000,
    idleTimeoutMillis: 30000
}

const pool = new Pool(config);
pool.on("error", (error: Error, client: PoolClient) => {
    console.error(error);
});

export async function query(
    text: string,
    params: any[]
): Promise<DBResult> {
    const result: DBResult = {
        err: "",
        payload: null
    };

    let client;
    let err;
    try {
        client = await pool.connect();

        if (!client)
            throw new Error("Client acquisition from pool failed unexpectedly");

        result.payload = await client.query(text, params);
    } catch (error) {
        result.err = `${err}`;
        console.error(error);
    } finally {
        if (client)
            client.release();
    }

    return result;
}

