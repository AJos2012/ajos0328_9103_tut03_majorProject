// Global variables
let mainRadius = 120; // Radius of the main circle
let spacingX = mainRadius * 2 + 10; /* Ensure circles are at least 10px apart horizontally */
let spacingY = mainRadius * 2 + 10; /* Ensure circles are spaced vertically based on their size + extra space */
let startX = 100; /* Starting x position cutting the first circlePattern, making it harder to notice the diagonal column design */
let startY = 100; // Starting y position to accommodate multiple rows
let yStep = -20; // Prevents patterns from being built in a straight line vertically
let xStep = 50; // Prevents patterns from being built in a straight line horizontally

/* Array to store circle patterns 
The array helps to manage the circles to which interaction can be added
Also helps in managing the circle patterns when window is resized*/
let patterns = []; 

// Initial no. of rings for dots pattern
let numRings = 1; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);  // Set colour mode to HSB
  background('teal');

  // Increase the number of circles that overflow the canvas size
  let numCirclesX = floor((width + startX) / spacingX) + 2; 
  let numCirclesY = floor((height + startY) / spacingY) + 2; 

  // No. of circles to draw based on the canvas size
  let numCircles = numCirclesX * numCirclesY;

  // Loop to draw the patterns at different x and y positions
  for (let i = 0; i < numCircles; i++) {
    /* Calculates the circles in each row by dividing the index by the number of circles per row
    Changed from 49 circles in each row from group code*/
    let rows = floor(i / numCirclesX); 
    let cols = i - rows * numCirclesX; // Calculate the column position
    let x = startX + cols * spacingX - rows * xStep; // Shift x position for each row
    let y = startY + rows * spacingY + cols * yStep; /* Adjust y position based on the row, adding vertical space */

    // Saturation and brightness adjusted from group code
    let hue = random(360);
    let saturation = random(50, 80);
    let brightness = random(80, 90);

    // Only 1 out of 9 circles will have the zigzag pattern
    let isZigzag = (i % 9 === 0); 
    
    let pattern = new CirclePattern(x, y, mainRadius, hue, saturation, brightness, isZigzag);
     // Circle pattern is stored in the array
    patterns.push(pattern);
    pattern.draw(); // Draw each circle pattern
  }
}

function draw() {
  background('teal');

  /* Update numRings based on mouse position 
  The pattern will have 1 ring when mouse is at the top most part of the screen
  The pattern will have 20 rings when mouse is at the bottom most part of the screen*/
  numRings = map(mouseY, 0, height, 1, 20);
  numRings = constrain(numRings, 1, 20);

  // Draw all patterns with current positions and numRings
  for (let pattern of patterns) {
    pattern.draw();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup(); // Redraw circles when window is resized
}

  /* This function is to toggle between zigzag or dot pattern on mouse click */
function mousePressed() {
   for (let pattern of patterns) {
    let d = dist(mouseX, mouseY, pattern.x, pattern.y);
    if (d < mainRadius) { // Checks if mouse is inside the circle bounds
      pattern.togglePattern();
    }
  }
}

class CirclePattern {
  constructor(x, y, mainRadius, hue, saturation, brightness, isZigzag) {
    this.x = x; // x position of the pattern center
    this.y = y; // y position of the pattern center
    this.mainRadius = mainRadius; // Radius of the circle
    this.hue = hue; // Pre-generated hue for all dots in this circle
    this.saturation = saturation; // Pre-generated saturation for all dots
    this.brightness = brightness; // Pre-generated brightness for all dots
    this.isZigzag = isZigzag; // Boolean to decide whether to draw zigzag or dots

    this.innerColors = this.generateColors(); // Initially generate the colors
  }

  // Colours updated from group code
  generateColors() {
    let predefinedColors = [
    color(4, 45, 100), 
  color(23, 32, 90), 
  color(37, 26, 92),  
  color(198, 15, 72),  
  color(201, 60, 95),  
  color(4, 57, 81)
    ]; 
    return shuffle(predefinedColors).slice(0, 3); // Randomly select three colors
  }
  
  // Toggle between zigzag and dots pattern
  togglePattern() {
    this.isZigzag = !this.isZigzag;
  }

    // Draws concentric rings of dots
  drawDotsInCircle() {
    let dotSize = 5; // Size of dots

    // Draw concentric rings of dots
    for (let ring = 1; ring < numRings; ring++) {
      let radius = ring * this.mainRadius / numRings; // Selecting the radius of each ring
      let numDots = floor(TWO_PI * radius / (dotSize * 1.2)); // Number of dots for the ring with some spacing

      for (let i = 0; i < numDots; i++) {
        let angle = i * TWO_PI / numDots;
        let dotX = this.x + radius * cos(angle); // X position for the dot
        let dotY = this.y + radius * sin(angle); // Y position for the dot

        noStroke();
        fill(this.hue, this.saturation, this.brightness);
        circle(dotX, dotY, dotSize); // Draw the dot
      }
    }
  }

  // Draws a zigzag pattern inside the circle
  drawZigzagPattern() {
    let outerRadius = this.mainRadius * 0.9; // Outer radius of zigzag, so that it doesn't go past the rim of the beige circle
    let innerRadius = outerRadius * 2 / 3; // Inner rim at 2/3 of the outer radius

    // Draw the beige-filled circle
    fill('beige');
    noStroke();
    circle(this.x, this.y, this.mainRadius * 2); // Circle with beige fill

    // Set up the brown zigzag line
    stroke('brown');
    strokeWeight(3);

    let angle = 0; // Initial angle
    let angleStep = radians(3); // Angle step of 3 degrees in radians
    let numZigzags = 120; // Number of zigzag segments

    beginShape();

    for (let i = 0; i < numZigzags; i++) {
      // Line from inner rim to outer rim
      let innerX = this.x + innerRadius * cos(angle); // X position on the inner rim
      let innerY = this.y + innerRadius * sin(angle); // Y position on the inner rim
      vertex(innerX, innerY); // Draw to the inner rim

      // Update angle for the next step
      angle += angleStep;

      // Line from outer rim back to inner rim at a new angle
      let outerX = this.x + outerRadius * cos(angle); // X position on the outer rim
      let outerY = this.y + outerRadius * sin(angle); // Y position on the outer rim
      vertex(outerX, outerY); // Draw from outer rim to inner rim

      // Update angle for the next iteration
      angle += angleStep;
    }

    endShape();
  }

  // Draws inner circles with predefined colors
  drawInnerCircles() {
    let smallRadius = 15; // Starting radius of the smallest inner circle
    let numCircles = 9; // Number of circles around the inner circle

    // Draw the smallest gold circle at the center
    fill("white");
    noStroke();
    circle(this.x, this.y, smallRadius * 2);

    // Draw 9 circles with increasing radius, same center
    strokeWeight(6);
    noFill(); // No fill for the circles around the smallest inner circle

    // Alternate between the three chosen colours, out of the six predefined colours
    for (let i = 0; i < numCircles; i++) {
      let currentRadius = smallRadius + i * 5; // Increase radius for each circle
      stroke(this.innerColors[i % 3]);  // Alternate between the three chosen colours
      circle(this.x, this.y, currentRadius * 2);  // Draw each circle
    }
  }

  draw() {
    if (this.isZigzag) {
      this.drawZigzagPattern(); // Draw the zigzag pattern
    } else {
      this.drawDotsInCircle(); // Draw the circle filled with concentric dot patterns
    }
    this.drawInnerCircles(); // Draw the inner concentric circles with predefined colours
  }
}
