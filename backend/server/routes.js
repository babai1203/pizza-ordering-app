export default function(app) {
    // Insert routes below
    app.use('/api/globals', require('./api/global'));
    app.use('/api/menus', require('./api/menu'));
    app.use('/api/orders', require('./api/order'));
    app.use('/api/users', require('./api/user'));
    app.use('/api/auth', require('./auth/index').default);
}