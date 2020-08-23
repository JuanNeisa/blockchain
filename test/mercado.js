var Mercado = artifacts.require("./Mercado.sol");

contract("Mercado", function(accounts) {
    var instanciaMercado;

    it("Cargando Productos", function() {
        return Mercado.deployed().then(function(instance) {
            return instance.contadorProductos();
        }).then(function(count) {
            assert.equal(count, 2);
        });
    });

    it("Productos con valores correctos", function() {
        return Mercado.deployed().then(function(instance) {
            instanciaMercado = instance;
            return instanciaMercado.productos(1);
        }).then(function(Producto) {
            assert.equal(Producto[0], 1, "contains the correct id");
            assert.equal(Producto[1], "Agua", "contains the correct name");
            return instanciaMercado.productos(2);
        }).then(function(Producto) {
            assert.equal(Producto[0], 2, "contains the correct id");
            assert.equal(Producto[1], "Codensa - Luz", "contains the correct name");
        });
    });

});