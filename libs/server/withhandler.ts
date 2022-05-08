import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}
type MethodType = "GET" | "POST" | "DELETE";
type FuntionType = (req: NextApiRequest, res: NextApiResponse) => void;
interface WithHandlerType {
  method: MethodType[];
  handler: FuntionType;
  isPrivate?: boolean;
}

const withHandler = ({
  method,
  handler,
  isPrivate = false,
}: WithHandlerType) => {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    return new Promise<void>(resolve => {
      if (req.method && !method.includes(req.method as any)) {
        res.status(405).json({ ok: false, error: "405" });
        return resolve();
      }
      if (isPrivate && !req.session?.user) {
        console.log("please log in");
        return res.status(401).json({ ok: false, error: "Please log in." });
      }
      try {
        handler(req, res);
      } catch (error) {
        res.status(500).json({ ok: false, error: "500" });
        return resolve();
      }
    });
  };
};

export default withHandler;
