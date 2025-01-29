# 3.5D Neural Network Memory Stack

An experimental **3.5D memory substrate** designed for advanced neural network architectures. This library provides tools to manage multi-dimensional memory nodes, integrate with an HTML5 `<canvas>` for visualization, and explore how network topologies can self-adapt through a novel approach to memory allocation and retrieval.

---

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Canvas Integration](#canvas-integration)
6. [Examples](#examples)
7. [API Reference](#api-reference)
8. [Contributing](#contributing)
9. [License](#license)

---

## Overview
This project aims to showcase a **3.5D Memory Stack** concept—somewhere between 3D and 4D—giving neural networks the flexibility of high-dimensional memory while keeping data structures more accessible than pure 4D systems. Think of it as a stepping stone to fully multi-dimensional memory architectures.

1. **Nodes in (x, y, z)**: Each node can store a 2D or multi-dimensional array (XY plane).
2. **Dynamic Expansion**: Memory auto-expands as you write to new coordinates.
3. **Adaptable**: Ideal for research into self-adjusting neural network topologies.
4. **Visualization**: Includes optional `<canvas>` usage for interactive or graphical representations.

[Back to Contents](#table-of-contents)

---

## Features
- **3D Addressing**: Store data in `(xx, yy, zz)` format with unlimited node creation.
- **2D Internal Arrays**: Each node contains a matrix or “plane” of values.
- **Auto-Expansion**: Writing to out-of-bounds indices expands the data structure seamlessly.
- **Easy Integration**: Minimal dependencies; can be integrated into existing JS codebases.
- **Canvas Rendering**: Basic optional hooks for visualizing memory access patterns on an HTML5 `<canvas>`.

[Back to Contents](#table-of-contents)

---

## Installation
To install locally:
```bash
git clone https://github.com/3disturbed/3.5D-NN-Memory-Stack.git
cd 3.5D-NN-Memory-Stack
npm install
```
Alternatively, you can install directly via a package manager (if published on npm):
```bash
npm install 3.5d-nn-memory-stack
```

[Back to Contents](#table-of-contents)

---

## Usage
Here’s a quick snippet to get you started:

```js
import Memory from '3.5D-NN-Memory-Stack';

// Create a new Memory instance
const memory = new Memory();

// Write a 2x3 matrix to coordinates (0,0,0)
memory.setMatrix(0, 0, 0, [
  [1, 2, 3],
  [4, 5, 6],
]);

// Retrieve the entire matrix
const matrix = memory.getAllData(0, 0, 0);
console.log('Matrix at (0,0,0):', matrix);

// Update a single cell, auto-expanding rows/cols as necessary
memory.set(1, 2, 3, 5, 5, 42); // (xx=1, yy=2, zz=3), row=5, col=5
console.log('Auto-expanded matrix at (1,2,3):', memory.getAllData(1, 2, 3));
```

[Back to Contents](#table-of-contents)

---

## Canvas Integration
1. **HTML Setup**  
   Create an HTML file with a `<canvas>` element:
   ```html
   <canvas id="memoryCanvas" width="600" height="400"></canvas>
   <script src="your-bundled-js.js"></script>
   ```
2. **Rendering to Canvas**  
   Use any rendering logic you like inside your code:
   ```
   const canvas = document.getElementById('memoryCanvas');
   const ctx = canvas.getContext('2d');
```
// Example: visualize memory nodes as colored squares
function renderMemory(mem) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  mem.nodes.forEach(node => {
    // Simple mapping from (xx, yy, zz) to x/y on canvas
    const xPos = node.xx * 20;
    const yPos = node.yy * 20;
    // Color logic (just an example)
    ctx.fillStyle = node.value.length ? '#66ccff' : '#cccccc';
    ctx.fillRect(xPos, yPos, 15, 15);
  });
}
```
// Suppose you call this function whenever memory is updated:
renderMemory(memory);


This approach allows you to visualize how nodes are created or expanded as your neural network or data-processing system runs.

[Back to Contents](#table-of-contents)

---

## Examples
For more detailed examples, see the [examples](./examples) folder:
1. **Simple Memory Write/Read**: Basic demonstration of auto-expansion.
2. **Neural Net Integration**: A prototype hooking memory nodes into a forward/backprop routine.
3. **Canvas Demo**: Visualization of dynamic memory addresses over time.

[Back to Contents](#table-of-contents)

---

## API Reference
Below are common methods in the `Memory` class:

| Method         | Description                                                            |
|----------------|------------------------------------------------------------------------|
| `setMatrix(xx, yy, zz, matrix)` | Overwrites the node at `(xx, yy, zz)` with a 2D array `matrix`.|
| `getAllData(xx, yy, zz)`        | Returns the entire 2D array stored in `(xx, yy, zz)`.           |
| `set(xx, yy, zz, row, col, val)`| Writes `val` into `(xx, yy, zz)`’s 2D array at `[row][col]`.    |
| `get(xx, yy, zz, row, col)`     | Reads from `(xx, yy, zz)`’s 2D array at `[row][col]`.           |
| `update()`                      | Placeholder update to demonstrate gating or control logic.       |

[Back to Contents](#table-of-contents)

---

## Contributing
Contributions are welcome! Feel free to:

- Open an issue to report a bug or suggest a feature.
- Fork the repo, make changes, and submit a pull request.
- Improve documentation or provide additional examples.

Before submitting a pull request:
1. Ensure your code passes any existing test suites (`npm test`).
2. Follow the coding style of the project.
3. Include relevant documentation if you add or modify features.

[Back to Contents](#table-of-contents)

---

## License
This project is licensed under the [MIT License](LICENSE). You’re free to use, modify, and distribute this code in both commercial and non-commercial settings.

[Back to Contents](#table-of-contents)


**How to Use This README**  
1. Save it as **`README.md`** in the root directory of your repository.  
2. Push to GitHub, and it will automatically appear as the main documentation on your project page:  
   **[GitHub: 3.5D-NN-Memory-Stack](https://github.com/3disturbed/3.5D-NN-Memory-Stack)**.  

Your new README will help users understand the library’s purpose, features, installation, and usage details at a glance, while providing an easy way to navigate the documentation via the **Table of Contents** and **Back to Contents** links.
