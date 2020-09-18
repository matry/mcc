# Matry

Matry is the first language built entirely for interface designers. The goal is to give designers a language with which they can use their own verbiage and mental models to define the visual logic and behavior of digital applications.

# MCC (Matry Canvas Compiler)

MCC is intended to be the reference implementation of the Matry language. In this project you will find the parser for the language, as well as a test server and interface for demonstrating the output of the language.

Matry is comprised of three core modules:

## Tokens

```
tokens branding
  color primary: #BADA55
  color secondary: #123456
```

## Components

```
component Square
  elements
    shape container

  properties
    color background: #FF0000

  style container
    width: 100
    height: 100
    fill: $background
```

## Mocks

```
mock SquaresInDifferentColors
  state Red
    Square
      background: red

  state Blue
    Square
      background: blue
```
