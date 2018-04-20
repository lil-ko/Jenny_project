var userResult = [];




//Adding Result to csv file
function addToResultsFile(){
	userResult = userResult.concat("\r\n");
	console.log("Im in addToResultsFile. userResult is " + userResult);
	
	require([fsModule], function (require){
	
	fs.stat('Results.csv', function (err, stat) {
		if (err == null) {
			console.log('File exists');

			//write the actual data and end with newline
			fs.appendFile('Results.csv', userResult, function (err) {
				if (err) throw err;
				console.log('The "data to append" was appended to file!');
			});
		}
		else {
			//write the headers and newline
			console.log('New file, just writing headers');
			fields= "1,2,3,4\r\n";

			fs.writeFile('Results.csv', fields, function (err, stat) {
				if (err) throw err;
				console.log('file saved');
			});
		}
	});
	
	});
}












/*

var fs = require('fs');

//create a file named mynewfile1.txt:
fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});


*/