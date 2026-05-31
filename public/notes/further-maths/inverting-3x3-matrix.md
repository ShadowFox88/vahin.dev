---
title: Inverting a 3x3 Matrix
description: Inverting a 3x3 Matrix using the cross product.
slug: inverting-3x3-matrix

subsection: pure

created: 2026-02-06
updated: 2026-05-31
---

# Inverting a $3 \times 3$ Matrix using the Cross Product

This method utilizes the cross product of the column vectors of a matrix to find its inverse.

## 1. Define the Column Vectors
Given a matrix $M$ with column vectors $a,\; b,$ and $c$:

$$
M = \begin{pmatrix} | & | & | \\ a & b & c \\ | & | & | \end{pmatrix} = 
\begin{pmatrix} 1 & 3 & 1 \\ 0 & 4 & 1 \\ 2 & -1 & 0 \end{pmatrix}
$$

Where:
$$
a = \begin{pmatrix} 1 \\ 0 \\ 2 \end{pmatrix}, \quad b = \begin{pmatrix} 3 \\ 4 \\ -1 \end{pmatrix}, \quad c = \begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix}
$$

---

## 2. Calculate the Cross Products
We find the cross product of each pair of vectors to form the rows of the adjoint matrix:

$$
\begin{aligned}
b \times c &= \begin{pmatrix} 1 \\ -1 \\ -1 \end{pmatrix} \\
c \times a &= \begin{pmatrix} 2 \\ -2 \\ -1 \end{pmatrix} \\
a \times b &= \begin{pmatrix} -8 \\ 7 \\ 4 \end{pmatrix}
\end{aligned}
$$

---

## 3. Finding the Determinant
The determinant of a $3 \times 3$ matrix can be found using the scalar triple product. This is equivalent to the dot product of one column vector with the cross product of the other two:

$$\text{det}(M) = a \cdot (b \times c)$$

**Calculation:**
$$
\begin{aligned}
\text{det}(M) &= \begin{pmatrix} 1 \\ 0 \\ 2 \end{pmatrix} \cdot \begin{pmatrix} 1 \\ -1 \\ -1 \end{pmatrix} \\
&= (1 \times 1) + (0 \times -1) + (2 \times -1) \\
&= 1 + 0 - 2 \\
&= -1
\end{aligned}
$$

---

## 4. Construct the Inverse Matrix
The inverse matrix $M^{-1}$ is constructed by placing the transposed cross products over the determinant:

$$
\begin{aligned}
M^{-1} &= \frac{1}{\text{det}(M)} \begin{pmatrix} (b \times c)^T \\ (c \times a)^T \\ (a \times b)^T \end{pmatrix} \\
M^{-1} &= \frac{1}{-1} \begin{pmatrix} 1 & -1 & -1 \\ 2 & -2 & -1 \\ -8 & 7 & 4 \end{pmatrix}
\end{aligned}
$$