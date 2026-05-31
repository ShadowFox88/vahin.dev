---
title: Modulus and Argument of Complex Numbers
description: How to write complex numbers in modulus-argument form
slug: modulus-argument

subsection: pure

created: 2025-12-08
updated: 2026-05-31
---


### COMPLEX NUMBER REPRESENTATION

An imaginary (complex) number $z$ can be written as:

$$
\begin{aligned}
z &= x + yi \\
z &= [ \;\; \underset{\begin{subarray}{c} \uparrow \\ \text{modulus} \end{subarray}}{|z|} , \quad \underset{\begin{subarray}{c} \uparrow \\ \text{argument} \end{subarray}}{\text{arg}(z)} \;\; ]
\end{aligned}
$$

---

### Other forms


$z = x + iy$ can be rewritten as:

$$
\begin{aligned}
z &= |z|\cos(\theta) + i|z|\sin(\theta) \\
z &= |z|(\cos(\theta) + i\sin(\theta)) \\
\therefore z &= |z|\operatorname{cis}(\theta) && \text{where } \operatorname{cis}(\theta) = \cos(\theta) + i\sin(\theta)
\end{aligned}
$$

---

### Degrees and Radians

To switch between degrees and radians, use these constants:

$$
\boxed{1^\circ = \frac{\pi}{180}} \quad \boxed{1 \text{ rad} = \frac{180}{\pi}}
$$


| Degrees | Radians |
|---------|---------|
| $360^\circ$ | $2\pi$ |
| $270^\circ$ | $\frac{3}{2}\pi$ |
| $180^\circ$ | $\pi$ |
| $135^\circ$ | $\frac{3}{4}\pi$ |
| $90^\circ$ | $\frac{1}{2}\pi$ |
| $60^\circ$ | $\frac{1}{3}\pi$ |
| $45^\circ$ | $\frac{1}{4}\pi$ |
| $30^\circ$ | $\frac{1}{6}\pi$ |
---

### Finding the Modulus and Argument

Finding the modulus of a complex number is very simple, we just use Pythagoreas' Theorem.

$$
\begin{aligned}
z &= x + yi \\
|z| &= \sqrt{x^2+y^2}
\end{aligned}
$$

The **argument** of a complex number $z = x + iy$ is the angle $\theta$ made with the positive real axis ($\text{cis}(\theta)$). Because $\tan(\theta) = \frac{y}{x}$, we use the signs of $x$ and $y$ to determine the correct quadrant.


First, find the reference angle: $\alpha = \tan^{-1} \left| \frac{y}{x} \right|$.

| Quadrant | Location | Signs | Calculation | Range of $\theta$ |
| :--- | :--- | :--- | :--- | :--- |
| **I** | Upper Right | $x > 0, y > 0$ | $\theta = \alpha$ | $0 < \theta < \frac{\pi}{2}$ |
| **II** | Upper Left | $x < 0, y > 0$ | $\theta = \pi - \alpha$ | $\frac{\pi}{2} < \theta < \pi$ |
| **III** | Lower Left | $x < 0, y < 0$ | $\theta = -(\pi - \alpha)$ | $-\pi < \theta < -\frac{\pi}{2}$ |
| **IV** | Lower Right | $x > 0, y < 0$ | $\theta = -\alpha$ | $-\frac{\pi}{2} < \theta < 0$ |