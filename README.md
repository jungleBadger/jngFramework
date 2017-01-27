# Set of features to handle flex grid layouts and JS components

## Intended to be required as a CommonJS module

## GUIDE

### CSS
#### .flex class
Simple display flex shortcut

#### .row class
Create a row that represent 100% of the container

#### .row element with data-items attribute
Tells the row element how many items can be flexible accommodate without breaking in another line
```html
<div class="row" "data-items="3">
```


#### .col class
Create a display flex column element

#### .col-1 to col-12 class
Col-X where X is the number of grids which the element will occupy within a row

#### .center-v class
Align container content vertically (or horizontally if the direction is changed)

#### .center-h class
Align container content horizontally (or vertically if the direction is changed)

#### .tap-element class
Touchable element with recommended specifications on mobile view port

#### .img-responsive class
Does not allow the image element overflow the container

#### .card class
Simple card element

### JS

#### Dependencies
* Window object injected or present on global
* JSDom (or equivalent) to simualate window object on Node env

#### Instantiating Framework
```js
npm install jng_framework --save
```
* from browser
```js
var jngFramework = require("jng_framework")();
```
* from node
```js
 var jsdom = require("jsdom").jsdom,
        options = {},
        window = jsdom("<html><head></head><body></body></html>", options).defaultView;
var jngFramework = require("jng_framework")(window);
```

#### DOM Handler
Set of methods that can handle gracefully DOM manipulations

Exposed as domHandler object

##### CSS Injector
Methods of domHandler exposed as domHandler.cssInjector([cssFile1, cssFile2])

Accepts an array of filePaths that will create a link element to each file and append it to Head element

Handle duplicated imports
 
##### Append Child
Methods of domHandler exposed as domHandler.appendChild(parentEl, childEl)

Accepts a parent target to insert dependencies just a suggar to window.appendChild() to handle errors

#### Modal Box
A clean implementation of a Modal Box to be fulfilled with a custom HTML template

Exposed as modalBox constructor which will accept a configuration object (TODO)
```js
var modal1 = jngFramework.modalBox();
```

##### openModal
Method of Modal Box exposed as modal1.openModal({}).

Accept a custom JSON configuration that will customize the modal box (TODO CUSTOMISATIONS)
```js
element.addEventListener("click", function () {
    modal1.openModal({});
});
```
##### closeModal
Method of Modal Box exposed as modal1.closeModal().

Closes the modal box cleaning it out the customized HTML and listeners attached on open
```js
closeBtn.addEventListener("click", function () {
    modal1.closeModal();
});
```

#### Social Box
A simple and responsive box that can be attached to a container element with your social media information

Exposed as socialBox constructor which provide the socialBox object to be further configured
```js
var socialBox = jngFramework.socialBox();
```

##### renderSocialBox
Method of socialBox that will accept three parameters:
* an array of JS object in the format declared below
* a DOM node that will be the parent container
* the side which the socialBox should be appended - accepted "left" or "right"

```js
var socialMedias = [{
    "type": "facebook",
    "profileLink": "https://www.facebook.com/daniel.abrao.35"
}, {
    "type": "github",
    "profileLink": "https://github.com/jungleBadger"
}, {
    "type": "linkedin",
    "profileLink": "https://br.linkedin.com/in/daniel-ceragioli-abrão-92935675"
}];

var socialBoxParent = document.getElementById("parentContainer");

socialBox.renderSocialBox(socialMedias, socialBoxParent, "right");
```


## TODO
* MORE FEATURES
* Implement traditional HTML script import as Window object
* Unit test
* Library documentation
* Features Demos
# portfolio
