import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date(),
		},
		{
			id: '124',
			name: 'Sally',
			email: 'Sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date(),
		},
	],
};

app.get('/', (req, res) => {
	res.send(database.users);
});

// Signin
app.post('/signin', (req, res) => {
	if (
		req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password
	) {
		res.json('success');
	} else {
		res.status(400).json('Wrong email/password');
	}
});

// Register
app.post('/register', (req, res) => {
	const { name, email, password } = req.body;
	database.users.push({
		id: '125',
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date(),
	});
	res.json(database.users[database.users.length - 1]);
});

// GET User
app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach((user) => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}
	});
	if (!found) {
		res.status(400).json('not found');
	}
});

app.put('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach((user) => {
		if (user.id === id) {
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	});
	if (!found) {
		res.status(400).json('not found');
	}
});

app.listen(PORT, () => {
	console.log(`App is running on port: ${PORT} http://localhost:${PORT}`);
});
