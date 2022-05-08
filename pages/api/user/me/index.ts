import withHandler from "@libs/server/withhandler";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withSessionRoute } from "@libs/server/withSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    session: { user },
  } = req;

  const profile = await client.user.findUnique({
    where: {
      id: user?.id,
    },
    include: {
      weights: {
        select: {
          weight: true,
          createdAt: true,
        },
      },
    },
  });
  if (!profile) {
    res.json({ ok: false });
  }
  res.status(200).json({ ok: true, profile });
};

export default withSessionRoute(
  withHandler({ method: ["GET"], handler, isPrivate: true })
);
