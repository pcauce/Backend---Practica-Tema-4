<?php
    // 1. Iniciamos la sesión PHP
    session_start();

    /* 2. Las sesiones se actualizan mediante JavaScript.
    Almacenamos los datos enviados a través de una solicitud POST en la variable $data,
    que son posteriormente decodificados, ya que se reciben en formato JSON*/
    $data = file_get_contents('php://input');
    $decodedData = json_decode($data, true);

    /* 3. Antes de actualizar el contenido del carrito, hemos de verificar que se haya
    Recibido una solicitud POST y que, por lo tanto, el contenido de la variable de
    sesión no esté vacío*/
    if ($decodedData && isset($decodedData['cartContent'])) {
        $_SESSION["cartContent"] = $decodedData['cartContent'];
    }
?>

<!DOCTYPE html>
<html lang="en" data-language="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <link rel="stylesheet" href="./styles/modern-normalize.css">
    <link rel="stylesheet" href="./styles/global.css">
    <link rel="stylesheet" href="./styles/components/header.css">
    <link rel="stylesheet" href="./styles/components/home.css">
    <script src="/dist/typeScript/products.js" defer type="module"></script>
    <script src="/dist/typeScript/cart.js" defer type="module"></script>
    <script src="/dist/typeScript/theme.js" defer type="module"></script>
    <script src="/dist/typeScript/language.js" defer type="module"></script>
    <script defer>
        /* Establecemos un listener para que antes de que el cliente navegue
        a otra página, se actualice la variable de sesión encargada de almacenar
        el conntenido del carrito*/
        const cart = document.querySelector('.cart-items');

        window.addEventListener('beforeunload', () => {
            updateCartSession(cart.innerHTML);
        });
    </script>
</head>

<body>
<header>
    <h1 data-text-code="shop" class="home-link">Tienda</h1>
    <div>
        <a href="register.php" class="header-link" data-text-code="login">Iniciar Sesión</a>
        <button class="language" data-text-code="language">Idioma</button>
        <button class="theme" data-text-code="theme">Tema</button>
    </div>
</header>

<main>
    <div class="categories" data-current="toys">
        <h2 data-text-code="catalogue">Catálogo</h2>
        <nav class="category-list">
            <ul>
                <li class="category" data-text-code="toys">Juguetes</li>
                <li class="category" data-text-code="books">Libros</li>
                <li class="category" data-text-code="videogames">Videojuegos</li>
                <li class="category" data-text-code="movies">Películas</li>
                <li class="category" data-text-code="bottles">Botellas</li>
                <li class="category" data-text-code="radios">Radios</li>
            </ul>
        </nav>
    </div>
    <div class="products">

    </div>
    <div class="cart">
        <h2 data-text-code="cart">Carrito</h2>
        <div class="cart-items" data-content="">
            <?php
                /* Por defecto, el contenido de carrito siempre está vacío al cargar la página.
                El contenido del carrito se actualiza de forma dinámica mediante la variable de sesión
                $_SESSION["cartContent"], siempre y cuando esta non esté vacía*/
                if (isset($_SESSION["cartContent"])) echo $_SESSION["cartContent"];
            ?>
        </div>
    </div>
</main>
</body>
</html>