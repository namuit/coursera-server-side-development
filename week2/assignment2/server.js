var mongoose = require('mongoose'),
    assert = require('assert');

var faker = require('faker');

var Dishes = require('./models/dishes');
var Promotions = require('./models/promotions');
var Leaderships = require('./models/leaderships');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new dish
    Dishes.create({
        name: faker.commerce.productName(),
        description: faker.lorem.text(),
        image: faker.image.food(),
        category: faker.commerce.department(),
        label: faker.commerce.productMaterial(),
        price: faker.commerce.price(),
        comments: [
            {
                rating: faker.random.number({min:1, max:5}),
                comment: faker.lorem.sentence(),
                author: faker.name.findName()
            }
        ]
    }, function (err, dish) {
        if (err) throw err;
        console.log('Dish created!');
        console.log(dish);

        var id = dish._id;

        // get all the dishes
        setTimeout(function () {
            Dishes.findByIdAndUpdate(id, {
                    $set: {
                        description: faker.lorem.sentence()
                    }
                }, {
                    new: true
                })
                .exec(function (err, dish) {
                    if (err) throw err;
                    console.log('Updated Dish!');
                    console.log(dish);

                    dish.comments.push({
                        rating: faker.random.number({min:1, max:5}),
                        comment: faker.lorem.sentence(),
                        author: faker.name.findName()
                    });

                    dish.save(function (err, dish) {
                        console.log('Updated Comments!');
                        console.log(dish);

                        //db.collection('dishes').drop(function () {
                        //    db.close();
                        //});
                    });
                });
        }, 3000);
    });



    //

    // create a new promotion
    Promotions.create({
        name: faker.commerce.productName(),
        description: faker.lorem.text(),
        image: faker.image.food(),
        label: faker.commerce.productMaterial(),
        price: faker.commerce.price(),
    }, function (err, promotion) {
        if (err) throw err;
        console.log('Promotion created!');
        console.log(promotion);

        var id = promotion._id;

        // get all the promotions
        setTimeout(function () {
            Promotions.findByIdAndUpdate(id, {
                    $set: {
                        description: faker.lorem.sentence()
                    }
                }, {
                    new: true
                })
                .exec(function (err, promotion) {
                    if (err) throw err;
                    console.log('Updated Promotion!');
                    console.log(promotion);

                    //setTimeout(function () {
                    //    db.collection('promotions').drop()
                    //}, 3000)
                });
        }, 3000);
    });

    Leaderships.create({
        name: faker.name.findName(),
        description: faker.lorem.text(),
        image: faker.image.avatar(),
        designation: faker.name.jobTitle(),
        abbr: faker.hacker.abbreviation()
    }, function (err, leadership) {
        if (err) throw err;
        console.log('Leaderships created!');
        console.log(leadership);

        var id = leadership._id;

        // get all the promotions
        setTimeout(function () {
            Promotions.findByIdAndUpdate(id, {
                    $set: {
                        description: faker.lorem.sentence()
                    }
                }, {
                    new: true
                })
                .exec(function (err, leadership) {
                    if (err) throw err;
                    console.log('Updated leadership!');
                    console.log(leadership);

                    //setTimeout(function () {
                    //    db.collection('leadership').drop()
                    //}, 3000)
                });
        }, 3000);
    });

    setTimeout(function () {
        db.collection('dishes').drop(function () {
            db.collection('promotions').drop(function () {
                db.collection('promotions').drop(function () {
                    db.close();
                });
            });
        });
    }, 3000)



});
