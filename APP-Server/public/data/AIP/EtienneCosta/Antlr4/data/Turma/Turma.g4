grammar Turma;


@header { 
import java.util.* ;
}

@members { 

public int sum(List<Integer> array){
      int res=0;
      for(Integer nota: array)
            res+=nota;
            return res;
      }

}


/* Gramática 

a) contar o total de alunos ✔️
b) calcular a nota média de cada aluno ✔️
c) garantir que todos os alunos têm entre 4 e 6 notas e que estas estão na escala '0' a '20' ✔️
d) garantir que não há nomes repetidos ✔️

*/


turma : TURMA PALAVRA alunos {      System.out.println();
                                    System.out.println("Total de alunos: "+$alunos.totalAlunos);
                                    System.out.println("----------------------------------------------");

                             }
                                                                                                '.'
      ;


alunos returns [int totalAlunos, List <String> nomes =new ArrayList<>()] :
      
      aluno[$nomes]  { $totalAlunos=1 ; } (';' aluno[$nomes] {$totalAlunos++;})* 
      ;

/*    notas[$nome.text] <-> Significa que estou a propagar o valor nome para ser acedido na produção notas */
aluno[List <String> n] : nome  notas {  
                        System.out.println();
                        System.out.println("----------------------------------------------");
                        if($n.contains($nome.text))
                           System.out.println("ALUNO(A) COM O NOME REPETIDO: " +$nome.text+" --- Erro Semântico");
                        else
                              $n.add($nome.text);
                        System.out.println("Aluno: "+$nome.text);
                        if(!($notas.notasA.size()>=4 &&$notas.notasA.size()<=6))
                        System.out.println("Número de notas: "+$notas.notasA.size()+" ∉ [4,6] --- Erro Semântico");
                        System.out.println("Notas:");
                        for(Integer nota:$notas.notasA){
                              if(nota>=0&&nota<=20)
                                    System.out.println("       "+nota);
                              else
                                    System.out.println("       "+nota+ "  ∉  [0,20] --- Erro Semântico ");



                        }
                        System.out.println("Média: "+(double)sum($notas.notasA)/$notas.notasA.size());
                        System.out.println("----------------------------------------------");



                   } 
      ;



notas returns [List <Integer> notasA= new ArrayList<>()]:
      '(' n1=NOTA{$notasA.add($n1.int); } (',' n2=NOTA{$notasA.add($n2.int);})* ')' 
      ;

nome : PALAVRA
     ;
                                    
                                   

/* Analisador Léxico */

TURMA : [Tt][Uu][Rr][Mm][Aa] 
      ;

PALAVRA : [A-Za-z]+
        ;

NOTA : ('-')?[0-9]+
     ;

WS : [\t\r\n ]+ -> skip 
   ;