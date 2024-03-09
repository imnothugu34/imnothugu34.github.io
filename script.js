const caracteresVálidos = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
    "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " ", 
    "\n"
];

const valoresEncriptados = {
    "a" : "ai", "e" : "enter", "i" : "imes", "o" : "ober", "u" : "ufat" 
};

const valoresDesEncriptados = {
    "ai" : "a", "enter" : "e", "imes" : "i", "ober" : "o", "ufat" : "u"
};

const textarea1 = document.getElementById("textoNoModificado");
const textarea2 = document.getElementById("textoYaModificado");
const btnEncriptar = document.querySelector(".btn-encriptar");
const btnDesEncriptar = document.querySelector(".btn-desencriptar");
const btnCopiar = document.querySelector(".copiar");
const ventanaEmergente = document.getElementById("ventanaEmergente");
const textoEmergente = document.getElementById("textoEmergente");
const cerrarEmergente = document.getElementById("cerrarEmergente");
const titulo = document.getElementById("titulo");
let esEncriptado;

btnEncriptar.addEventListener("click", encriptación);
function encriptación(){
    const texto = textarea1.value;
    if(texto === ""){
        mostrarVentanaEmergente("No se encontró ningún texto", "Ingrese un texto, por favor");
        return;
    }

    if(!esVálidoTodo(texto)){
        mostrarVentanaEmergente("Carácter no válido encontrado","No mayúsculas, no acentos, no caracteres especiales, no números");
        return;
    }

    const textoEncriptado = encriptarTexto(texto);
    textarea2.value = `El texto encriptado es: ${textoEncriptado}`;
    esEncriptado = true;
}

function esVálidoTodo(texto){
    return [...texto].every(letra => caracteresVálidos.includes(letra));
}

function encriptarTexto(texto){
    return texto.split("").map(letra => valoresEncriptados[letra] || letra).join("");
}

btnDesEncriptar.addEventListener("click", desEncriptación);
function desEncriptación(){
    const texto = textarea1.value;
    if(texto === ""){
        mostrarVentanaEmergente("No se encontró ningún texto", "Ingrese un texto, por favor");
        return;
    }
    if(!esVálidoTodo(texto)){
        mostrarVentanaEmergente("Carácter no válido encontrado", "Solo letras minúsculas, no mayúsculas, no acentos, no caracteres especiales, no números");
        return;
    }
    const textoDesEncriptado = desencriptarTexto(texto);
    textarea2.value = `El texto desencriptado es: ${textoDesEncriptado}`;
    esEncriptado = false;
}

function desencriptarTexto(texto){
    let textoDesEncriptado = "";
    for(let i = 0; i < texto.length; i++){
        if(texto.substr(i, 2) === "ai"){
            textoDesEncriptado += valoresDesEncriptados[texto.substr(i, 2)];
            i++;
        }else if(texto.substr(i, 4) === "imes" || texto.substr(i, 4) === "ober" || texto.substr(i, 4) === "ufat"){
            textoDesEncriptado += valoresDesEncriptados[texto.substr(i, 4)];
            i += 3;
        }else if(texto.substr(i, 5) === "enter"){
            textoDesEncriptado += valoresDesEncriptados[texto.substr(i, 5)];
            i += 4;
        }else{
            textoDesEncriptado += texto.substr(i, 1);
        }
    }
    return textoDesEncriptado;
}

btnCopiar.addEventListener("click", copiarTexto);
function copiarTexto(){
    let textoCopiado = textarea2.value;
    if(textoCopiado === ""){
        mostrarVentanaEmergente("No se encontró ningún texto", "Encripte o desencripte primero");
        return;
    }
    textoCopiado = textoCopiado.split("");
    let textoACopiar = "";
    for(let i = esEncriptado ? 24 : 27; i < textoCopiado.length; i++){
        textoACopiar += textoCopiado[i];
    }

    navigator.clipboard.writeText(textoACopiar)
    .then(() => {
        mostrarVentanaEmergente("Operación exitosa", "Texto copiado al portapapeles");
    })
    .catch(err => {
        console.error('Error al copiar el texto: ', err);
        mostrarVentanaEmergente("Operación no exitosa", "Error al copiar el texto. Por favor, cópielo manualmente.");
    });

    textarea1.value = "";
    textarea2.value = "";
}

function mostrarVentanaEmergente(mensajeTitulo, mensaje){
    titulo.textContent = mensajeTitulo;
    textoEmergente.textContent = mensaje;
    ventanaEmergente.classList.remove("inactive");
    ventanaEmergente.classList.remove("Animationinactive");
    ventanaEmergente.classList.add("active");
}

cerrarEmergente.addEventListener("click", () => {
    ventanaEmergente.classList.add("Animationinactive");
    setTimeout(() => {
        ventanaEmergente.classList.remove("active");
        ventanaEmergente.classList.add("inactive");
    }, 1000);
});