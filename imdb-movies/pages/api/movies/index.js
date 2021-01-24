import dbConnect from "../../../utils/dbConnect";
import Movie from "../../../models/Movie";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const movies = await Movie.find({});

        res.status(200).json({ success: true, data: movies });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const movie = await Movie.create(req.body);

        res.status(201).json({ success: true, data: movie });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
