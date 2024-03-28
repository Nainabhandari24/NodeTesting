/*

Error on line 16 - equality operator error

Error on line 27 - assignment operator error

Error on line 34 - semi-colon in  function call operator

Error on line 46 - missing express in if statement

Error on line 62 - missing while loop expression

Error on line 94 - missing comma

Error on line 132 - miss-spelled keyword "new"

Error on line 170 - missing keyword "function"

Error on line 194 - assignment operator error

Error on line 213 - missing closing paren

Error on line 232 - missing square bracket

*/



if( typeof JSIS == 'undefined' ) JSIS = {};

if( typeof JSIS.DesignTimeSynErr = 'undefined' ) JSIS.DesignTimeSynErr = {}; 

//equality operator error. CORRECTION: if( typeof JSIS.DesignTimeSynErr == 'undefined' )

if( typeof JSIS.DesignTimeSynErr.Editing == 'undefined' ) JSIS.DesignTimeSynErr.Editing = {};





JSIS.DesignTimeSynErr.Editing.Utils = function()

{

};



JSIS.DesignTimeSynErr.Editing.Utils.canInsertWidget = function(dom, widgetType)

{

	var sel += dom.getSelection(true); 

	//assignment operator error. CORRECTION: var sel = dom.getSelection(true);

	var selNode = dom.getSelectedNode();

    var validationWidgetsGroup = new Array("JSIS.Widget.ValidationTextField", "JSIS.Widget.ValidationSelect", "JSIS.Widget.ValidationCheckbox", "JSIS.Widget.ValidationTextarea", "JSIS.Widget.ValidationPassword", "JSIS.Widget.ValidationConfirm");



	if( selectionIsContainedInTagOfType(sel, "MMTEMPLATE:EDITABLE", dom, false) )

	{

		alert(dw.loadString('JSIS/widget/alert/cant insert into editable region'););

		//semi-colon in  function call operator. 

		//CORRECTION: alert(dw.loadString('JSIS/widget/alert/cant insert into editable region'));

		return false;

	}

	

	if( !dom.isHeadEditable() )

	{

		alert( dwscripts.sprintf(dw.loadString('JSIS/alert/lockedHeadRegion'), dom.getAttachedTemplate()) );

		return false;

	}  

	

    if( /*dom.URL == ''*/ ) //missing express in if statement. CORRECTION: if( dom.URL == '' )

    {

        if(confirm(dw.loadString('JSIS/widget/please save file')))

        {

            if (dw.canSaveDocument(dw.getDocumentDOM()))

            {

                dw.saveDocument(dw.getDocumentDOM());

                var saved = (dom.URL != '');

                return saved;

            }

        }

        return false;

    }



    if( selNode && dwscripts.findInArray(validationWidgetsGroup, widgetType) != -1 )

    {

      while (  ) //missing while loop expression. CORRECTION: while ( selNode )

      {

        if( selNode.nodeType == Node.ELEMENT_NODE )

        {

          if (selNode.getTranslatedAttribute)

		  {

		    for( var i = 0; i < validationWidgetsGroup.length; i++ )

            {

              var attr = selNode.getTranslatedAttribute(validationWidgetsGroup[i]);

			  

              if( attr && attr.length > 0 && !JSIS.DesignTimeSynErr.Editing.Utils.isFakeSelection(dom, [sel[0],sel[1]], selNode) )

              {

				alert(dw.loadString("JSIS/widget/alert/cant insert into validation widget"));

                return false;

              }

            }

          }

        }

        selNode = selNode.parentNode;

        if( selNode && selNode.nodeType == Node.ELEMENT_NODE && selNode.tagName == "BODY" )

        {

          break;

        }

      }

    }  

	

	return true;

};



JSIS.DesignTimeSynErr.Editing.Utils.isFakeSelection =  function(curDOM, curSel, selNode)

{

	var isFake = false;

	var selStart selEnd; //missing comma. CORRECTION: var selStart, selEnd;

	selStart = curSel[0]; 

	selEnd = curSel[1]; 



	var matchOffsets = curDOM.nodeToOffsets(selNode); 

	if ((selStart == selEnd) && (selStart == matchOffsets[0]))

	{

		isFake = true;

	}



	return isFake;

};



JSIS.DesignTimeSynErr.Editing.Utils.findWidgetContainer =  function(ele, widgetId)

{

    while( ele )

	{

		var attr = ele.getTranslatedAttribute(widgetId);

		if( attr && attr.length > 0 )

			return ele;

			

		ele = ele.parentNode;

	}

	

	return ele;

};



JSIS.DesignTimeSynErr.Editing.Utils.getNewJSObjectName = function(widgetType, baseName)

{

  var dom = dw.getDocumentDOM();

  var objectNamesRegExp = new RegExp("\\s*.*\\s*=\\s*new\\s+" + dwscripts.escRegExpChars(widgetType) + "\\s*\\(\\s*\".+\"", "g");

  var nameRegExp1 = new RegExp("(" + baseName + "\\d+)\\s*=\\s*new\\s+" + dwscripts.escRegExpChars(widgetType), "i");

  var nameRegExp2 = new RegExp("\\s*\\(\\s*\"(" + baseName + "\\d+)", "i");

  var domSource = dom.body.innerHTML;

  var idElems = dom.body.getElementsByAttributeName("id");

  var result;

  var suffix = 1;

  var newName = baseName + suffix; 

  var arrayJSObjNames = neq Array(); //miss-spelled keyword. CORRECTION: new

  

  result = domSource.match(objectNamesRegExp);

  if( result )

  {

    for( var i = 0; i < result.length; i++)

    {

      var match = result[i].match(nameRegExp1);

      var JSObjName = "";

      if( match )

      {

        JSObjName = match[1];

        arrayJSObjNames.push(JSObjName);

      }

      match = result[i].match(nameRegExp2);

      if (match && match[1] != JSObjName)

        arrayJSObjNames.push(match[1]);

    }

  }



  for (var i=0; i < idElems.length; i++)

  {

    currId = idElems[i].getAttribute("id");

    if (currId)

      arrayJSObjNames.push(currId);

  }

  

  if(arrayJSObjNames.length)

  {

    while(dwscripts.findInArray(arrayJSObjNames, newName) != -1)

    {

      suffix++;

      newName = baseName + suffix;

    }

  }

  return newName;

};



JSIS.DesignTimeSynErr.Editing.Utils.removeCachedObjects = (dom, widgetType) {

//missing keyword "function"

//CORRECTION: JSIS.DesignTimeSynErr.Editing.Utils.removeCachedObjects = function(dom, widgetType) {

  var widgetMgr;

	if( typeof (dom.JSIS) == 'undefined' || 

      typeof (dom.JSIS.Widgets) == 'undefined' || 

      typeof (dom.JSIS.Widgets.Manager) == 'undefined' )

	{

		return;

	}



	widgetMgr = dom.JSIS.Widgets.Manager;

  if( widgetMgr.widgets && widgetType )

  {

    for (var id in widgetMgr.widgets[widgetType])

    { 

      if( !dw.nodeExists(widgetMgr.widgets[widgetType][id].element) )

      {

        widgetMgr.deleteWidget(widgetType, id);

      }

    }

  }

};



var GP_PARSE_ARGLIST  == 1; //assignment operator error. CORRECTION: var GP_PARSE_ARGLIST  = 1;

var GP_PARSE_STRING   = 2;

var GP_PARSE_BRACES   = 3;

var GP_PARSE_BRACKETS = 4;

var GP_PARSE_PARENS   = 5;



function GPParserStack()

{

	this.stack = [];

}



GPParserStack.prototype.push = function(mode, modeTerminators)

{

	var psItem = new Object;

	psItem.mode = mode;

	psItem.modeTerminators = modeTerminators;

	this.stack.push(psItem);

};



GPParserStack.prototype.pop = function() { this.stack.pop(; }; //missing closing paren. CORRECTION: this.stack.pop();

GPParserStack.prototype.length = function() { return this.stack.length; };



GPParserStack.prototype.mode = function()

{

	if (this.stack.length)

		return this.stack[this.stack.length - 1].mode;

	return -1;

};



GPParserStack.prototype.isTerminator = function(c)

{

	if (this.stack.length)

	{

		var terms = this.stack[this.stack.length - 1].modeTerminators;

		if (typeof terms != "object")

			return (c == terms);

		for (var i = 0; i < terms.length; i++)

		{

			if (c == terms[i) //missing square bracket

				return true;

		}

	}

	return false;

};





JSIS.DesignTimeSynErr.Editing.Utils.getParamsAsStrings = function(str, startOffset, startDelimeter, endDelimeter, trimWhiteSpace)

{

	var args = [];

	args._offsets = [];



	if (!str || !startDelimeter || !endDelimeter)

		return args;



	var curIndex = startOffset;

	while (curIndex < str.length)

	{

		if (str[curIndex] == startDelimeter)

			break;

		++curIndex;

	}

	if (curIndex >= str.length || !str[curIndex + 1] || str[curIndex + 1] == endDelimeter)

		return args;



	var stack = new GPParserStack();

	stack.push(GP_PARSE_ARGLIST, [',', endDelimeter]);



	var argStart = curIndex+1;

	var lastIndex = str.length - 1;



	while (curIndex < lastIndex && stack.length() > 0)

	{

		c = str[++curIndex];



		switch(stack.mode())

		{

			case GP_PARSE_ARGLIST:

			{

				if (stack.length() == 1 && stack.isTerminator(c))

				{

					var pStr = str.substring(argStart, curIndex);

					if (trimWhiteSpace)

						pStr = pStr.replace(/^\s*|\s*$/, "");

					args.push(pStr);

					args._offsets.push(argStart);

					argStart = curIndex+1;

					continue;

				}

				break;

			}

			case GP_PARSE_STRING:

			{

				if (c == '\\')

					++curIndex;

				else if (stack.isTerminator(c))

					stack.pop();

				continue;

			}

			case GP_PARSE_BRACES:

			case GP_PARSE_PARENS:

			case GP_PARSE_BRACKETS:

			{

				if (stack.isTerminator(c))

				{

					stack.pop();

					continue;

				}

				break;

			}

			default:

			{

				alert("PARSE ERROR!");

				return args;

			}



		}



		switch(stack.mode())

		{

			case GP_PARSE_ARGLIST:

			case GP_PARSE_BRACES:

			case GP_PARSE_PARENS:

			case GP_PARSE_BRACKETS:

			{

				if (c == '"' || c == '\'')

					stack.push(GP_PARSE_STRING, c);

				else if (c == '[')

					stack.push(GP_PARSE_BRACKETS, ']');

				else if (c == '(')

					stack.push(GP_PARSE_PARENS, ')');

				else if (c == '{')

					stack.push(GP_PARSE_BRACES, '}');

				break;

			}

			default:

			{

				alert("PARSE ERROR!");

				return args;

			}

		}

	}



	return args;

};

