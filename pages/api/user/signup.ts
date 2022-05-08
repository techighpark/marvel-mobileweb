import withHandler from "@libs/server/withhandler";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import bcrypt from "bcrypt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { phone, password, name },
  } = req;

  const user = await client?.user.findUnique({
    where: {
      phone,
    },
  });
  if (user) {
    res.json({ ok: false, error: "Phone number is already exist" });
  }
  if (!user) {
    const hashPassword = await bcrypt.hash(password, 10);

    const createNumber = (phoneNum: number) =>
      parseInt(phoneNum.toString().slice(-4)) * 100 +
      Math.floor(Math.random() * 100);

    const userNumberExist = await client.user.findMany({
      select: {
        userNumber: true,
      },
    });

    let createNew: number | null = null;
    let i = 0;
    while (
      i < 100 ||
      !userNumberExist.some(num => num.userNumber === createNew)
    ) {
      createNew = createNumber(phone);
      const existCheck = userNumberExist.some(
        num => num.userNumber === createNew
      );
      if (!existCheck) {
        break;
      }
      i++;
    }
    if (createNew !== null) {
      const newUser = await client.user.create({
        data: {
          phone,
          name,
          userNumber: createNew,
          password: hashPassword,
        },
      });

      res.status(200).json({ ok: true, newUser });
    }
  }
};

export default withHandler({ method: ["POST"], handler });
