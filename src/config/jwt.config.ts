import { env } from "process";

export const jwtConfig = {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  secret: env.JWT_SECRET!,
  expiresIn: "5m"
};
