# Fitness Tracker

## Project Summary

This is a full stack web application that empowers a user to better track their workouts. The user can create workouts and add exercises to the workouts, track their stats, and compare data.

[DeployedSite](https://nameless-ocean-06405.herokuapp.com/)

![IMAGE](https://github.com/slimbeek6/fitness-tracker-sl/tree/main/public/Landing-Page.png)
<br>

## Table of Contents

* [Technologies Used](#technologies-used)
* [Process](#process)
* [Authors](#authors)
* [License](#license)
* [Acknowledgements](#acknowledgements)

## Technologies Used

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Bootstrap](https://getbootstrap.com/)
- [JavaScript](https://www.javascript.com/)
- [jQuery](https://jquery.com/)
- [JSON](https://www.json.org/json-en.html)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [Chart.js](https://www.chartjs.org/)
- [Mongoose](https://www.npmjs.com/package/mongoose)


## Process

To create the necessary routes to deliver the application, first we needed to provide a series of html routes to the disparate pages in the application.  To do this, we placed the three HTML routes in the server, utilizing path to access the page, and the Send File function to render the html pages:

```
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/stats.html"));
});
```

Next we needed to provide routes that would be able to access the database that we established with our server. This will allow us to write, edit, and read the different workouts and exercise data.

```
router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .sort({ day: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", ({}, res) => {
  Workout.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});
```

Finally we needed a way to get a range of data, and provide some aggregate data to populate our charts. To do this, we used the aggregator function in mongoose as well as the $addFields functionality.

```
router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
        { 
        $addFields: {
            totalDuration: {$sum: "$exercises.duration"},
            totalWeight: { $sum: "$exercises.weight"},
            }
        }
    ])
    .sort({ day: -1 })
    .limit(7)
    .then(dbWorkout => {
        console.log(dbWorkout);
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});
```

<hr>

## Authors
- Shaun Limbeek
    - [GitHub](https://github.com/slimbeek6)
    - [LinkedIn](https://www.linkedin.com/in/shaun-limbeek/)

## License

This Project is licensed under the MIT License.<br>
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## Acknowledgements
A special thanks to our instructors Jerome, Mahi, Manuel, and Kerwin for all of your help and support. You guys are the best!
- [UC Berkeley](https://bootcamp.berkeley.edu/coding/)