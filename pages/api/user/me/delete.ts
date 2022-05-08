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
    session: { user },
  } = req;

  await client.user.delete({
    where: {
      id: user?.id,
    },
  });
  req.session.destroy();

  res.json({ ok: true });
};

export default withSessionRoute(
  withHandler({ method: ["POST"], handler, isPrivate: true })
);
