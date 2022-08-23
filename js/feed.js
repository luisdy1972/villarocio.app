const avatar = "https://cdn.pixabay.com/photo/2016/11/14/17/39/person-1824147_960_720.png"
const feedAncianos = document.getElementById('feed-ancianos')
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

let wilmer = new anciano('p1', avatar, 'Wilmer Burgos', 'Secretario', 'https://docs.google.com/spreadsheets/d/1260kcg8rvME4USP5QRlAR5FyhcnZ19pOyBG9_y4fc4k/edit?usp=sharing', 'https://docs.google.com/spreadsheets/d/1dsy0N6IAZy4H7434fP8sxW4WiAwPNrgssNHZrlFZQXU/edit#gid=1386834576', '');
let cesar = new anciano('p2', avatar, 'César Pineda', 'Coordinador', 'https://docs.google.com/spreadsheets/d/12rdRLPr7TP003ycwxrJxa1AUpamN_TfB8qmOL4rSusY/edit?usp=sharing', 'https://docs.google.com/spreadsheets/d/1PwTuC48MChnDwOb9NxdNvZ6SiiScGyzZ87qonzuuHTg/edit#gid=1386834576', '');
let melquiades = new anciano('p3', avatar, 'Melquiades Garces', 'Super de Servicio', 'https://docs.google.com/spreadsheets/d/1OTwtR0rGCVEcuUIBV2PONe9u9yCurywYBCxF3KtqD6o/edit#gid=721237620', 'https://docs.google.com/spreadsheets/d/1_m3jXk2cgc6jDj9XiMungP0NO-RUh9N0G6SBBPa_ucM/edit#gid=1386834576', 'https://docs.google.com/spreadsheets/d/1RlSSHVHKMvuBQzJ_xdrTpC4aTWLO7Ex2i3jPlC9uEJM/edit');

let cuerpoAncianos = [wilmer, cesar, melquiades]
let cardsAnciano


cuerpoAncianos.forEach((anciano) => {
	// console.log(anciano);
	cardsAnciano = `
	<div class="card shadow">
		<ul class="nav">
			<li>
				<a class="btn btn-secondary mt-2 id="boton${anciano.nombre}">Copiar</a>
			</li>
		</ul>
	
		<img src="${anciano.avatar}"/>
		<div class="card-body">
			<h5 class="card-title">${anciano.nombre}</h5>
			<p class="card-text">${anciano.responsabilidad}</p>
	
			<a href="${anciano.linkInforme}"
				target="_blank" rel="noopener noreferrer" class="btn btn-primary">Informe</a>
	
			<a href="${anciano.linkAgenda}"
				target="_blank" rel="noopener noreferrer" class="btn btn-secondary">Agenda</a>
	
		</div>
	</div>
	`
	feedAncianos.innerHTML+=cardsAnciano
})