#include <stdio.h>

int main()
{
	int n;

	/* A função scanf devolve um inteiro indicando quantos dos argumentos
	pretendidos conseguiu ler. Devolve um número negativo em situação de
	erro e EOF quando chega ao fim do buffer de input. */

	printf("\nIntroduza um inteiro: ");
	while(scanf("%d",&n)!=1) /* Conseguimos ler um inteiro? */
	  {
		scanf("%*[^\n]"); /* Se não, limpámos o buffer! */
		printf("\n\nInteiro inválido!\n\nIntroduza-o de novo: ");
	  }

	printf("\n\nFoi lido o inteiro: %d\n\n",n);

	return 0;
}
