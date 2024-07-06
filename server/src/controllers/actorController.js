const Actor = require('../models/actorModel');
const fs = require('fs');
const MovieCast = require('../models/movieCastModel');
const Movie = require('../models/movieModel');
const { Op } = require('sequelize');

// @desc Get all actors
// @route GET /api/actor
// @access public
const getActors = async (req, res) => {
    const totalDataCount = await Actor.count(); // total data count
    const page = req.query.page || 1; // page number
    let pageSize = req.query.pageSize || 15; // item count for page
    const name = req.query.name || ""; // filter by name
    const sort = req.query.sort || "id"; // filter by name
    const type = req.query.type || "desc"; // filter by name    
    if (pageSize === "all")
        pageSize = totalDataCount;
    const movies = req.query.movies || false; // do you want the actor with her movies?
    const actors = await Actor.findAll({ // get
        order: [[sort, type]],
        offset: (page - 1) * pageSize,
        limit: pageSize,
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
    });
    if (movies) {
        await Promise.all(actors.map(async (actor) => { // actor's movies
            const actorMovies = await MovieCast.findAll({ where: { actor_id: actor.id } });
            const movieIds = actorMovies.map(movie => movie.movie_id);
            const movies = await Movie.findAll({
                attributes: ['name'],
                order: [['rating', 'DESC']],
                where: { id: movieIds },
                limit: 4
            });
            actor.setDataValue("movies", movies);
        }));
    }    
    res.status(200).json({ data: actors, totalDataCount: totalDataCount });
}

// @desc Get actor
// @route GET /api/actor/:id
// @access public
const getActor = async (req, res) => {
    const actor = await Actor.findByPk(req.params.id); // get
    if (actor === null) { // check fields
        res.status(404);
        throw new Error("Actor not found");
    }
    const actorMovies = await MovieCast.findAll({ where: { actor_id: actor.id } }); // actor's movies
    const movieIds = actorMovies.map(movie => movie.movie_id);
    const movies = await Movie.findAll({
        attributes: ['id', 'name', 'poster_path'],
        order: [['rating', 'DESC']],
        where: { id: movieIds },
        limit: 4
    });
    const movieIdToCharacterNameMap = actorMovies.reduce((acc, actorMovie) => { // movie id to characterName map
        acc[actorMovie.movie_id] = actorMovie.character_name;
        return acc;
    }, {});
    movies.map(movie => { // add characterName to each movie
        const characterName = movieIdToCharacterNameMap[movie.id];
        movie.setDataValue("characterName", characterName);
        return movie;
    });

    res.status(200).json({ data: actor, movies: movies });
}

// @desc Create new actor
// @route POST /api/actor
// @access private
const createActor = async (req, res) => {
    const { name, gender, place_of_birth, birthday, biography } = req.body;
    const img_path = (req.file) ? req.file.path : null;
    if (!name || !gender || !place_of_birth || !birthday || !biography || !img_path) { // check fields
        res.status(404);
        throw new Error("All fields are mandatory");
    }
    const nameCheck = await Actor.findOne({ where: { name: name } });
    if (nameCheck !== null) { // check other names
        res.status(400);
        throw new Error("Actor already created");
    }
    const actor = await Actor.create({  // create
        name: name, gender: gender, place_of_birth: place_of_birth,
        birthday: birthday, biography: biography, img_path: img_path
    });
    res.status(201).json({ message: `'${actor.name}' actor added` });
}

// @desc Delete actor
// @route DELETE /api/actor/:id
// @access private
const deleteActor = async (req, res) => {
    const actor = await Actor.findByPk(req.params.id); // get
    if (actor === null) { // check fields
        res.status(404);
        throw new Error("Actor not found");
    }
    fs.unlinkSync(actor.img_path);
    await actor.destroy(); // delete
    res.status(200).json({ message: "Actor deleted successfully" });
}

// @desc Update actor
// @route PUT /api/actor/:id
// @access private
const updateActor = async (req, res) => {
    const { name, gender, place_of_birth, birthday, biography } = req.body;
    if (!name || !gender || !place_of_birth || !birthday || !biography) { // check fields
        res.status(404);
        throw new Error("All fields are mandatory");
    }
    const actor = await Actor.findByPk(req.params.id); // get
    if (actor === null) { // check fields
        res.status(404);
        throw new Error("Actor not found");
    }
    let img_path;
    if (req.file) { // Is there a new file?
        fs.unlinkSync(actor.img_path)
        img_path = req.file.path
    }
    else
        img_path = actor.imageUrl;
    await actor.update({  // update
        name: name, gender: gender, place_of_birth: place_of_birth,
        birthday: birthday, biography: biography, img_path: img_path
    });
    res.status(200).json(actor);
}

module.exports = {
    getActors,
    getActor,
    createActor,
    deleteActor,
    updateActor
};