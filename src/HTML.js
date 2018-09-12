/** ---------------------------------------------------------------------------------------------------------------- **
 /** --------------------------------------------------------------------------------------------------------------- **
 /** ---                                                                                                         --- **
 /** ---                                          ------------------------                                       --- **
 /** ---                                                 { HTML.js }                                             --- **
 /** ---                                          ------------------------                                       --- **
 /** ---                                                                                                         --- **
 /** ---                                                                                                         --- **
 /** ---        @author  : Nicolas DUPRE                                                                         --- **
 /** ---        @release : 10.09.2018                                                                            --- **
 /** ---        @version : 1.3.0                                                                                 --- **
 /** ---                                                                                                         --- **
 /** ---                                                                                                         --- **
 /** ---                                       -----------------------------                                     --- **
 /** ---                                            { C H A N G E L O G }                                        --- **
 /** ---                                       -----------------------------                                     --- **
 /** ---                                                                                                         --- **
 /** ---        VERSION 1.3.0: 10.09.2018 : NDU                                                                  --- **
 /** ---        --------------------------------                                                                 --- **
 /** ---            - Correction du test de validation de l'élement HTML passé dans strBuildJSON.element         --- **
 /** ---            - Ajout de la prise en charge des elements SVGSVGElement (createElementNS:svg)               --- **
 /** ---                                                                                                         --- **
 /** ---        VERSION 1.2.0 : 10.09.2018 : NDU                                                                 --- **
 /** ---        --------------------------------                                                                 --- **
 /** ---            - Lorsque l'attribut "name" n'est pas fourni, un élément 'div' est généré par défaut         --- **
 /** ---                                                                                                         --- **
 /** ---        VERSION 1.1.0 : 27.03.2017 : NDU                                                                 --- **
 /** ---        --------------------------------                                                                 --- **
 /** ---            - Ajout de la méthode composeTemplate                                                        --- **
 /** ---                                                                                                         --- **
 /** ---        VERSION 1.0.0 : 27.03.2017 : NDU                                                                 --- **
 /** ---        --------------------------------                                                                 --- **
 /** ---            - Première release                                                                           --- **
 /** ---                                                                                                         --- **
 /** ---                         -----------------------------------------------------                           --- **
 /** ---                             { L I S T E      D E S      M E T H O D E S }                               --- **
 /** ---                         -----------------------------------------------------                           --- **
 /** ---                                                                                                         --- **
 /** --------------------------------------------------------------------------------------------------------------- **
 /** --------------------------------------------------------------------------------------------------------------- **


 Objectif de la fonction :
 -------------------------



 Classe JavaScript requises :
 ----------------------------



 variable Globales requises :
 ----------------------------



 Déclaration des structure de donnée :
 -------------------------------------


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
    element:    typeof HTMLElement              -- to pass an existing HTMLElement (priority on name)
    classList:  typeof Array of String          -- List of CSS classes to append
    attributes: typeof Object using strListJSON -- List of HTML attribute to append
    properties: typeof Object using strListJSON -- List of HTML properties to append
    children:   typeof Array of strBuildHTML    -- Childs element to build and to append
    functions:  typeof Array of strListFunction -- List of function to execute before returning generated HTMLElement
 END STRUCTURE



 Description fonctionnelle :
 ---------------------------



 Exemples d'utilisations :
 -------------------------

 Structure minimale : {
            name: "div"
        }

 Return : <div></div>


 Structure: {
            name: "div",
            children: [
                {name: "h2"}
            ]
        }

 Return :

 <div>
 <h2></h2>
 </div>


 Structure: {
            name: "div",
            properties: {
                innerHTML: "<strong>GRAS</strong>"
            }
        }

 Return : <div><strong>GRAS</strong></div>



 /** --------------------------------------------------------------------------------------------------------------- **
 /** --------------------------------------------------------------------------------------------------------------- **/

function HTML(){
    /** ------------------------------------------------------------------------------------------------------------ **
     /** ---                                                                                                     --- **
     /** ---                                    Déclaration des propriétés de l'instance                         --- **
     /** ---                                                                                                     --- **
     /** ----------------------------------------------------------------------------------------------------------- **/
    var self = this;

    /** Inline described properties **/

    /** Block described properties **/
    /** ------------------------------------------------------------------------------------------------------------ **
     /** ---                                                                                                     --- **
     /** ---                                       Pré-execution interne                                         --- **
     /** ---                                                                                                     --- **
     /** ----------------------------------------------------------------------------------------------------------- **/

    /** ------------------------------------------------------------------------------------------------------------ **
     /** ---                                                                                                     --- **
     /** ---                              Déclaration des méthodes de l'instance                                 --- **
     /** ---                                                                                                     --- **
     /** ----------------------------------------------------------------------------------------------------------- **/
    /** ------------------------------------------------------------------------- **
     /** --- Méthode de renderisation de la structure donnée en éléments HTML --- **
     /** ------------------------------------------------------------------------ **/
    self.compose = function(structure){
        var element = null;

        /** Controle de l'argument **/
        if(structure === undefined){
            console.error("HTML::compose() expects argument 1 to be object.");
            return null;
        }



        // Si name défini, alors créer l'élément HTML correspondant
        // Sinon choisir un élément de type div par défaut
        var tag = (structure.name !== undefined) ? structure.name : 'div';
        element = document.createElement(tag);

        // Si element défini, alors remplacer l'éventuel élément créer à partir de NAME
        if(
            structure.element !== undefined &&
            (
                (structure.element instanceof HTMLElement)
                || (structure.element instanceof SVGSVGElement)
            )
        ){
            element = structure.element;
        }

        // Si aucune des deux propriété n'à été déclarer, alors on ne peut pas aller plus loin
        if(element === null){
            console.error("HTML::compose() has received an invalid structure : ", structure);
            return null;
        }



        /** Parcourir les classes CSS à appliquer **/
        if(structure.classList !== undefined && Array.isArray(structure.classList)){
            for(var cl = 0; cl < structure.classList.length; cl++){
                element.classList.add(structure.classList[cl]);
            }
        }

        /** Parcourir les attributs à appliquer (via setAttributes) **/
        if(structure.attributes !== undefined && structure.attributes instanceof Object && !Array.isArray(structure.attributes)){
            for(var attribut in structure.attributes){
                element.setAttribute(attribut, structure.attributes[attribut]);
            }
        }

        /** Parcourir les propriétés à appliquer (accès direct via la notation pointée) **/
        if(structure.properties !== undefined && structure.properties instanceof Object && !Array.isArray(structure.properties)){
            for(var property in structure.properties){
                element[property] = structure.properties[property];
            }
        }

        /** Parcourir les childNodes et les ajouter **/
        if(structure.children !== undefined && Array.isArray(structure.children)){
            for(var ch = 0; ch < structure.children.length; ch++){
                element.appendChild(self.compose(structure.children[ch]));
            }
        }

        /** Parcourir les fonction à executer (externe) **/
        if(structure.functions !== undefined && Array.isArray(structure.functions)){
            for(var fn = 0; fn < structure.functions.length; fn++){
                if(typeof(structure.functions[fn].function) === 'function'){
                    /** Vérifier que la propriété args est valide **/
                    if(!Array.isArray(structure.functions[fn].args)){
                        structure.functions[fn].args = [];
                    }

                    /** A la maniere de Event, l'élement est transmis systématiquement **/
                    structure.functions[fn].args.push(element);
                    structure.functions[fn].function.apply('', structure.functions[fn].args);
                }
            }
        }

        /** Renvois **/
        return element;
    };

    /** ------------------------------------------------------------------------------ **
     /** --- Méthode de renderisation de la chaine de text donnée en éléments HTML --- **
     /** ----------------------------------------------------------------------------- **/
    self.composeTemplate = function(template) {
        var HTMLTemplateElement = document.createElement('template');
        HTMLTemplateElement.innerHTML = template;

        return HTMLTemplateElement.content.firstChild;
    };

    /** ------------------------------------------------------------------------------------------------------------ **
     /** ---                                                                                                     --- **
     /** ---                               Déclaration des alias de l'instance                                   --- **
     /** ---                                                                                                     --- **
     /** ----------------------------------------------------------------------------------------------------------- **/

    /** ------------------------------------------------------------------------------------------------------------ **
     /** ---                                                                                                     --- **
     /** ---                                      Post-Execution interne                                         --- **
     /** ---                                                                                                     --- **
     /** ----------------------------------------------------------------------------------------------------------- **/

    /** ------------------------------------------------------------------------------------------------------------ **
     /** ---                                                                                                     --- **
     /** ---                                             Retour                                                  --- **
     /** ---                                                                                                     --- **
     /** ----------------------------------------------------------------------------------------------------------- **/
    return self;
}