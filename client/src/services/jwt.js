const Jwt = {
	getAdmin: () => {
		try {
			return JSON.parse(localStorage.getItem('admin'));
		}
		catch (ex) {
			console.log("getCurrentAdmin ", ex)
			return null
		}
	},
	setAdmin: (data) => {
		let old = Jwt.getAdmin();
		if(data.password) delete data.password;
		let admin = data;
		if(old){
			admin = {...data, "accessToken": old.accessToken}
		}
		localStorage.setItem("admin", JSON.stringify(admin));
	},
	getUser: () => {
		try {
			return JSON.parse(localStorage.getItem('user'));
		}
		catch (ex) {
			console.log("getUser ", ex)
			return null
		}
	},
	setUser: (data) => {
		let old_user = Jwt.getUser();
		if(data.password) delete data.password;
		let user = data;
		if(old_user){
			user = {...data, "accessToken": old_user.accessToken}
		}
		localStorage.setItem("user", JSON.stringify(user));
	},
	logout: () => {
		localStorage.removeItem("user");
	}
}


export default Jwt;
