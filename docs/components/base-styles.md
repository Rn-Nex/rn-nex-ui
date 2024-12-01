# BaseStyles Interface

### Overview

The `BaseStyles` interface provides a mapping of style properties used in React Native development. These styles can be accessed and applied to components for consistent styling throughout your application.

## Props

| Property    | Description                | Usage                                                                          |
| ----------- | -------------------------- | ------------------------------------------------------------------------------ |
| p           | Padding                    | Specifies the padding space around an element.                                 |
| px          | Horizontal Padding         | Specifies the horizontal padding space around an element.                      |
| py          | Vertical Padding           | Specifies the vertical padding space around an element.                        |
| ps          | Padding Start              | Specifies the padding space at the start of an element.                        |
| pe          | Padding End                | Specifies the padding space at the end of an element.                          |
| pt          | Padding Top                | Specifies the padding space at the top of an element.                          |
| pb          | Padding Bottom             | Specifies the padding space at the bottom of an element.                       |
| m           | Margin                     | Specifies the margin space around an element.                                  |
| mx          | Horizontal Margin          | Specifies the horizontal margin space around an element.                       |
| my          | Vertical Margin            | Specifies the vertical margin space around an element.                         |
| ms          | Margin Start               | Specifies the margin space at the start of an element.                         |
| me          | Margin End                 | Specifies the margin space at the end of an element.                           |
| mt          | Margin Top                 | Specifies the margin space at the top of an element.                           |
| mb          | Margin Bottom              | Specifies the margin space at the bottom of an element.                        |
| r           | Border Radius              | Specifies the radius of the element's corners.                                 |
| ret         | Border Top End Radius      | Specifies the radius of the top end corner of the element.                     |
| rlt         | Border Top Left Radius     | Specifies the radius of the top left corner of the element.                    |
| ree         | Border End End Radius      | Specifies the radius of the end end corner of the element.                     |
| rrt         | Border Top Right Radius    | Specifies the radius of the top right corner of the element.                   |
| rse         | Border Start End Radius    | Specifies the radius of the start end corner of the element.                   |
| res         | Border Start End Radius    | Specifies the radius of the start end corner of the element.                   |
| rst         | Border Top Start Radius    | Specifies the radius of the top start corner of the element.                   |
| reb         | Border Bottom End Radius   | Specifies the radius of the bottom end corner of the element.                  |
| rlb         | Border Bottom Left Radius  | Specifies the radius of the bottom left corner of the element.                 |
| rss         | Border Start Start Radius  | Specifies the radius of the start start corner of the element.                 |
| rrb         | Border Bottom Right Radius | Specifies the radius of the bottom right corner of the element.                |
| rsb         | Border Bottom Start Radius | Specifies the radius of the bottom start corner of the element.                |
| pos         | Position                   | Specifies the positioning method of an element.                                |
| posB        | Position Bottom            | Specifies the bottom position of an element.                                   |
| posL        | Position Left              | Specifies the left position of an element.                                     |
| posR        | Position Right             | Specifies the right position of an element.                                    |
| posT        | Position Top               | Specifies the top position of an element.                                      |
| index       | Z-Index                    | Specifies the stack order of an element.                                       |
| w           | Width                      | Specifies the width of an element.                                             |
| h           | Height                     | Specifies the height of an element.                                            |
| minW        | Minimum Width              | Specifies the minimum width of an element.                                     |
| minH        | Minimum Height             | Specifies the minimum height of an element.                                    |
| maxW        | Maximum Width              | Specifies the maximum width of an element.                                     |
| maxH        | Maximum Height             | Specifies the maximum height of an element.                                    |
| color       | Color                      | Specifies the text color of an element.                                        |
| family      | Font Family                | Specifies the font family of an element's text.                                |
| size        | Font Size                  | Specifies the font size of an element's text.                                  |
| style       | Font Style                 | Specifies the font style of an element's text.                                 |
| weight      | Font Weight                | Specifies the font weight of an element's text.                                |
| lSpacing    | Letter Spacing             | Specifies the spacing between characters in an element's text.                 |
| lHeight     | Line Height                | Specifies the height of each line of text in an element.                       |
| dLine       | Text Decoration Line       | Specifies the decoration line type for text in an element.                     |
| dStyle      | Text Decoration Style      | Specifies the decoration style for text in an element.                         |
| dColor      | Text Decoration Color      | Specifies the decoration color for text in an element.                         |
| sColor      | Shadow Color               | Specifies the color of the shadow for an element.                              |
| sOpacity    | Shadow Opacity             | Specifies the opacity of the shadow for an element.                            |
| sOffset     | Shadow Offset              | Specifies the offset of the shadow for an element.                             |
| sRadius     | Shadow Radius              | Specifies the radius of the shadow for an element.                             |
| transform   | Text Transform             | Specifies the text transformation for an element.                              |
| select      | User Select                | Specifies the user selection behavior for an element.                          |
| align       | Align Content              | Specifies the alignment of content within a flex container.                    |
| content     | Justify Content            | Specifies the alignment of content along the main axis of a flex container.    |
| items       | Align Items                | Specifies the alignment of items within a flex container.                      |
| self        | Align Self                 | Specifies the alignment of an individual flex item within a flex container.    |
| ratio       | Aspect Ratio               | Specifies the aspect ratio of an element.                                      |
| d           | Display                    | Specifies the display behavior of an element.                                  |
| end         | End                        | Specifies the end position of an element.                                      |
| f           | Flex                       | Specifies the flexibility of an element within a flex container.               |
| fBasis      | Flex Basis                 | Specifies the initial size of a flex item in a flex container.                 |
| fDirection  | Flex Direction             | Specifies the direction of the main axis in a flex container.                  |
| rGap        | Row Gap                    | Specifies the gap between rows in a grid container.                            |
| gap         | Gap                        | Specifies the gap between grid items in a grid container.                      |
| cGap        | Column Gap                 | Specifies the gap between columns in a grid container.                         |
| fGrow       | Flex Grow                  | Specifies the ability of a flex item to grow to fill available space.          |
| fShrink     | Flex Shrink                | Specifies the ability of a flex item to shrink if necessary.                   |
| wrap        | Flex Wrap                  | Specifies whether flex items should wrap if they exceed the container's width. |
| bVisibility | Backface Visibility        | Specifies the visibility of the backface of an element.                        |
| bg          | Background Color           | Specifies the background color of an element.                                  |
| o           | Opacity                    | Specifies the opacity level of an element.                                     |
| e           | Elevation                  | Specifies the elevation level of an element.                                   |
| pEvents     | Pointer Events             | Specifies whether an element can be the target of pointer events.              |
| c           | Cursor                     | Specifies the type of cursor to display when hovering over an element.         |
| bColor      | Border Color               | Specifies the border color of an element.                                      |
| bWidth      | Border Width               | Specifies the width of the border of an element.                               |
| overflow    | Overflow                   | Specifies how content that overflows the element's box is handled.             |
