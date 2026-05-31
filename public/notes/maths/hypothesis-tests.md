---
title: Hypothesis Testing
description: Procedures for 1-tail and 2-tail tests using Binomial Distributions
slug: hypothesis-testing

subsection: statistics
created: 2025-10-12
updated: 2026-06-01
---

## 1-Tail Test Example
**Null Hypothesis ($H_0$):** The assumption that there is no effect or change.  
**Alternative Hypothesis ($H_1$):** The claim we are testing for.

$$
\begin{aligned}
H_0 &: p = \frac{1}{2} \\
H_1 &: p < \frac{1}{2}
\end{aligned}
\quad \quad X \sim B\left(10, \frac{1}{2}\right) \quad \text{where } X \text{ represents the no. Heads thrown.}
$$

---

### Result & Analysis
* **Result:** $x = 2$
* **Significance Level:** 5%

> **Rule:** We will reject $H_0$ if the probability of getting our result is **less than** our significance level.

$$
\begin{array}{cl}
P(x \leq 2) = 0.0547 & (4 \text{ d.p}) \\
\uparrow & \\
\text{p-value} & 
\end{array}
$$

**Definition:** The **p-value** is the probability of obtaining a result as extreme as yours.

**Conclusion:**
* $0.0547 > 5\%$, so we **do not** reject our model.
* $\therefore$ **NOT SIGNIFICANT** and thus do not reject $H_0$.
* At the 5% level, the evidence is not strong enough to suggest the coin is biased against heads.

---

## 2-Tail Test Example

$$
\begin{aligned}
H_0 &: p = \frac{1}{2} \\
H_1 &: p \neq \frac{1}{2}
\end{aligned}
\quad \quad X \sim B\left(10, \frac{1}{2}\right) \quad \text{where } X \text{ represents the no. heads.}
$$

### Result & Analysis
* **Significance Level:** 5% (Note: In a 2-tail test, we compare the p-value to $2.5\%$ at each tail).
* **Result:** 9 heads.


$$
\begin{aligned}
P(X \geq 9) &= 1 - P(X \leq 8) \\
&= 0.0107 \\
0.0107 &< 2.5\%
\end{aligned}
$$

**Conclusion:**
* $\therefore$ **SIGNIFICANT** and thus **reject $H_0$**.
* At the 5% level, the evidence suggests the coin is biased. (It appears biased towards heads).