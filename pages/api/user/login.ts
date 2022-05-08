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
    body: { phone, password },
  } = req;

  const user = await client?.user.findUnique({
    where: {
      phone,
    },
    select: {
      id: true,
      password: true,
    },
  });
  if (!user) {
    res.json({ ok: false, error: "We don't recognize this phone number" });
  }
  if (user) {
    const passwordCheck = await bcrypt.compare(password, user?.password!);
    if (!passwordCheck) {
      return res.status(200).json({
        ok: false,
        error: "Wrong password, please check password again",
      });
    }
    req.session.user = {
      id: user.id,
    };

    await req.session.save();

    res.status(200).json({ ok: true });
  }
};

export default withSessionRoute(withHandler({ method: ["POST"], handler }));
