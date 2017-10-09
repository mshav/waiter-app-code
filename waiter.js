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
    models.Workers.findOne({
      name: req.params.username
    }, function(err, results) {
      if (err) {
        return done(err)
      }
      if(results){
        results.weekdays = req.body.days;

        results.save(function (err) {
          if (err) {
            return done(err)
          }
        })

        res.render("waiter", {
          Nodayz: results.weekdays
        })

      }

      if (!results) {
        models.Workers.create({
          name: name,
          weekdays: req.body.days

        }, function(err, results) {
          if (err) {
            return done(err)
          }
          res.render("waiter", {
            Nodayz: req.body.days
          })
        })
      }

    })

  }


  const Days = function(req, res, done) {
    models.Workers.find({}, function(err, results) {
      if (err) {
        console.log(err);
      }
      var monday = [];
      var tuesday = [];
      var wednesday = [];
      var thursday = [];
      var friday = [];
      var saturday = [];
      var sunday = [];
      results.forEach(function(eachResult) {
        var Name = eachResult.name;
        var weekdays = eachResult.weekdays;
        for (var i = 0; i < weekdays.length; i++) {
          // console.log(i+')', weekdays[i]);


          if (weekdays[i] == "Monday") {
            monday.push(Name);

          }
            if (weekdays[i] == "Tuesday") {
             tuesday.push(Name)
           console.log(tuesday);
          }
           if (weekdays[i] == "Wednesday") {

             wednesday.push(Name);
              console.log(wednesday);

          }
           if (weekdays[i] == "Thursday") {
             thursday.push(Name)
             console.log(thursday);

           }
          if (weekdays[i] == "Friday") {
             friday.push(Name)
          console.log(friday);
           }
           if (weekdays[i] == "Sunday") {
             sunday.push(Name)
           console.log(sunday);
         } if (weekdays[i] == "Sutarday") {

             saturday.push(Name)
           }




        }

      })

     const Coloredited = function(color){
    if(color === 3){
     return 'colorRed';
    }

    if (color < 3){
      return "colorBlue";
    }

    if(color > 3){
return 'colorOrange';
}


      }
      //console.log(saturday);
      res.render("days", {
        day1: monday, colorM:Coloredited(monday.length), day2: tuesday,colorT:Coloredited(tuesday.length),
        day3: wednesday,colorW:Coloredited(wednesday.length)
        ,day4: thursday,colorTH:Coloredited(thursday.length),day5: friday,colorF:Coloredited(friday.length),
        day6: saturday,colorS:Coloredited(saturday.length),day7: sunday,colorSU:Coloredited(sunday.length)
      })



})
// console.log(Name);
}
const clear = function(req,res, next){
  name:req.body.params
models.Workers.remove({}, function(err){

if (err) {

return next(err)

}

res.render("days")

})


}

  return {
    amagama,
    waiters,
    Days,
    clear
  }
}
