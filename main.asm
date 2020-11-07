;===========================================================================
; main.asm
;===========================================================================

 DEVICE ZXSPECTRUMNEXT

    ORG $0000

main:
    ; Setup
    di
    ld sp,stack_top

    ld bc,0x9000

loop:
    in a,(c)
    jr loop



;===========================================================================
; Stack.
;===========================================================================


; Stack: this area is reserved for the stack
STACK_SIZE: equ 100    ; in words


; Reserve stack space
stack_bottom:
    defs    STACK_SIZE*2, 0
stack_top:

