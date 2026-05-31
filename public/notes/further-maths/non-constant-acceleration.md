---
title: Non-Constant Acceleration
description: How to analyse motion when acceleration varies with time
slug: non-constant-acceleration

subsection: mechanics

created: 2026-04-12
updated: 2026-05-31
---

For motion in a straight line, define:
- $ x(t) $: displacement  
- $ v(t) $: velocity  
- $ a(t) $: acceleration  

### Fundamental relationships

Velocity is the rate of change of displacement:
$$
v = \frac{dx}{dt}
$$

Acceleration is the rate of change of velocity (which is the second derivative of displacement with respect to time):
$$
a = \frac{dv}{dt} = \frac{d^2x}{dt^2}
$$

### Reversing these formulae

Since to get acceleration we differentiate velocity, to get velocity we can integrate acceleration.
$$
v(t) = \int a(t)\,dt + C
$$

The same principle applies to displacement and velocity
$$
x(t) = \int v(t)\,dt + C
$$
