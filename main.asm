;===========================================================================
; main.asm
;
; Description:
;
; The program is used to demonstrate the simulation of interrupts and
; in- and out-port.
;
; The program itself calculates the addition of 2 binary values.
; The result is shown.
; Additionally the result can be memorized.
; The binary values are input via 2 in-ports, 0x8000 and 0x8001.
; The values are added in a loop and output to out-port 0x9000.
; Additionally it is possible to generate an interrupt (IM 1, address 0x0038)
; to store the result. The stored value is output to 0x9001.
;
; There are 3 parts to this demo:
; a) the assembler program which deals with the in- and out-ports and the interrupt.
; b) the HW simulation code in 'simulation/ports.js'
; c) and the UI in 'simulation/ui.html'
;
; Important to note is that the javascript code to simulate the HW works
; synchronously. I.e. all request from the simulator (e.g. reaading a port) have
; to be handled immediately so that it does not stop the simulation.
;
; On the other hand the UI works asynchronously. It communicates with the HW
; simulation code through messages only. No direct function calls.
;
;===========================================================================


    SLDOPT COMMENT WPMEM, LOGPOINT, ASSERTION

    DEVICE NOSLOT64K

    ORG $0000

main:
    ; Setup
    di
    ld sp,stack_top
    im 1
    ei

    ;jp iommu_test       ; Uncomment for demo of bank switching in ioMmu

.loop:
    ;halt
    call add_port_inputs
    ; Loop
    jr .loop


; Reads from port 8000h and 8001h, adds both values and stores them
; to 'result' and port 9000h.
add_port_inputs:
    ; Load value 1 from port
    ld bc,0x8000
    in a,(c)
    ; Save value
    ld e,a

    ; Load value 2 from port
    ld bc,0x8001
    in a,(c)

    ; Add values
    add a,e

    ; Store result
    ld (result),a

    ; Output result to port
    ld bc,0x9000
    out (c),a
    ret


    defs $0038-$


; Interrupt routine at 0x0038.
; The interrupt memorizies the result to another port.
im1_int:
    push af
    push bc

    ld a,(result)
    ld bc,0x9001
    out (c),a

    pop bc
    pop af
    ei
    reti



    defs 0x0100 - $

iommu_test:
    ; write a different value to banks 1-4.
    ld bc,0x0100
    ld a,1
    ld hl,0xC000
.fill_loop:
    out (c),a   ; Switch bank
    ld (hl),a   ; Put bank number in first address in bank
    inc a
    cp 5
    jr nz,.fill_loop

    ; Switch banks
.start_switch_loop:
    ld a,1
.switch_loop:
    out (c),a  ; Switch bank
    inc a
    cp 5
    jr nz,.switch_loop
    jr .start_switch_loop




    defs 0x0300 - $

;===========================================================
; Stack.
;===========================================================


; Stack: this area is reserved for the stack
STACK_SIZE: equ 20    ; in words


; Reserve stack space
stack_bottom:
    defs    STACK_SIZE*2, 0
stack_top:


;===========================================================
; Data
;===========================================================

; The calculation result is stored here.
result: defb 0


;===========================================================
; Unit tests
;===========================================================

    include "unit_tests/unit_tests.asm"

