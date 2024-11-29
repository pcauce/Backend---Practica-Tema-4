<!DOCTYPE html>
<html lang="en" data-language="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link rel="stylesheet" href="./styles/modern-normalize.css">
    <link rel="stylesheet" href="./styles/global.css">
    <link rel="stylesheet" href="./styles/components/header.css">
    <link rel="stylesheet" href="./styles/components/register.css">
    <script src="/dist/typeScript/theme.js" defer type="module"></script>
    <script src="/dist/typeScript/language.js" defer type="module"></script>
</head>

<body>
<header>
    <a href="home.php" class="home-link"><h1 data-text-code="shop">Tienda</h1></a>
    <div>
        <a href="register.php" class="header-link" data-text-code="login">Iniciar Sesión</a>
        <button class="language" data-text-code="language">Idioma</button>
        <button class="theme" data-text-code="theme">Tema</button>
    </div>
</header>

<main>
    <form class="register" action="" method="post">
        <h2>Registro:</h2>
        <label>
            Correo Electrónico
            <input type="email" name="email" required>
        </label>
        <div>
            <label>
                Contraseña
                <input type="password" name="password" required>
            </label>
            <label>
                Confirmar Contraseña
                <input type="password" name="confirm_password" required>
            </label>
        </div>
        <button type="submit">Registrarme</button>
    </form>
    <form class="login" action="" method="post">
        <h2>Inicio de Sesión:</h2>
                <label>
                    Correo Electrónico
                    <input type="email" name="email" required>
                </label>
                <label>
                    Contraseña
                    <input type="password" name="password" required>
                </label>
        <button type="submit">Iniciar Sesión</button>
    </form>
</main>
</body>
</html>