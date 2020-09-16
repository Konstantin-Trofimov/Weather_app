function init() {
    let cityName = 'Moscow'
    getWeather(cityName)
    showHint();
    buttonAnimation('button')
    buttonAnimation('hide')
    document.querySelector('.button').addEventListener('click', getCityName)
}

document.querySelector('.search').onkeydown = (e) => {
    if (e.key == 'Enter') {
        getCityName()
    }
}

function getCityName() {
    cityName = document.querySelector('.search').value
    getWeather(cityName)
}

function getWeather(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=486a3aec30033a9b09d5a6e3b9216892`)
        .then(resp => { return resp.json() })
        .then(data => {
            if (data.cod == '200') {
                document.querySelector('.city-name').textContent = data.name
                document.querySelector('.temp').innerHTML = Math.round(data.main.temp - 273) + '&deg;'
                document.querySelector('.descr').textContent = data.weather[0]['description']
                document.querySelector('.icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`
                document.querySelector('.humidity').textContent = data.main.humidity + '%'
                document.querySelector('.pressure').textContent = Math.round(data.main.pressure * 0.75006375541921) + ' mmHg'
                document.querySelector('.visibility').textContent = checkVis(data.visibility)
                document.querySelector('.wind-speed').textContent = data.wind.speed + ' m/s'
            } else {
                document.querySelector('.city-name').textContent = data.message
                document.querySelector('.temp').textContent = 404
                document.querySelector('.descr').textContent = ''
                document.querySelector('.icon').innerHTML = '<img src="public/icons/sad_face.svg">'
                document.querySelector('.humidity').textContent = ''
                document.querySelector('.pressure').textContent = ''
                document.querySelector('.visibility').textContent = ''
                document.querySelector('.wind-speed').textContent = ''
            }
        })
        .catch(() => { })
}

function buttonAnimation(elem) {
    document.querySelector(`.${elem}`).addEventListener('mouseenter', (e) => {
        e.target.classList.add('violet')
        e.target.classList.remove('blue')
    })
    document.querySelector(`.${elem}`).addEventListener('mouseleave', (e) => {
        e.target.classList.add('blue')
        e.target.classList.remove('violet')
    })
}

function showHint() {
    const search = document.querySelector('.search'),
        hint = document.querySelector('.hint')

    search.addEventListener('focus', (e) => {
        setTimeout(() => {
            let val = e.target.value.length
            if (val === 0) {
                hint.classList.add('active')
                setTimeout(() => {
                    hint.classList.remove('active')
                }, 10000)
            }
        }, 3500)
    })

    search.addEventListener('blur', () => {
        hint.classList.remove('active')
    })
}

function checkVis(visibility) {
    let data = Math.round(visibility / 1000) + ' km'
    if (isNaN(visibility)) {
        return 'no data'
    }
    else {
        return data;
    }
}


$(function () {
    function showInfo(elem) {
        $(`.${elem}`).on('click', () => {
            $('.other-info').transition('fade down')
        })
    }

    showInfo('info')
    showInfo('hide')
})


init()

