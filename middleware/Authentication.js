import jwt from "jsonwebtoken";

export const Authentication = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      success: false,
      error: "you are not authenticated",
    });
  }
  const token = authorization.replace("Bearer ", "").trim();
  jwt.verify(token, process.env.JWT_SECRECT_Key, (err, payload) => {
    if (err) {
      return res.status(401).json({
        success: false,
        error: "Invalid Token",
      });
    }
    if (!payload || !payload.id || !payload.username) {
      return res.status(401).json({
        success: false,
        error: "Invalid Token",
      });
    }
    const { id, username } = payload;
    try {
      req.userid = id;
      req.username = username;
      next();
    } catch (e) {
      res.status(500).json({
        success: false,
        error: "Server error",
      });
    }
  });
};
