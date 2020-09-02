import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import knex from 'knex';
import handleSignin from './controllers/signin.js';
import handleRegister from './controllers/register.js';
// import handleSignin from './controllers/signin.js';
// import handleImage from './controllers/image.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: '',
		database: 'smart-brain',
	},
});

app.get('/', (req, res) => {
	res.send(database.users);
});

// Signin
app.post('/signin', (req, res) => { handleSignin(req, res, bcrypt, db) });

// Register
app.post('/register', (req, res) => { handleRegister(req, res, bcrypt, db) });

// GET User
app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	db.select('*')
		.from('users')
		.where({ id })
		.then((user) => {
			if (user.length) {
				res.json(user[0]);
			} else {
				res.status(400).json('Not Found');
			}
		})
		.catch((err) => res.status(400).json('Error getting user'));
});

app.put('/image', (req, res) => {
	const { id } = req.body;
	db('users')
		.where({ id })
		.increment('entries', 1)
		.returning('entries')
		.then((entries) => res.json(entries))
		.catch((err) => res.status(400).json('Unable to get user entries'));
});

app.listen(PORT, () => {
	console.log(`App is running on port: ${PORT} http://localhost:${PORT}`);
});
