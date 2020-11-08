;===========================================================================
; main.asm
;===========================================================================

 DEVICE ZXSPECTRUMNEXT

    ORG $0000

main:
    ; Setup
    di
    ld sp,stack_top
    im 1
    nop
    nop
    nop

    nop
    nop
    nop
    nop
    nop
    nop

    ei

    nop
    nop
    nop
    nop
    nop
    nop


    ld bc,0x9001

loop:
    in a,(c)
    jr loop


    defs $0038-$
im1_int:
    nop
    nop
    nop
    nop
    nop
    nop
    nop
    ei
    reti


    defs $0066-$

nmi_int:
    ld c,9
    ld e,8
    retn



;===========================================================================
; Stack.
;===========================================================================


; Stack: this area is reserved for the stack
STACK_SIZE: equ 100    ; in words


; Reserve stack space
stack_bottom:
    defs    STACK_SIZE*2, 0
stack_top:

