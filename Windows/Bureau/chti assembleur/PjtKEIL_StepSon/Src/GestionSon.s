	PRESERVE8
	THUMB   
		
	include DriverJeuLaser.inc
		
; ====================== zone de réservation de données,  ======================================
;Section RAM (read only) :
	area    mesdata,data,readonly


;Section RAM (read write):
	area    maram,data,readwrite
SortieSon dcd 0

	import Son
	import LongueurSon
	import Cursor

	export SortieSon
	export PlaySound
	
; ===============================================================================================
	
		
;Section ROM code (read only) :		
	area    moncode,code,readonly
; écrire le code ici		

PlaySound proc
	
	;R0 = Cursor;
	ldr R0, =Cursor
	ldr R0, [R0]
	
	;R1 = *R0;
	ldrsh R1, [R0]
	
	;R1 += 32768
	add R1, #32768
	
	;R1 *= 719
	mov R2, #719
	mul R1, R2
	
	;R1 /= 65536
	mov R2, #65536
	sdiv R1, R2
	
	;SortieSon = R2;
	ldr R2, =SortieSon
	str R1, [R2]
	
	push {R0}
	push {lr}
	mov R0, R1
	bl PWM_Set_Value_TIM3_Ch3
	pop {lr}
	pop {R0}
	
	;R1=&Son
	ldr R1, =Son
	;R1+=LongueurSon
	ldr R2, =LongueurSon
	ldr R2, [R2]
	lsl r2,#1
	
	add R1, R2
	
	;if(R0 < R1){
	cmp R0, R1
	bge return
	;	R0++;
	add r0, #2
	
	;   Cursor = R0
	ldr R2, =Cursor
	str R0, [R2]
	
	
	;}
return
	; return;
	bx lr
		
	



		
	endp
	END	
		
		
		
;    12:         SortieSon = ((*Cursor+32768)*719)/(32768*2); 
;LDR      r1,[pc,#60]
;LDR      r1,[r1,#0x00]
;LDRSH    r1,[r1,#0x00]
;ADD      r1,r1,#0x8000
;MOVW     r2,#0x2CF
;MUL      r0,r1,r2
;ASRS     r1,r0,#31
;ADD      r1,r0,r1,LSR #16
;ASRS     r1,r1,#16
;LDR      r2,[pc,#36]
;STRH     r1,[r2,#0x00]
;    13:         if(Cursor < (&Son+LongueurSon)) 
;LDR      r0,[pc,#36]
;LDR      r1,[pc,#40]
;LDR      r1,[r1,#0x00]
;ADD      r0,r0,r1,LSL #1
;LDR      r1,[pc,#20]
;LDR      r1,[r1,#0x00]
;CMP      r0,r1
;BLS      0x0800093C
;    14:                 Cursor++; 
;LDR      r0,[pc,#12]  ; @0x08000940
;LDR      r0,[r0,#0x00]
;ADDS     r0,r0,#2
;LDR      r1,[pc,#4]
;STR      r0,[r1,#0x00]