const avatar = "https://cdn.pixabay.com/photo/2016/11/14/17/39/person-1824147_960_720.png"
const feedAncianos = document.getElementById('feed-ancianos')
const feedMinisteriales = document.getElementById('feed-ministeriales')
const feedLinks = document.getElementById('feed-links')

class anciano {
	constructor(ID, foto, nombre, responsabilidad, linkInforme, linkAgenda, linkTerritorio) {
		this.ID = ID
		this.avatar = foto
		this.nombre = nombre
		this.responsabilidad = responsabilidad
		this.linkInforme = linkInforme
		this.linkAgenda = linkAgenda
		this.linkTerritorio = linkTerritorio

	}
}

let wilmer = new anciano('p1', avatar, 'Wilmer Burgos', 'Secretario', 'https://docs.google.com/spreadsheets/d/1260kcg8rvME4USP5QRlAR5FyhcnZ19pOyBG9_y4fc4k/edit?usp=sharing', 'https://docs.google.com/spreadsheets/d/1dsy0N6IAZy4H7434fP8sxW4WiAwPNrgssNHZrlFZQXU/edit#gid=1386834576')
let cesar = new anciano('p2', avatar, 'César Pineda', 'Coordinador', 'https://docs.google.com/spreadsheets/d/12rdRLPr7TP003ycwxrJxa1AUpamN_TfB8qmOL4rSusY/edit?usp=sharing', 'https://docs.google.com/spreadsheets/d/1PwTuC48MChnDwOb9NxdNvZ6SiiScGyzZ87qonzuuHTg/edit#gid=1386834576')
let melquiades = new anciano('p3', avatar, 'Melquiades Garces', 'Super de Servicio', 'https://docs.google.com/spreadsheets/d/1OTwtR0rGCVEcuUIBV2PONe9u9yCurywYBCxF3KtqD6o/edit#gid=721237620', 'https://docs.google.com/spreadsheets/d/1_m3jXk2cgc6jDj9XiMungP0NO-RUh9N0G6SBBPa_ucM/edit#gid=1386834576', 'https://docs.google.com/spreadsheets/d/1RlSSHVHKMvuBQzJ_xdrTpC4aTWLO7Ex2i3jPlC9uEJM/edit')
let jose = new anciano('p4', avatar, 'José Novoa', 'Anciano de Congregación', 'https://docs.google.com/spreadsheets/d/1EdUjtGZZOxJRRLlTkqCwySARkjz1FHV8Lc1vNXDb_TM/edit?usp=sharing', 'https://docs.google.com/spreadsheets/d/1dMN17q2yGUFGO9C0K1QQC8ZcvbDXCw7_w5TJ4Qo7s7k/edit?usp=sharing')
let rodrigo = new anciano('p5', avatar, 'Rodrigo Villalba', 'Atalaya', 'https://docs.google.com/spreadsheets/d/1Hg4oawsDyxiAmsV5BPBrJCWhBjPkQzMv8D3vkuEMUtU/edit?usp=sharing', 'https://docs.google.com/spreadsheets/d/16teflqeUkAmNUkIr0jciWJcQCmuHLfpn-xLggo1MF2E/edit')
let jairo = new anciano('p6', avatar, 'Jairo Villalba', 'Vida y Ministerio', 'https://docs.google.com/spreadsheets/d/1hp1T2iJRlMa24HQbPIzvp002VZk4erQtpU3ri6oXrNM/edit', 'https://docs.google.com/spreadsheets/d/1zzdFI86hw3OBCHiKVJjCCyLVFLD8y0DY-cmsTrzJMWc/edit')
let eliecer = new anciano('p7', avatar, 'Eliecer Velasquez', 'Anciano de Congregación', 'https://docs.google.com/spreadsheets/d/15tWmAB7zr0RT-kuDyWyVZOl_c1gP421uff1xv_wRLjw/edit', 'https://docs.google.com/spreadsheets/d/1fggBG4xalMkk1exW_pb8Sdx80h7gP4DUfHhrKinvEf8/edit#gid=1386834576')
let miguel = new anciano('p7', avatar, 'Miguel Geney', 'Anciano de congragación', '', 'https://docs.google.com/spreadsheets/d/15p8njbaE1YOXcZ7DYopzRLSxuLMMEGFvs5xwfkPwEoY/edit#gid=1386834576')
let cuerpoAncianos = []
cuerpoAncianos.push(cesar, wilmer, melquiades, rodrigo, jairo, jose, eliecer, miguel)

let cardsAnciano
cuerpoAncianos.forEach((anciano) => {
	cardsAnciano = `
	<div class="card shadow">
		<ul class="nav">
			<li>
				<a class="btn btn-secondary mt-2" onclick="copiarAlPortapapeles('${anciano.ID}')">Copiar
				</a>
			</li>
		</ul>
		<img src="${anciano.avatar}"/>
		<div class="card-body bodybotones">
			<h5 class="card-title">${anciano.nombre}</h5>
			<p class="card-text">${anciano.responsabilidad}</p>
			<a href="${anciano.linkInforme}"target="_blank" rel="noopener noreferrer" class="btn btn-primary">Informe</a>
			<a href="${anciano.linkAgenda}"target="_blank" rel="noopener noreferrer" class="btn btn-secondary">Agenda</a>
		</div>
	</div>
	`
	feedAncianos.innerHTML += cardsAnciano
})

let linkInvisible
cuerpoAncianos.forEach((anciano) => {
	linkInvisible = `
	<div id="${anciano.ID}">${anciano.linkInforme}</div>
	`
	feedLinks.innerHTML += linkInvisible
})

let alertCopi = `<div class="alert alert-primary alert-copi" role="alert">¡Enlace copiado!</div>`