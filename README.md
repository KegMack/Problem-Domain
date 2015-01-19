# Problem-Domain



While deciding on what problem to tackle, I had to main concerns about the diagram:  my artistic abilities suck, and my handwriting sucks.   I thought "Man, I wish I had a program that could draw UMD Diagrams!"  So that is what my problem domain is.  The end-result would be a program that creates boxes and arrows which could be drawn arbitrarily anywhere on a page.

The first object is a point.   It's properties are an X-coordinate and a Y-coordinate.
I would do a 'line' object, but as the html5 canvas already has a simple line-drawing function, this would actually make things needlessly complex.
The next object is an arrow.  It has a starting point and an endpoint.  It uses points to draw an arrow.  It's also smart enough to decide which way the head of the arrow is drawn based on starting- and end- points.
The next object is a box.  It has properties pertaining to the origin, the length, and the width, as well as text inside the box.   It uses instances of 'point' to draw the box.
The final object is the UMD Diagram.  It uses instances of box and arrow to create the diagram.

The website has a home page, with extremely clever advertising to convince the user that he or she NEEDS to use this program.  It then has the actual program on a second page, complete with a functional UI that I would like to improve.   There are also links to the 'about' page, which explains how this program solves so many problems in the world.  I would like to expound upon that once I can find more pertinent pictures and think up some good verbiage to go along with them.

I do hope you enjoy!

![Home Page] (images/HomePage.png)
![Diagram Maker-er] (images/UML_Diagram.png)
![About page] (images/AboutPage.png)
