module.exports = function(models) {


  const amagama = function(req, res, done) {
    const name = req.params.username
    console.log(name);
    res.render("waiter", {
      name: name
    })
  }
  const waiters = function(req, res, done) {
    const name = req.params.username

    models.Workers.create({
      name: name,
       weekdays: req.body.days

    }, function(err, results) {
      if (err) {
        return done(err)
      }
      models.Workers.findOne({

        name: name,
         weekdays: req.body.days
      }, function(err, results) {

         if(err){

       return (err)

         }

    if (results) {
      models.Workers.find({
        name: name,
       weekdays: req.body.days

      },function(err, results){

     if (err) {

      return done(err)

    }


        console.log(results);
        res.render("waiter", {
          Nodayz: req.body.days


        })


      })
        }
      })
    })
  }

  const Days = function(req, res, done) {
    models.Workers.find({},function(err, results){
    if(err){
      console.log(err);
    }
    var monday = [];
    var tuesday = [];
    var wenseday = [];
    var thursday = [];
    var friday = [];
    var saturday = [];
    var sunday = [];
    results.forEach(function (eachResult) {
var Name = eachResult.name;
var weekdays = eachResult.weekdays;
for (var i = 0; i < weekdays.length; i++) {
if (weekdays == "Monday") {
monday.push(Name);
console.log(monday);
}
else if (weekdays == "Tuesday") {
   tuesday.push(Name)
  console.log(tuesday);
}

else if (weekdays == "Wenseday") {

wenseday.push(Name);

console.log(wenseday);

}

else if (weekdays == "Thursday") {
thursday.push(Name)
console.log(thursday);

}
else  if (weekdays == "Friday") {
  friday.push(Name)
  console.log(friday);
}
if (weekdays == "Sunday") {
 sunday.push(Name)
 console.log(sunday);
}
else  if (weekdays == "Saturday") {

saturday.push(Name)
}

}

    })
    res.render("days", {day1:monday
      // ,day2:monday,day3:monday,day4:monday, day5:monday, day6:monday, day7:monday

    })


    })




 };
  return {
    amagama,
    waiters,
    Days
  }
}
