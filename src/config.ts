import "dotenv/config";

const CONFIG = {
  JWT_SECRET: process.env.JWT_SECRET,
  SALT_ROUNDS: 10,
  EXPIRES_IN: "7d" as any,
};

export default CONFIG;
