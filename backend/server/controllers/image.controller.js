import Utils from "../utils";

// TODO: Store Image
const store = (req, res) => {
  try {
    const folder = '/upload/images'
    const file = Utils.ymdHis(new Date())
    const ext = Utils.saveBase64Image(req.body.uri, Utils.getPublicPath(folder), file);
    res.send({ status_code: 200, uri: `${folder}/${file}.${ext}`})
  } catch (err) {
    res.status(500).send(err);
  }
}

export default {
  store
}