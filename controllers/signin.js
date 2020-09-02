const handleSignin = (req, res, bcrypt, db) => {
  const { email, password } = req.body;
  db.select('email', 'hash').from('login')
    .where({ email })
    .then(user => {
      const isValid = bcrypt.compareSync(password, user[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where({ email })
          .then(user => res.json(user[0]))
          .catch(err => res.status(400).json('Unable to retrieve the user'));
      } else {
        res.status(400).json('Wrong Email/Password');
      }
    })
    .catch(err => res.status(400).json('Wrong Email/Password'));
}

export default handleSignin;