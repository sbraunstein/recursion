// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:


function stringifyJSON(obj){
		if(obj === null){
			return "null";
		}
		else if(typeof obj === "boolean"){
			return obj.toString()
		}
		else if(typeof obj === "string" ){
			return '"'+String(obj)+'"';
		}
		else if(typeof obj === "number"){
			return obj.toString();
		}
		else if(Array.isArray(obj)){
			function loopArray(obj){
				var tempArray = [];
				for(var i = 0; i < obj.length; i++){
					var nextArray = obj[i];
					if(Array.isArray(nextArray)){
						tempArray.push(loopArray(nextArray));
					}
					else if (typeof nextArray === "string"){
						tempArray.push('"'+nextArray+'"');
					}
					else {
						tempArray.push(nextArray);
					}
				}	
				return '['+tempArray+']';
			}
			return loopArray(obj);
		}
		else if(typeof obj === "object"){
			function loopObject(obj){
				var tempObject = [];
				for(var key in obj){
					var nextObject = obj[key];
					if(typeof nextObject == "object"){
						tempObject.push(loopObject(nextObject));
					}
					else if (typeof nextObject === null){
						tempObject.push('"'+key+'"'+ ':' + String(null));

					}
					else if (typeof nextObject === "string"){
						tempObject.push('"'+key+'"'+ ':' + '"'+nextObject+'"');
					}
					else {
						tempObject.push('"'+key+'"'+ ':' + nextObject);
					}
				}
				return "{"+tempObject+"}";
			}
			return loopObject(obj);
		}

}
