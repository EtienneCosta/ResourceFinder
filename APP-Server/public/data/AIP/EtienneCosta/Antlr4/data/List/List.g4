grammar List ;


list : '[' content ']' { System.out.println("Somatorio: "+$content.somatorio);}
     ;

content returns [int somatorio=0]: 
                                 | item {$somatorio+=$item.num;} (','item {$somatorio+=$item.num;})*
                                 ;

item returns [int num]: NUM {$num=$NUM.int;} 
                      | WRD {$num=0;}
                      ;



NUM : [0-9]+
    ;
WRD : [A-Za-z]+
    ;
WS  : [\t\r\n ]+ -> skip 
    ;






