# MCC (Matry Canvas Compiler)

MCC is intended to be the reference implementation of the Matry language.

## Language Constructs

Matry is built on the notion of blocks.
Blocks define entities within a Matry project.
An entity can be a "parent entity", a "child entity", or both.
Parent entities form the core of Matry projects, while child entities always belong to a parent entity.
The available parent entities are Tokens, Properties, Components, and Mocks.
The available child entities are Info, Elements, Properties, Tokens, Styles, and States.
There are also anonymous entities defined by user-named identifiers. These are allocated to named entities based on contextual information.

If an anonymous entity is defined at the top level of a Matry project, it is assumed to be a Component.

### Components

Since components form the core of a Matry project, they are the default context for the language.
Therefore, components can be declared simply by defining an anonymous block:

```
Button
```

The above code defines a component called "Button".
A component can also be declared by the "component" keyword:

```
component Button
```

This does the same as the above code, however it is more self-documenting.
