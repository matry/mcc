# MCC (Matry Canvas Compiler)

MCC is intended to be the reference implementation of the Matry language.

## Style Types

- string
- boolean
- number
- percent
- degree
- color
- font
- image
- video
- svg

## Design Expressions

#### boolean expressions

- is Val
- is not Val
- is > Num
- is >= Num
- is < Num
- is <= Num
- is not > Num
- is MyColor1.saturation > MyColor2.saturation
- is MyColor.lightness < 50%

#### math expressions

- SUM( Num1, Num2 )
- SUB( Num1, Num2 )
- PCT( Num1, Num2 )
- NUM( Pct1, MyColor1 )
- PCT( 5, 10 ) // 50
- NUM( 25%, 8 ) // 2

#### color expressions

- SATURATE( MyColor, 25% )
- DESATURATE( MYColor, 50% )
- LIGHTEN( MyColor, 10% )
- DARKEN( MyColor, 80% )
- ROTATEHUE( MyColor, 24deg )
- MIX( MyColor1, MyColor2 )

#### layout expressions

- 50% of Elem.width
- 10 inside Elem.left
- 20 outside Elem.right
- Elem1.left: Elem2.right
