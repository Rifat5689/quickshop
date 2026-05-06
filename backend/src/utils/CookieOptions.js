export const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None"
};

export const accessTokenOptions = {
  ...cookieOptions,
  maxAge: 15 * 60 * 1000
};

export const refreshTokenOptions = {
  ...cookieOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000
};
