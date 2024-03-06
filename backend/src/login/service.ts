import jwt from "jsonwebtoken";

type ywtAuth = {
  token: string;
  refreshToken: string;
};

function generateAccessToken(userid: number) {
  return jwt.sign({ userid: userid }, process.env.SECRET || "", {
    expiresIn: "1h",
  });
}

const service = {
  login(userid: number): ywtAuth {
    const token = generateAccessToken(userid);

    const refreshToken = jwt.sign(
      { userid: userid },
      process.env.REFRESH_SECRET || ""
    );
    return { token, refreshToken };
  },
  token(refreshToken: string) {
    try {
      const user_token = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET || ""
      );
      if (user_token) {
        const accessToken = generateAccessToken((<any>user_token).id);
        return accessToken;
      }
    } catch (error) {
      console.error(error);
    }
  },
};

export default service;
