// SELECT - ACESSANDO A API GERAL
let selectPaises = document.querySelector('#paises');
let urlSelect = "https://restcountries.com/v3.1/all";

console.log("Fazendo a requisição...");
fetch(urlSelect)
    .then(resposta => resposta.json())      // é do fetch
    .then(paises => exibePaisesSelect(paises))    // é do json()    
    .catch(erro => console.error(erro))     // é de qualquer um
	
	
// ELEMENTOS - INFORMAÇÕES DO PAIS
let bandeira = document.querySelector("#bandeira");
let nome = document.querySelector("#nome");
let nomeOficial = document.querySelector("#nomeOficial");
let capital = document.querySelector("#capital");
let continente = document.querySelector("#continente");
let populacao = document.querySelector("#populacao");
let areaPais = document.querySelector("#area");
let moedas = document.querySelector("#dinheiro");
let idiomas = document.querySelector("#lingua");
let infoBox = document.querySelector(".infos");
let paisesFronteira = document.querySelector(".paisesFronteira");
let fronteiras = document.querySelector(".fronteiras");
let container = document.querySelector(".container");


// FUNÇÃO PARA LIMPAR OS ELEMENTOS
function limparElementos() {
	container.style.visibility = 'visible';
    infoBox.style.display = 'block';
    bandeira.innerHTML = "";
    nome.innerHTML = "";
    nomeOficial.innerHTML = "";
    capital.innerHTML = "";
    continente.innerHTML = "";
    populacao.innerHTML = "";
    areaPais.innerHTML = "";
    moedas.innerHTML = "";
    idiomas.innerHTML = "";
	paisesFronteira.innerHTML = "";
}

// FUNÇÃO PARA EXIBIR OS PAISES NO SELECT
function exibePaisesSelect(paises) {
    
	// Ordem alfabética
    paises.sort((a, b) => {
        const nomeA = a.translations.por.common.toLowerCase();
        const nomeB = b.translations.por.common.toLowerCase();
        return nomeA.localeCompare(nomeB);
    });

    for (let pais of paises) {
        let html = `		
            <option value="${pais.cca3}">${pais.translations.por.common}</option>
        `;
        selectPaises.insertAdjacentHTML("beforeend", html);
    }

	// Função para mudar o valor do select
    selectPaises.addEventListener("change", function() {
        let valorSelecionado = selectPaises.value;

		if (valorSelecionado == "Selecione") {
			container.style.visibility = 'hidden';
			fronteiras.style.visibility = 'hidden';
		} else {
			fronteiras.style.visibility = 'visible';
			infoPais(valorSelecionado);
		}
    });
}



// FUNÇÃO PARA ACESSAR A API PELO NOME DO PAIS
function infoPais(nomePais) {
	let urlInfos = "https://restcountries.com/v3.1/alpha/" + nomePais;
	
	console.log(nomePais);
	fetch(urlInfos)
		.then(resposta => resposta.json())      
		.then(pais => exibeInfoPais(pais))
		.catch(erro => console.error(erro))
}



// FUNÇÃO PARA EXIBIR AS INFORMAÇÕES DOS PAISES
function exibeInfoPais(pais) {
	limparElementos();

// Bandeira
    let html = `
        <img src="${pais[0].flags.png}"/>
    `;

    bandeira.insertAdjacentHTML('beforeend', html);
   
// Nome
    html = `
        <div id="nome">${pais[0].translations.por.common}</div>
    `;

    nome.insertAdjacentHTML('beforeend', html);
   
// Nome Oficial
    html = `
        <div id="nomeOficial">Nome Oficial: <span>${pais[0].translations.por.official}</span></div>
    `;

    nomeOficial.insertAdjacentHTML('beforeend', html);
    
// Capital
	if (pais[0].capital && pais[0].capital.length > 0) {
		html = `
			<div id="capital">Capital: <span>${pais[0].capital[0]}</span</div>
		`;

		capital.insertAdjacentHTML('beforeend', html);
	} else {
		html = `
			<div id="capital">Capital: <span> - não disponível -</span</div>
		`;

		capital.insertAdjacentHTML('beforeend', html);
		console.log("Capital não disponível");
	}

// Continente
	if (pais[0].continents && pais[0].continents.length > 0) {
		let continent = null;
		if (pais[0].continents[0] == 'Africa') {
			continent = "África";
		} else if (pais[0].continents[0] == 'Asia') {
			continent = "Ásia";
		} else if (pais[0].continents[0] == 'Europe') {
			continent = "Europa";
		} else if (pais[0].continents[0] == 'North America') {
			continent = "América do Norte";
		} else if (pais[0].continents[0] == 'South America') {
			continent = "América do Sul";
		} else if (pais[0].continents[0] == 'Oceania') {
			continent = "Oceânia";
		} else if (pais[0].continents[0] == 'Antarctica') {
			continent = "Antártida";
		}
		
		html = `
			<div id="continente">Continente: <span>${continent}</span</div>
		`;

		continente.insertAdjacentHTML('beforeend', html);
	} else {
		continente.innerHTML = " - não disponível - ";
	}

// População
    if (pais[0].population) {
		let numPopulacao = pais[0].population;
		let populacaoFormtada = numPopulacao.toLocaleString('pt-BR', { useGrouping: true });
		html = `
			<div id="populacao">População: <span>${populacaoFormtada}</span</div>
		`;
		populacao.insertAdjacentHTML('beforeend', html);
	} else {
		populacao.innerHTML = " - não disponível - ";
		console.log("População não disponível");
	}

// Área
	if (pais[0].area) {
		let valorArea = pais[0].area;
		let areaFormatada = valorArea.toLocaleString('pt-BR', { useGrouping: true });
		html = `
			<div id="area">Área: <span>${areaFormatada} km²</div>
		`;
		 areaPais.insertAdjacentHTML('beforeend', html);
	} else {
		areaPais.innerHTML = " - não disponível - ";
		console.log("População não disponível");
	}  

// Moedas
	if (pais[0].currencies) {
       
        for (let moedaCodigo in pais[0].currencies) {
            if (pais[0].currencies.hasOwnProperty(moedaCodigo)) {
                let moeda = pais[0].currencies[moedaCodigo];
                let nomeMoeda = moeda.name;
                let simboloMoeda = moeda.symbol;

                let moedaInfo = `<span id="dinheiro">${nomeMoeda} (${simboloMoeda})</span>`;
                moedas.innerHTML += moedaInfo + ", ";
            }
        }
        // Remova a vírgula extra no final
        moedas.innerHTML = moedas.innerHTML.slice(0, -2);
    } else {
        moedas.innerHTML = " - não disponível - ";
    }
	

// Idiomas
	if (pais[0].languages) {
		for (let idiomaCodigo in pais[0].languages) {
			if (pais[0].languages.hasOwnProperty(idiomaCodigo)) {
				let nomeIdioma = pais[0].languages[idiomaCodigo];

				// Exiba as informações do idioma
				idiomas.innerHTML += `<span id="lingua">${nomeIdioma}</span>` + ", ";
			}
		}
	
		// Remova a vírgula extra no final
		idiomas.innerHTML = idiomas.innerHTML.slice(0, -2);
	} else {
		idiomas.innerHTML = " - não disponível - "; 
		
	}


// FRONTEIRAS
	if (pais && pais[0] && pais[0].borders && pais[0].borders.length > 0) {
		console.log("ENTREI NO IF...");
		paisesFronteira.innerHTML = "";
		let borders = pais[0].borders.length;
		for (let i = 0;  i < borders; i++) {
			console.log(pais[0].borders[i]);
			let paisFront = pais[0].borders[i];
			
			fronteiraPaises(paisFront);			
		}
	} else {
		console.log("O país não possui fronteiras.");
		paisesFronteira.innerHTML = "O país não possui fronteiras."; 
	}
}



// FUNÇÃO PARA ACESSAR A API PELO COÓDIGO DO PAIS
function fronteiraPaises(paisFront) {
	console.log(paisFront);
	let urlCodigo = "https://restcountries.com/v3.1/alpha/" + paisFront;
	
	fetch(urlCodigo)
		.then(resposta => resposta.json())      
		.then(pais => exibeFronteira(pais))
		.catch(erro => console.error(erro))
};



// FUNÇÃO PARA EXIBIR OS NOMES DOS PAÍSES DE FRONTEIRA
function exibeFronteira(pais) {

	let html = `
		
		<span class="paisesFront" data-value="${pais[0].cca3}">
			<img src="${pais[0].flags.svg}"/> 
			<p>${pais[0].translations.por.common}</p>
		</span>
	`;
	// Verifique se o elemento já existe na lista
	if (!paisesFronteira.querySelector(`.paisesFront[data-value="${pais[0].cca3}"]`)) {
		paisesFronteira.insertAdjacentHTML('beforeend', html);
	}

	let spanFronteira = document.querySelectorAll(".paisesFront");
	
	spanFronteira.forEach((span) => {
		span.addEventListener("click", function(e) {
			let valorPersonalizado = span.getAttribute("data-value");          
			infoPais(valorPersonalizado);
			document.getElementById("paises").value = valorPersonalizado;
		});
	});

}
