import db from "../../../utils/db";

export default async (req, res) => {
  switch (req.method) {
    case "POST": {
      try {
        const { id } = await db.collection("posts").add({
          ...req.body,
          created: new Date().toISOString(),
        });
        res.status(200).json({ id });
      } catch (e) {
        res.status(400).end();
      }
    }
  }
};
