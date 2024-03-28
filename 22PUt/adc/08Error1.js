// Error on line 3 - missing keyword "function"



addTextNode() {

var newtext = document.createTextNode(" Some text added dynamically. ");

var para = document.getElementById("p1");

para.appendChild(newtext);

}



var treeWalker = document.createTreeWalker(

    document.body,

    NodeFilter.SHOW_ELEMENT,

    { acceptNode: function(node) { return NodeFilter.FILTER_ACCEPT; } },

    false

);

var nodeList = new Array();

while(treeWalker.nextNode()) nodeList.push(treeWalker.currentNode);



