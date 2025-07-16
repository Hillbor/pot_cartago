   <?php
   include 'db.php';

   // Realiza una consulta simple para verificar la conexión
   $result = pg_query($conn, "SELECT version();");
   if ($result) {
       $row = pg_fetch_row($result);
       echo "Conexión exitosa: " . $row[0];
   } else {
       echo "Error en la consulta.";
   }

   pg_close($conn);
   ?>
   