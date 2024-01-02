const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			userData: null,
			isLoggedIn: false,
			newUserRes: '',
			privateData: "",
			loginRes: [],
		},
		actions: {
			logout: () => {
				sessionStorage.removeItem("access_token");
					setStore({
						isLoggedIn: false,
						userData: null,
						message: null,
						privateData: "",
						
					});
				
			},

			logIn: async (userEmail, password) => {
				const store = getStore()
				const opts = {
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({
						email: userEmail,
						password: password,
					}),
				};
				await fetch(process.env.BACKEND_URL + "/api/login", opts)
					.then((resp) => {
						if (resp.status === 200) return resp.json();
					})
					.then((data) => {
						sessionStorage.setItem("access_token", data.access_token);
						
						setStore({ store: store.loginRes = data.msg})
						console.log(store.loginRes)
					})
					.catch((error) => {
						console.error("There was an error", error);

					});
			},


			createNewUser: async (newUser) => {
				try {
					const store = getStore()
					setStore({ store: store.newUserRes = "" })
					await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST",
						headers: {
							
							"Content-type": "application/json",
						},

						body: JSON.stringify(newUser)
					})
						.then((res) => res.json())
						.then((json) => setStore({ store: store.newUserRes = json.msg }))

				} catch (error) {
					console.log("Create user function error==", error)
				}

			},

			privateViewRequest: async () => {
				if (sessionStorage.access_token) {
					const store = getStore()
					await fetch(process.env.BACKEND_URL + "/api/private", {
						headers: {
							Authorization: `Bearer ${sessionStorage.access_token}`
						}
					})
						.then((res) => {
							if (res.status == 200) {
								return res.json()
							} else {
								throw Error(res.statusText)
							}
						})
						.then((json) => store.privateData = json)
					setStore({ store: store.privateData })
					setStore({ store: store.loginRes = [true] })

				}

			}

		}
	};
};

export default getState;