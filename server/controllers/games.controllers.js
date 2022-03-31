const { Game } = require('../models/games.model')

module.exports = {

    createNewGame: (req, res) => {
        const name = req.body.name;
        const image = req.file.filename;
        const rating = req.body.rating;
        const description = req.body.description;
        


        const newGameData = {
            name,
            image,
            rating,
            description,
        }

        const newGame = new Game(newGameData)
        
        newGame.save()
            .then(() => res.json('Added'))
            .catch(err => {
                console.log("DB ERROR");
                res.status(400).json(err)
            });
    },

    updateGame:(req,res) =>{
        const id = req.params.id;
        const name = req.body.name;
        const rating = req.body.rating;
        const description = req.body.description;

        const newUpdatedData = {
            name,
            rating,
            description,
        }

        if (req.file) {
            const image = req.file.filename;
            newUpdatedData.image = image;
        }

        const updatedGame = newUpdatedData

        Game.findOneAndUpdate(id, updatedGame,
                    {
                        new: true,
                        runValidators: true
                    })
                    .then(updated => res.json(updated))
                    .catch(err => {
                        res.status(400).json(err)})

    },


    //find all 
    findAll: (request, response) => {
        Game.find()
            .then(game => { response.json(game) })
            .catch(err => response.json(err));
    },

    //find one 
    findOne: (request, response) => {
        Game.findOne({ _id: request.params.id })
            .then(oneGame => response.json(oneGame))
            .catch(err => response.json(err))
    },



    // update: (request, response) => {
    //     Game.findByIdAndUpdate({ _id: request.params.id }, request.body,
    //         {
    //             new: true,
    //             runValidators: true
    //         })
    //         .then(updatedGame => response.json(updatedGame))
    //         .catch(err => response.status(400).json(err))
    // },

    //delete 
    delete: (req, res) => {
        Game.findByIdAndDelete(req.params.id)
            .then(result => res.json(result))
            .catch(err => res.status(400).json(err))
    }
}