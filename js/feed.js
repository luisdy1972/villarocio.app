const avatar = "https://cdn.pixabay.com/photo/2016/11/14/17/39/person-1824147_960_720.png"
const feedAncianos = document.getElementById('feed-ancianos')
const feedMinisteriales = document.getElementById('feed-ministeriales')
const feedLinks = document.getElementById('feed-links')

class hermano {
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
//  ancianos
let wilmer = new hermano('p1', avatar, 'Wilmer Burgos', 'Secretario', 'https://docs.google.com/spreadsheets/d/15tWmAB7zr0RT-kuDyWyVZOl_c1gP421uff1xv_wRLjw/edit', 'https://docs.google.com/spreadsheets/d/1dsy0N6IAZy4H7434fP8sxW4WiAwPNrgssNHZrlFZQXU/edit#gid=1386834576')
let cesar = new hermano('p2', avatar, 'César Pineda', 'Coordinador', 'https://docs.google.com/spreadsheets/d/12rdRLPr7TP003ycwxrJxa1AUpamN_TfB8qmOL4rSusY/edit?usp=sharing', 'https://docs.google.com/spreadsheets/d/1PwTuC48MChnDwOb9NxdNvZ6SiiScGyzZ87qonzuuHTg/edit#gid=1386834576')
let melquiades = new hermano('p3', avatar, 'Melquiades Garces', 'Super de Servicio', 'https://docs.google.com/spreadsheets/d/1OTwtR0rGCVEcuUIBV2PONe9u9yCurywYBCxF3KtqD6o/edit#gid=721237620', 'https://docs.google.com/spreadsheets/d/1_m3jXk2cgc6jDj9XiMungP0NO-RUh9N0G6SBBPa_ucM/edit#gid=1386834576', 'https://docs.google.com/spreadsheets/d/1RlSSHVHKMvuBQzJ_xdrTpC4aTWLO7Ex2i3jPlC9uEJM/edit')
let jose = new hermano('p4', avatar, 'José Novoa', 'Anciano de Congregación', 'https://docs.google.com/spreadsheets/d/1EdUjtGZZOxJRRLlTkqCwySARkjz1FHV8Lc1vNXDb_TM/edit?usp=sharing', 'https://docs.google.com/spreadsheets/d/1dMN17q2yGUFGO9C0K1QQC8ZcvbDXCw7_w5TJ4Qo7s7k/edit?usp=sharing')
let rodrigo = new hermano('p5', avatar, 'Rodrigo Villalba', 'Atalaya', 'https://docs.google.com/spreadsheets/d/1Hg4oawsDyxiAmsV5BPBrJCWhBjPkQzMv8D3vkuEMUtU/edit?usp=sharing', 'https://docs.google.com/spreadsheets/d/16teflqeUkAmNUkIr0jciWJcQCmuHLfpn-xLggo1MF2E/edit')
let jairo = new hermano('p6', avatar, 'Jairo Villalba', 'Vida y Ministerio', 'https://docs.google.com/spreadsheets/d/1hp1T2iJRlMa24HQbPIzvp002VZk4erQtpU3ri6oXrNM/edit', 'https://docs.google.com/spreadsheets/d/1zzdFI86hw3OBCHiKVJjCCyLVFLD8y0DY-cmsTrzJMWc/edit')
let eliecer = new hermano('p7', avatar, 'Eliecer Velasquez', 'Anciano de Congregación', '#', 'https://docs.google.com/spreadsheets/d/1fggBG4xalMkk1exW_pb8Sdx80h7gP4DUfHhrKinvEf8/edit#gid=1386834576')
let miguel = new hermano('p8', avatar, 'Miguel Geney', 'Anciano de congragación', 'https://docs.google.com/spreadsheets/d/1260kcg8rvME4USP5QRlAR5FyhcnZ19pOyBG9_y4fc4k/edit?usp=sharing', 'https://docs.google.com/spreadsheets/d/15p8njbaE1YOXcZ7DYopzRLSxuLMMEGFvs5xwfkPwEoY/edit#gid=1386834576')

// ministeriales
let luisAyala = new hermano('p9', '', 'Luis Ayala', 'Siervo Ministerial', '', 'https://docs.google.com/spreadsheets/d/1LawWTO8dbZfwMhlEjouLjph7_OsMGHFa1Qk31enudKQ/edit#gid=1386834576', '')
let jabesHoyos = new hermano('p10', '', 'Jabes Hoyos', 'Siervo Ministerial', '', '#',)
let manuelGonzalez = new hermano('p11', '', 'Manuel Gonzalez', 'Siervo Ministerial', '', '#',)

let ancianos = []
ancianos.push(cesar, wilmer, melquiades, rodrigo, jairo, jose, miguel)

let ministeriales = []
ministeriales.push(luisAyala, jabesHoyos, manuelGonzalez)

let cardsAnciano
ancianos.forEach((anciano) => {
	cardsAnciano = `
	<div class="card shadow ">
		<div class="nav">
				<div class="btn btn-secondary mt-2 top-50 start-50" onclick="copiarAlPortapapeles('${anciano.ID}')">Copiar</div>
		</div>
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
ancianos.forEach(
	(anciano) => {
		linkInvisible = `
	<div id="${anciano.ID}">${anciano.linkInforme}</div>
	`
		feedLinks.innerHTML += linkInvisible
	})

let cardsMinsteriales
ministeriales.forEach(
	(ministerial) => {
		cardsMinsteriales = `
		<div class="col-sm-12 card shadow">
		<div class="card-body">
			<h5 class="card-title">${ministerial.nombre}</h5>
			<p class="card-text">${ministerial.responsabilidad}</p>
			<a href="${ministerial.linkAgenda}"
				rel="noopener noreferrer" target="_blank" class="btn btn-primary">Agenda</a>
		</div>
	</div>`
		feedMinisteriales.innerHTML += cardsMinsteriales
	})
	// fucion