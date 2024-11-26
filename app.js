import express from 'express';
// import cookieParser from 'cookie-parser';

const app = express();

app.get('/', (req, res) => {
    res.send('In the beginning, GOD...');
});

// Getting headers using headers
app.get('/get-header', (req, res) => {
    console.log(req.headers);
    console.log(req.get('user-agent'))
    console.log(req.header('authorization'))

    res.send(`I have seen the headers`);
})

// Handling Params
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    
    // console.log(typeof(userId));

    // if (typeof(userId) != 'number') {
    //     res.send(`UserId is not a number`);
    // } else {
    // res.send(`User ID is ${userId}`);
    // };
 
    res.send(`User ID is ${userId}`);
});

// Cookies
// app.use(cookieParser());
// app.get('/set-cookie', (req, res) => {
//     res.cookie('theme', 'dark', {maxAge: 15 * 60, httpOnly: true});
//     res.cookie('color', 'white', {maxAge: 15 * 60, httpOnly: true});
//     res.send('2 cookies has been set');
// });

// app.get('/get-cookie', (req, res) => {
//     const allCookies = req.cookies;
//     res.send(`${allCookies}`);
// })

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
