App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',
    hasBuy: false,

    //Inicializar la libreria Web3
    init: function() {
        return App.initWeb3();
    },

    initWeb3: function() {

        if (typeof web3 !== 'undefined') {
            // Si Metamask ya proporciona una instancia web3.
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            //Si no especifique la instancia predeterminada si no se proporciona una instancia web3
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            web3 = new Web3(App.web3Provider);
        }
        return App.initContract();
    },

    //Inicializar Contrato
    initContract: function() {
        $.getJSON("Mercado.json", function(mercado) {
            // Crea una instancia de un nuevo contrato usando truffle
            App.contracts.Mercado = TruffleContract(mercado);
            // Conexion con el provedor que interactua con el contrato
            App.contracts.Mercado.setProvider(App.web3Provider);

            App.listenForEvents();
            $("#productos").empty();
            return App.render();
        });
    },

    //Eventos del contrato
    listenForEvents: function() {
        App.contracts.Mercado.deployed().then(function(instance) {
            instance.eventoComprar({}).watch(function(error, event) {
                console.log("event triggered", event)
                $("#productos").empty();
                return App.render();
            });
        });
    },

    render: function() {
        var instanciaMercado;
        var loader = $("#loader");
        var content = $("#content");

        loader.show();
        content.hide();

        // Cargar informacion de la cuenta
        web3.eth.getCoinbase(function(err, account) {
            if (err === null) {
                App.account = account;
                $("#accountAddress").html("DIRECCION LOCAL: " + account);
            }
        });

        // Cargar informacion del contrato
        App.contracts.Mercado.deployed().then(function(instance) {
            instanciaMercado = instance;
            return instanciaMercado.contadorProductos();
        }).then(function(contadorProductos) {

            $("#productos").empty();

            for (var i = 1; i <= contadorProductos; i++) {
                console.log(i);
                instanciaMercado.productos(i).then(function(Producto) {
                    var id = Producto[0];
                    var name = Producto[1];

                    var tarjeta = '<div class="card" onclick="$(\'#id_producto\').text(' + id + '); $(\'#nombre_producto\').text(\'' + name.toString() + '\')">' +
                        '<div class="card-body">' +
                        '<h5 class="card-title">' + name + '</h5>' +
                        '</div>' +
                        '</div>';

                    $("#productos").append(tarjeta);
                });
            }
            return instanciaMercado.compras(App.account);
        }).then(function(hasBuy) {
            if (hasBuy) {

            }
            loader.hide();
            content.show();
        }).catch(function(error) {
            console.warn(error);
        });
    },

    //Cuando se realice una compra
    emitirCompra: function() {
        var productoSeleccionado = parseInt($('#id_producto').text());
        console.log(productoSeleccionado);
        App.contracts.Mercado.deployed().then(function(instance) {
            return instance.comprar(productoSeleccionado, { from: App.account });
        }).then(function(result) {
            $("#content").hide();
            $("#loader").show();
        }).catch(function(err) {
            console.error(err);
        });
    }
};

$(function() {
    $(window).load(function() {
        App.init();
    });
});