var mfp = require('mfp');
var fs = require('fs');
var writemeasurestream=fs.createWriteStream("myfitnessusersoutput.csv");
writemeasurestream.write("User");
writemeasurestream.write(", Status");
writemeasurestream.write(", Date");
writemeasurestream.write(", Calories");
writemeasurestream.write(", Carbs");
writemeasurestream.write(", Fat");
writemeasurestream.write(", Protein");
writemeasurestream.write(", Cholesterol");
writemeasurestream.write(", Sodium");
writemeasurestream.write(", Sugar");
writemeasurestream.write(", Fiber");
var date=new Date();
var day=date.getDate();
day = (day < 10 ? "0" : "") + day;
var month=date.getMonth() + 1;
month = (month < 10 ? "0" : "") + month;
var year=date.getFullYear();
var linereader=require('line-reader');
	var lineNum = 0;
	var columns = [];
	var user = [];
	function checkUser(user){
			mfp.diaryStatusCheck(''+user, function(status) {
					if(status=="public"){
							mfp.fetchSingleDate(''+user, ''+year+'-'+month+'-'+day, 'all', function(data){
									if(data['calories']!=undefined){
									writemeasurestream.write("\n"+user);
									writemeasurestream.write(","+status);
									writemeasurestream.write(","+data['date']);
									writemeasurestream.write(","+data['calories']);
									writemeasurestream.write(","+data['carbs']);
									writemeasurestream.write(","+data['fat']);
									writemeasurestream.write(","+data['protein']);
									writemeasurestream.write(","+data['cholesterol']);
									writemeasurestream.write(","+data['sodium']);
									writemeasurestream.write(","+data['sugar']);
									writemeasurestream.write(","+data['fiber']);
									}
								else{
								writemeasurestream.write("\n No data for "+user);
								}
							});
					}
					else{
						writemeasurestream.write("\n Sorry, this needs to be public "+status+" To read "+user+"'s data");
					}
			});
}
var linereader=require('line-reader');
	var lineNum = 0;
	var columns = [];
	var user = [];
	linereader.eachLine('myfitnessusers.csv', function(line, last){
			// Get the column names
			if (lineNum == 0) {
				columns = line.toString().split(",");
			} else {
				var temp = {};
				var splitter = line.toString().split(",");
				// Create an object in the form of obj.attribute here
				for (var i = 0; i < splitter.length; i++)
					temp[columns[i]] = splitter[i];
				// Add this user set to our array
				user.push(temp);
	 		}
	 		lineNum++;
	 		if (last) {
	 			for (var i = 0; i < user.length; i++) {
	 			    checkUser(user[i].Userid); // pass just one user, in a for loop
	 			}
	 		}
	});