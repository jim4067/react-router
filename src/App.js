import { useRouteMatch, Link, Switch, Route, useHistory } from 'react-router-dom';
import React, { useState } from "react";
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@material-ui/core';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { Alert } from '@material-ui/lab';

const Home = () => (
	<div>
		<h2>The Notes App</h2>
		<p>
			Lorem Ipsum is simply dummy text of the printing and typesetting industry.
			Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
			when an unknown printer took a galley of type and scrambled it to make a type specimen book.
			It has survived not only five centuries, but also the leap into electronic typesetting,
			remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
			sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
			Aldus PageMaker including versions of Lorem Ipsum.
		</p>
	</div>
)


const Note = ({ note }) => {
	//const id = useParams().id;
	//const note = notes.find(note => note.id === Number(id));

	return (
		<div>
			<h2>{note.content}</h2>
			<div>{note.user}</div>
			<div><strong>{note.important ? 'important' : ''}</strong></div>
		</div>
	)
}

const Notes = ({ notes }) => (
	<div>
		<h2>Notes</h2>
		<TableContainer component={Paper} >
			<Table>
				<TableBody>
					{notes.map(note =>
						<TableRow key={note.id}>
							<TableCell ><Link to={`/notes/${note.id}`}> {note.content}</Link></TableCell>
							<TableCell >{note.user}</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	</div>
);

const Users = () => (
	<div>
		<h2>TKTL notes app</h2>
		<ul>
			<li>Matti Luukkainen</li>
			<li>Juha Tauriainen</li>
			<li>Arto Hellas</li>
		</ul>
	</div>
);

const Login = (props) => {
	const history = useHistory();

	const onSubmit = (event) => {
		event.preventDefault();
		props.onLogin('jim4067');
		history.push('/');
	}

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={onSubmit}>
				<div>
					<TextField label="username" />
				</div>
				<div>
					<TextField label="Password" type='password' />
				</div>
				<div>
					<Button variant='contained' color='primary' type='submit' >
						login
					</Button>
				</div>
			</form>
		</div>
	)
}

function App() {
	const [notes, setNotes] = useState([
		{
			id: 1,
			content: 'HTML is easy',
			important: true,
			user: 'Matti Luukkainen'
		},
		{
			id: 2,
			content: 'Browser can execute only Javascript',
			important: false,
			user: 'Matti Luukkainen'
		},
		{
			id: 3,
			content: 'Most important methods of HTTP-protocol are GET and POST',
			important: true,
			user: 'Arto Hellas'
		},
		{
			id: 4,
			content: "Huge thanks for the musical genius that is Sasha Sloan",
			important: false,
			user: "jim4067"
		}
	]);
	const [user, setUser] = useState(null);
	const [message , setMessage] = useState(null);

	const login = (user) => {
		setUser(user);
		
		setMessage(`oh thank God you're back ${user}`);
		setTimeout(() => {
			setMessage(null);
		}, 2000);
	}

	const padding = {
		'padding': '5px'
	}

	const match = useRouteMatch('/notes/:id');
	const note = match
		? notes.find((note) => note.id === Number(match.params.id))
		: null

	return (
		<Container >
			{(
				message && 
				<Alert severity='success' >
					{message}
				</Alert>
			)}

			<div>
				< Link style={padding} to='/'> home </Link>
				< Link style={padding} to='/notes'> notes </Link>
				< Link style={padding} to='/users'> users </Link>
				{user
					? <em>{user} logged in</em>
					: <Link style={padding} to='/login'>login</Link>
				}
			</div>

			<Switch>
				<Route path='/notes/:id'>
					<Note note={note} />
				</Route>
				<Route path='/notes' >
					<Notes notes={notes} />
				</Route>
				<Route path="/users">
					{user ? <Users /> : <Redirect to="/login" />}
				</Route>
				<Route path='/login'>
					<Login onLogin={login} />
				</Route>
				<Route path='/'>
					<Home />
				</Route>
			</Switch>

			<div>
				<i>The Notes App, jim4067 &copy;2020 </i>
			</div>

		</Container>
	);
}

export default App;
