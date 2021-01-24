import dbConnect from "../../../utils/dbConnect";
import Movie from "../../../models/Movie.js";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case "GET":
      try {
        const movie = await Movie.findById(id);
        if (!movie) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: movie });
      } catch (e) {
        return res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const movie = await Movie.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!movie) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: movie });
      } catch (e) {
        return res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        await Movie.deleteOne({ _id: id });
        res.status(204).json({ success: true, data: {} });
      } catch (e) {
            try {
                await Movie.deleteOne({ id_movieDb: id });
                res.status(204).json({ success: true, data: {} });
            } catch (e) {
                return res.status(400).json({ error: e });
            }
      }
      break;
    default:
      return res.status(400).json({ success: false });
  }
};
