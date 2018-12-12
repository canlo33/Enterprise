var SERVER_NAME = 'Can-Venkatesh api'
var PORT = process.env.PORT;



var restify = require('restify')

  , patientsSave = require('save')('patients')

  , recordsSave = require('save')('records')

  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, function () {
  console.log('Server %s started at %s', server.name, server.url)
  console.log('Resources: /patients')

})

server
  .use(restify.fullResponse())

  .use(restify.bodyParser())

server.get('/patients', function (req, res, next) {

  patientsSave.find({}, function (error, patients) {

    res.send(patients)

  })
})

server.get('/patients/:id/records', function (req, res, next) {

  recordsSave.find({}, function (error, records) {

    res.send(records)

  })
})

server.post('/patients', function (req, res, next) {

  if (req.params.first_name === undefined ) {

    return next(new restify.InvalidArgumentError('Firstname must be supplied'))
  }

  if (req.params.lastname === undefined ) {

    return next(new restify.InvalidArgumentError('lastname must be supplied'))
  }

    if (req.params.date_of_birth === undefined ) {
    return next(new restify.InvalidArgumentError('Date of Birth must be supplied'))
  }
      if (req.params.address === undefined ) {
    return next(new restify.InvalidArgumentError('address must be supplied'))
  }
      if (req.params.department === undefined ) {
    return next(new restify.InvalidArgumentError('department must be supplied'))
  }
      if (req.params.condition === undefined ) {
    return next(new restify.InvalidArgumentError('Condition must be supplied'))
  }
      if (req.params.doctor === undefined ) {
    return next(new restify.InvalidArgumentError('Doctor must be supplied'))
  }
  
  var newpatient = {
		first_name: req.params.first_name, 
		lastname: req.params.lastname,
		date_of_birth: req.params.date_of_birth,
		address: req.params.address,
		department: req.params.department,
		condition: req.params.condition,
		doctor: req.params.doctor,
	}
  patientsSave.create( newpatient, function (error, patient) {

    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    res.send(201, patient)

  })
    })

server.post('/patients/:id/records', function (req, res, next) {
	
	var newrecord = {
		heartbeat: req.params.heartbeat, 
		bloodpressure: req.params.bloodpressure,
		urinetest: req.params.urinetest,
		alergies: req.params.alergies,
		medicines: req.params.medicines,
		date: req.params.date,
	}

  recordsSave.create( newrecord, function (error, record) {

    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    res.send(201, record)

  })
    })

server.put('/patients/:id', function (req, res, next) {


  if (req.params.first_name === undefined ) {

    return next(new restify.InvalidArgumentError('Firstname must be supplied'))
  }

  if (req.params.lastname === undefined ) {

    return next(new restify.InvalidArgumentError('lastname must be supplied'))
  }

    if (req.params.date_of_birth === undefined ) {

    return next(new restify.InvalidArgumentError('Date of Birth must be supplied'))
  }

      if (req.params.address === undefined ) {

    return next(new restify.InvalidArgumentError('address must be supplied'))
  }

      if (req.params.department === undefined ) {

    return next(new restify.InvalidArgumentError('department must be supplied'))
  }

      if (req.params.condition === undefined ) {

    return next(new restify.InvalidArgumentError('Condition must be supplied'))
  }

      if (req.params.doctor === undefined ) {

    return next(new restify.InvalidArgumentError('Doctor must be supplied'))
  }
  
  var newpatient = {
		_id: req.params.id,
		first_name: req.params.first_name, 
		lastname: req.params.lastname,
		date_of_birth: req.params.date_of_birth,
		address: req.params.address,
		department: req.params.department,
		condition: req.params.condition,
		doctor: req.params.doctor,

	}

  patientsSave.update(newpatient, function (error, patient) {

    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    res.send(200)
  })
})

server.put('/patients/:id/records/:id', function (req, res, next) {
	
		var newrecord = {
		_id: req.params.id,	
		heartbeat: req.params.heartbeat, 
		bloodpressure: req.params.bloodpressure,
		urinetest: req.params.urinetest,
		alergies: req.params.alergies,
		medicines: req.params.medicines,
		date: req.params.date,
	}

  recordsSave.update(newrecord, function (error, record) {

    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    res.send(200)
  })
})	
  

server.get('/patients/:id', function (req, res, next) {

  patientsSave.findOne({ _id: req.params.id }, function (error, patient) {


    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    if (patient) {

      res.send(patient)
	
    } else {


      res.send(404)

    }

  })
})


server.get('/patients/:id/records/:id', function (req, res, next) {


  recordsSave.findOne({ _id: req.params.id }, function (error, record) {


    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    if (record) {

      res.send(record)
	
    } else {

      res.send(404)

    }

  })
})

server.del('/patients/:id', function (req, res, next) {

  patientsSave.delete(req.params.id, function (error, patient) {

    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
		
    res.send()
  })
})

server.del('/patients/:id/records/:id', function (req, res, next) {

  recordsSave.delete(req.params.id, function (error, record) {

    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    res.send()
  })
})
  








