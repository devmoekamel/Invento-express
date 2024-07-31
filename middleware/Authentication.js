import jwt from "jsonwebtoken";

export const Authentication = (req, res, next) => {
  const { authentication } = req.headers;
  if (!authentication) {
    return res.satuts(401).json({
      success: false,
      error: "you are not authenticated",
    });
  }
  const token = authentication.replace("Bearer ", "").trim();
  jwt.verify(token, process.env.JWT_SECRECT_Key, (err, payload) => {
    if (err) {
      return res.satuts(401).json({
        success: false,
        error: "Invalid Token",
      });
    }
    if (!payload || !payload.id || !payload.type) {
      return res.satuts(401).json({
        success: false,
        error: "Invalid Token",
      });
    }
    const { id, type } = payload;
    try {
      req.userid = id;
      req.usertype = type;
      next();
    } catch (e) {
        res.status(500).json({
            success: false,
            error: "Server error",
          });
    }
  });
};
