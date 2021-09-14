// Activity:
// 1. Create an a1 folder inside s27 folder
// 2. In a1 folder, create an index.js for your server
// 3. Create a mock database with the data:
// {
// "firstName": "Mary Jane",
// "lastName": "Dela Cruz",
// "mobileNo": "09123456789",
// "email": "mjdelacruz@mail.com",
// "password": 123
// },
// {
// "firstName": "John",
// "lastName" "Doe",
// "mobileNo": "09123456789",
// "email": "jdoe@mail.com",
// "password": 123
// }
// 4. Create a route "/profile" and request all the information in the data
// 5. Create a route for creating a new item upon receiving a POST request. "/register"
// 6. Create a git repository named S27.
// 7. Initialize a local git repository, add the remote link and push to git with the commit message of s27 Activity.
// 8. Copy and paste the link to boodle named:27 Node.js Routing w/ HTTP Methods

const http = require('http')

let information = [
	{
		'firstName': 'Mary Jane',
		'lastName': 'Dela Cruz',
		'mobileNo': '09123456789',
		'email': 'mjdelacruz@mail.com',
		'password': 123
	},
	{
		'firstName': 'John',
		'lastName': 'Doe',
		'mobileNo': '09123456789',
		'email': 'jdoe@mail.com',
		'password': 123
	}
]


http.createServer(function(req,res){

	if(req.url == '/profile' && req.method == 'GET'){
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(JSON.stringify(information));
		res.end()
	}

	if(req.url == '/register' && req.method == 'POST'){
		let requestBody = '';
		req.on('data', function(data){
			requestBody += data
		});

		req.on('end', function(){
			console.log(typeof requestBody);

			requestBody = JSON.parse(requestBody);

			let newUser = {
				"firstName": requestBody.firstName,
				"lastName": requestBody.lastName,
				"mobileNo": requestBody.mobileNo,
				"email": requestBody.email,
				"password": requestBody.password
			}

			information.push(newUser)
			console.log(information)

			res.writeHead(200, {'Content-Type': 'application/json'});
			res.write(JSON.stringify(newUser));
			res.end()
		})
	}

}).listen(4000);

console.log('server running at localhost:4000')