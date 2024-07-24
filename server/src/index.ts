import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import crypto from "crypto";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON payloads
app.use(
  bodyParser.json({
    verify: (req: Request, res: Response, buf: Buffer) => {
      (req as any).rawBody = buf;
    },
  })
);

// Helper function to verify GitHub signature
const verifySignature = (req: Request, res: Response, buf: Buffer) => {
  const secret = "secret";
  const signature = req.headers["x-hub-signature"] as string;
  const hmac = crypto.createHmac("sha1", secret);
  hmac.update(buf.toString("utf-8"));
  const digest = `sha1=${hmac.digest("hex")}`;

  if (signature !== digest) {
    return res
      .status(403)
      .send("Request body was not signed or verification failed");
  }
};

// Middleware to verify the signature (if using GitHub)
// app.use((req: Request, res: Response, next: NextFunction) => {
//   const rawBody = (req as any).rawBody as Buffer;

//   if (rawBody) {
//     verifySignature(req, res, rawBody);
//   } else {
//     let chunks: Buffer[] = [];
//     req.on("data", (chunk: Buffer) => {
//       chunks.push(chunk);
//     });
//     req.on("end", () => {
//       const rawBody = Buffer.concat(chunks);
//       (req as any).rawBody = rawBody;
//       verifySignature(req, res, rawBody);
//       next();
//     });
//   }
// });

// Webhook endpoint
app.post("/webhook", (req: Request, res: Response) => {
  const event = req.headers["x-github-event"] as string;
  const payload = req.body;

  if (event === "push") {
    console.log(`Received a push event for ${payload.repository.name}`);
    // Handle the push event here
  }

  res.status(200).send("Webhook received successfully");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
