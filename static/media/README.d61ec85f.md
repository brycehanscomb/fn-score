# FnScore - Music Is Data

## Chapter 1: Introduction

Given a PCM waveform that consists of multiple simultaneous audible frequencies,
we are able to apply many sophisticated Digital Signal Transformations (DSTs) to 
alter the way that waveform sounds.

One example is a filter, visualised here as a DAW plugin:

<figure>
    <img src="docs/lowpass-filter.png" />
    <figcaption>
        A low pass filter. This will transform the PCM signal such that 
        (ideally) any frequencies above 1100 Hz are removed.
    </figcaption>
</figure>

This type of DST is done on a stream of bytes that represent a waveform, usually
a PCM data file such as a `.wav` file. 

Another example of a signal transformation on a waveform is a "reversal":

<figure>
    <img src="docs/waveform-reverse.png" />
    <figcaption>
        A waveform (TOP) and its inverse (BOTTOM) across the time dimension.
    </figcaption>
</figure>

In the case of frequency removal (EQ / filtering) and track reversal, the 
algorithms required to apply those transformations are fairly trivial, well 
matured and available in almost every audio manipulation software program.

In contrast, the DST algorithms for manipulating individual notes in a PCM
track are quite complex and are prone to errors:

<figure>
    <img src="docs/flex-pitch-waveform.png" />
    <figcaption>
        "Flex Pitch" in Logic Pro X. This system analyzes the spectral content 
        of a PCM stream and attempts to extract pitch-and-time meaning from
        the sounds that it represents. 
    </figcaption>
</figure>

The basic computation flow of any DST is as follows:

<bigcode>Input Signal ==> Transformation ==> Output Signal</bigcode>

The functionality offered by digital signal transformation technology is very 
valuable to the audio engineer whose primary medium is waveforms. However, for 
the composer whose primary medium is musical notation (or perhaps MIDI), DST 
technology offers significantly less value.

To be able to manipulate a signal, it must first be recorded (or at least written 
in some musical data format like MIDI and then realised into musical notes by a 
synthesiser) for the signal to be manipulated. 

<figure>
    <img src="docs/midi-player.gif" />
    <figcaption>
        A MIDI-to-Wav player program that will realise the MIDI data into real
        sounds via PCM signals (eg: sound).
    </figcaption>
</figure>

But what if there was a way to apply filters and transformations to the actual
musical notes themselves, not the realised waveforms that a computer generates
from them?

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

## Chapter 3: Rhythm And Pitch As Data

Suppose that the `double` function operated on more than just numbers. Suppose
that we could apply `double` to a musical note, where the function returns a 
note that goes for double the duration of the input note:

<bigcode><note>e</note> ==> double ==> <note>q</note>
<note>s</note> ==> double ==> <note>e</note>
<note>h</note> ==> double ==> <note>w</note></bigcode>

Which would look like this in JavaScript:

<pre><code>double(<note>q</note>)
// --> <note>h</note>
</code></pre>

We could even apply this to a sequence of notes, where the `double` function is
applied to each of the notes in the sequence:

<pre><code>[<note>q</note> <note>q</note> <note>e</note> <note>h</note> <note>e</note>].forEach(double)
// --> [<note>h</note> <note>h</note> <note>q</note> <note>w</note> <note>q</note>]
</code></pre>

*Note: In programming syntax, square braces `[` and `]` denote a list or set or
sequence of items.*

And do the same thing with other note transformation functions:

<pre><code>[<note>q</note> <note>q</note> <note>e</note> <note>h</note> <note>e</note>].forEach(halve)
// --> [<note>e</note> <note>e</note> <note>s</note> <note>q</note> <note>s</note>]

[<note>e</note> <note>e</note> <note>e</note> <note>e</note>].forEach(twentyFivePercentChanceOfDoubling)
// --> [<note>e</note> <note>e</note> <note>q</note> <note>e</note>]
</code></pre>

In the last case, the function `twentyFivePercentChanceOfDoubling` was called
four times -- one for each note -- and given that it returns a note equal to 
double the duration of the input note -- but only 25% of the time -- we can see
the glimpses of how this system could aid composers in their work.

By "outsourcing" some of the work to a computer system, composers could write 
music by defining transformations to be applied to a given input, whether hand-
crafted or semi-generated. The results of those transformations could then be
fed into further transformations like so:

<pre><code>generateRandomNotes(5)
// --> <note-list>w h h e q</note-list>

generateRandomNotes(3)
// --> <note-list>e q s</note-list>

generateRandomNotes(3)
// --> <note-list>s w w</note-list>
</code></pre>

The outputs of these function calls could be used as the input to other 
functions to achieve semi-generated compositional phrases based on the 
composer's constraints, placed upon the system by the construction and ordering
of transformation functions:

<pre><code>notesList = generateRandomNotes(10)
// --> "notesList" is now equal to <note-list>h h s h e q w s w e</note-list>

longNotes = notesList.forEach( removeIfShorterThan(<note>q</note>) )
// --> "longNotes" is now equal to <note-list>h h h q w w e</note-list>

longNotes.forEach(twentyFivePercentChanceOfDoubling)
// --> <note-list>h w h q w w q</note-list></code></pre>

### Computation on Frequencies

In the same way that we can apply transformations to notes that vary their 
durations, we should also consider being able to do similar transformations to
a note's pitch.

Consider the following simple examples:

```
raise(D)
// --> D#

[ D A B G ].forEach(raise)
// --> [ D# A# C G# ]

[ A C# D F# B ].forEach(removeIfAccidental)
// --> [ A D B ]

pitchList = generateRandomPitches(6)
// --> pitchesList is now equal to [ D#5 G6 A4 F4 G#3 ]

pitchList.forEach( changeToOctave(3) )
// --> [ D#3 G3 A3 F3 G#3 ]

pitchList.forEach( changeToOctave(3) ).forEach(removeIfAccidental)
// --> [ G3 A3 F3 ]
```

*Explanation of the last computation: Each of the pitches in the `pitchList` 
sequence of pitches is applied to the `changeToOctave` function which has been 
instructed to change any applied pitch to its equivalent note in octave `3`. 
Then, each one of those pitches is applied to the `removeIfAccidental` function, 
which will have the effect of "filtering out" any of the pitches that are sharp 
or flat.*

As further examples, we should be able to use functions to simulate the DSTs 
applied in Chapter 1, either to sequences pitch or timing data:

#### Example A: Reversal

In Turing-complete programming languages, reversing a list is a trivial 
operation:

<pre><code>reverse( [<note> w h e s s</note> ] )
// --> [ <note>s s e h w</note>]

reverse( [ C5 A6 C#6 D2 ] )

// --> [ D2 C#6 A6 C5 ]
</code></pre>

#### Example B: High-Pass Filter

Given a function called `removeIfLowerThan` which has been instructed that its
threshold is a pitch of `B5`, we can apply a list of pitches to that transformer
and get back a result which is a list that contains pitches only higher than the
pitch `B5`:

```
[ A4 D4 A5 C5 A6 C#6 F3 A#3 D2 ].forEach( removeIfLowerThan(B5) )
// --> [ C5 A6 C#6 ]
```

Interestingly, the `Q` value in a filter is no longer a theoretical maximum. 
Unlike a traditional HPF DST, the slope can be vertical -- a note is either 
filtered out, or kept in.

#### Example C: A "Long-Pass" Filter

Similar how Example B was able to filter out items from a list based on the 
pitch of the items in the list, we can also apply a similar effect across the 
dimension of time to achieve a novel transformation:

<pre><code><note-list>h h s h e q w s w e</note-list>.forEach( removeIfShorterThan(<note>q</note>) )
// --> <note-list>h h h q w w</note-list></code></pre>

*Explanation of the above computation: This transformation demonstrates a 
function that sets a predicate of <code>x &gt; <note>q</note></code>, where `x` 
is successively each item in the list. Only the notes that cause the tested 
predicate to be `true` will be present in the resulting output list.*

