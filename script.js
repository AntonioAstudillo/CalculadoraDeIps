window.onload = main;

function main(){

   let btnCalcular = document.getElementById('btnCalcular');

   btnCalcular.onclick = function(){
      let binario = {};
      let aux = generarValor();
      let arreglo = [];
      let xpr = /,/g;
      let resultado = [];

      binario.numero1 = convertirABinario(aux[0]);
      binario.numero2 = convertirABinario(aux[1]);
      binario.numero3 = convertirABinario(aux[2]);
      binario.numero4 = convertirABinario(aux[3]);
      //binario.total será un atributo de mi objeto binario, donde almacenare el valor de mi ip convertida a binario
      binario.total = '';
      binario.total += binario.numero1;

      binario.total += binario.numero2;
      binario.total += binario.numero3;
      binario.total += binario.numero4;
      //Convierto las comas en espacios en blanco mediante mi metodo replace
      binario.total = binario.total.replace(xpr,' ');

      //El metodo from, convierte un String a un Arreglo
      binario.total = Array.from(binario.total);

      //Le quito los espacios en blanco a mi arreglo
      binario.total = quitarEspacios(binario.total);

      //Creo un arreglo de 1 y ceros, los 1 seran correspondientes al prefijo que el usuario eliga
      arreglo = llenarArreglo();


      //codigo para obtener Broadcast
      //
      //Invierte el arreglo, los 1 seran 0 , y los 0 seran 1
      resultado = invertirDireccionRed(arreglo);

      //Hago una suma de mis dos arreglo, el de red y el invertido
      resultado = sumarRed(resultado , binario.total);

      //convierte mi arreglo binario en decimal
      resultado = convertirADecimal(resultado);


      //Codigo para obtener direccion de red
      arreglo = comprobarArreglos(arreglo , binario.total);
      arreglo = convertirADecimal(arreglo);

      //Muestro los resultados en el DOM
      document.getElementById('ipRed').value = arreglo[0] + '.' + arreglo[1] + '.' + arreglo[2] + '.' + arreglo[3];
      document.getElementById('broadcast').value = resultado[0] + '.' + resultado[1] + '.' + resultado[2] + '.' + resultado[3];
      document.getElementById('ipsDRed').value = cantidadDeIps();
      document.getElementById('ipsUtilizables').value = cantidadDeIps() - 2;
      calcularIpsHost(arreglo, resultado);
   }



}

//con esta funcion voy a calcular la cantidad de ips que tiene mi red
function cantidadDeIps(){
   let valor = document.getElementById('prefijo').value;

   return Math.pow(2, (32 - valor) );
}

//valor1 corresponde a la ip de red, y valor2 corresponde a la ip de broadcast
function calcularIpsHost(valor1 , valor2){
   let resultado = '';

   for (var i = valor1[3] + 1; i < valor2[3]; i++) {
      resultado += '<option>'+ valor1[0] + '.' + valor1[1] + '.' + valor1[2] + '.' + i; '</option>';

   }

   document.getElementById('ipsHost').innerHTML = resultado;
}


function invertirDireccionRed(arreglo){
   //obtenemos el valor de prefijo
   let valor = arreglo.length;
   let aux = [];

   for(var i = 0; i<valor; i++) {

       if(arreglo[i] == '1'){
          aux[i] = '0';
       }else{
          aux[i] = '1';
       }
   }

   return aux;
}

//Arreglo1 sera nuestra red invertida
//Arreglo2 sera nuestra red convertida a binario
function sumarRed(arreglo1, arreglo2 ){
   let aux = [];
   let len = arreglo1.length;

   for(var i = 0; i <len; i++) {
      if(arreglo1[i] == '1' || arreglo2[i] == '1'){
         aux[i] = '1';
      }else{
         aux[i] = '0';
      }
   }

   return aux;
}

function quitarEspacios(arreglo){
   let aux = [] , contador = 0;

   for (var i = 0; i < arreglo.length; i++) {

      if(arreglo[i] != ' '){
         aux[contador++] = arreglo[i];
      }
   }

   return aux;
}

function convertirADecimal(arreglo){
   let bits = [128,64,32,16,8,4,2,1];
   let resultado = [];
   let octeto = 0 , acumulador = 0 , y = 0;

   for(var i = 0; i < 32; i++) {

      if(arreglo[i] == '1'){
         acumulador = acumulador  + bits[octeto];
      }

      octeto++;

      if(octeto == 8){
         octeto = 0;
         resultado[y++] = acumulador;
         acumulador = 0;
      }
   }

   return resultado;
}

//llenamos el arreglo de prefijo
function llenarArreglo(){
   //obtenemos el valor de prefijo
   let valor = document.getElementById('prefijo').value;
   let aux = [];

   for(var i = 0; i<32; i++) {

       if(i<valor){
          aux[i] = '1';
       }else{
          aux[i] = '0';
       }
   }

   return aux;
}

function comprobarArreglos(arreglo1 , arreglo2){
   let aux = [] , contador = 0;



   for(var i=0; i<32; i++){

      if(arreglo1[i] == '1' && arreglo2[i]=='1' ){
         aux[contador++] = '1';
      }else{
         aux[contador++] = '0'
      }

   }

   return aux;
}

function convertirABinario(valor){
   let bits = [128,64,32,16,8,4,2,1];
   let aux = [] , suma = 0;


   for(let i = 0; i<8; i++){

      if( (suma + bits[i]) <= valor){

         aux[i] = '1';
         suma = parseInt(suma) + parseInt(bits[i]);
      }else{
         aux[i] = '0';
      }
   }

   return aux;

}

function generarValor(){
   let aux = [];

   aux[0] = document.getElementById('num1').value;
   aux[1] = document.getElementById('num2').value;
   aux[2] = document.getElementById('num3').value;
   aux[3] = document.getElementById('num4').value;

   return aux;

}
