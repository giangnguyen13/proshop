import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456789', 10),
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('123456789', 10),
    },
    {
        name: 'Giang Nguyen',
        email: 'giang@example.com',
        password: bcrypt.hashSync('123456789', 10),
    },
];

export default users;
