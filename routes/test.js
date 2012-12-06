exports.plates = function(req, res) {
		res.render('plates', {
				data: {
						content: 'Hello from Plates via Express!'
				}
		});
}