const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();

    document.getElementById("nombre").innerHTML = "Pokemon";
    document.getElementById("movimientos").innerHTML = "<b> Movimientos </b><br><br><br>";
    document.getElementById("estadisticas").innerHTML = "<b> Stats </b><br><br><br>";
    document.getElementById("tipoPokemon").innerHTML = "<b> Tipo </b><br><br><br>";
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            pokeImage("error.png")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            //console.log(data);
            let pokeImg = data.sprites.front_default;
            let nombre = data.species.name;
            let movimientos = data.abilities;
            let stats = data.stats;
            let tipos = data.types;
            setName(nombre);
            pokeImage(pokeImg);
            setMovimientos(movimientos);
            setStats(stats);
            setTypes(tipos);
        }
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

const setName = (nombre) => {
    document.getElementById("nombre").innerHTML = nombre;
}
const setMovimientos = (dataMovimientos) => {
    let listaMovimientos = "<b> Movimientos </b>";
    const movimientos = [];
    for (let index = 0; index < dataMovimientos.length; index++) {
        movimientos.push(dataMovimientos[index].ability.name);
        
    }
    
    movimientos.forEach(movimiento => {
        console.log(movimiento);
        listaMovimientos += "<p>"+ movimiento +"</p>";
    });
    document.getElementById("movimientos").innerHTML = listaMovimientos;
}
const setStats = (dataStats) => {
    let listaStats = "<b> Stats </b>";
    const stats = [];
    const nameStats = [];
    
    for (let index = 0; index < dataStats.length; index++) {
        stats.push(dataStats[index].base_stat);
        nameStats.push(dataStats[index].stat.name);
        
    }
    
    for (let index = 0; index < stats.length; index++) {
        console.log(nameStats[index]);
        console.log(stats[index]);
        listaStats += "<p>" + nameStats[index] + " -- " + stats[index] + "</p>";
    }

    document.getElementById("estadisticas").innerHTML = listaStats;
    
}
const setTypes = (dataTipos) => {
    let listaTipos = "<b> Tipo </b>";
    const tipos = [];
    for (let index = 0; index < dataTipos.length; index++) {
        tipos.push(dataTipos[index].type.name);
        
    }
    tipos.forEach(tipo => {
        console.log(tipo);
        listaTipos += "<p>"+ tipo +"</p>";
    });
    document.getElementById("tipoPokemon").innerHTML = listaTipos;
}