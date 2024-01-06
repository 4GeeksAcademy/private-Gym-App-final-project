const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			userData: null,
			isLoggedIn: false,
			newUserRes: '',
			privateData: "",
			loginRes: "",
			role: '',
			adminUserData: "",
			adminTrainerData: "",
			newTrainerRes: "",
			loginTrainerRes: "",
			routineData: "",
			privateRes: ""
		},
		actions: {
			logout: () => {
				sessionStorage.removeItem("access_token");
				setStore({
					message: null,
					userData: null,
					isLoggedIn: false,
					newUserRes: "",
					privateData: "",
					loginRes: "",
					role: "",
					adminUserData: "",
					adminTrainerData: "",
					newTrainerRes: "",
					loginTrainerRes: "",
					routineData: "",
					privateRes: false
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

						setStore({ store: store.loginRes = data.msg })
						setStore({ store: store.role = data.role })
						//console.log(store.loginRes)
					})
					.catch((error) => {
						console.error("There was an error", error);

					});
			},
			trainerLogIn: async (email, password) => {
				const store = getStore()
				const opts = {
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({
						email: email,
						password: password,
					}),
				};
				await fetch(process.env.BACKEND_URL + "/api/login/trainer", opts)
					.then((resp) => {
						if (resp.status === 200) return resp.json();
					})
					.then((data) => {
						sessionStorage.setItem("access_token", data.access_token);

						setStore({ store: store.loginTrainerRes = data.msg })
						setStore({ store: store.role = data.role })
						
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
								setStore({ store: store.privateRes = true })
								throw Error(res.statusText)
							}
						})
						.then((json) => store.privateData = json)
						setStore({ store: store.privateData })

				

			},
			getAllUsers: async () => {
				
					const store = getStore()
					await fetch(process.env.BACKEND_URL + "/api/all", {
						headers: {
							Authorization: `Bearer ${sessionStorage.access_token}`
						}
					})
						.then((res) => {
							if (res.status == 200) { 
								return res.json()
							} else {
								setStore({ store: store.privateRes = true })
								throw Error(res.statusText)
								
							}
						})
						.then((json) => setStore({ store: store.adminUserData = json }) )
				
			},
			getAllTrainers: async () => {
					const store = getStore()
					//setStore({ store: store.adminUserData = "" })
					await fetch(process.env.BACKEND_URL + "/api/all/trainers", {
						headers: {
							Authorization: `Bearer ${sessionStorage.access_token}`
						}
					})
						.then((res) => {
							if (res.status == 200) { 
								return res.json()
							} else {
								setStore({ store: store.privateRes = true })
								throw Error(res.statusText)
								
							}
						})
						.then((json) => setStore({ store: store.adminTrainerData = json }))

				
			},
			deleteUser: async (id) => {
				try {
					const store = getStore()
					//setStore({ store: store.adminUserData = "" })
					await fetch(process.env.BACKEND_URL + `/api/user/delete/${id}`, {
						method: "DELETE",
						headers: {
							"Content-type": "application/json",
						}
					})
						.then((res) => res.json())
						.then((json) => setStore({ store: store.deleteUserMsg = json.msg }))
					location.reload(true)
					console.log(store.deleteUserMsg)


				} catch (error) {
					console.log("delete user function error==", error)
				}
			},
			deleteTrainer: async (id) => {
				try {
					const store = getStore()

					await fetch(process.env.BACKEND_URL + `/api/trainer/delete/${id}`, {
						method: "DELETE",
						headers: {
							"Content-type": "application/json",
						}
					})
						.then((res) => res.json())
						.then((json) => setStore({ store: store.deleteUserMsg = json.msg }))
					location.reload(true)
					console.log(store.deleteUserMsg)


				} catch (error) {
					console.log("delete user function error==", error)
				}
			},
			createNewTrainer: async (newTrainer) => {
				try {
					const store = getStore()
					setStore({ store: store.newTrainerRes = "" })
					await fetch(process.env.BACKEND_URL + "/api/signup/trainer", {
						method: "POST",
						headers: {

							"Content-type": "application/json",
						},

						body: JSON.stringify(newTrainer)
					})
						.then((res) => res.json())
						.then((json) => setStore({ store: store.newTrainerRes = json.msg }))

				} catch (error) {
					console.log("Create new trainer function error==", error)
				}

			},
			getRoutine: async () => {
				const store = getStore()
				await fetch(process.env.BACKEND_URL + "/api/get/routine", {
					headers: {
						Authorization: `Bearer ${sessionStorage.access_token}`
					}
				})
					.then((res) => {
						if (res.status == 200) { 
							return res.json()
						} else {
							setStore({ store: store.privateRes = true })
							throw Error(res.statusText)
							
						}
					})
					.then((json) => setStore({ store: store.routineData = json }))



			}

		}
	};
}

export default getState;