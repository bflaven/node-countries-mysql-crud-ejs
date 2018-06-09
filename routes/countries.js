var express = require('express')
var app = express()



// SHOW LIST OF COUNTRIES
/**
    * @api {get} /country/list List all countries
    * @apiGroup Countries
    * @apiSuccess {Object[]} list of Countries
    * @apiSuccess {Number} countries.id Country id
    * @apiSuccess {String} countries.name Country name
    * @apiSuccess {String} countries.tld Country tld
    * @apiSuccess {String} countries.cca2 Country cca2
    * @apiSuccess {String} countries.capital Country capital
    * @apiSuccess {Number} countries.callingCode Country callingCode
    * @apiExample {sql} Example usage:
    *        SELECT * FROM t_countries ORDER BY id DESC
    */
app.get('/', function(req, res, next) {
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM t_countries ORDER BY id DESC',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				res.render('country/list', {
					title: 'All Countries',
					data: ''
				})
			} else {
				// render to views/country/list.ejs template file
				res.render('country/list', {
					title: 'All Countries', 
					data: rows
				})
			}
		})
	})
})

// SHOW ADD COUNTRY FORM
/**
    * @api {post} /country/add Register a new country
    * @apiGroup Countries
    * @apiParam {String} countries.name Country name
    * @apiParam {String} countries.tld Country tld
    * @apiParam {String} countries.cca2 Country cca2
    * @apiParam {String} countries.capital Country capital
    * @apiParam {Number} countries.callingCode Country callingCode
    * @apiExample {sql} Example usage:
    *        INSERT INTO t_countries SET ?
    */
app.get('/add', function(req, res, next){	
	// render to views/country/add.ejs
	res.render('country/add', {
		title: 'Add New Country',
		name:'',
		tld:'',
		cca2:'',
		capital:'',
		callingCode:''	
	})
})

// ADD NEW COUNTRY POST ACTION
app.post('/add', function(req, res, next){	
	req.assert('name', 'Name is required').notEmpty()  // Validate name
	req.assert('tld', 'tld is required').notEmpty()  // Validate tld
	req.assert('cca2', 'cca2 is required').notEmpty()  // Validate cca2
	req.assert('capital', 'capital is required').notEmpty()  // Validate capital
	req.assert('callingCode', 'callingCode is required').notEmpty() // Validate callingCode

    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		/********************************************
		 * Express-validator module
		********************************************/
		var country = {
				name: req.sanitize('name').escape().trim(),
				tld: req.sanitize('tld').escape().trim(),
				cca2: req.sanitize('cca2').escape().trim(),
				capital: req.sanitize('capital').escape().trim(),
				callingCode: req.sanitize('callingCode').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO t_countries SET ?', country, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					
					// render to views/country/add.ejs
					res.render('country/add', {
						title: 'Add New Country',
						name: country.name,
						tld: country.tld,
						cca2: country.cca2,
						capital: country.capital,
						callingCode: country.callingCode
					})
				} else {				
					req.flash('success', 'Data added successfully!')
					
					// render to views/country/add.ejs
					res.render('country/add', {
						title: 'Add New Country',
						name:'',
						tld:'',
						cca2:'',
						capital:'',
						callingCode:''
					})
				}
			})
		})
	}
	else {   //Display errors to country
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})				
		req.flash('error', error_msg)		
		
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 
        res.render('country/add', { 
            title: 'Add New Country',
			name: req.body.name,
			tld: req.body.tld,
			cca2: req.body.cca2,
			capital: req.body.capital,
			callingCode: req.body.callingCode
        })
    }
})

// SHOW EDIT COUNTRY FORM
/**
    * @api {post} /edit/(:id) Edit a country
    * @apiGroup Countries
    * @apiSuccess {Number} countries.id Country id
    * @apiParam {String} countries.name Country name
    * @apiParam {String} countries.tld Country tld
    * @apiParam {String} countries.cca2 Country cca2
    * @apiParam {String} countries.capital Country capital
    * @apiParam {Number} countries.callingCode Country callingCode
    * @apiExample {sql} Example usage:
    *        SELECT * FROM t_countries WHERE id = ' + req.params.id
    */
app.get('/edit/(:id)', function(req, res, next){
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM t_countries WHERE id = ' + req.params.id, function(err, rows, fields) {
			if(err) throw err
			
			// if country not found
			if (rows.length <= 0) {
				req.flash('error', 'Country not found with id = ' + req.params.id)
				res.redirect('/countries')
			}
			else { // if country found
				// render to views/country/edit.ejs template file
				res.render('country/edit', {
					title: 'Edit Country', 
					//data: rows[0],
					id: rows[0].id,
					name: rows[0].name,
					tld: rows[0].tld,
					cca2: rows[0].cca2,
					capital: rows[0].capital,
					callingCode: rows[0].callingCode


				})
			}			
		})
	})
})

// EDIT COUNTRY POST ACTION
app.put('/edit/(:id)', function(req, res, next) {
    req.assert('name', 'Name is required').notEmpty()  // Validate name
	req.assert('tld', 'tld is required').notEmpty()  // Validate tld
	req.assert('cca2', 'cca2 is required').notEmpty()  // Validate cca2
	req.assert('capital', 'capital is required').notEmpty()  // Validate capital
	req.assert('callingCode', 'callingCode is required').notEmpty() // Validate callingCode





    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		/********************************************
		 * Express-validator module
		********************************************/
		var country = {
				name: req.sanitize('name').escape().trim(),
				tld: req.sanitize('tld').escape().trim(),
				cca2: req.sanitize('cca2').escape().trim(),
				capital: req.sanitize('capital').escape().trim(),
				callingCode: req.sanitize('callingCode').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('UPDATE t_countries SET ? WHERE id = ' + req.params.id, country, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					
					// render to views/country/add.ejs
					res.render('country/edit', {
						title: 'Edit Country',
						id: req.params.id,
						name: req.body.name,
						tld: req.body.tld,
						cca2: req.body.cca2,
						capital: req.body.capital,
						callingCode: req.body.callingCode



					})
				} else {
					req.flash('success', 'Data updated successfully!')
					
					// render to views/country/add.ejs
					res.render('country/edit', {
						title: 'Edit Country',
						id: req.params.id,
						name: req.body.name,
						tld: req.body.tld,
						cca2: req.body.cca2,
						capital: req.body.capital,
						callingCode: req.body.callingCode
					})
				}
			})
		})
	}
	else {   //Display errors to country
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})
		req.flash('error', error_msg)
		
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 
        res.render('country/edit', { 
            title: 'Edit Country',            
			id: req.params.id, 
			name: req.body.name,
			tld: req.body.tld,
			cca2: req.body.cca2,
			capital: req.body.capital,
			callingCode: req.body.callingCode


        })
    }
})

// DELETE COUNTRY
/**
    * @api {post} /delete/(:id) Delete a country
    * @apiGroup Countries
    * @apiSuccess {Number} countries.id Country id
    * @apiParam {String} countries.name Country name
    * @apiParam {String} countries.tld Country tld
    * @apiParam {String} countries.cca2 Country cca2
    * @apiParam {String} countries.capital Country capital
    * @apiParam {Number} countries.callingCode Country callingCode
    * @apiExample {sql} Example usage:
    *       DELETE FROM t_countries t_countries WHERE id = ' + req.params.id
    */
app.delete('/delete/(:id)', function(req, res, next) {
	var country = { id: req.params.id }
	
	req.getConnection(function(error, conn) {
		conn.query('DELETE FROM t_countries WHERE id = ' + req.params.id, country, function(err, result) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				// redirect to countries list page
				res.redirect('/countries')
			} else {
				req.flash('success', 'Country deleted successfully! id = ' + req.params.id)
				// redirect to countries list page
				res.redirect('/countries')
			}
		})
	})
})

module.exports = app
