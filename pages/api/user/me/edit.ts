import bcrypt from "bcrypt";
import withHandler, { ResponseType } from "@libs/server/withhandler";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withSessionRoute } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const {
    body: { name, phone, email, vehicle },
    session: { user },
  } = req;

  const userCheck = await client.user.findUnique({
    where: {
      id: user?.id,
    },
  });
  if (!userCheck) {
    console.log("user");
    return res.json({ ok: false, error: "User not exist. Error!" });
  }

  const phoneCheck = await client.user.findUnique({
    where: {
      phone,
    },
  });

  if (phoneCheck && phoneCheck?.id !== userCheck?.id) {
    console.log("phone");
    return res.json({
      ok: false,
      error: "This phone number is already taken.",
    });
  }

  const emailCheck = await client.user.findUnique({
    where: {
      email,
    },
  });
  if (emailCheck && emailCheck?.id !== userCheck?.id) {
    console.log("email");
    return res.json({ ok: false, error: "This email is already taken." });
  }

  await client.user.update({
    where: {
      id: user?.id,
    },
    data: {
      name,
      phone,
      ...(email && { email }),
      ...(vehicle && { vehicle: +vehicle }),
    },
  });

  return res.json({ ok: true });
};

export default withSessionRoute(
  withHandler({ method: ["POST"], handler, isPrivate: true })
);
