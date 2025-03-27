import { H3Event, createError } from "h3";
import jwt from "jsonwebtoken";
import authenticated from "~/middleware/authenticated";
import User from "~/models/user";

const SECRET_KEY = process.env.SECRET_KEY || "YOUR_SECRET_KEY";

export default (event: H3Event, requiredRoles: string[]) => {
  try {
    console.log("event", event.node.req.headers);
    // Extract the Authorization header
    const authHeader = event.node.req.headers["authorization"];
    console.log("authHeader", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw createError({
        statusCode: 401,
        message: "Token de autorização inválido",
      });
    }

    // Extract the token from the header
    const token = authHeader.split(" ")[1];

    // Verify the token
    const secretKey = SECRET_KEY; // Ensure you have this set in your environment variables
    if (!secretKey) {
      throw createError({
        statusCode: 500,
        message: "Internal Server Error: Secret key not set",
      });
    }

    const decodedToken = jwt.verify(token, secretKey);
    console.log("decodedToken", decodedToken);

    const authenticatedUser = User.fromJson(decodedToken);

    // Check if the user has the required roles

    console.log("authenticatedUser", authenticatedUser);
    console.log("requiredRoles", requiredRoles);
    if (!requiredRoles.includes(authenticatedUser.role)) {
      throw createError({
        statusCode: 403,
        message:
          "Acesso negado. Você não tem permissão de " +
          requiredRoles.join(" ou ") +
          " para acessar este recurso.",
      });
    }

    // Token is valid, and user has required roles
    return authenticatedUser;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 401,
      message: error.message || "Unauthorized",
    });
  }
};
