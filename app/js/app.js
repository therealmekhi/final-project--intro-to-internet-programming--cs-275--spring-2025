"use strict";

const container = document.getElementById(`diamond-container`);

// Funtion that forms the diamond shape
const createDiamond = (size) => {
    container.innerHTML = ``;

    const isEven = size % 2 === 0;
    const totalRows = isEven ? size + 1 : size;
    const middleRow = Math.floor(totalRows / 2);
    const totalWidth = isEven ? size + 1 : size;

    for (let i = 0; i < totalRows; i++) {
        const row = document.createElement(`div`);
        row.classList.add(`row`);

        const distance = Math.abs(middleRow - i);

        let stars;
        if (isEven) {
            if (distance === middleRow) {
                stars = 1;
            } else {
                stars = size - distance * 2;
            }
        } else {
            stars = size - distance * 2;
        }

        const spaces = Math.floor((totalWidth - (stars * 2 - 1)) / 2);

        // Add left spaces
        for (let s = 0; s < spaces; s++) {
            const space = document.createElement(`span`);
            space.classList.add(`space`);
            row.appendChild(space);
        }

        // Add stars with spacing between
        for (let j = 0; j < stars; j++) {
            const star = document.createElement(`span`);
            star.classList.add(`star`);
            star.textContent = `*`;
            row.appendChild(star);

            if (j !== stars - 1) {
                const innerSpace = document.createElement(`span`);
                innerSpace.classList.add(`space`);
                row.appendChild(innerSpace);
            }
        }

        // Adds right spaces
        for (let s = 0; s < spaces; s++) {
            const space = document.createElement(`span`);
            space.classList.add(`space`);
            row.appendChild(space);
        }

        container.appendChild(row);
    }
};

// Sliding diamond animation
const slideDiamond = () => {
    let direction = 1;
    let position = 0;

    const calculateOffsets = () => {
        const containerWidth = container.offsetWidth;
        const viewportWidth = window.innerWidth;
        return viewportWidth - containerWidth;
    };

    let maxOffset = calculateOffsets();

    setInterval(() => {
        maxOffset = calculateOffsets();

        if (position >= maxOffset) {
            direction = -1;
        } else if (position <= 0) {
            direction = 1;
        }

        position += direction * 2;
        container.style.left = `${position}px`;
    }, 5);
};

// Main function
const start = () => {
    let size;
    let validInput = false;

    while (!validInput) {
        size = parseInt(prompt(`Enter the size of your diamond as a number:`), 10);
        if (!isNaN(size) && size > 0) {
            validInput = true;
        } else {
            alert(`Please enter a valid number greater than 0`);
        }
    }

    createDiamond(size);
    slideDiamond();
};

// Called once gulp runs
start();
