import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '07dc345b537c49f99dda5d3782b23b43',
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Unable to work with API'))
}


const handleImage = db => (req, res) => {
  const { id } = req.body;
  db('users')
    .where({ id })
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => res.json(entries))
    .catch((err) => res.status(400).json('Unable to get user entries'));
}

export {handleApiCall, handleImage}