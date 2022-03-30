	PRESERVE8
	THUMB   
		

; ====================== zone de réservation de données,  ======================================
;Section RAM (read only) :
	area    mesdata,data,readonly


;Section RAM (read write):
	area    maram,data,readwrite
VarInt dcb 0x0	

	
; ===============================================================================================
	
	include	DriverJeuLaser.inc
	export 	VarInt
	export timer_callback
;Section ROM code (read only) :		
	area    moncode,code,readonly
; écrire le code ici		



timer_callback proc
	ldr r4, =VarInt
	ldrb r2,[r4]
	mov r0, #1
	CMP r2, #1
	BEQ clignoOui
	push {lr}
	bl GPIOB_Set
	mov r2, #1
	str r2, [r4]
	pop {pc}
clignoOui
	push {lr}
	bl GPIOB_Clear
	mov r2,#0
	str r2,[r4]
	pop {pc}
	
	endp
		
	END
		