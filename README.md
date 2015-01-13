# Problem-Domain
While deciding on what problem to tackle, I had to main concerns about the diagram:  my artistic abilities suck, and my handwriting sucks.   I thought "Man, I wish I had a program that could draw UMD Diagrams!"  So that is what my problem domain is.  The end-result would be a program that creates boxes and arrows which could be drawn arbitrarily anywhere on a page.

The first object would be a line.   It's properties would be a starting point and an endpoint.
The next object would be an arrow.  It would also need a starting point and an endpoint.  It would use three instances of 'line' to draw an arrow.
The next object would be a box.  It would have properties pertaining to the origin, the length, and the width, as well as what text would be inside the box.   It would use instances of 'line' to draw the box.
The final object would be the UMD Diagram.  It would use instances of box and arrow to create the diagram.  This object would actually technically be unnnecessary, as one could make a diagram using the previous objects, but I believe having helper methods and a nice constructor for this would facilitate the process.

![My Awesome Artistic Skills at work] (images/UMD_photo.jpg)
