// Exporting a function that defines routes for the web application
module.exports = function (app, shopData) {

    // Route for the home page
    app.get('/', function (req, res) {
        res.render('index.ejs', shopData);
    });

    // Route for the about page
    app.get('/about', function (req, res) {
        res.render('about.ejs', shopData);
    });

    // Route for the search page
    app.get('/search', function (req, res) {
        res.render("search.ejs", shopData);
    });

    // Route for listing all books in the database
    app.get('/list', function (req, res) {
        let sqlquery = "SELECT * FROM books"; // SQL query to get all books from the database
        // Execute the SQL query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./'); // Redirect to the home page in case of an error
            } else {
                // Combine existing data with the result and render the list page
                let newData = Object.assign({}, shopData, { availableBooks: result });
                res.render("list.ejs", newData);
            }
        });
    });

    // Route for listing bargain books (books with price less than 20)
    app.get('/bargainbooks', function (req, res) {
        let sqlquery = "SELECT * FROM books WHERE price < 20"; // SQL query to get bargain books from the database
        // Execute the SQL query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./'); // Redirect to the home page in case of an error
            } else {
                // Combine existing data with the result and render the bargain books page
                let newData = Object.assign({}, shopData, { availableBooks: result });
                res.render("bargainbooks.ejs", newData);
            }
        });
    });

    // Route for the registration page
    app.get('/register', function (req, res) {
        res.render('register.ejs', shopData);
    });

    // Route for handling the registration form submission
    app.post('/registered', function (req, res) {
        // Saving data in the database (not implemented in the provided code)
        res.send(' Hello ' + req.body.first + ' ' + req.body.last + ' you are now registered!  We will send an email to you at ' + req.body.email);
    });

    // Route for adding a new book to the database
    app.get('/addbook', function (req, res) {
        res.render('addbook.ejs', shopData);
    });

    // Route for handling the new book form submission
    app.post('/bookadded', function (req, res) {
        let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)"; // SQL query to insert a new book into the database
        // Execute the SQL query
        let newrecord = [req.body.name, req.body.price];
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                return console.error(err.message);
            } else {
                res.send(' This book is added to the database, name: '
                    + req.body.name + ' price ' + req.body.price);
            }
        });
    });

    // Route for searching the database based on the entered keyword
    app.get('/search-result', function (req, res) {
        let sqlquery = "SELECT * FROM books WHERE name LIKE '%" + req.query.keyword + "%'"; // SQL query to search for books based on the keyword
        // Execute the SQL query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./'); // Redirect to the home page in case of an error
            } else {
                // Combine existing data with the result and render the list page
                let newData = Object.assign({}, shopData, { availableBooks: result });
                res.render("list.ejs", newData);
            }
        });
    });
}
