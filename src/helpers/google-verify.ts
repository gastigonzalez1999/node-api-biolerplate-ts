import { OAuth2Client, TokenPayload } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function googleVerify(token: string) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload() as TokenPayload;
  if (!payload) {
    throw new Error("Invalid token");
  }

  const { name, picture, email } = payload;
  return {
    name,
    picture,
    email,
  };
};
