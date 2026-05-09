# Rendering Test
A rendering test to ensure LaTeX and Markdown render properly.

## 1. Typography

Normal paragraph with **bold**, *italic*, ***bold italic***, ~~strikethrough~~, `inline code`, and a [link](https://example.com). Also <sup>superscript</sup> and <sub>subscript</sub>.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

---

## 2. Headings

# The Quick Brown Fox
## Jumps Over
### The Lazy Dog
#### Somewhere In
##### A Field
###### Far Away

---

## 3. Lists

### Unordered
- First item
- Second item
  - Nested first
  - Nested second
    - Deeply nested
- Third item

### Ordered
1. First item
2. Second item
   1. Sub item one
   2. Sub item two
3. Third item

### Task List
- [x] Completed task one
- [x] Completed task two
- [ ] Incomplete task one
- [ ] Incomplete task two

---

## 4. Blockquotes

> A single line blockquote with some example text inside it.

> Outer quote text
>> Inner quote text
>>> Deeply nested quote text

---

## 5. Code

### Inline

Use `example command --flag` to do something. Run `another command --verbose` to see more output.

### Python

```python
def fizzbuzz(n):
    for i in range(1, n + 1):
        if i % 15 == 0:
            print("FizzBuzz")
        elif i % 3 == 0:
            print("Fizz")
        elif i % 5 == 0:
            print("Buzz")
        else:
            print(i)

fizzbuzz(20)
```

### TypeScript

```typescript
function fizzbuzz(n: number): string[] {
    return Array.from({ length: n }, (_, i) => {
        i += 1;
        if (i % 15 === 0) return "FizzBuzz";
        if (i % 3 === 0) return "Fizz";
        if (i % 5 === 0) return "Buzz";
        return String(i);
    });
}

console.log(fizzbuzz(20));
```

---

## 6. Tables

| Column A | Column B | Column C |
|----------|----------|----------|
| Cell one | Cell two | Cell three |
| Cell four | Cell five | Cell six |
| Cell seven | Cell eight | Cell nine |

---

## 7. Images

![Example landscape image](/images/lost_in_between_by_alena_aenami.jpg)

![Another example image](/images/far_from_tomorrow_by_alena_aenami.png)

---

## 8. Inline LaTeX

Euler's identity: $e^{i\pi} + 1 = 0$

Quadratic formula: $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$

Pythagorean theorem: $a^2 + b^2 = c^2$

Bayes' theorem: $P(A|B) = \frac{P(B|A)P(A)}{P(B)}$

Standard deviation: $\sigma = \sqrt{\frac{1}{N}\sum_{i=1}^{N}(x_i - \mu)^2}$

---

## 9. Block LaTeX

$$
\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}
$$

$$
\nabla \times \mathbf{B} = \mu_0\mathbf{J} + \mu_0\varepsilon_0\frac{\partial \mathbf{E}}{\partial t}
$$

$$
\hat{f}(\xi) = \int_{-\infty}^{\infty} f(x) e^{-2\pi i x \xi} \, dx
$$

$$
\begin{pmatrix} a & b \\ c & d \end{pmatrix} \begin{pmatrix} e & f \\ g & h \end{pmatrix} = \begin{pmatrix} ae+bg & af+bh \\ ce+dg & cf+dh \end{pmatrix}
$$

$$
e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots
$$

---

## 10. Mixed Content

Paragraph with $f(x) = x^2$ inline math alongside `inline code` and **bold text** all together.

> Blockquote with inline math: the area of a circle is $A = \pi r^2$.

| Concept | Formula | Notes |
|---------|---------|-------|
| Entropy | $H = -\sum p \log p$ | Information theory |
| Energy | $E = mc^2$ | Relativity |
| Force | $F = ma$ | Newtonian mechanics |

---
