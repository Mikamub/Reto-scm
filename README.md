# Reto SCM
### Mikaella Muñoz. 

## Reto Practico
### Montar proyecto con Docker
```
docker build -t reto-scm-docker .
```
### Correr Proyecto con Docker
```
docker run -p 3000:3000 reto-scm-docker
```
### Sin docker
```
npm install
```
```
npm start
```
## Reto Teorico
#### ¿Cómo harías una transformación para hacer un gráfico de líneas que muestre el planificado (horarios semanales) versus demanda de personal?.

* Antes de empezar cualquier gráfico, lo primero sería ordenar la data, ya sea la de demanda de trabajadores y/o el horario de estos, para así sacar los posibles errores o datos innecesarios (como los horarios en que el local o lugar de trabajo esté cerrado). Posteriormente, uniría ambas tablas o data por horario, para que sea más accesible la información y poder manipularla de la mejor manera. Ya teniendo esto listo, el siguiente paso sería definir el eje X e Y; en este caso, elegiría el eje X para las horas en las que el lugar esté funcionando y el eje Y para la suma de la demanda y la suma de los trabajadores en ese horario, ambos datos de colores distintos para lograr hacer la comparación entre ellos. Al tener de esta forma los datos, se podría ver si hace falta personal o no y en qué horarios.

#### ¿Cómo trabajarías para realizar un gráfico para que este tipo de datos (nulos y/o outliers) no afecten en la ilustración?

* Lo primero que haría en este caso sería revisar los datos y ver si alguno de estos outliers o nulos se puede recuperar. Deberíamos averiguar qué pasó con ellos, si se perdieron o si hay algún error en los datos. En caso de que no se puedan recuperar o encontrar, lo siguiente sería calcular el promedio de los datos y reemplazar estos outliers o nulos para que no afecten los resultados finales. Otra solución sería cambiarlos por ceros o el número más bajo de la media. En su defecto, si el outlier o nulo es insignificante, borrarlo.


