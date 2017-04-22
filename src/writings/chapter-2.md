## Chapter 2: A Gentle Overview Of How Computation Works

A mostly-true description of computation can be described as the application of
input data through a transformation process, which produces different data as an
output:

<bigcode>input ==> transformer ==> output</bigcode>

The aforementioned **transformer** is also known as a **function**, a 
mathematical construct that when given some input, will produce some output. 

### Basic Functions

A basic example of an arithmetic function
could be:

```js
/**
* This function called "double" takes a number and returns a number twice as big.
*/
function double (inputNumber) {
    return inputNumber * 2;
}
```

The `double` function can be applied in a computation to achieve a result:

```
5     ==>   double   ==>   10

3.14  ==>   double   ==>   6.28

500   ==>   double   ==>   1000
```

For the purposes of demonstrating programming languages here, the  reader should 
take note that the following two statements are equivalent:

```
50 ==> double ==> 100

double(50)
// --> 100
```

### Slightly More Complex Computation

Consider the following axioms:

1. `double` is a function that accepts a number as its input
2. `double` will output the number equivalent to double the input number
3. Both the input and output of `double` are numbers

If all those axioms hold true, then it should be possible to recognise that the 
result of the `double` function can be used as the input to another invocation 
of `double`:

```js
double(50)
// --> 100

double(100)
// --> 200

double( double(50) )
// --> 200
```

Thus, we have now opened up the possibility of chaining functions together.
Consider a similar computation using some other (self-explanatory) functions:

```js
half(10)
// --> 5

half( double(10) )
// --> 10

square(3)
// --> 9

square( square( half(10) ) )
// --> 625
```

In this way, we can pass some original piece of data through many successive 
transformer functions to achieve some deterministic output based on simple data
flow.