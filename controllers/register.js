const handleRegister = (req, res, bcrypt, db) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  db.transaction((trx) => {
    trx.insert({
      hash,
      email,
    })
      .into('login')
      .returning('email')
      .then((loginEmail) => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name,
            joined: new Date(),
          })
          .then((user) => res.status(200).json(user[0]));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  })
    .catch((err) => res.status(400).json('Unable to Register'))
}
 export default handleRegister;