function headerVillarocio() {
    document.write(`<div id="barraDeNavegacion" class="fixed-top">
    <nav class="navbar navbar-expand-lg bg-light shadow mb-4">
        <div class="container-fluid">
            <div class="d-flex align-items-center">
                <img id="logo-principal" src="img/Agenda-logo.png" alt="">
                <a class="link-titulo" href="index.html">
                    <h1 class="me-5">Villa Rocío</h1>
                </a>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <div class="nav-item-01 ">
                            <img src="img/arreglos.png" class="icon-nav" />
                            <a class="link-titulo"
                                href="https://docs.google.com/spreadsheets/d/1zu6e2rlRhF5km0MOOoGExKkiMhEcVvScgfbHihe5Vcc/edit?usp=sharing"
                                target="_blank">Arreglos</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <div class="nav-item-01">
                            <img src="img/mapa-con.jpg" class="icon-nav" />
                            <a class="link-titulo" href="mapa.html">Mapa</a>
                        </div>
                    </li>
                    <div class="nav-item-01">
                        <img src="img/registro-amarillo.png" class="icon-nav" />
                        <a class="link-titulo"
                            href="https://docs.google.com/spreadsheets/d/1RlSSHVHKMvuBQzJ_xdrTpC4aTWLO7Ex2i3jPlC9uEJM/edit?usp=sharing"
                            target="_blank">Territorios</a>
                    </div>

                    <li class="nav-item">
                        <div class="nav-item-01">
                            <img src="img/exhibidor.png" class="icon-nav" />
                            <a class="link-titulo"
                                href="https://docs.google.com/spreadsheets/d/10xFmblmBraNqqsYp6qDQKIIb_BEPtlAE/edit?usp=sharing&ouid=105643672118800506624&rtpof=true&sd=true"
                                target="_blank">Exhibidores</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</div>`)
}
headerVillarocio();