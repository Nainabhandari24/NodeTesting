//Error on line 6 - spelling error in "function" keyword 

//Error on line 11 - missing conditional statement



 function showFirstAttr() 

 {

  functon test() { } 

  

  var firstPara = document.getElementById("p1");

  var outputText = document.getElementById("result");

    

  if () 

  {

	var attrs = firstPara.attributes;

	var text = ""; 

	for(var i=attrs.length-1; i>=0; i--) {

	  text += attrs[i].name + "->" + attrs[i].value;

	}

	outputText.value = text;

  } else {

	outputText.value = "No attributes to show"

  };

 }







