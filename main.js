function PreLoader() {
    let $input = document.querySelector('.lists'),
        $ul = document.querySelector('ul.todos'),
        $save = document.querySelector('button.save')

    loadList()

    let $basket = document.querySelectorAll('.todos span'),
        $clear = document.querySelector('button.clear'),
        $showTips = document.querySelector('button.tipBtn'),
        $pensil = document.querySelector('#pencil'),
        $overlay = document.querySelector('#overlay'),
        $hideTips = document.querySelector('.closebtn')

    deleteItem()
    checkItem()
    clearList()

    $showTips.addEventListener('click', () => {
        $overlay.style.height = '100vh'
    })

    $hideTips.addEventListener('click', () => {
        $overlay.style.height = '0'
    })

    function clearList() {
        $clear.addEventListener('click', () => {
            localStorage.removeItem('list')
            $ul.textContent = ''
        })
    }

    function deleteItem() {
        for (let i = 0; i < $basket.length; i++) {
            $basket[i].addEventListener('click', function () {
                this.parentElement.remove()

            })
        }
    }

    $pensil.addEventListener('click', () => {
        $input.classList.toggle('display')
    })

    function checkItem() {
        $ul.addEventListener('click', (event) => {
            if (event.target.tagName = "LI") {
                event.target.classList.toggle('checked')
            }
        })
    }


    $input.addEventListener('keypress', function (key) {
        if (key.which == 13) {
            let text = this.value.trim()
            this.value = ''

            if (text) {
                let li = document.createElement('LI'),
                    span = document.createElement('SPAN'),
                    icon = document.createElement('I')

                icon.classList.add('fas', 'fa-trash-alt')
                span.insertAdjacentElement('afterbegin', icon)
                li.textContent = text
                li.insertAdjacentElement('afterbegin', span)
                $ul.insertAdjacentElement('beforeend', li)

                $basket = document.querySelectorAll('.todos span') //For delete item function
                deleteItem() //For delete item function
            } else {
                console.log('Wrong data!')
            }
        }
    })

    $save.addEventListener('click', () => {
        localStorage.setItem('list', $ul.innerHTML)
    })

    function loadList() {
        let list = localStorage.getItem('list')
        if (list) {
            $ul.innerHTML = list.trim()
        }
    }



}

document.addEventListener('DOMContentLoaded', PreLoader())