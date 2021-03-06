const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const knex = require('knex');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: true
	},
});

app.get('/', (req, res) => { res.send('It is Working') });
app.post('/signin', signin.handleSignin(bcrypt, db));
app.post('/register', register.handleRegister(bcrypt, db));
app.get('/profile/:id', profile.handleProfileGet(db));
app.put('/image', image.handleImage(db));
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(PORT, () => {
	console.log(
		`App is running on port: ${PORT} or see it live at https://young-mesa-35370.herokuapp.com/`
	);
});
