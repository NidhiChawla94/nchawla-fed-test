/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React from 'react';
import constants from './util/constants';
import './css/dist/style.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			loading: true
		};
	}

	componentDidMount() {
		this.fetchUsers();
	}

	fetchUsers = () => {
		this.setState({
			loading: true
		});
		let userData = this.state.users;
		fetch(constants.url)
			.then(response => response.json())
			.then(data => {
				userData = [...userData, ...data.results];
				this.setState({
					users: userData,
					loading: false
				});
			});
	};

	render() {
		return (
			<div className="content">
				<h4 className="title">Random Users</h4>
				<div className="user-container">
					<div className="row">
						{this.state.users.map((user, idx) => (
							<div className="col-lg-3 col-md-4 col-xs-12 col-sm-5" key={idx}>
								<div className="card">
									<img src={user.picture.thumbnail} alt={user.name.first} />
									<div className="container">
										<h4>
											<b>
												{user.name.title} {user.name.first} {user.name.last}
											</b>
											<br />
											<small>Email: {user.email}</small>
											<br />
											<small>
												DOB:{' '}
												{new Date(user.dob.date)
													.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
													.replace(/ /g, '-')}
											</small>
										</h4>
										<p>
											House: {user.location.street.number} {user.location.street.name}
											<br />
											City: {user.location.city}
											<br />
											State: {user.location.state}
											<br />
											Country: {user.location.country} {user.location.postcode}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
					{this.state.loading === true ? (
						<div className="text-center mt-3">
							<h4>Loading...</h4>
						</div>
					) : null}
					<div className="text-center mt-3">
						<button type="button" className="btn" onClick={this.fetchUsers}>
							Load More...
						</button>
					</div>
				</div>
			</div>
		);
	}
}
export default App;
