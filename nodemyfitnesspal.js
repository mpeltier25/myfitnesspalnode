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
var linereader=require('line-reader');
	var lineNum = 0;
	var columns = [];
	var user = [];
	function processUser(user){
			mfp.diaryStatusCheck(''+user, function(status) {
					if(status=="public"){
							mfp.fetchDateRange(''+user, '2016-03-03', '2017-03-03', 'all', function(data){
									if(data.data.length!=0 && data.data[0].date!="NaN-NaN-NaN"){
									writemeasurestream.write("\n"+user);
									writemeasurestream.write(","+status);
									writemeasurestream.write(","+JSON.parse(JSON.stringify(data.data[0].date)));
									writemeasurestream.write(","+JSON.parse(data.data[0].calories));
									writemeasurestream.write(","+JSON.parse(data.data[0].carbs));
									writemeasurestream.write(","+JSON.parse(data.data[0].fat));
									writemeasurestream.write(","+JSON.parse(data.data[0].protein));
									writemeasurestream.write(","+JSON.parse(data.data[0].cholesterol));
									writemeasurestream.write(","+JSON.parse(data.data[0].sodium));
									writemeasurestream.write(","+JSON.parse(data.data[0].sugar));
									writemeasurestream.write(","+JSON.parse(data.data[0].fiber));
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
			//console.log(lineNum + " - " + line);
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
	 			    processUser(user[i].Userid);
	 			}
	 		}
	});
