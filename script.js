const caracteresVálidos = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
    "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
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
const contenidoEmergente = document.getElementById("contenidoEmergente");
const mensajeEmergente = document.getElementById("mensajeEmergente");
const cerrarEmergente = document.getElementById("cerrarEmergente");

btnEncriptar.addEventListener("click", encriptación);
function encriptación(){
    const texto = textarea1.value;
    if(texto === ""){
        mostrarVentanaEmergente("Ingrese un texto, por favor");
        return;
    }

    if(!esMinúsculaTodo(texto)){
        mostrarVentanaEmergente("Solo letras minúsculas, no mayúsculas, no acentos, no caracteres especiales, no números");
        textarea1.value = "";
        return;
    }

    const textoEncriptado = encriptarTexto(texto);
    textarea2.innerHTML = `El texto encriptado es: ${textoEncriptado}`;
}

function esMinúsculaTodo(texto){
    return [...texto].every(letra => caracteresVálidos.includes(letra));
}

function encriptarTexto(texto){
    return texto.split("").map(letra => valoresEncriptados[letra] || letra).join("");
}

btnDesEncriptar.addEventListener("click", desEncriptación);
function desEncriptación(){
    const texto = textarea1.value;
    if(texto === ""){
        mostrarVentanaEmergente("Ingrese un texto, por favor");
        return;
    }

    if(!esMinúsculaTodo(texto)){
        mostrarVentanaEmergente("Solo letras minúsculas, no mayúsculas, no acentos, no caracteres especiales, no números");
        textarea1.innerHTML = "";
        return;
    }

    const textoDesEncriptado = desencriptarTexto(texto);
    textarea2.innerHTML = `El texto desencriptado es: ${textoDesEncriptado}`;
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
            textoDesEncriptado += texto.substring(i, i + 1);
        }
    }
    return textoDesEncriptado;
}

btnCopiar.addEventListener("click", copiarTexto);
function copiarTexto(){
    const textoCopiar = document.getElementById("textoYaModificado").value;
    if(textoCopiar === ""){
        mostrarVentanaEmergente("Ingrese un texto primero");
        return;
    }
    navigator.clipboard.writeText(textoCopiar)
    .then(() => {
        mostrarVentanaEmergente("¡Texto copiado al portapapeles!");
    })
    .catch(err => {
        console.error('Error al copiar el texto: ', err);
        mostrarVentanaEmergente("Error al copiar el texto. Por favor, cópielo manualmente.");
    });
    textarea1.value = "";
    textarea2.value = "";
}

function mostrarVentanaEmergente(mensaje){
    mensajeEmergente.textContent = mensaje;
    ventanaEmergente.classList.add("mostrar");
}

cerrarEmergente.addEventListener("click", () => {
    ventanaEmergente.classList.remove("mostrar");
});