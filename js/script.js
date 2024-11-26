// Add custom JavaScript here
let listDivImg = document.querySelectorAll('.list-img .list-img-item')
let next = document.querySelector('.next')
let prev = document.querySelector('.prev')
let imgWrap = document.querySelector('.img-wrap img')

let currentIndex = 0

setCurrent(currentIndex)

function setCurrent(index) {
	currentIndex = index
	imgWrap.src = listDivImg[currentIndex].querySelector('img').src


	listDivImg.forEach((item) => {
		item.classList.remove('active')
	})


	listDivImg[currentIndex].classList.add('active')
}

listDivImg.forEach((img, index) => {
	img.addEventListener('click', (e) => {
		setCurrent(index)
	})
})

next.addEventListener('click', () => {
	if (currentIndex == listDivImg.length - 1) {
		currentIndex = 0
	} else currentIndex++

	setCurrent(currentIndex)
})

prev.addEventListener('click', () => {
	if (currentIndex == 0) currentIndex = listDivImg.length - 1
	else currentIndex--

	setCurrent(currentIndex)
})


function increaseValue() {
	var inputElement = document.getElementById('quantityInput');
	var currentValue = parseInt(inputElement.value);
	if (currentValue < 10) { // Kiểm tra giới hạn max là 10
		inputElement.value = currentValue + 1;
	}
}

function decreaseValue() {
	var inputElement = document.getElementById('quantityInput');
	var currentValue = parseInt(inputElement.value);
	if (currentValue > 1) { // Kiểm tra giới hạn min là 1
		inputElement.value = currentValue - 1;
	}
}


  
  
  
  