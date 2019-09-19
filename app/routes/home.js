module.exports = function(app)
{
  app.get('/', function(req,res)
  {
    res.render('home/index');
  });


  app.get('/cursos', function(req,res)
  {
     res.render('cursos/cursos');
  });





}
