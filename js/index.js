const canvas = document.getElementById("canvas")
const sizeSelect = document.getElementById('sizeSelect')
const colors = document.getElementById('colors')
const controls = document.getElementById('controls')
const header = document.getElementById('header')
canvas.height = window.innerHeight-header.getBoundingClientRect().height-10
canvas.width = window.innerWidth

const ctx = canvas.getContext("2d")
let draw = false
window.addEventListener("mousedown", (e) => draw = true)
window.addEventListener("mouseup", (e) => draw = false)

let prevX = null
let prevY = null
ctx.lineWidth = 5

window.addEventListener("mousemove", (e) => {
    if(prevX == null || prevY == null || !draw){
        prevX = e.clientX
        prevY = e.clientY-header.getBoundingClientRect().height-10
        return
    } 

    let currentX = e.clientX
    let currentY = e.clientY-header.getBoundingClientRect().height-10

    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()

    prevX = currentX
    prevY = currentY
})


sizeSelect.addEventListener('change',(e)=>{
    ctx.lineWidth = e.target.value
})


let colorsArray = ['red','blue','green','yellow','orange','purple','black','cyan']
colorsArray.map(item=>{
    let child = document.createElement('div')
    child.className = 'color'
    child.id = item
    child.style.backgroundColor = item
    child.addEventListener('click',()=>{
        ctx.strokeStyle = item;
    })
    colors.insertBefore(child,colors.firstChild)
})

let saveBtn = document.getElementById("saveBtn")
saveBtn.addEventListener("click", () => {
    let data = canvas.toDataURL("imag/png")
    let a = document.createElement("a")
    a.href = data
    a.download = "drawing.png"
    a.click()
})

let clearBtn = document.getElementById("clearBtn")
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

