/** ----------------------------------------------------------------------------------------------------------------------- ** 
/** ----------------------------------------------------------------------------------------------------------------------- ** 
/** ---																																						--- **
/** --- 													------------------------------------													--- **
/** ---															 { suprismToEntities.js } 															--- **
/** --- 													------------------------------------													--- **
/** ---																																						--- **
/** ---		AUTEUR 	: Nicolas DUPRE																												--- **
/** ---																																						--- **
/** ---		RELEASE	: 17.11.2015																													--- **
/** ---																																						--- **
/** ---		VERSION	: 1.0																																--- **
/** ---																																						--- **
/** ---																																						--- **
/** --- 														-----------------------------															--- **
/** --- 															 { C H A N G E L O G } 																--- **
/** --- 														-----------------------------															--- **
/** ---																																						--- **
/** ---		VERSION 1.0 : 17.11.2015																												--- **
/** ---		------------------------																												--- **
/** ---			- Première release																													--- **
/** ---																																						--- **
/** --- 											-----------------------------------------------------										--- **
/** --- 												{ L I S T E      D E S      M E T H O D E S } 											--- **
/** --- 											-----------------------------------------------------										--- **
/** ---																																						--- **
/** ----------------------------------------------------------------------------------------------------------------------- **
/** ----------------------------------------------------------------------------------------------------------------------- **

	Objectif de la fonction :
	-------------------------
	
		L'objectif de la fonction est de supprimer les caractères < et > en entité de caractère pour le module Prism.js, car 
	celui-ci interprète l'HTML. Si ces caractère sont identifier en tant qu'entitée, le programme de colorisation, fonctionne
	normalement
		
	Description fonctionnelle :
	---------------------------

/** ----------------------------------------------------------------------------------------------------------------------- **
/** ----------------------------------------------------------------------------------------------------------------------- **/
function suprismToEntities(){
	/** Selection tout les bloc code inclus dans un pre et ayant pour class quelque chose qui commence par "language-" **/
	var tosuprism = document.querySelectorAll('pre code[class*="language-"]');
	
	/** Parcourir chaque bloc trouvé **/
	for(var i = 0; i < tosuprism.length; i++){
		/** Récupérer l'innerHTML **/
		var nativeInnerHTML = tosuprism[i].innerHTML;
		var innerHTMLWtEntities;
		
		var lesserThanPattern = new RegExp("<", "gi");
		var greaterThanPattern = new RegExp(">", "gi");
		
		/** < to &lt; **/
		innerHTMLWtEntities = nativeInnerHTML.replace(lesserThanPattern, "&lt;");
		
		/** > to &gt; **/
		innerHTMLWtEntities = innerHTMLWtEntities.replace(greaterThanPattern, "&gt;");
		
		/** Réinjecter le contenu modifier pour highlightning **/
		tosuprism[i].innerHTML = innerHTMLWtEntities;
	}
}


/** Edition de la Prism.highlightAll et ajout de l'invocation de suprismToEntities() en tout début de fonction **/

