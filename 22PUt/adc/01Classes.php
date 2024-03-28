<?php

interface a

{

    public function foo();

}



interface b

{

    public function bar();

}



interface c extends a, b

{

    public function baz();

}



class d implements c

{

    public function foo()

    {

    }



    public function bar()

    {

    }



    public function baz()

    {

    }

}



abstract class AbstractClass

{

    // Force Extending class to define this method

    abstract protected function getValue();

    abstract protected function prefixValue($prefix);



    // Common method

    public function printOut() {

        print $this->getValue() . "\n";

    }

}



class ConcreteClass1 extends AbstractClass

{

    protected function getValue() {

        return "ConcreteClass1";

    }



    public function prefixValue($prefix) {

        return "{$prefix}ConcreteClass1";

    }

}



class ConcreteClass2 extends AbstractClass

{

    public function getValue() {

        return "ConcreteClass2";

    }



    public function prefixValue($prefix) {

        return "{$prefix}ConcreteClass2";

    }

}





interface iTemplate

{

    public function setVariable($name, $var);

    public function getHtml($template);

}



// Implement the interface

// This will work

class Template implements iTemplate

{

    private $vars = array();

  

    public function setVariable($name, $var)

    {

        $this->vars[$name] = $var;

		

    }

  

    public function getHtml($template)

    {

        foreach($this->vars as $name => $value) {

            $template = str_replace('{' . $name . '}', $value, $template);

        }

 

        return $template;

    }

}





class BaseClass {

   function __construct() {

       print "In BaseClass constructor\n";

   }

}



class SimpleClass

{

    // member declaration

    public $var = 'a default value';



    // method declaration

    public function displayVar() {

        echo $this->var;

    }

}



class ExtendClass extends SimpleClass

{

    // Redefine the parent method

    function displayVar()

    {

        echo "Extending class\n";

        parent::displayVar();

    }

}



class Test {

}



?>