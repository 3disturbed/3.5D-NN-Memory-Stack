/**
 * ------------------------------------------
 * Memory Class: 3D-Indexed Nodes with 2D Arrays
 * ------------------------------------------
 * 
 * This class implements a memory substrate where:
 *    - Each node is identified by 3D coordinates (xx, yy, zz).
 *    - The 'value' of each node is stored as a 2D array (rows x cols).
 * 
 * Key Features:
 *    1. Dynamically Creates Nodes:
 *       - When you attempt to set data at (xx, yy, zz), a node is created if it doesn't exist.
 *    2. Flexible 2D Array (XY):
 *       - Each node's 'value' is a 2D array (e.g., value[rowIndex][colIndex]).
 *       - The array can automatically expand if you try to write out of current bounds.
 *    3. Get/Set Methods:
 *       - setMatrix(xx, yy, zz, matrix): Overwrites the entire 2D array of a node.
 *       - getAllData(xx, yy, zz): Retrieves the entire 2D array.
 *       - set(xx, yy, zz, row, col, newValue): Sets a single cell in the 2D array.
 *       - get(xx, yy, zz, row, col): Retrieves a single cell in the 2D array.
 *    4. Tracking Addresses:
 *       - Each (xx, yy, zz) coordinate is converted into a string "xx,yy,zz" 
 *         and stored in 'usedAddresses' for reference.
 *    5. Update Method:
 *       - A placeholder function that demonstrates how to iterate over all nodes
 *         and adjust values (e.g., set them all to 1). In practice, you can replace 
 *         this with logic for read/write gates or custom update rules.
 * 
 * Usage Example:
 *    const memory = new Memory();
 *    memory.setMatrix(0, 0, 0, [
 *      [1, 2, 3],
 *      [4, 5, 6],
 *    ]);
 *    console.log(memory.getAllData(0, 0, 0)); 
 *    // => [ [1, 2, 3], [4, 5, 6] ]
 * 
 *    // Sets node (0,1,2) to a 6-row, 4-col array with most values = 0 
 *    // except row=5, col=3 => 42
 *    memory.set(0, 1, 2, 5, 3, 42);
 *    console.log(memory.getAllData(0, 1, 2));
 * 
 * Considerations:
 *    - You can expand this idea to handle more dimensions, e.g., (xx, yy, zz, tt).
 *    - For large-scale usage, be mindful of memory consumption when dynamically expanding arrays.
 *    - The update method is a placeholder and may require custom logic for real-world applications.
 */

export default class Memory {
    constructor() {
        this.nodes = [];                 // Stores all nodes
        this.usedAddresses = new Set();  // Tracks used (xx,yy,zz) addresses
    }

    /**
     * Generate a string address from x,y,z coordinates.
     * E.g., "0,0,0" for the origin.
     */
    generateAddress(xx, yy, zz) {
        return `${xx},${yy},${zz}`;
    }

    /**
     * Find a node by its coordinates, or return undefined if not found.
     */
    findNode(xx, yy, zz) {
        return this.nodes.find(
            (node) => node.xx === xx && node.yy === yy && node.zz === zz
        );
    }

    /**
     * Create a new node if it doesn't exist already, and return it.
     * Here, we initialize `node.value` to a default 2D array if needed.
     */
    createNodeIfNeeded(xx, yy, zz, rows = 0, cols = 0) {
        let node = this.findNode(xx, yy, zz);
        if (!node) {
            node = {
                xx,
                yy,
                zz,
                // Default: create an empty 2D array
                value: Array.from({ length: rows }, () => Array(cols).fill(0))
            };
            this.nodes.push(node);

            // Generate a string address and mark it as used
            const address = this.generateAddress(xx, yy, zz);
            this.usedAddresses.add(address);
        }
        return node;
    }

    /**
     * Get the entire 2D array from the node at (xx, yy, zz).
     */
    getAllData(xx, yy, zz) {
        const node = this.findNode(xx, yy, zz);
        if (!node) {
            throw new Error("Invalid address");
        }
        return node.value;
    }

    /**
     * Get a specific cell within the node's 2D array at (xx, yy, zz).
     * rowsIndex, colsIndex => positions in the 2D array.
     */
    get(xx, yy, zz, rowIndex, colIndex) {
        const node = this.findNode(xx, yy, zz);
        if (!node) {
            throw new Error("Invalid address");
        }
        if (
            rowIndex >= 0 && rowIndex < node.value.length &&
            colIndex >= 0 && colIndex < node.value[rowIndex].length
        ) {
            return node.value[rowIndex][colIndex];
        } else {
            throw new Error("Index out of bounds");
        }
    }

    /**
     * Set or overwrite the node’s entire 2D array at (xx, yy, zz).
     * If the node doesn't exist, create it.
     * 'matrix' must be an array of arrays, e.g. [[1,2,3],[4,5,6]]
     */
    setMatrix(xx, yy, zz, matrix) {
        const rows = matrix.length;
        const cols = rows > 0 ? matrix[0].length : 0;

        const node = this.createNodeIfNeeded(xx, yy, zz, rows, cols);
        node.value = matrix;
    }

    /**
     * Set a specific cell in the 2D array at (xx, yy, zz).
     * If the node doesn't exist yet, you must decide how many rows/cols to initialize.
     */
    set(xx, yy, zz, rowIndex, colIndex, newValue) {
        let node = this.findNode(xx, yy, zz);
        if (!node) {
            // If there's no node, create one with the desired size
            // Here we assume some fixed size, or you can dynamically expand as needed
            node = this.createNodeIfNeeded(xx, yy, zz, rowIndex + 1, colIndex + 1);
        }

        // Ensure rowIndex, colIndex are in range. If not, expand the matrix.
        this.expandMatrixIfNeeded(node, rowIndex, colIndex);

        // Set the cell value
        node.value[rowIndex][colIndex] = newValue;
    }

    /**
     * Utility method to expand the 2D array if rowIndex/colIndex
     * are outside the current array bounds.
     */
    expandMatrixIfNeeded(node, rowIndex, colIndex) {
        const currentRows = node.value.length;
        const currentCols = currentRows > 0 ? node.value[0].length : 0;

        // Expand rows if needed
        while (node.value.length <= rowIndex) {
            // Add a new row of zeros
            node.value.push(Array(currentCols).fill(0));
        }

        // Re-check currentCols in case we just added rows
        const updatedCols = node.value[0].length;
        // Expand columns if needed
        if (colIndex >= updatedCols) {
            // For each row, add columns
            for (let r = 0; r < node.value.length; r++) {
                while (node.value[r].length <= colIndex) {
                    node.value[r].push(0);
                }
            }
        }
    }

    /**
     * Returns [numRows, numCols] for the 2D array at (xx, yy, zz).
     */
    getDimensions(xx, yy, zz) {
        const node = this.findNode(xx, yy, zz);
        if (!node) {
            return [0, 0];
        }
        const rows = node.value.length;
        const cols = rows > 0 ? node.value[0].length : 0;
        return [rows, cols];
    }

    /**
     * Placeholder update function that might set all cells to 0, or do
     * something more sophisticated based on "gates."
     */
    update() {
        for (const node of this.nodes) {
            const shouldUpdate = true; // placeholder
            if (shouldUpdate) {
                // Example: set every cell to 1
                for (let r = 0; r < node.value.length; r++) {
                    for (let c = 0; c < node.value[r].length; c++) {
                        node.value[r][c] = 1;
                    }
                }
            }
        }
    }
}
