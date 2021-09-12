;========================================================
; unit_tests.asm
;
; Collects and executes all unit tests.
;========================================================

    include "unit_tests.inc"


; Initialization routine called before all unit tests are
; started.
    UNITTEST_INITIALIZE
    ; Do your initialization here ...
    ; ...
    ; ...
    ; For this simple example we don't need any special initialization.
    ; So we simply return.
    ; Please note: the stack pointer does not need to be setup explicitly
    ; for the unit tests.
    ret


    MODULE Ports

UT_port_add_1:
    call add_port_inputs
    ; Test result
    TEST_MEMORY_BYTE result, 11
 TC_END


    ENDMODULE


