import bot from "../../bot/bot.js";

export const config = {
  api: {
    bodyParser: false, // disable automatic body parsing
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", async () => {
        const update = JSON.parse(body);
        await bot.handleUpdate(update);
        res.status(200).send("OK");
      });
    } catch (err) {
      console.error("Webhook error:", err);
      return res.status(500).send("Error");
    }
  } else {
    return res.status(200).send("KryptoveBot is running 🚀");
  }
}
