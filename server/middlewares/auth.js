import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Login again 😔",
      });
    }

    const token_decode = jwt.decode(token);
    req.body.clerkId = token_decode.clerkId;
    next()
  } catch (err) {
    console.error("Auth Error:", err.message);
    return res.status(401).json({
      success: false,
      message: "Token invalid or expired",
    });
  }
};

export default authUser;
