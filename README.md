# HTML


## Summary



## Introduction

HTML is a JavaScript "class" which simplify HTMLElement construction with a JSON Structure

Below, an example of HTML code generation from a simple JSON structure :

````js
new HTML().compose({
    name: "div",
    classList: ["cl1", "cl2"],
    attributes:{
        style: "background-color: red;",
        "data-attr": "attr-value"
    },
    properties: {
        innerHTML: "Text with HTML balise"
    }
});
````

Will result :

````html
<div class="cl1 cl2" style="background-color: red;" data-attr="attr-value">
Text with HTML balise
</div>
````



## HTML Methods 


### ``compose``

The ``compose`` method will generate the corresponding HTMLElements and return.

````js
var structure = {};
new HTML().compose(structure);
````



### ``composeTemplate``






## Structure declaration


## Declaration

Below, the algorithmic declaration :

````
STRUCTURE strListJSON
    name:  typeof String
    value: typeof Mixed
END STRUCTURE


STRUCTURE strListFunction
    function:   typeof function (callable)
    args:       typeof Array
END STRUCTURE


STRUCTURE strBuildHTML -- All attributes are optionnal
    name:       typeof String                   -- Stand for resulting tag name
    element:    typeof HTMLElement              -- to pass an existing HTMLElement
        (priority on name)
    
    classList:  typeof Array of String          -- List of CSS classes to append
    attributes: typeof Object using strListJSON -- List of HTML attribute to append
    properties: typeof Object using strListJSON -- List of HTML properties to append
    children:   typeof Array of strBuildHTML    -- Childs element to build and to append
    functions:  typeof Array of strListFunction -- List of function to execute before 
        returning generated HTMLElement
END STRUCTURE
````



## ``name``

The attribute ``name`` of the structure `strBuildHTML` define the HTML tag to build.
If the attribute ``name`` is missing, the default tag is `div`.

````js
new HTML().compose({name: 'section'});
````

Will result :

````html
<section></section>
````



## ``element``

The attribute ``element`` of the structure ``strBuildHTML`` allows to bind an existing
HTMLElement to manipulate with the class ``HTML``.

````html
<div id="article" class="bg-red">
    <h1>Title</h1>
    <p>Paragraph</p>
</div>
````

````js
var element = document.querySelector('#article');

new HTML().compose({
    element: element,
    classList: ['font-size', 'text-decoration']
});
````

Will result :

````html
<div id="article" class="bg-red font-size text-decoration">
    <h1>Title</h1>
    <p>Paragraph</p>
</div>
````



## ``classList``

The attribute ``classList`` of the structure `strBuildHTML` serves to add values provided
in the HTML attribute ``class``.

````js
new HTML().compose({classList: ['class-1','class-2', 'class-3']});
````

Will result :

````html
<div class="class-1 class-2 class-3"></div>
````



## ``attributes``

The attribute ``attributes`` of the structure `strBuildHTML` allows you to add 
any HTML attribute with specified value (of type ``String`` or `Number` )

````js
new HTML().compose({name: 'th', attributes: {colspan: 2}});
````

Will result :

````html
<th colspan="2"></th>
````


## ``properties``

The attribute ``properties`` of the structure `strBuildHTML` is similare to
``attributes``. It allows you to add/edit HTMLElement properties as-in a JavaScript script

````js
new HTML().compose({properties: {textContent: 'Text Here'}});
````

Will result :

````html
<div>Text Here</div>
````



## ``children``

The attributes ``children`` of the structure `strBuildHTML` is a list of declaration
of type ``strBuildHTML`` which will be appended to the current element.

````js
new HTML().compose({
    name: 'table',
    children: [
        {
            name: 'tr',
            children: [
                {name: 'th', properties: {textContent: '#'}},
                {name: 'th', properties: {textContent: 'First Name'}},
                {name: 'th', properties: {textContent: 'Last Name'}},
                {name: 'th', properties: {textContent: 'Age'}}
            ]
        }
    ]
});
````

Will result :

````html
<table>
    <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Age</th>
    </tr>
</table>
````



## ``functions``


