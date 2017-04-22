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

It has been demonstrated now that a sequence of notes can be transformed by the 
successive application of mathematical functions. For a real-life practical case
study, read on.