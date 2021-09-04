// types
import type { NextApiHandler } from "next";
import { User } from "next-auth";

const validateUser: NextApiHandler<User> = (request, response) => {
  const { body, method } = request;
  const { email, username } = body;

  if (method !== "POST") {
    return response.status(405).end();
  }

  if (
    !email ||
    !username ||
    typeof email !== "string" ||
    typeof username !== "string"
  ) {
    return response.status(401).end();
  }

  const user: User = {
    email,
    name: username,
    image: "",
  };

  return response.status(200).json(user);
};

export default validateUser;
