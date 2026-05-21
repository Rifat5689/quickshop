export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
};

export const accessTokenOptions = {
  ...cookieOptions,
  maxAge: 15 * 60 * 1000
};

export const refreshTokenOptions = {
  ...cookieOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000
};
