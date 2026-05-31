---
title: Simultaneous Equations and Matrices
description: How to solve simultaneous equations using matrices
slug: simultaneous-equations-and-matrices

subsection: pure

created: 2026-02-09
updated: 2026-05-31
---

## Overview

A system of simultaneous equations can be represented compactly using matrices. For example, the system:

$$
\left\{
\begin{array}{l}
-x + 6y - 2z = 21 \\
6x - 2y - z = -16 \\
-2x + 3y + 5z = 24
\end{array}
\right\}
\iff
\begin{bmatrix}
-1 & 6 & 2 \\
6 & -2 & -1 \\
-2 & 3 & 5
\end{bmatrix}
\begin{bmatrix} x \\ y \\ z \end{bmatrix}
=
\begin{bmatrix} 21 \\ -16 \\ 24 \end{bmatrix}
$$

## Setting Up the Matrix Equation

Label each part of the equation separately:

$$
A = \begin{bmatrix}
-1 & 6 & 2 \\
6 & -2 & -1 \\
-2 & 3 & 5
\end{bmatrix}, \qquad
B = \begin{bmatrix} x \\ y \\ z \end{bmatrix}, \qquad
C = \begin{bmatrix} 21 \\ -16 \\ 24 \end{bmatrix}
$$

This gives us the matrix equation $AB = C$. Our goal is to solve for $B$, which contains the unknowns $x$, $y$, and $z$.

## Rearranging for B

Multiplying both sides on the left by $A^{-1}$:

$$
\begin{aligned}
A^{-1}AB &= A^{-1}C \\
B &= A^{-1}C
\end{aligned}
$$

## Solving

Using the method for finding the inverse of a $3 \times 3$ matrix:

$$
\begin{aligned}
A^{-1} &= \frac{1}{189}\begin{bmatrix}
7 & 36 & 10 \\
28 & 9 & 13 \\
-14 & 9 & 34
\end{bmatrix} \\[10pt]
\therefore B &= \frac{1}{189}\begin{bmatrix}
7 & 36 & 10 \\
28 & 9 & 13 \\
-14 & 9 & 34
\end{bmatrix}
\begin{bmatrix} 21 \\ -16 \\ 24 \end{bmatrix} \\[10pt]
&= \begin{bmatrix} -1 \\ 4 \\ 2 \end{bmatrix}
\end{aligned}
$$

Therefore $x = -1$, $y = 4$, and $z = 2$.