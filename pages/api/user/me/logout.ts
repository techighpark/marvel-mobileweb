import withHandler, { ResponseType } from "@libs/server/withhandler";
import type { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  req.session.destroy();
  res.status(200).json({ ok: true });
};

export default withSessionRoute(withHandler({ method: ["POST"], handler }));
