 _IDEA9103_Creative Coding_Major Project_

# User Input Animation

### Overview:

The interactive animation is a dynamic, user-responsive interpretation of the ['Wheels of Fortune'](https://www.artsy.net/artwork/pacita-abad-wheels-of-fortune) by Pacita Abad. The interactive artwork has themes of playfulness, brilliant colour, and repetition with Wheels of Fortune, but it also includes human control and dynamic, real-time changes, which are absent in Abad's static work. While Abad's piece emphasises visual richness and significance through its static design, the interactive elements in my interpretation delivers an evolving, customised experience in which the user can affect the outcome in ways that Abad's work cannot. 

The design evolved from the first group code, which used static patterns. This iteration includes mouse and keyboard movements that animate in order to bring the patterns to life, resulting in a more immersive experience.
_______________________________________________________________________________________________
### Interaction instructions:

There are 3 types of interactions:

>**1. Interaction with mouse movement:** 
To dynamically adjust the number of dotted concentric rings, move your mouse vertically over the screen.

![Dot Rings Based on Mouse Position](readmeImages/1.gif)

_This symbolises how we percieve fortune only in abundance._

>**2. Interaction with mouse click:** 
Toggle between the zig-zag and the dotted concentric circular pattern by clicking on the pattern.

![Pattern Toggle on Click](readmeImages/2.gif)

_This symbolises how quickly fortune can become mistfortune and vice-versa._

>**3. Interaction activated by space bar and controlled by mouse position:**
Press the spacebar to activate the 'move-away' efect. The circle patterns within a specific proximity radius will ease away from the cursour in a ripple effect. To exit the 'move-away' effect, press space bar again. Refresh to go back to original interactive artwork.

![Move-Away Effect on Spacebar Press](readmeImages/3.gif)

_This shows how chasing fortune does not guarantee that it will be attained._
_______________________________________________________________________________________________

### Approach to Animation:

I concentrated on interaction-driven animation, which allows users to control and explore the art dynamically. This technique distinguishes itself from audio, Perlin noise, and time-based animations by emphasising real-time user interaction.

>__1. Dot Rings Based on Mouse Position:__ The amount of concentric rings of dots in each pattern varies according to the vertical mouse position (mouseY). The number of rings is maximum when the position of the mouse is at the bottom of the window and least when it is at the top of the window.

>__2. Pattern Toggle on Click:__ Clicking on each circle toggles the pattern between dot and zigzag designs, resulting in a new composition each time.

>__3. Move-Away Effect on Spacebar Press:__ When you press the spacebar, patterns within a certain radius move smoothly away from the mouse, generating a distinctive ripple effect around the cursor.
_______________________________________________________________________________________________

### Inspiration:

I was inspired by moving geometric patterns and ripple effects in nature, such as water ripples and wave propagation. 
![Water Ripples](data:image/jpeg;base64,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)

I also looked at dynamic animations in which patterns respond to human interaction, which influenced how I animated the 'move-away' effect. The concept was inspired by open-source ripple and wave animations from p5.js community examples.
_________________________________________________________________________________________________

### Technical Explanation:

- The _numRings_ variable varies based on the vertical mouse position, ranging from 1 to 20 rings. 
`numRings = map(mouseY, 0, height, 1, 20);`

- Using _constrain()_, ensures the values are within this range.
`numRings = constrain(numRings, 1, 20);`

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

