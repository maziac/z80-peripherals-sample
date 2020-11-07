# z80-peripherals-sample

# Introduction

This is a small Z80 assembler program that uses custom javascript code to emulate Z80 ports inside [DeZog (Z80 debugger)](https://github.com/maziac/DeZog).


# Prerequisites

- Visual Studio Code (vscode)
- [DeZog](https://github.com/maziac/DeZog) (>= v2.0.0)
- Z80 Assembler: sjasmplus, https://github.com/z00m128/sjasmplus

The program runs inside the internal Z80 simulator.


# Building

First if you just want to test debugging with the 'DeZog' extension there is no need to build/assemble the required files.
The binaries are included in this repository so that you could also directly start to debug.

However, if you would like to do some changes you need to compile.
From the menu choose "Terminal->Run Build Task..."
tasks.json is configured such that it will call sjasmplus with the required parameters.

There are several .asm files which are all included in the main.asm file. This file is the one being assembled.

After the build is ready a z80-peripherals-sample.obj file is created which can be used with ZEsarUX.


# Running the Debugger with the Internal Z80 Simulator



# The Program Itself


# The Peripherals Custom Code

