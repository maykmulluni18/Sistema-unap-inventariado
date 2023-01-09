// Incluimos el chrome driver
require("chromedriver");

// Incluimos selenium webdriver
let swd = require("selenium-webdriver");
let browser = new swd.Builder();
let tab = browser.forBrowser("chrome").build();

// Obtiene las credenciales del archivo JSON
let { email, pass } = require("./credenciales.json");

let { obras } = require("./obras.json");

// Paso 1: abrir la página de inicio de sesión
let tabToOpen =
    tab.get("http://localhost:3000/obras/");

let home_l =
    tab.get("http://localhost:3000/");

tabToOpen
    .then(function () {

        //  Tiempo de espera para esperar si la conexión es lenta
        let findTimeOutP =
            tab.manage().setTimeouts({
                implicit: 10000, // 10 sesungdos
            });
        return findTimeOutP;
    })
    .then(function () {

        // Paso 2 - Encontrar la entrada de nombre de usuario
        let promiseUsernameBox =
            tab.findElement(swd.By.css("#username"));
        return promiseUsernameBox;
    })
    .then(function (usernameBox) {

        // Paso 3 - Ingresar el nombre de usuario
        let promiseFillUsername =
            usernameBox.sendKeys(email);
        return promiseFillUsername;
    })
    .then(function () {
        console.log(
            "Username entered successfully in" +
            "'login'"
        );

        // Paso 4 - Encontrar la entrada de contraseña
        let promisePasswordBox =
            tab.findElement(swd.By.css("#password"));
        return promisePasswordBox;
    })
    .then(function (passwordBox) {

        // Paso 5 - Introducir la contraseña
        let promiseFillPassword =
            passwordBox.sendKeys(pass);
        return promiseFillPassword;
    })
    .then(function () {
        console.log(
            "Password entered successfully in" +
            " 'login "
        );

        // Paso 6 - Encontrar el botón Iniciar sesión
        let promiseSignInBtn = tab.findElement(
            swd.By.css(".MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeLarge.MuiButton-containedSizeLarge.MuiButton-fullWidth.iniciar.css-1tzh90c-MuiButtonBase-root-MuiButton-root")
        );

        return promiseSignInBtn;
    })

    .then(function (signInBtn) {

        // Paso 7: hacer clic en el botón Iniciar sesión
        let promiseClickSignIn = signInBtn.click();
        return promiseClickSignIn;

    })
    ////////////////////// MENU OBRA //////////////////////////////
    .then(function () {
        console.log(
            "ITEM entered successfully in" +
            " 'login "
        );

        // Paso 6 - Encontrar el botón Iniciar sesión
        let promiseSignInBtnI = tab.findElement(
            swd.By.css(".menu.menu_list.grid")
        );

        return promiseSignInBtnI;
    })

    .then(function (signInBtn) {

        // Paso 7: hacer clic en el botón Iniciar sesión
        let promiseClickSignInI = signInBtn.click();
        return promiseClickSignInI;

    })
    /////////////////   DELETE BOTTOM   //////////////////////////////
    .then(function () {
        console.log(
            "Bottom create entered successfully in" +
            "'form'"
        );
        // Paso v - Encontrar el botón 
        let createformobras = tab.findElement(
            swd.By.css(".btn.deleteButton")
        );
        return createformobras;
    })
    .then(function (signInBtn) {

        // Paso 7: hacer clic en el botón Salir sesión
        let promiseClickCreateObras = signInBtn.click();
        return promiseClickCreateObras;
    })



    ///////////////////// CONFIRM BOTTOM //////////////////////////////
    /// CANCEL
    .then(function () {
        console.log(
            "Bottom post enter successfully in" +
            "'form'"
        );
        let createformobras = tab.findElement(
            swd.By.css(".swal2-cancel.swal2-styled.swal2-default-outline")
        );
        return createformobras;
    })
    .then(function (signInBtn) {

        let promiseClickCreateObras = signInBtn.click();
        return promiseClickCreateObras;
        ///CONFRIM
        {/*
    .then(function () {
            console.log(
                "Bottom post enter successfully in" +
                "'form'"
            );
            let createformobras = tab.findElement(
                swd.By.css(".swal2-confirm.swal2-styled.swal2-default-outline")
            );
            return createformobras;
        })
        */}

    })

    ////////////////////// MESSAGE //////////////////////////////

    .then(function () {
        console.log("Successfully Sing!");
    })
    .catch(function (err) {
        console.log("Error ", err, " occurred!");
    });

