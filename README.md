 _IDEA9103_Creative Coding_Major Project_

# User Input Animation

### Overview:

The interactive animation is a dynamic, user-responsive interpretation of the ['Wheels of Fortune'](https://www.artsy.net/artwork/pacita-abad-wheels-of-fortune) by Pacita Abad. The interactive artwork has themes of playfulness, brilliant colour, and repetition with Wheels of Fortune, but it also includes human control and dynamic, real-time changes, which are absent in Abad's static work. While Abad's piece emphasises visual richness and significance through its static design, the interactive elements in my interpretation delivers an evolving, customised experience in which the user can affect the outcome in ways that Abad's work cannot. 

The design evolved from the first group code, which used static patterns. This iteration includes mouse and keyboard movements that animate in order to bring the patterns to life, resulting in a more immersive experience.
_______________________________________________________________________________________________
### Interaction instructions:

There are 3 types of interactions:

**1. Interaction with mouse movement:** 
To dynamically adjust the number of dotted concentric rings, move your mouse vertically over the screen.

![Dot Rings Based on Mouse Position](readmeImages/1.gif)

>_This symbolises how we percieve fortune only in abundance._

**2. Interaction with mouse click:** 
Toggle between the zig-zag and the dotted concentric circular pattern by clicking on the pattern.

![Pattern Toggle on Click](readmeImages/2.gif)

>_This symbolises how quickly fortune can become mistfortune and vice-versa._

**3. Interaction activated by space bar and controlled by mouse position:**
Press the spacebar to activate the 'move-away' efect. The circle patterns within a specific proximity radius will ease away from the cursour in a ripple effect. To exit the 'move-away' effect, press space bar again. Refresh to go back to original interactive artwork.

![Move-Away Effect on Spacebar Press](readmeImages/3.gif)

>_This shows how chasing fortune does not guarantee that it will be attained._
_______________________________________________________________________________________________

### Approach to Animation:

I concentrated on interaction-driven animation, which allows users to control and explore the art dynamically. This technique distinguishes itself from audio, Perlin noise, and time-based animations by emphasising real-time user interaction.

__1. Dot Rings Based on Mouse Position:__ The amount of concentric rings of dots in each pattern varies according to the vertical mouse position (mouseY). The number of rings is maximum when the position of the mouse is at the bottom of the window and least when it is at the top of the window.

__2. Pattern Toggle on Click:__ Clicking on each circle toggles the pattern between dot and zigzag designs, resulting in a new composition each time.

__3. Move-Away Effect on Spacebar Press:__ When you press the spacebar, patterns within a certain radius move smoothly away from the mouse, generating a distinctive ripple effect around the cursor.
_______________________________________________________________________________________________

### Inspiration:

I was inspired by moving geometric patterns and ripple effects in nature, such as water ripples and wave propagation. 
![An image of a cat](https://i.pinimg.com/564x/15/4b/9c/154b9caa6ba2f7bedfb2f4a52b49d1c9.jpg)

I also looked at dynamic animations in which patterns respond to human interaction, which influenced how I animated the 'move-away' effect. The concept was inspired by open-source ripple and wave animations from p5.js community examples.
_________________________________________________________________________________________________

### Technical Explanation:

- The _numRings_ variable varies based on the vertical mouse position, ranging from 1 to 20 rings. 
  ``` 
  numRings = map(mouseY, 0, height, 1, 20);
  ```

- Using _constrain()_, ensures the values are within this range.
  ```
  numRings = constrain(numRings, 1, 20); 
  ```
  
- Function _togglePattern()_ is triggered when the user clicks on a circle. It switches between dot and zigzag designs.
  ``` 
  togglePattern() {
  this.isZigzag = !this.isZigzag;
  }
  ```
- A _moveAway_ boolean determines whether the spacebar has been pressed. It is initially declared as false as it is triggered only when the spacebar is pressed.
`let moveAway = false; `

- If _moveAway_ is set to true in draw(), the distance from the mouse for each pattern is determined. Patterns inside the proximity radius (240px) migrate away gradually with an _easeFactor_ of 0.5. This results in a steady movement in position, with each pattern easing away by a predetermined moveAmount.
   ``` 
   let proximityRadius = 240;

  for (let pattern of patterns) {
    let distanceToMouse = dist(pattern.x, pattern.y, mouseX, mouseY);
      if (distanceToMouse < proximityRadius) {
      let dx = pattern.x - mouseX;
      let dy = pattern.y - mouseY;
      let moveAmount = 50;
      
      // Easing effect: gradually move away
      let easeFactor = 0.5; // Controls the speed of the easing
      pattern.x += (dx / distanceToMouse) * moveAmount * easeFactor;
      pattern.y += (dy / distanceToMouse) * moveAmount * easeFactor;
     }
   }
   ```

