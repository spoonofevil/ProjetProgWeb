

#include "DriverJeuLaser.h"
#include "GestionSon.h"

extern short Son;
extern int LongueurSon;
extern void PlaySound(void);
short* Cursor;

 

//void TestPlaySound() {
//	SortieSon = ((*Cursor+32768)*719)/(32768*2);
//	if(Cursor < (&Son+LongueurSon))
//		Cursor++;
//}
void StartSon(){
	CLOCK_Configure();
	int Te=72*91;
	Timer_1234_Init_ff(TIM4,Te);
	Active_IT_Debordement_Timer( TIM4, 2, PlaySound );
	PWM_Init_ff( TIM3, 3, 720 );

	GPIO_Configure(GPIOB, 0, OUTPUT, ALT_PPULL);

	Cursor = &Son;
}
int main(void)
{

// ===========================================================================
// ============= INIT PERIPH (faites qu'une seule fois)  =====================
// ===========================================================================

// Après exécution : le coeur CPU est clocké à 72MHz ainsi que tous les timers

//============================================================================	
	
	StartSon();
	
	
while	(1)
	{
	}
}
