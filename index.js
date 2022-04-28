const imageCount = 8
const maxBlur = 2
const maxMaskOpacity = 0.5

// const getNextButton = (id) =>
//   `<span data-id="${id}" class="next-button">></span>`
const getDiminishingAmt = () => {
  const startDate = Date.UTC(2022, 3, 29)
  const endDate = Date.UTC(2022, 6, 6)
  const now = Date.now()
  const progress = (now - startDate) / (endDate - startDate)
  return 1 - progress
}

function toggleActive() {
  $(this).toggleClass("active")
}

let active = 1
const initialize = () => {
  for (let i = 1; i <= imageCount; i++) {
    let cls = "foto " + i
    cls += i === active ? " active" : ""
    $("#frames").prepend(`<img class="${cls}" src="fotos/${i}.jpg" alt="${i}">`)
  }

  const amt = getDiminishingAmt()

  const blurAmt = amt * maxBlur
  const blur = `blur(${blurAmt}vw)`
  $(".foto").css("filter", blur)
  $("#mask").css("filter", blur)

  const opacAmt = amt * maxMaskOpacity
  // $("#mask").css("opacity", opacAmt)

  $(".resources").click(toggleActive)
  // $(".resources").wheel(toggleActive)

  setInterval(() => {
    const nextActive = (active % imageCount) + 1
    $(".foto.active").removeClass("active")
    $(`.foto.${nextActive}`).addClass("active")
    active = nextActive
    // console.log(nextActive)
  }, 4000)
}

initialize()
