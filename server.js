const http = require('http');
// fs means file system so this whole section requires you to have these things to follow the path
const fs = require('fs');
const path = require('path');

//initialize the server on localhost
const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading page');
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
        // each of these is a different pathway that we can access
    } else if (req.url === '/login') {
        fs.readFile(path.join(__dirname, 'login.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading login page');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/profile') {
        fs.readFile(path.join(__dirname, 'profile.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading login page');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    } else if (req.url.startsWith('/game/')) {
        fs.readFile(path.join(__dirname, req.url), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading login page');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/styles.css') {
        fs.readFile(path.join(__dirname, 'styles.css'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading CSS');
            } else {
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.end(data);
            }
        });
    } else if (req.url === '/script.js') {
        fs.readFile(path.join(__dirname, 'script.js'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading JavaScript');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.end(data);
            }
        });
    } else if (req.url === '/create-account') {
        fs.readFile(path.join(__dirname, 'create-account.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading create account page');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    } else if (req.url === '/options') {
        fs.readFile(path.join(__dirname, 'options.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading options page');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/forgot-password') {
        fs.readFile(path.join(__dirname, 'forgot-password.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading options page');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    } else if (req.url === '/save-account' && req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const userData = JSON.parse(body);
            const { username, password } = userData;

            // go to the json file with the saved user info
            const filePath = path.join(__dirname, 'users.json');

            // essentially goes through the json file and check if the user is there if not add the user to the list
            fs.readFile(filePath, (err, data) => {
                let users = [];

                if (!err && data.length > 0) {
                    users = JSON.parse(data);
                }

                users.push({ username, password });

                fs.writeFile(filePath, JSON.stringify(users, null, 2), err => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ success: false, error: "Could not save user data" }));
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ success: true }));
                    }
                });
            });
        });
        // goes through and checks to see if the user is actually inside the json file
    } else if (req.url === '/validate-login' && req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const {username, password} = JSON.parse(body);

            const filePath = path.join(__dirname, 'users.json');

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({success: false, error: "Error reading user data"}));
                    return;
                }

                const users = JSON.parse(data);
                const user = users.find(u => u.username === username && u.password === password);

                if (user) {
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({success: true}));
                } else {
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({success: false}));
                }
            });
        });
    } else if (req.url.startsWith('/media/')) {
        const filePath = path.join(__dirname, req.url);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('File not found');
            } else {
                // Determine the file's content type
                const ext = path.extname(filePath);
                let contentType = 'application/octet-stream';
                if (ext === '.png') contentType = 'image/png';
                else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
                else if (ext === '.gif') contentType = 'image/gif';
                else if (ext === '.webp') contentType = 'image/webp';

                res.writeHead(200, {'Content-Type': contentType});
                res.end(data);
            }
        });
    } else if (req.url === '/profile-pictures' && req.method === 'GET') {
        const imageDir = path.join(__dirname, 'media/profile-pictures');
        fs.readdir(imageDir, (err, files) => {
            if (err) {
                res.writeHead(500);
                res.end('Error reading directory');
                return;
            }
            const images = files.filter(file => file.endsWith('.png') || file.endsWith('.jpg'));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(images));
        });
    } else if (req.url === '/save-profile-picture' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => (body += chunk));
        req.on('end', () => {
            const { image } = JSON.parse(body);
            fs.writeFileSync('chosen-profile-picture.txt', image, 'utf8');
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Profile picture saved');
        });
    } else if (req.url === '/profile' && req.method === 'GET') {
        const chosenPicture = fs.existsSync('chosen-profile-picture.txt')
            ? fs.readFileSync('chosen-profile-picture.txt', 'utf8')
            : 'tobias-funke.png';

        fs.readFile(path.join(__dirname, 'profile.html'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading page');
            } else {
                const updatedHtml = data.replace(
                    '/media/profile-pictures/tobias-funke.png',
                    `/media/profile-pictures/${chosenPicture}`
                );
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(updatedHtml);
            }
        });
    // TODO: Write one for '/update-password' (see the updatePassword() function)
} else {
        res.writeHead(404);
        res.end('Page not found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
