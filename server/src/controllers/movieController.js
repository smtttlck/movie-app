const Movie = require('../models/movieModel');
const MovieCategory = require('../models/movieCategoryModel');
const fs = require('fs');
const MovieCast = require('../models/movieCastModel');
const Category = require('../models/categoryModel');
const Actor = require('../models/ActorModel');
const { Op } = require('sequelize');

// @desc Get all movies
// @route GET /api/movie
// @access public
const getMovies = async (req, res) => {    
    const page = req.query.page || 1; // page number
    const pageSize = req.query.pageSize || 15; // item count for page
    const name = req.query.name || ""; // filter by name
    const sort = req.query.sort || "id"; // filter by name
    const type = req.query.type || "desc"; // filter by name
    const movies = await Movie.findAll({ // get
        order: [["id", "DESC"]],
        offset: (page - 1) * pageSize,
        limit: pageSize,
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        },
        order: [
            [sort, type]
        ]
    });
    await Promise.all(movies.map(async (movie) => {
        const movieCategories = await MovieCategory.findAll({ where: { movie_id: movie.id } }); // movie's categories
        const categoryIds = movieCategories.map(data => data.category_id);
        const categories = await Category.findAll({ where: { id: categoryIds } });
        movie.setDataValue("categories", categories);
        const movieActors = await MovieCast.findAll({ where: { movie_id: movie.id } }); // movie's actors
        const actorIds = movieActors.map(data => data.actor_id);
        const actors = await Actor.findAll({ attributes: ['id', 'name'], where: { id: actorIds } });
        movie.setDataValue("actors", actors);
    }))
    const totalDataCount = await Movie.count(); // total data count
    res.status(200).json({ data: movies, totalDataCount: totalDataCount });
}

// @desc Get movie
// @route GET /api/movie/:id
// @access public
const getMovie = async (req, res) => {
    const movie = await Movie.findByPk(req.params.id); // get
    if (movie === null) { // check fields
        res.status(404);
        throw new Error("Movie not found");
    }
    const movieCategories = await MovieCategory.findAll({ where: { movie_id: movie.id } }); // movie's categories
    const categoryIds = movieCategories.map(data => data.category_id);
    const categories = await Category.findAll({ where: { id: categoryIds } });
    movie.setDataValue("categories", categories);
    const movieActors = await MovieCast.findAll({ where: { movie_id: movie.id } }); // movie's actors
    const actorIds = movieActors.map(data => data.actor_id);
    const actors = await Actor.findAll({ attributes: ['id', 'name', 'img_path'], where: { id: actorIds } });
    const actorIdToCharacterNameMap = movieActors.reduce((acc, movieActor) => { // actor id to characterName map
        acc[movieActor.actor_id] = movieActor.character_name;
        return acc;
    }, {});
    actors.map(actor => { // add characterName to each actor
        const characterName = actorIdToCharacterNameMap[actor.id];
        actor.setDataValue("characterName", characterName);
        return actor;
    });
    movie.setDataValue("actors", actors);
    res.status(200).json(movie);
}

// @desc Create new movie
// @route POST /api/movie
// @access private
const createMovie = async (req, res) => {
    const { name, release_date, rating, trailer_url, overview, categories, actors } = req.body;
    const poster_path = (req.file) ? req.file.path : null;
    if (!name || !release_date || !rating || !trailer_url || !overview || !poster_path || !categories || !actors) { // check fields
        res.status(404);
        throw new Error("All fields are mandatory");
    }
    const nameCheck = await Movie.findOne({ where: { name: name } });
    if (nameCheck !== null) { // check other names
        if (poster_path)
            fs.unlinkSync(poster_path);
        res.status(400);
        throw new Error("Movie already created");
    }
    const movie = await Movie.create({  // create
        name: name, release_date: release_date, rating: rating,
        trailer_url: trailer_url, overview: overview, poster_path: poster_path
    });
    await Promise.all(categories.map(async (categoryId) => { // create categories for the movie
        await MovieCategory.create({ movie_id: movie.id, category_id: categoryId });
    }));
    await Promise.all(actors.map(async (actorObj) => { // create actors for the movie
        actor = JSON.parse(actorObj);
        if(actor.characterName)
            await MovieCast.create({
                movie_id: movie.id,
                actor_id: actor.actorId,
                character_name: actor.characterName
            });
    }));
    res.status(201).json({ message: `'${movie.name}' movie added` });
}

// @desc Delete movie
// @route DELETE /api/movie/:id
// @access private
const deleteMovie = async (req, res) => {
    const movie = await Movie.findByPk(req.params.id); // get
    if (movie === null) { // check fields
        res.status(404);
        throw new Error("Movie not found");
    }
    await MovieCategory.destroy({ where: { movie_id: movie.id } }); // delete movie's categories
    await MovieCast.destroy({ where: { movie_id: movie.id } }); // delete movie's actors
    fs.unlinkSync(movie.poster_path); // delete movie's image
    await movie.destroy(); // delete
    res.status(200).json({ message: "Movie deleted successfully" });
}

// @desc Update movie
// @route PUT /api/movie/:id
// @access private
const updateMovie = async (req, res) => {
    const { name, release_date, rating, trailer_url, overview, categories, actors } = req.body;
    if (!name || !release_date || !rating || !trailer_url || !overview || !categories || !actors) { // check fields
        res.status(404);
        throw new Error("All fields are mandatory");
    }
    const movie = await Movie.findByPk(req.params.id); // get
    if (movie === null) { // check fields
        res.status(404);
        throw new Error("Movie not found");
    }
    await MovieCategory.destroy({ where: { movie_id: req.params.id } }); // delete movie's categories
    await Promise.all(categories.map(async (categoryId) => { // create categories for the movie
        await MovieCategory.create({ movie_id: movie.id, category_id: categoryId });
    }));
    await MovieCast.destroy({ where: { movie_id: movie.id } }); // delete movie's actors
    await Promise.all(actors.map(async (actorObj) => { // create actors for the movie
        actor = JSON.parse(actorObj); // REACT İÇİN BUNA GEREK VAR MI BAK!!!!!!!!!!!
        await MovieCast.create({
            movie_id: movie.id,
            actor_id: actor.actorId,
            character_name: actor.characterName
        });
    }));
    let poster_path;
    if (req.file) { // Is there a new file?
        fs.unlinkSync(movie.poster_path)
        poster_path = req.file.path
    }
    else
        poster_path = movie.imageUrl;
    await movie.update({  // update
        name: name, release_date: release_date, rating: rating,
        trailer_url: trailer_url, overview: overview, poster_path: poster_path
    });
    res.status(200).json(movie);
}

module.exports = {
    getMovies,
    getMovie,
    createMovie,
    deleteMovie,
    updateMovie
};