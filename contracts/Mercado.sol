pragma solidity 0.5.16;

contract Mercado {
    
    struct Producto {
        uint id;
        string nombre;
    }

    mapping(address => bool) public compras;
    mapping(uint => Producto) public productos;
    uint public contadorProductos = 0;
    
    event eventoComprar (
        uint indexed idProducto
    );
    
    constructor () public {
        addProducto("Traje Napoleón Bonaparte");
        addProducto("Corazon de Rasputin");
        addProducto("Corona de la Reina Isabel I");
        addProducto("Tornillos del monstruo de Frankenstein");
        addProducto("Alfombra de Aladin");
        addProducto("Báculo sagrado de Goku");
    }

   function comprar (uint idProducto) public {
        require(idProducto > 0 && idProducto <= contadorProductos);

        compras[msg.sender] = true;

        emit eventoComprar(idProducto);
    }

    function addProducto(string memory nombre) public {
        contadorProductos ++;
        productos[contadorProductos] = Producto(contadorProductos, nombre);
    }
}
