import dotenv from "dotenv";

dotenv.config();

export const getServerEndpoint = (): string => {
  return process.env.SERVER_ENDPOINT || "http://localhost:3000";
};
