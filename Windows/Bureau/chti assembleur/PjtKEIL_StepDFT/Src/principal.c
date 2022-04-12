

#include "DriverJeuLaser.h"
extern int DFT_ModuleAuCarre(short * tab,int i);
extern short LeSignal[];
/*int DFT_ModuleAuCarre( short int * Signal64ech, char k){
	int reel=0;
	int imag=0;
	int indice;
	for(int i=0;i<64;i++){
		indice=(i*k)%64;
		R1=Signal64ech[i]
		R2=cos(indice)
		R3=sin(indice)
		R2*=R1
		R3*=R1
		reel+=R2;
		imag+=R3;
	}
	reel*=reel
	imag*=imag
	R0=imag+reel
	return R0;
}*/

int main(void){

// ===========================================================================
// ============= INIT PERIPH (faites qu'une seule fois)  =====================
// ===========================================================================

// Après exécution : le coeur CPU est clocké à 72MHz ainsi que tous les timers
CLOCK_Configure();

DFT_ModuleAuCarre(&LeSignal[0],3);
//============================================================================	
	
	
while	(1){
	}
}

