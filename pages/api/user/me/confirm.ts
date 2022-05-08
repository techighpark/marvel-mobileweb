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
    body: { password },
    session: { user },
  } = req;

  const userCheck = await client.user.findUnique({
    where: {
      id: user?.id,
    },
  });
  if (userCheck) {
    const passwordCheck = await bcrypt.compare(password, userCheck?.password);
    if (passwordCheck) {
      res.status(200).json({ ok: true });
    } else {
      res.json({
        ok: false,
        error: "Wrong password. Please check password again.",
      });
    }
  }
};

export default withSessionRoute(
  withHandler({ method: ["POST", "GET"], handler })
);
