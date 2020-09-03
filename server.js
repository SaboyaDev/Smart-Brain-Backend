import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import knex from 'knex';
import handleSignin from './controllers/signin.mjs';
import handleRegister from './controllers/register.mjs';
import handleProfileGet from './controllers/profile.mjs';
import {handleApiCall, handleImage} from './controllers/image.mjs';

const app = express();
const PORT = 3001 || process.env.PORT;

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

app.get('/', (req, res) => { res.send('It is Working') });
app.post('/signin', handleSignin(bcrypt, db));
app.post('/register', handleRegister(bcrypt, db));
app.get('/profile/:id', handleProfileGet(db));
app.put('/image', handleImage(db));
app.post('/imageurl', (req, res) => { handleApiCall(req, res) });

app.listen(PORT, () => {
	console.log(`App is running on port: ${PORT} http://localhost:${PORT}`);
});
