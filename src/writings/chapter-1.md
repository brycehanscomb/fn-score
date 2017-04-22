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