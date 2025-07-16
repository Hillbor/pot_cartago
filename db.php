   <?php
   $host = "localhost";
   $port = "5432"; // Puerto por defecto de PostgreSQL
   $dbname = "pot_cartago"; // Cambia esto por el nombre de tu base de datos
   $user = "postgres"; // Cambia esto por tu usuario de PostgreSQL
   $password = "pos"; // Cambia esto por tu contraseña de PostgreSQL

   $conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");
   if (!$conn) {
       die("Error en la conexión a la base de datos.");
   }
   ?>
   