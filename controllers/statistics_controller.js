var models = require('../models/models.js');

var statistics = {
    numPreguntas:0,
    comentariosTotales:0,
    comentariosPregunta:0,
    preguntaSinComentario:0,
    preguntaConComentario:0
    
};

// Load
exports.load = function(req, res, next) {
    
    models.Quiz.count()
        .then(function(numPreg) {
            statistics.numPreguntas = numPreg;
            return models.Comment.count();
        })
    .then(function(numComentarios){
        	statistics.comentariosTotales = numComentarios;
        	return models.Comment.countPreguntasComentadas();
        })
         .then(function(pregComentadas) {
            statistics.preguntaConComentario = pregComentadas
            })
        .then(function() {
            statistics.preguntaSinComentario = statistics.numPreguntas - statistics.preguntaConComentario;
            //statistics.averageComments = statistics.countPublished / statistics.numQuiz;
        })
        .catch(function(error) {next(error)})
        .finally(function(){next()});
};


// GET /quizes/statistics
exports.show = function(req, res) {
  res.render('quizes/statistics', { statistics: statistics, errors: []});
}; 
