const selectTab = document.querySelector('#selectTab')
const table = document.querySelector('#postTable')
const tbody = table.firstElementChild

const getPost = async function () {
    try {
        const val = selectTab.options[selectTab.selectedIndex].value

        const res = await axios.post('/introduce_admin/getPost/', { "tabnum": val })

        const posts = res.data.posts
        const th = tbody.firstElementChild

        const trs = tbody.querySelectorAll('tr')

        trs.forEach(tr => {
            if (tr !== th) {
                tr.remove()
            }
        })

        if (posts.length > 0) {
            th.firstElementChild.textContent = selectTab.options[selectTab.selectedIndex].textContent
            const isEquip = selectTab.value == 3

            posts.forEach(post => {
                const tr = document.createElement('tr')
                tr.classList.add('table__row')

                const td = document.createElement('td')
                td.classList.add('row__item')

                const a = document.createElement('a')
                a.setAttribute('href', `/introduce_admin/detailPost/${post.id}`)
                a.textContent = isEquip ? `${post.title}/${post.subtitle}` : `${post.title}`
                td.appendChild(a)

                tr.appendChild(td)
                tbody.appendChild(tr)
            });
        } else {
            th.firstElementChild.textContent = selectTab.options[selectTab.selectedIndex].textContent
        }
    }
    catch (e) {
        alert(e.message)
    }
}



getPost()