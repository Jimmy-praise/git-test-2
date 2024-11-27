import express from 'express';
import cookieParser from 'cookie-parser';
import { body, validationResult } from "express-validator";

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
app.use(cookieParser());
app.get('/set-cookie', (req, res) => {
    res.cookie('theme', 'dark', { maxAge: (10 * 60 * 1000), httpOnly: true }); // 10mins * 60secs * 1000ms
    res.cookie('color', 'white', { maxAge: 9000000, httpOnly: true });
    res.send('2 cookies has been set');
});

app.get('/get-cookie', (req, res) => {
    const allCookies = req.cookies;
    res.send(`Theme = ${req.cookies.theme} \n Color = ${req.cookies.color}`);
});

app.get('/clear-cookie', (req, res) => {
    res.clearCookie('theme');
    res.clearCookie('color');
    res.send('2 cookies cleared')
})

// Validation
// app.use(express.json());

// app.post('/submit', [
//     body('email').isEmail().withMessage('Must be a valid email'),
//     body('username').isLength({min: 5}).withMessage('Username must be letters and numbers between 5 - 15 characters')
// ], (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({errors: errors.array()})
//     } 

//     res.send('Data is valid');
// })

// // Validation Example 2
// app.use(express.json());

// app.post('/signup', [
//     body('email').isEmail().withMessage('Please, provide a valid email address'),
//     body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters long.')
// ], (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({errors: errors.array()})
//     }

//     const {email, password} = req.body;
//     res.send(`Your email ${email} has been successfully signed up`);
// })

// Validation Example 3
app.use(express.json());

let validator = [
    body('username')
        .notEmpty().withMessage('username cannot be empty')
        .isLength({ max: 15 }).withMessage('Username must not be more than 15 characters')
        .custom(value => {
            if (!value.startsWith('JP')) {
                throw new Error('Username must start with JP')
            }
            return true
        }),
    body('email')
        .isEmail().withMessage('Invalid Email Format')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/\d/).withMessage('Password must contain a number'),
    body('age').custom(value => {
        if (value < 18) {
            throw new Error('Age must be at least 18')
        }
        return true
        })          
]
app.post('/signup', validator, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, age, password } = req.body
    res.send(`Dear ${username}, \nYou're ${age} years old. \nYour Signup for ${email} is successful! \nYou can now Proceed to login.`)
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});