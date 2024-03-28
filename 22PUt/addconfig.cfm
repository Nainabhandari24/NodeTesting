

<cfset CurrentPage=GetFileFromPath(GetBaseTemplatePath())>



<cfif IsDefined("FORM.MM_InsertRecord") AND FORM.MM_InsertRecord EQ "form1">

    

    <cfif IsDefined("FORM.hardwareID") AND (#FORM.os# NEQ '' OR #FORM.language# NEQ '' OR #FORM.hardwareID# NEQ '')>

        

          <cfquery datasource="qehardware">   

            INSERT INTO qehardware.configurations (os, language, hardwareID)

       		VALUES (

        	<cfqueryparam value="#FORM.os#" cfsqltype="cf_sql_clob" maxlength="255">

        	, 

        	<cfqueryparam value="#FORM.language#" cfsqltype="cf_sql_clob" maxlength="255">

        	, 

        	<cfqueryparam value="#FORM.hardwareID#" cfsqltype="cf_sql_clob" maxlength="255">

       		)

          </cfquery>

          

    	<cflocation url="index.cfm?&config=add">

    <cfelse>

    	<img src="images/alert.gif" /> <font color="red"><strong>One or more of the fields was left blank. Please re-enter!! </strong></font>

    </cfif>

    	

<cfelseif IsDefined("FORM.MM_InsertRecord") AND FORM.MM_InsertRecord EQ "form2">  

11111

	<cfif #FORM.os# NEQ '' OR #FORM.language# NEQ '' OR #FORM.configurationID# NEQ ''>

        

          <cfquery datasource="qehardware">   

            UPDATE qehardware.configurations SET

        os = #FORM.os#, language="#FORM.language#" 

        

        WHERE id=#FORM.configurationID#

          </cfquery>

    	<cflocation url="index.cfm?&config=edit">

    <cfelse>

    	<img src="images/alert.gif" /> <font color="red"><strong>One or more of the fields was left blank. Please re-enter!! </strong></font>

    </cfif>



<cfelseif IsDefined("FORM.MM_InsertRecord") AND FORM.MM_InsertRecord EQ "form3">

	<cfif IsDefined("FORM.configurationID") AND #FORM.configurationID# NEQ "">

  		<cfquery datasource="qehardware">

    		DELETE FROM qehardware.configurations

			WHERE id=#FORM.configurationID#

  		</cfquery>

  		<cflocation url="index.cfm?delete=true">

	</cfif>

</cfif>



<cfif isDefined('URL.changeconfig') AND #URL.changeconfig# NEQ '' AND isDefined('URL.id') AND #URL.id# NEQ ''>

    <cfquery name="languages" datasource="bugbase">

        SELECT *

        FROM dbo.Languages

        WHERE Active = 1 

        ORDER BY description ASC

    </cfquery>

        

        

    <cfquery name="os" datasource="qehardware">

        SELECT *

        FROM qehardware.os

        ORDER BY os ASC 

    </cfquery>

    

    <cfquery name="machine" datasource="qehardware">

        SELECT id, machineName, username

        FROM qehardware.hardware

        WHERE id = #URL.id# 

    </cfquery>





    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <title>Untitled Document</title>

    <link href="styles/hardware.css" rel="stylesheet" type="text/css" />

    <style type="text/css">

<!--

.style1 {

	color: #FF0000;

	font-weight: bold;

}

.style2 {color: #FF0000}

-->

    </style>

    </head>

    

    <body>



	

      

        <h1>Machine Configurations:</h1>

    <cfif #URL.changeconfig# eq "add">

    

        

    <h1>Add </h1>

    <p>Machine Name: <strong><cfoutput>#machine.machineName#</cfoutput></strong></p>

    <p>User Name: <strong><cfoutput>#machine.username#</cfoutput></strong></p>

    <form action="<cfoutput>#CurrentPage#</cfoutput>" method="post" name="form1" id="form1">

          <table align="center">

            <tr valign="baseline">

              <td nowrap="nowrap" align="right">OS:</td>

              <td><select name="os" id="os">

                <option value="" selected="selected">&nbsp;</option>

             

                <cfoutput query="os">

                  <option value="#os.id#">#os.os#</option>

                </cfoutput>

              </select></td>

            </tr>

            <tr valign="baseline">

              <td nowrap="nowrap" align="right">Language:</td>

              <td><select name="language">

                  <option value="" selected="selected">&nbsp;</option>

                <option value="None" >None</option>

                  

                  <cfoutput query="languages">

                <option value="#languages.Description#">#languages.Description#</option>

              </cfoutput>

              </select>      </td>

            </tr>

            <tr valign="baseline">

              <td nowrap="nowrap" align="right">&nbsp;</td>

              <td><input type="submit" value="Add" /></td>

            </tr>

          </table>

          <input type="hidden" name="hardwareID" value="<cfoutput>#machine.id#</cfoutput>" />

          <input type="hidden" name="MM_InsertRecord" value="form1" />

      </form>

    <cfelseif #URL.changeconfig# eq "edit" OR  #URL.changeconfig# eq "delete">

    

        <cfquery name="editConfigs" datasource="qehardware">

        SELECT 

            configurations.id as id,

            configurations.os as configOS,

            configurations.language as language

        FROM 

            configurations

        WHERE 

            configurations.hardwareID = #URL.id# AND configurations.id = #URL.configID#

        </cfquery>

        

        

        

      <cfif #URL.changeconfig# eq "edit" AND #editConfigs.RecordCount# NEQ 0>

    

          <h1>Edit </h1>

          <p>Machine Name: <strong><cfoutput>#machine.machineName#</cfoutput></strong></p>

          <p>User Name: <strong><cfoutput>#machine.username#</cfoutput></strong></p>

          <p>&nbsp;</p>

            <form id="form2" name="form2" method="post" action="<cfoutput>#CurrentPage#</cfoutput>">

            <table align="center">

              <tr valign="baseline">

                <td nowrap="nowrap" align="right">OS:</td>

                <td><select name="os" id="os">

                  <cfoutput query="os">

                    <option value="#os.id#" <cfif (isDefined("editConfigs.configOS") AND os.id EQ editConfigs.configOS)>selected="selected"</cfif>>#os.os#</option>

        </cfoutput>

                        </select></td>

              </tr>

              <tr valign="baseline">

                <td nowrap="nowrap" align="right">Language:</td>

                <td><select name="language" id="language">

                  <option value="_None"  <cfif (isDefined("editConfigs.language") AND "_None" EQ editConfigs.language)>selected="selected"</cfif>>None</option>

                  <cfoutput query="languages">

                    <option value="#languages.Description#" <cfif (isDefined("editConfigs.language") AND languages.Description EQ editConfigs.language)>selected="selected"</cfif>>#languages.Description#</option>

                  </cfoutput>

                  </select>        </td>

              </tr>

              <tr valign="baseline">

                <td nowrap="nowrap" align="right">&nbsp;</td>

                <td><input type="submit" value="Edit" /></td>

              </tr>

            </table>

            

            <input type="hidden" name="configurationID" value="<cfoutput>#URL.configID#</cfoutput>" />

            <input type="hidden" name="MM_InsertRecord" value="form2" />

          </form>

        

    

    

        <cfelseif #URL.changeconfig# eq "delete" AND #editConfigs.RecordCount# NEQ 0>

        

        <cfquery name="getOS" datasource="qehardware">

        	SELECT os from os WHERE id=#editconfigs.configOS#

        </cfquery>

        

          <h1 class="style2">Delete </h1>

          <p>Machine Name: <strong><cfoutput>#machine.machineName#</cfoutput></strong></p>

          <p>User Name: <strong><cfoutput>#machine.username#</cfoutput></strong></p>

          <p>&nbsp;</p>

          <p class="style1">Configuration to be deleted:</p>

          <p>&nbsp;</p>

          <p>OS: <strong><cfoutput>#getOS.os#</cfoutput></strong></p>

          <p>Language: <strong><cfoutput>#editConfigs.language#</cfoutput></strong></p>

          <p>&nbsp;</p>

          <form id="form3" name="form3" method="post" action="">

            <input type="hidden" name="configurationID" value="<cfoutput>#editConfigs.id#</cfoutput>" />

            <input type="submit" name="Delete" id="Delete" value="Delete" />

            <input type="hidden" name="MM_InsertRecord" value="form3" />

          </form>

        <cfelseif #editConfigs.RecordCount# EQ 0>

        <h4><font color="red"><img src="images/alert.gif" />Configuration does not exist</font></h4>

        <a href="index.cfm">return to index    </a>

        	

          </cfif>

          

    </cfif>

    <cfelse>

        <h4><font color="red"><img src="images/alert.gif" />No Configuration is selected</font></h4>

        <a href="index.cfm">return to index    </a>









</body>



</html>

</cfif>



