var user = require('../user.js');
var skillz = require('../models/skillz');
var secrets = require('../models/secrets')

module.exports = {
  showName: function (req, res) {
    return res.status(200).json(user.name);
  },

  showLocation: function (req, res) {
    return res.status(200).json(user.location);
  },

  showOccupations: function (req, res) {
    if (req.query.sortBy === 'desc') {
      return res.status(200).json(user.occupations.sort());
    } else if (req.query.sortBy === 'asc') {
      return res.status(200).json(user.occupations.sort().reverse());
    }
    return res.status(200).json(user.occupations);
  },

  showOccupationsLatest: function (req, res) {
    var newArr = user.occupations.slice(-1);
    return res.status(200).json(newArr);
  },

  showHobbies: function (req, res) {
    return res.status(200).json(user.hobbies);
  },

  showHobbiesType: function (req, res) {
    var hobbyTypes = user.hobbies.filter( function(hobby) {
      if (hobby.type === req.params.type) {
        return true
      } else {
        return false
      }
    });
    return res.status(200).json(hobbyTypes);
  },

  showFamilyRelation: function (req, res) {
    if(!req.query.relation) {
      return res.status(200).json(user.family);
    }
    var familyRelation = user.family.filter( function (family) {
      if(family.relation === req.query.relation) {
        return true
      } else {
        return false
      }
    });
    return res.status(200).json(familyRelation);
  },

  showFamilyGender: function (req, res) {
    if (req.params.gender !== "male" || req.params.gender !== "female") {
      return res.status(500).json({message: "Invalid parameter; must be male or female"})
    }
    var familyGender = user.family.filter(family => family.gender === req.params.gender)
    return res.status(200).json(familyGender);

  },

  showRestaurantsRating: function (req, res) {
    if (req.query.rating) {
    var restaurantRating = user.restaurants.filter((restaurants) => restaurants.rating >= parseInt(req.query.rating));
    return res.status(200).json(restaurantRating);
  } else {
    return res.status(200).json(user.restaurants)
    }
  },

  showRestaurants: function (req, res) {
    return res.status(200).json(user.restaurants.name);
  },

  updateName: function (req, res) {
    user.name = req.params.name
    res.status(201).json(user);
  },

  updateLocation: function (req, res) {
    user.location = req.params.location
    res.status(201).json(user);
  },

  createHobbies: function (req, res) {
    user.hobbies.push(req.body)
    res.status(201).json(user);
  },

  createOccupations: function (req, res) {
    user.occupations.push(req.body)
    res.status(201).json(user);
  },

  createFamily: function (req, res) {
    user.family.push(req.body)
    res.status(201).json(user);
  },

  createRestaurants: function (req, res) {
    user.restaurants.push(req.body)
    res.status(201).json(user);
  },

  showSkillz: function (req, res) {
    if (req.query.experience) {
      var filteredSkillz = skillz.filter(skill => skill.experience === req.query.experience);
      return res.status(200).json(filteredSkillz)
    }
    return res.status(200).json(skillz);
  },

  postSkillz: function (req, res) {
    skillz.push(req.body)
    return res.status(200).json(skillz);
  },

  storedSecrets: function (req, res) {
    return res.status(200).json(secrets)
  }

};
