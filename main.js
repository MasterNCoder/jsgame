/*
    Welcome to easy JS graphics
    This module was built to resemble
    python's Pygame module, which the
    creator is extremely familiar to
    the creator. 
    This module's goal is to make your
    front end programming as quick and
    easy as possible. 
    Please notify Noah Hesterman if you 
    find any issues. He is still 
    learning Javascript.
    
    
    CURRENT VERSION: v1
    BUILDING VERSION: NOT CURRENTLY BUILDING
    
    
    VERSIONN 1.1 PLANS: 
    
    N/A............Not started
    
    
    
    Possible future updates: 
    
    -Images
    -Ellipses
    -Buttons
    -Text boxes
    
    
*/

// Setup variables
let windowColor = "rgb(255, 255, 255)"
let mouseX = 0
let mouseY = 0
globalThis.events = []
globalThis.keysPressed = []

/*************\
###  SETUP  ###
\*************/

export function init(canvasID) {
    const canvas = document.getElementById(canvasID)
    const ctx = canvas.getContext("2d")
    ctx.fillStyle = windowColor
    ctx.fillRect(0, 0, 1000, 500)
    globalThis.internalW = ctx
    globalThis.internalCanvas = canvas
    globalThis.mouseIsClicked = false
    
    // Start Listeners
    
    // Mouse listeners
    document.addEventListener("mousemove", handleMouseMove)
    internalCanvas.addEventListener("click", handleMouseClick)
    internalCanvas.addEventListener("mousedown", handleMouseDown)
    internalCanvas.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)

    
}

// Setup Window
export function initWindow(canvasID) {
    const canvas = document.getElementById(canvasID)
    const ctx = canvas.getContext("2d")
    ctx.fillStyle = windowColor
    ctx.fillRect(0, 0, 1000, 500)
    internalW = ctx
    return ctx
}


/**************\
###  EVENTS  ###
\**************/


/**** Event Handlers ****/
function handleMouseMove(e) {
    if (internalW) {
        const rect = internalCanvas.getBoundingClientRect()
        const mx = e.clientX - rect.left
        const my = e.clientY - rect.top
        mouseX = mx
        mouseY = my
        events.push(new Event("mouseMove"))
        
    }
}

function handleMouseDown(e) {
    events.push(new Event("mouseDown", event.button))
    
}

function handleMouseUp(e) {
    events.push(new Event("mouseUp", event.button))
    
}


function handleMouseClick(e) {
    events.push(new Event("mouseClick"))
}

function handleKeyDown(e) {
    // I don't want a new event every time
    // someone holds the key, just when they
    // press it down the first time.
    if (!keysPressed.includes(e.key)) {
        keysPressed.push(e.key)
        
        events.push(new Event("keyDown", e.key, e.code))
        
        //console.log(e.code)
    }
}


function handleKeyUp(e) {
    // I don't want a new event every time
    // someone holds the key, just when they
    // press it down the first time.
    if (keysPressed.includes(e.key)) {
        let indx = keysPressed.indexOf(e.key)
        keysPressed.splice(e.key)
        
        events.push(new Event("keyUp", e.key, e.code))
    }
}




export function getEvents() {
    try {
        return events
    
    } finally {
        events = []
    }
}

export class Event {
    constructor(type, id = Math.random, moreData = null) {
        this.type = type
        this.id = id
        
        if (this.type === "mouseClick") {
            this.positionX = mouseX
            this.positionY = mouseY
        } else if (this.type === "mouseMove") {
            this.positionX = mouseX
            this.positionY = mouseY
        } else if (this.type === "mouseDown") {
            this.positionX = mouseX
            this.positionY = mouseY
            this.button = this.id
        } else if (this.type === "mouseUp") {
            this.positionX = mouseX
            this.positionY = mouseY
        } else if (this.type === "keyDown") {
            this.key = this.id
            this.code = moreData
        } else if (this.type === "keyUp") {
            this.key = this.id
            this.code = moreData
        }
    }
}



// Mouse Position Request: Not really needed because you
// can just use the events, but it will be easier
// for people used to the old ways.
export function getMousePos() {
    return [mouseX, mouseY]
}

/******************************\
###  DRAWING and GAME LOGIC  ###
\******************************/

// Everyone's favorite part of Pygame
// .... or at least mine.
export class Rect {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.height = h
        this.width = w
    }
    
    collideRect(rect) {
        
        let rightOther = rect.x + rect.width
        let leftOther = rect.x
        let rightThis = this.x + this.width
        let leftThis = this.x
        
        let topOther = rect.y
        let bottomOther = rect.y + rect.height
        let topThis = this.y
        let bottomThis = this.y + this.height
        
        if (leftOther < rightThis && leftThis < rightOther) {
            console.log("Colliding horizontally")
            if (topThis < bottomOther && topOther < bottomThis) {
                console.log("Colliding vertically")
                return true
                
        return false
        
            }
        }
    }
    
    collidePoint(point) {
        let [x, y] = point
        
        if (x >= this.x && x <= this.x + this.width) {
            if (y >= this.y && y <= this.y + this.height) {
                return true
            }
        }
        
        return false
    }
}



export function setWindowColor(color) {
    windowColor = color
}

// Draw a rect
export function drawRect(ctx, color, rect, lineWidth = 0, radius = 0) {
    if (lineWidth === 0) {
        ctx.fillStyle = color
        if (radius === 0) {
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height)
        } else {
            ctx.roundRect(rect.x, rect.y, rect.width, rect.height, radius)
            ctx.fill()
        }
        
        
    } else {
        ctx.strokeStyle = color
        ctx.strokeWidth = lineWidth
        ctx.strokeRect(rect.x, rect.y, rect.width, rect.height)
    }
}

export function drawCircle(ctx, color, x, y, radius, borderWidth = 0) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.strokeWidth = borderWidth
    if (borderWidth === 0) {
        ctx.fill()

    } else {
        ctx.stroke()
    }
    
}

export function drawLine(ctx, color, startx, starty, endx, endy, width = 1) {
    ctx.strokeStyle = color
    ctx.beginPath();
    ctx.moveTo(startx, starty)
    ctx.lineTo(endx, endy);
    ctx.lineWidth = width;
    
    ctx.stroke()
}

export function drawPolygon(ctx, color, pointList, borderWidth = 0) {
    // Let's get this started
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.beginPath()
    
    
    // First things first...
    ctx.moveTo(pointList[0][0], pointList[0][1])
    
    // Every last one.
    for (const [x, y] of pointList.slice(1)) {
        
        // Next!
        ctx.lineTo(x, y)
        
    }

    // Safety first!
    ctx.closePath()
    // To close...
    
    if (borderWidth === 0){
        ctx.fill()
    } else {
        ctx.stroke()
    }
}


/*************************************\
###  FONT AND TEXT RENDERING LOGIC  ###
\*************************************/

export function drawText(ctx, color, font, size, text, x, y) {
    ctx.font = size + "px " + font
    ctx.fillStyle = color
    ctx.fillText(text, x, y)
}

export function getFontRect(ctx, font, size, text) {
    ctx.font = size + "px " + font
    const width = ctx.measureText(text).width
    
    return new Rect(0, 0, width, size)
}
